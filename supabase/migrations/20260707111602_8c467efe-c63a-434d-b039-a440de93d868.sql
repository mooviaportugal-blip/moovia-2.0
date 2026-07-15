DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (name IS NULL OR length(name) <= 200)
  AND (email IS NULL OR length(email) <= 320)
  AND (whatsapp IS NULL OR length(whatsapp) <= 40)
  AND (message IS NULL OR length(message) <= 4000)
  AND (objective IS NULL OR length(objective) <= 500)
  AND (notes IS NULL OR length(notes) <= 4000)
  AND (source IS NULL OR length(source) <= 100)
);
GRANT INSERT ON public.leads TO anon, authenticated;