CREATE TABLE public.ux_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('pageview','click','scroll','session_start','session_end')),
  page_path TEXT,
  x_pct NUMERIC,
  y_pct NUMERIC,
  scroll_depth INTEGER,
  viewport_w INTEGER,
  viewport_h INTEGER,
  device TEXT,
  referrer TEXT,
  user_agent TEXT,
  meta JSONB
);

GRANT INSERT ON public.ux_events TO anon, authenticated;
GRANT SELECT ON public.ux_events TO authenticated;
GRANT ALL ON public.ux_events TO service_role;

ALTER TABLE public.ux_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert ux_events" ON public.ux_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(session_id) <= 100
    AND (page_path IS NULL OR length(page_path) <= 500)
    AND (user_agent IS NULL OR length(user_agent) <= 500)
  );

CREATE POLICY "Admins read ux_events" ON public.ux_events
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE INDEX ux_events_session_idx ON public.ux_events(session_id);
CREATE INDEX ux_events_type_created_idx ON public.ux_events(event_type, created_at DESC);
CREATE INDEX ux_events_page_idx ON public.ux_events(page_path);