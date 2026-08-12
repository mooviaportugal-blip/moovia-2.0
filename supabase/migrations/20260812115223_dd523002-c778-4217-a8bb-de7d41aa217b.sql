-- PostgREST requires table-level SELECT privilege to process writes;
-- row visibility stays fully denied for anon because no SELECT policy exists for that role.
GRANT SELECT, INSERT, UPDATE ON public.chat_logs TO anon;