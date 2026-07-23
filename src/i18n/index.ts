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
function resourceKey(lang: Lang): string {
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


if (!i18n.isInitialized) {
  const initial = detectInitialLang();
  i18n.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    lng: resourceKey(initial),
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
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
  return (r as Lang);
}

export function reapplyCurrentLang() {
  if (typeof document === "undefined") return;
  const lang = getCurrentLang();
  const domLang = lang === "pt-PT" ? "pt" : lang === "pt-BR" ? "pt-BR" : lang;
  applyDomTranslations(domLang as any);
}

export default i18n;
