CREATE OR REPLACE FUNCTION public.whoami() RETURNS json LANGUAGE sql STABLE AS $$
SELECT json_build_object('current_user', current_user, 'session_user', session_user, 'auth_role', auth.role(), 'auth_uid', auth.uid()); $$;
GRANT EXECUTE ON FUNCTION public.whoami() TO anon, authenticated;