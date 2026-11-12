import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemAndHelpSection } from "@/components/sections/ProblemAndHelpSection";
import { HomeStepsSection } from "@/components/sections/HomeStepsSection";
import { CompanyGainsSection } from "@/components/sections/CompanyGainsSection";
import { RippleBottomSection } from "@/components/sections/RippleBottomSection";
import { WhoWeSupportSection } from "@/components/sections/WhoWeSupportSection";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Inteligência para os riscos humanos das missões internacionais" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "A MOOVIA ajuda empresas e executivos a identificar e gerir os desafios humanos, culturais e familiares que podem comprometer missões internacionais, antes que se transformem em problemas de desempenho, retenção ou repatriação.",
      },
      { property: "og:title", content: "Inteligência para os riscos humanos das missões internacionais" },
      {
        property: "og:description",
        content:
          "A MOOVIA ajuda empresas e executivos a identificar e gerir os desafios humanos, culturais e familiares que podem comprometer missões internacionais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Inteligência para os riscos humanos das missões internacionais" },
      {
        name: "twitter:description",
        content:
          "A MOOVIA ajuda empresas e executivos a identificar e gerir os desafios humanos, culturais e familiares que podem comprometer missões internacionais.",
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

      {/* 5. The Ripple Effect (Nova secção com 5 zonas concêntricas crescentes e narrativa) */}
      <RippleBottomSection />

      {/* 6. Quem apoiamos (Who We Support) */}
      <WhoWeSupportSection />

      {/* 6. Faixa final de chamada para ação */}
      <FinalCtaStrip />
    </SiteLayout>
  );
}
