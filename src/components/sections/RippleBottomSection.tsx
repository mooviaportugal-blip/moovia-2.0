import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";
import "@/i18n";
import { User, Users, UsersRound, BarChart3, Target } from "lucide-react";
import logoNavAsset from "@/assets/logo-nav-v8.png.asset.json";

export function RippleBottomSection() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const locale = (i18n.language || "pt").split("-")[0];

  // Decomposição do título em duas frases para colorir a segunda em peru (#9B7A50)
  const fullTitle = t("rippleBottom.title");
  const titleParts = fullTitle.split(". ");
  const firstSentence = titleParts[0] ? `${titleParts[0]}.` : fullTitle;
  const secondSentence = titleParts.slice(1).join(". ");

  const zone2Items = (t("rippleBottom.zone2_items", { returnObjects: true }) as string[]) || [];
  const zone3Items = (t("rippleBottom.zone3_items", { returnObjects: true }) as string[]) || [];
  const zone4Items = (t("rippleBottom.zone4_items", { returnObjects: true }) as string[]) || [];
  const zone5Items = (t("rippleBottom.zone5_items", { returnObjects: true }) as string[]) || [];

  return (
    <section
      id="ripple-effect-bottom"
      className="section-spacing bg-black px-6 lg:px-12 xl:px-20 border-b border-b18 relative overflow-hidden"
    >
      {/* Estilos para animações de pulso, nós e escala tipográfica com container queries (cqw) */}
      <style>{`
        .ripple-cq-container {
          container-type: inline-size;
        }
        .ripple-item-text {
          font-family: var(--font-body, "Space Grotesk", sans-serif);
          font-size: clamp(11px, 0.95cqw, 13.5px);
          line-height: 1.35;
        }
        .ripple-title-text {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: clamp(13px, 1.25cqw, 17px);
          font-weight: 600;
          line-height: 1.25;
        }
        .ripple-legend-text {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: clamp(12px, 1.15cqw, 15px);
          font-weight: 600;
          line-height: 1.25;
        }

        /* Em tablet (820 a 1024px), letra fixada nos mínimos dos clamps */
        @media (min-width: 820px) and (max-width: 1024px) {
          .ripple-item-text {
            font-size: 11px !important;
          }
          .ripple-title-text {
            font-size: 13px !important;
          }
          .ripple-legend-text {
            font-size: 12px !important;
          }
        }

        /* Animação: Pulso expansivo na origem (7s, em loop) */
        @keyframes rippleExpand {
          0% {
            r: 8px;
            opacity: 0.85;
            stroke-width: 2.2px;
          }
          40% {
            opacity: 0.5;
            stroke-width: 1.8px;
          }
          75% {
            opacity: 0.2;
            stroke-width: 1.2px;
          }
          100% {
            r: 1080px;
            opacity: 0;
            stroke-width: 0.6px;
          }
        }

        /* Animação: Nós a acender em sequência acompanhando o avanço da onda */
        @keyframes nodeLightUp {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(155, 122, 80, 0.35));
            transform: scale(1);
            stroke-opacity: 0.7;
          }
          8% {
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.95)) drop-shadow(0 0 18px rgba(212, 175, 55, 0.65));
            transform: scale(1.08);
            stroke-opacity: 1;
          }
          22% {
            filter: drop-shadow(0 0 4px rgba(155, 122, 80, 0.5));
            transform: scale(1);
            stroke-opacity: 0.8;
          }
        }

        .ripple-pulse-circle {
          animation: rippleExpand 7s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
        }

        .ripple-node-1 {
          animation: nodeLightUp 7s ease-out infinite;
          animation-delay: 0s;
          transform-origin: 70px 120px;
        }
        .ripple-node-2 {
          animation: nodeLightUp 7s ease-out infinite;
          animation-delay: 1.65s;
          transform-origin: 307.5px 120px;
        }
        .ripple-node-3 {
          animation: nodeLightUp 7s ease-out infinite;
          animation-delay: 3.44s;
          transform-origin: 562.5px 120px;
        }
        .ripple-node-4 {
          animation: nodeLightUp 7s ease-out infinite;
          animation-delay: 5.22s;
          transform-origin: 817.5px 120px;
        }
        .ripple-node-5 {
          animation: nodeLightUp 7s ease-out infinite;
          animation-delay: 6.8s;
          transform-origin: 1072.5px 120px;
        }

        /* Respeito estrito a prefers-reduced-motion: tudo parado, nós a 100% */
        @media (prefers-reduced-motion: reduce) {
          .ripple-pulse-circle {
            animation: none !important;
            display: none !important;
          }
          .ripple-node-1,
          .ripple-node-2,
          .ripple-node-3,
          .ripple-node-4,
          .ripple-node-5 {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Brilho radial de fundo suave em peru */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(155, 122, 80, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1200px] relative z-10">
        {/* Cabeçalho da secção */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <p className="typo-eyebrow text-[#9B7A50] mb-2.5 tracking-[0.25em]">
            {t("rippleBottom.eyebrow")}
          </p>
          <h2 className="typo-h2 text-white max-w-3xl leading-tight">
            <span>{firstSentence} </span>
            {secondSentence && (
              <span className="text-[#9B7A50]">{secondSentence}</span>
            )}
          </h2>
        </div>

        {/* 1. VISUAL DESKTOP & TABLET (>= 820px): SVG de ondas com nós na camada superior + Grelha de 5 colunas por baixo */}
        <div className="hidden min-[820px]:block w-full ripple-cq-container select-none">
          {/* Camada 1: SVG (viewBox 0 0 1200 240, largura 100%) */}
          <div className="relative w-full aspect-[1200/240] overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 240"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Máscara vertical a desvanecer em cima e em baixo para não haver recorte retangular */}
                <linearGradient id="rippleVertFadeGrad" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="black" />
                  <stop offset="16%" stopColor="white" />
                  <stop offset="84%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </linearGradient>
                <mask id="verticalFadeMask">
                  <rect x="0" y="0" width="1200" height="240" fill="url(#rippleVertFadeGrad)" />
                </mask>

                {/* Lavagem radial dourada que se desvanece a partir da origem (70, 120) */}
                <radialGradient id="originRadialWash" cx="70" cy="120" r="750" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.22" />
                  <stop offset="22%" stopColor="#9B7A50" stopOpacity="0.10" />
                  <stop offset="55%" stopColor="#06091a" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#06091a" stopOpacity="0" />
                </radialGradient>

                {/* Eixo horizontal com gradiente */}
                <linearGradient id="axisGrad" x1="70" y1="120" x2="1180" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#9B7A50" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#9B7A50" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9B7A50" stopOpacity="0.05" />
                </linearGradient>

                {/* Filtro de brilho suave para os nós */}
                <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="pulseGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Fundo com lavagem radial mascarada verticalmente */}
              <rect x="0" y="0" width="1200" height="240" fill="url(#originRadialWash)" mask="url(#verticalFadeMask)" />

              {/* Cinco frentes de onda circulares centradas na origem (70,120) que passam por cada nó */}
              <g mask="url(#verticalFadeMask)">
                {/* Onda 1 (origem): r = 90 */}
                <circle cx="70" cy="120" r="90" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.45" />
                {/* Onda 2 (passa no nó 2 em 307.5): r = 237.5 */}
                <circle cx="70" cy="120" r="237.5" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.4" />
                {/* Onda 3 (passa no nó 3 em 562.5): r = 492.5 */}
                <circle cx="70" cy="120" r="492.5" fill="none" stroke="#D4AF37" strokeWidth="1.1" strokeOpacity="0.32" />
                {/* Onda 4 (passa no nó 4 em 817.5): r = 747.5 */}
                <circle cx="70" cy="120" r="747.5" fill="none" stroke="#D4AF37" strokeWidth="1.0" strokeOpacity="0.25" />
                {/* Onda 5 (passa no nó 5 em 1072.5): r = 1002.5 */}
                <circle cx="70" cy="120" r="1002.5" fill="none" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.18" />

                {/* Pulso expansivo na origem (7s, em loop) */}
                {!shouldReduceMotion && (
                  <circle
                    className="ripple-pulse-circle"
                    cx="70"
                    cy="120"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    filter="url(#pulseGlow)"
                  />
                )}
              </g>

              {/* Eixo horizontal com gradiente */}
              <line x1="30" y1="120" x2="1170" y2="120" stroke="url(#axisGrad)" strokeWidth="1.2" />

              {/* Nó 1: Origem (70, 120) - círculo com brilho e ícone de pessoa */}
              <g className="ripple-node-1">
                <circle cx="70" cy="120" r="26" fill="#06091a" stroke="#D4AF37" strokeWidth="2.2" filter="url(#nodeGlow)" />
                <circle cx="70" cy="120" r="21" fill="#0b1426" stroke="#9B7A50" strokeWidth="0.8" strokeOpacity="0.6" />
                <foreignObject x="56" y="106" width="28" height="28">
                  <div className="w-full h-full flex items-center justify-center text-[#D4AF37]">
                    <User size={18} strokeWidth={2} />
                  </div>
                </foreignObject>
              </g>

              {/* Nó 2: Família (307.5, 120) */}
              <g className="ripple-node-2">
                <circle cx="307.5" cy="120" r="22" fill="#06091a" stroke="#9B7A50" strokeWidth="1.8" filter="url(#nodeGlow)" />
                <circle cx="307.5" cy="120" r="18" fill="#0b1426" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
                <foreignObject x="294.5" y="107" width="26" height="26">
                  <div className="w-full h-full flex items-center justify-center text-[#9B7A50]">
                    <Users size={16} strokeWidth={1.8} />
                  </div>
                </foreignObject>
              </g>

              {/* Nó 3: Equipa (562.5, 120) */}
              <g className="ripple-node-3">
                <circle cx="562.5" cy="120" r="22" fill="#06091a" stroke="#9B7A50" strokeWidth="1.8" filter="url(#nodeGlow)" />
                <circle cx="562.5" cy="120" r="18" fill="#0b1426" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
                <foreignObject x="549.5" y="107" width="26" height="26">
                  <div className="w-full h-full flex items-center justify-center text-[#9B7A50]">
                    <UsersRound size={16} strokeWidth={1.8} />
                  </div>
                </foreignObject>
              </g>

              {/* Nó 4: Negócio (817.5, 120) */}
              <g className="ripple-node-4">
                <circle cx="817.5" cy="120" r="22" fill="#06091a" stroke="#9B7A50" strokeWidth="1.8" filter="url(#nodeGlow)" />
                <circle cx="817.5" cy="120" r="18" fill="#0b1426" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
                <foreignObject x="804.5" y="107" width="26" height="26">
                  <div className="w-full h-full flex items-center justify-center text-[#9B7A50]">
                    <BarChart3 size={16} strokeWidth={1.8} />
                  </div>
                </foreignObject>
              </g>

              {/* Nó 5: Longo Prazo (1072.5, 120) */}
              <g className="ripple-node-5">
                <circle cx="1072.5" cy="120" r="22" fill="#06091a" stroke="#9B7A50" strokeWidth="1.8" filter="url(#nodeGlow)" />
                <circle cx="1072.5" cy="120" r="18" fill="#0b1426" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
                <foreignObject x="1059.5" y="107" width="26" height="26">
                  <div className="w-full h-full flex items-center justify-center text-[#9B7A50]">
                    <Target size={16} strokeWidth={1.8} />
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>

          {/* Camada 2: Grelha de 5 colunas (15%, 21,25% x4) por baixo do SVG, com fios de topo e traço dourado */}
          <div className="w-full flex flex-row items-start pt-4 border-t border-[#9B7A50]/20">
            {/* Coluna 1: 15% (Origem - International Assignment) */}
            <div className="w-[15%] pr-3 flex flex-col items-center text-center">
              <div className="w-5 h-[2px] bg-[#D4AF37] mb-2.5 rounded-full" />
              <span className="ripple-legend-text text-white tracking-wider uppercase">
                {locale === "en" ? (
                  <>
                    International<br />Assignment
                  </>
                ) : locale === "es" ? (
                  <>
                    Misión<br />internacional
                  </>
                ) : (
                  <>
                    Missão<br />internacional
                  </>
                )}
              </span>
            </div>

            {/* Coluna 2: 21.25% (Impacto familiar) */}
            <div className="w-[21.25%] px-3 flex flex-col items-start text-left border-l border-white/5">
              <div className="w-6 h-[2px] bg-[#D4AF37] mb-2 rounded-full" />
              <h3 className="ripple-title-text text-white mb-2.5">
                {t("rippleBottom.zone2_title")}
              </h3>
              <ul className="w-full space-y-2">
                {zone2Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 ripple-item-text text-white/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: 21.25% (Impacto na equipa) */}
            <div className="w-[21.25%] px-3 flex flex-col items-start text-left border-l border-white/5">
              <div className="w-6 h-[2px] bg-[#D4AF37] mb-2 rounded-full" />
              <h3 className="ripple-title-text text-white mb-2.5">
                {t("rippleBottom.zone3_title")}
              </h3>
              <ul className="w-full space-y-2">
                {zone3Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 ripple-item-text text-white/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4: 21.25% (Impacto no negócio) */}
            <div className="w-[21.25%] px-3 flex flex-col items-start text-left border-l border-white/5">
              <div className="w-6 h-[2px] bg-[#D4AF37] mb-2 rounded-full" />
              <h3 className="ripple-title-text text-white mb-2.5">
                {t("rippleBottom.zone4_title")}
              </h3>
              <ul className="w-full space-y-2">
                {zone4Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 ripple-item-text text-white/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 5: 21.25% (Consequências a longo prazo) */}
            <div className="w-[21.25%] pl-3 flex flex-col items-start text-left border-l border-white/5">
              <div className="w-6 h-[2px] bg-[#D4AF37] mb-2 rounded-full" />
              <h3 className="ripple-title-text text-white mb-2.5">
                {t("rippleBottom.zone5_title")}
              </h3>
              <ul className="w-full space-y-2">
                {zone5Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 ripple-item-text text-white/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. VISUAL TABLET & MOBILE (< 820px): Lista vertical com linha dourada à esquerda e nó por etapa */}
        <div className="min-[820px]:hidden flex flex-col w-full select-none pl-1 relative">
          {/* Linha dourada contínua à esquerda que interliga todos os nós */}
          <div
            className="absolute left-[23px] top-6 bottom-10 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#9B7A50] to-[#9B7A50]/20"
            aria-hidden="true"
          />

          {/* Etapa 1: Origem (Missão internacional) */}
          <div className="relative flex items-center gap-4 mb-7">
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#06091a] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.45)]">
              <User size={16} strokeWidth={2} className="text-[#D4AF37]" />
            </div>
            <div className="pt-0.5">
              <span className="font-urbanist font-semibold text-white tracking-widest uppercase text-[12.5px]">
                {t("rippleBottom.zone1_title")}
              </span>
            </div>
          </div>

          {/* Etapa 2: Impacto familiar */}
          <div className="relative flex items-start gap-4 mb-7">
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#06091a] border-2 border-[#9B7A50] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(155,122,80,0.3)]">
              <Users size={15} strokeWidth={1.8} className="text-[#9B7A50]" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="w-5 h-[2px] bg-[#D4AF37] mb-1.5 rounded-full" />
              <h3 className="font-urbanist font-semibold text-white text-[15px] mb-2">
                {t("rippleBottom.zone2_title")}
              </h3>
              <ul className="space-y-1.5">
                {zone2Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Etapa 3: Impacto na equipa */}
          <div className="relative flex items-start gap-4 mb-7">
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#06091a] border-2 border-[#9B7A50] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(155,122,80,0.3)]">
              <UsersRound size={15} strokeWidth={1.8} className="text-[#9B7A50]" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="w-5 h-[2px] bg-[#D4AF37] mb-1.5 rounded-full" />
              <h3 className="font-urbanist font-semibold text-white text-[15px] mb-2">
                {t("rippleBottom.zone3_title")}
              </h3>
              <ul className="space-y-1.5">
                {zone3Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Etapa 4: Impacto no negócio */}
          <div className="relative flex items-start gap-4 mb-7">
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#06091a] border-2 border-[#9B7A50] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(155,122,80,0.3)]">
              <BarChart3 size={15} strokeWidth={1.8} className="text-[#9B7A50]" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="w-5 h-[2px] bg-[#D4AF37] mb-1.5 rounded-full" />
              <h3 className="font-urbanist font-semibold text-white text-[15px] mb-2">
                {t("rippleBottom.zone4_title")}
              </h3>
              <ul className="space-y-1.5">
                {zone4Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Etapa 5: Consequências a longo prazo */}
          <div className="relative flex items-start gap-4 mb-2">
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#06091a] border-2 border-[#9B7A50] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(155,122,80,0.3)]">
              <Target size={15} strokeWidth={1.8} className="text-[#9B7A50]" />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="w-5 h-[2px] bg-[#D4AF37] mb-1.5 rounded-full" />
              <h3 className="font-urbanist font-semibold text-white text-[15px] mb-2">
                {t("rippleBottom.zone5_title")}
              </h3>
              <ul className="space-y-1.5">
                {zone5Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. NARRATIVA POR BAIXO DO VISUAL: Parágrafos, Frase em Destaque e Barra de Fecho */}
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto opacity-100 print:opacity-100 relative z-10">
          {/* Caixa de Parágrafos e Destaque */}
          <div className="border border-b18 bg-w05/40 p-6 md:p-8 rounded-sm">
            <div className="space-y-3 font-urbanist text-[15px] md:text-[16px] text-white/85 leading-relaxed">
              <p>{t("rippleBottom.narrative_p1")}</p>
              <p>{t("rippleBottom.narrative_p2")}</p>
              <p>{t("rippleBottom.narrative_p3")}</p>
              <p>{t("rippleBottom.narrative_p4")}</p>
              <p>{t("rippleBottom.narrative_p5")}</p>
            </div>

            {/* Frase em destaque */}
            <div className="mt-5 py-3.5 px-4 md:px-5 border-l-2 border-[#9B7A50] bg-[#9B7A50]/10 rounded-r-sm">
              <p className="font-urbanist text-[16px] md:text-[18px] font-[600] text-[#9B7A50] leading-snug">
                {t("rippleBottom.narrative_highlight")}
              </p>
            </div>
          </div>

          {/* BARRA DE FECHO MOOVIA: contorno fino dourado, cantos arredondados, logótipo à esquerda e texto à direita */}
          <div className="mt-6 border border-[#9B7A50]/55 rounded-xl md:rounded-2xl bg-[#0f1f41]/40 backdrop-blur-sm shadow-[0_0_24px_rgba(155,122,80,0.15)] p-5 md:px-8 md:py-5 flex flex-col md:flex-row items-center gap-4 md:gap-7 text-center md:text-left">
            {/* Logótipo MOOVIA à esquerda (mobile: em cima) */}
            <div className="flex items-center gap-2.5 shrink-0 select-none">
              <img
                src="/mooviagold.png"
                alt=""
                aria-hidden="true"
                className="h-7 lg:h-8 w-auto object-contain"
              />
              <img
                src={logoNavAsset.url}
                alt="MOOVIA"
                className="h-6 lg:h-7 w-auto object-contain brightness-110"
              />
            </div>

            {/* Linha separadora vertical sutil (apenas desktop) */}
            <div className="hidden md:block w-[1px] h-8 bg-[#9B7A50]/35 shrink-0" aria-hidden="true" />

            {/* Texto de fecho aprovado à direita */}
            <p className="font-urbanist text-[14px] md:text-[15.5px] text-white/95 font-[500] leading-relaxed">
              {t("rippleBottom.narrative_close")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
