-- 1. Tabela de Injeção de Scripts (GTM, Analytics, etc.)
CREATE TABLE IF NOT EXISTS public.script_injections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    code text NOT NULL,
    placement text DEFAULT 'head' CHECK (placement IN ('head', 'body_start', 'body_end')),
    environment text DEFAULT 'production' CHECK (environment IN ('production', 'development', 'all')),
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Tabela de Conhecimento da MAIA
CREATE TABLE IF NOT EXISTS public.maia_knowledge (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    tags text[] DEFAULT '{}',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Permissões Globais (Garantir que todas as tabelas têm GRANTs)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
    LOOP
        EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
        EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
        IF t IN ('posts', 'site_settings', 'gallery_images', 'sound_tracks', 'legal_pages', 'site_content') THEN
            EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
        END IF;
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    END LOOP;
END $$;

-- 4. Políticas de Segurança Finais
CREATE POLICY "Admins manage scripts" ON public.script_injections FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
CREATE POLICY "Public read scripts" ON public.script_injections FOR SELECT TO anon, authenticated USING (active = true);

CREATE POLICY "Admins manage maia knowledge" ON public.maia_knowledge FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
CREATE POLICY "Public read knowledge" ON public.maia_knowledge FOR SELECT TO anon, authenticated USING (is_active = true);

-- 5. Realtime final
ALTER PUBLICATION supabase_realtime ADD TABLE public.script_injections;
