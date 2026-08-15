ALTER PUBLICATION supabase_realtime DROP TABLE public.script_injections;

REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM anon;
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;