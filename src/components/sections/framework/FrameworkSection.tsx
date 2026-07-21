import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Users, 
  ShieldCheck, 
  GitBranch, 
  Target
} from "lucide-react";
import { RotatingLogo } from "@/components/ui/RotatingLogo";

const dimensions = [
  {
    id: "01",
    title: "Human Intelligence",
    verb: "Compreendemos",
    icon: Users,
    description: "Toda decisão estratégica começa por compreender pessoas, contexto e objetivos. Combinamos análise humana, experiência internacional e inteligência contextual para identificar os fatores que realmente influenciam o sucesso de uma mobilidade internacional.",
    quote: "Better intelligence creates better decisions.",
    position: { top: "15%", left: "50%" },
    textPosition: "top"
  },
  {
    id: "02",
    title: "Risk Assurance",
    verb: "Antecipamos",
    icon: ShieldCheck,
    description: "Transformamos incerteza em previsibilidade. Identificamos riscos humanos, familiares e operacionais antes que comprometam integração, produtividade ou retenção.",
    quote: "From uncertainty to informed decisions.",
    position: { top: "50%", left: "85%" },
    textPosition: "right"
  },
  {
    id: "04",
    title: "Global Mobility Success",
    verb: "Garantimos",
    icon: Target,
    description: "O verdadeiro objetivo nunca foi apenas mudar de país. Medimos o sucesso pela integração sustentável, retenção, estabilidade e impacto de longo prazo para pessoas, famílias e organizações.",
    quote: "Arrival is a milestone. Success is the destination.",
    position: { top: "85%", left: "50%" },
    textPosition: "bottom"
  },
  {
    id: "03",
    title: "Global Coordination",
    verb: "Orquestramos",
    icon: GitBranch,
    description: "Coordenamos especialistas, parceiros e decisões sob uma única estratégia. Garantimos alinhamento entre todas as partes envolvidas para reduzir fricção e aumentar a eficiência da mobilidade internacional.",
    quote: "One strategy. Multiple specialists.",
    position: { top: "50%", left: "15%" },
    textPosition: "left"
  }
];

