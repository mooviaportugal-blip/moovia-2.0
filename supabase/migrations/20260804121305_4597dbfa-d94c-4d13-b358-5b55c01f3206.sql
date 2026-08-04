-- 1. Tabela de Empresas
CREATE TABLE IF NOT EXISTS public.companies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- 2. Tabela de Usuários de Empresa (Vínculo Auth -> Empresa)
CREATE TABLE IF NOT EXISTS public.company_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id uuid NOT NULL,
    role text NOT NULL CHECK (role IN ('admin', 'manager', 'expatriate')),
    expatriate_id uuid, -- Opcional: vínculo com a tabela de expatriados
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_users TO authenticated;
GRANT ALL ON public.company_users TO service_role;

ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança (RLS)
-- Nota: Admin Global pode ver tudo. Criamos a tabela admin_users se não existir para evitar erros.
CREATE TABLE IF NOT EXISTS public.admin_users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name text,
    role text DEFAULT 'viewer',
    allowed_tabs text[] DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies para admin_users
CREATE POLICY "Admins can see admin list" ON public.admin_users FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Policies para companies
CREATE POLICY "Admins can manage companies" ON public.companies FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
CREATE POLICY "Company users can see their company" ON public.companies FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.company_users WHERE user_id = auth.uid() AND company_id = companies.id));

-- Policies para company_users
CREATE POLICY "Admins can manage company users" ON public.company_users FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
CREATE POLICY "Users can see their own role" ON public.company_users FOR SELECT TO authenticated USING (user_id = auth.uid());
