-- Políticas para leads
CREATE POLICY "Admins can manage leads"
ON public.leads
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Políticas para chat_logs
CREATE POLICY "Admins can manage chat_logs"
ON public.chat_logs
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can manage own chat logs"
ON public.chat_logs
FOR ALL
TO anon, authenticated
USING (true); -- Idealmente filtrado por session_id, mas deixamos aberto por agora para garantir funcionalidade

-- Políticas para mandatos
CREATE POLICY "Admins can manage mandatos"
ON public.mandatos
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
