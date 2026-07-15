
-- Tighten UPDATE policy
DROP POLICY IF EXISTS "Public update chat logs" ON public.chat_logs;

CREATE POLICY "Public update chat logs"
  ON public.chat_logs FOR UPDATE
  TO anon, authenticated
  USING (
    created_at > now() - interval '7 days'
  )
  WITH CHECK (
    (session_id IS NULL OR length(session_id) <= 100)
    AND (page_url IS NULL OR length(page_url) <= 2000)
    AND (duration_secs IS NULL OR (duration_secs >= 0 AND duration_secs <= 86400))
    AND (pg_column_size(messages) <= 100000)
    AND created_at > now() - interval '7 days'
  );

-- Restrict cleanup function to admins only
REVOKE EXECUTE ON FUNCTION public.cleanup_old_chat_logs() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.cleanup_old_chat_logs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) THEN
    RAISE EXCEPTION 'Only admins can run cleanup';
  END IF;
  DELETE FROM public.chat_logs
  WHERE updated_at < now() - interval '60 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.cleanup_old_chat_logs() TO authenticated;
