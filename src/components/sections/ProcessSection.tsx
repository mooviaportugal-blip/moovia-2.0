import { motion } from "framer-motion";

import { RotatingLogo } from "@/components/ui/RotatingLogo";
// Autoria das fotos removida conforme solicitado


export function ProcessSection() {
  const steps = [
    {
      id: "01",
      tag: "Assessment",
      title: "Identificamos fatores humanos relevantes.",
      body: "",
    },
    {
      id: "02",
      tag: "Human Mobility Intelligence",
      title: "Transformamos esses fatores em indicadores estruturados.",
      body: "Permitindo identificar níveis de exposição, prioridades e sinais de atenção.",
    },
    {
      id: "03",
      tag: "Decision",
      title: "O motor de decisão transforma inteligência em recomendações.",
      body: "Definição de estratégias de mitigação baseadas em dados.",
    },
    {
      id: "04",
      tag: "Monitoring",
      title: "Acompanhamos a evolução dos indicadores.",
      body: "Monitorização contínua ao longo de toda a jornada de mobilidade.",
    },
    {
      id: "05",
      tag: "Assurance",
      title: "Gestão estruturada do sucesso.",
      body: "A organização passa a gerir os fatores humanos que podem comprometer integração, retenção, produtividade e sucesso.",
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
            Global Mobility Assurance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display leading-[1.05] tracking-[-0.03em]"
          >
            <span className="block text-[clamp(32px,5vw,64px)] font-[200] text-white mb-1">
              Global Mobility Success
            </span>
            <span className="block text-[clamp(28px,4.5vw,56px)] font-[300] text-gold-l italic mb-8">
              O MOOVIA Framework
            </span>
            <span className="block text-[16px] md:text-[20px] font-body font-[300] tracking-normal text-w35 leading-[1.6] max-w-[500px] md:max-w-none">
              Cinco etapas. Uma metodologia para identificar, avaliar e acompanhar os fatores humanos da mobilidade internacional.
            </span>
          </motion.h2>

        </div>

        {/* Horizontal step flow */}
        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-b18" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 relative">
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
