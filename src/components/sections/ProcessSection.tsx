import { motion } from "framer-motion";

import { RotatingLogo } from "@/components/ui/RotatingLogo";
// Autoria das fotos removida conforme solicitado


export function ProcessSection() {
  const steps = [
    {
      id: "01",
      tag: "Medir",
      title: "Coleta estruturada de dados humanos.",
      body: "Transformamos o contexto subjetivo do executivo e da família em indicadores objetivos de prontidão e risco.",
    },
    {
      id: "02",
      tag: "Compreender",
      title: "Análise multidimensional profunda.",
      body: "Cruzamos sinais humanos com o contexto da missão para identificar as causas raiz de qualquer fricção na adaptação.",
    },
    {
      id: "03",
      tag: "Acompanhar",
      title: "Monitorização contínua do progresso.",
      body: "Acompanhamento estruturado ao longo dos marcos críticos da jornada para garantir que a integração permanece no rumo certo.",
    },
    {
      id: "04",
      tag: "Agir",
      title: "Intervenção coordenada e precisa.",
      body: "Quando a inteligência identifica uma necessidade, acionamos as soluções e especialistas certos para mitigar desvios.",
    },
  ];


  return (
    <section id="processo" className="bg-black py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden">
      <RotatingLogo size="min(110vw,1400px)" opacity={0.03} duration={140} />
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="max-w-3xl mb-20 text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Human Mobility Assurance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display leading-[1.05] tracking-[-0.03em]"
          >
            <span className="block text-[clamp(32px,5vw,64px)] font-[200] text-white mb-1">
              HUMAN MOBILITY ASSURANCE
            </span>
            <span className="block text-[clamp(28px,4.5vw,56px)] font-[300] text-gold-l italic mb-8">
              Medir · Compreender · Acompanhar · Agir
            </span>
            <span className="block text-[16px] md:text-[20px] font-body font-[300] tracking-normal text-w35 leading-[1.6] max-w-[500px] md:max-w-none">
              Quatro etapas. Uma metodologia para medir, compreender e acompanhar os fatores humanos através do nosso dashboard de mobilidade internacional.
            </span>
          </motion.h2>

        </div>

        {/* Horizontal step flow */}
        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-b18" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`relative w-12 h-12 border flex items-center justify-center font-display text-[14px] transition-all duration-300 z-10 ${
                      i === 0
                        ? "bg-gold text-black border-gold"
                        : "border-b18 bg-black text-gold group-hover:bg-gold group-hover:text-black"
                    }`}
                  >
                    {step.id}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-b18" />
                  )}
                </div>
                <p className="font-body text-[11px] font-[400] text-gold-m uppercase tracking-[0.15em] mb-3">
                  {step.tag}
                </p>
                <h3 className="font-display text-[22px] font-[300] text-white mb-4 leading-tight">
                  {step.title}
                </h3>
                {/* Autoria e fotos removidas conforme solicitado */}
                <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] mb-6">
                  {step.body}
                </p>
                {i === 0 && (
                  <div className="mb-6" />
                )}


              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
