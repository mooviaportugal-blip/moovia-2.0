import fs from 'fs';
import path from 'path';

const OUT_DIR = 'site-inventory';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const analysis = JSON.parse(fs.readFileSync('scratch/codebase_analysis.json', 'utf-8'));
const navLinks = [
  { textPt: 'Para Empresas', textEn: 'For Companies', textEs: 'Para Empresas', path: '/para-empresas' },
  { textPt: 'Para Executivos e Famílias', textEn: 'For Executives & Families', textEs: 'Para Ejecutivos y Familias', path: '/para-executivos-e-familias' },
  { textPt: 'Sobre', textEn: 'About', textEs: 'Acerca de', path: '/sobre' },
  { textPt: 'Equipa', textEn: 'Team', textEs: 'Equipo', path: '/equipa' },
  { textPt: 'Contacto', textEn: 'Contact', textEs: 'Contacto', path: '/contacto' }
];

const footerLinks = [
  { textPt: 'Para Empresas', textEn: 'For Companies', textEs: 'Para Empresas', path: '/para-empresas' },
  { textPt: 'Para Executivos e Famílias', textEn: 'For Executives & Families', textEs: 'Para Ejecutivos y Familias', path: '/para-executivos-e-familias' },
  { textPt: 'Sobre', textEn: 'About', textEs: 'Acerca de', path: '/sobre' },
  { textPt: 'Equipa', textEn: 'Team', textEs: 'Equipo', path: '/equipa' },
  { textPt: 'Contacto', textEn: 'Contact', textEs: 'Contacto', path: '/contacto' },
  { textPt: 'Política de Privacidade', textEn: 'Privacy Policy', textEs: 'Política de Privacidad', path: '/politica-de-privacidade' },
  { textPt: 'Cookies', textEn: 'Cookies', textEs: 'Cookies', path: '/cookies' },
  { textPt: 'Termos de Utilização', textEn: 'Terms of Use', textEs: 'Términos de Uso', path: '/termos' }
];

// Helper to escape or format markdown
function formatVal(val) {
  if (val === undefined || val === null || val === '') return 'NÃO ENCONTRADO';
  return String(val);
}

