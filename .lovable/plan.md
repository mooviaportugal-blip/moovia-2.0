
# Tradutor EN 100% Fiel — Arquitetura Híbrida

Dois sistemas coexistindo: **i18n estático curado** para copy fixa e **tradução assistida com revisão** para posts de blog. Ambos gravam a versão EN pronta (nunca on-the-fly na leitura).

---

## Parte 1 — i18n estático (site fixo em EN)

### 1.1 Reativar seletor de idioma na navbar
- `src/hooks/useLanguageSwitcherEnabled.ts` → retornar `true`.
- `LanguageSwitcher.tsx` já existe (PT/EN/ES); manter apenas PT e EN visíveis (esconder ES por enquanto).
- Persistir escolha em `localStorage` (`mv_lang`) — já implementado.

### 1.2 Roteamento por prefixo `/en/*`
- Estratégia mínima: manter rotas existentes e usar `locale` do provider para trocar textos in-place (sem duplicar arquivos de rota). URL fica igual, `<html lang>` muda.
- **Alternativa (recomendada para SEO):** criar layout `src/routes/en.tsx` como pathless prefix com espelhos (`en.sobre.tsx`, `en.servicos.tsx`, `en.blog.index.tsx`, `en.blog.$slug.tsx`, etc.) que apenas forçam `locale="en"` e renderizam os mesmos componentes. Cada rota EN tem seu próprio `head()` com `hreflang` alternates e canonical `/en/...`.
- Decisão do plano: **Alternativa (subpasta /en/)** para SEO 100% fiel ao requisito.

### 1.3 Dicionário curado
- Expandir `src/i18n/locales/en.json` e `pt.json` cobrindo todo inventário (`00-inventory.md` → `12-metadata.md`): hero, seções, nav, footer, formulários, FAQ, legais, meta tags.
- Chaves organizadas por página/seção: `sobre.raizes.title`, `empresas.hero.subtitle`, etc.
- Componentes atuais que hardcodam PT passam a usar `t("chave", "fallback PT")`.
- Trabalho manual, uma vez, revisado pelo Fred antes do go-live EN.

### 1.4 Meta tags por idioma
- Cada `head()` de rota lê `locale` e devolve `title` / `description` / `og:*` na língua correta.
- Adicionar `<link rel="alternate" hreflang="pt-BR" href="...">` e `hreflang="en"` em ambas versões.

---

## Parte 2 — Blog: tradução no momento da publicação

### 2.1 Schema Supabase (tabela `posts`)
Já existe `translations JSONB` (visto em `src/lib/post-locale.ts`). Reaproveitar essa estrutura em vez de criar colunas `_en` separadas:

```
translations: {
  en: {
    title, excerpt, content,
    meta_title, meta_description,
    slug,
    status: "draft" | "reviewed" | "published",
    generated_at, reviewed_at, reviewed_by
  }
}
```

Adicionar coluna `en_status TEXT` (opcional, para filtros rápidos) ou derivar de `translations.en.status`.

### 2.2 Fluxo no painel admin (`/admin/blog`)
1. Fred escreve/edita o post em PT (como hoje).
2. Botão **"Gerar rascunho EN"** dispara edge function `auto-translate-post` (já existe) — trocar provedor de Gemini para **Claude Sonnet** com prompt reforçado incluindo glossário de marca.
3. Rascunho preenche `translations.en.*` com status `draft`.
4. Nova aba/tab no editor exibe versão EN lado-a-lado com PT; Fred edita livremente, corrige terminologia.
5. Botão **"Marcar como revisado"** → status `reviewed`.
6. Botão **"Publicar EN"** → status `published`. Só então o post aparece em `/en/blog`.

