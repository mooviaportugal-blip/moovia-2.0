
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS ddi TEXT DEFAULT '+55';
ALTER TABLE public.chat_logs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
CREATE UNIQUE INDEX IF NOT EXISTS chat_logs_session_id_uniq ON public.chat_logs(session_id);
