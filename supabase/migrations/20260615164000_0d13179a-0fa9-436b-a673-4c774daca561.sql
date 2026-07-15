ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS banner_image text,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}'::text[];