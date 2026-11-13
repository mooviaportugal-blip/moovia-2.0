import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { useRouterState } from "@tanstack/react-router";
import i18n, {
  detectInitialLang,
  resourceKey,
  setLang as setLangCore,
  reapplyCurrentLang,
  ENABLED_LOCALES,
  DEFAULT_LOCALE,
  type Lang,
} from "@/i18n";
import { resetHeadOrigin } from "@/i18n/applyDom";

// Compatibility shim so existing imports of `useI18n` keep working.
// New code can still use `useTranslation()` from `react-i18next`.

function DomLangSync() {
  // Re-applies the current language whenever the URL changes so newly
  // mounted route content gets translated.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    resetHeadOrigin();
    reapplyCurrentLang();
  }, [pathname]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [, setHydratedTick] = useState(0);

  useEffect(() => {
    const detected = detectInitialLang();
    const targetRes = resourceKey(detected);
    if (i18n.language !== targetRes) {
      setLangCore(detected);
    } else {
      if (typeof document !== "undefined") {
        document.documentElement.lang = detected;
      }
      reapplyCurrentLang();
    }
    setHydratedTick((n) => n + 1);
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

  const stored =
    typeof window !== "undefined"
      ? (localStorage.getItem("mv_lang") as Lang | null)
      : null;
  const safeStored = stored && ENABLED_LOCALES.includes(stored) ? stored : null;
  const raw = i18nInstance.language as string | undefined;
  const fallback: Lang = raw === "es" && ENABLED_LOCALES.includes("es") ? "es" : DEFAULT_LOCALE;
  return {
    locale: safeStored ?? fallback,
    setLocale: (l: string) => setLangCore(l as Lang),
    t: (key: string) => t(key),
  };
}
