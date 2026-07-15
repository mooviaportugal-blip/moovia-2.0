import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { useRouterState } from "@tanstack/react-router";
import i18n, { detectInitialLang, setLang as setLangCore, reapplyCurrentLang, type Lang } from "@/i18n";

// Compatibility shim so existing imports of `useI18n` keep working.
// New code can still use `useTranslation()` from `react-i18next`.

function DomLangSync() {
  // Re-applies the current language whenever the URL changes so newly
  // mounted route content gets translated. No MutationObserver, we just
  // re-run the DOM walker after navigations.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    reapplyCurrentLang();
  }, [pathname]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const detected = detectInitialLang();
    if (i18n.language !== detected) {
      setLangCore(detected);
    } else {
      if (typeof document !== "undefined") {
        document.documentElement.lang = detected;
      }
      reapplyCurrentLang();
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <DomLangSync />
      {children}
    </I18nextProvider>
  );
}

export function useI18n() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [, force] = useState(0);

  useEffect(() => {
    const handler = () => force((n) => n + 1);
    i18nInstance.on("languageChanged", handler);
    window.addEventListener("mv-lang-changed", handler);
    return () => {
      i18nInstance.off("languageChanged", handler);
      window.removeEventListener("mv-lang-changed", handler);
    };
  }, [i18nInstance]);

  const stored = (typeof window !== "undefined" ? (localStorage.getItem("mv_lang") as Lang | null) : null);
  const raw = i18nInstance.language as string | undefined;
  const fallback: Lang = raw === "en" ? "en" : raw === "es" ? "es" : "pt-BR";
  return {
    locale: stored ?? fallback,
    setLocale: (l: string) => setLangCore(l as Lang),
    t: (key: string) => t(key),
  };
}
