import { motion } from "framer-motion";
import { RotatingLogo } from "@/components/ui/RotatingLogo";

export function ManifestoSection() {
  return (
    <section className="bg-black py-20 md:py-32 lg:py-40 px-6 lg:px-20 relative text-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(15,31,65,.4) 0%, transparent 70%)",
        }}
      />
      <RotatingLogo size="min(140vw,1800px)" opacity={0.035} duration={120} />

      <div className="mx-auto max-w-[1400px] relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-12"
        >
          A posição da marca
        </motion.p>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[200px] font-[200] text-gold opacity-[0.03] select-none pointer-events-none">
          ∞
        </div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-[clamp(26px,4.5vw,60px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] max-w-[960px] mb-10"
        >
          A qualidade da nossa coordenação é mais importante<br className="hidden md:block" />{" "}
          do que a quantidade de projetos.
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          className="h-px bg-gold mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[17px] font-[300] text-w35 leading-[1.9] max-w-[620px] mb-8"
        >
          Cada mobilidade internacional é única.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-body text-[17px] font-[300] text-w35 leading-[1.9] max-w-[620px] mb-8"
        >
          É por isso que privilegiamos um acompanhamento próximo, estratégico e
          personalizado, garantindo que cada cliente beneficia da atenção,
          coordenação e visão integrada que caracterizam a metodologia MOOVIA.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-[16px] font-[300] text-w35 italic max-w-[620px]"
        >
          O nosso compromisso não é crescer a qualquer custo. É preservar a
          qualidade de cada projeto que aceitamos.
        </motion.p>
      </div>
    </section>
  );
}
