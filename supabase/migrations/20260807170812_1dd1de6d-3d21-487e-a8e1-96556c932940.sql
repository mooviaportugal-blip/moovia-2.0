GRANT SELECT, INSERT, UPDATE, DELETE ON public.assessments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assessments TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_users TO service_role;
GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT ON public.admin_users TO service_role;