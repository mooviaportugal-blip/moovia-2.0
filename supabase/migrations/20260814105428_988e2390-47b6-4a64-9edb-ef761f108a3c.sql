-- Remove the blanket UPDATE access on chat_logs
DROP POLICY IF EXISTS "Visitors can append to chat logs" ON public.chat_logs;
REVOKE UPDATE, SELECT ON public.chat_logs FROM anon;
REVOKE UPDATE ON public.chat_logs FROM authenticated;

CREATE UNIQUE INDEX IF NOT EXISTS chat_logs_session_id_uniq ON public.chat_logs(session_id);

-- Controlled write path: visitors can only write the row for their own session id,
-- and can never read any chat history back.
CREATE OR REPLACE FUNCTION public.save_chat_log(
  p_session_id text,
  p_history jsonb DEFAULT '[]'::jsonb,
  p_lead_captured boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) < 16 OR length(p_session_id) > 128 THEN
    RAISE EXCEPTION 'invalid session';
  END IF;

  IF p_history IS NULL OR jsonb_typeof(p_history) <> 'array' OR length(p_history::text) > 200000 THEN
    RAISE EXCEPTION 'invalid history';
  END IF;

  INSERT INTO public.chat_logs (session_id, history, lead_captured)
  VALUES (p_session_id, p_history, coalesce(p_lead_captured, false))
  ON CONFLICT (session_id) DO UPDATE
    SET history = EXCLUDED.history,
        lead_captured = public.chat_logs.lead_captured OR EXCLUDED.lead_captured;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) TO anon, authenticated;