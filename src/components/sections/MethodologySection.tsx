import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const dimensions = [
  {
    id: "01 / 04",
    title: "Human Intelligence",
    description: "Toda mobilidade começa por compreender pessoas, não processos. Entrevistas, contexto familiar, expectativas, capacidade de adaptação — a metodologia da MOOVIA parte da inteligência humana antes de qualquer estrutura ou tecnologia entrar em ação.",
    quote: "Antes dos dados, as pessoas.",
    icon: "/icons/aviao.svg",
    iconScale: 1.16,
  },
  {
    id: "02 / 04",
    title: "Risk Assurance",
    description: "O que identificamos transforma-se em risco mensurável — adaptação familiar, integração cultural, alinhamento de expectativas. Não tratamos estes fatores como imponderáveis; tratamos como riscos que podem ser avaliados, mitigados e acompanhados.",
    quote: "O que se mede, pode ser protegido.",
    icon: "/icons/ponte.svg",
    iconScale: 1.28,
  },
  {
    id: "03 / 04",
    title: "Global Coordination",
    description: "Uma estratégia só funciona se todos os especialistas envolvidos — jurídico, fiscal, imobiliário, educacional — trabalharem na mesma direção. A MOOVIA orquestra essa rede, seja ela própria ou os parceiros que a empresa já tem, para que nenhuma decisão fique desconectada das restantes.",
    quote: "Um único ponto. Nenhuma decisão isolada.",
    icon: "/icons/pessoa.svg",
    iconScale: 0.9,
  },
  {
    id: "04 / 04",
    title: "Global Mobility Success",
    description: "O resultado não é a chegada. É a permanência, a integração e a produtividade sustentada ao longo do tempo. É assim que medimos se uma mobilidade internacional foi, de facto, bem-sucedida.",
    quote: "O sucesso não é chegar. É permanecer.",
    icon: "/icons/casa.svg",
    iconScale: 0.95,
  },
];

export function MethodologySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 lg:py-48 bg-[#020408] overflow-hidden">
      {/* Background Depth Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(173,137,87,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020408] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020408] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24 lg:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-urbanist text-[11px] font-[400] tracking-[0.3em] uppercase text-gold/60 mb-8"
          >
            Metodologia Proprietária
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sora font-[200] text-white text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-tight"
          >
            Um símbolo.
            <span className="block italic text-gold/90 mt-2">Quatro dimensões da Global Mobility Assurance.</span>
          </motion.h2>
        </div>

        {/* Centralized Composition */}
        <div className="relative max-w-7xl mx-auto">
          {/* Connecting Lines/System Visual (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
             <svg className="w-full h-full opacity-10" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="600" cy="300" r="120" stroke="url(#grad1)" strokeWidth="0.5" />
                <line x1="600" y1="180" x2="600" y2="50" stroke="url(#grad1)" strokeWidth="0.5" />
                <line x1="600" y1="420" x2="600" y2="550" stroke="url(#grad1)" strokeWidth="0.5" />
                <line x1="480" y1="300" x2="100" y2="300" stroke="url(#grad1)" strokeWidth="0.5" />
                <line x1="720" y1="300" x2="1100" y2="300" stroke="url(#grad1)" strokeWidth="0.5" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#AD8957" stopOpacity="0" />
                    <stop offset="50%" stopColor="#AD8957" stopOpacity="1" />
                    <stop offset="100%" stopColor="#AD8957" stopOpacity="0" />
                  </linearGradient>
                </defs>
             </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-16 items-start">
            {dimensions.map((dim, idx) => (
              <motion.div
                key={dim.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={cn(
                  "relative flex flex-col items-center text-center transition-all duration-700 ease-out",
                  hoveredIndex !== null && hoveredIndex !== idx && "opacity-30 blur-[1px] scale-[0.98]"
                )}
              >
                {/* Icon Container with Glow */}
                <div className="relative mb-12 group/icon">
                  <motion.div
                    animate={{ 
                      y: [0, -6, 0],
                      scale: hoveredIndex === idx ? 1.05 : 1
                    }}
                    transition={{ 
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                      scale: { duration: 0.4 }
                    }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-[#0A0D14] backdrop-blur-sm transition-all duration-500 group-hover/icon:border-gold/50"
                  >
                    <img
                      src={dim.icon}
                      alt={dim.title}
                      className="h-9 w-9 object-contain opacity-80 transition-all duration-500 group-hover/icon:opacity-100 group-hover/icon:scale-110"
                      style={{
                        filter: "brightness(0) saturate(100%) invert(63%) sepia(31%) saturate(456%) hue-rotate(358deg) brightness(91%) contrast(86%)",
                        transform: `scale(${dim.iconScale})`,
                      }}
                    />
                    
                    {/* Glow Effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-full bg-gold/5 blur-xl transition-opacity duration-700",
                      hoveredIndex === idx ? "opacity-100" : "opacity-40"
                    )} />
                  </motion.div>
                  
                  {/* Outer Ring */}
                  <div className="absolute -inset-4 border border-gold/5 rounded-full scale-[0.8] opacity-0 group-hover/icon:opacity-100 group-hover/icon:scale-100 transition-all duration-700" />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <span className="block font-urbanist text-[10px] tracking-[0.4em] uppercase text-gold/40">
                    {dim.id}
                  </span>
                  
                  <h3 className="font-sora font-[300] text-white text-[24px] lg:text-[28px] leading-tight transition-colors duration-500 group-hover:text-gold">
                    {dim.title}
                  </h3>

                  <div className="h-px w-12 bg-gold/20 mx-auto" />

                  <p className="font-urbanist font-[400] text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-2">
                    {dim.concept}
                  </p>

                  <p className="font-urbanist font-[300] text-[15px] text-w35 leading-[1.8] min-h-[120px]">
                    {dim.description}
                  </p>

                  <p className="font-urbanist font-[300] text-[13px] text-gold/70 italic mt-6 tracking-wide">
                    {dim.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