### 2.3 Glossário de marca no prompt de tradução
Editar `supabase/functions/auto-translate-post/index.ts`:
- Modelo: `anthropic/claude-sonnet-4-5` via Lovable AI Gateway (ou manter Gemini com prompt reforçado se custo importar).
- Prompt system inclui lista NEVER-TRANSLATE e NEVER-CONFUSE:
  - Preservar exatamente: MOOVIA, Global Mobility Assurance, GMA, Global Mobility Success, GMS, Human Mobility Risk, Risk Intelligence, Human Mobility Assurance, NIF, NHR, IFICI, RNH, D7, D2, D3.
  - Nunca substituir "Human Mobility Risk" por "Global Mobility Risk" nem misturar GMA/GMS.

### 2.4 Roteamento e fallback
- `/en/blog` (index) e `/en/blog/$slug` só listam/mostram posts com `translations.en.status === "published"` (**Opção A** do prompt).
- Se usuário abrir slug EN inexistente → 404 com link "Read in Portuguese" apontando para `/blog/$slug` original.
- `BlogTeaserSection` na home EN filtra pelo mesmo critério; se não houver 3 posts EN prontos, exibe menos cards (não faz fallback para PT).

### 2.5 Migração dos 3 posts existentes
- Rodar botão "Gerar rascunho EN" nos 3 posts atuais, revisar, publicar antes do go-live EN.

### 2.6 SEO
- `head()` de `/en/blog/$slug` lê `translations.en.meta_title/meta_description/slug`.
- Canonical: `https://mooviaportugal.com/en/blog/<slug_en || slug>`.
- Hreflang alternates entre versão PT e EN do mesmo post.

---

## Detalhes técnicos

**Arquivos a modificar:**
- `src/hooks/useLanguageSwitcherEnabled.ts` — reativar.
- `src/components/site/LanguageSwitcher.tsx` — remover ES, ajustar reload → navegação `/en/...` ↔ `/...`.
- `src/lib/i18n/I18nProvider.tsx` — detectar locale a partir do prefixo de URL.
- `src/i18n/index.ts` — remover clear do `localStorage`; permitir EN.
- `src/i18n/locales/en.json` e `pt.json` — dicionário completo curado (trabalho manual em batches por página).
- Criar rotas espelho `src/routes/en.*.tsx` que forçam locale EN e reusam componentes.
- Cada rota (PT e EN) → `head()` com meta localizada + hreflang alternates.
- `src/routes/admin.blog.tsx` — UI com botões "Gerar rascunho EN", editor lado-a-lado, status badge, "Publicar EN".
- `supabase/functions/auto-translate-post/index.ts` — trocar modelo para Claude Sonnet + glossário reforçado + retornar `status: "draft"`.
- Migração SQL: adicionar (se não existir) chaves `status/reviewed_at/reviewed_by` dentro de `translations.en` — como é JSONB, apenas convenção no código.
- `src/routes/blog.index.tsx` e `blog.$slug.tsx` (+ versões EN) — filtro por locale/status.
- `src/components/sections/BlogTeaserSection.tsx` — filtro condicional por locale.

**Fora de escopo:**
- Espanhol permanece desativado.
- Nenhuma tradução on-the-fly na leitura.
- Sem tradução automática sem revisão para blog.

---

## Ordem de execução

1. Reativar switcher + criar layout `/en/*` com locale forçado (sem conteúdo traduzido ainda; usa fallback PT temporário).
2. Adicionar meta tags + hreflang em todas as rotas.
3. Popular `en.json` página por página (hero → sobre → empresas → equipa → serviços → contacto → FAQ → legais → forms → MAIA → footer).
4. Migrar edge function `auto-translate-post` para Claude + glossário.
5. Estender `/admin/blog` com UI de tradução/revisão/publicação.
6. Traduzir e publicar os 3 posts existentes.
7. Ativar rotas EN de blog (`/en/blog` e `/en/blog/$slug`) com filtro Opção A.
8. QA final: navegação, hreflang, SEO, fallback 404.

Grande refactor — estimo ~15–20 edições de arquivo e um bloco significativo de tradução manual do dicionário. Confirma que devo prosseguir nessa ordem?
