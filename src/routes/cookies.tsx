import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies, MOOVIA Portugal" },
      { name: "description", content: "Como a MOOVIA Portugal utiliza cookies e tecnologias semelhantes neste site." },
      { property: "og:title", content: "Política de Cookies, MOOVIA Portugal" },
      { property: "og:url", content: "https://mooviaportugal.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/cookies" }],
  }),
  component: () => <LegalPage slug="politica-cookies" />,
});
