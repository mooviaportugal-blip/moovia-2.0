ALTER TABLE public.gallery_images REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_images;