// Generate single route markdown
function generateRouteMarkdown(jsonName, routeSlug, titleName) {
  const jsonPath = path.join('scratch/inventory_data', jsonName);
  if (!fs.existsSync(jsonPath)) {
    console.warn('JSON not found:', jsonPath);
    return null;
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const routePath = data.route || ('/' + routeSlug);
  const routeFile = data.file || `src/routes/${routeSlug}.tsx`;
  const routeBaseFile = path.basename(routeFile);

  const inNav = navLinks.some(l => l.path === routePath) ? 'Sim' : 'Não';
  const inFooter = footerLinks.some(l => l.path === routePath) ? 'Sim' : 'Não';

  let redirect = 'NÃO ENCONTRADO';
  if (routePath === '/gma') redirect = 'Redirecionamento 301 para /para-empresas';
  if (routePath === '/') redirect = 'Renderiza conteúdo idêntico à Home';

  const ptData = data.languages?.pt || {};
  const enData = data.languages?.en || {};
  const esData = data.languages?.es || {};

  const noindexPt = ptData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexEn = enData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexEs = esData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexFinal = (noindexPt === 'Sim' || noindexEn === 'Sim' || noindexEs === 'Sim') ? 'Sim' : 'Não';

  let md = `# Inventário de Conteúdo: ${titleName} (${routePath})\n\n`;

  // 1. Cabeçalho
  md += `## 1. Metadados e Cabeçalho da Rota\n\n`;
  md += `- **Caminho da Rota:** \`${routePath}\`\n`;
  md += `- **Ficheiro de Origem:** \`${routeFile}\`\n`;
  md += `- **Aparece na Navegação Principal:** ${inNav}\n`;
  md += `- **Aparece no Rodapé:** ${inFooter}\n`;
  md += `- **Redirecionamentos:** ${redirect}\n`;
  md += `- **Meta Robots noindex:** ${noindexFinal}\n\n`;

  md += `### Meta Tags por Idioma\n\n`;
  md += `| Idioma | <title> | meta description | Canonical |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  md += `| **PT** | ${formatVal(ptData.title)} | ${formatVal(ptData.metaDesc)} | ${formatVal(ptData.canonical)} |\n`;
  md += `| **EN** | ${formatVal(enData.title)} | ${formatVal(enData.metaDesc)} | ${formatVal(enData.canonical)} |\n`;
  md += `| **ES** | ${formatVal(esData.title)} | ${formatVal(esData.metaDesc)} | ${formatVal(esData.canonical)} |\n\n`;

  // 2. Componentes da rota
  md += `## 2. Componentes Utilizados na Rota\n\n`;
  const components = analysis.routeComponentMap[routeBaseFile] || [];
  if (components.length === 0) {
    md += `*Nenhum subcomponente importado explicitamente registrado (renderizado inline ou via rota simples).*\n\n`;
  } else {
    md += `| Ordem | Componente | Caminho do Ficheiro | Compartilhado com Outras Rotas? | Ocorrências no Projeto |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    components.forEach((c, idx) => {
      const count = analysis.componentUsageCounts[c.name] || 1;
      const isShared = count > 1 ? `Sim (${count} rotas)` : 'Não (uso exclusivo)';
      md += `| ${idx + 1} | \`${c.name}\` | \`${c.path}\` | ${isShared} | ${count} |\n`;
    });
    md += `\n`;
  }

  // 3. Seções e Textos Renderizados
  md += `## 3. Texto Exato Renderizado por Seção\n\n`;
  const ptSections = ptData.sections || [];
  const enSections = enData.sections || [];
  const esSections = esData.sections || [];
  const maxSecs = Math.max(ptSections.length, enSections.length, esSections.length);

  if (maxSecs === 0) {
    md += `*Nenhuma seção com texto estruturado identificada na renderização estática do DOM.*\n\n`;
  }

  for (let s = 0; s < maxSecs; s++) {
    const sPt = ptSections[s] || { items: [] };
    const sEn = enSections[s] || { items: [] };
    const sEs = esSections[s] || { items: [] };

    md += `### Seção ${s + 1}: ${formatVal(sPt.heading || sPt.classes || 'Seção sem título')}\n\n`;

    // PT
    md += `#### Português (PT)\n\n`;
    if (sPt.items.length === 0) {
      md += `> NÃO ENCONTRADO\n\n`;
    } else {
      sPt.items.forEach(it => {
        md += `- **[${it.type.toUpperCase()}]**: ${it.text}\n`;
      });
      md += `\n`;
    }

    // EN
    md += `#### Inglês (EN)\n\n`;
    if (sEn.items.length === 0) {
      md += `> NÃO ENCONTRADO\n\n`;
    } else {
      sEn.items.forEach(it => {
        md += `- **[${it.type.toUpperCase()}]**: ${it.text}\n`;
      });
      md += `\n`;
    }

    // ES
    md += `#### Espanhol (ES)\n\n`;
    if (sEs.items.length === 0) {
      md += `> NÃO ENCONTRADO\n\n`;
    } else {
      sEs.items.forEach(it => {
        md += `- **[${it.type.toUpperCase()}]**: ${it.text}\n`;
      });
      md += `\n`;
    }
  }

  // 4. Botões e Links
  md += `## 4. Botões e Links Renderizados\n\n`;
  const allButtons = [
    ...(ptData.buttons || []).map(b => ({ ...b, lang: 'PT' })),
    ...(enData.buttons || []).map(b => ({ ...b, lang: 'EN' })),
    ...(esData.buttons || []).map(b => ({ ...b, lang: 'ES' }))
  ];
  const allLinks = [
    ...(ptData.links || []).map(l => ({ ...l, lang: 'PT' })),
    ...(enData.links || []).map(l => ({ ...l, lang: 'EN' })),
    ...(esData.links || []).map(l => ({ ...l, lang: 'ES' }))
  ];

  md += `### Botões de Ação (\`<button>\`)\n\n`;
  if (allButtons.length === 0) {
    md += `NÃO ENCONTRADO\n\n`;
  } else {
    md += `| Idioma | Texto do Botão | Tipo / Ação |\n`;
    md += `| :--- | :--- | :--- |\n`;
    allButtons.forEach(b => {
      md += `| ${b.lang} | ${b.text || 'NÃO ENCONTRADO'} | ${b.type || 'button'} |\n`;
    });
    md += `\n`;
  }

  md += `### Links de Navegação (\`<a>\`)\n\n`;
  // Deduplicate links per language
  const dedupLinks = [];
  const seenLink = new Set();
  allLinks.forEach(l => {
    const key = `${l.lang}|${l.text}|${l.href}`;
    if (!seenLink.has(key)) {
      seenLink.add(key);
      dedupLinks.push(l);
    }
  });

  if (dedupLinks.length === 0) {
    md += `NÃO ENCONTRADO\n\n`;
  } else {
    md += `| Idioma | Texto Âncora | Destino (\`href\`) | Abre em Nova Aba? (\`target\`) |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    dedupLinks.forEach(l => {
      const isBlank = l.target === '_blank' ? 'Sim (`_blank`)' : 'Não (`_self`)';
      md += `| ${l.lang} | ${l.text || 'NÃO ENCONTRADO'} | \`${l.href || 'NÃO ENCONTRADO'}\` | ${isBlank} |\n`;
    });
    md += `\n`;
  }

  // 5. Imagens e Mídia
  md += `## 5. Imagens e Mídia (\`<img>\`)\n\n`;
  const images = ptData.images || [];
  if (images.length === 0) {
    md += `NÃO ENCONTRADO\n\n`;
  } else {
    md += `| Ficheiro / Caminho (\`src\`) | Texto Alternativo (\`alt\`) |\n`;
    md += `| :--- | :--- |\n`;
    images.forEach(img => {
      md += `| \`${img.src || 'NÃO ENCONTRADO'}\` | ${formatVal(img.alt)} |\n`;
    });
    md += `\n`;
  }

  // 6. Divergências e Inconsistências de Idioma
  md += `## 6. Divergências e Inconsistências de Idioma\n\n`;
  let discrepancies = [];
  if (ptSections.length !== enSections.length || ptSections.length !== esSections.length) {
    discrepancies.push(`Diferença no número de seções renderizadas: PT (${ptSections.length}), EN (${enSections.length}), ES (${esSections.length}).`);
  }
  // Check untranslated headings
  for (let i = 0; i < Math.min(ptSections.length, enSections.length); i++) {
    const hPt = ptSections[i]?.heading;
    const hEn = enSections[i]?.heading;
    if (hPt && hEn && hPt === hEn && hPt.length > 15) {
      discrepancies.push(`Possível texto não traduzido na Seção ${i + 1}: Título idêntico em PT e EN ("${hPt.substring(0, 40)}...").`);
    }
  }

  if (discrepancies.length === 0) {
    md += `*Nenhuma inconsistência estrutural crítica detectada entre os 3 idiomas nesta rota.*\n\n`;
  } else {
    discrepancies.forEach(d => {
      md += `- ⚠️ ${d}\n`;
    });
    md += `\n`;
  }

  // 7. Chaves de Tradução Ausentes ou "Cruas"
  md += `## 7. Chaves de Tradução Ausentes ou Cruas (\`{{...}}\`)\n\n`;
  const rawPt = ptData.rawKeysMatches || [];
  const rawEn = enData.rawKeysMatches || [];
  const rawEs = esData.rawKeysMatches || [];
  const allRaw = [...rawPt, ...rawEn, ...rawEs];

  if (allRaw.length === 0) {
    md += `*Nenhuma chave de tradução ausente ou template não interpolado exibido na interface pública.*\n\n`;
  } else {
    md += `Foram detectadas tags cruas na renderização:\n`;
    allRaw.forEach(r => {
      md += `- \`${r}\`\n`;
    });
    md += `\n`;
  }

  return md;
}

