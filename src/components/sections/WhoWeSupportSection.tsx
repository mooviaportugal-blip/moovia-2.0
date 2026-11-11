import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { Building2, Users, ArrowRight } from "lucide-react";

export function WhoWeSupportSection() {
  const { t } = useTranslation();

  return (
    <section
      id="quem-apoiamos"
      className="py-16 md:py-20 bg-black-2 px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Cabeçalho da secção */}
        <div className="mb-10 md:mb-12 text-left">
          <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-[300] text-white leading-[1.2] mb-3">
            {t("whoWeSupport.title")}
          </h2>
          <p className="font-urbanist text-[15px] md:text-[17px] font-[400] text-w70 max-w-2xl leading-relaxed">
            {t("whoWeSupport.subtitle")}
          </p>
        </div>

        {/* Dois cartões clicáveis: 1. Companies -> /para-empresas, 2. Executives -> /para-executivos-e-familias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Cartão 1: For Companies */}
          <Link
            to="/para-empresas"
            className="group border border-b18 bg-w05 p-7 md:p-9 flex flex-col justify-between rounded-sm transition-all duration-300 hover:border-[#9B7A50] hover:bg-w08 focus:outline-none focus:border-[#9B7A50] cursor-pointer text-left"
          >
            <div>
              <div className="w-10 h-10 rounded-sm border border-[#9B7A50]/40 bg-[#9B7A50]/10 flex items-center justify-center text-[#9B7A50] mb-5 shrink-0 group-hover:border-[#9B7A50] transition-colors">
                <Building2 size={20} strokeWidth={1.4} />
              </div>

              <h3 className="font-urbanist text-[12px] tracking-[0.24em] uppercase text-[#9B7A50] font-[500] mb-3">
                {t("whoWeSupport.comp_title")}
              </h3>

              <p className="font-display text-[20px] md:text-[23px] font-[300] text-white leading-[1.3] mb-4 group-hover:text-[#9B7A50] transition-colors">
                {t("whoWeSupport.comp_highlight")}
              </p>

              <p className="font-urbanist text-[14px] md:text-[15px] font-[300] text-white/75 leading-[1.7]">
                {t("whoWeSupport.comp_text")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#9B7A50] text-[13px] font-urbanist font-medium tracking-wide pt-5 mt-6 border-t border-b18 group-hover:text-white transition-colors">
              <span>{t("whoWeSupport.comp_title")}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Cartão 2: For Executives & Their Families */}
          <Link
            to="/para-executivos-e-familias"
            className="group border border-b18 bg-w05 p-7 md:p-9 flex flex-col justify-between rounded-sm transition-all duration-300 hover:border-[#9B7A50] hover:bg-w08 focus:outline-none focus:border-[#9B7A50] cursor-pointer text-left"
          >
            <div>
              <div className="w-10 h-10 rounded-sm border border-[#9B7A50]/40 bg-[#9B7A50]/10 flex items-center justify-center text-[#9B7A50] mb-5 shrink-0 group-hover:border-[#9B7A50] transition-colors">
                <Users size={20} strokeWidth={1.4} />
              </div>

              <h3 className="font-urbanist text-[12px] tracking-[0.24em] uppercase text-[#9B7A50] font-[500] mb-3">
                {t("whoWeSupport.exec_title")}
              </h3>

              <p className="font-display text-[20px] md:text-[23px] font-[300] text-white leading-[1.3] mb-4 group-hover:text-[#9B7A50] transition-colors">
                {t("whoWeSupport.exec_highlight")}
              </p>

              <p className="font-urbanist text-[14px] md:text-[15px] font-[300] text-white/75 leading-[1.7]">
                {t("whoWeSupport.exec_text")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#9B7A50] text-[13px] font-urbanist font-medium tracking-wide pt-5 mt-6 border-t border-b18 group-hover:text-white transition-colors">
              <span>{t("whoWeSupport.exec_title")}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
