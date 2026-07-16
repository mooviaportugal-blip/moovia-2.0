import { motion } from "framer-motion";
import { RotatingLogo } from "@/components/ui/RotatingLogo";

export function FoundersSection() {
  return (
    <section id="sobre" className="bg-black py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative z-10 overflow-hidden">
      <RotatingLogo size="min(110vw,1500px)" opacity={0.025} duration={150} />
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Fundadores
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(32px,4.5vw,72px)] font-[200] text-white leading-[0.95] tracking-[-0.04em] mb-12"
          >
            "Antes de coordenar<br/>transições internacionais,<br/>vivemos as nossas."
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] font-[300] text-w35 leading-[1.85] max-w-[600px]"
          >
            Background internacional em tecnologia, consultoria e serviços. Cada sócio passou pelo processo que coordenamos. Essa experiência não é marketing: é o único diferencial que nenhum concorrente consegue replicar.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
