import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('scratch/inventory_data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routesToCrawl = [
  { slug: 'root', path: '/', file: 'src/routes/index.tsx' },
  { slug: 'home', path: '/home', file: 'src/routes/home.tsx' },
  { slug: 'para-empresas', path: '/para-empresas', file: 'src/routes/para-empresas.tsx' },
  { slug: 'para-executivos-e-familias', path: '/para-executivos-e-familias', file: 'src/routes/para-executivos-e-familias.tsx' },
  { slug: 'sobre', path: '/sobre', file: 'src/routes/sobre.tsx' },
  { slug: 'equipa', path: '/equipa', file: 'src/routes/equipa.tsx' },
  { slug: 'contacto', path: '/contacto', file: 'src/routes/contacto.tsx' },
  { slug: 'politica-de-privacidade', path: '/politica-de-privacidade', file: 'src/routes/politica-de-privacidade.tsx' },
  { slug: 'gma', path: '/gma', file: 'src/routes/gma.tsx' },
  { slug: 'blog', path: '/blog', file: 'src/routes/blog.index.tsx' },
  { slug: 'blog-slug', path: '/blog/custo-invisivel-mobilidade-internacional', file: 'src/routes/blog.$slug.tsx' },
  { slug: 'perguntas-frequentes', path: '/perguntas-frequentes', file: 'src/routes/perguntas-frequentes.tsx' },
  { slug: 'servicos', path: '/servicos', file: 'src/routes/servicos.tsx' },
  { slug: 'assessment', path: '/assessment', file: 'src/routes/assessment.tsx' },
  { slug: 'cookies', path: '/cookies', file: 'src/routes/cookies.tsx' },
  { slug: 'termos', path: '/termos', file: 'src/routes/termos.tsx' },
  { slug: 'privacidade', path: '/privacidade', file: 'src/routes/privacidade.tsx' },
  { slug: 'soundbrand', path: '/soundbrand', file: 'src/routes/soundbrand.tsx' },
  { slug: 'checkout', path: '/checkout', file: 'src/routes/checkout.tsx' },
  { slug: 'checkout2', path: '/checkout2', file: 'src/routes/checkout2.tsx' },
  { slug: 'login', path: '/login', file: 'src/routes/login.tsx' },
  { slug: 'dashboard', path: '/dashboard', file: 'src/routes/dashboard.tsx' },
  { slug: 'meu-dashboard', path: '/meu-dashboard', file: 'src/routes/meu-dashboard.tsx' },
  { slug: 'home-blackv', path: '/home/blackv', file: 'src/routes/home_.blackv.tsx' },
];

const langs = [
  { code: 'pt', storage: 'pt-PT' },
  { code: 'en', storage: 'en' },
  { code: 'es', storage: 'es' },
];

