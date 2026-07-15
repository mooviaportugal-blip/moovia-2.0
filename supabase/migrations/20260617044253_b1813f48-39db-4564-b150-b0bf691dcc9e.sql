CREATE POLICY "Authenticated can manage maia-docs"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'maia-docs')
  WITH CHECK (bucket_id = 'maia-docs');