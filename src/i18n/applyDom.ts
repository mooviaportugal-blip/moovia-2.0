// Runtime DOM translator.
// Walks all text nodes + selected attributes once per language change.
// Stores the ORIGINAL Portuguese text (pt-PT) in a WeakMap so we can restore it.

import { translate, type Lang as DictLang } from "./dict";

export type WalkerLang = DictLang | "pt-BR";

const ORIGINAL_TEXT = new WeakMap<Text, string>();
const ORIGINAL_ATTR = new WeakMap<Element, Record<string, string>>();

const ATTRS = ["placeholder", "alt", "aria-label", "title"];

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA"]);

// pt-PT → pt-BR word swaps. Case-preserving for capitalized variants.
const BR_PAIRS: [string, string][] = [
  ["Contacto", "Contacto"],
  ["contacto", "contacto"],
  ["Contactos", "Contactos"],
  ["contactos", "contactos"],
  ["Contatar", "Contatar"],
  ["contatar", "contatar"],
  ["Equipa", "Equipa"],
  ["equipa", "equipa"],
  ["Equipas", "Equipes"],
  ["equipas", "equipes"],
  ["facto", "fato"],
  ["Fato", "Fato"],
  ["a coordenar", "coordenando"],
  ["a carregar", "carregando"],
  ["A carregar", "Carregando"],
  ["celular", "telemóvel"],
  ["Celular", "Celular"],
  ["ônibus", "ônibus"],
  ["casa de banho", "banheiro"],
  ["pequeno-almoço", "café da manhã"],
  ["tela", "tela"],
  ["Tela", "Tela"],
  ["a sua", "sua"],
  ["A sua", "Sua"],
  ["o seu", "seu"],
  ["O seu", "Seu"],
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toBR(text: string): string {
  let out = text;
  for (const [from, to] of BR_PAIRS) {
    const re = new RegExp(`(^|[^\\p{L}])${escapeRegex(from)}(?=[^\\p{L}]|$)`, "gu");
    out = out.replace(re, (_m, p1) => `${p1}${to}`);
  }
  return out;
}

function shouldSkip(node: Node): boolean {
  let el: Node | null = node.parentNode;
  while (el && el.nodeType === 1) {
    const e = el as Element;
    if (SKIP_TAGS.has(e.tagName)) return true;
    if (e.hasAttribute?.("data-no-translate")) return true;
    el = e.parentNode;
  }
  return false;
}

function resolve(original: string, lang: WalkerLang): string {
  if (lang === "pt") return original;
  if (lang === "pt-BR") return toBR(original);
  return translate(original, lang) ?? original;
}

function translateTextNode(node: Text, lang: WalkerLang) {
  const original = ORIGINAL_TEXT.get(node) ?? node.nodeValue ?? "";
  if (!ORIGINAL_TEXT.has(node)) ORIGINAL_TEXT.set(node, original);
  const next = resolve(original, lang);
  if (node.nodeValue !== next) node.nodeValue = next;
}

function translateAttr(el: Element, attr: string, lang: WalkerLang) {
  const current = el.getAttribute(attr);
  if (current == null) return;
  let store = ORIGINAL_ATTR.get(el);
  if (!store) {
    store = {};
    ORIGINAL_ATTR.set(el, store);
  }
  if (!(attr in store)) store[attr] = current;
  const original = store[attr];
  const next = resolve(original, lang);
  if (current !== next) el.setAttribute(attr, next);
}

function walk(root: Node, lang: WalkerLang) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      if (shouldSkip(n)) return NodeFilter.FILTER_REJECT;
      const v = (n.nodeValue ?? "").trim();
      if (!v) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let current: Node | null = walker.nextNode();
  while (current) {
    translateTextNode(current as Text, lang);
    current = walker.nextNode();
  }

  if (root.nodeType === 1) {
    for (const attr of ATTRS) {
      const els = (root as Element).querySelectorAll?.(`[${attr}]`);
      els?.forEach((el) => {
        if (!shouldSkip(el)) translateAttr(el, attr, lang);
      });
    }
  }
}

let currentLang: WalkerLang | null = null;
let observer: MutationObserver | null = null;
let flushHandle: number | null = null;

function flushPending() {
  flushHandle = null;
  if (!currentLang || currentLang === "pt") return;
  // Just re-walk the whole body. Cheap enough (~ms) and immune to
  // partial subtree edge cases.
  walk(document.body, currentLang);
}

function scheduleFlush() {
  if (flushHandle != null) return;
  flushHandle = (typeof requestAnimationFrame !== "undefined"
    ? requestAnimationFrame(flushPending)
    : (setTimeout(flushPending, 16) as unknown as number));
}


function ensureObserver() {
  if (observer || typeof MutationObserver === "undefined") return;
  observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "childList") {
        r.addedNodes.forEach((n) => schedule(n));
      } else if (r.type === "characterData" && r.target.nodeType === 3) {
        // Text node content changed (e.g. React updated a variable) — retranslate.
        const t = r.target as Text;
        ORIGINAL_TEXT.delete(t);
        schedule(t);
      } else if (r.type === "attributes" && r.target.nodeType === 1) {
        const el = r.target as Element;
        if (r.attributeName && ATTRS.includes(r.attributeName)) {
          const store = ORIGINAL_ATTR.get(el);
          if (store) delete store[r.attributeName];
          if (currentLang && currentLang !== "pt" && currentLang !== "pt-BR") {
            translateAttr(el, r.attributeName, currentLang);
          }
        }
      }
    }
  });
  observer.observe(document.body, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS,
  });
}

export function applyDomTranslations(lang: WalkerLang) {
  if (typeof document === "undefined") return;
  currentLang = lang;
  if (lang === "pt-BR" || lang === "pt") return;
  walk(document.body, lang);
  ensureObserver();
}


