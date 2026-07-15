DROP POLICY IF EXISTS "Public view site settings" ON public.site_settings;
REVOKE SELECT ON public.site_settings FROM anon;