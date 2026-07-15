import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";

import { HumanMobilitySection } from "@/components/sections/HumanMobilitySection";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços MOOVIA — Life Transition™ e Human Mobility Risk Assurance Program™" },
      {
        name: "description",
        content:
          "Duas formas de coordenar mobilidade internacional: Strategic Discovery Call para pessoas e famílias, e Human Mobility Risk Assurance Program™ para empresas.",
      },
      { property: "og:title", content: "Serviços MOOVIA — Global Mobility Success" },
      {
        property: "og:description",
        content:
          "Strategic Discovery Call + Human Mobility Risk Assurance Program™. A metodologia MOOVIA para pessoas e empresas.",
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
              Os nossos programas
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,64px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-8 max-w-[900px]"
            >
              Duas formas de coordenar{" "}
              <span className="text-gold-l italic font-[300]">mobilidade internacional.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.7] max-w-[720px]"
            >
              Para pessoas e famílias. Para empresas. A mesma metodologia MOOVIA, aplicada ao mandato de cada cliente.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-body text-[14px] md:text-[15px] font-[300] italic text-white/60 leading-[1.7] max-w-[720px]"
            >
              Atendemos particulares e empresas de todos os tamanhos. Cada proposta é construída à medida da necessidade — não existe um cardápio fixo.
            </motion.p>
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

      {/* BLOCO 2 — Human Mobility Risk Assurance Program (empresas) */}
      <HumanMobilitySection />
    </SiteLayout>
  );
}
