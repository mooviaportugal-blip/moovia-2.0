DROP POLICY IF EXISTS "Anyone can read knowledge" ON public.maia_knowledge;
DROP POLICY IF EXISTS "Authenticated can manage knowledge" ON public.maia_knowledge;
REVOKE SELECT ON public.maia_knowledge FROM anon;

CREATE POLICY "Admins manage knowledge"
  ON public.maia_knowledge FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Authenticated can manage documents" ON public.maia_documents;
CREATE POLICY "Admins manage documents"
  ON public.maia_documents FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Authenticated can manage chunks" ON public.maia_chunks;
CREATE POLICY "Admins manage chunks"
  ON public.maia_chunks FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Authenticated can manage maia-docs" ON storage.objects;
CREATE POLICY "Admins manage maia-docs"
  ON storage.objects FOR ALL TO authenticated
  USING (
    bucket_id = 'maia-docs'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    bucket_id = 'maia-docs'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );