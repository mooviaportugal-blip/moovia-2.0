import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { MarketResearchSection } from "@/components/sections/MarketResearchSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { B2BRiskSection } from "@/components/sections/B2BRiskSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { EquipaShowcase } from "@/components/sections/EquipaShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";

import { ApoioPsicologicoStrip } from "@/components/sections/ApoioPsicologicoStrip";
import { AssessmentSection } from "@/components/sections/AssessmentSection";


import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { FamiliesSection } from "@/components/sections/FamiliesSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
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
      { title: "MOOVIA Portugal, Coordenação de Transição Internacional Brasil → Portugal" },
      { name: "description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal: visto, moradia, escola, fiscalidade e adaptação familiar." },
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
              Strategic Assessment <span className="text-gold text-[10px]">♦</span>
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
      <NossaTeseSection />
      <ProcessSection />
      <FoundersSection />
      <EquipaShowcase hideFounders />
      <ApoioPsicologicoStrip />
      <AssessmentSection />
      <EcossistemaSection />
      
      <FamiliesSection />
      <LisboaGallery />
      <ManifestoSection />
      <BlogTeaserSection />
      <MaiaSection />
      
      <FormSection />
    </SiteLayout>
  );
}
