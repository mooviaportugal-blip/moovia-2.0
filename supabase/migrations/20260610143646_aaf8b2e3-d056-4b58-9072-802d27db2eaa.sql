-- SET SEARCH PATH ON FUNCTIONS
ALTER FUNCTION public.calculate_lead_score(public.leads) SET search_path = public;
ALTER FUNCTION public.trigger_calculate_temperature() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- RLS POLICIES FOR MISSING TABLES

-- Chat Logs
CREATE POLICY "Public insert chat logs" ON public.chat_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins manage chat logs" ON public.chat_logs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Funnel Events
CREATE POLICY "Public insert funnel events" ON public.funnel_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins manage funnel events" ON public.funnel_events FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Site Settings
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "Public view site settings" ON public.site_settings FOR SELECT TO anon USING (true);

-- Script Injections
CREATE POLICY "Owners manage script injections" ON public.script_injections FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'owner')
);
CREATE POLICY "Public view script injections" ON public.script_injections FOR SELECT TO anon USING (active = true);

-- AB Tests
CREATE POLICY "Admins manage ab tests" ON public.ab_tests FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "Public view ab tests" ON public.ab_tests FOR SELECT TO anon USING (active = true);
