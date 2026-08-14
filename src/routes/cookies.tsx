import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies, MOOVIA Portugal Portugal" },
      { name: "description", content: "Como a MOOVIA Portugal utiliza cookies e tecnologias semelhantes neste site." },
      { property: "og:title", content: "Política de Cookies, MOOVIA Portugal Portugal" },
      { property: "og:url", content: "https://moovia.global/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/cookies" }],
  }),
  component: () => <LegalPage slug="politica-cookies" />,
});
