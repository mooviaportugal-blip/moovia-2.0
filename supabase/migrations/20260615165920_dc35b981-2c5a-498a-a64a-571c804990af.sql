CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
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

CREATE OR REPLACE FUNCTION public.is_owner(_user_id uuid)
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

DROP POLICY IF EXISTS "Admins view self" ON public.admin_users;
DROP POLICY IF EXISTS "Owners manage admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins manage posts" ON public.posts;

CREATE POLICY "Admins view self"
ON public.admin_users
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Owners manage admins"
ON public.admin_users
FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "Admins manage posts"
ON public.posts
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));