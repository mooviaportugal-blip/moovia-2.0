import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import molduraMp4 from "@/assets/moldura.mp4.asset.json";
import molduraWebm from "@/assets/moldura.webm.asset.json";

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
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-[11px] font-[400] tracking-[0.32em] uppercase text-gold">
            Global Mobility Success
          </span>
        </motion.div>

        <h1
          key={locale}
          data-no-translate
          className="font-display text-[clamp(30px,3.4vw,54px)] text-white leading-[1.05] tracking-[-0.025em] mb-8"
        >
          <span className="font-[300] block">Coordenamos</span>
          <span className="font-[400] block mt-1">transições internacionais</span>
          <span className="font-[400] text-gold-l italic block mt-1">de vida, carreira e patrimônio.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-body text-[15px] font-[300] text-w35 leading-[1.7] max-w-[520px] mb-8 mx-auto lg:mx-0"
        >
          Mudar de país é uma das decisões mais importantes da vida. A MOOVIA transforma essa complexidade numa <span className="text-white/85">estratégia integrada</span>, coordenando especialistas, parceiros e todas as etapas da jornada para pessoas, famílias e empresas que procuram uma transição internacional bem-sucedida.
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-display italic text-[13px] md:text-[14px] font-[300] text-gold-l/80 leading-[1.5] max-w-[520px] mb-10 mx-auto lg:mx-0 border-l border-gold/40 pl-4"
        >
          "A mobilidade internacional não deve ser medida pela chegada. Deve ser medida pela integração bem-sucedida."
        </motion.blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-14 max-w-[560px] mx-auto lg:mx-0">
          <Link
            to="/home"
            hash="lead-form"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/home") {
                e.preventDefault();
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-6 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center min-h-[76px] flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gold flex flex-col leading-tight">
              <span>Life Transition™</span>
              <span className="text-[9px] tracking-[0.2em] opacity-70 mt-1 font-[400]">Pessoas &amp; Famílias</span>
            </span>
          </Link>
          <Link
            to="/empresas"
            className="group relative overflow-hidden border border-b35 text-gold font-body font-[500] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-6 py-4 rounded-[2px] isolate hover:border-gold text-center min-h-[76px] flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06091a] flex flex-col leading-tight">
              <span className="text-[10px] sm:text-[11px]">Human Mobility Risk Assurance Program™</span>
              <span className="text-[9px] tracking-[0.2em] opacity-70 mt-1 font-[400]">Empresas</span>
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
          <span className="opacity-80">Plan · Arrive · Stay</span>
        </div>
      </div>

      <div className="relative z-10 block lg:w-1/2 w-full h-[320px] sm:h-[400px] lg:h-auto lg:min-h-[100svh] overflow-hidden flex items-center justify-center bg-[#06091a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Layer mask via alpha gradient — sem overlay de cor */}
          <div className="relative w-[85%] sm:w-[70%] lg:w-[75%] h-[70%] lg:h-[60%] max-h-[60vh] opacity-90">
            <video
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
              aria-label="Moldura editorial Lisboa"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 60% 65% at 50% 50%, black 45%, rgba(0,0,0,0.65) 62%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 95%)",
                maskImage:
                  "radial-gradient(ellipse 60% 65% at 50% 50%, black 45%, rgba(0,0,0,0.65) 62%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 95%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <source src={molduraWebm.url} type="video/webm" />
              <source src={molduraMp4.url} type="video/mp4" />
            </video>
          </div>


        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute top-16 right-12 [writing-mode:vertical-rl] rotate-180 font-body text-[10px] tracking-[0.5em] uppercase text-gold/60 font-medium pointer-events-none"
        >
          Lisboa · Cascais · Estoril, 38.7223° N
        </motion.div>

      </div>

    </section>
  );
}
