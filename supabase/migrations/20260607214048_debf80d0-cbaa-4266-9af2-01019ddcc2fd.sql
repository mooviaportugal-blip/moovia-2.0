
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  objective TEXT,
  timing TEXT,
  composition TEXT,
  decision_phase TEXT,
  message TEXT,
  status TEXT DEFAULT 'novo',
  source TEXT,
  notes TEXT,
  page_history JSONB,
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  read_time INTEGER,
  meta_title TEXT,
  meta_description TEXT
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads published posts" ON public.posts FOR SELECT TO anon, authenticated USING (published = true);

CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT,
  type TEXT DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
