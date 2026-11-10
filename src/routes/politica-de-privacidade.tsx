import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  LEGAL_ENTITY_NAME,
  TAX_ID,
  REGISTERED_OFFICE,
  PRIVACY_EMAIL,
  DPO_CONTACT,
  RETENTION_PERIOD,
  PROVIDERS,
  TRANSFERS,
  SUPERVISORY_AUTHORITY,
  LAST_UPDATED,
  isLegalConfigured,
} from "@/config/legalConstants";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | MOOVIA" },
      ...(isLegalConfigured
        ? []
        : [{ name: "robots", content: "noindex, nofollow" }]),
      {
        name: "description",
        content:
          "Política de Privacidade e proteção de dados da MOOVIA. Informações sobre tratamento de dados, RGPD e direitos dos titulares.",
      },
      { property: "og:title", content: "Política de Privacidade | MOOVIA" },
      {
        property: "og:description",
        content: "Privacidade e proteção de dados pessoais na MOOVIA.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/politica-de-privacidade" }],
  }),
  component: PoliticaPrivacidadePage,
});

export function PoliticaPrivacidadePage() {
  const { t } = useTranslation();

  const toc = [
    { id: "responsavel", title: t("privacy.s1_title") },
    { id: "aplicabilidade", title: t("privacy.s2_title") },
    { id: "dados-recolhidos", title: t("privacy.s3_title") },
    { id: "finalidades-fundamentos", title: t("privacy.s4_title") },
    { id: "inteligencia-artificial", title: t("privacy.s5_title") },
    { id: "partilha", title: t("privacy.s6_title") },
    { id: "transferencias", title: t("privacy.s7_title") },
    { id: "conservacao", title: t("privacy.s8_title") },
    { id: "direitos", title: t("privacy.s9_title") },
    { id: "seguranca", title: t("privacy.s10_title") },
    { id: "menores", title: t("privacy.s11_title") },
    { id: "alteracoes", title: t("privacy.s12_title") },
  ];

  const tableData = [
    { p: t("privacy.s4_r1_p"), b: t("privacy.s4_r1_b") },
    { p: t("privacy.s4_r2_p"), b: t("privacy.s4_r2_b") },
    { p: t("privacy.s4_r3_p"), b: t("privacy.s4_r3_b") },
    { p: t("privacy.s4_r4_p"), b: t("privacy.s4_r4_b") },
    { p: t("privacy.s4_r5_p"), b: t("privacy.s4_r5_b") },
    { p: t("privacy.s4_r6_p"), b: t("privacy.s4_r6_b") },
    { p: t("privacy.s4_r7_p"), b: t("privacy.s4_r7_b") },
  ];

  // Helper para construir texto do responsável sem expor constantes vazias
  const renderControllerText = () => {
    if (!LEGAL_ENTITY_NAME.trim()) {
      return (
        <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
          {t("privacy.s1_p1_default")}
          {PRIVACY_EMAIL.trim() && (
            <span>
              {t("privacy.s1_email_prefix")}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-gold underline hover:text-white transition-colors">
                {PRIVACY_EMAIL}
              </a>
              .
            </span>
          )}
          {DPO_CONTACT.trim() && <span> {DPO_CONTACT}</span>}
        </p>
      );
    }

    return (
      <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
        {t("privacy.s1_p1_prefix")}
        <strong className="text-white font-normal">{LEGAL_ENTITY_NAME}</strong>
        {TAX_ID.trim() && (
          <span>
            {t("privacy.s1_tax_prefix")}
            {TAX_ID}
          </span>
        )}
        {REGISTERED_OFFICE.trim() && (
          <span>
            {t("privacy.s1_office_prefix")}
            {REGISTERED_OFFICE}
          </span>
        )}
        {t("privacy.s1_entity_suffix")}
        {PRIVACY_EMAIL.trim() && (
          <span>
            {t("privacy.s1_email_prefix")}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="text-gold underline hover:text-white transition-colors">
              {PRIVACY_EMAIL}
            </a>
            .
          </span>
        )}
        {DPO_CONTACT.trim() && <span> {DPO_CONTACT}</span>}
      </p>
    );
  };

  return (
    <SiteLayout>
      <article className="bg-black text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[70ch] px-6 lg:px-8">
          {/* Aviso jurídico de prevalência linguística */}
          <p className="font-body text-xs text-white/40 italic mb-6">
            {t("privacy.disclaimer")}
          </p>

          {/* Cabeçalho */}
          <div className="mb-12 border-b border-white/[0.08] pb-10">
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
              {t("privacy.eyebrow")}
            </p>
            <h1 className="font-display font-[300] text-white text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15] mb-4">
              {t("privacy.title")}
            </h1>
            {LAST_UPDATED.trim() && (
              <p className="font-body text-xs text-white/50 tracking-wider">
                {t("privacy.last_updated_prefix")}
                {LAST_UPDATED}
              </p>
            )}
          </div>

          {/* Índice por âncoras */}
          <nav aria-label={t("privacy.toc_title")} className="mb-16 p-6 rounded-2xl bg-black-2 border border-gold/15">
            <p className="font-body text-xs uppercase tracking-widest text-gold font-medium mb-4">
              {t("privacy.toc_title")}
            </p>
            <ol className="space-y-2.5 font-body text-sm font-[300] text-white/70">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-gold transition-colors hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Secções da Política */}
          <div className="space-y-16">
            {/* 1. Responsável */}
            <section id="responsavel" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s1_title")}
              </h2>
              {renderControllerText()}
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s1_p2")}
              </p>
            </section>

            {/* 2. A quem se aplica */}
            <section id="aplicabilidade" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s2_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s2_p1")}
                <Link
                  to="/termos-de-consentimento"
                  className="text-gold underline hover:text-white transition-colors"
                >
                  {t("privacy.s2_link_consent")}
                </Link>
                {t("privacy.s2_p1_suffix")}
              </p>
            </section>

            {/* 3. Que dados recolhemos */}
            <section id="dados-recolhidos" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s3_title")}
              </h2>
              <ul className="space-y-3 font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-normal">{t("privacy.s3_item1_label")}</strong>
                    {t("privacy.s3_item1_text")}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-normal">{t("privacy.s3_item2_label")}</strong>
                    {t("privacy.s3_item2_text")}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-normal">{t("privacy.s3_item3_label")}</strong>
                    {t("privacy.s3_item3_text")}
                    <Link
                      to="/cookies"
                      className="text-gold underline hover:text-white transition-colors"
                    >
                      {t("privacy.s3_link_cookies")}
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-normal">{t("privacy.s3_item4_label")}</strong>
                    {t("privacy.s3_item4_text")}
                  </span>
                </li>
              </ul>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed p-4 rounded-xl bg-black-2/60 border border-white/[0.08]">
                {t("privacy.s3_p_sensitive")}
              </p>
            </section>

            {/* 4. Para que usamos os dados e com que fundamento */}
            <section id="finalidades-fundamentos" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-6">
                {t("privacy.s4_title")}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-white/[0.1] bg-black-2">
                <table className="w-full text-left border-collapse text-[14px] md:text-[15px]">
                  <thead>
                    <tr className="border-b border-white/[0.1] bg-black-3">
                      <th className="py-3.5 px-5 font-body text-xs uppercase tracking-wider text-gold font-medium w-1/2">
                        {t("privacy.s4_th_purpose")}
                      </th>
                      <th className="py-3.5 px-5 font-body text-xs uppercase tracking-wider text-gold font-medium w-1/2">
                        {t("privacy.s4_th_basis")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] font-body font-[300] text-white/80">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5 leading-relaxed">{row.p}</td>
                        <td className="py-3.5 px-5 leading-relaxed text-white/70">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Inteligência artificial */}
            <section id="inteligencia-artificial" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s5_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("privacy.s5_p1")}
              </p>
              <ul className="space-y-3 font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-6">
                {[
                  t("privacy.s5_rule1"),
                  t("privacy.s5_rule2"),
                  t("privacy.s5_rule3"),
                  t("privacy.s5_rule4"),
                  t("privacy.s5_rule5"),
                ].map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs md:text-sm text-white/50 italic">
                {t("privacy.s5_p_closing")}
              </p>
            </section>

            {/* 6. Com quem partilhamos */}
            <section id="partilha" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s6_title")}
              </h2>
              <ul className="space-y-3 font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {PROVIDERS.trim() && (
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>
                      {t("privacy.s6_providers_prefix")}
                      {PROVIDERS}
                      .
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{t("privacy.s6_client")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{t("privacy.s6_authorities")}</span>
                </li>
              </ul>
              <p className="font-body text-[15px] md:text-[16px] text-white/90 font-[400] leading-relaxed">
                {t("privacy.s6_no_sale")}
              </p>
            </section>

            {/* 7. Transferências para fora do EEE */}
            <section id="transferencias" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s7_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("privacy.s7_p1")}
                {TRANSFERS.trim() && <span> {TRANSFERS}.</span>}
              </p>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s7_p2")}
              </p>
            </section>

            {/* 8. Quanto tempo conservamos os dados */}
            <section id="conservacao" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s8_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {RETENTION_PERIOD.trim() && <span>{RETENTION_PERIOD} </span>}
                {t("privacy.s8_p_default")}
              </p>
            </section>

            {/* 9. Os seus direitos */}
            <section id="direitos" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s9_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s9_p1")}
                {PRIVACY_EMAIL.trim() && (
                  <span>
                    {t("privacy.s9_p_email_prefix")}
                    <a href={`mailto:${PRIVACY_EMAIL}`} className="text-gold underline hover:text-white transition-colors">
                      {PRIVACY_EMAIL}
                    </a>
                    .
                  </span>
                )}
                {t("privacy.s9_p_response_time")}
                {t("privacy.s9_p_authority")}
                {SUPERVISORY_AUTHORITY.trim() ? ` (${SUPERVISORY_AUTHORITY}).` : "."}
              </p>
            </section>

            {/* 10. Segurança */}
            <section id="seguranca" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s10_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s10_p1")}
              </p>
            </section>

            {/* 11. Menores */}
            <section id="menores" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s11_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s11_p1")}
              </p>
            </section>

            {/* 12. Alterações */}
            <section id="alteracoes" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[26px] leading-snug mb-4">
                {t("privacy.s12_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("privacy.s12_p1")}
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
