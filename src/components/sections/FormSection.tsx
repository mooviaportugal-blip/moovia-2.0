import { motion } from "framer-motion";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export function FormSection() {
  return (
    <section
      id="lead-form"
      className="bg-black-2 py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative scroll-mt-24 border-t border-b18"
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
            className="font-sora text-[clamp(28px,3.5vw,44px)] font-[200] text-white leading-tight mb-6"
          >
            O primeiro passo consiste na conversa certa.
          </motion.h2>

          {/* Item 8: Linha "Marque uma chamada ou envie-nos uma mensagem" */}
          <p className="font-urbanist text-[17px] font-[500] text-white mb-2">
            Marque uma chamada ou envie-nos uma mensagem
          </p>

          {/* Item 9: Link do agendamento (espaço reservado sem URL -> texto sem link) */}
          <p className="font-urbanist text-[15px] font-[300] text-gold-l mb-8">
            marque uma chamada de 30 minutos com a nossa equipa
          </p>

          <div className="space-y-6 max-w-lg mb-10">
            <p className="font-urbanist text-[16px] font-[300] text-w35 leading-[1.9]">
              Uma conversa direta para entender o seu caso e mostrar como a MOOVIA pensa. Quer pretenda conhecer o Global Mobility Assurance para a sua empresa ou planear a sua própria transição com segurança, a nossa equipa ajuda a identificar e avaliar os fatores humanos e a definir a melhor estratégia.
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
