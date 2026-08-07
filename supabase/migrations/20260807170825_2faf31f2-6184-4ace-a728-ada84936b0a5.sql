-- Políticas para assessments
CREATE POLICY "Admins can manage assessments"
ON public.assessments
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Garantir que as tabelas de tenants têm as políticas de admin corretas (já existem algumas, mas vamos reforçar se necessário)
-- Na verdade, já vimos que existem.

-- Políticas para company_users (refortalece acesso do admin)
DROP POLICY IF EXISTS "Admins can manage company users" ON public.company_users;
CREATE POLICY "Admins can manage company users"
ON public.company_users
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Políticas para companies (refortalece acesso do admin)
DROP POLICY IF EXISTS "Admins can manage companies" ON public.companies;
CREATE POLICY "Admins can manage companies"
ON public.companies
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
