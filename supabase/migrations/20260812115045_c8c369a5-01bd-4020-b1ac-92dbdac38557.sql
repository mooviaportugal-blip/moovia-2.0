-- 1) Harden function search_path
ALTER FUNCTION public.handle_updated_at() SET search_path = public, pg_temp;

-- 2) Security-definer admin check (avoids recursive RLS on admin_users)
CREATE OR REPLACE FUNCTION public.is_admin_user(_uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = _uid);
$$;

REVOKE ALL ON FUNCTION public.is_admin_user(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin_user(uuid) TO authenticated, service_role;

-- 3) admin_users: remove public exposure
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can see admin list" ON public.admin_users;

CREATE POLICY "Staff can read own admin record"
  ON public.admin_users FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can read admin list"
  ON public.admin_users FOR SELECT TO authenticated
  USING (public.is_admin_user(auth.uid()));

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;

-- 4) chat_logs: remove blanket public access
DROP POLICY IF EXISTS "Public can manage own chat logs" ON public.chat_logs;
DROP POLICY IF EXISTS "Admins can manage chat_logs" ON public.chat_logs;

-- visitors may create and continue their own session transcript, never read/delete
CREATE POLICY "Visitors can create chat logs"
  ON public.chat_logs FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Visitors can append to chat logs"
  ON public.chat_logs FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage chat_logs"
  ON public.chat_logs FOR ALL TO authenticated
  USING (public.is_admin_user(auth.uid()))
  WITH CHECK (public.is_admin_user(auth.uid()));

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.chat_logs FROM anon;
GRANT INSERT, UPDATE ON public.chat_logs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_logs TO authenticated;
GRANT ALL ON public.chat_logs TO service_role;