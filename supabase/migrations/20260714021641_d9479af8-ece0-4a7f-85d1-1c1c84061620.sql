
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tipo text DEFAULT 'pessoa',
  ADD COLUMN IF NOT EXISTS nome_empresa text,
  ADD COLUMN IF NOT EXISTS cargo_responsavel text,
  ADD COLUMN IF NOT EXISTS colaboradores_12m text,
  ADD COLUMN IF NOT EXISTS paises_origem_destino text,
  ADD COLUMN IF NOT EXISTS desafio_principal text,
  ADD COLUMN IF NOT EXISTS programa_existente text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_tipo_check') THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tipo_check CHECK (tipo IS NULL OR tipo IN ('pessoa','empresa'));
  END IF;
END $$;
