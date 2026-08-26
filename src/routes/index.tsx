import { createFileRoute } from "@tanstack/react-router";
import { MaintenancePage } from "@/components/site/MaintenancePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOVIA | Em evolução" },
      { name: "description", content: "A MOOVIA está a evoluir. Em parceria com a Hypernova, estamos a preparar a próxima geração do posicionamento e da estratégia da MOOVIA. Novo capítulo em setembro de 2026." },
      { property: "og:title", content: "MOOVIA | Em evolução" },
      { property: "og:description", content: "A MOOVIA está a evoluir. O próximo capítulo chega em setembro de 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOOVIA | Em evolução" },
      { name: "twitter:description", content: "A MOOVIA está a evoluir. O próximo capítulo chega em setembro de 2026." },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/" }],
  }),
  component: MaintenancePage,
});
