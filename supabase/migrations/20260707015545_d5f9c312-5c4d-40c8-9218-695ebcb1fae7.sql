
-- 1. Remove overly permissive public UPDATE policy on chat_logs.
-- Admins retain full access via "Admins manage chat logs"; server code uses service role.
DROP POLICY IF EXISTS "Public update chat logs" ON public.chat_logs;

-- 2. Lock down SECURITY DEFINER functions from public/anon/authenticated execution.
-- Trigger functions never need client EXECUTE.
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_calculate_temperature() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_auto_translate_post() FROM PUBLIC, anon, authenticated;

-- Admin-only RPC: keep callable by authenticated (function checks admin internally), revoke anon/public.
REVOKE ALL ON FUNCTION public.cleanup_old_chat_logs() FROM PUBLIC, anon;

-- Helpers used inside RLS/queries: revoke from anon; authenticated still needs EXECUTE.
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.calculate_lead_score(public.leads) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.match_maia_chunks(vector, integer, double precision) FROM PUBLIC, anon;
