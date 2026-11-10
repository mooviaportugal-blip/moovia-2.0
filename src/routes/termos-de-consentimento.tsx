import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  PRIVACY_EMAIL,
  isLegalConfigured,
} from "@/config/legalConstants";

export const Route = createFileRoute("/termos-de-consentimento")({
  head: () => ({
    meta: [
      { title: "Termos de Consentimento | MOOVIA" },
      ...(isLegalConfigured
        ? []
        : [{ name: "robots", content: "noindex, nofollow" }]),
      {
        name: "description",
        content:
          "Termos de Consentimento para participantes em avaliações e acompanhamento da MOOVIA.",
      },
      { property: "og:title", content: "Termos de Consentimento | MOOVIA" },
      {
        property: "og:description",
        content:
          "Termos de Consentimento para colaboradores e familiares que participam nos serviços da MOOVIA.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/termos-de-consentimento" }],
  }),
  component: TermosConsentimentoPage,
});

export function TermosConsentimentoPage() {
  const { t } = useTranslation();

  const consents = [
    {
      id: "C1",
      title: t("consent.s8_c1_title"),
      text: t("consent.s8_c1_text"),
      note: t("consent.s8_c1_note"),
    },
    {
      id: "C2",
      title: t("consent.s8_c2_title"),
      text: t("consent.s8_c2_text"),
      note: t("consent.s8_c2_note"),
    },
    {
      id: "C3",
      title: t("consent.s8_c3_title"),
      text: t("consent.s8_c3_text"),
      note: null,
    },
    {
      id: "C4",
      title: t("consent.s8_c4_title"),
      text: t("consent.s8_c4_text"),
      note: null,
    },
    {
      id: "C5",
      title: t("consent.s8_c5_title"),
      text: t("consent.s8_c5_text"),
      note: null,
    },
  ];

  return (
    <SiteLayout>
      <article className="bg-black text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[70ch] px-6 lg:px-8">
          {/* Aviso jurídico de prevalência linguística */}
          <p className="font-body text-xs text-white/40 italic mb-6">
            {t("consent.disclaimer")}
          </p>

          {/* Cabeçalho */}
          <div className="mb-12 border-b border-white/[0.08] pb-10">
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
              {t("consent.eyebrow")}
            </p>
            <h1 className="font-display font-[300] text-white text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15] mb-6">
              {t("consent.title")}
            </h1>
            <p className="font-body text-[16px] md:text-[18px] text-white/85 font-[300] leading-relaxed">
              {t("consent.intro")}
            </p>
          </div>

          {/* Conteúdo das 10 Secções */}
          <div className="space-y-14">
            {/* 1. O que é o serviço */}
            <section id="servico" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s1_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s1_p1")}
              </p>
            </section>

            {/* 2. Que informação recolhemos */}
            <section id="informacao-recolhida" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s2_title")}
              </h2>
              <ul className="space-y-2.5 font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{t("consent.s2_item1")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{t("consent.s2_item2")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{t("consent.s2_item3")}</span>
                </li>
              </ul>
              <p className="font-body text-[14px] md:text-[15px] text-white/70 font-[300] leading-relaxed p-4 rounded-xl bg-black-2/60 border border-white/[0.08]">
                {t("consent.s2_sensitive")}
              </p>
            </section>

            {/* 3. Para que a usamos */}
            <section id="utilizacao" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s3_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s3_p1")}
              </p>
            </section>

            {/* 4. Quem a vê */}
            <section id="destinatarios" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s4_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s4_p1")}
              </p>
            </section>

            {/* 5. Inteligência artificial */}
            <section id="inteligencia-artificial" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s5_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s5_p1_prefix")}
                <Link
                  to="/politica-de-privacidade"
                  hash="inteligencia-artificial"
                  className="text-gold underline hover:text-white transition-colors"
                >
                  {t("consent.s5_link_text")}
                </Link>
                {t("consent.s5_p1_suffix")}
              </p>
            </section>

            {/* 6. A sua escolha */}
            <section id="escolha" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s6_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s6_p1")}
              </p>
            </section>

            {/* 7. Como retirar o consentimento */}
            <section id="retirada" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s7_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {PRIVACY_EMAIL.trim() ? (
                  <span>
                    {t("consent.s7_p_email_prefix")}
                    <a href={`mailto:${PRIVACY_EMAIL}`} className="text-gold underline hover:text-white transition-colors">
                      {PRIVACY_EMAIL}
                    </a>
                    .{" "}
                  </span>
                ) : (
                  <span>
                    {t("consent.s7_p_no_email")}
                  </span>
                )}
                {t("consent.s7_p_common")}
              </p>
            </section>

            {/* 8. Consentimentos (caixas desenhadas, leitura) */}
            <section id="consentimentos" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-6">
                {t("consent.s8_title")}
              </h2>

              <div className="space-y-4">
                {consents.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-black-2 border border-gold/15 flex items-start gap-4 transition-colors"
                  >
                    {/* Caixa desenhada (mockup estético, desassinalada por padrão) */}
                    <div
                      aria-hidden="true"
                      className="w-5 h-5 rounded-[4px] border border-gold/40 bg-black-3 shrink-0 mt-1 flex items-center justify-center"
                    >
                      {/* Vazia intencionalmente - nenhuma pré-assinalada */}
                    </div>

                    <div className="space-y-1">
                      <p className="font-body text-xs uppercase tracking-widest text-gold font-medium">
                        {c.title}
                      </p>
                      <p className="font-body text-[15px] text-white/85 font-[300] leading-relaxed">
                        {c.text}
                      </p>
                      {c.note && (
                        <p className="font-body text-xs text-white/50 italic">
                          {c.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 font-body text-xs text-white/45 italic">
                {t("consent.s8_note")}
              </p>
            </section>

            {/* 9. Registo */}
            <section id="registo" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s9_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s9_p1")}
              </p>
            </section>

            {/* 10. Os seus direitos */}
            <section id="direitos" className="scroll-mt-28">
              <h2 className="font-display font-[300] text-white text-2xl md:text-[24px] leading-snug mb-3">
                {t("consent.s10_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed">
                {t("consent.s10_p1_prefix")}
                <Link
                  to="/politica-de-privacidade"
                  hash="direitos"
                  className="text-gold underline hover:text-white transition-colors"
                >
                  {t("consent.s10_link_text")}
                </Link>
                {t("consent.s10_p1_suffix")}
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}

