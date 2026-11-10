import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";
import { JourneyTimeline } from "@/components/ui/JourneyTimeline";
import { CtaButton } from "@/components/ui/CtaButton";

export const Route = createFileRoute("/para-empresas")({
  head: () => ({
    meta: [
      { title: "Proteja o valor das suas missões internacionais." },
      {
        name: "description",
        content:
          "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.",
      },
      { property: "og:title", content: "Proteja o valor das suas missões internacionais." },
      {
        property: "og:description",
        content:
          "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.",
      },
      { property: "og:url", content: "https://moovia.global/para-empresas" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Proteja o valor das suas missões internacionais." },
      {
        name: "twitter:description",
        content:
          "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.",
      },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/para-empresas" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://moovia.global/" },
            { "@type": "ListItem", position: 2, name: "Para Empresas", item: "https://moovia.global/para-empresas" },
          ],
        }),
      },
    ],
  }),
  component: ParaEmpresasPage,
});

function ParaEmpresasPage() {
  return (
    <SiteLayout>
      <div className="bg-black text-white">
        {/* Seção 1: Hero */}
        <HeroSection />

        {/* Seção 2: Onde a MOOVIA acrescenta valor */}
        <OndeAcrescentaValorSection />

        {/* Seção Nova A: Ripple Effect */}
        <RippleEffectSection />

        {/* Seção 3: O que a sua empresa recebe */}
        <OQueRecebeSection />

        {/* Seção 4: Como funciona o programa (Três componentes centrais) */}
        <ComoFuncionaSection />

        {/* Seção Nova B: Tecnologia e responsabilidade */}
        <TecnologiaResponsabilidadeSection />

        {/* Seção Linha do tempo */}
        <LinhaDoTempoSection />

        {/* Seção 5: Final CTA */}
        <FinalCtaStrip
          title="Converse com a MOOVIA sobre o seu programa de mobilidade."
          subtitle="Em conjunto, identificamos as missões adequadas, definimos o âmbito do apoio e acordamos um programa de acompanhamento."
        />
      </div>
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 1: HERO (bg-black)
   ───────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Visual sutil: Quatrifólio dourado grande atrás do texto à direita, opacidade máx 8% */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[480px] md:w-[680px] lg:w-[820px] aspect-square opacity-[0.06] select-none"
      >
        <img
          src="/mooviagold.svg"
          alt=""
          className="w-full h-full object-contain animate-spin-slow"
          style={{ animationDuration: "120s" }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12 z-10">
        <div className="max-w-[760px] flex flex-col items-start">
          {/* Rótulo pequeno em maiúsculas, peru, alinhado à esquerda */}
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-6">
            PARA LÍDERES DE GLOBAL MOBILITY E RH
          </p>

          {/* H1 em Wright Pro, branco, clamp compartilhado */}
          <h1 className="font-display font-[300] text-white text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px] leading-[1.12] mb-6 max-w-[22ch]">
            Proteja o valor das suas missões internacionais.
          </h1>

          {/* Parágrafo de apoio em Wright Roman */}
          <p className="font-body text-[16px] md:text-[18px] text-white/80 font-[300] leading-[1.7] max-w-[56ch] mb-10">
            A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.
          </p>

          {/* Botão primário */}
          <div>
            <CtaButton to="/contacto" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 2: ONDE A MOOVIA ACRESCENTA VALOR (bg-black-2)
   ───────────────────────────────────────────────────────────── */
function OndeAcrescentaValorSection() {
  return (
    <section className="relative bg-black-2 py-20 lg:py-28 border-t border-b border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da seção */}
        <div className="max-w-[780px] mb-16">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            ONDE A MOOVIA ACRESCENTA VALOR
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6">
            Concentre-se nas missões que mais importam.
          </h2>
          <p className="font-body text-[15px] md:text-[17px] text-white/70 font-[300] leading-[1.7] max-w-[58ch]">
            A MOOVIA foi concebida para missões internacionais em que as dificuldades de adaptação podem ter consequências significativas para o negócio.
          </p>
        </div>

        {/* 3 Casos de uso */}
        <div className="mb-20">
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold/90 font-medium mb-8">
            TRÊS CASOS DE USO
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 01 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  01
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Líderes críticos para o negócio
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Missões em que uma perturbação pode afetar equipas, projetos e a continuidade do negócio.
              </p>
            </div>

            {/* Card 02 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  02
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Executivos e Famílias
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Mudanças internacionais em que a adaptação da família é essencial para a estabilidade da missão.
              </p>
            </div>

            {/* Card 03 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  03
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Especialistas Seniores
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Missões de longa duração ou culturalmente complexas que exigem apoio adicional.
              </p>
            </div>
          </div>
        </div>

        {/* Bloco inferior: Melhor visibilidade e valor do programa */}
        <div className="bg-black-3/70 rounded-2xl p-8 md:p-12 border border-white/[0.08]">
          <div className="max-w-[800px] mb-10">
            <h3 className="font-display font-[300] text-white text-2xl sm:text-3xl lg:text-[32px] leading-snug mb-4">
              Mais visibilidade. Ação mais cedo. Decisões mais informadas.
            </h3>
            <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-[1.7]">
              A MOOVIA ajuda as empresas a reconhecer os desafios de adaptação antes que se agravem e fornece informação estruturada para orientar as intervenções.
            </p>
          </div>

          <div>
            <p className="font-body text-xs md:text-sm uppercase tracking-wider text-gold font-medium mb-6">
              O valor do programa pode ser avaliado através de:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Progresso da adaptação ao longo do tempo.",
                "Riscos identificados e ações recomendadas.",
                "Resultados do acompanhamento e estabilidade da missão.",
                "Feedback das equipas de Global Mobility.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="font-body text-sm text-white/80 font-[300] leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO NOVA A: RIPPLE EFFECT (O efeito em cascata) (bg-black)
   ───────────────────────────────────────────────────────────── */
function RippleEffectSection() {
  const steps = [
    {
      num: "01",
      title: "Pessoa",
      desc: "Adaptação difícil",
      full: "Pessoa: Adaptação difícil",
      rings: 1,
    },
    {
      num: "02",
      title: "Equipa",
      desc: "Decisões mais lentas",
      full: "Equipa: Decisões mais lentas",
      rings: 2,
    },
    {
      num: "03",
      title: "Projeto",
      desc: "Atrasos na execução",
      full: "Projeto: Atrasos na execução",
      rings: 3,
    },
    {
      num: "04",
      title: "Negócio",
      desc: "Margens, clientes e continuidade em risco",
      full: "Negócio: Margens, clientes e continuidade em risco",
      rings: 4,
      isHighlighted: true,
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-28 border-b border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="max-w-[820px] mb-16">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            IMPACTO NO NEGÓCIO
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6">
            O efeito em cascata do desempenho oculto
          </h2>
          <p className="font-body text-[15px] md:text-[17px] text-white/70 font-[300] leading-[1.7] max-w-[64ch]">
            Quando um colaborador ou a sua família tem dificuldade em adaptar-se, a missão continua, mas o resultado pode deteriorar-se sem que ninguém o veja. O efeito não fica na pessoa.
          </p>
        </div>

        {/* Nós: Lista Ordenada Semântica */}
        {/* DESKTOP (>= 768px): Quatro nós em linha horizontal ligados por linhas finas em peru */}
        <div className="hidden md:block relative mb-14">
          {/* Linha fina conectora em peru */}
          <div
            aria-hidden="true"
            className="absolute top-[52px] left-[12%] right-[12%] h-[1px] bg-[#9B7A50]/40 -z-0"
          />

          <ol className="grid grid-cols-4 gap-6 relative z-10 list-none p-0 m-0">
            {steps.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Visual dos Anéis Concêntricos que crescem de nó para nó */}
                <div className="relative w-[104px] h-[104px] flex items-center justify-center">
                  {/* Anel 4 (só no 4º nó) */}
                  {step.rings >= 4 && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-[#9B7A50]/40"
                    />
                  )}
                  {/* Anel 3 (nos nós 3 e 4) */}
                  {step.rings >= 3 && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-[10px] rounded-full border border-[#9B7A50]/30"
                    />
                  )}
                  {/* Anel 2 (nos nós 2, 3 e 4) */}
                  {step.rings >= 2 && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-[20px] rounded-full border border-[#9B7A50]/35"
                    />
                  )}
                  {/* Anel 1 (em todos os nós) */}
                  {step.rings >= 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-[28px] rounded-full border border-[#9B7A50]/40"
                    />
                  )}
                  {/* Núcleo Central */}
                  <div
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      step.isHighlighted
                        ? "bg-[#9B7A50] text-black shadow-[0_0_15px_rgba(155,122,80,0.4)]"
                        : "bg-black-3 border border-[#9B7A50] text-[#9B7A50]"
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Textos do nó */}
                <div
                  className={`mt-4 p-4 rounded-xl w-full transition-colors ${
                    step.isHighlighted
                      ? "bg-black-3 border border-[#9B7A50]/50"
                      : "bg-black-3/50 border border-white/[0.06]"
                  }`}
                >
                  <p
                    className={`font-display text-lg lg:text-xl font-normal mb-1.5 ${
                      step.isHighlighted ? "text-[#9B7A50]" : "text-white"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="font-body text-xs lg:text-[13px] text-white/70 font-[300] leading-snug">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* MOBILE (< 768px): Coluna vertical com linha à esquerda */}
        <div className="md:hidden relative mb-12 pl-6 ml-2 border-l border-[#9B7A50]/40">
          <ol className="space-y-8 list-none p-0 m-0">
            {steps.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="relative"
              >
                {/* Marcador na linha */}
                <div
                  className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
                    step.isHighlighted
                      ? "bg-[#9B7A50] text-black shadow-[0_0_10px_rgba(155,122,80,0.5)]"
                      : "bg-black-3 border border-[#9B7A50] text-[#9B7A50]"
                  }`}
                >
                  <span className="font-mono text-[10px] font-semibold">
                    {step.num}
                  </span>
                </div>

                {/* Cartão do nó mobile */}
                <div
                  className={`p-4 rounded-xl ${
                    step.isHighlighted
                      ? "bg-black-3 border border-[#9B7A50]/50"
                      : "bg-black-3/60 border border-white/[0.06]"
                  }`}
                >
                  <p
                    className={`font-display text-base font-normal mb-1 ${
                      step.isHighlighted ? "text-[#9B7A50]" : "text-white"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="font-body text-xs text-white/70 font-[300] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Nota */}
        <p className="font-body text-xs text-white/50 italic mb-6 max-w-[64ch]">
          Esquema qualitativo. O impacto pode ultrapassar os custos diretos da mobilidade.
        </p>

        {/* Fecho */}
        <div className="p-6 rounded-xl bg-black-3/80 border border-gold/20 max-w-[840px]">
          <p className="font-body text-[15px] md:text-[16px] text-white/90 font-[300] leading-relaxed">
            A MOOVIA ajuda a identificar sinais cedo, para que a ação chegue antes de o efeito se espalhar.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 3: O QUE A SUA EMPRESA RECEBE (bg-black)
   ───────────────────────────────────────────────────────────── */
function OQueRecebeSection() {
  return (
    <section className="relative bg-black py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="max-w-[780px] mb-16">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            O QUE A SUA EMPRESA RECEBE
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6">
            Informação clara. Recomendações práticas.
          </h2>
          <p className="font-body text-[15px] md:text-[17px] text-white/70 font-[300] leading-[1.7] max-w-[58ch]">
            A MOOVIA presta apoio e informação distintos aos colaboradores e às equipas corporativas.
          </p>
        </div>

        {/* Dois cartões lado a lado */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Card 1: Colaboradores e Famílias */}
          <div className="bg-black-3 rounded-2xl p-8 lg:p-10 border border-gold/15 flex flex-col justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gold font-medium mb-4">
                PÚBLICO-ALVO
              </p>
              <h3 className="font-display font-[300] text-white text-2xl lg:text-3xl mb-8 leading-snug">
                COLABORADORES E FAMÍLIAS
              </h3>
              <ul className="space-y-4">
                {[
                  "Avaliações confidenciais e check-ins regulares.",
                  "Orientação personalizada e apoio à adaptação.",
                  "Acompanhamento ao longo da missão.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="font-body text-[15px] text-white/80 font-[300] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Equipas de Global Mobility e RH */}
          <div className="bg-black-3 rounded-2xl p-8 lg:p-10 border border-gold/15 flex flex-col justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gold font-medium mb-4">
                GESTÃO CORPORATIVA
              </p>
              <h3 className="font-display font-[300] text-white text-2xl lg:text-3xl mb-8 leading-snug">
                EQUIPAS DE GLOBAL MOBILITY E RH
              </h3>
              <ul className="space-y-4">
                {[
                  "Indicadores de prontidão e de adaptação.",
                  "Identificação de riscos emergentes e de prioridades.",
                  "Ações recomendadas e atualizações de progresso.",
                  "Visibilidade sobre as missões acompanhadas.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="font-body text-[15px] text-white/80 font-[300] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nota de privacidade */}
        <div className="p-6 rounded-xl bg-black-2/60 border border-white/[0.08] max-w-[900px]">
          <p className="font-body text-sm text-white/70 font-[300] leading-relaxed">
            <strong className="text-white font-medium">Privacidade:</strong> a informação pessoal e familiar permanece confidencial. As entidades empregadoras recebem apenas a informação necessária para gerir a missão.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 4: COMO FUNCIONA O PROGRAMA (bg-black-2)
   ───────────────────────────────────────────────────────────── */
function ComoFuncionaSection() {
  return (
    <section className="relative bg-black-2 py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="max-w-[820px] mb-16">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            COMO FUNCIONA O PROGRAMA
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6">
            Apoio estruturado ao longo de toda a missão.
          </h2>
          <p className="font-body text-[15px] md:text-[17px] text-white/70 font-[300] leading-[1.7] max-w-[62ch]">
            A MOOVIA combina a experiência humana, análise assistida por inteligência artificial e relatórios práticos para identificar riscos de adaptação e apoiar intervenções atempadas.
          </p>
        </div>

        {/* Três componentes centrais */}
        <div className="mb-24">
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold/90 font-medium mb-8">
            TRÊS COMPONENTES CENTRAIS
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Componente 01 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  01
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Experiência do Colaborador e da Família
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Avaliações estruturadas, check-ins regulares e apoio personalizado ao longo da missão.
              </p>
            </div>

            {/* Componente 02 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  02
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Inteligência de Mobilidade baseada em inteligência artificial
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Liga sinais humanos e contextuais para identificar riscos emergentes, com revisão e recomendações de especialistas.
              </p>
            </div>

            {/* Componente 03 */}
            <div className="bg-black-3 rounded-2xl p-8 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-6 block">
                  03
                </span>
                <h3 className="font-display font-[300] text-white text-xl lg:text-2xl mb-4 leading-snug">
                  Painéis de Global Mobility
                </h3>
              </div>
              <p className="font-body text-sm lg:text-[15px] text-white/70 font-[300] leading-relaxed">
                Orientação individual confidencial e informação ao nível da gestão para ajudar as empresas a acompanhar as missões e a priorizar a ação.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO NOVA B: TECNOLOGIA E RESPONSABILIDADE (bg-black)
   ───────────────────────────────────────────────────────────── */
function TecnologiaResponsabilidadeSection() {
  const cards = [
    {
      title: "A tecnologia interpreta",
      text: "Lê a informação e apresenta-a com clareza.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gold">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "As regras calculam",
      text: "Regras versionadas dão o mesmo resultado para a mesma informação.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gold">
          <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Rastreável",
      text: "Cada recomendação aponta para a sua evidência e regra.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gold">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Os especialistas decidem",
      text: "Os especialistas validam cada intervenção com impacto humano.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gold">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-28 border-t border-b border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="max-w-[820px] mb-16">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            TECNOLOGIA E RESPONSABILIDADE
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6">
            Tecnologia que apoia decisões, sem as substituir
          </h2>
        </div>

        {/* 4 Cartões em grelha */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-black-3 rounded-2xl p-6 border border-gold/15 flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-black-2 flex items-center justify-center border border-gold/20 mb-4 shrink-0">
                {c.icon}
              </div>
              <h3 className="font-display font-[300] text-white text-lg lg:text-xl mb-2.5 leading-snug">
                {c.title}
              </h3>
              <p className="font-body text-xs lg:text-[13.5px] text-white/70 font-[300] leading-relaxed">
                {c.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Linha de privacidade */}
        <div className="p-6 rounded-xl bg-black-2/60 border border-white/[0.08] max-w-[960px] mb-4">
          <p className="font-body text-sm md:text-[15px] text-white/80 font-[300] leading-relaxed">
            Concebido para a privacidade desde a origem: apenas a informação necessária, acesso limitado e nenhuma decisão automatizada sobre emprego com base num resultado.
          </p>
        </div>

        {/* Nota de estágio */}
        <p className="font-body text-xs text-white/50 italic max-w-[820px]">
          Algumas capacidades assistidas por inteligência artificial estão em desenvolvimento e em validação, com revisão especializada.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO: A NOSSA LINHA DO TEMPO (bg-black-2)
   ───────────────────────────────────────────────────────────── */
function LinhaDoTempoSection() {
  return (
    <section className="relative bg-black-2 py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h3 className="font-display font-[300] text-white text-2xl sm:text-3xl mb-3">
            A nossa linha do tempo
          </h3>
          <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed max-w-[62ch]">
            Cada medição é comparada com a anterior, tornando visível a evolução ao longo do tempo.
          </p>
        </div>

        <JourneyTimeline />
      </div>
    </section>
  );
}

