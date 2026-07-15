ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS contact_period TEXT CHECK (contact_period IN ('manha','tarde','noite')),
  ADD COLUMN IF NOT EXISTS contact_method TEXT CHECK (contact_method IN ('ligacao','video_chamada'));