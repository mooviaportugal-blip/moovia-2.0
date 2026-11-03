import { useTranslation } from "react-i18next";
import "@/i18n";
import { Building2, UserCheck, Users } from "lucide-react";
import { ClientBeneficiaryBadge } from "@/components/ui/ClientBeneficiaryBadge";

export function ForWhomSection() {
  const { t } = useTranslation();

  return (
    <section
      id="para-quem-e"
      className="section-spacing bg-black-2 px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 md:mb-16">
          <p className="typo-eyebrow mb-4">{t("home.for_whom.eyebrow")}</p>
          <h2 className="typo-h2 text-white">{t("home.for_whom.title")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Cartão grande em destaque: Cliente (Empresas) */}
          <article className="lg:col-span-7 border-2 border-gold/50 bg-[#09183D]/45 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <ClientBeneficiaryBadge role="client" />
                <Building2 size={22} className="text-gold shrink-0" strokeWidth={1.6} />
              </div>
              <h3 className="typo-h3 text-white mb-3">
                {t("home.for_whom.client_title")}
              </h3>
              <p className="typo-body text-white/90">
                {t("home.for_whom.client_body")}
              </p>
            </div>
          </article>

          {/* Dois cartões menores: Beneficiários (Executivo e Família) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <article className="border border-b18 bg-w05 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4 mb-4">
                <ClientBeneficiaryBadge role="beneficiary" />
                <UserCheck size={18} className="text-w70 shrink-0" strokeWidth={1.6} />
              </div>
              <p className="typo-body text-w70">
                <strong className="font-semibold text-white">
                  {t("home.for_whom.exec_title")}
                </strong>{" "}
                {t("home.for_whom.exec_body")}
              </p>
            </article>

            <article className="border border-b18 bg-w05 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4 mb-4">
                <ClientBeneficiaryBadge role="beneficiary" />
                <Users size={18} className="text-w70 shrink-0" strokeWidth={1.6} />
              </div>
              <p className="typo-body text-w70">
                <strong className="font-semibold text-white">
                  {t("home.for_whom.family_title")}
                </strong>{" "}
                {t("home.for_whom.family_body")}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

