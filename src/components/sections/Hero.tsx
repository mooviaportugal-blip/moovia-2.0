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
      .getElementById("o-problema")
      ?.scrollIntoView({ behavior: "smooth", block: "start" }) ||
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
      className="hero-section relative min-h-[calc(100svh-80px)] lg:h-[calc(100svh-80px)] flex flex-col lg:flex-row items-center justify-between bg-black overflow-hidden border-b border-b18 px-6 lg:px-20"
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

      {/* LADO ESQUERDO: TEXTO (52% em desktop) */}
      <div
        key={locale}
        className="relative z-10 w-full lg:w-[50%] flex flex-col justify-center items-start text-left pt-20 pb-8 lg:py-0"
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

      {/* LADO DIREITO: FIGURA + ANÉIS CONCÊNTRICOS COMPLETOS SEM CORTE (OVERFLOW VISIBLE) */}
      <div className="relative z-10 w-full lg:w-[50%] h-[460px] sm:h-[580px] lg:h-full flex items-center justify-center overflow-visible">
        
        {/* Wrapper amplo com overflow: visible para não cortar os anéis nas laterais */}
        <motion.div
          style={{ x: figureOffset.x, y: figureOffset.y }}
          className="relative w-[380px] sm:w-[500px] lg:w-[640px] h-[380px] sm:h-[500px] lg:h-[640px] flex items-center justify-center overflow-visible"
        >
          {/* 3. CAMADA DE CIMA (ANIMADA): ANÉIS CONCÊNTRICOS EM SVG COM ROTAÇÃO E PONTOS DE LUZ */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-10"
            aria-hidden="true"
          >
            <svg
              className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] overflow-visible max-w-none"
              viewBox="0 0 600 600"
              fill="none"
            >
              {/* Anel 1: Externo (diâmetro 580px, r=290) - 120s horário */}
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
                  stroke="#9B7A50"
                  strokeWidth="0.85"
                  strokeOpacity="0.25"
                  strokeDasharray="4 8"
                />
                <circle cx="300" cy="10" r="3" fill="#9B7A50" className="animate-pulse" />
                <circle cx="590" cy="300" r="2.5" fill="#9B7A50" />
                <circle cx="95" cy="505" r="3" fill="#9B7A50" className="animate-pulse" />
              </g>

              {/* Anel 2: Médio-externo (diâmetro 460px, r=230) - 80s anti-horário */}
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
                  stroke="#9B7A50"
                  strokeWidth="0.85"
                  strokeOpacity="0.30"
                />
                <circle cx="300" cy="70" r="3" fill="#9B7A50" className="animate-pulse" />
                <circle cx="530" cy="300" r="2.5" fill="#9B7A50" />
              </g>

              {/* Anel 3: Médio (diâmetro 340px, r=170) - 95s horário */}
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
                  stroke="#9B7A50"
                  strokeWidth="0.85"
                  strokeOpacity="0.35"
                  strokeDasharray="5 6"
                />
                <circle cx="420" cy="180" r="2.5" fill="#9B7A50" className="animate-pulse" />
                <circle cx="180" cy="420" r="2.5" fill="#9B7A50" />
              </g>

              {/* Anel 4: Interno (diâmetro 220px, r=110) - 60s anti-horário */}
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
                  stroke="#9B7A50"
                  strokeWidth="0.9"
                  strokeOpacity="0.45"
                />
                <circle cx="300" cy="190" r="3" fill="#9B7A50" className="animate-pulse" />
                <circle cx="377" cy="377" r="2.5" fill="#9B7A50" />
              </g>
            </svg>
          </div>

          {/* 1 & 2. CAMADA DE BAIXO (FIXA): HUMANOIDE COM MÁSCARA RADIAL SUAVE, SEM RECORTE RETO */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full flex items-center justify-center overflow-visible pointer-events-none select-none z-0"
          >
            <img
              src={heroHumanoid}
              alt="Figura humana estilizada em traço dourado com anéis orbitais"
              className="w-full h-full max-w-[620px] max-h-[620px] object-contain pointer-events-none select-none"
              style={{
                transform: "scaleX(-1)", // Humanoide estático, espelhado para olhar na direção do texto
                mixBlendMode: "screen", // Fundo da imagem funde no preto absoluto #06091a
                WebkitMaskImage: "radial-gradient(closest-side, #000 70%, transparent 100%)", // Fade suave circular
                maskImage: "radial-gradient(closest-side, #000 70%, transparent 100%)",
              }}
              loading="eager"
            />
          </motion.div>

          {/* 2. CHIPS REPOSICIONADOS SEM NENHUMA SOBREPOSIÇÃO AO CORPO */}
          <div className="absolute inset-0 pointer-events-none select-none z-20 overflow-visible" aria-hidden="true">
            
            {/* Chip 1: À direita da cabeça, a 28px do contorno do corpo, com linha de 28px */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
              transition={shouldReduceMotion ? {} : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] left-[55%] flex items-center"
              style={{ transform: "translateX(28px)" }}
            >
              <div className="w-[28px] h-[0.75px] bg-[#9B7A50]/40 shrink-0 -ml-[28px]" />
              <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-black/60 flex items-center gap-1.5 backdrop-blur-[2px]">
                <span className="w-1 h-1 rounded-full bg-[#9B7A50]" />
                <span className="text-[12px] font-urbanist font-[400] text-white tracking-wide whitespace-nowrap">
                  {t("hero.chips.chip1")}
                </span>
              </div>
            </motion.div>

            {/* Chip 2: À esquerda do tronco, a 28px do corpo, com linha de 28px */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [3, -3, 3] }}
              transition={shouldReduceMotion ? {} : { duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[38%] right-[54%] flex items-center"
              style={{ transform: "translateX(-28px)" }}
            >
              <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-black/60 flex items-center gap-1.5 backdrop-blur-[2px]">
                <span className="w-1 h-1 rounded-full bg-[#9B7A50]" />
                <span className="text-[12px] font-urbanist font-[400] text-white tracking-wide whitespace-nowrap">
                  {t("hero.chips.chip2")}
                </span>
              </div>
              <div className="w-[28px] h-[0.75px] bg-[#9B7A50]/40 shrink-0" />
            </motion.div>

            {/* Chip 3: À direita da cintura/mão, a 28px fora do contorno corporal (SEM TOCAR NA COXA) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
              transition={shouldReduceMotion ? {} : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute top-[58%] left-[62%] items-center"
              style={{ transform: "translateX(28px)" }}
            >
              <div className="w-[28px] h-[0.75px] bg-[#9B7A50]/40 shrink-0 -ml-[28px]" />
              <div className="px-2.5 py-1 rounded-full border border-[#9B7A50]/50 bg-black/60 flex items-center gap-1.5 backdrop-blur-[2px]">
                <span className="w-1 h-1 rounded-full bg-[#9B7A50]" />
                <span className="text-[12px] font-urbanist font-[400] text-white tracking-wide whitespace-nowrap">
                  {t("hero.chips.chip3")}
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>

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
