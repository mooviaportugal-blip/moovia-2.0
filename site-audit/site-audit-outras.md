# Auditoria Completa do Site — Outras Páginas (Insights, FAQ, Contacto, Legais)
Gerado em: 13/08/2026 11:55 UTC

## Rota: /blog (blog.index.tsx)
**Título**: "O que você precisa entender antes de decidir."
**Categorias**: Artigo, Insights.
**Empty State**: "Primeiros artigos em breve." (Renderizado se o banco estiver vazio).

---

## Rota: /perguntas-frequentes (perguntas-frequentes.tsx)

### Título (H1)
Respostas diretas para as decisões que exigem clareza.

### FAQs Literais (Versão Estendida)
1. **O que é a MOOVIA?**: Coordena transições internacionais de vida e património. Ponto único que integra estratégia, execução e acompanhamento.
2. **O que é o Global Mobility Assessment?**: Trabalho estratégico com entregável físico. Sessão com founder + Human Dimension Assessment (Frederico + Dra. Letícia).
3. **Trabalha com pacotes?**: Não. Cada proposta é construída à medida. Mandato personalizado. "Um alfaiate não tem prateleira."
4. **Quanto tempo leva?**: Profissional TI (30-90 dias). Transição patrimonial (3-12 meses).
5. **Quanto custa?**: Não há tabela fixa. Valor definido após o Assessment, com base na complexidade.
6. **Atende apenas brasileiros?**: Não. Atende qualquer nacionalidade com destino a Portugal. Metodologia internacional.
7. **O que é o Global Mobility Assurance?**: Categoria para empresas focada em adaptação familiar e integração cultural (mitigação de turnover).
8. **Como funciona a cobrança (Assurance)?**: Definida caso a caso ( Strategic Discovery Call).
9. **Mínimo de colaboradores?**: Não há número rígido.
10. **Como funciona a MAIA?**: Assistente inteligente que responde dúvidas e explica a metodologia.

---

## Rota: /contacto (contacto.tsx)

### Título (H1)
Vamos coordenar a sua mobilidade internacional, do diagnóstico à integração.

### Canais Diretos
- **E-mail**: contacto@mooviaglobal.com / frederico.prado@mooviaglobal.com
- **Telefone/WhatsApp**: +351 910 388 877
- **LinkedIn**: MOOVIA Portugal / Frederico Prado
- **Horário**: 09h às 18h (Lisboa)

### Localização
Rua Visconde de Santarém, 32, 1009-287 Lisboa, Portugal.

---

## Rota: /privacidade, /termos, /cookies (Páginas Legais)
- **Componente**: LegalPage.tsx
- **Conteúdo**: Consumido dinamicamente via Supabase (tabela `legal_pages`).
- **Markdown**: Suporta tabelas, listas e formatação GFM.
- **Disclaimer (Footer)**: "A MOOVIA Portugal não presta serviços de gestão de património... intermediação financeira ou aconselhamento financeiro."
- **Selo**: RGPD Compliance visível no rodapé.

---

## Componente: Footer.tsx (Rodapé Global)
- **Tagline**: Identificar · Medir · Mitigar
- **Navegação**: Serviços, Global Mobility Assurance, Sobre, Equipa, Insights, Contacto.
- **Copyright**: © 2026 MOOVIA Portugal.
- **Créditos**: Desenvolvido por Guilherme Souza.
