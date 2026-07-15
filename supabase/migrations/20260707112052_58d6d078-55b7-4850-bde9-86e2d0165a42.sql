DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (name IS NULL OR char_length(name) <= 200);
NOTIFY pgrst, 'reload schema';