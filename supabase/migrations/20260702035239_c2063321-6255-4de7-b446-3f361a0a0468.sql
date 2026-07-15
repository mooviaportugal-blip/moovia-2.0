ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_status_check;
ALTER TABLE public.assessments ADD CONSTRAINT assessments_status_check
CHECK (status = ANY (ARRAY['pendente','agendado','realizado','cancelado','mandato']));