# MOOVIA — Registo de Remoções

Documento de rastreio: tudo o que foi pedido para remover do site e que foi efetivamente removido.
Última atualização: 28/07/2026

---

## 1. Conteúdo interno sensível (know-how)

| Item removido | Onde estava | Motivo |
|---|---|---|
| Bloco "Princípio" da Base de Conhecimento | `/sobre` (secção Como Construímos Inteligência) | Know-how interno não deve ser público |
| Exemplo de variável `HOU_034` | `/sobre` | Expõe nomenclatura proprietária |
| Detalhe das 5 fases de construção (700–900 variáveis) | `/sobre` | Roadmap interno |
| Bloco "Vantagem Competitiva" (conhecimento estruturado) | `/sobre` | Argumentação interna |
| Descrições de metodologia interna residuais | Varrimento global | Consistência |

## 2. Alegações não verificáveis

| Item removido | Onde estava |
|---|---|
| "centenas de casos" / claims de volume não auditáveis | `/sobre` |
| Secção "O que não prometemos ainda" (bloco completo + dados) | `/sobre` |
| Chaves i18n residuais de "O que não prometemos ainda" | `src/i18n/dict.auto.ts` |
| "Plataforma completa pronta para comercialização" (item da lista) | `/sobre` |

## 3. Marcas de terceiros e mocks

| Item removido | Estado |
|---|---|
| Marcas reais em mock de dashboard (Siemens, Bosch, etc.) | Não existiam no código do site; mock já anonimizado e agregado |
| Regra aplicada: mock usa uma única empresa fictícia ("TechCorp Lda") | Confirmado |

## 4. Secções e componentes removidos do site

| Item removido | Ficheiro / rota |
|---|---|
| "A História por Trás da Equação" (história pessoal) | `/sobre` |
| "Jornada Técnica" (carrossel) | `JornadaCliente.tsx` — ficheiro eliminado |
| Secção de Cases | `CasesSection.tsx` — ficheiro eliminado |
| Carrossel duplicado da jornada técnica | Home |
| `RaizesEAsas` como "Lógica de Decisão" | Removido e depois reposicionado como diferenciador |
| `MethodologySection` na Home | Movido para `/sobre` |
| `FamiliesSection` na Home | Substituída por `BusinessModelSection` |
| "Como validamos o nosso serviço" | `/sobre` |

## 5. Comercial e pricing

| Item removido |
|---|
| Todas as menções a "Charter Partners" |
| Todos os descontos e condições promocionais |
| Fonte única de preço passou a ser `BusinessModelSection` (250 € / medição, 20% setup) |

## 6. Copy, branding e tipografia

| Item removido | Substituído por |
|---|---|
| Símbolos ™ nos nomes de produto | Nomes sem marca registada |
| Em dash / en dash (—, –) em todo o site | Fraseado natural PT-PT |
| Mensagens "boutique" | Posicionamento GMA |
| "metodologia proprietária" | "metodologia própria" |
| "perspetivas" | "dimensões" |
| "Human Mobility Assurance" | "Global Mobility Assurance" |
| "Human Mobility Risk" | "Global Mobility Risk" |
| "Human Mobility" (genérico) | "Global Mobility" |
| "Global Mobility Success Assessment" | "Human Mobility Assessment" |
| "Delivering" (EN solto) | Tradução PT-PT |
| ISO 31000 em destaque no corpo | Selo discreto no rodapé de `/empresas` e `/servicos` |
| Ícones decorativos nos overlines | Removidos |
| Traços decorativos e marcadores de tópico | Logo MOOVIA |
| Coordenadas verticais e badges | Removidos |
| "30 anos" | "Experiência como expatriados" |
| Marcadores de estação (`JornadaCliente`) | Numerais |
| Página de manutenção no index | Home restaurada |

## 7. Notas

- Todas as remoções foram verificadas por varrimento global no código (`src/`), incluindo dicionários i18n.
- Alterações de conteúdo público não afetaram esquema de base de dados nem políticas de segurança.

---

### 📊 Relatório de Execução

**Padrão utilizado:** FEATURE (documentação)

**Sub-agentes ativados:**

- 🎨 **UI Architect** — ➖ Não necessário
- 🗄️ **Supabase Engineer** — ➖ Não necessário
- 🔍 **Code Auditor** — ✅ Executado
- 🧪 **Testing Agent** — ➖ Não necessário
- 📈 **SEO Optimizer** — ➖ Não necessário
- 🚀 **Deploy Ops** — ➖ Não necessário
- 🔌 **API Integrator** — ➖ Não necessário

**Resumo:** Criado documento de rastreio consolidando todas as remoções solicitadas e executadas no site.

**Arquivos modificados:** 1 (novo)

**Próximos passos sugeridos:**
- Rever a lista e sinalizar qualquer remoção em falta
- Manter este ficheiro atualizado a cada nova ronda de limpeza
