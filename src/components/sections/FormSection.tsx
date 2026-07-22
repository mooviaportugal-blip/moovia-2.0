import { motion } from "framer-motion";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export function FormSection() {
  return (
    <section
      id="lead-form"
      className="bg-black-2 py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative scroll-mt-24"
    >
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-10 lg:gap-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-urbanist text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            O primeiro passo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sora text-[clamp(28px,3.5vw,44px)] font-[200] text-white leading-tight mb-8"
          >
            O primeiro passo consiste em proteger o seu investimento.
          </motion.h2>
          <div className="space-y-6 max-w-lg mb-10">
            <p className="font-urbanist text-[16px] font-[300] text-w35 leading-[1.9]">
              Quer pretenda proteger o ROI das contratações internacionais da sua empresa ou planear a mobilidade corporativa com segurança, a nossa equipa ajuda a mapear os riscos e a definir a melhor estratégia.
            </p>
          </div>


        </div>

        <div>
          <UnifiedLeadForm context="home" />
        </div>
      </div>
    </section>
  );
}
