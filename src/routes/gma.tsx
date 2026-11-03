import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { ChevronDown, Building2, UserCheck, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { ClientBeneficiaryBadge } from "@/components/ui/ClientBeneficiaryBadge";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";

export const Route = createFileRoute("/gma")({
  head: () => ({
    meta: [
      { title: "Global Mobility Assurance | MOOVIA" },
      {
        name: "description",
        content:
          "Acompanhamento da mobilidade internacional para empresas que investem em talento através da metodologia Global Mobility Assurance.",
      },
      { property: "og:title", content: "Global Mobility Assurance | MOOVIA" },
      {
        property: "og:description",
        content:
          "Acompanhamento da mobilidade internacional para empresas que investem em talento através da metodologia Global Mobility Assurance.",
      },
    ],
  }),
  component: EmpresasPage,
});

function EmpresasPage() {
  const { t } = useTranslation();
  const [showFactors, setShowFactors] = useState(false);

  const riscos = [
    "Adaptação familiar",
    "Integração do cônjuge",
    "Adaptação escolar dos filhos",
    "Adequação da habitação e do bairro",
    "Integração cultural e social",
    "Rede de apoio local",
    "Expectativas versus realidade do país",
    "Estabilidade emocional durante a transição",
    "Alinhamento familiar com a mudança",
    "Fatores de stress logístico, jurídico ou financeiro",
  ];

  const resultados = [
    "Mais visibilidade sobre o risco humano da mobilidade",
    "Maior capacidade de intervenção preventiva",
    "Apoio estruturado à adaptação do colaborador e da família",
    "Melhor integração no país de destino",
    "Redução do risco de turnover precoce",
    "Apoio à preservação da produtividade",
    "Proteção do investimento realizado na mobilidade",
    "Fortalecimento da proposta de valor ao colaborador",
  ];

  const etapasFramework = [
    {
      title: t("empresas.framework_step1_title"),
      body: t("empresas.framework_step1_body"),
    },
    {
      title: t("empresas.framework_step2_title"),
      body: t("empresas.framework_step2_body"),
    },
    {
      title: t("empresas.framework_step3_title"),
      body: t("empresas.framework_step3_body"),
    },
    {
      title: t("empresas.framework_step4_title"),
      body: t("empresas.framework_step4_body"),
    },
    {
      title: t("empresas.framework_step5_title"),
      body: t("empresas.framework_step5_body"),
    },
  ];

  const empresaRecebe = [
    "Monitorização estruturada da mobilidade",
    "Global Mobility Success Dashboard com indicadores agregados",
    "Recomendações práticas para Recursos Humanos e liderança",
    "Maior capacidade de intervenção preventiva",
    "Apoio à retenção e redução da exposição ao turnover",
  ];

  const executivoRecebe = [
    "Avaliação inicial estruturada",
    "Plano personalizado de transição",
    "Acompanhamento aos 30, 60 e 90 dias",
    "Relatório e painel pessoal confidencial",
  ];

  const familiaRecebe = [
    "Acolhimento estruturado",
    "Apoio à integração local e escolar",
    "Orientação prática para o dia a dia",
    "Redução de fricções na mudança",
  ];

  const pilaresMetodologia = [
    {
      num: "01",
      title: "Avaliação Estruturada",
      body: "Aplicamos instrumentos próprios em momentos críticos da transição, antes da mudança e ao longo dos primeiros meses no destino, para captar sinais precoces de adaptação, sobrecarga ou desalinhamento.",
    },
    {
      num: "02",
      title: "Inteligência Interpretada",
      body: "As respostas são analisadas à luz da psicologia intercultural e da gestão de mobilidade internacional, transformando perceções subjetivas em indicadores claros e recomendações práticas.",
    },
    {
      num: "03",
      title: "Acompanhamento Contínuo",
      body: "A adaptação humana não é estática. Monitorizamos a evolução ao longo da jornada para orientar intervenções preventivas, sem substituir os parceiros fiscais, jurídicos ou de relocation que a empresa já utiliza.",
    },
  ];

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("contacto")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToMethodology = (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("metodologia")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteLayout>
      {/* 1. ABERTURA EMPRESAS: frase única + riscos e resultados compactos */}
      <section className="hero-section relative bg-[#06091a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 lg:px-20 border-b border-b18 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center mb-16">
            <div>
              <p className="typo-eyebrow mb-4">{t("common.gma")}</p>
              <h1 className="typo-h1 text-white mb-8 max-w-[22ch]">
                {t("empresas.opening")}
              </h1>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center bg-gold hover:bg-gold-l text-black font-semibold typo-caption px-7 py-4 rounded-[2px] transition-colors"
                >
                  {t("common.cta_talk")}
                </a>
                <a
                  href="#metodologia"
                  onClick={handleScrollToMethodology}
                  className="inline-flex items-center justify-center border border-gold/40 hover:border-gold text-gold hover:text-gold-l font-semibold typo-caption px-7 py-4 rounded-[2px] transition-colors"
                >
                  {t("home.steps.link_methodology")}
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <ConstellationLogo />
            </div>
          </div>

          {/* Lista de riscos e lista de resultados em duas colunas compactas (chips) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-10 border-t border-b18">
            <div className="border border-b18 bg-w05 p-6 md:p-8">
              <h2 className="typo-h3 text-white mb-4">
                {t("empresas.risks_title")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {riscos.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center px-3 py-1.5 border border-b18 bg-black/50 typo-caption text-w70"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-gold/30 bg-[#09183D]/35 p-6 md:p-8">
              <h2 className="typo-h3 text-gold-l mb-4">
                {t("empresas.results_title")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {resultados.map((res) => (
                  <span
                    key={res}
                    className="inline-flex items-center px-3 py-1.5 border border-gold/25 bg-black/50 typo-caption text-white/90"
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AS CINCO ETAPAS DO MOOVIA FRAMEWORK (título + 1 linha cada) */}
      <section
        id="how-it-works"
        className="section-spacing bg-black px-6 lg:px-20 border-b border-b18"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="typo-eyebrow mb-4">{t("empresas.framework_eyebrow")}</p>
            <h2 className="typo-h2 text-white">{t("empresas.framework_title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 items-stretch">
            {etapasFramework.map((etapa) => (
              <article
                key={etapa.title}
                className="border border-b18 bg-w05 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="typo-h3 text-gold-l mb-3">{etapa.title}</h3>
                  <p className="typo-body text-w70">{etapa.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUEM É O CLIENTE E O QUE CADA PARTE RECEBE */}
      <section className="section-spacing bg-black-2 px-6 lg:px-20 border-b border-b18">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="typo-eyebrow mb-4">{t("home.for_whom.eyebrow")}</p>
            <h2 className="typo-h2 text-white">{t("home.for_whom.title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Cartão principal: Cliente (Empresa) */}
            <article className="lg:col-span-7 border-2 border-gold/50 bg-[#09183D]/45 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <ClientBeneficiaryBadge role="client" />
                  <Building2 size={22} className="text-gold shrink-0" strokeWidth={1.6} />
                </div>
                <h3 className="typo-h3 text-white mb-4">Empresa</h3>
                <ul className="space-y-3">
                  {empresaRecebe.map((item) => (
                    <li key={item} className="typo-body text-white/90 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Dois cartões menores: Beneficiários (Executivo e Família) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <article className="border border-b18 bg-w05 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <ClientBeneficiaryBadge role="beneficiary" />
                  <UserCheck size={18} className="text-w70 shrink-0" strokeWidth={1.6} />
                </div>
                <h3 className="typo-h3 text-white mb-3">Executivo</h3>
                <ul className="space-y-2">
                  {executivoRecebe.map((item) => (
                    <li key={item} className="typo-body text-w70 flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-white/40 mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="border border-b18 bg-w05 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <ClientBeneficiaryBadge role="beneficiary" />
                  <Users size={18} className="text-w70 shrink-0" strokeWidth={1.6} />
                </div>
                <h3 className="typo-h3 text-white mb-3">Família</h3>
                <ul className="space-y-2">
                  {familiaRecebe.map((item) => (
                    <li key={item} className="typo-body text-w70 flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-white/40 mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METODOLOGIA COMPLETA (explicação única de Global Mobility Assurance + Em resumo de 3 linhas) */}
      <section
        id="metodologia"
        className="section-spacing bg-black px-6 lg:px-20 border-b border-b18 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10">
            <p className="typo-eyebrow mb-4">{t("common.gma")}</p>
            <h2 className="typo-h2 text-white mb-6">
              A metodologia que torna mensurável a dimensão humana da mobilidade internacional.
            </h2>
          </div>

          {/* Bloco "Em resumo" de 3 linhas no topo da metodologia */}
          <div className="border border-gold/40 bg-[#09183D]/40 p-6 md:p-8 mb-12">
            <p className="typo-eyebrow mb-4">{t("methodology.summary_eyebrow")}</p>
            <div className="space-y-3">
              <p className="typo-body text-white/90">
                <strong className="font-semibold text-gold-l">
                  {t("methodology.summary_what_label")}
                </strong>{" "}
                {t("methodology.summary_what")}
              </p>
              <p className="typo-body text-white/90">
                <strong className="font-semibold text-gold-l">
                  {t("methodology.summary_who_label")}
                </strong>{" "}
                {t("methodology.summary_who")}
              </p>
              <p className="typo-body text-white/90">
                <strong className="font-semibold text-gold-l">
                  {t("methodology.summary_benefit_label")}
                </strong>{" "}
                {t("methodology.summary_benefit")}
              </p>
            </div>
          </div>

          {/* Três pilares da metodologia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {pilaresMetodologia.map((p) => (
              <article key={p.num} className="border border-b18 bg-w05 p-8 flex flex-col">
                <span className="typo-caption font-semibold text-gold mb-3">
                  {p.num}
                </span>
                <h3 className="typo-h3 text-white mb-3">{p.title}</h3>
                <p className="typo-body text-w70">{p.body}</p>
              </article>
            ))}
          </div>

          {/* Bloco expansível "Saiba mais" com detalhes preservados da home anterior */}
          <div className="border border-b18 bg-black-2/60">
            <button
              type="button"
              onClick={() => setShowFactors((prev) => !prev)}
              aria-expanded={showFactors}
              className="w-full flex items-center justify-between px-6 py-4 text-left typo-caption font-semibold text-gold hover:text-gold-l transition-colors"
            >
              <span>
                {showFactors ? t("common.show_less") : t("common.learn_more")}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  showFactors ? "rotate-180" : ""
                }`}
              />
            </button>

            {showFactors && (
              <div className="p-6 md:p-8 border-t border-b18 space-y-6">
                <p className="typo-body text-w70">
                  As empresas investem milhares de euros para transferir talentos, mas os principais fatores que levam uma missão internacional a falhar raramente são medidos: são humanos e familiares.
                </p>
                <p className="typo-body text-w70">
                  Muitas empresas já trabalham com parceiros de relocation, imobiliário ou fiscalidade de confiança. A MOOVIA atua em coordenação com esses parceiros para alinhar as intervenções práticas aos fatores humanos identificados ao longo da transição.
                </p>
                <p className="typo-body text-gold-l font-semibold">
                  A avaliação do sucesso da mobilidade internacional não deve terminar no momento da chegada, mas consolidar-se na integração e permanência do colaborador e da família.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CONFIDENCIALIDADE, PROTEÇÃO DE DADOS E VALIDAÇÃO JURÍDICA */}
      <section className="section-spacing bg-black-2 px-6 lg:px-20 border-b border-b18">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="typo-eyebrow mb-4">{t("home.trust.eyebrow")}</p>
            <h2 className="typo-h2 text-white">{t("home.trust.title")}</h2>
          </div>

          <div className="space-y-6">
            <div className="border border-b18 bg-w05 p-6 md:p-8">
              <h3 className="typo-h3 text-gold-l mb-3">
                {t("home.trust.legal_validation_label")}
              </h3>
              <p className="typo-body text-white/90">
                {t("home.trust.legal_validation_text")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-b18 bg-w05 p-6">
                <h3 className="typo-h3 text-white mb-2">Relatório Individual</h3>
                <p className="typo-body text-w70">
                  Exclusivo do participante, confidencial, com o seu plano e recomendações pessoais.
                </p>
              </div>
              <div className="border border-gold/30 bg-[#09183D]/35 p-6">
                <h3 className="typo-h3 text-gold-l mb-2">Painel Corporativo</h3>
                <p className="typo-body text-white/90">
                  Apenas indicadores agregados e recomendações de gestão para a empresa.
                </p>
              </div>
            </div>

            <p className="typo-caption text-w70">
              Os resultados produzidos pela MOOVIA não constituem instrumento de avaliação de desempenho e não podem, por si só, fundamentar decisões de remuneração, promoção, procedimento disciplinar ou cessação da relação laboral. A participação no programa é voluntária.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FORMULÁRIO DE CONTACTO (#contacto e #lead-form) */}
      <section
        id="contacto"
        className="section-spacing bg-black px-6 lg:px-20 scroll-mt-20"
      >
        <div id="lead-form" className="mx-auto max-w-[720px]">
          <div className="mb-10 text-center">
            <p className="typo-eyebrow mb-4">{t("empresas.form.eyebrow")}</p>
            <h2 className="typo-h2 text-white mb-3">{t("empresas.form.title")}</h2>
            <p className="typo-body text-w70 mx-auto">
              {t("empresas.form.subtitle")}
            </p>
          </div>
          <UnifiedLeadForm context="empresas" />
        </div>
      </section>
    </SiteLayout>
  );
}
