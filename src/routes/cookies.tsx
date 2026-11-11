import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  LEGAL_ENTITY_NAME,
  PRIVACY_EMAIL,
  PROVIDERS,
  LAST_UPDATED,
  isLegalConfigured,
} from "@/config/legalConstants";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies | MOOVIA" },
      ...(isLegalConfigured
        ? []
        : [{ name: "robots", content: "noindex, nofollow" }]),
      {
        name: "description",
        content:
          "Política de Cookies e tecnologias de armazenamento da MOOVIA. Informações sobre cookies essenciais, preferências e medição.",
      },
      { property: "og:title", content: "Política de Cookies | MOOVIA" },
      {
        property: "og:description",
        content: "Transparência sobre cookies e armazenamento de dados no seu dispositivo.",
      },
      { property: "og:url", content: "https://moovia.global/cookies" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/cookies" }],
  }),
  component: CookiesPage,
});

export function CookiesPage() {
  const { t } = useTranslation();

  const toc = [
    { id: "o-que-sao-cookies", title: t("cookies.s1_title") },
    { id: "responsavel", title: t("cookies.s2_title") },
    { id: "que-cookies-usamos", title: t("cookies.s3_title") },
    { id: "cookies-essenciais", title: t("cookies.s4_title") },
    { id: "cookies-nao-essenciais", title: t("cookies.s5_title") },
    { id: "servicos-terceiros", title: t("cookies.s6_title") },
    { id: "como-gerir", title: t("cookies.s7_title") },
    { id: "duracao", title: t("cookies.s8_title") },
    { id: "direitos", title: t("cookies.s9_title") },
    { id: "alteracoes", title: t("cookies.s10_title") },
  ];

  const tableRows = [
    {
      name: t("cookies.s3_r1_name"),
      purpose: t("cookies.s3_r1_purpose"),
      category: t("cookies.s3_r1_category"),
      duration: t("cookies.s3_r1_duration"),
      origin: t("cookies.s3_r1_origin"),
    },
    {
      name: t("cookies.s3_r2_name"),
      purpose: t("cookies.s3_r2_purpose"),
      category: t("cookies.s3_r2_category"),
      duration: t("cookies.s3_r2_duration"),
      origin: t("cookies.s3_r2_origin"),
    },
    {
      name: t("cookies.s3_r3_name"),
      purpose: t("cookies.s3_r3_purpose"),
      category: t("cookies.s3_r3_category"),
      duration: t("cookies.s3_r3_duration"),
      origin: t("cookies.s3_r3_origin"),
    },
    {
      name: t("cookies.s3_r4_name"),
      purpose: t("cookies.s3_r4_purpose"),
      category: t("cookies.s3_r4_category"),
      duration: t("cookies.s3_r4_duration"),
      origin: t("cookies.s3_r4_origin"),
    },
    {
      name: t("cookies.s3_r5_name"),
      purpose: t("cookies.s3_r5_purpose"),
      category: t("cookies.s3_r5_category"),
      duration: t("cookies.s3_r5_duration"),
      origin: t("cookies.s3_r5_origin"),
    },
    {
      name: t("cookies.s3_r6_name"),
      purpose: t("cookies.s3_r6_purpose"),
      category: t("cookies.s3_r6_category"),
      duration: t("cookies.s3_r6_duration"),
      origin: t("cookies.s3_r6_origin"),
    },
    {
      name: t("cookies.s3_r7_name"),
      purpose: t("cookies.s3_r7_purpose"),
      category: t("cookies.s3_r7_category"),
      duration: t("cookies.s3_r7_duration"),
      origin: t("cookies.s3_r7_origin"),
    },
    {
      name: t("cookies.s3_r8_name"),
      purpose: t("cookies.s3_r8_purpose"),
      category: t("cookies.s3_r8_category"),
      duration: t("cookies.s3_r8_duration"),
      origin: t("cookies.s3_r8_origin"),
    },
    {
      name: t("cookies.s3_r9_name"),
      purpose: t("cookies.s3_r9_purpose"),
      category: t("cookies.s3_r9_category"),
      duration: t("cookies.s3_r9_duration"),
      origin: t("cookies.s3_r9_origin"),
    },
  ];

  const renderControllerText = () => {
    const hasEntity = Boolean(LEGAL_ENTITY_NAME.trim());
    const hasEmail = Boolean(PRIVACY_EMAIL.trim());

    return (
      <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
        {hasEntity && (
          <>
            {t("cookies.s2_responsible")}
            <strong className="text-white font-normal">{LEGAL_ENTITY_NAME}</strong>.{" "}
          </>
        )}
        {hasEmail && (
          <>
            {t("cookies.s2_contact")}
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="text-gold underline hover:text-white transition-colors"
            >
              {PRIVACY_EMAIL}
            </a>
            .{" "}
          </>
        )}
        <span>
          {t("cookies.s2_privacy_prefix")}
          <Link
            to="/politica-de-privacidade"
            className="text-gold underline hover:text-white transition-colors"
          >
            {t("cookies.s2_privacy_link")}
          </Link>
          .
        </span>
      </p>
    );
  };

  return (
    <SiteLayout>
      <article className="bg-black text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[70ch] px-6 lg:px-8">
          {/* Aviso juridico de prevalencia linguistica */}
          <p className="font-body text-xs text-white/40 italic mb-6">
            {t("cookies.disclaimer")}
          </p>

          {/* Cabecalho */}
          <div className="mb-12 border-b border-white/[0.08] pb-10">
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
              {t("cookies.eyebrow")}
            </p>
            <h1 className="font-display font-[300] text-white text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15] mb-4">
              {t("cookies.title")}
            </h1>
            {LAST_UPDATED.trim() ? (
              <p className="font-body text-xs text-white/50 tracking-wider">
                {t("cookies.last_updated_prefix")}
                {LAST_UPDATED}
              </p>
            ) : null}
          </div>

          {/* Indice por ancoras */}
          <nav
            aria-label={t("cookies.toc_title")}
            className="mb-16 p-6 rounded-2xl bg-black-2 border border-gold/15"
          >
            <p className="font-body text-xs uppercase tracking-widest text-gold font-medium mb-4">
              {t("cookies.toc_title")}
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

          {/* Secoes numeradas */}
          <div className="space-y-14">
            {/* 1. O que sao cookies */}
            <section id="o-que-sao-cookies" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s1_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s1_p1")}
              </p>
            </section>

            {/* 2. Quem e o responsavel */}
            <section id="responsavel" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s2_title")}
              </h2>
              {renderControllerText()}
            </section>

            {/* 3. Que cookies e armazenamento usamos */}
            <section id="que-cookies-usamos" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s3_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s3_intro")}
              </p>

              <div className="overflow-x-auto my-6 border border-white/[0.08] rounded-xl bg-black-2/30">
                <table className="w-full text-left text-xs font-body border-collapse min-w-[640px]">
                  <thead className="bg-black-2 text-gold uppercase tracking-wider text-[11px] border-b border-white/[0.08]">
                    <tr>
                      <th className="p-3 font-medium w-[18%]">{t("cookies.s3_th_name")}</th>
                      <th className="p-3 font-medium w-[34%]">{t("cookies.s3_th_purpose")}</th>
                      <th className="p-3 font-medium w-[16%]">{t("cookies.s3_th_category")}</th>
                      <th className="p-3 font-medium w-[14%]">{t("cookies.s3_th_duration")}</th>
                      <th className="p-3 font-medium w-[18%]">{t("cookies.s3_th_origin")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {tableRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 text-white font-mono text-[11px] break-words">
                          {row.name}
                        </td>
                        <td className="p-3 text-white/80 leading-relaxed text-[13px]">{row.purpose}</td>
                        <td className="p-3 text-white/70 text-[12px]">{row.category}</td>
                        <td className="p-3 text-white/70 text-[12px]">{row.duration}</td>
                        <td className="p-3 text-white/70 text-[12px] break-words">{row.origin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Cookies essenciais */}
            <section id="cookies-essenciais" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s4_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s4_p1")}
              </p>
            </section>

            {/* 5. Cookies nao essenciais */}
            <section id="cookies-nao-essenciais" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s5_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s5_p1")}
              </p>
            </section>

            {/* 6. Servicos de terceiros */}
            <section id="servicos-terceiros" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s6_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s6_text")}
                {PROVIDERS.trim() ? ` ${PROVIDERS}` : ""}
              </p>
            </section>

            {/* 7. Como gerir */}
            <section id="como-gerir" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s7_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s7_p1")}
              </p>
            </section>

            {/* 8. Duracao */}
            <section id="duracao" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s8_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s8_p1")}
              </p>
            </section>

            {/* 9. Os seus direitos */}
            <section id="direitos" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s9_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s9_prefix")}
                <Link
                  to="/politica-de-privacidade"
                  hash="direitos"
                  className="text-gold underline hover:text-white transition-colors"
                >
                  {t("cookies.s9_link")}
                </Link>
                .
              </p>
            </section>

            {/* 10. Alteracoes */}
            <section id="alteracoes" className="scroll-mt-32">
              <h2 className="font-display font-[300] text-white text-[22px] sm:text-[26px] md:text-[28px] mb-4">
                {t("cookies.s10_title")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed mb-4">
                {t("cookies.s10_p1")}
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
