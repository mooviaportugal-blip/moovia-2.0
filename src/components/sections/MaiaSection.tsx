import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function MaiaSection() {
  const openMaia = () => {
    window.dispatchEvent(new CustomEvent("maia:open"));
  };

  return (
    <section className="bg-black py-24 md:py-32 px-6 lg:px-20 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(173,137,87,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[860px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
        >
          Converse com a MAIA
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-[200] text-white leading-[1.08] tracking-[-0.03em] text-[clamp(28px,4vw,52px)] mb-8"
        >
          Ainda tem dúvidas?{" "}
          <span className="text-gold-l italic font-[300]">A MAIA pode ajudar.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[16px] md:text-[17px] font-[300] text-white/65 leading-[1.85] space-y-5 max-w-[640px] mx-auto"
        >
          <p>A MAIA é a assistente inteligente da MOOVIA.</p>
          <p>
            Foi desenvolvida para responder às suas questões sobre mobilidade
            internacional, explicar a nossa metodologia e ajudá-lo a
            compreender qual o programa mais adequado para o seu caso.
          </p>
          <p className="text-white/80">Pode começar por aqui.</p>
          <p className="italic text-white/55">
            Quando fizer sentido, um especialista da MOOVIA dará continuidade
            ao processo.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={openMaia}
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold/60 text-gold hover:text-black font-body font-[600] text-[11px] md:text-[12px] tracking-[0.24em] uppercase px-10 py-5 isolate transition-colors"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <MessageCircle size={16} className="relative z-10" strokeWidth={1.5} />
            <span className="relative z-10">Conversar com a MAIA</span>
          </button>

          <p
            className="mt-6 italic max-w-[480px] mx-auto"
            style={{
              fontSize: "12px",
              color: "rgba(249, 245, 236, 0.45)",
              lineHeight: 1.7,
            }}
          >
            A MAIA aprende com cada mobilidade internacional que coordenamos, como parte do compromisso da MOOVIA em construir a base de conhecimento mais completa sobre sucesso em mobilidade internacional.
            parte do compromisso da MOOVIA em construir a base de conhecimento
            mais completa sobre sucesso em mobilidade internacional.
          </p>
        </div>
      </div>
    </section>
  );
}
