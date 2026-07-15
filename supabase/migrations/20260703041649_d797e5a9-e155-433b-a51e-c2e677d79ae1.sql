
UPDATE public.posts SET
  featured_image = '/blog/loja-fechada.jpg',
  og_image = '/blog/loja-fechada.jpg',
  meta_title = 'A loja está fechada: o que Portugal ensina sobre o tempo | MOOVIA',
  meta_description = 'Frederico Prado, CEO da MOOVIA, reflete sobre a relação dos portugueses com o tempo e o que ela ensina a famílias brasileiras em transição para Portugal.',
  focus_keyword = 'viver em portugal',
  tags = ARRAY['Portugal','Cultura','Adaptação','Qualidade de Vida','Brasileiros em Portugal'],
  read_time = COALESCE(read_time, 5)
WHERE slug = 'a-loja-esta-fechada';

UPDATE public.posts SET
  featured_image = '/blog/porto-lisboa.jpg',
  og_image = '/blog/porto-lisboa.jpg',
  meta_title = 'Porto ou Lisboa: qual cidade escolher para viver em Portugal',
  meta_description = 'Comparativo entre Porto e Lisboa para famílias brasileiras em transição: ritmo, custo de vida, bairros e o que considerar antes de escolher onde morar.',
  focus_keyword = 'porto ou lisboa',
  tags = ARRAY['Porto','Lisboa','Moradia','Bairros','Comparativo'],
  read_time = COALESCE(read_time, 7)
WHERE slug = 'porto-ou-lisboa';

UPDATE public.posts SET
  featured_image = '/blog/visto-lisboa.jpg',
  og_image = '/blog/visto-lisboa.jpg',
  meta_title = 'Visto D7, D2 ou D3 para brasileiros em Portugal em 2026 | MOOVIA',
  meta_description = 'D7, D2 ou D3: compare cronograma, requisitos, custos e perfil ideal para brasileiros que pretendem se mudar para Portugal em 2026 com segurança jurídica.',
  focus_keyword = 'visto d7 portugal',
  tags = ARRAY['Visto','D7','D2','D3','Imigração','Portugal 2026'],
  read_time = COALESCE(read_time, 8)
WHERE slug = 'visto-d7-d2-ou-d3-portugal-2026';

UPDATE public.posts SET
  featured_image = '/blog/fiscal-lisboa.jpg',
  og_image = '/blog/fiscal-lisboa.jpg',
  meta_title = 'Tributação em Portugal 2026: IFICI e fim do RNH para brasileiros',
  meta_description = 'Como funciona a tributação em Portugal em 2026 para brasileiros: IFICI, fim do RNH e como estruturar a chegada para pagar menos imposto de forma legal.',
  focus_keyword = 'tributação em portugal',
  tags = ARRAY['Fiscalidade','IFICI','RNH','Impostos','Portugal 2026'],
  read_time = COALESCE(read_time, 9)
WHERE slug = 'tributacao-em-portugal-brasileiros-2026';

UPDATE public.posts SET
  featured_image = '/blog/habitacao-lisboa.jpg',
  og_image = '/blog/habitacao-lisboa.jpg',
  meta_title = 'Quanto custa morar em Lisboa em 2026: guia por bairro | MOOVIA',
  meta_description = 'Custo real de morar em Lisboa em 2026 por bairro: Parque das Nações, Cascais, Oeiras, Almada e Sintra. Comparativo para famílias brasileiras hoje.',
  focus_keyword = 'morar em lisboa',
  tags = ARRAY['Habitação','Lisboa','Cascais','Custo de Vida','Bairros'],
  read_time = COALESCE(read_time, 8)
WHERE slug = 'quanto-custa-morar-em-lisboa-2026';
