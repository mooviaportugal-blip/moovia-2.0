import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WhoWeAreSection = () => {
  const stats = [
    { label: "Metodologia própria", icon: "◈" },
    { label: "Indicadores específicos", icon: "◈" },
    { label: "Acompanhamento contínuo", icon: "◈" },
  ];

  return (
    <section className="bg-black py-24 px-6 md:px-12 lg:px-24 border-b border-white/5 relative overflow-hidden z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column: Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-gold font-urbanist text-[11px] font-bold tracking-[0.3em] uppercase block mb-4">
              Quem somos
            </span>
            <div className="h-px w-12 bg-gold/60 mb-8" />
          </motion.div>
          
          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white font-urbanist text-2xl md:text-3xl leading-relaxed font-light"
            >
              A MOOVIA Portugal está a definir a categoria <span className="text-gold-l font-normal italic">Global Mobility Assurance</span>, uma disciplina dedicada à gestão dos fatores humanos que determinam o sucesso de uma mobilidade internacional.
            </motion.p>

            <div className="h-px w-full bg-white/5 my-8" />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-w35 font-urbanist text-lg leading-relaxed font-light"
            >
              Através de uma metodologia própria, indicadores específicos e acompanhamento contínuo, ajudamos as organizações a identificar, medir e mitigar riscos antes que estes impactem o colaborador, a família ou o negócio.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-w35 font-urbanist text-lg leading-relaxed font-light"
            >
              A nossa solução complementa os serviços de imigração, relocation e consultoria, fornecendo às equipas de RH, Global Mobility e gestão de topo informação objetiva para acompanhar cada missão internacional ao longo do tempo.
            </motion.p>

            {/* Badges/Stats */}
            <div className="pt-8 flex flex-wrap gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full bg-gold/5"
                >
                  <span className="text-gold text-xs">{stat.icon}</span>
                  <span className="text-gold font-urbanist text-[10px] font-bold tracking-wider uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Brand Element (Orbital Nucleus) */}
        <div className="relative flex justify-center lg:justify-end order-first lg:order-last mb-12 lg:mb-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-20 h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-full border border-gold/20 bg-black/40 flex items-center justify-center p-12 backdrop-blur-xl"
          >
            <img 
              src="/mooviagold.svg" 
              alt="MOOVIA" 
              className="w-full h-full object-contain brightness-0 invert opacity-90 mt-4" 
            />
            {/* Pulsing light rings around the icon */}
            <div className="absolute inset-0 rounded-full border border-gold/5 scale-110" />
            <div className="absolute inset-0 rounded-full border border-gold/5 scale-125 opacity-50" />
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl animate-pulse" />
          </motion.div>
          
          {/* Subtle background orbital dots effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[120%] h-[120%] border border-gold/5 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="w-[140%] h-[140%] border border-gold/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
          </div>
        </div>
      </div>
    </section>
  );
};