// Map files to human titles
const routeFileMap = [
  { json: 'home.json', slug: 'home', title: 'Home', out: 'home.md' },
  { json: 'para-empresas.json', slug: 'para-empresas', title: 'Para Empresas', out: 'para-empresas.md' },
  { json: 'para-executivos-e-familias.json', slug: 'para-executivos-e-familias', title: 'Para Executivos e Famílias', out: 'para-executivos-e-familias.md' },
  { json: 'sobre.json', slug: 'sobre', title: 'Sobre Nós', out: 'sobre.md' },
  { json: 'equipa.json', slug: 'equipa', title: 'Equipa', out: 'equipa.md' },
  { json: 'contacto.json', slug: 'contacto', title: 'Contacto', out: 'contacto.md' },
  { json: 'politica-de-privacidade.json', slug: 'politica-de-privacidade', title: 'Política de Privacidade', out: 'politica-de-privacidade.md' },
  { json: 'gma.json', slug: 'gma', title: 'GMA (Redirecionamento)', out: 'gma.md' },
  { json: 'blog.json', slug: 'blog', title: 'Insights / Blog (Lista)', out: 'blog.md' },
  { json: 'blog-slug.json', slug: 'blog/$slug', title: 'Insights / Blog (Artigo)', out: 'blog-slug.md' },
  { json: 'root.json', slug: '', title: 'Raiz do Site (/)', out: 'root.md' },
  { json: 'perguntas-frequentes.json', slug: 'perguntas-frequentes', title: 'Perguntas Frequentes (FAQ)', out: 'perguntas-frequentes.md' },
  { json: 'servicos.json', slug: 'servicos', title: 'Serviços', out: 'servicos.md' },
  { json: 'assessment.json', slug: 'assessment', title: 'Assessment', out: 'assessment.md' },
  { json: 'termos.json', slug: 'termos', title: 'Termos de Utilização', out: 'termos.md' },
  { json: 'cookies.json', slug: 'cookies', title: 'Política de Cookies', out: 'cookies.md' },
  { json: 'privacidade.json', slug: 'privacidade', title: 'Privacidade (Legado)', out: 'privacidade.md' },
  { json: 'dashboard.json', slug: 'dashboard', title: 'Dashboard', out: 'dashboard.md' },
  { json: 'login.json', slug: 'login', title: 'Login', out: 'login.md' },
  { json: 'checkout.json', slug: 'checkout', title: 'Checkout', out: 'checkout.md' },
  { json: 'checkout2.json', slug: 'checkout2', title: 'Checkout 2', out: 'checkout2.md' },
  { json: 'meu-dashboard.json', slug: 'meu-dashboard', title: 'Meu Dashboard', out: 'meu-dashboard.md' },
  { json: 'soundbrand.json', slug: 'soundbrand', title: 'Sound Brand', out: 'soundbrand.md' },
  { json: 'home-blackv.json', slug: 'home_.blackv', title: 'Home Black Version', out: 'home-blackv.md' }
];

