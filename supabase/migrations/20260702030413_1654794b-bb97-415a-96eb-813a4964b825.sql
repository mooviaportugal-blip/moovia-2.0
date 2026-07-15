
ALTER TABLE public.assessments
  ADD COLUMN IF NOT EXISTS mp_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS mp_external_reference TEXT,
  ADD COLUMN IF NOT EXISTS payer_name TEXT,
  ADD COLUMN IF NOT EXISTS payer_email TEXT,
  ADD COLUMN IF NOT EXISTS payer_phone TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS assessments_mp_payment_id_key
  ON public.assessments(mp_payment_id) WHERE mp_payment_id IS NOT NULL;
