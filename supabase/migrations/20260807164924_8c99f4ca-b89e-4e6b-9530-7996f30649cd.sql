ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
CREATE POLICY "Enable read access for all users" ON public.admin_users FOR SELECT USING (true);
GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT ON public.admin_users TO anon;
