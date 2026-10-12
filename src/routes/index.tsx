import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { MarketResearchSection } from "@/components/sections/MarketResearchSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AssessmentSection } from "@/components/sections/AssessmentSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { useText } from "@/lib/useSiteContent";
import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { BusinessModelSection } from "@/components/sections/BusinessModelSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { LisboaGallery } from "@/components/sections/LisboaGallery";
import { HypernovaSection } from "@/components/sections/HypernovaSection";
import { AirplaneScene } from "@/components/AirplaneScene";
import { useAirplaneEnabled } from "@/hooks/useAirplaneEnabled";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOVIA | Global Mobility Assurance" },
      {
        name: "description",
        content:
          "MOOVIA aplica a metodologia Human Mobility Assurance à mobilidade internacional: avaliamos, medimos e mitigamos os fatores humanos que colocam atribuições globais em risco.",
      },
      { name: "author", content: "MOOVIA" },
      { property: "og:title", content: "MOOVIA | Global Mobility Assurance" },
      {
        property: "og:description",
        content:
          "Identificar, medir e mitigar os fatores humanos da mobilidade internacional com Global Mobility Assurance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MOOVIA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOOVIA | Global Mobility Assurance" },
      {
        name: "twitter:description",
        content:
          "Identificar, medir e mitigar os fatores humanos da mobilidade internacional com Global Mobility Assurance.",
      },
    ],
    links: [{ rel: "canonical", href: "https://mooviaglobal.com/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const airplaneEnabled = useAirplaneEnabled();
  const ecossistemaVisible = useText("section.ecossistema.visible", "true") === "true";

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
              Global Mobility Assurance <span className="text-gold text-[10px]">♦</span>
              Human Mobility Assurance <span className="text-gold text-[10px]">♦</span>
              Coordenação de Vida, Carreira e Património <span className="text-gold text-[10px]">♦</span>
              Transição de Vida <span className="text-gold text-[10px]">♦</span>
              Orquestração <span className="text-gold text-[10px]">♦</span>
              Integração <span className="text-gold text-[10px]">♦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <ProblemSection />
      <MarketResearchSection />
      <NossaTeseSection />
      <ProcessSection />

      <AssessmentSection />
      {ecossistemaVisible && <EcossistemaSection />}

      <BusinessModelSection />
      <LisboaGallery />
      <HypernovaSection />

      <BlogTeaserSection />
    </SiteLayout>
  );
}
