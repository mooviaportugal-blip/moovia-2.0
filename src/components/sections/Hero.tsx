import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import heroHumanoid from "@/assets/hero-humanoid.png";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const shouldReduceMotion = useReducedMotion();

  // Interação leve: parallax muito suave ao mover o mouse no desktop (±8px na figura)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  type RingId = "family" | "team" | "business" | "consequences" | null;
  const [activeRing, setActiveRing] = useState<RingId>(null);

  // Teclado: tecla Esc fecha o cartão e regressa à introdução
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeRing !== null) {
        setActiveRing(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRing]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // IntersectionObserver para pausar as animações quando o hero sair da tela e poupar desempenho
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleScrollToSteps = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Parallax offsets
  const figureOffset = shouldReduceMotion ? { x: 0, y: 0 } : { x: mousePos.x * 8, y: mousePos.y * 8 };

  // Stagger timings (80ms entre cada elemento)
  const itemTransition = (index: number) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] };

  // Estado das animações dos anéis SVG (pausado se fora de vista ou reduced motion)
  const isSpinning = isInView && !shouldReduceMotion;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-section relative min-h-[calc(100svh-80px)] lg:h-[calc(100svh-80px)] flex flex-col justify-center bg-black overflow-hidden border-b border-b18 px-6 lg:px-12 xl:px-16"
    >
      {/* 1. FUNDO: bg-black (--black: #06091a). Brilho radial peru max 6% sutil atrás da figura */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 75% 50%, rgba(155,122,80,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 relative z-10 py-6 lg:py-0">
        {/* LADO ESQUERDO: TEXTO (max-w-[520px] em desktop) */}
        <div
          key={locale}
          className="relative z-10 w-full lg:w-[44%] xl:w-[42%] max-w-[520px] flex flex-col justify-center items-start text-left pt-12 pb-4 lg:py-0 shrink-0"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0)}
            className="typo-eyebrow text-[#9B7A50] mb-5 tracking-[0.25em]"
          >
            {t("hero.eyebrow")}
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(2)}
            className="typo-h1 text-white mb-5 max-w-[20ch] leading-[1.08]"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Linha de apoio 1 */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(3)}
            className="font-urbanist text-[17px] font-[500] text-[#FFFFFF]/90 mb-4 max-w-[54ch]"
          >
            {t("hero.support_line")}
          </motion.p>

          {/* Parágrafo de apoio */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(4)}
            className="typo-body text-white/70 mb-8 max-w-[54ch]"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Botões CTA */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(5)}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center bg-[#9B7A50] hover:bg-[#b08d60] text-black font-semibold typo-caption px-8 py-4 rounded-[2px] transition-colors text-center w-full sm:w-auto"
            >
              {t("hero.cta_primary")}
            </Link>

            <a
              href="#como-funciona"
              onClick={handleScrollToSteps}
              className="inline-flex items-center justify-center border border-[#9B7A50] hover:border-white text-white hover:text-white font-semibold typo-caption px-8 py-4 rounded-[2px] transition-colors text-center w-full sm:w-auto"
            >
              {t("hero.cta_secondary")}
            </a>
          </motion.div>
        </div>

        {/* LADO DIREITO: FIGURA + ANÉIS CONCÊNTRICOS + RIPPLE EFFECT INTERATIVO */}
        <div className="relative z-10 w-full lg:w-[56%] xl:w-[58%] flex flex-col items-center justify-center overflow-visible py-4 lg:py-0">
          <div className="relative w-full flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-5 xl:gap-7">
            
            {/* Wrapper do Humanoide com Anéis Concêntricos */}
            <motion.div
              style={{ x: figureOffset.x, y: figureOffset.y }}
              className="relative w-[320px] sm:w-[400px] lg:w-[440px] xl:w-[490px] h-[320px] sm:h-[400px] lg:h-[440px] xl:h-[490px] flex items-center justify-center overflow-visible shrink-0"
            >
              {/* ANÉIS CONCÊNTRICOS EM SVG COM ROTAÇÃO E DESTAQUE INTERATIVO */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-10"
                aria-hidden="true"
              >
                <svg
                  className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px] xl:w-[490px] xl:h-[490px] overflow-visible max-w-none"
                  viewBox="0 0 600 600"
                  fill="none"
                >
                  {/* Anel 1: Externo (r=290) - Long-term Consequences */}
                  <g
                    className={isSpinning ? "animate-[spin_120s_linear_infinite]" : ""}
                    style={{
                      transformOrigin: "300px 300px",
                      willChange: "transform",
                      animationPlayState: isSpinning ? "running" : "paused",
                    }}
                  >
                    <circle
                      cx="300"
                      cy="300"
                      r="290"
                      stroke={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "consequences" ? "2.4" : "0.85"}
                      strokeOpacity={activeRing === "consequences" ? 1 : 0.25}
                      strokeDasharray={activeRing === "consequences" ? undefined : "4 8"}
                      style={activeRing === "consequences" ? { filter: "drop-shadow(0 0 10px rgba(212,175,55,0.75))" } : undefined}
                    />
                    <circle cx="300" cy="10" r={activeRing === "consequences" ? 4 : 3} fill={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"} className="animate-pulse" />
                    <circle cx="590" cy="300" r="2.5" fill={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"} />
                    <circle cx="95" cy="505" r="3" fill={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"} className="animate-pulse" />
                  </g>

                  {/* Anel 2: Médio-externo (r=230) - Business Impact */}
                  <g
                    className={isSpinning ? "animate-[spin_80s_linear_infinite_reverse]" : ""}
                    style={{
                      transformOrigin: "300px 300px",
                      willChange: "transform",
                      animationPlayState: isSpinning ? "running" : "paused",
                    }}
                  >
                    <circle
                      cx="300"
                      cy="300"
                      r="230"
                      stroke={activeRing === "business" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "business" ? "2.4" : "0.85"}
                      strokeOpacity={activeRing === "business" ? 1 : 0.30}
                      style={activeRing === "business" ? { filter: "drop-shadow(0 0 10px rgba(212,175,55,0.75))" } : undefined}
                    />
                    <circle cx="300" cy="70" r={activeRing === "business" ? 4 : 3} fill={activeRing === "business" ? "#D4AF37" : "#9B7A50"} className="animate-pulse" />
                    <circle cx="530" cy="300" r="2.5" fill={activeRing === "business" ? "#D4AF37" : "#9B7A50"} />
                  </g>

                  {/* Anel 3: Médio (r=170) - Team Impact */}
                  <g
                    className={isSpinning ? "animate-[spin_95s_linear_infinite]" : ""}
                    style={{
                      transformOrigin: "300px 300px",
                      willChange: "transform",
                      animationPlayState: isSpinning ? "running" : "paused",
                    }}
                  >
                    <circle
                      cx="300"
                      cy="300"
                      r="170"
                      stroke={activeRing === "team" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "team" ? "2.4" : "0.85"}
                      strokeOpacity={activeRing === "team" ? 1 : 0.35}
                      strokeDasharray={activeRing === "team" ? undefined : "5 6"}
                      style={activeRing === "team" ? { filter: "drop-shadow(0 0 10px rgba(212,175,55,0.75))" } : undefined}
                    />
                    <circle cx="420" cy="180" r={activeRing === "team" ? 3.5 : 2.5} fill={activeRing === "team" ? "#D4AF37" : "#9B7A50"} className="animate-pulse" />
                    <circle cx="180" cy="420" r="2.5" fill={activeRing === "team" ? "#D4AF37" : "#9B7A50"} />
                  </g>

                  {/* Anel 4: Interno (r=110) - Family Impact */}
                  <g
                    className={isSpinning ? "animate-[spin_60s_linear_infinite_reverse]" : ""}
                    style={{
                      transformOrigin: "300px 300px",
                      willChange: "transform",
                      animationPlayState: isSpinning ? "running" : "paused",
                    }}
                  >
                    <circle
                      cx="300"
                      cy="300"
                      r="110"
                      stroke={activeRing === "family" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "family" ? "2.4" : "0.9"}
                      strokeOpacity={activeRing === "family" ? 1 : 0.45}
                      style={activeRing === "family" ? { filter: "drop-shadow(0 0 10px rgba(212,175,55,0.75))" } : undefined}
                    />
                    <circle cx="300" cy="190" r={activeRing === "family" ? 4 : 3} fill={activeRing === "family" ? "#D4AF37" : "#9B7A50"} className="animate-pulse" />
                    <circle cx="377" cy="377" r="2.5" fill={activeRing === "family" ? "#D4AF37" : "#9B7A50"} />
                  </g>

                  {/* Linhas finas estáticas ligando os anéis às 4 etiquetas da coluna (apenas desktop) */}
                  <g className="hidden lg:block pointer-events-none" aria-hidden="true">
                    {/* Linha 1: Anel Interior (Family) -> Botão 01 (y=168) */}
                    <circle
                      cx="360"
                      cy="215"
                      r={activeRing === "family" ? 4 : 2.5}
                      fill={activeRing === "family" ? "#D4AF37" : "#9B7A50"}
                      className={activeRing === "family" ? "animate-pulse" : ""}
                    />
                    <path
                      d="M 360 215 L 420 168 L 600 168"
                      fill="none"
                      stroke={activeRing === "family" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "family" ? "1.6" : "0.75"}
                      strokeOpacity={activeRing === "family" ? 0.95 : 0.35}
                    />

                    {/* Linha 2: Anel Médio (Team) -> Botão 02 (y=214) */}
                    <circle
                      cx="448"
                      cy="216"
                      r={activeRing === "team" ? 4 : 2.5}
                      fill={activeRing === "team" ? "#D4AF37" : "#9B7A50"}
                      className={activeRing === "team" ? "animate-pulse" : ""}
                    />
                    <path
                      d="M 448 216 L 600 216"
                      fill="none"
                      stroke={activeRing === "team" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "team" ? "1.6" : "0.75"}
                      strokeOpacity={activeRing === "team" ? 0.95 : 0.35}
                    />

                    {/* Linha 3: Anel Médio-externo (Business) -> Botão 03 (y=264) */}
                    <circle
                      cx="527"
                      cy="264"
                      r={activeRing === "business" ? 4 : 2.5}
                      fill={activeRing === "business" ? "#D4AF37" : "#9B7A50"}
                      className={activeRing === "business" ? "animate-pulse" : ""}
                    />
                    <path
                      d="M 527 264 L 600 264"
                      fill="none"
                      stroke={activeRing === "business" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "business" ? "1.6" : "0.75"}
                      strokeOpacity={activeRing === "business" ? 0.95 : 0.35}
                    />

                    {/* Linha 4: Anel Exterior (Consequences) -> Botão 04 (y=312) */}
                    <circle
                      cx="590"
                      cy="312"
                      r={activeRing === "consequences" ? 4 : 2.5}
                      fill={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"}
                      className={activeRing === "consequences" ? "animate-pulse" : ""}
                    />
                    <path
                      d="M 590 312 L 600 312"
                      fill="none"
                      stroke={activeRing === "consequences" ? "#D4AF37" : "#9B7A50"}
                      strokeWidth={activeRing === "consequences" ? "1.6" : "0.75"}
                      strokeOpacity={activeRing === "consequences" ? 0.95 : 0.35}
                    />
                  </g>
                </svg>
              </div>

              {/* CAMADA DE BAIXO: HUMANOIDE */}
              <div className="relative w-full h-full flex items-center justify-center overflow-visible pointer-events-none select-none z-0">
                <img
                  src={heroHumanoid}
                  alt="Figura humana estilizada em traço dourado com anéis orbitais"
                  className="w-full h-full max-w-[490px] max-h-[490px] object-contain pointer-events-none select-none"
                  style={{
                    transform: "scaleX(-1)",
                    mixBlendMode: "screen",
                    WebkitMaskImage: "radial-gradient(closest-side, #000 70%, transparent 100%)",
                    maskImage: "radial-gradient(closest-side, #000 70%, transparent 100%)",
                  }}
                  loading="eager"
                />
              </div>

              {/* ETIQUETA CENTRAL SOBRE O HUMANOIDE */}
              <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
                <div className="px-3 py-1 rounded-full border border-[#9B7A50]/70 bg-black/85 backdrop-blur-sm flex items-center gap-1.5 shadow-[0_0_12px_rgba(155,122,80,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-urbanist font-[600] text-white tracking-widest uppercase whitespace-nowrap">
                    {t("rippleDrill.central_label")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* COLUNA DE ETIQUETAS + CARTÃO DE DETALHE (Desktop à direita, Mobile abaixo) */}
            <div className="w-full max-w-[340px] lg:w-[260px] xl:w-[290px] flex flex-col items-center lg:items-start gap-3 z-30 shrink-0">
              {/* 4 Etiquetas dos anéis (Coluna no desktop, grid/wrap no mobile) */}
              <div
                role="tablist"
                aria-label="Impactos da mobilidade"
                className="w-full flex flex-row flex-wrap lg:flex-col gap-2 justify-center lg:justify-start"
              >
                {/* 01 · Impacto familiar */}
                <button
                  type="button"
                  role="tab"
                  id="tab-ring-family"
                  aria-selected={activeRing === "family"}
                  aria-expanded={activeRing === "family"}
                  aria-controls="ripple-drilldown-card"
                  onClick={() => setActiveRing(activeRing === "family" ? null : "family")}
                  className={`group flex items-center justify-between px-3.5 py-2 rounded-full border text-xs font-urbanist transition-all cursor-pointer w-auto lg:w-full ${
                    activeRing === "family"
                      ? "border-[#D4AF37] bg-[#9B7A50]/30 text-white shadow-[0_0_14px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]"
                      : "border-[#9B7A50]/40 bg-black/75 text-white/85 hover:border-[#9B7A50] hover:text-white hover:bg-black/90"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeRing === "family" ? "bg-[#D4AF37] animate-pulse" : "bg-[#9B7A50]"}`} />
                    <span className="font-[600] tracking-wide whitespace-nowrap">{t("rippleDrill.ring1_label")}</span>
                  </div>
                  <span className="hidden lg:inline text-[10px] font-mono text-[#9B7A50]/80">01</span>
                </button>

                {/* 02 · Impacto na equipa */}
                <button
                  type="button"
                  role="tab"
                  id="tab-ring-team"
                  aria-selected={activeRing === "team"}
                  aria-expanded={activeRing === "team"}
                  aria-controls="ripple-drilldown-card"
                  onClick={() => setActiveRing(activeRing === "team" ? null : "team")}
                  className={`group flex items-center justify-between px-3.5 py-2 rounded-full border text-xs font-urbanist transition-all cursor-pointer w-auto lg:w-full ${
                    activeRing === "team"
                      ? "border-[#D4AF37] bg-[#9B7A50]/30 text-white shadow-[0_0_14px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]"
                      : "border-[#9B7A50]/40 bg-black/75 text-white/85 hover:border-[#9B7A50] hover:text-white hover:bg-black/90"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeRing === "team" ? "bg-[#D4AF37] animate-pulse" : "bg-[#9B7A50]"}`} />
                    <span className="font-[600] tracking-wide whitespace-nowrap">{t("rippleDrill.ring2_label")}</span>
                  </div>
                  <span className="hidden lg:inline text-[10px] font-mono text-[#9B7A50]/80">02</span>
                </button>

                {/* 03 · Impacto no negócio */}
                <button
                  type="button"
                  role="tab"
                  id="tab-ring-business"
                  aria-selected={activeRing === "business"}
                  aria-expanded={activeRing === "business"}
                  aria-controls="ripple-drilldown-card"
                  onClick={() => setActiveRing(activeRing === "business" ? null : "business")}
                  className={`group flex items-center justify-between px-3.5 py-2 rounded-full border text-xs font-urbanist transition-all cursor-pointer w-auto lg:w-full ${
                    activeRing === "business"
                      ? "border-[#D4AF37] bg-[#9B7A50]/30 text-white shadow-[0_0_14px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]"
                      : "border-[#9B7A50]/40 bg-black/75 text-white/85 hover:border-[#9B7A50] hover:text-white hover:bg-black/90"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeRing === "business" ? "bg-[#D4AF37] animate-pulse" : "bg-[#9B7A50]"}`} />
                    <span className="font-[600] tracking-wide whitespace-nowrap">{t("rippleDrill.ring3_label")}</span>
                  </div>
                  <span className="hidden lg:inline text-[10px] font-mono text-[#9B7A50]/80">03</span>
                </button>

                {/* 04 · Consequências a longo prazo */}
                <button
                  type="button"
                  role="tab"
                  id="tab-ring-consequences"
                  aria-selected={activeRing === "consequences"}
                  aria-expanded={activeRing === "consequences"}
                  aria-controls="ripple-drilldown-card"
                  onClick={() => setActiveRing(activeRing === "consequences" ? null : "consequences")}
                  className={`group flex items-center justify-between px-3.5 py-2 rounded-full border text-xs font-urbanist transition-all cursor-pointer w-auto lg:w-full ${
                    activeRing === "consequences"
                      ? "border-[#D4AF37] bg-[#9B7A50]/30 text-white shadow-[0_0_14px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]"
                      : "border-[#9B7A50]/40 bg-black/75 text-white/85 hover:border-[#9B7A50] hover:text-white hover:bg-black/90"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeRing === "consequences" ? "bg-[#D4AF37] animate-pulse" : "bg-[#9B7A50]"}`} />
                    <span className="font-[600] tracking-wide whitespace-nowrap">{t("rippleDrill.ring4_label")}</span>
                  </div>
                  <span className="hidden lg:inline text-[10px] font-mono text-[#9B7A50]/80">04</span>
                </button>
              </div>

              {/* Cartão de texto (com Introdução por defeito e sem layout shift) */}
              <div
                id="ripple-drilldown-card"
                role="region"
                aria-live="polite"
                className="w-full min-h-[190px] sm:min-h-[180px] bg-[#06091a]/95 border border-[#9B7A50]/40 rounded-sm p-4 sm:p-4.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#9B7A50]/20">
                    <span className="typo-eyebrow text-[#9B7A50] text-[10px] tracking-[0.2em]">
                      {activeRing === null && t("rippleDrill.intro_tag")}
                      {activeRing === "family" && `01 · ${t("rippleDrill.ring1_label")}`}
                      {activeRing === "team" && `02 · ${t("rippleDrill.ring2_label")}`}
                      {activeRing === "business" && `03 · ${t("rippleDrill.ring3_label")}`}
                      {activeRing === "consequences" && `04 · ${t("rippleDrill.ring4_label")}`}
                    </span>
                    {activeRing !== null && (
                      <button
                        type="button"
                        onClick={() => setActiveRing(null)}
                        className="text-[11px] font-urbanist text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label={t("rippleDrill.close")}
                      >
                        {t("rippleDrill.close")} ✕
                      </button>
                    )}
                  </div>

                  {activeRing === null && (
                    <p className="font-urbanist text-[13px] text-white/85 leading-relaxed">
                      {t("rippleDrill.intro")}
                    </p>
                  )}

                  {activeRing === "family" && (
                    <div>
                      <h4 className="font-urbanist text-[14px] font-[600] text-[#9B7A50] mb-1 leading-snug">
                        {t("rippleDrill.family_title")}
                      </h4>
                      <p className="font-urbanist text-[12.5px] text-white/85 leading-relaxed">
                        {t("rippleDrill.family_text")}
                      </p>
                    </div>
                  )}

                  {activeRing === "team" && (
                    <div>
                      <h4 className="font-urbanist text-[14px] font-[600] text-[#9B7A50] mb-1 leading-snug">
                        {t("rippleDrill.team_title")}
                      </h4>
                      <p className="font-urbanist text-[12.5px] text-white/85 leading-relaxed">
                        {t("rippleDrill.team_text")}
                      </p>
                    </div>
                  )}

                  {activeRing === "business" && (
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-urbanist text-[13.5px] font-[600] text-[#9B7A50] mb-0.5 leading-snug">
                          {t("rippleDrill.business_p1_title")}
                        </h4>
                        <p className="font-urbanist text-[12px] text-white/85 leading-relaxed">
                          {t("rippleDrill.business_p1_text")}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-urbanist text-[13.5px] font-[600] text-[#9B7A50] mb-0.5 leading-snug">
                          {t("rippleDrill.business_p2_title")}
                        </h4>
                        <p className="font-urbanist text-[12px] text-white/85 leading-relaxed">
                          {t("rippleDrill.business_p2_text")}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeRing === "consequences" && (
                    <div>
                      <h4 className="font-urbanist text-[14px] font-[600] text-[#9B7A50] mb-1 leading-snug">
                        {t("rippleDrill.consequences_title")}
                      </h4>
                      <p className="font-urbanist text-[12.5px] text-white/85 leading-relaxed">
                        {t("rippleDrill.consequences_text")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* INDICADOR DE SCROLL: PEQUENO E PERU A 60% */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none" aria-hidden="true">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={shouldReduceMotion ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 text-[#9B7A50]/60"
        >
          <span className="w-[1px] h-3.5 bg-gradient-to-b from-transparent to-[#9B7A50]/60" />
          <ChevronDown size={12} className="text-[#9B7A50]/60" />
        </motion.div>
      </div>
    </section>
  );
}
