import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HERO_MEDIA_URL = "https://mooviaportugal.com/video/moovia-pt.gif"; // Fallback para o GIF enquanto o MP4 está indisponível
const HERO_BG = "#06091a";

export function Hero() {
  const { i18n } = useTranslation();
  const locale = i18n.language;








  return (
    <section className="relative min-h-[100svh] flex flex-col lg:flex-row bg-[#06091a] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 50% at 10% 90%, rgba(173,137,87,0.05) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left pt-28 pb-16 md:pt-32 md:pb-20 lg:py-32 px-6 lg:pl-20 lg:pr-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center mb-10"
        >
          <span className="font-body text-[11px] font-[400] tracking-[0.32em] uppercase text-gold">
            Global Mobility Success
          </span>
        </motion.div>

        <h1
          key={locale}
          className="font-display text-[clamp(32px,3.8vw,60px)] leading-[1.05] tracking-[-0.03em] mb-10"
        >
          <span className="text-white/60 font-[200] block mb-2">Ajudamos empresas a reduzir</span>
          <span className="text-white font-[400] block">o risco humano da</span>
          <span className="text-gold-l italic font-[300] block">mobilidade internacional.</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.8] max-w-[520px] mb-12 mx-auto lg:mx-0 space-y-5"
        >
          <p>
            As empresas alocam capital substancial na contratação internacional, mas poucas avaliam o risco sistémico associado à integração, retenção e quebra de produtividade.
          </p>
          <p>
            A MOOVIA implementa uma arquitetura estratégica desenvolvida para antecipar riscos operacionais e garantir o sucesso a longo prazo em cada mudança.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-display italic text-[18px] md:text-[22px] font-[300] text-gold-l/90 leading-[1.5] max-w-[520px] mb-12 mx-auto lg:mx-0 border-l-[3px] border-gold/40 pl-5"
        >
          "A transição internacional não termina no desembarque.<br className="hidden sm:block" /> É nesse momento que ela verdadeiramente começa."
        </motion.blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-14 max-w-[560px] mx-auto lg:mx-0">
          <Link
            to="/empresas"
            className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-6 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center min-h-[96px] flex flex-col items-center justify-center"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gold flex flex-col leading-tight items-center text-center">
              <span>Para Empresas</span>
              <span className="text-[9px] tracking-[0.1em] opacity-80 mt-1.5 font-[400] normal-case leading-relaxed">
                Reduzindo turnover, aumentando retenção e protegendo o ROI da contratação internacional.
              </span>
            </span>
          </Link>
          <Link
            to="/home"
            hash="lead-form"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/home") {
                e.preventDefault();
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group relative overflow-hidden border border-b35 text-gold font-body font-[500] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-6 py-4 rounded-[2px] isolate hover:border-gold text-center min-h-[96px] flex flex-col items-center justify-center"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06091a] flex flex-col leading-tight items-center text-center">
              <span>Para Executivos Internacionais</span>
              <span className="text-[9px] tracking-[0.1em] opacity-80 mt-1.5 font-[400] normal-case leading-relaxed">
                A metodologia utilizada pelas empresas para apoiar executivos e famílias durante a integração internacional.
              </span>
            </span>
          </Link>
        </div>




        <div className="flex items-center justify-center lg:justify-start gap-6 font-body text-[10px] tracking-[0.25em] uppercase text-w35">
          <div className="w-12 h-px bg-gold/30 relative overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 bg-gold"
            />
          </div>
          <span className="opacity-80">Planejar · Chegar · Ficar</span>
        </div>
      </div>

      <div className="relative z-10 block lg:w-1/2 w-full h-[450px] sm:h-[550px] lg:h-auto lg:min-h-[100svh] overflow-hidden flex items-center justify-center bg-[#06091a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Video/GIF com fade radial arredondado dissolvendo no fundo */}
          <div className="relative w-full h-full">
            <video
              autoPlay
              muted
              playsInline
              loop={false}
              onEnded={(e) => {
                const target = e.target as HTMLVideoElement;
                target.pause();
                target.currentTime = target.duration;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            >
              <source src={HERO_MEDIA_URL} type="video/mp4" />
            </video>

            {/* Fade radial elíptico (60% 60%) dissolvendo no fundo do site */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 60% at center, transparent 40%, ${HERO_BG} 85%)`,
              }}
            />
          </div>




        </motion.div>


      </div>

    </section>
  );
}
