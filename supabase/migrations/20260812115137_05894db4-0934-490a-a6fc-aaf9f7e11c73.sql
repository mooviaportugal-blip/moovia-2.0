CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.is_admin_user(_uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = _uid);
$$;

REVOKE ALL ON FUNCTION private.is_admin_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_admin_user(uuid) TO authenticated, service_role;

DROP POLICY IF EXISTS "Admins can read admin list" ON public.admin_users;
CREATE POLICY "Admins can read admin list"
  ON public.admin_users FOR SELECT TO authenticated
  USING (private.is_admin_user(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage chat_logs" ON public.chat_logs;
CREATE POLICY "Admins can manage chat_logs"
  ON public.chat_logs FOR ALL TO authenticated
  USING (private.is_admin_user(auth.uid()))
  WITH CHECK (private.is_admin_user(auth.uid()));

DROP FUNCTION IF EXISTS public.is_admin_user(uuid);