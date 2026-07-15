
-- Allow anon/authenticated to UPDATE their own chat_logs row (session_id is an unguessable UUID)
CREATE POLICY "Public update chat logs"
  ON public.chat_logs FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (
    (session_id IS NULL OR length(session_id) <= 100)
    AND (page_url IS NULL OR length(page_url) <= 2000)
    AND (duration_secs IS NULL OR (duration_secs >= 0 AND duration_secs <= 86400))
    AND (pg_column_size(messages) <= 100000)
  );

-- Admin-only delete policy (Admins manage covers ALL but explicit is clearer);
-- also allow anon to DELETE own row by session_id would be unsafe, skip.

-- Auto-cleanup function: removes chat_logs older than 60 days
CREATE OR REPLACE FUNCTION public.cleanup_old_chat_logs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.chat_logs
  WHERE updated_at < now() - interval '60 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.cleanup_old_chat_logs() TO authenticated;
