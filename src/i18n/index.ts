import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { applyDomTranslations } from "./applyDom";

export type Lang = "pt-BR" | "pt-PT" | "en" | "es";
export const SUPPORTED: Lang[] = ["pt-BR", "pt-PT", "en", "es"];

// Variável única para reativar o Português futuramente: basta incluir "pt-PT" (e "pt-BR" se desejado) neste array.
export const ENABLED_LOCALES: Lang[] = ["en", "es"];
export const DEFAULT_LOCALE: Lang = "en";
const STORAGE_KEY = "mv_lang";

// i18next resource key for a given Lang (both pt variants share the pt dictionary)
export function resourceKey(lang: Lang): string {
  if (lang === "pt-BR" || lang === "pt-PT") return "pt";
  return lang;
}

export function detectInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    // 1. Deteção de parâmetros de URL (?lang=pt ou ?locale=pt redirecionam para EN)
    const params = new URLSearchParams(window.location.search);
    const qLang = (params.get("lang") || params.get("locale"))?.toLowerCase();
    if (qLang) {
      if (qLang.startsWith("pt")) {
        params.delete("lang");
        params.delete("locale");
        const newSearch = params.toString();
        const newUrl =
          window.location.pathname +
          (newSearch ? `?${newSearch}` : "") +
          window.location.hash;
        window.history.replaceState(null, "", newUrl);
        return DEFAULT_LOCALE;
      }
      if (ENABLED_LOCALES.includes(qLang as Lang)) {
        return qLang as Lang;
      }
    }

    // 2. Deteção no localStorage: se houver "pt" guardado, usa EN e limpa
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored) {
      if (stored.startsWith("pt") || !ENABLED_LOCALES.includes(stored)) {
        localStorage.setItem(STORAGE_KEY, DEFAULT_LOCALE);
        return DEFAULT_LOCALE;
      }
      return stored;
    }

    // 3. Deteção no navegador do visitante: se estiver em português, usa EN
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("pt")) {
      return DEFAULT_LOCALE;
    }
    if (nav.startsWith("es") && ENABLED_LOCALES.includes("es")) {
      return "es";
    }
  } catch {}
  return DEFAULT_LOCALE;
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
    fallbackLng: DEFAULT_LOCALE,
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
      warnMissingKey(key, `fallback=${DEFAULT_LOCALE}`);
      const enFallback = getNestedValue(en as Record<string, any>, key);
      if (enFallback !== undefined) return enFallback;
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
  const target = ENABLED_LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
  i18n.changeLanguage(resourceKey(target));
  try {
    localStorage.setItem(STORAGE_KEY, target);
  } catch {}
  if (typeof document !== "undefined") {
    document.documentElement.lang = target;
    const domLang = target === "pt-PT" ? "pt" : target === "pt-BR" ? "pt-BR" : target;
    applyDomTranslations(domLang as any);
    window.dispatchEvent(new CustomEvent("mv-lang-changed", { detail: target }));
  }
}

export function getCurrentLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && ENABLED_LOCALES.includes(stored)) return stored;
  } catch {}
  const r = (i18n.language as string) ?? DEFAULT_LOCALE;
  if (!ENABLED_LOCALES.includes(r as Lang)) return DEFAULT_LOCALE;
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
