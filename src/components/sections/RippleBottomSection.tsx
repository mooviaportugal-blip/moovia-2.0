import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
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
      {/* Estilos para escala tipográfica com container queries (cqw) e limites clamp */}
      <style>{`
        .ripple-cq-container {
          container-type: inline-size;
        }
        .ripple-item-text {
          font-family: var(--font-body, "Space Grotesk", sans-serif);
          font-size: clamp(11px, 1.0cqw, 14px);
          line-height: 1.35;
        }
        .ripple-title-text {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: clamp(13px, 1.35cqw, 18px);
          font-weight: 600;
          line-height: 1.25;
        }
        .ripple-legend-text {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: clamp(12px, 1.2cqw, 16px);
          font-weight: 600;
          line-height: 1.25;
        }
        @media (max-width: 1023px) {
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
      `}</style>

      {/* Brilho radial de fundo suave em peru */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 35%, rgba(155, 122, 80, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1240px] relative z-10">
        {/* Cabeçalho da secção */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
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

        {/* 1. VISUAL DESKTOP & TABLET: Ondas sobrepostas flutuando diretamente no fundo, sem caixa */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, scale: 0.995 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block relative w-full aspect-[1300/600] max-lg:aspect-[1300/680] max-w-[1240px] mx-auto overflow-hidden select-none ripple-cq-container"
        >
          {/* Camada 1: SVG de fundo (viewBox 0 0 1300 600, cy 300) desenhado da maior para a menor */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1300 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Brilho suave no bordo dourado direito */}
              <filter id="ripple-crest-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Traço linearGradient horizontal: 100% transparente à esquerda (sem arcos à esquerda), dourado brilhante à direita */}
              <linearGradient id="crestStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                <stop offset="78%" stopColor="#D4AF37" stopOpacity="0" />
                <stop offset="86%" stopColor="#9B7A50" stopOpacity="0.35" />
                <stop offset="96%" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Onda 5: elipse cx 874, cy 300, rx 400, ry 295 (borda direita ≈ 98%) */}
            <ellipse
              cx="874"
              cy="300"
              rx="400"
              ry="295"
              fill="#162544"
              stroke="url(#crestStrokeGrad)"
              strokeWidth="2.4"
              filter="url(#ripple-crest-glow)"
            />

            {/* Onda 4: círculo cx 648, cy 300, r 275 (borda direita ≈ 70%) */}
            <circle
              cx="648"
              cy="300"
              r="275"
              fill="#111d37"
              stroke="url(#crestStrokeGrad)"
              strokeWidth="2.4"
              filter="url(#ripple-crest-glow)"
            />

            {/* Onda 3: círculo cx 431, cy 300, r 255 (borda direita ≈ 52%) */}
            <circle
              cx="431"
              cy="300"
              r="255"
              fill="#0d162a"
              stroke="url(#crestStrokeGrad)"
              strokeWidth="2.4"
              filter="url(#ripple-crest-glow)"
            />

            {/* Onda 2: círculo cx 217, cy 300, r 230 (borda direita ≈ 34%) */}
            <circle
              cx="217"
              cy="300"
              r="230"
              fill="#090f1d"
              stroke="url(#crestStrokeGrad)"
              strokeWidth="2.4"
              filter="url(#ripple-crest-glow)"
            />

            {/* Onda 1 (centro): círculo cx 118, cy 300, r 92 (borda direita ≈ 16%) com contorno dourado completo e fundo escuro */}
            <circle
              cx="118"
              cy="300"
              r="92"
              fill="#06091a"
              stroke="#D4AF37"
              strokeWidth="2.4"
              filter="url(#ripple-crest-glow)"
            />
            {/* Anel de precisão interno da Onda 1 */}
            <circle
              cx="118"
              cy="300"
              r="80"
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Camada 2: Colunas de texto em HTML dentro da sua crescente com margem de segurança */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-100">
            {/* Zona 1: Círculo central (cx 118, r 92 -> centro em 9.08%) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex flex-col justify-center items-center pointer-events-auto"
              style={{ left: "2.5%", width: "13%" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <User size={26} strokeWidth={1.8} className="text-[#D4AF37] mb-2" />
                <span className="ripple-legend-text text-white tracking-wider uppercase text-center max-w-[130px]">
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
            </div>

            {/* Zona 2 (Impacto familiar): Crescente 2 (borda direita 34.38%), coluna em 18.2% com largura 10.2% */}
            <div
              className="absolute pointer-events-auto flex flex-col items-center"
              style={{ left: "18.2%", width: "10.2%", top: "27%" }}
            >
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center mb-1.5 h-6 items-center">
                  <Users size={22} strokeWidth={1.8} className="text-[#9B7A50]" />
                </div>
                <h3 className="ripple-title-text text-white text-center mb-2.5">
                  {t("rippleBottom.zone2_title")}
                </h3>
                <ul className="w-full space-y-1.5 text-left">
                  {zone2Items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 ripple-item-text text-white/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Zona 3 (Impacto na equipa): Crescente 3 (borda direita 52.77%), coluna em 36.5% com largura 10.2% */}
            <div
              className="absolute pointer-events-auto flex flex-col items-center"
              style={{ left: "36.5%", width: "10.2%", top: "27%" }}
            >
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center mb-1.5 h-6 items-center">
                  <UsersRound size={22} strokeWidth={1.8} className="text-[#9B7A50]" />
                </div>
                <h3 className="ripple-title-text text-white text-center mb-2.5">
                  {t("rippleBottom.zone3_title")}
                </h3>
                <ul className="w-full space-y-1.5 text-left">
                  {zone3Items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 ripple-item-text text-white/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Zona 4 (Impacto no negócio): Crescente 4 (borda direita 71.00%), coluna em 55.0% com largura 10.2% */}
            <div
              className="absolute pointer-events-auto flex flex-col items-center"
              style={{ left: "55.0%", width: "10.2%", top: "27%" }}
            >
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center mb-1.5 h-6 items-center">
                  <BarChart3 size={22} strokeWidth={1.8} className="text-[#9B7A50]" />
                </div>
                <h3 className="ripple-title-text text-white text-center mb-2.5">
                  {t("rippleBottom.zone4_title")}
                </h3>
                <ul className="w-full space-y-1.5 text-left">
                  {zone4Items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 ripple-item-text text-white/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Zona 5 (Consequências a longo prazo): Crescente 5 (borda direita 98.00%), coluna em 73.0% com largura 17.5%, centrada à sua altura */}
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center"
              style={{ left: "73.0%", width: "17.5%" }}
            >
              <div className="w-full flex flex-col items-center max-w-[260px]">
                <div className="flex justify-center mb-1.5 h-6 items-center">
                  <Target size={24} strokeWidth={1.8} className="text-[#9B7A50]" />
                </div>
                <h3 className="ripple-title-text text-white text-center mb-2.5">
                  {t("rippleBottom.zone5_title")}
                </h3>
                <ul className="w-full space-y-1.5 text-left">
                  {zone5Items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 ripple-item-text text-white/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. VISUAL MOBILE (abaixo de 768px): Coluna vertical de 5 cartões com bordo direito arredondado e brilho dourado reduzido */}
        <div className="md:hidden flex flex-col gap-3.5 w-full select-none">
          {/* Cartão 1: Zona 1 (Missão Internacional) - mais curto */}
          <div className="w-full bg-[#0f1f41]/40 border border-b18 border-r-2 border-r-[#9B7A50] rounded-l-sm rounded-r-2xl p-4 shadow-[3px_0_12px_rgba(155,122,80,0.18)] flex items-center justify-center gap-2.5 text-center">
            <User size={20} strokeWidth={1.8} className="text-[#D4AF37]" />
            <span className="font-urbanist font-[600] text-white tracking-widest uppercase text-[12px]">
              {t("rippleBottom.zone1_title")}
            </span>
          </div>

          {/* Cartão 2: Impacto familiar */}
          <div className="w-full bg-[#0f1f41]/40 border border-b18 border-r-2 border-r-[#9B7A50] rounded-l-sm rounded-r-2xl p-4.5 shadow-[3px_0_12px_rgba(155,122,80,0.15)] flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <Users size={19} strokeWidth={1.8} className="text-[#9B7A50]" />
              <h3 className="font-urbanist font-[600] text-white text-[14.5px]">
                {t("rippleBottom.zone2_title")}
              </h3>
            </div>
            <ul className="space-y-1.5 w-full text-left pl-1">
              {zone2Items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cartão 3: Impacto na equipa */}
          <div className="w-full bg-[#0f1f41]/40 border border-b18 border-r-2 border-r-[#9B7A50] rounded-l-sm rounded-r-2xl p-4.5 shadow-[3px_0_12px_rgba(155,122,80,0.15)] flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <UsersRound size={19} strokeWidth={1.8} className="text-[#9B7A50]" />
              <h3 className="font-urbanist font-[600] text-white text-[14.5px]">
                {t("rippleBottom.zone3_title")}
              </h3>
            </div>
            <ul className="space-y-1.5 w-full text-left pl-1">
              {zone3Items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cartão 4: Impacto no negócio */}
          <div className="w-full bg-[#0f1f41]/40 border border-b18 border-r-2 border-r-[#9B7A50] rounded-l-sm rounded-r-2xl p-4.5 shadow-[3px_0_12px_rgba(155,122,80,0.15)] flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={19} strokeWidth={1.8} className="text-[#9B7A50]" />
              <h3 className="font-urbanist font-[600] text-white text-[14.5px]">
                {t("rippleBottom.zone4_title")}
              </h3>
            </div>
            <ul className="space-y-1.5 w-full text-left pl-1">
              {zone4Items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cartão 5: Consequências a longo prazo */}
          <div className="w-full bg-[#0f1f41]/40 border border-b18 border-r-2 border-r-[#9B7A50] rounded-l-sm rounded-r-2xl p-4.5 shadow-[3px_0_12px_rgba(155,122,80,0.15)] flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <Target size={19} strokeWidth={1.8} className="text-[#9B7A50]" />
              <h3 className="font-urbanist font-[600] text-white text-[14.5px]">
                {t("rippleBottom.zone5_title")}
              </h3>
            </div>
            <ul className="space-y-1.5 w-full text-left pl-1">
              {zone5Items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-urbanist text-[13px] text-white/80 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. NARRATIVA POR BAIXO DO VISUAL: Parágrafos, Frase em Destaque e Barra de Fecho */}
        <div className="mt-8 md:mt-10 max-w-4xl mx-auto opacity-100 print:opacity-100 relative z-10">
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
