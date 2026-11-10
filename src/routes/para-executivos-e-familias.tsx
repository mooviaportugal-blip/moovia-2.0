import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";
import { JourneyTimeline } from "@/components/ui/JourneyTimeline";
import { CtaButton } from "@/components/ui/CtaButton";

export const Route = createFileRoute("/para-executivos-e-familias")({
  head: () => ({
    meta: [
      { title: "Um novo país. Um novo capítulo. Apoio ao longo do caminho." },
      {
        name: "description",
        content:
          "Uma mudança internacional traz oportunidades profissionais e transformações pessoais. A MOOVIA ajuda-o a si e à sua família a preparar, adaptar e encontrar apoio prático ao longo de toda a transição.",
      },
      { property: "og:title", content: "Um novo país. Um novo capítulo. Apoio ao longo do caminho." },
      {
        property: "og:description",
        content:
          "Uma mudança internacional traz oportunidades profissionais e transformações pessoais. A MOOVIA ajuda-o a si e à sua família a preparar, adaptar e encontrar apoio prático ao longo de toda a transição.",
      },
      { property: "og:url", content: "https://moovia.global/para-executivos-e-familias" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Um novo país. Um novo capítulo. Apoio ao longo do caminho." },
      {
        name: "twitter:description",
        content:
          "Uma mudança internacional traz oportunidades profissionais e transformações pessoais. A MOOVIA ajuda-o a si e à sua família a preparar, adaptar e encontrar apoio prático ao longo de toda a transição.",
      },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/para-executivos-e-familias" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://moovia.global/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Para Executivos e Famílias",
              item: "https://moovia.global/para-executivos-e-familias",
            },
          ],
        }),
      },
    ],
  }),
  component: ParaExecutivosPage,
});

