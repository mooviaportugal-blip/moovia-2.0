
-- 1) Remove public read on script_injections
DROP POLICY IF EXISTS "Public view script injections" ON public.script_injections;
REVOKE SELECT ON public.script_injections FROM anon;

-- 2) Tighten public INSERT policies with validation (replace WITH CHECK true)
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (name IS NULL OR length(name) <= 200)
    AND (email IS NULL OR length(email) <= 320)
    AND (whatsapp IS NULL OR length(whatsapp) <= 40)
    AND (message IS NULL OR length(message) <= 4000)
    AND (objective IS NULL OR length(objective) <= 500)
    AND (notes IS NULL OR length(notes) <= 4000)
    AND (source IS NULL OR length(source) <= 100)
  );

DROP POLICY IF EXISTS "Public insert chat logs" ON public.chat_logs;
CREATE POLICY "Public insert chat logs" ON public.chat_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (session_id IS NULL OR length(session_id) <= 100)
    AND (page_url IS NULL OR length(page_url) <= 2000)
    AND (duration_secs IS NULL OR duration_secs BETWEEN 0 AND 86400)
    AND pg_column_size(messages) <= 100000
  );

DROP POLICY IF EXISTS "Public insert funnel events" ON public.funnel_events;
CREATE POLICY "Public insert funnel events" ON public.funnel_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(event) <= 100
    AND (session_id IS NULL OR length(session_id) <= 100)
    AND (page IS NULL OR length(page) <= 2000)
    AND (referrer IS NULL OR length(referrer) <= 2000)
    AND (utm_source IS NULL OR length(utm_source) <= 200)
    AND (utm_medium IS NULL OR length(utm_medium) <= 200)
    AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
    AND (device IS NULL OR length(device) <= 100)
    AND (country IS NULL OR length(country) <= 100)
    AND (city IS NULL OR length(city) <= 200)
  );
