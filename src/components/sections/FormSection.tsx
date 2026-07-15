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
            O primeiro passo é a conversa certa.
          </motion.h2>
          <div className="space-y-6 max-w-lg mb-10">
            <p className="font-urbanist text-[16px] font-[300] text-w35 leading-[1.9]">
              A sua primeira conversa será sempre com um dos fundadores da MOOVIA.
            </p>
            <p className="font-urbanist text-[16px] font-[300] text-white leading-[1.9]">
              Sem script. Sem chatbot.
            </p>
            <p className="font-urbanist text-[16px] font-[300] text-w35 leading-[1.9]">
              Preencha o formulário e a equipa MOOVIA entrará em contacto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/assessment"
              className="inline-flex items-center justify-center border border-b30 bg-transparent text-w35 font-urbanist font-[400] text-[12px] tracking-[0.2em] uppercase px-8 py-4 transition-colors hover:border-gold-l hover:text-white"
            >
              Conhecer o Strategic Assessment
            </a>
          </div>
        </div>

        <div>
          <UnifiedLeadForm context="home" />
        </div>
      </div>
    </section>
  );
}
