import { motion } from "framer-motion";

export const WhoWeAreSection = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-12 lg:px-24 border-b border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold font-urbanist text-[11px] font-bold tracking-[0.3em] uppercase block mb-8"
        >
          Quem somos
        </motion.span>
        
        <div className="space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-urbanist text-lg md:text-xl leading-relaxed font-light"
          >
            A MOOVIA Portugal está a definir a categoria Global Mobility 
            Assurance, uma disciplina dedicada à gestão dos fatores humanos que 
            determinam o sucesso de uma mobilidade internacional. Através de 
            uma metodologia própria, indicadores específicos e acompanhamento 
            contínuo, ajudamos as organizações a identificar, medir e mitigar 
            riscos antes que estes impactem o colaborador, a família ou o 
            negócio.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-w35 font-urbanist text-lg md:text-xl leading-relaxed font-light"
          >
            A nossa solução complementa os serviços de imigração, relocation e 
            consultoria, fornecendo às equipas de RH, Global Mobility e gestão 
            de topo informação objetiva para acompanhar cada missão 
            internacional ao longo do tempo. Desta forma, as empresas podem 
            tomar decisões mais informadas, aumentar a taxa de sucesso das 
            mobilidades e proteger o retorno do investimento realizado.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
