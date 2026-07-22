import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const dimensions = [
  {
    id: "01",
    title: "Inteligência Humana",
    description: "Toda mobilidade internacional começa pelas pessoas. Antes de qualquer decisão logística, jurídica ou tecnológica, procuramos compreender quem vai viver a mudança: as suas motivações, expectativas, contexto familiar e capacidade de adaptação. É nesta compreensão que nasce uma decisão verdadeiramente inteligente.",
    quote: "Antes dos dados, as pessoas.",
    icon: "/icons/aviao.svg",
    iconScale: 1.16,
    position: "top"
  },
  {
    id: "02",
    title: "Human Mobility Assurance",
    description: "A mobilidade internacional envolve riscos humanos que raramente são medidos. A MOOVIA transforma fatores como adaptação, integração, expectativas e bem-estar em inteligência estruturada para apoiar decisões mais seguras. Não eliminamos a incerteza, reduzimo-la através de método, evidência e acompanhamento.",
    quote: "O que compreendemos, podemos proteger.",
    icon: "/icons/ponte.svg",
    iconScale: 1.28,
    position: "right"
  },
  {
    id: "03",
    title: "Coordenação Global",
    description: "Uma decisão de mobilidade nunca depende de um único especialista. Questões jurídicas, imigração, habitação, educação, património e integração precisam de atuar de forma coordenada. A MOOVIA orquestra este ecossistema para que cada decisão fortaleça as restantes.",
    quote: "Nenhuma decisão isolada.",
    icon: "/icons/pessoa.svg",
    iconScale: 0.9,
    position: "bottom"
  },
  {
    id: "04",
    title: "Global Mobility Success",
    description: "O verdadeiro sucesso não acontece quando alguém chega a um novo país. Acontece quando essa pessoa se integra, permanece, produz e constrói uma vida sustentável ao longo do tempo. É assim que a MOOVIA mede uma mobilidade internacional bem-sucedida.",
    quote: "O sucesso não é chegar. É permanecer.",
    icon: "/icons/casa.svg",
    iconScale: 0.95,
    position: "left"
  },
];

export function MethodologySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 lg:py-64 bg-[#01040A] overflow-hidden">
      {/* Background Depth Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(173,137,87,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#01040A] via-transparent to-[#01040A]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-32 lg:mb-48">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-urbanist text-[11px] font-[400] tracking-[0.4em] uppercase text-gold/60 mb-8"
          >
            Metodologia Proprietária
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-sora font-[200] text-white text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-tight"
          >
            Um símbolo.
            <span className="block italic text-gold/90 mt-2">Planejar · Chegar · Permanecer.</span>
          </motion.h2>
        </div>

        {/* Orbital Layout */}
        <div className="relative w-full max-w-5xl mx-auto aspect-square md:aspect-auto md:min-h-[800px] flex items-center justify-center">
          
          {/* Orbital Rings & Connections */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Concentric Rings */}
            <div className="absolute h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full border border-gold/5" />
            <div className="absolute h-[500px] w-[500px] md:h-[650px] md:w-[650px] rounded-full border border-gold/5" />
            
            {/* SVG Connections (Desktop) */}
            <svg className="absolute w-full h-full hidden md:block" viewBox="0 0 1000 800" fill="none">
              <defs>
                <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#AD8957" stopOpacity="0" />
                  <stop offset="50%" stopColor="#AD8957" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#AD8957" stopOpacity="0" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Curved connections using Paths */}
              <motion.path 
                d="M500,250 C500,350 500,350 500,400" 
                stroke="url(#orbit-grad)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              />
              <motion.path 
                d="M500,550 C500,450 500,450 500,400" 
                stroke="url(#orbit-grad)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              />
              <motion.path 
                d="M300,400 C400,400 400,400 500,400" 
                stroke="url(#orbit-grad)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              />
              <motion.path 
                d="M700,400 C600,400 600,400 500,400" 
                stroke="url(#orbit-grad)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              />

              {/* Moving light nodes */}
              {dimensions.map((_, i) => (
                <motion.circle
                  key={`node-${i}`}
                  r="1.5"
                  fill="#AD8957"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    offsetDistance: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: "linear"
                  }}
                  style={{
                    offsetPath: i === 0 ? "path('M500,250 C500,350 500,350 500,400')" : 
                               i === 1 ? "path('M700,400 C600,400 600,400 500,400')" :
                               i === 2 ? "path('M500,550 C500,450 500,450 500,400')" :
                                         "path('M300,400 C400,400 400,400 500,400')"
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Central Nucleus */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{ 
              scale: [1, 1.03, 1],
              boxShadow: ["0 0 20px rgba(173,137,87,0.1)", "0 0 40px rgba(173,137,87,0.2)", "0 0 20px rgba(173,137,87,0.1)"]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 h-24 w-24 md:h-32 md:w-32 rounded-full border border-gold/30 bg-black flex items-center justify-center p-6 backdrop-blur-xl"
          >
            <img 
              src="/logo.svg" 
              alt="MOOVIA" 
              className="w-full h-full object-contain brightness-0 invert opacity-90" 
            />
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-2xl animate-pulse" />
          </motion.div>

          {/* Orbital Dimensions */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:pointer-events-auto">
            {dimensions.map((dim, idx) => (
              <motion.div
                key={dim.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className={cn(
                  "absolute pointer-events-auto transition-all duration-700 ease-out flex flex-col items-center group",
                  dim.position === "top" && "top-0 md:-top-12 left-1/2 -translate-x-1/2",
                  dim.position === "bottom" && "bottom-0 md:-bottom-12 left-1/2 -translate-x-1/2",
                  dim.position === "left" && "left-0 md:-left-12 top-1/2 -translate-y-1/2",
                  dim.position === "right" && "right-0 md:-right-12 top-1/2 -translate-y-1/2",
                  hoveredIndex !== null && hoveredIndex !== idx && "opacity-20 blur-[2px] scale-[0.95]"
                )}
              >
                {/* Content Box */}
                <div className={cn(
                  "relative max-w-[280px] md:max-w-[320px] p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md text-center transition-all duration-500",
                  hoveredIndex === idx ? "border-gold/30 bg-gold/[0.05] shadow-[0_0_50px_rgba(173,137,87,0.1)] scale-105" : ""
                )}>
                  {/* Floating Icon */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    className="mx-auto h-16 w-16 mb-6 rounded-full border border-gold/20 bg-black/40 flex items-center justify-center group-hover:border-gold/50 transition-colors"
                  >
                    <img
                      src={dim.icon}
                      alt={dim.title}
                      className="h-7 w-7 object-contain opacity-60 group-hover:opacity-100 transition-all"
                      style={{
                        filter: "brightness(0) saturate(100%) invert(63%) sepia(31%) saturate(456%) hue-rotate(358deg) brightness(91%) contrast(86%)",
                        transform: `scale(${dim.iconScale})`,
                      }}
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <span className="block font-urbanist text-[10px] tracking-[0.4em] uppercase text-gold/40">
                      {dim.id}
                    </span>
                    <h3 className="font-sora font-[300] text-white text-[20px] leading-tight">
                      {dim.title}
                    </h3>
                    <p className="font-urbanist font-[300] text-[14px] text-w35 leading-[1.7]">
                      {dim.description}
                    </p>
                    <div className="pt-4 border-t border-gold/10">
                      <p className="font-urbanist font-[300] text-[12px] text-gold/70 italic tracking-wide">
                        {dim.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}