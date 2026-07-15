
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS auto_translated_at timestamptz;

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.trigger_auto_translate_post()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  edge_url text := 'https://lcnhlxumfdweeumpkvrg.supabase.co/functions/v1/auto-translate-post';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjbmhseHVtZmR3ZWV1bXBrdnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTg1MzcsImV4cCI6MjA5NjQzNDUzN30.BDqpv5vVPhSwDBwnH5Nsp9KVGX31uUCiZr3-3VyWPts';
BEGIN
  IF NEW.published IS NOT TRUE THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE'
     AND OLD.title IS NOT DISTINCT FROM NEW.title
     AND OLD.content IS NOT DISTINCT FROM NEW.content
     AND OLD.excerpt IS NOT DISTINCT FROM NEW.excerpt
     AND OLD.meta_title IS NOT DISTINCT FROM NEW.meta_title
     AND OLD.meta_description IS NOT DISTINCT FROM NEW.meta_description
     AND OLD.published = NEW.published
     AND (NEW.translations ? 'en') AND (NEW.translations ? 'es') THEN
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := edge_url,
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||anon_key),
    body := jsonb_build_object('post_id', NEW.id)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS posts_auto_translate ON public.posts;
CREATE TRIGGER posts_auto_translate
AFTER INSERT OR UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.trigger_auto_translate_post();
