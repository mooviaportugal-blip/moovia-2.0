CREATE SCHEMA IF NOT EXISTS app_private;

CREATE OR REPLACE FUNCTION app_private.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION app_private.is_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = _user_id
      AND role = 'owner'
  )
$$;

GRANT USAGE ON SCHEMA app_private TO authenticated;
GRANT EXECUTE ON FUNCTION app_private.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION app_private.is_owner(uuid) TO authenticated;

DROP POLICY IF EXISTS "Owners manage admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins manage posts" ON public.posts;

CREATE POLICY "Owners manage admins"
ON public.admin_users
FOR ALL
TO authenticated
USING (app_private.is_owner(auth.uid()))
WITH CHECK (app_private.is_owner(auth.uid()));

CREATE POLICY "Admins manage posts"
ON public.posts
FOR ALL
TO authenticated
USING (app_private.is_admin(auth.uid()))
WITH CHECK (app_private.is_admin(auth.uid()));

DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_owner(uuid);