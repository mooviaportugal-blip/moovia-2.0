
-- Seed legal pages
INSERT INTO public.legal_pages (slug, title, content)
VALUES 
  ('politica-privacidade', 'Política de Privacidade', 'Conteúdo da Política de Privacidade...'),
  ('politica-cookies', 'Política de Cookies', 'Conteúdo da Política de Cookies...'),
  ('termos-condicoes', 'Termos e Condições', 'Conteúdo dos Termos e Condições...');

-- Grant access
GRANT SELECT ON public.legal_pages TO anon, authenticated;
GRANT ALL ON public.legal_pages TO service_role;
