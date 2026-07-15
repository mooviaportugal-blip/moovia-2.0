import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições, MOOVIA Portugal" },
      { name: "description", content: "Termos e condições de utilização do site e dos serviços de consultoria boutique da MOOVIA Portugal." },
      { property: "og:title", content: "Termos e Condições, MOOVIA Portugal" },
      { property: "og:url", content: "https://mooviaportugal.com/termos" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/termos" }],
  }),
  component: () => <LegalPage slug="termos-condicoes" />,
});
