import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemAndHelpSection } from "@/components/sections/ProblemAndHelpSection";
import { HomeStepsSection } from "@/components/sections/HomeStepsSection";
import { CompanyGainsSection } from "@/components/sections/CompanyGainsSection";
import { RippleBottomSection } from "@/components/sections/RippleBottomSection";
import { WhoWeSupportSection } from "@/components/sections/WhoWeSupportSection";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Human Risk Intelligence for Global Mobility Success." },
      {
        name: "description",
        content:
          "MOOVIA helps companies and executives manage the human, cultural and family challenges that can compromise international assignments, before they impact performance, retention or business continuity.",
      },
      { property: "og:title", content: "Human Risk Intelligence for Global Mobility Success." },
      {
        property: "og:description",
        content:
          "MOOVIA helps companies and executives manage the human, cultural and family challenges that can compromise international assignments.",
      },
      { property: "og:url", content: "https://moovia.global/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Human Risk Intelligence for Global Mobility Success." },
      {
        name: "twitter:description",
        content:
          "MOOVIA helps companies and executives manage the human, cultural and family challenges that can compromise international assignments.",
      },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "MOOVIA",
          url: "https://moovia.global/",
          description:
            "Human Risk Intelligence for Global Mobility Success.",
        }),
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

      {/* 2. O Problema e Como a MOOVIA Ajuda */}
      <ProblemAndHelpSection />

      {/* 3. Como funciona (AVALIAR, LIGAR E INTERPRETAR, AGIR) */}
      <HomeStepsSection />

      {/* 4. O que a sua empresa ganha (Valor para o negócio e VISIBLE COSTS) */}
      <CompanyGainsSection />

      {/* 5. The Ripple Effect (Secção com 5 frentes de onda e grelha de 5 colunas) */}
      <RippleBottomSection />

      {/* 6. Quem apoiamos (Who We Support) */}
      <WhoWeSupportSection />

      {/* 7. Faixa final de chamada para ação */}
      <FinalCtaStrip />
    </SiteLayout>
  );
}
