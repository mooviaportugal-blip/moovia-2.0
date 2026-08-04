-- 1. Tabela de Conteúdo do Site (CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    section text,
    type text DEFAULT 'text',
    label text,
    value text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
GRANT SELECT ON public.site_content TO anon;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- 2. Tabela de Eventos UX (Analytics)
CREATE TABLE IF NOT EXISTS public.ux_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id text NOT NULL,
    event_type text NOT NULL,
    page_path text,
    x_pct numeric,
    y_pct numeric,
    scroll_depth integer,
    viewport_w integer,
    viewport_h integer,
    device text,
    referrer text,
    user_agent text,
    meta jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

GRANT INSERT ON public.ux_events TO anon, authenticated;
GRANT SELECT, DELETE ON public.ux_events TO authenticated;
GRANT ALL ON public.ux_events TO service_role;

ALTER TABLE public.ux_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert ux events" ON public.ux_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read ux events" ON public.ux_events FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- 3. Trigger para updated_at em site_content
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_site_content
    BEFORE UPDATE ON public.site_content
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Realtime para site_content
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
