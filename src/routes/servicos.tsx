import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";

import { HumanMobilitySection } from "@/components/sections/HumanMobilitySection";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";

export const Route = createFileRoute("/servicos")({
    head: () => ({
    meta: [
      { title: "Serviços MOOVIA | Global Mobility Assurance" },
      {
        name: "description",
        content:
          "A MOOVIA aplica a metodologia Global Mobility Assurance para identificar, avaliar, mitigar e acompanhar os fatores humanos que influenciam o sucesso da mobilidade internacional.",
      },
      { property: "og:title", content: "Serviços MOOVIA | Global Mobility Assurance" },
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
              <span className="block font-[200] text-white mb-2 italic">Global Mobility Assurance</span>
              <span className="block text-gold-l italic font-[300]">Aumentar a probabilidade de sucesso da mobilidade internacional.</span>
            </motion.h1>
            
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-[14px] md:text-[16px] font-[400] text-gold-l/90 leading-[1.5] max-w-[700px]"
              >
                A nova categoria para reduzir o Human Mobility Risk e transformar a mobilidade internacional numa vantagem competitiva para empresas e colaboradores.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white/50 border-l-2 border-gold/50 pl-6 py-2 italic"
              >
                Contratado pela empresa. Vivido pelo executivo. Medido ao longo do tempo.
              </motion.p>

              <div className="space-y-6 max-w-[800px]">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-[16px] md:text-[18px] font-[600] text-white"
                >
                  Um benefício para o colaborador. Um investimento mensurável para a empresa.
                </motion.p>
                
                <div className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.7] space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-white/90"
                  >
                    Reduzimos Human Mobility Risk para aumentar a probabilidade de Global Mobility Success.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Enquanto o mercado mede vistos emitidos, mudanças concluídas e processos administrativos, a MOOVIA mede aquilo que realmente determina o sucesso de uma mobilidade internacional: o fator humano.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    Através da metodologia Global Mobility Assurance, identificamos, avaliamos, mitigamos e acompanhamos os fatores humanos que influenciam a adaptação, o bem-estar e o desempenho do executivo e da sua família ao longo de toda a jornada internacional.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Esta abordagem transforma fatores humanos em inteligência para reduzir o turnover, acelerar a integração, aumentar a retenção e melhorar os resultados para o RH, para o CFO e para o negócio.
                  </motion.p>
                </div>
              </div>

              {/* ISO Footer Seal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-6 border-t border-white/5"
              >
                <p className="font-body text-[12px] text-white/40 italic tracking-wide">
                  A metodologia Global Mobility Assurance é desenvolvida com base em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000, adaptados ao contexto da mobilidade internacional.
                </p>
              </motion.div>
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
