import { motion } from "framer-motion";

export function NossaTeseSection() {
  return (
    <section className="bg-black py-20 md:py-28 lg:py-36 px-6 lg:px-20 relative overflow-hidden">
      <div className="mx-auto max-w-[1100px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-10"
        >
          Nosso Insight
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(26px,3.6vw,52px)] font-[200] text-white leading-[1.15] tracking-[-0.03em] mb-6"
        >
          <span className="block">A avaliação da mobilidade internacional</span>
          <span className="block text-white/60 font-[300]">continua focada no momento da chegada.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(18px,2vw,26px)] font-[300] text-w35 leading-[1.5] max-w-[820px] mx-auto mb-16"
        >
          O retorno sobre o investimento depende, no entanto, da capacidade do colaborador e da sua família se integrarem, permanecerem e prosperarem num novo contexto.
          <br className="hidden md:block" />
          <span className="text-gold-l italic block mt-2">Esta é a única métrica que efetivamente mitiga a taxa de insucesso.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <div className="w-16 h-px bg-gold/40" />
          <span className="font-body text-[10px] tracking-[0.32em] uppercase text-gold/70">
            Brand Statement
          </span>
          <div className="w-16 h-px bg-gold/40" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-display italic text-[clamp(22px,2.8vw,38px)] font-[300] text-gold-l leading-[1.35] max-w-[900px] mx-auto"
        >
          "International mobility should not be measured by arrival.
          <br />
          It should be measured by successful integration."
        </motion.blockquote>
      </div>
    </section>
  );
}
