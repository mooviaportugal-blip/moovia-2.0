import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { HomeStepsSection } from "@/components/sections/HomeStepsSection";
import { ForWhomSection } from "@/components/sections/ForWhomSection";
import { CompanyGainsSection } from "@/components/sections/CompanyGainsSection";
import { TrustConfidentialitySection } from "@/components/sections/TrustConfidentialitySection";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "MOOVIA | Global Mobility Assurance" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Pré-visualização interna do site MOOVIA. Global Mobility Assurance e acompanhamento da mobilidade internacional para empresas.",
      },
      { property: "og:title", content: "MOOVIA | Global Mobility Assurance" },
      {
        property: "og:description",
        content: "Pré-visualização interna do site MOOVIA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOOVIA | Global Mobility Assurance" },
      {
        name: "twitter:description",
        content: "Pré-visualização interna do site MOOVIA.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* 1. Hero */}
      <Hero />

      {/* 2. O que fazemos, em três passos (#como-funciona) */}
      <HomeStepsSection />

      {/* 3. Para quem é (Contratado pela empresa. Vivido pelo executivo.) */}
      <ForWhomSection />

      {/* 4. O que a sua empresa ganha */}
      <CompanyGainsSection />

      {/* 5. Confiança e confidencialidade */}
      <TrustConfidentialitySection />

      {/* 6. Faixa final de chamada para ação */}
      <FinalCtaStrip />
    </SiteLayout>
  );
}
