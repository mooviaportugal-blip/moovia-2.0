import { createFileRoute } from "@tanstack/react-router";
import { MaintenancePage } from "@/components/site/MaintenancePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOVIA | Evolving" },
      { name: "description", content: "MOOVIA is evolving. Working with Hypernova to refine the next generation of MOOVIA's positioning, product architecture and go-to-market strategy. Next chapter launches September 2026." },
      { property: "og:title", content: "MOOVIA | Evolving" },
      { property: "og:description", content: "MOOVIA is evolving. The next chapter launches in September 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOOVIA | Evolving" },
      { name: "twitter:description", content: "MOOVIA is evolving. The next chapter launches in September 2026." },
    ],
    links: [{ rel: "canonical", href: "https://mooviaglobal.com/" }],
  }),
  component: MaintenancePage,
});
