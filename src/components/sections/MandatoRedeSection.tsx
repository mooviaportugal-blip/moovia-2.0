import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function MandatoRedeSection() {
  return (
    <section className="bg-black-2 py-[100px] md:py-[140px] px-6 lg:px-20 border-y border-b18">
      <div className="mx-auto max-w-[1100px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
        >
          Da estratégia à execução
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,4vw,52px)] mb-8"
        >
          O mandato <span className="italic text-gold-l">aciona a rede.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.85] max-w-[820px] mx-auto mb-12"
        >
          Depois do diagnóstico, o mandato coordena a execução através da rede
          de parceiros orquestrados pela MOOVIA — reduzindo o tempo entre a
          decisão e a produtividade real do talento contratado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/equipa"
            hash="rede-parceiros"
            className="group relative overflow-hidden inline-flex bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gold leading-tight">
              Conhecer a Rede de Parceiros
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
