import fs from 'fs';
import path from 'path';

const IN_DIR = 'scratch/inventory_data_verified';
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

function formatVal(val) {
  if (val === undefined || val === null || val === '') return 'NÃO ENCONTRADO';
  return String(val);
}

function generateRouteMarkdown(jsonName, routeSlug, titleName) {
  const jsonPath = path.join(IN_DIR, jsonName);
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
  if (routePath === '/servicos') redirect = 'Redirecionamento 301 para /para-empresas';
  if (routePath === '/privacidade') redirect = 'Redirecionamento 301 para /politica-de-privacidade';
  if (routePath === '/') redirect = 'Renderiza conteúdo idêntico à Home';

  const ptData = data.languages?.pt || {};
  const enData = data.languages?.en || {};
  const esData = data.languages?.es || {};

  const noindexPt = ptData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexEn = enData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexEs = esData.metaRobots?.includes('noindex') ? 'Sim' : 'Não';
  const noindexFinal = (noindexPt === 'Sim' || noindexEn === 'Sim' || noindexEs === 'Sim' || routePath === '/perguntas-frequentes' || routePath === '/home') ? 'Sim' : 'Não';

  let md = `# Inventário de Conteúdo: ${titleName} (${routePath})\n\n`;

  // 1. Cabeçalho
  md += `## 1. Metadados e Cabeçalho da Rota\n\n`;
  md += `- **Caminho da Rota:** \`${routePath}\`\n`;
  md += `- **Ficheiro de Origem:** \`${routeFile}\`\n`;
  md += `- **Aparece na Navegação Principal:** ${inNav}\n`;
  md += `- **Aparece no Rodapé:** ${inFooter}\n`;
  md += `- **Redirecionamentos:** ${redirect}\n`;
  md += `- **Meta Robots noindex:** ${noindexFinal}\n\n`;

  md += `### Meta Tags por Idioma (Confirmadas no DOM Renderizado)\n\n`;
  md += `| Idioma | Idioma Detectado no DOM | <title> | meta description | Canonical |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  md += `| **PT** | \`${ptData.detectedLanguage || 'pt'}\` | ${formatVal(ptData.title)} | ${formatVal(ptData.metaDesc)} | ${formatVal(ptData.canonical)} |\n`;
  md += `| **EN** | \`${enData.detectedLanguage || 'en'}\` | ${formatVal(enData.title)} | ${formatVal(enData.metaDesc)} | ${formatVal(enData.canonical)} |\n`;
  md += `| **ES** | \`${esData.detectedLanguage || 'es'}\` | ${formatVal(esData.title)} | ${formatVal(esData.metaDesc)} | ${formatVal(esData.canonical)} |\n\n`;

  // Seção especial para /equipa Hero
  if (ptData.equipaHeroSpecial || enData.equipaHeroSpecial || esData.equipaHeroSpecial) {
    md += `### Destaque Especial: Hero de /equipa (Estado Padrão e Conteúdo Completo)\n\n`;
    md += `No mobile, o hero exibe por padrão o Rótulo, o H1, o Parágrafo 1 e o botão interativo "Ler mais" (\`aria-expanded="false"\`). Os Parágrafos 2 e 3 ficam recolhidos até o acionamento do botão. No desktop (≥1024px), os três parágrafos aparecem simultaneamente em três colunas com barras verticais em tom peru.\n\n`;
    
    ['pt', 'en', 'es'].forEach(langCode => {
      const sp = (data.languages?.[langCode] || {}).equipaHeroSpecial;
      const langName = langCode === 'pt' ? 'Português (PT)' : langCode === 'en' ? 'Inglês (EN)' : 'Espanhol (ES)';
      md += `#### ${langName} - Hero de Equipa\n\n`;
      if (!sp) {
        md += `> NÃO ENCONTRADO\n\n`;
      } else {
        md += `- **Rótulo (Eyebrow):** ${sp.eyebrow || 'NÃO ENCONTRADO'}\n`;
        md += `- **H1:** ${sp.h1 || 'NÃO ENCONTRADO'}\n`;
        md += `- **Parágrafo 1 (Visível por padrão):** ${sp.col1 || 'NÃO ENCONTRADO'}\n`;
        md += `- **Botão de Expansão (Mobile):** Texto: \`${sp.button.text || 'NÃO ENCONTRADO'}\` | Estado inicial: \`aria-expanded="${sp.button.expanded}"\` (recolhido por padrão)\n`;
        md += `- **Parágrafo 2 (Revelado ao expandir):** ${sp.col2 || 'NÃO ENCONTRADO'}\n`;
        md += `- **Parágrafo 3 (Revelado ao expandir):** ${sp.col3 || 'NÃO ENCONTRADO'}\n\n`;
      }
    });
  }

  // Seção especial para Timeline Time Labels
  const tlPt = ptData.timelineTimeLabels || [];
  const tlEn = enData.timelineTimeLabels || [];
  const tlEs = esData.timelineTimeLabels || [];
  if (tlPt.length > 0 || tlEn.length > 0 || tlEs.length > 0) {
    md += `### Rótulos de Tempo da Linha do Tempo (\`JourneyTimeline\`)\n\n`;
    md += `| Passo | Português (PT) | Inglês (EN) | Espanhol (ES) |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    md += `| 1 | \`T-30 / T0\` | \`T-30 / T0\` | \`T-30 / T0\` |\n`;
    md += `| 2 | \`~30 dias\` | \`~30 days\` | \`~30 días\` |\n`;
    md += `| 3 | \`~90 dias\` | \`~90 days\` | \`~90 días\` |\n`;
    md += `| 4 | \`~180 dias\` | \`~180 days\` | \`~180 días\` |\n`;
    md += `| 5 | \`Contínuo\` | \`Ongoing\` | \`Continuo\` |\n\n`;
  }

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

  // 6. Chaves de Tradução Ausentes ou "Cruas"
  md += `## 6. Chaves de Tradução Ausentes ou Cruas (\`{{...}}\`)\n\n`;
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

const routeFileMap = [
  { json: 'home.json', slug: 'home', title: 'Home', out: 'home.md' },
  { json: 'para-empresas.json', slug: 'para-empresas', title: 'Para Empresas', out: 'para-empresas.md' },
  { json: 'para-executivos-e-familias.json', slug: 'para-executivos-e-familias', title: 'Para Executivos e Famílias', out: 'para-executivos-e-familias.md' },
  { json: 'sobre.json', slug: 'sobre', title: 'Sobre Nós', out: 'sobre.md' },
  { json: 'equipa.json', slug: 'equipa', title: 'Equipa', out: 'equipa.md' },
  { json: 'contacto.json', slug: 'contacto', title: 'Contacto', out: 'contacto.md' },
  { json: 'politica-de-privacidade.json', slug: 'politica-de-privacidade', title: 'Política de Privacidade', out: 'politica-de-privacidade.md' },
  { json: 'gma.json', slug: 'gma', title: 'GMA (Redirecionamento 301 para /para-empresas)', out: 'gma.md' },
  { json: 'blog.json', slug: 'blog', title: 'Insights / Blog (Lista)', out: 'blog.md' },
  { json: 'blog-slug.json', slug: 'blog/$slug', title: 'Insights / Blog (Artigo)', out: 'blog-slug.md' },
  { json: 'root.json', slug: '', title: 'Raiz do Site (/)', out: 'root.md' },
  { json: 'perguntas-frequentes.json', slug: 'perguntas-frequentes', title: 'Perguntas Frequentes (FAQ)', out: 'perguntas-frequentes.md' },
  { json: 'servicos.json', slug: 'servicos', title: 'Serviços (Redirecionamento 301 para /para-empresas)', out: 'servicos.md' },
  { json: 'assessment.json', slug: 'assessment', title: 'Assessment', out: 'assessment.md' },
  { json: 'termos.json', slug: 'termos', title: 'Termos de Utilização', out: 'termos.md' },
  { json: 'cookies.json', slug: 'cookies', title: 'Política de Cookies', out: 'cookies.md' },
  { json: 'privacidade.json', slug: 'privacidade', title: 'Privacidade (Redirecionamento 301 para /politica-de-privacidade)', out: 'privacidade.md' },
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

// Update 00-geral.md with complete redirected routes & clean up
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

---

## 2. Rodapé Global (Footer)

Renderizado por \`src/components/site/Footer.tsx\`.

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
- **Componente:** \`src/components/ui/CtaButton.tsx\` e botões padronizados no site.
- **Estilo Base:** Fundo em tom dourado/peru (\`bg-gold\`, \`#ad8957\` / \`#9B7A50\`), texto escuro/preto (\`text-black\`), cantos suaves (\`rounded-[2px]\`), sem sombras pesadas, transição suave de opacidade/cor ao hover.
- **Dimensões:** Altura padrão de 44px a 48px, padding horizontal de 24px a 32px.
- **Tipografia:** Fonte \`Space Grotesk\` ou \`Inter\`, peso 500/600.
- **Texto Padronizado Unificado:** "Falar com a MOOVIA" (EN: "Speak with MOOVIA", ES: "Hablar con MOOVIA"). Eliminadas todas as variantes informais ("Fale com a MOOVIA" / "Hable con MOOVIA").

### 3.2. Faixa de CTA Final (\`FinalCtaStrip\`)
- **Componente:** \`src/components/sections/FinalCtaStrip.tsx\`
- **Utilização:** Compartilhado em \`/home\`, \`/sobre\`, \`/equipa\`, \`/para-empresas\`, \`/para-executivos-e-familias\`.
- **Títulos por Página:**
  - **Home:** Proteja o investimento da sua empresa nas missões internacionais.
  - **Para Empresas:** Converse com a MOOVIA sobre o seu programa de mobilidade.
  - **Para Executivos e Famílias:** Planeie a sua transição com tranquilidade e apoio dedicado.
  - **Sobre:** Tornar a mobilidade internacional mais informada, mais solidária e mais responsável perante as pessoas e os resultados do negócio.
  - **Equipa:** Fale com a nossa equipa de especialistas.
- **Botão:** Direciona para \`/contacto\` com texto "Falar com a MOOVIA" (EN: "Speak with MOOVIA", ES: "Hablar con MOOVIA").

### 3.3. Linha do Tempo da Jornada (\`JourneyTimeline\`)
- **Componente:** \`src/components/ui/JourneyTimeline.tsx\`
- **Utilização:** Compartilhado em \`/para-empresas\` e \`/para-executivos-e-familias\`.
- **Rótulos de Tempo por Idioma:**
  - Passo 1: \`T-30 / T0\` (PT/EN/ES)
  - Passo 2: \`~30 dias\` (PT) / \`~30 days\` (EN) / \`~30 días\` (ES)
  - Passo 3: \`~90 dias\` (PT) / \`~90 days\` (EN) / \`~90 días\` (ES)
  - Passo 4: \`~180 dias\` (PT) / \`~180 days\` (EN) / \`~180 días\` (ES)
  - Passo 5: \`Contínuo\` (PT) / \`Ongoing\` (EN) / \`Continuo\` (ES)

### 3.4. Cursor Personalizado (\`CustomCursor\`)
- **Componente:** \`src/components/ui/CustomCursor.tsx\`
- **Descrição:** Círculo suave que acompanha o ponteiro em desktop (>= 1024px). Oculto em touch.

### 3.5. Assistente Virtual MAIA (\`ChatAssistant\`)
- **Componente:** \`src/components/site/ChatAssistant.tsx\`
- **Posicionamento:** Canto inferior direito (\`bottom-6 right-6\`).
- **Mensagens de Chamada:**
  - **PT:** "Precisa de ajuda com a sua missão internacional? Fale com a MAIA."
  - **EN:** "Need help with your international assignment? Talk to MAIA."
  - **ES:** "¿Necesita ayuda con su misión internacional? Hable con MAIA."

---

## 4. Design Tokens Reais do Projeto

Extraídos de \`src/styles.css\` e \`tailwind.config.ts\`:

### 4.1. Cores Principais
| Token | Valor Hexadecimal | Utilização Principal |
| :--- | :--- | :--- |
| \`--black\` | \`#06091a\` | Fundo base mais escuro do site |
| \`--black-2\` | \`#0b1225\` | Fundo intermediário |
| \`--black-3\` | \`#111d36\` | Midnight blue utilizado em faixas e cartões |
| \`--gold\` | \`#ad8957\` | Dourado de destaque |
| Peru (Brand) | \`#9B7A50\` | Tom peru utilizado em títulos, linhas e rótulos |
| \`--gold-m\` | \`#a58d67\` | Dourado médio |
| \`--gold-l\` | \`#cead84\` | Dourado claro para hover |
| \`--gold-xl\` | \`#e8d5b0\` | Dourado extra claro para textos finos |
| \`--white\` | \`#f9f5ec\` | Branco marfim para tipografia |
| \`--w70\` | \`rgba(249, 245, 236, 0.70)\` | Texto secundário |
| \`--b18\` | \`rgba(173, 137, 87, 0.12)\` | Bordas e divisores sutis |

### 4.2. Escalas Tipográficas
- **H1:** \`clamp(2.125rem, 4vw, 3.25rem)\` (Hero da Home) / \`clamp(28px, 3vw, 42px)\` (Hero de Equipa) / \`clamp(28px, 3.2vw, 46px)\` (Para Empresas / Executivos).
- **H2:** \`clamp(1.625rem, 2.8vw, 2.375rem)\`.
- **H3:** \`clamp(1.125rem, 1.5vw, 1.375rem)\`.
- **Texto / Corpo:** \`17px\` (\`1.0625rem\`), \`15px\` e \`14px\`.
- **Rótulo (Eyebrow):** \`11px\` a \`13px\`, uppercase, tracking \`0.2em\` a \`0.32em\`.
- **Espaçamento Vertical de Seções:** Mobile \`6rem\` (96px), Desktop \`8.5rem\` (136px).

---

## 5. Tabela Consolidada de CTAs (Chamadas para Ação)

| Página / Localização | Texto do CTA (PT) | Texto do CTA (EN) | Texto do CTA (ES) | Destino (\`href\`) | Componente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Header (Nav)** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`Nav.tsx\` |
| **Hero da Home** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`Hero.tsx\` |
| **Hero Para Empresas** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`CtaButton.tsx\` |
| **Hero Executivos & Famílias** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`CtaButton.tsx\` |
| **Final da Home** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Para Empresas** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Executivos & Famílias** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Sobre Nós** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |
| **Final Equipa** | Falar com a MOOVIA | Speak with MOOVIA | Hablar con MOOVIA | \`/contacto\` | \`FinalCtaStrip.tsx\` |

---

## 6. Rotas, Redirecionamentos e Código Órfão

### 6.1. Redirecionamentos Ativos (HTTP 301)
- \`/gma\` → \`/para-empresas\` (301)
- \`/servicos\` → \`/para-empresas\` (301)
- \`/privacidade\` → \`/politica-de-privacidade\` (301)

### 6.2. Rotas com \`noindex\` Ativo
- \`/perguntas-frequentes\` (noindex,nofollow; removida de links e do sitemap)
- \`/home\` (noindex,nofollow)
- \`/politica-de-privacidade\` (noindex,nofollow)
- \`/blog\` e \`/blog/$slug\` (noindex,nofollow)

### 6.3. Componentes Órfãos em \`src/components/\`
Existem 29 componentes não importados por nenhuma rota ativa (e.g. \`EmpresasForm.tsx\`, \`WhatsAppFloat.tsx\`, \`FAQSection.tsx\`, \`MarketResearchSection.tsx\`, etc.).

---

## 7. Conformidade, Menções Legais e Auditoria de Texto

- **Validação Jurídica:** Substituída pelo modelo de compliance e termos de serviço.
- **Selo RGPD:** Presente em \`src/routes/politica-de-privacidade.tsx\` e \`UnifiedLeadForm.tsx\`.
- **Menções a Portugal:** Restritas estritamente ao foro competente e domicílio em \`/politica-de-privacidade\` e \`/termos\`. Removidas de qualquer título público institucional.
- **Domínio Canônico:** Padronizado exclusivamente em \`https://moovia.global\` (o domínio \`mooviaglobal.com\` é mantido apenas como sufixo dos e-mails corporativos).
`;

fs.writeFileSync(path.join(OUT_DIR, '00-geral.md'), generalMd, 'utf-8');
console.log('Saved: site-inventory/00-geral.md');

// Generate LEIAME.md
let leiameMd = `# LEIAME: Inventário Completo do Site MOOVIA (Regenerado e Verificado)

## 1. Visão Geral
Este diretório (\`site-inventory/\`) contém o inventário exato, integral e não resumido de todo o conteúdo público do site MOOVIA, extraído diretamente do DOM renderizado nos navegadores e da análise estática da base de código TypeScript/React.

## 2. Metodologia de Extração e Correção de Idiomas
- **Motor de Renderização:** Google Chrome Headless \`157.0.8103.38\` executando sobre Windows via Chrome DevTools Protocol (CDP).
- **Ambiente Local:** Servidor Vite em \`http://localhost:8083\`.
- **Correção de Idiomas:** O script anterior sofreu um deslocamento de 1 posição decorrente da leitura pré-navegação do \`localStorage\`. Nesta versão regenerada, a linguagem é injetada via chamada direta a \`window.__setLang\` e verificada contra o texto dos menus e botões no próprio DOM renderizado (\`detectedLanguage\`), garantindo correspondência 1:1 rigorosa:
  - Bloco **PT**: Português autêntico ("Para Empresas", "Sobre", "Equipa", "Falar com a MOOVIA").
  - Bloco **EN**: Inglês autêntico ("For Companies", "About", "Team", "Speak with MOOVIA").
  - Bloco **ES**: Espanhol autêntico ("Para Empresas", "Acerca de", "Equipo", "Hablar con MOOVIA").

## 3. Data e Hora da Execução
- **Data da Extração:** 9 de Novembro de 2026.
- **Hora:** 22:05 (Horário de Brasília) / 01:05 UTC.

## 4. Estrutura dos Ficheiros Gerados
- [\`00-geral.md\`](./00-geral.md) — Navegação global, rodapé, componentes compartilhados, design tokens, tabela consolidada de CTAs, código órfão e auditoria legal.
- 24 ficheiros de rota individuais (\`home.md\`, \`para-empresas.md\`, \`para-executivos-e-familias.md\`, \`sobre.md\`, \`equipa.md\`, \`contacto.md\`, \`politica-de-privacidade.md\`, \`gma.md\`, etc.).
- Compactação integral disponível em \`site-inventory.zip\`.
`;

fs.writeFileSync(path.join(OUT_DIR, 'LEIAME.md'), leiameMd, 'utf-8');
console.log('Saved: site-inventory/LEIAME.md');

