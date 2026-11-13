-- leads: validate public submissions instead of WITH CHECK (true)
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND (email IS NULL OR (length(email) <= 320 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND (message IS NULL OR length(message) <= 5000)
  AND (notes IS NULL)
  AND coalesce(status, 'novo') = 'novo'
);

-- ux_events: validate shape
DROP POLICY IF EXISTS "Public can insert ux events" ON public.ux_events;
CREATE POLICY "Public can insert ux events" ON public.ux_events FOR INSERT TO anon, authenticated
WITH CHECK (
  length(session_id) BETWEEN 8 AND 128
  AND length(event_type) BETWEEN 1 AND 64
  AND (page_path IS NULL OR length(page_path) <= 2048)
  AND (meta IS NULL OR length(meta::text) <= 10000)
);

-- chat_logs: writes go through save_chat_log() only
DROP POLICY IF EXISTS "Visitors can create chat logs" ON public.chat_logs;

-- site_settings: public may only read non-sensitive toggles; admins read all
DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read public settings" ON public.site_settings FOR SELECT TO anon, authenticated
USING (key IN ('sound_button_enabled','whatsapp_enabled','airplane_enabled'));
CREATE POLICY "Admins can read all settings" ON public.site_settings FOR SELECT TO authenticated
USING (private.is_admin_user(auth.uid()));