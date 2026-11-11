import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsentState,
} from "@/lib/cookieConsent";

export function CookieConsentBanner() {
  const { t } = useTranslation();
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  // Modal custom state
  const [analyticsPref, setAnalyticsPref] = useState(false);
  const [prefPref, setPrefPref] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const existing = getCookieConsent();
    setConsent(existing);
    if (existing) {
      setAnalyticsPref(existing.analytics);
      setPrefPref(existing.preferences);
    }

    const handleOpen = () => {
      const current = getCookieConsent();
      if (current) {
        setAnalyticsPref(current.analytics);
        setPrefPref(current.preferences);
      }
      setShowManageModal(true);
    };

    window.addEventListener("open_cookie_preferences", handleOpen);
    return () => {
      window.removeEventListener("open_cookie_preferences", handleOpen);
    };
  }, []);

  const handleAcceptAll = () => {
    const updated = setCookieConsent({ analytics: true, preferences: true });
    setConsent(updated);
    setShowManageModal(false);
  };

  const handleRejectAll = () => {
    const updated = setCookieConsent({ analytics: false, preferences: false });
    setConsent(updated);
    setShowManageModal(false);
  };

  const handleSavePreferences = () => {
    const updated = setCookieConsent({
      analytics: analyticsPref,
      preferences: prefPref,
    });
    setConsent(updated);
    setShowManageModal(false);
  };

  if (!isClient) return null;

  const showBanner = consent === null && !showManageModal;

  return (
    <>
      {/* Banner discreto no fundo do ecrã */}
      {showBanner && (
        <aside
          aria-label={t("cookies.banner_aria", "Consentimento de cookies")}
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-[#09183D]/95 backdrop-blur-md border-t border-[#9B7A50]/30 shadow-2xl transition-all"
        >
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-urbanist text-[13px] md:text-[14px] text-white/90 leading-relaxed font-[300] max-w-[720px]">
              {t("cookies.banner_text")}
            </p>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={handleRejectAll}
                className="flex-1 md:flex-initial px-4 py-2 text-[12px] font-urbanist font-medium tracking-wider uppercase rounded-md border border-[#9B7A50] text-white bg-transparent hover:bg-white/5 transition-all text-center"
              >
                {t("cookies.banner_reject")}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-initial px-4 py-2 text-[12px] font-urbanist font-medium tracking-wider uppercase rounded-md border border-[#9B7A50] text-[#9B7A50] bg-transparent hover:bg-[#9B7A50]/15 hover:text-white transition-all text-center"
              >
                {t("cookies.banner_accept")}
              </button>
              <button
                type="button"
                onClick={() => setShowManageModal(true)}
                className="w-full md:w-auto px-3 py-2 text-[12px] font-urbanist font-light text-white/70 hover:text-white underline underline-offset-4 transition-colors text-center"
              >
                {t("cookies.banner_manage")}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal / Diálogo de Gestão de Preferências */}
      {showManageModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-[#09183D] border border-[#9B7A50]/40 rounded-xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2
                id="cookie-modal-title"
                className="font-display font-[300] text-[22px] sm:text-[24px] text-white"
              >
                {t("cookies.banner_manage")}
              </h2>
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="text-white/60 hover:text-white text-sm uppercase tracking-wider font-urbanist"
              >
                {t("cookies.banner_close", "Fechar")}
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Essenciais */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-urbanist font-medium text-[14px] text-white">
                    {t("cookies.pref_essential_title", "Cookies essenciais")}
                  </span>
                  <span className="text-[11px] font-urbanist tracking-wider uppercase text-[#9B7A50]">
                    {t("cookies.pref_always_active", "Sempre ativo")}
                  </span>
                </div>
                <p className="font-urbanist text-[12px] text-white/60 leading-relaxed font-[300]">
                  {t(
                    "cookies.pref_essential_desc",
                    "Necessários ao funcionamento do site e à sua segurança. Não podem ser desativados."
                  )}
                </p>
              </div>

              {/* Medição */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="toggle-analytics"
                    className="font-urbanist font-medium text-[14px] text-white cursor-pointer"
                  >
                    {t("cookies.pref_analytics_title", "Medição")}
                  </label>
                  <input
                    id="toggle-analytics"
                    type="checkbox"
                    checked={analyticsPref}
                    onChange={(e) => setAnalyticsPref(e.target.checked)}
                    className="w-4 h-4 accent-[#9B7A50] rounded cursor-pointer"
                  />
                </div>
                <p className="font-urbanist text-[12px] text-white/60 leading-relaxed font-[300]">
                  {t(
                    "cookies.pref_analytics_desc",
                    "Permite medir de forma agregada a navegação e fluxos do site para melhorar a experiência."
                  )}
                </p>
              </div>

              {/* Preferências */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="toggle-preferences"
                    className="font-urbanist font-medium text-[14px] text-white cursor-pointer"
                  >
                    {t("cookies.pref_preferences_title", "Preferências")}
                  </label>
                  <input
                    id="toggle-preferences"
                    type="checkbox"
                    checked={prefPref}
                    onChange={(e) => setPrefPref(e.target.checked)}
                    className="w-4 h-4 accent-[#9B7A50] rounded cursor-pointer"
                  />
                </div>
                <p className="font-urbanist text-[12px] text-white/60 leading-relaxed font-[300]">
                  {t(
                    "cookies.pref_preferences_desc",
                    "Recorda opções personalizadas do utilizador, como preferências de som e visualização."
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-2 text-[12px] font-urbanist uppercase tracking-wider text-white/70 hover:text-white border border-white/20 rounded-md transition-colors"
              >
                {t("cookies.banner_reject")}
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-5 py-2 text-[12px] font-urbanist uppercase tracking-wider text-black bg-[#9B7A50] hover:bg-[#9B7A50]/90 rounded-md font-medium transition-colors"
              >
                {t("cookies.banner_save", "Guardar preferências")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
