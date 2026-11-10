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
        <div className="mb-10 md:mb-12">
          <p className="typo-eyebrow mb-3">{t("home.who_is_it_for.eyebrow")}</p>
          <h2 className="typo-h2 text-white mb-3">{t("home.who_is_it_for.title")}</h2>
          <p className="font-urbanist text-[16px] md:text-[18px] font-[400] text-w70 max-w-2xl leading-relaxed">
            {t("home.who_is_it_for.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Bloco 1: Empresas (primeiro Companies) */}
          <article className="border border-b18 bg-w05 p-7 md:p-10 flex flex-col justify-start rounded-sm transition-colors hover:border-gold/40 text-left">
            <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-5 shrink-0">
              <Building2 size={20} strokeWidth={1.6} />
            </div>
            <h3 className="typo-h3 text-white mb-2">
              {t("home.who_is_it_for.comp_title")}
            </h3>
            <p className="font-urbanist text-[15px] md:text-[16px] font-[500] text-white/95 leading-snug mb-3">
              {t("home.who_is_it_for.comp_headline")}
            </p>
            <p className="typo-body text-w70 leading-relaxed text-[14px] md:text-[15px]">
              {t("home.who_is_it_for.comp_body")}
            </p>
          </article>

          {/* Bloco 2: Executivos e Famílias (depois Executives) */}
          <article className="border border-b18 bg-w05 p-7 md:p-10 flex flex-col justify-start rounded-sm transition-colors hover:border-gold/40 text-left">
            <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-5 shrink-0">
              <Users size={20} strokeWidth={1.6} />
            </div>
            <h3 className="typo-h3 text-white mb-2">
              {t("home.who_is_it_for.exec_title")}
            </h3>
            <p className="font-urbanist text-[15px] md:text-[16px] font-[500] text-white/95 leading-snug mb-3">
              {t("home.who_is_it_for.exec_headline")}
            </p>
            <p className="typo-body text-w70 leading-relaxed text-[14px] md:text-[15px]">
              {t("home.who_is_it_for.exec_body")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