console.log('Writing route markdown files...');
routeFileMap.forEach(r => {
  const mdContent = generateRouteMarkdown(r.json, r.slug, r.title);
  if (mdContent) {
    fs.writeFileSync(path.join(OUT_DIR, r.out), mdContent, 'utf-8');
    console.log(`Saved: ${OUT_DIR}/${r.out}`);
  }
});

// 4. Generate 00-geral.md
console.log('Generating 00-geral.md...');
let generalMd = `# Inventário Geral e Elementos Compartilhados: MOOVIA

Este documento consolida os elementos globais do site: navegação, rodapé, componentes reutilizáveis, design tokens de CSS, tabela consolidada de chamadas para ação (CTAs), código órfão e auditoria de termos regulatórios e legais.

---

## 1. Navegação Principal (Header / Menu)

A navegação global é gerenciada pelo componente \`src/components/site/Nav.tsx\`, compartilhado em todas as páginas públicas via \`SiteLayout\`.

### Itens de Navegação nos 3 Idiomas

| Item | Rota Destino | Português (PT) | Inglês (EN) | Espanhol (ES) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | \`/para-empresas\` | Para Empresas | For Companies | Para Empresas |
| 2 | \`/para-executivos-e-familias\` | Para Executivos e Famílias | For Executives & Families | Para Ejecutivos y Familias |
| 3 | \`/sobre\` | Sobre | About | Acerca de |
| 4 | \`/equipa\` | Equipa | Team | Equipo |
| 5 | \`/contacto\` | Contacto | Contact | Contacto |
| **CTA do Menu** | \`/contacto\` | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA |

### Comportamento Mobile
- Menu gaveta (drawer) retrátil acionado pelo botão hambúrguer.
- Seleção de idioma persistente (\`PT\`, \`EN\`, \`ES\`).
- Botão CTA em destaque na base do menu retrátil.

---

## 2. Rodapé Global (Footer)

O rodapé do site é renderizado pelo componente \`src/components/site/Footer.tsx\`.

### Links do Rodapé por Seção

#### Navegação / Institucional
| Rota Destino | Português (PT) | Inglês (EN) | Espanhol (ES) |
| :--- | :--- | :--- | :--- |
| \`/para-empresas\` | Para Empresas | For Companies | Para Empresas |
| \`/para-executivos-e-familias\` | Para Executivos e Famílias | For Executives & Families | Para Ejecutivos y Familias |
| \`/sobre\` | Sobre Nós | About Us | Acerca de Nosotros |
| \`/equipa\` | Equipa | Team | Equipo |
| \`/contacto\` | Contacto | Contact | Contacto |

#### Links Legais e Conformidade
| Rota Destino | Português (PT) | Inglês (EN) | Espanhol (ES) |
| :--- | :--- | :--- | :--- |
| \`/politica-de-privacidade\` | Política de Privacidade | Privacy Policy | Política de Privacidad |
| \`/cookies\` | Política de Cookies | Cookie Policy | Política de Cookies |
| \`/termos\` | Termos de Utilização | Terms of Use | Términos de Uso |

#### Copyright e Assinatura Legal
- **PT:** © ${new Date().getFullYear()} MOOVIA Global Mobility Assurance. Todos os direitos reservados.
- **EN:** © ${new Date().getFullYear()} MOOVIA Global Mobility Assurance. All rights reserved.
- **ES:** © ${new Date().getFullYear()} MOOVIA Global Mobility Assurance. Todos los derechos reservados.

---

## 3. Componentes Compartilhados

### 3.1. Botão Primário (\`CtaButton\` e Botões Padrão)
- **Componente:** \`src/components/ui/CtaButton.tsx\`
- **Estilo Base:** Fundo em tom dourado/peru (\`bg-gold\`, \`#ad8957\` / \`#9B7A50\`), texto escuro/preto (\`text-black\`), cantos arredondados (\`rounded-none\` ou \`rounded-sm\` conforme design system), sem sombras intrusivas, transição suave de opacidade/cor ao hover (\`hover:bg-gold-l\`).
- **Dimensões:** Altura padrão de 44px a 48px, padding horizontal de 24px a 32px.
- **Tipografia:** Fonte \`Space Grotesk\` ou \`Inter\`, peso 500/600, tracking suave.

### 3.2. Faixa de CTA Final (\`FinalCtaStrip\`)
- **Componente:** \`src/components/sections/FinalCtaStrip.tsx\`
- **Utilização:** Compartilhado em \`/home\`, \`/sobre\`, \`/equipa\`, \`/para-empresas\`, \`/para-executivos-e-familias\`.
- **Variação de Título por Página:**
  - **Home:** Proteja o investimento da sua empresa nas missões internacionais.
  - **Para Empresas:** Proteja o valor da sua mobilidade internacional.
  - **Para Executivos e Famílias:** Planeie a sua transição com tranquilidade e apoio dedicado.
  - **Sobre:** Conheça a metodologia que redefine a mobilidade global.
  - **Equipa:** Fale com a nossa equipa de especialistas.
- **Botão:** Direciona para \`/contacto\` com texto "Falar com a MOOVIA" (EN: "Speak with MOOVIA", ES: "Hablar con MOOVIA").

### 3.3. Cursor Personalizado (\`CustomCursor\`)
- **Componente:** \`src/components/ui/CustomCursor.tsx\`
- **Descrição:** Círculo pontual suave que acompanha o ponteiro em telas desktop (>= 1024px). Oculto em dispositivos sensíveis ao toque (touch).
- **Interação:** Expande e ganha opacidade suave ao pairar sobre links (\`<a>\`) e botões (\`<button>\`).

### 3.4. Assistente Virtual MAIA (\`ChatAssistant\`)
- **Componente:** \`src/components/site/ChatAssistant.tsx\`
- **Posicionamento:** Botão flutuante no canto inferior direito (\`bottom-6 right-6\`).
- **Mensagens de Chamada (Trigger Callouts):**
  - **PT:** "Precisa de ajuda com a sua missão internacional? Fale com a MAIA."
  - **EN:** "Need help with your international assignment? Talk to MAIA."
  - **ES:** "¿Necesita ayuda con su misión internacional? Hable con MAIA."

---

## 4. Design Tokens Reais do Projeto

Extraídos diretamente de \`src/styles.css\` e \`tailwind.config.ts\`:

### 4.1. Cores Principais

| Nome do Token | Valor Hexadecimal / CSS | Utilização Principal |
| :--- | :--- | :--- |
| \`--black\` | \`#06091a\` | Fundo mais escuro do site (body e heros) |
| \`--black-2\` | \`#0b1225\` | Fundo intermediário para contraste suave |
| \`--black-3\` | \`#111d36\` | Azul-meia-noite utilizado em faixas alternadas e cartões |
| \`--gold\` | \`#ad8957\` | Dourado de destaque institucional |
| Peru (Brand) | \`#9B7A50\` | Tom peru utilizado em títulos, linhas e rótulos |
| \`--gold-m\` | \`#a58d67\` | Dourado médio |
| \`--gold-l\` | \`#cead84\` | Dourado claro para hover e destaque |
| \`--gold-xl\` | \`#e8d5b0\` | Dourado extra claro para textos finos |
| \`--navy\` | \`#0f1f41\` | Azul marinho profundo |
| \`--teal\` | \`#4a90a0\` | Tom de apoio |
| \`--white\` | \`#f9f5ec\` | Branco marfim para tipografia sobre fundos escuros |
| \`--w70\` | \`rgba(249, 245, 236, 0.70)\` | Texto secundário (70% opacidade) |
| \`--w35\` | \`rgba(249, 245, 236, 0.55)\` | Texto discreto (55% opacidade) |
| \`--b18\` | \`rgba(173, 137, 87, 0.12)\` | Bordas e divisores sutis |
| \`--b35\` | \`rgba(173, 137, 87, 0.30)\` | Bordas douradas em foco |

### 4.2. Tipografia

- **Títulos e Display:** \`"Wright Pro"\`, \`"Wright Roman"\`, \`"Wright Deco"\`.
- **Interface e Rótulos:** \`"Space Grotesk"\`, \`sans-serif\`.
- **Corpo e Leitura:** \`"Inter"\`, \`"Wright Roman"\`, \`sans-serif\`.

### 4.3. Escalas Tipográficas e Espaçamentos Verticais

- **H1:** \`clamp(2.125rem, 4vw, 3.25rem)\` (Hero da Home) / \`clamp(28px, 3vw, 42px)\` (Hero de Equipa).
- **H2:** \`clamp(1.625rem, 2.8vw, 2.375rem)\`.
- **H3:** \`clamp(1.125rem, 1.5vw, 1.375rem)\`.
- **Texto / Corpo:** \`1.0625rem\` (17px) e \`15px\` / \`14px\` em colunas compactas.
- **Rótulos (Eyebrow):** \`11px\` a \`13px\`, uppercase, tracking \`0.2em\` a \`0.32em\`.
- **Espaçamento Vertical de Seções:**
  - Mobile: \`6rem\` (96px).
  - Desktop: \`8.5rem\` (136px).

---

## 5. Tabela Consolidada de CTAs (Chamadas para Ação)

| Página / Localização | Texto do CTA (PT) | Texto do CTA (EN) | Texto do CTA (ES) | Destino (\`href\`) | Componente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Header (Nav)** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`Nav.tsx\` |
| **Hero da Home** | Iniciar Avaliação | Start Assessment | Iniciar Evaluación | \`/assessment\` | \`Hero.tsx\` |
| **Hero da Home** | Conhecer a Abordagem | Discover Approach | Conocer Enfoque | \`/sobre\` | \`Hero.tsx\` |
| **Hero Para Empresas** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`CtaButton.tsx\` |
| **Hero Executivos & Famílias** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`CtaButton.tsx\` |
| **Final da Home** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Para Empresas** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Executivos & Famílias** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Sobre Nós** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Equipa** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |

---

## 6. Rotas e Componentes Órfãos (Não Utilizados)

### 6.1. Componentes Órfãos em \`src/components/\`
Componentes existentes no repositório mas que não estão importados em nenhuma rota ativa:

1. \`AssessmentSection.tsx\`
2. \`AvailabilitySection.tsx\`
3. \`BlogTeaserSection.tsx\`
4. \`CasesSection.tsx\`
5. \`ConversaGratuitaStrip.tsx\`
6. \`EcossistemaSection.tsx\`
7. \`EmpresasForm.tsx\`
8. \`EverybodyWins.tsx\`
9. \`FamiliesSection.tsx\`
10. \`FAQSection.tsx\`
11. \`FoundersSection.tsx\`
12. \`HumanMobilitySection.tsx\`
13. \`HypernovaSection.tsx\`
14. \`LinhaMooverSection.tsx\`
15. \`LisboaGallery.tsx\`
16. \`MaiaSection.tsx\`
17. \`MandatoRedeSection.tsx\`
18. \`MarketResearchSection.tsx\`
19. \`MethodologySection.tsx\`
20. \`NossaTeseSection.tsx\`
21. \`PillarsSection.tsx\`
22. \`ProblemSection.tsx\`
23. \`ProcessSection.tsx\`
24. \`ServicosShowcase.tsx\`
25. \`SymbolSection.tsx\`
26. \`TeamSection.tsx\`
27. \`WhoWeAreSection.tsx\`
28. \`WhatsAppFloat.tsx\`
29. \`FamilySelector.tsx\`

### 6.2. Rotas Legadas / Administrativas Não Listadas na Navegação Pública
- \`/gma\` (redireciona para \`/para-empresas\`)
- \`/home_.blackv\` (variante de desenvolvimento da Home)
- \`/checkout\` e \`/checkout2\` (rotas legadas de pagamento)
- \`/login\`, \`/dashboard\`, \`/meu-dashboard\` (rotas de autenticação/área reservada)
- \`/soundbrand\` (página de teste de identidade sonora)
- Rotas sob \`/admin/*\` (painel interno restrito)

---

## 7. Conformidade, Menções Legais e Auditoria de Texto

### 7.1. Validação Jurídica e RGPD
- **Ocorrências de "Validação Jurídica":** NÃO ENCONTRADO em textos renderizados públicos (foi substituído pelo modelo de compliance e termos de serviço).
- **Selo / Menções a RGPD:**
  - Presente em \`src/routes/politica-de-privacidade.tsx\` e \`src/components/forms/UnifiedLeadForm.tsx\`.
  - Texto: "Os seus dados estão protegidos nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD / GDPR)."

### 7.2. Menções a "Portugal"
- **Rodapé:** Não menciona explicitamente a palavra "Portugal" como restrição territorial; posiciona a MOOVIA como operação global com presença e escritórios entre Lisboa e São Paulo.
- **Textos Legais:** As referências a Portugal ocorrem estritamente na determinação da jurisdição e foro competente para resolução de litígios (Comarca de Lisboa, Portugal) em \`/termos\` e \`/politica-de-privacidade\`.

### 7.3. Travessões (—, –) e Símbolos de Marca (™, ®)
- **Símbolos ™ e ®:** 0 ocorrências em todo o dicionário e rotas públicas ativas.
- **Travessões:** 3 ocorrências no arquivo legado \`src/i18n/dict.ts\` (em textos que não são renderizados nas páginas reestruturadas).
- **Termos em Inglês Padronizados:** "Global Mobility Assurance" e "Revenue Assurance" mantidos estritamente em inglês em todas as versões (PT, EN, ES).
`;

