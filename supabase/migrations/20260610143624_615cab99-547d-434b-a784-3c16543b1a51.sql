-- ADMIN USERS
CREATE TABLE IF NOT EXISTS public.admin_users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id),
  role       TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'viewer')),
  name       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS (CRM principal - Update existing table)
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS temperature TEXT DEFAULT 'cold' CHECK (temperature IN ('hot', 'warm', 'cold')),
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS device TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'BR',
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS ip_hash TEXT,
  ADD COLUMN IF NOT EXISTS last_activity TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID REFERENCES public.leads(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  scheduled_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  status          TEXT DEFAULT 'agendado' CHECK (status IN ('agendado', 'realizado', 'cancelado', 'no_show')),
  payment_status  TEXT DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'pago', 'reembolsado')),
  payment_method  TEXT,
  amount_eur      DECIMAL(10,2) DEFAULT 250.00,
  notes           TEXT,
  report_url      TEXT,
  converted_to_mandato BOOLEAN DEFAULT FALSE
);

-- POSTS (blog - Update existing)
ALTER TABLE public.posts 
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS og_image TEXT,
  ADD COLUMN IF NOT EXISTS schema_json JSONB;

-- CHAT LOGS
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  session_id     TEXT,
  messages       JSONB DEFAULT '[]',
  lead_captured  BOOLEAN DEFAULT FALSE,
  lead_id        UUID REFERENCES public.leads(id),
  page_url       TEXT,
  duration_secs  INTEGER
);

-- FUNNEL EVENTS
CREATE TABLE IF NOT EXISTS public.funnel_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event      TEXT NOT NULL,
  session_id TEXT,
  page       TEXT,
  referrer   TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device     TEXT,
  country    TEXT,
  city       TEXT
);

-- SITE CONTENT (CMS - Update existing)
ALTER TABLE public.site_content 
  ADD COLUMN IF NOT EXISTS section TEXT,
  ADD COLUMN IF NOT EXISTS label TEXT,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES public.admin_users(id);

-- SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  type       TEXT DEFAULT 'string',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCRIPT INJECTIONS
CREATE TABLE IF NOT EXISTS public.script_injections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  placement   TEXT CHECK (placement IN ('head', 'body_start', 'body_end')),
  code        TEXT,
  active      BOOLEAN DEFAULT TRUE,
  environment TEXT DEFAULT 'all',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- AB TESTS
CREATE TABLE IF NOT EXISTS public.ab_tests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key            TEXT NOT NULL,
  variant_a      TEXT,
  variant_b      TEXT,
  traffic_split  DECIMAL(3,2) DEFAULT 0.50,
  active         BOOLEAN DEFAULT TRUE,
  winner         TEXT CHECK (winner IN ('a', 'b')),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- MANDATOS
CREATE TABLE IF NOT EXISTS public.mandatos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID REFERENCES public.leads(id),
  assessment_id   UUID REFERENCES public.assessments(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  status          TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'concluido', 'pausado', 'cancelado')),
  value_eur       DECIMAL(10,2),
  commission_eur  DECIMAL(10,2),
  pilares         JSONB DEFAULT '[]',
  notes           TEXT
);

-- GRANT PERMISSIONS
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT ON public.funnel_events TO anon;
GRANT SELECT, INSERT ON public.chat_logs TO anon;
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT ON public.posts TO anon;

-- ENABLE RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.script_injections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandatos ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (DROP IF EXISTS before create to avoid errors)
DO $$ BEGIN
    DROP POLICY IF EXISTS "Owners manage admins" ON public.admin_users;
    DROP POLICY IF EXISTS "Admins view self" ON public.admin_users;
    DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
    DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
    DROP POLICY IF EXISTS "Admins manage assessments" ON public.assessments;
    DROP POLICY IF EXISTS "Public view published posts" ON public.posts;
    DROP POLICY IF EXISTS "Admins manage posts" ON public.posts;
    DROP POLICY IF EXISTS "Public view content" ON public.site_content;
    DROP POLICY IF EXISTS "Admins manage content" ON public.site_content;
    DROP POLICY IF EXISTS "Owners manage mandatos" ON public.mandatos;
END $$;

CREATE POLICY "Owners manage admins" ON public.admin_users
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'owner')
  );
CREATE POLICY "Admins view self" ON public.admin_users
  FOR SELECT TO authenticated USING (id = auth.uid());

CREATE POLICY "Admins manage leads" ON public.leads
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );
CREATE POLICY "Public insert leads" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins manage assessments" ON public.assessments
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Public view published posts" ON public.posts
  FOR SELECT TO anon USING (published = true);
CREATE POLICY "Admins manage posts" ON public.posts
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Public view content" ON public.site_content
  FOR SELECT TO anon USING (true);
CREATE POLICY "Admins manage content" ON public.site_content
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Owners manage mandatos" ON public.mandatos
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'owner')
  );

-- TEMPERATURE CALCULATION TRIGGER
CREATE OR REPLACE FUNCTION public.calculate_lead_score(lead_record public.leads)
RETURNS TEXT AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Timing
  IF lead_record.timing = 'menos_3_meses' THEN score := score + 40;
  ELSIF lead_record.timing = '3_6_meses' THEN score := score + 20;
  ELSIF lead_record.timing = '6_12_meses' THEN score := score + 10;
  END IF;

  -- Objective
  IF lead_record.objective = 'trabalho' THEN score := score + 30;
  ELSIF lead_record.objective = 'familia' THEN score := score + 25;
  ELSIF lead_record.objective = 'investir' THEN score := score + 20;
  END IF;

  -- Composition
  IF lead_record.composition ILIKE '%filhos%' THEN score := score + 20; END IF;
  IF lead_record.composition ILIKE '%pets%' THEN score := score + 10; END IF;

  -- Decision phase
  IF lead_record.decision_phase = 'tomei_decisao' THEN score := score + 30;
  ELSIF lead_record.decision_phase = 'tenho_proposta' THEN score := score + 40;
  END IF;

  -- Temperature
  IF score >= 70 THEN RETURN 'hot';
  ELSIF score >= 40 THEN RETURN 'warm';
  ELSE RETURN 'cold';
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.trigger_calculate_temperature()
RETURNS TRIGGER AS $$
BEGIN
  NEW.temperature := public.calculate_lead_score(NEW);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_lead_temperature ON public.leads;
CREATE TRIGGER update_lead_temperature
BEFORE INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.trigger_calculate_temperature();

-- UPDATED AT TRIGGER
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_assessments_updated_at ON public.assessments;
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_script_injections_updated_at ON public.script_injections;
CREATE TRIGGER update_script_injections_updated_at BEFORE UPDATE ON public.script_injections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_ab_tests_updated_at ON public.ab_tests;
CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON public.ab_tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_mandatos_updated_at ON public.mandatos;
CREATE TRIGGER update_mandatos_updated_at BEFORE UPDATE ON public.mandatos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