export function FrameworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section 
      ref={containerRef}
      id="framework-estrategico"
      className="relative min-h-[120vh] bg-[#020617] py-24 md:py-32 px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Background Depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,41,59,0.5),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03] mix-blend-overlay" />
        <RotatingLogo size="120vw" opacity={0.02} duration={200} />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* Header - Minimalist & Editorial */}
        <div className="text-center mb-32 md:mb-48">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-4"
          >
            Metodologia Proprietária
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(32px,5vw,56px)] font-[100] text-white leading-tight"
          >
            O Framework da Inteligência
          </motion.h2>
        </div>

        {/* The Diagram */}
        <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[450px] md:max-w-[650px] flex items-center justify-center">
          
          {/* Central MOOVIA Core */}
          <div className="relative z-30 group cursor-default">
            {/* Concentric Circles */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-12 md:-inset-16 border border-gold/20 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -inset-24 md:-inset-32 border border-gold/10 rounded-full"
            />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 0 40px rgba(173,137,87,0.1)", 
                  "0 0 60px rgba(173,137,87,0.2)", 
                  "0 0 40px rgba(173,137,87,0.1)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-20 h-20 md:w-32 md:h-32 bg-navy border border-gold/30 rounded-full flex items-center justify-center z-40 backdrop-blur-xl"
            >
              <img src="/mooviagold.svg" alt="MOOVIA" className="w-10 md:w-16 h-auto" />
              <div className="absolute inset-0 bg-gold/5 rounded-full animate-pulse" />
            </motion.div>
          </div>

          {/* Connection Lines & Orbit */}
          <svg className="absolute inset-0 w-full h-full z-20 overflow-visible" viewBox="0 0 100 100">
            {/* Main Orbit Circle */}
            <circle 
              cx="50" cy="50" r="35" 
              fill="none" 
              stroke="rgba(173,137,87,0.1)" 
              strokeWidth="0.1" 
            />
            
            {/* Curved Connection Paths */}
            <motion.path
              d="M 50 15 Q 85 15 85 50 Q 85 85 50 85 Q 15 85 15 50 Q 15 15 50 15"
              fill="none"
              stroke="rgba(173,137,87,0.15)"
              strokeWidth="0.1"
              strokeDasharray="1 3"
              animate={{ strokeDashoffset: [0, -4] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Glowing Nodes moving along connections */}
            {dimensions.map((_, i) => (
               <motion.circle
                  key={`node-${i}`}
                  r="0.3"
                  fill="#AD8957"
                  className="filter blur-[1px]"
                  initial={{ offsetDistance: `${i * 25}%` }}
                  animate={{ offsetDistance: [`${i * 25}%`, `${(i + 1) * 25}%`] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    offsetPath: "path('M 50 15 Q 85 15 85 50 Q 85 85 50 85 Q 15 85 15 50 Q 15 15 50 15')",
                    opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.2 : 0.8
                  }}
               />
            ))}
          </svg>

          {/* Dimensions */}
          {dimensions.map((dim, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            const Icon = dim.icon;

            return (
              <div 
                key={dim.id}
                className="absolute z-50 transition-all duration-700"
                style={{ 
                  top: dim.position.top, 
                  left: dim.position.left,
                  transform: 'translate(-50%, -50%)',
                  opacity: !isAnyHovered || isHovered ? 1 : 0.2
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon Circle */}
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className={`
                    relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-500
                    ${isHovered ? 'bg-gold border-gold text-black shadow-[0_0_40px_rgba(173,137,87,0.5)]' : 'bg-navy/80 border-gold/30 text-gold shadow-[0_0_20px_rgba(0,0,0,0.5)]'}
                    backdrop-blur-md
                  `}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-colors duration-500 ${isHovered ? 'text-black' : 'text-gold'}`} strokeWidth={1} />
                  
                  {/* Halo on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.3 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 border border-gold/50 rounded-full"
                      />
                    )}
                  </AnimatePresence>

                  {/* ID Tag */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gold text-black rounded-full flex items-center justify-center font-display text-[8px] md:text-[10px] font-bold border-2 border-navy">
                    {dim.id}
                  </div>
                </motion.div>

                {/* Text Content - Responsive placement */}
                <div 
                  className={`
                    absolute pointer-events-none transition-all duration-700
                    w-[180px] sm:w-[240px] md:w-[340px]
                    ${dim.textPosition === 'top' ? 'bottom-[130%] left-1/2 -translate-x-1/2 text-center' : ''}
                    ${dim.textPosition === 'bottom' ? 'top-[130%] left-1/2 -translate-x-1/2 text-center' : ''}
                    ${dim.textPosition === 'right' ? 'left-[130%] top-1/2 -translate-y-1/2 text-left' : ''}
                    ${dim.textPosition === 'left' ? 'right-[130%] top-1/2 -translate-y-1/2 text-right' : ''}
                  `}
                >
                  <div className={`transition-all duration-500 ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-80 md:opacity-30 scale-95'}`}>
                    <p className="font-body text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold mb-1 font-[500]">{dim.verb}</p>
                    <h3 className="font-display text-[16px] sm:text-[20px] md:text-[26px] text-white font-[200] mb-3 tracking-tight">{dim.title}</h3>
                    
                    <AnimatePresence>
                      {(isHovered || !isAnyHovered) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-4"
                        >
                          <p className="font-body text-[11px] sm:text-[12px] md:text-[14px] text-w35 leading-relaxed font-[300] line-clamp-3 md:line-clamp-none">
                            {dim.description}
                          </p>
                          <p className="font-display text-[10px] sm:text-[11px] md:text-[13px] text-gold/90 italic font-[300] tracking-wide">
                            {dim.quote}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 25, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-[1px] h-[1px] bg-gold rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