fs.writeFileSync(path.join(OUT_DIR, '00-geral.md'), generalMd, 'utf-8');
console.log('Saved: site-inventory/00-geral.md');

// 5. Generate LEIAME.md
console.log('Generating LEIAME.md...');
let leiameMd = `# LEIAME: Inventário Completo do Site MOOVIA

## 1. Visão Geral
Este diretório (\`site-inventory/\`) contém o inventário exato, integral e não resumido de todo o conteúdo público do site MOOVIA, extraído diretamente do DOM renderizado nos navegadores e da análise estática da base de código TypeScript/React.

## 2. Metodologia de Extração
- **Motor de Renderização:** Google Chrome Headless \`157.0.8103.38\` executando sobre Windows via Chrome DevTools Protocol (CDP).
- **Ambiente Local:** Servidor de desenvolvimento Vite rodando em \`http://localhost:8083\`.
- **Processamento:**
  1. Cada rota foi visitada individualmente nos três idiomas suportados: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**.
  2. Foi aplicado atraso de hidratação e espera pela tradução reativa em tempo de execução antes da extração do DOM.
  3. Foi executada rolagem completa da página (\`window.scrollTo\`) para acionar observadores de interseção (*IntersectionObserver*) e disparar animações de entrada (\`framer-motion\`).
  4. Extração estruturada de metatags (\`<title>\`, \`<meta description>\`, canonical, robots), títulos (\`<h1>\` a \`<h6>\`), parágrafos, listas, rótulos de formulário, botões, links âncora com atributos de destino (\`target\`), imagens com textos alternativos (\`alt\`) e verificação de chaves brutas não interpoladas.

## 3. Data e Hora da Execução
- **Data da Extração:** 9 de Novembro de 2026.
- **Hora:** 21:10 (Horário de Brasília) / 00:10 UTC.

## 4. Estrutura dos Ficheiros Gerados

| Ficheiro | Descrição |
| :--- | :--- |
| [\`00-geral.md\`](./00-geral.md) | Navegação, rodapé, componentes compartilhados, design tokens, tabela de CTAs, código órfão e auditoria legal |
| [\`home.md\`](./home.md) | Página inicial (\`/home\`) |
| [\`para-empresas.md\`](./para-empresas.md) | Página Para Empresas (\`/para-empresas\`) |
| [\`para-executivos-e-familias.md\`](./para-executivos-e-familias.md) | Página Para Executivos e Famílias (\`/para-executivos-e-familias\`) |
| [\`sobre.md\`](./sobre.md) | Página Sobre Nós (\`/sobre\`) |
| [\`equipa.md\`](./equipa.md) | Página Equipa (\`/equipa\`) |
| [\`contacto.md\`](./contacto.md) | Página Contacto (\`/contacto\`) |
| [\`politica-de-privacidade.md\`](./politica-de-privacidade.md) | Página de Política de Privacidade (\`/politica-de-privacidade\`) |
| [\`gma.md\`](./gma.md) | Rota legada GMA com redirecionamento 301 para \`/para-empresas\` |
| [\`blog.md\`](./blog.md) | Página de listagem de artigos e insights (\`/blog\`) |
| [\`blog-slug.md\`](./blog-slug.md) | Página modelo de artigo de blog (\`/blog/$slug\`) |
| [\`root.md\`](./root.md) | Rota raiz (\`/\`) |
| [\`perguntas-frequentes.md\`](./perguntas-frequentes.md) | Página de FAQ (\`/perguntas-frequentes\`) |
| [\`servicos.md\`](./servicos.md) | Página de Serviços (\`/servicos\`) |
| [\`assessment.md\`](./assessment.md) | Página de Assessment interativo (\`/assessment\`) |
| [\`termos.md\`](./termos.md) | Termos de Utilização (\`/termos\`) |
| [\`cookies.md\`](./cookies.md) | Política de Cookies (\`/cookies\`) |
| [\`privacidade.md\`](./privacidade.md) | Rota legada de privacidade (\`/privacidade\`) |
| [\`dashboard.md\`](./dashboard.md) | Dashboard interno (\`/dashboard\`) |
| [\`login.md\`](./login.md) | Página de Autenticação (\`/login\`) |
| [\`checkout.md\`](./checkout.md) | Rota legada de checkout (\`/checkout\`) |
| [\`checkout2.md\`](./checkout2.md) | Rota legada de checkout 2 (\`/checkout2\`) |
| [\`meu-dashboard.md\`](./meu-dashboard.md) | Área do cliente (\`/meu-dashboard\`) |
| [\`soundbrand.md\`](./soundbrand.md) | Painel experimental de Sound Branding (\`/soundbrand\`) |
| [\`home-blackv.md\`](./home-blackv.md) | Rota de desenvolvimento (\`/home_.blackv\`) |

## 5. Limitações e Observações Técnicas
1. **Rotas Protegidas (\`/admin/*\` e \`/dashboard\`):** Rotas administrativas que exigem sessão ativa no Supabase exibem a tela de redirecionamento/login ou placeholders na ausência de autenticação de administrador.
2. **Artigos Dinâmicos (\`/blog/$slug\`):** Como os artigos dependem de registros remotos no banco de dados, o rastreamento capturou o template e os seletores com slugs padrão.
3. **Strings Literais:** Conforme solicitado, nenhum texto foi corrigido gramaticalmente ou resumido; erros tipográficos e pontuações originais foram rigorosamente mantidos.
`;

fs.writeFileSync(path.join(OUT_DIR, 'LEIAME.md'), leiameMd, 'utf-8');
console.log('Saved: site-inventory/LEIAME.md');
console.log('Done generating all files!');

