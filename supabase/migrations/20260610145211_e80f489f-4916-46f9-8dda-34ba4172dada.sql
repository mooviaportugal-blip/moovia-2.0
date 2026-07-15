-- Restringir acesso de leitura da tabela leads apenas para administradores
DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;

CREATE POLICY "Admins manage leads" ON public.leads
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Garantir que não existam outras políticas de SELECT permissivas
DROP POLICY IF EXISTS "Public view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;
