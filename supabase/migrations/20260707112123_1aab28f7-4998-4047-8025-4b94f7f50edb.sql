DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  (name IS NULL OR char_length(name) <= 200)
  AND (email IS NULL OR char_length(email) <= 320)
  AND (whatsapp IS NULL OR char_length(whatsapp) <= 40)
  AND (message IS NULL OR char_length(message) <= 4000)
  AND (objective IS NULL OR char_length(objective) <= 500)
  AND (notes IS NULL OR char_length(notes) <= 4000)
  AND (source IS NULL OR char_length(source) <= 100)
);
NOTIFY pgrst, 'reload schema';