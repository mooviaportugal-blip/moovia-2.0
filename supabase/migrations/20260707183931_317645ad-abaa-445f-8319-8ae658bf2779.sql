
CREATE TABLE public.sound_tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  cover_url TEXT,
  source_type TEXT NOT NULL DEFAULT 'mp3' CHECK (source_type IN ('mp3','youtube')),
  source_url TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sound_tracks TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sound_tracks TO authenticated;
GRANT ALL ON public.sound_tracks TO service_role;

ALTER TABLE public.sound_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read sound tracks" ON public.sound_tracks
  FOR SELECT USING (true);

CREATE POLICY "Admins manage sound tracks" ON public.sound_tracks
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE TRIGGER sound_tracks_updated_at BEFORE UPDATE ON public.sound_tracks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, value, type) VALUES
  ('sound_button_enabled', 'true', 'boolean')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.sound_tracks (title, cover_url, source_type, source_url, position) VALUES
  ('Chegando em Casa', 'https://mooviaportugal.com/songs/cheganddo-em-casa.png', 'mp3', 'https://mooviaportugal.com/songs/Chegando%20em%20Casa.mp3', 1),
  ('Ipanema a Cascais', 'https://mooviaportugal.com/songs/ipanema-a-cascais.png', 'mp3', 'https://mooviaportugal.com/songs/Ipanema%20a%20Cascais.mp3', 2),
  ('Novo Mundo', 'https://mooviaportugal.com/songs/novo-mundo.png', 'mp3', 'https://mooviaportugal.com/songs/Novo%20Mundo.mp3', 3),
  ('O Amanhã através da Janela', 'https://mooviaportugal.com/songs/atraves-da-janela.png', 'mp3', 'https://mooviaportugal.com/songs/O%20Amanh%C3%A3%20atrav%C3%A9s%20da%20Janela.mp3', 4),
  ('Passeio em Lisboa', 'https://mooviaportugal.com/songs/passeio-em-lisboa.png', 'mp3', 'https://mooviaportugal.com/songs/Passeio%20em%20Lisboa.mp3', 5);
