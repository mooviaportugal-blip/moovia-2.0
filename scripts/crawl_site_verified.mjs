import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('scratch/inventory_data_verified');
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
  { code: 'pt', storage: 'pt-PT', label: 'Português' },
  { code: 'en', storage: 'en', label: 'Inglês' },
  { code: 'es', storage: 'es', label: 'Espanhol' },
];

async function run() {
  const port = 9223;
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
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

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
        await new Promise((res) => setTimeout(res, 1200));

        // Set language and trigger translations + accordion expansions + scroll down
        const evalRes = await send('Runtime.evaluate', {
          expression: `(async () => {
            try {
              localStorage.setItem('mv_lang', '${l.storage}');
              if (window.__setLang) {
                window.__setLang('${l.storage}');
              } else if (window.i18n && window.i18n.changeLanguage) {
                window.i18n.changeLanguage('${l.code}');
              }
              window.dispatchEvent(new CustomEvent('mv-lang-changed', { detail: '${l.storage}' }));
            } catch (e) {}

            await new Promise(r => setTimeout(r, 600));

            // Verify actual language on screen
            const bodyText = document.body ? document.body.innerText : '';
            let detected = '${l.code}';
            if (bodyText.includes('For Companies') || bodyText.includes('Meet the Team') || bodyText.includes('Speak with MOOVIA')) {
              detected = 'en';
            } else if (bodyText.includes('Acerca de') || bodyText.includes('Conozca al equipo') || bodyText.includes('Hablar con MOOVIA')) {
              detected = 'es';
            } else if (bodyText.includes('Equipa') || bodyText.includes('Conheça a equipa') || bodyText.includes('Falar com a MOOVIA')) {
              detected = 'pt';
            }

            // Scroll down in steps to trigger all intersection observers and animations
            const totalH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const step = 600;
            for (let y = 0; y <= totalH; y += step) {
              window.scrollTo(0, y);
              await new Promise(r => setTimeout(r, 60));
            }
            window.scrollTo(0, totalH);
            await new Promise(r => setTimeout(r, 300));
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 300));

            // Specific extraction for Equipa Hero (capture collapsed state & expanded content)
            let equipaHeroSpecial = null;
            if (window.location.pathname.includes('/equipa')) {
              const eyebrow = document.querySelector('.equipa-hero-title')?.previousElementSibling?.innerText || '';
              const h1 = document.querySelector('.equipa-hero-title')?.innerText || '';
              const col1 = document.querySelector('.equipa-hero-cols > div:first-child p')?.innerText || '';
              const toggleBtn = document.querySelector('.equipa-hero-cols button');
              const btnText = toggleBtn ? toggleBtn.innerText.trim() : '';
              const btnExpanded = toggleBtn ? toggleBtn.getAttribute('aria-expanded') : '';
              const colExtra = Array.from(document.querySelectorAll('.equipa-col-extra p')).map(p => p.innerText.trim());
              equipaHeroSpecial = {
                eyebrow,
                h1,
                col1,
                button: { text: btnText, expanded: btnExpanded || 'false' },
                col2: colExtra[0] || '',
                col3: colExtra[1] || ''
              };
            }

            // Specific extraction for JourneyTimeline time labels
            const timelineTimeLabels = Array.from(document.querySelectorAll('.font-mono.uppercase')).map(el => el.innerText.trim()).filter(Boolean);

            // Expand accordions / details
            document.querySelectorAll('details').forEach(d => d.open = true);
            await new Promise(r => setTimeout(r, 300));

            // Extract metadata
            const title = document.title || '';
            const metaDescEl = document.querySelector('meta[name="description"]');
            const metaDesc = metaDescEl ? metaDescEl.getAttribute('content') : '';
            const metaRobotsEl = document.querySelector('meta[name="robots"]');
            const metaRobots = metaRobotsEl ? metaRobotsEl.getAttribute('content') : '';
            const canonicalEl = document.querySelector('link[rel="canonical"]');
            const canonical = canonicalEl ? canonicalEl.getAttribute('href') : '';
            const currentUrl = window.location.href;
            const currentPath = window.location.pathname;

            // Extract all sections
            const sections = [];
            const sectionEls = Array.from(document.querySelectorAll('main > section, main > div > section, main, header, footer'));
            
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

            sectionEls.forEach((sec, idx) => {
              const headingEl = sec.querySelector('h1, h2, h3, h4');
              const heading = headingEl ? headingEl.innerText.trim() : '';
              const items = extractElementTexts(sec);
              if (items.length > 0) {
                sections.push({
                  index: idx + 1,
                  heading: heading || (sec.className ? sec.className.substring(0, 60) : 'Seção ' + (idx + 1)),
                  classes: sec.className || '',
                  items,
                });
              }
            });

            // Extract buttons and links
            const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
              text: b.innerText.trim(),
              type: b.getAttribute('type') || 'button',
              disabled: b.disabled,
              ariaExpanded: b.getAttribute('aria-expanded'),
            })).filter(b => b.text.length > 0);

            const links = Array.from(document.querySelectorAll('a')).map(a => ({
              text: a.innerText.trim(),
              href: a.getAttribute('href') || '',
              target: a.getAttribute('target') || '_self',
            })).filter(a => a.text.length > 0 || a.href.length > 0);

            // Extract images
            const images = Array.from(document.querySelectorAll('img')).map(img => ({
              src: img.getAttribute('src') || '',
              alt: img.getAttribute('alt') || '',
            }));

            // Check for raw translation keys {{...}} or key.name
            const rawKeysMatches = [];
            const bodyHtml = document.body ? document.body.innerHTML : '';
            const keyMatches = bodyHtml.match(/\{\{([a-zA-Z0-9_.-]+)\}\}/g);
            if (keyMatches) {
              rawKeysMatches.push(...keyMatches);
            }

            return {
              targetLanguage: '${l.code}',
              detectedLanguage: detected,
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
              equipaHeroSpecial,
              timelineTimeLabels,
              rawKeysMatches: Array.from(new Set(rawKeysMatches)),
            };
          })()`,
          awaitPromise: true,
          returnByValue: true,
        });

        const val = evalRes.result?.value || {};
        console.log(`   [${l.code}] extracted: title="${val.title?.substring(0, 30)}..." detected=${val.detectedLanguage}`);
        routeData.languages[l.code] = val;
      }

      fs.writeFileSync(
        path.join(outDir, `${r.slug}.json`),
        JSON.stringify(routeData, null, 2),
        'utf8'
      );
    }

    console.log('Finished crawling all routes successfully with verified language tags!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);

