import { useTranslation } from "react-i18next";
import "@/i18n";
import gdprBadge from "@/assets/gdpr-badge.png.asset.json";

export function TrustConfidentialitySection() {
  const { t } = useTranslation();

  return (
    <section
      id="confianca-confidencialidade"
      className="section-spacing bg-black-2 px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12">
          <p className="typo-eyebrow mb-4">{t("home.trust.eyebrow")}</p>
          <h2 className="typo-h2 text-white">{t("home.trust.title")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-b18 bg-black/60 p-8 md:p-12">
          <div className="lg:col-span-9 space-y-6">
            <div>
              <h3 className="typo-h3 text-gold-l mb-3">
                {t("home.trust.legal_validation_label")}
              </h3>
              <p className="typo-body text-white/90">
                {t("home.trust.legal_validation_text")}
              </p>
            </div>

            <p className="typo-body text-w70 pt-4 border-t border-b18">
              {t("home.trust.confidentiality_text")}
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start lg:items-center justify-center lg:border-l lg:border-b18 lg:pl-8 pt-4 lg:pt-0">
            <img
              src={gdprBadge.url}
              alt="RGPD"
              className="h-16 w-16 object-contain mb-3"
              loading="lazy"
            />
            <span className="typo-caption font-semibold text-gold-l lg:text-center">
              {t("home.trust.gdpr_label")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

