import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { MarketResearchSection } from "@/components/sections/MarketResearchSection";
import { B2BRiskSection } from "@/components/sections/B2BRiskSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AssessmentSection } from "@/components/sections/AssessmentSection";


import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { FamiliesSection } from "@/components/sections/FamiliesSection";

import { MaiaSection } from "@/components/sections/MaiaSection";

import { FormSection } from "@/components/sections/FormSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { LisboaGallery } from "@/components/sections/LisboaGallery";
import { AirplaneScene } from "@/components/AirplaneScene";
import { useAirplaneEnabled } from "@/hooks/useAirplaneEnabled";
import { motion } from "framer-motion";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "MOOVIA Portugal — Human Mobility Assurance" },
      { name: "description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal. MOOVIA — Human Mobility Assurance | Global Mobility Success Framework™" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: HomeReal,
});

function HomeReal() {
  const airplaneEnabled = useAirplaneEnabled();
  return (
    <SiteLayout>
      {airplaneEnabled && <AirplaneScene />}
      <Hero />

      <div className="bg-black/80 border-y border-b18 h-[46px] flex items-center overflow-hidden relative z-20">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-16 px-16 font-urbanist text-[11px] font-[400] tracking-[0.24em] uppercase text-w35">
              Global Mobility Success <span className="text-gold text-[10px]">♦</span>
              Global Mobility Success Assessment™ <span className="text-gold text-[10px]">♦</span>
              Coordenação de Vida, Carreira e Património <span className="text-gold text-[10px]">♦</span>
              Life Transition <span className="text-gold text-[10px]">♦</span>
              Human Mobility Risk Assurance <span className="text-gold text-[10px]">♦</span>
              Orchestration <span className="text-gold text-[10px]">♦</span>
              Integration <span className="text-gold text-[10px]">♦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <ProblemSection />
      <MarketResearchSection />
      <B2BRiskSection />
      <ProcessSection />

      <AssessmentSection />
      <EcossistemaSection />
      
      <FamiliesSection />
      <LisboaGallery />
      
      <BlogTeaserSection />
      <MaiaSection />
      
      <FormSection />
    </SiteLayout>
  );
}
