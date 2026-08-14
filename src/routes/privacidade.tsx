import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade, MOOVIA Portugal Portugal" },
      { name: "description", content: "Como a MOOVIA Portugal recolhe, trata e protege os seus dados pessoais, em conformidade com o RGPD." },
      { property: "og:title", content: "Política de Privacidade, MOOVIA Portugal Portugal" },
      { property: "og:url", content: "https://moovia.global/privacidade" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/privacidade" }],
  }),
  component: () => <LegalPage slug="politica-privacidade" />,
});
