-- 1. Tabelas de CRM e Negócio
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text,
    whatsapp text,
    phone text,
    objective text,
    timing text,
    composition text,
    decision_phase text,
    message text,
    notes text,
    status text DEFAULT 'novo',
    temperature text DEFAULT 'warm',
    source text,
    interest text,
    contact_period text,
    contact_method text,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    ddi text,
    country text,
    city text,
    description text,
    session_id text,
    page_history jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
    status text DEFAULT 'pendente',
    payment_status text DEFAULT 'pendente',
    payment_method text,
    amount_eur numeric(10,2),
    mp_payment_id text,
    mp_external_reference text,
    payer_name text,
    payer_email text,
    payer_phone text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.mandatos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
    company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
    status text DEFAULT 'ativo',
    value_eur numeric(10,2),
    created_at timestamptz DEFAULT now()
);

-- 2. Tabelas de Conteúdo e Site
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text,
    category text,
    featured_image text,
    read_time integer,
    published boolean DEFAULT false,
    published_at timestamptz,
    author_id uuid,
    translations jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    gallery text NOT NULL,
    url text NOT NULL,
    row_index integer DEFAULT 0,
    position integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id text NOT NULL,
    lead_captured boolean DEFAULT false,
    history jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sound_tracks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    cover_url text,
    source_type text NOT NULL CHECK (source_type IN ('mp3', 'youtube')),
    source_url text NOT NULL,
    position integer DEFAULT 0,
    is_enabled boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.legal_pages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    content text,
    updated_at timestamptz DEFAULT now()
);

-- 3. Permissões e Segurança (GRANTs)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
    LOOP
        EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
        EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    END LOOP;
END $$;

-- Policies Básicas
CREATE POLICY "Public can read posts" ON public.posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read gallery" ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read sound" ON public.sound_tracks FOR SELECT TO anon, authenticated USING (is_enabled = true);
CREATE POLICY "Public can read legal" ON public.legal_pages FOR SELECT TO anon, authenticated USING (true);

-- 4. Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.assessments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mandatos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_images;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
