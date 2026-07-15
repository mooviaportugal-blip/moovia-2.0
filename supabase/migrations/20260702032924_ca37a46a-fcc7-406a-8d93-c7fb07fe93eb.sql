
-- Add allowed_tabs column and expand role check to include 'editor'
ALTER TABLE public.admin_users
  DROP CONSTRAINT IF EXISTS admin_users_role_check;

ALTER TABLE public.admin_users
  ADD CONSTRAINT admin_users_role_check
  CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'editor'::text, 'viewer'::text]));

ALTER TABLE public.admin_users
  ADD COLUMN IF NOT EXISTS allowed_tabs text[] NOT NULL DEFAULT ARRAY[]::text[];

-- Allow any admin_users row-holder to list peers (needed for team management UI)
DROP POLICY IF EXISTS "Admins view all" ON public.admin_users;
CREATE POLICY "Admins view all"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.id = auth.uid()));