async function run() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await listRes.json();
    const wsUrl = pages[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve) => ws.onopen = resolve);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    for (const r of routesToCrawl) {
      console.log(`Processing route: ${r.path} ...`);
      const routeData = {
        route: r.path,
        file: r.file,
        languages: {},
      };

      for (const l of langs) {
        // Navigate
        await send('Page.navigate', { url: `http://localhost:8083${r.path}` });
        await new Promise((res) => setTimeout(res, 2000));

        // Set language and trigger translations + accordion expansions + scroll down
        const evalRes = await send('Runtime.evaluate', {
          expression: `(async () => {
            try {
              localStorage.setItem('mv_lang', '${l.storage}');
              if (window.i18n && window.i18n.changeLanguage) {
                window.i18n.changeLanguage('${l.code}');
              }
              window.dispatchEvent(new CustomEvent('mv-lang-changed', { detail: '${l.storage}' }));
            } catch (e) {}

            // Scroll down in steps to trigger all intersection observers and animations
            const totalH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const step = 600;
            for (let y = 0; y <= totalH; y += step) {
              window.scrollTo(0, y);
              await new Promise(r => setTimeout(r, 80));
            }
            window.scrollTo(0, totalH);
            await new Promise(r => setTimeout(r, 400));
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 400));

            // Expand accordions / details / buttons with aria-expanded='false'
            document.querySelectorAll('details').forEach(d => d.open = true);
            document.querySelectorAll('[aria-expanded=\"false\"]').forEach(btn => {
              try { btn.click(); } catch(e){}
            });
            await new Promise(r => setTimeout(r, 600));

            // Extract metadata
            const title = document.title || '';
            const metaDescEl = document.querySelector('meta[name=\"description\"]');
            const metaDesc = metaDescEl ? metaDescEl.getAttribute('content') : '';
            const metaRobotsEl = document.querySelector('meta[name=\"robots\"]');
            const metaRobots = metaRobotsEl ? metaRobotsEl.getAttribute('content') : '';
            const canonicalEl = document.querySelector('link[rel=\"canonical\"]');
            const canonical = canonicalEl ? canonicalEl.getAttribute('href') : '';
            const currentUrl = window.location.href;
            const currentPath = window.location.pathname;

            // Extract all sections
            const sections = [];
            const sectionEls = Array.from(document.querySelectorAll('main > section, main > div > section, main, header, footer'));
            
            // Function to extract text elements from an element
            function extractElementTexts(root) {
              const texts = [];
              const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_ELEMENT,
                {
                  acceptNode(node) {
                    const tag = node.tagName.toLowerCase();
                    if (['script', 'style', 'noscript', 'svg'].includes(tag)) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                  }
                }
              );

              const seen = new Set();
              while (walker.nextNode()) {
                const el = walker.currentNode;
                const tag = el.tagName.toLowerCase();
                // If it is a heading, paragraph, list item, button, label, span with direct text
                const directText = Array.from(el.childNodes)
                  .filter(n => n.nodeType === Node.TEXT_NODE)
                  .map(n => n.textContent.trim())
                  .filter(Boolean)
                  .join(' ');

                const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag);
                const isParagraph = tag === 'p';
                const isListItem = tag === 'li';
                const isButton = tag === 'button' || el.getAttribute('role') === 'button';
                const isLabel = tag === 'label';
                const isInput = ['input', 'textarea', 'select'].includes(tag);
                const isEyebrow = el.classList.contains('typo-eyebrow') || el.classList.contains('tracking-widest') || el.classList.contains('tracking-[0.32em]');

                if (isInput) {
                  const placeholder = el.getAttribute('placeholder');
                  const name = el.getAttribute('name');
                  const val = el.value;
                  texts.push({
                    type: 'input',
                    tag,
                    name,
                    placeholder,
                    value: val,
                  });
                } else if ((isHeading || isParagraph || isListItem || isButton || isLabel || isEyebrow) && el.innerText.trim()) {
                  // Only add if not fully duplicated by a parent we already recorded
                  const fullText = el.innerText.trim();
                  if (!seen.has(fullText)) {
                    seen.add(fullText);
                    texts.push({
                      type: isHeading ? tag : isEyebrow ? 'eyebrow' : isButton ? 'button' : isListItem ? 'li' : isLabel ? 'label' : 'p',
                      tag,
                      text: fullText,
                    });
                  }
                }
              }
              return texts;
            }

            // Extract main sections
            const mainEl = document.querySelector('main') || document.body;
            const mainSections = Array.from(mainEl.querySelectorAll('section'));
            if (mainSections.length > 0) {
              mainSections.forEach((s, idx) => {
                const hEl = s.querySelector('h1, h2, h3, h4');
                const headingText = hEl ? hEl.innerText.trim().slice(0, 60) : '';
                sections.push({
                  index: idx + 1,
                  heading: headingText,
                  classes: s.className,
                  items: extractElementTexts(s),
                });
              });
            } else {
              sections.push({
                index: 1,
                heading: 'Conteúdo principal',
                classes: mainEl.className,
                items: extractElementTexts(mainEl),
              });
            }

            // Extract all links
            const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
              text: a.innerText.trim() || a.getAttribute('aria-label') || a.getAttribute('title') || '',
              href: a.getAttribute('href'),
              target: a.getAttribute('target') || '_self',
            })).filter(l => l.text || l.href);

            // Extract all buttons
            const buttons = Array.from(document.querySelectorAll('button, a[role=\"button\"], .typo-caption')).map(b => ({
              text: b.innerText.trim() || b.getAttribute('aria-label') || '',
              tag: b.tagName.toLowerCase(),
              href: b.getAttribute('href') || null,
              type: b.getAttribute('type') || null,
            })).filter(b => b.text);

            // Extract images
            const images = Array.from(document.querySelectorAll('img')).map(img => ({
              src: img.getAttribute('src') || '',
              alt: img.getAttribute('alt') || '',
            }));

            // Raw translation keys search
            const rawBody = document.body.innerText;
            const rawKeysMatches = rawBody.match(/\{\{[^}]+\}\}/g) || [];

            return {
              title,
              metaDesc,
              metaRobots,
              canonical,
              currentUrl,
              currentPath,
              sections,
              links,
              buttons,
              images,
              rawKeysMatches,
            };
          })()`,
          awaitPromise: true,
          returnByValue: true,
        });

        routeData.languages[l.code] = evalRes.result?.value || {};
      }

      fs.writeFileSync(
        path.join(outDir, `${r.slug}.json`),
        JSON.stringify(routeData, null, 2),
        'utf8'
      );
    }

    console.log('Finished crawling all routes successfully!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);

