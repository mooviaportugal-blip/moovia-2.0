
CREATE POLICY "Public read sound-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'sound-assets');

CREATE POLICY "Admins insert sound-assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'sound-assets' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins update sound-assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'sound-assets' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins delete sound-assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'sound-assets' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
