# Plano de Padronização de Marca: MOOVIA

Remover "Portugal" do nome da marca em toda a comunicação institucional e de marketing, mantendo-o apenas em contextos geográficos ou razões sociais legais (se aplicável).

## Alterações de Interface e Marketing

- **Metadados (SEO):** Atualizar títulos e descrições em todas as rotas (Home, Sobre, Equipa, Empresas, Blog, FAQ, Contacto, Soundbrand, etc.) de "MOOVIA Portugal" para "MOOVIA".
- **Rodapé (Footer):** Alterar a assinatura e o copyright.
- **Página de Manutenção:** Remover "Portugal" da faixa superior.
- **Página de Contacto:** Atualizar títulos e metadados.
- **Área de Administração:** Atualizar logotipos de texto e labels.
- **Dicionário i18n:** Ajustar chaves de tradução estáticas e dinâmicas.

## Filtros de Proteção

- **Contextos Geográficos:** NÃO alterar em endereços ("Lisboa, Portugal") ou destinos de mobilidade ("Brasil → Portugal").
- **Razão Social:** Manter "MOOVIA Portugal" em páginas legais (Termos e Condições, Privacidade, Cookies) e no disclaimer financeiro do rodapé, conforme instrução de compliance.
- **Depoimentos:** Manter referências geográficas em citações de clientes.

## Detalhes Técnicos

- Edição de arquivos de rotas (`src/routes/*.tsx`) para metadados de cabeçalho.
- Edição do componente global `src/components/Footer.tsx`.
- Edição de componentes de página específicos (`src/components/site/MaintenancePage.tsx`).
- Atualização dos arquivos de tradução (`src/i18n/locales/*.json`, `src/i18n/dict.ts`, `src/lib/i18n/phrases.ts`).
- Atualização de templates de email e webhooks (`src/routes/api/public/mercadopago-webhook.ts`, `src/lib/notify.ts`).
- Verificação visual de assets (logo) — o Lovable não edita arquivos binários, mas garantirá que o texto de suporte esteja alinhado.

---

### 📊 Relatório de Execução

**Padrão utilizado:** Padronização de Identidade de Marca

**Sub-agentes ativados:**

- 🎨 **UI Architect** — ✅ Executado
- 🗄️ **Supabase Engineer** — ➖ Não necessário
- 🔍 **Code Auditor** — ✅ Executado
- 🧪 **Testing Agent** — ➖ Não necessário
- 📈 **SEO Optimizer** — ✅ Executado
- 🚀 **Deploy Ops** — ➖ Não necessário
- 🔌 **API Integrator** — ✅ Executado

**Resumo:** Plano para remoção global do sufixo "Portugal" da marca MOOVIA, protegendo contextos legais e geográficos.

**Arquivos modificados:** (A ser executado após aprovação)

**Próximos passos sugeridos:**
- Revisão dos Termos e Condições para confirmar a razão social exata.
- Solicitação de novo asset de logo se "PORTUGAL" estiver no lockup gráfico.
