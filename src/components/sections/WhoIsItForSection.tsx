import { useTranslation } from "react-i18next";
import "@/i18n";
import { Users, Building2 } from "lucide-react";

export function WhoIsItForSection() {
  const { t } = useTranslation();

  return (
    <section
      id="para-quem-e"
      className="section-spacing bg-black-2 px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 md:mb-16">
          <p className="typo-eyebrow mb-4">{t("home.who_is_it_for.eyebrow")}</p>
          <h2 className="typo-h2 text-white">{t("home.who_is_it_for.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Bloco 1: Executivos e Famílias */}
          <article className="border border-b18 bg-w05 p-8 md:p-12 flex flex-col justify-between rounded-sm transition-colors hover:border-gold/40">
            <div>
              <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-6 shrink-0">
                <Users size={20} strokeWidth={1.6} />
              </div>
              <h3 className="typo-h3 text-white mb-4">
                {t("home.who_is_it_for.exec_title")}
              </h3>
              <p className="typo-body text-w70 leading-relaxed">
                {t("home.who_is_it_for.exec_body")}
              </p>
            </div>
          </article>

          {/* Bloco 2: Empresas */}
          <article className="border border-b18 bg-w05 p-8 md:p-12 flex flex-col justify-between rounded-sm transition-colors hover:border-gold/40">
            <div>
              <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-6 shrink-0">
                <Building2 size={20} strokeWidth={1.6} />
              </div>
              <h3 className="typo-h3 text-white mb-4">
                {t("home.who_is_it_for.comp_title")}
              </h3>
              <p className="typo-body text-w70 leading-relaxed">
                {t("home.who_is_it_for.comp_body")}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