function ParaExecutivosPage() {
  return (
    <SiteLayout>
      <div className="bg-black text-white">
        {/* Seção 1: Hero */}
        <HeroSection />

        {/* Seção 2: O que a MOOVIA faz por si */}
        <WhatMooviaDoesSection />

        {/* Linha curta de privacidade antes da chamada final */}
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-8 border-t border-white/[0.08]">
          <p className="font-body text-sm md:text-[15px] text-white/70 font-[300] leading-relaxed text-center">
            Concebido a pensar na sua privacidade: apenas a informação necessária para o apoiar, com acesso limitado.
          </p>
        </div>

        {/* Seção 3: CTA final */}
        <FinalCtaStrip
          title="Dúvidas sobre o seu apoio à mobilidade?"
          buttonText="Falar com a MOOVIA"
          buttonTo="/contacto"
        >
          <p className="font-body text-[15px] md:text-[17px] text-white/80 font-[300] leading-relaxed">
            Se a sua entidade empregadora o apresentou à MOOVIA, podemos explicar o processo, o próximo check-in e como aceder ao seu apoio.
          </p>
          <p className="font-body text-[15px] md:text-[17px] text-white/80 font-[300] leading-relaxed">
            Se está a preparar uma mudança internacional ou já vive no estrangeiro, teremos todo o gosto em explicar como a MOOVIA o pode apoiar a si e à sua família.
          </p>
        </FinalCtaStrip>
      </div>
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 1: HERO (bg-black)
   Espaço no topo calibrado para altura do menu + >48px
   ───────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pt-[144px] pb-16 md:pt-[168px] lg:pt-[180px] lg:pb-24">
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Lado esquerdo: Textos do Hero */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Rótulo pequeno em maiúsculas, peru, alinhado à esquerda */}
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-6">
              PARA EXECUTIVOS E FAMÍLIAS
            </p>

            {/* H1 em Wright Pro, branco, em 3 linhas no desktop (uma por frase) */}
            <h1 className="font-display font-[300] text-white text-[32px] sm:text-[40px] md:text-[50px] lg:text-[54px] xl:text-[58px] leading-[1.12] mb-6">
              <span className="block">Um novo país.</span>
              <span className="block">Um novo capítulo.</span>
              <span className="block">Apoio ao longo do caminho.</span>
            </h1>

            {/* Parágrafo de apoio em Wright Roman */}
            <p className="font-body text-[16px] md:text-[18px] text-white/80 font-[300] leading-[1.7] max-w-[56ch] mb-10">
              Uma mudança internacional traz oportunidades profissionais e mudança pessoal. A MOOVIA ajuda-o a si e à sua família a preparar-se, a adaptar-se e a encontrar apoio prático ao longo da transição.
            </p>

            {/* Botão primário padronizado com Home, Nav e CTAs */}
            <div>
              <CtaButton to="/contacto">
                Falar com a MOOVIA
              </CtaButton>
            </div>
          </div>

          {/* Lado direito: Visual dos três círculos sobrepostos com movimento, etiquetas e profundidade */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-8 lg:mt-0">
            <div className="w-[85%] sm:w-[80%] lg:w-full flex items-center justify-center">
              <ExecutiveCirclesVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL DOS TRÊS CÍRCULOS (Direita do Hero)
   - Contornos finos em peru (0.75-1px, opacidades 35%-70%)
   - Preenchimento suave em peru (6%-8% nas interseções)
   - Linha fina ligando os centros
   - Pontos luminosos com pulso suave
   - Movimento lento (flutuação ±8px e rotação em ~120s, só transform)
   - Respeita prefers-reduced-motion e pausa fora de tela
   - 3 etiquetas estilo hero da Home: Você, A sua família, Apoio
   - Brilho radial suave em peru (máx 6%)
   ───────────────────────────────────────────────────────────── */
function ExecutiveCirclesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] lg:max-w-[520px] aspect-square flex items-center justify-center select-none"
    >
      <style>{`
        @keyframes execRotateCluster {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes execFloat1 {
          0%, 100% { transform: translateY(-7px); }
          50% { transform: translateY(7px); }
        }
        @keyframes execFloat2 {
          0%, 100% { transform: translate(-6px, 6px); }
          50% { transform: translate(6px, -6px); }
        }
        @keyframes execFloat3 {
          0%, 100% { transform: translate(6px, -4px); }
          50% { transform: translate(-6px, 4px); }
        }
        @keyframes execGlowPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.95; transform: scale(1.35); }
        }

        .exec-anim-cluster {
          animation: execRotateCluster 120s linear infinite;
        }
        .exec-anim-c1 {
          animation: execFloat1 13s ease-in-out infinite;
        }
        .exec-anim-c2 {
          animation: execFloat2 17s ease-in-out infinite;
        }
        .exec-anim-c3 {
          animation: execFloat3 11s ease-in-out infinite;
        }
        .exec-anim-pulse {
          animation: execGlowPulse 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .exec-anim-cluster,
          .exec-anim-c1,
          .exec-anim-c2,
          .exec-anim-c3,
          .exec-anim-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Brilho radial muito sutil em peru (máx 6%) atrás do conjunto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(155, 122, 80, 0.06) 0%, rgba(155, 122, 80, 0.02) 45%, rgba(6, 9, 26, 0) 70%)",
        }}
      />

      {/* SVG Cluster com os círculos */}
      <div
        className="relative w-full h-full flex items-center justify-center exec-anim-cluster pointer-events-none"
        style={{
          animationPlayState: isVisible ? "running" : "paused",
          willChange: "transform",
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 520 520"
          className="w-full h-full pointer-events-none"
          fill="none"
        >
          {/* Linha fina ligando os centros dos círculos */}
          <polygon
            points="215,220 335,190 295,335"
            stroke="#9B7A50"
            strokeWidth="0.75"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Centros sutis */}
          <circle cx="215" cy="220" r="2" fill="#9B7A50" fillOpacity="0.5" />
          <circle cx="335" cy="190" r="2" fill="#9B7A50" fillOpacity="0.5" />
          <circle cx="295" cy="335" r="2" fill="#9B7A50" fillOpacity="0.5" />

          {/* Círculo 1 ("Você") */}
          <g
            className="exec-anim-c1"
            style={{
              animationPlayState: isVisible ? "running" : "paused",
              willChange: "transform",
            }}
          >
            {/* Preenchimento suave 4% (soma 8% nas interseções com outros círculos) */}
            <circle
              cx="215"
              cy="220"
              r="140"
              fill="#9B7A50"
              fillOpacity="0.04"
              stroke="#9B7A50"
              strokeWidth="0.85"
              strokeOpacity="0.70"
            />
            {/* Ponto luminoso pulsante sobre o contorno do círculo 1 */}
            <g transform="translate(105, 140)">
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="#9B7A50"
                className="exec-anim-pulse"
                style={{ animationDelay: "0s" }}
              />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
            </g>
          </g>

          {/* Círculo 2 ("A sua família") */}
          <g
            className="exec-anim-c2"
            style={{
              animationPlayState: isVisible ? "running" : "paused",
              willChange: "transform",
            }}
          >
            <circle
              cx="335"
              cy="190"
              r="125"
              fill="#9B7A50"
              fillOpacity="0.04"
              stroke="#9B7A50"
              strokeWidth="0.85"
              strokeOpacity="0.52"
            />
            {/* Ponto luminoso pulsante sobre o contorno do círculo 2 */}
            <g transform="translate(425, 120)">
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="#9B7A50"
                className="exec-anim-pulse"
                style={{ animationDelay: "1.5s" }}
              />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
            </g>
          </g>

          {/* Círculo 3 ("Apoio") */}
          <g
            className="exec-anim-c3"
            style={{
              animationPlayState: isVisible ? "running" : "paused",
              willChange: "transform",
            }}
          >
            <circle
              cx="295"
              cy="335"
              r="115"
              fill="#9B7A50"
              fillOpacity="0.04"
              stroke="#9B7A50"
              strokeWidth="0.85"
              strokeOpacity="0.38"
            />
            {/* Ponto luminoso pulsante sobre o contorno do círculo 3 */}
            <g transform="translate(365, 415)">
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="#9B7A50"
                className="exec-anim-pulse"
                style={{ animationDelay: "2.8s" }}
              />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
            </g>
          </g>

          {/* Área de interseção central realçada com brilho sutil */}
          <circle
            cx="280"
            cy="245"
            r="42"
            fill="#9B7A50"
            fillOpacity="0.03"
          />
        </svg>
      </div>

      {/* Três etiquetas pequenas estilo Home Hero, coladas a cada círculo a 16-24px */}
      {/* 1. Etiqueta "Você" (ligada ao círculo 1) */}
      <div
        className="absolute top-[16%] left-[-4%] sm:left-[-6%] lg:left-[-8%] flex items-center z-20 pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-[#06091a]/85 flex items-center gap-1.5 backdrop-blur-[2px] shadow-sm shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50]" />
          <span className="text-[12px] font-body font-[400] text-white tracking-wide whitespace-nowrap">
            Você
          </span>
        </div>
        <div className="w-[18px] sm:w-[24px] h-[0.75px] bg-[#9B7A50]/40 shrink-0" />
      </div>

      {/* 2. Etiqueta "A sua família" (ligada ao círculo 2) */}
      <div
        className="absolute top-[8%] right-[-2%] sm:right-[-4%] lg:right-[-6%] flex items-center z-20 pointer-events-none"
      >
        <div className="w-[18px] sm:w-[24px] h-[0.75px] bg-[#9B7A50]/40 shrink-0" />
        <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-[#06091a]/85 flex items-center gap-1.5 backdrop-blur-[2px] shadow-sm shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50]" />
          <span className="text-[12px] font-body font-[400] text-white tracking-wide whitespace-nowrap">
            A sua família
          </span>
        </div>
      </div>

      {/* 3. Etiqueta "Apoio" (ligada ao círculo 3) */}
      <div
        className="absolute bottom-[6%] right-[8%] sm:right-[12%] flex items-center z-20 pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-[#06091a]/85 flex items-center gap-1.5 backdrop-blur-[2px] shadow-sm shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50]" />
          <span className="text-[12px] font-body font-[400] text-white tracking-wide whitespace-nowrap">
            Apoio
          </span>
        </div>
        <div className="w-[18px] sm:w-[24px] h-[0.75px] bg-[#9B7A50]/40 shrink-0" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEÇÃO 2: O QUE A MOOVIA FAZ POR SI (bg-black-2)
   ───────────────────────────────────────────────────────────── */
function WhatMooviaDoesSection() {
  const deliverables = [
    {
      number: "01",
      text: "Uma avaliação individual e feedback pessoal.",
    },
    {
      number: "02",
      text: "Um plano prático de adaptação e integração.",
    },
    {
      number: "03",
      text: "Recomendações e acompanhamento planeado.",
    },
    {
      number: "04",
      text: "Acesso a assistência especializada adicional quando faz parte do programa acordado.",
    },
  ];

  return (
    <section className="relative bg-black-2 py-20 lg:py-28 border-t border-b border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da seção */}
        <div className="max-w-[820px] mb-12">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
            O QUE A MOOVIA FAZ POR SI
          </p>
          <h2 className="font-display font-[300] text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.2] mb-6 max-w-[34ch]">
            Orientação pessoal para as partes da mudança que não constam de uma lista de verificação.
          </h2>
          <p className="font-body text-[15px] md:text-[17px] text-white/70 font-[300] leading-[1.7] max-w-[62ch]">
            A par da mudança prática, há questões sobre expectativas, rotinas familiares, trabalho, cultura, pertença e vida quotidiana. Criamos espaço para falar destes temas e identificar que apoio pode ser útil.
          </p>
        </div>

        {/* Três benefícios (lista com marcador em peru) */}
        <div className="mb-20 max-w-[860px]">
          <ul className="space-y-4">
            {[
              "Uma oportunidade para partilhar expectativas e preocupações antes ou logo depois da mudança.",
              "Conversas regulares e estruturadas à medida que a nova rotina se forma.",
              "Recomendações personalizadas e orientação especializada quando apropriado.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0 shadow-sm shadow-gold/30" />
                <span className="font-body text-[15px] md:text-[17px] text-white/85 font-[300] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtítulo: O que lhe entregamos + 4 cartões 01 a 04 */}
        <div className="mb-24">
          <h3 className="font-display font-[300] text-white text-2xl sm:text-3xl mb-8">
            O que lhe entregamos:
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item) => (
              <div
                key={item.number}
                className="bg-black-3 rounded-2xl p-7 border border-gold/15 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <span className="font-display font-light text-2xl lg:text-3xl text-gold mb-5 block">
                    {item.number}
                  </span>
                  <p className="font-body text-sm lg:text-[15px] text-white/80 font-[300] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtítulo: O seu percurso + JourneyTimeline */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="mb-12">
            <h3 className="font-display font-[300] text-white text-2xl sm:text-3xl mb-3">
              O seu percurso
            </h3>
            <p className="font-body text-[15px] md:text-[16px] text-white/70 font-[300] leading-relaxed max-w-[62ch]">
              Cada medição é comparada com a anterior, tornando visível a evolução ao longo do tempo.
            </p>
          </div>

          <JourneyTimeline />
        </div>
      </div>
    </section>
  );
}
