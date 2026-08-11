-- Reativar o botão de som
INSERT INTO public.site_settings (key, value)
VALUES ('sound_button_enabled', 'true')
ON CONFLICT (key) DO UPDATE SET value = 'true';

-- Adicionar a faixa de áudio caso não exista
INSERT INTO public.sound_tracks (title, cover_url, source_type, source_url, is_enabled, position)
SELECT 'MOOVIA Sound Branding', '/mooviagold.svg', 'mp3', 'https://eueddvtfjdhmqudnpzcz.supabase.co/storage/v1/object/public/sound-assets/soundbrand-moovia.mp3', true, 1
WHERE NOT EXISTS (SELECT 1 FROM public.sound_tracks WHERE title = 'MOOVIA Sound Branding');

-- Garantir permissões de leitura para o público
GRANT SELECT ON public.sound_tracks TO anon, authenticated;
GRANT SELECT ON public.site_settings TO anon, authenticated;