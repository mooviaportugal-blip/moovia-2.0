import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";

import { HumanMobilitySection } from "@/components/sections/HumanMobilitySection";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";

export const Route = createFileRoute("/servicos")({
    head: () => ({
    meta: [
      { title: "Serviços MOOVIA | Human Mobility Assurance" },
      {
        name: "description",
        content:
          "A MOOVIA aplica a metodologia Human Mobility Assurance, desenvolvida com base em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000, para identificar, avaliar, mitigar e acompanhar os fatores humanos que influenciam o sucesso da mobilidade internacional.",
      },
      { property: "og:title", content: "Serviços MOOVIA | Human Mobility Assurance" },
      {
        property: "og:description",
        content:
          "Uma metodologia. Três intervenientes. Um único objetivo: aumentar a probabilidade de sucesso da mobilidade internacional.",
      },
      { property: "og:url", content: "https://mooviaportugal.com/servicos" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/servicos" }],
  }),
  component: Servicos,
});

function Servicos() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-[#06091a] pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
            >
              A nossa metodologia
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,64px)] leading-[1.05] tracking-[-0.03em] mb-12 max-w-[900px]"
            >
              <span className="block font-[200] text-white mb-2">Uma metodologia. Três intervenientes. Um único objetivo.</span>
              <span className="block text-gold-l italic font-[300]">Aumentar a probabilidade de sucesso da mobilidade internacional.</span>
            </motion.h1>
            
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-[20px] md:text-[22px] font-[300] text-white/90 leading-[1.6] max-w-[760px] border-l-[3px] border-gold pl-6 py-2"
              >
                A MOOVIA aplica a metodologia Human Mobility Assurance, desenvolvida com base em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000, para identificar, avaliar, mitigar e acompanhar os fatores humanos que influenciam o sucesso da mobilidade internacional.
              </motion.p>
              
              <div className="space-y-4 pt-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-[16px] md:text-[18px] font-[300] italic text-white/70 leading-[1.7] max-w-[720px]"
                >
                  Trabalhamos de forma integrada com a empresa, o executivo e a sua família, porque o sucesso de uma mobilidade depende da coordenação entre todos os intervenientes.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="font-body text-[16px] md:text-[18px] font-[300] italic text-white/70 leading-[1.7] max-w-[720px]"
                >
                  Cada programa é adaptado ao papel de quem participa na mobilidade, mantendo uma metodologia baseada em ciência, tecnologia e inteligência aplicada aos fatores humanos.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-body text-[17px] md:text-[19px] font-[600] text-gold-l leading-[1.7] max-w-[720px] pt-4"
                >
                  Porque uma mobilidade internacional bem-sucedida protege simultaneamente o investimento da empresa, o sucesso do executivo e o bem-estar da sua família.
                </motion.p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center"
          >
            <ConstellationLogo size={360} />
          </motion.div>
        </div>
      </section>

      {/* BLOCO 2 — Global Mobility Risk Assurance Program (empresas) */}
      <HumanMobilitySection />
    </SiteLayout>
  );
}
