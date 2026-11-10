import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { applyDomTranslations } from "./applyDom";

export type Lang = "pt-BR" | "pt-PT" | "en" | "es";
export const SUPPORTED: Lang[] = ["pt-BR", "pt-PT", "en", "es"];
const STORAGE_KEY = "mv_lang";

// i18next resource key for a given Lang (both pt variants share the pt dictionary)
export function resourceKey(lang: Lang): string {
  if (lang === "pt-BR" || lang === "pt-PT") return "pt";
  return lang;
}

export function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "pt-PT";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}
  return "pt-PT";
}

function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  let cur: any = obj;
  for (const part of path.split(".")) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[part];
  }
  return typeof cur === "string" ? cur : undefined;
}

const warnedMissingKeys = new Set<string>();

function warnMissingKey(key: string, detail?: string) {
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    const cacheKey = `${key}:${detail ?? ""}`;
    if (!warnedMissingKeys.has(cacheKey)) {
      warnedMissingKeys.add(cacheKey);
      console.warn(`[i18n] Chave de tradução ausente: "${key}"${detail ? ` (${detail})` : ""}`);
    }
  }
}

const initial = detectInitialLang();

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    lng: resourceKey(initial),
    fallbackLng: "pt",
    defaultNS: "translation",
    ns: ["translation"],
    initImmediate: false,
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
    saveMissing: true,
    missingKeyHandler: (lngs, ns, key) => {
      warnMissingKey(key, `ns=${ns}, lngs=${Array.isArray(lngs) ? lngs.join(",") : lngs}`);
    },
    parseMissingKeyHandler: (key) => {
      warnMissingKey(key, "fallback=pt");
      const ptFallback = getNestedValue(pt as Record<string, any>, key);
      if (ptFallback !== undefined) return ptFallback;
      return "";
    },
  });
} else {
  // Ensure hot-reloads and SSR module re-evaluations always update bundled resources synchronously
  i18n.addResourceBundle("pt", "translation", pt, true, true);
  i18n.addResourceBundle("en", "translation", en, true, true);
  i18n.addResourceBundle("es", "translation", es, true, true);
}

export function setLang(lang: Lang) {
  if (!SUPPORTED.includes(lang)) return;
  i18n.changeLanguage(resourceKey(lang));
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    const domLang = lang === "pt-PT" ? "pt" : lang === "pt-BR" ? "pt-BR" : lang;
    applyDomTranslations(domLang as any);
    window.dispatchEvent(new CustomEvent("mv-lang-changed", { detail: lang }));
  }
}

export function getCurrentLang(): Lang {
  if (typeof window === "undefined") return "pt-PT";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}
  const r = (i18n.language as string) ?? "pt";
  if (r === "pt") return "pt-PT";
  return r as Lang;
}

export function reapplyCurrentLang() {
  if (typeof document === "undefined") return;
  const lang = getCurrentLang();
  const domLang = lang === "pt-PT" ? "pt" : lang === "pt-BR" ? "pt-BR" : lang;
  applyDomTranslations(domLang as any);
}

if (typeof window !== "undefined") {
  (window as any).__setLang = setLang;
  (window as any).__reapplyLang = reapplyCurrentLang;
}

export default i18n;
