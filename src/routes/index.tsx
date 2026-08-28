import { createFileRoute } from "@tanstack/react-router";
import { MaintenancePage } from "@/components/site/MaintenancePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOVIA | Evolving" },
      { name: "description", content: "MOOVIA is Evolving. We are currently partnering with Hypernova to refine MOOVIA's next-generation positioning, product architecture, and global go-to-market strategy. The next chapter of MOOVIA arrives in September 2026." },
      { property: "og:title", content: "MOOVIA | Evolving" },
      { property: "og:description", content: "MOOVIA is Evolving. The next chapter of MOOVIA arrives in September 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOOVIA | Evolving" },
      { name: "twitter:description", content: "MOOVIA is Evolving. The next chapter of MOOVIA arrives in September 2026." },
    ],
    links: [{ rel: "canonical", href: "https://mooviaglobal.com/" }],
  }),
  component: MaintenancePage,
});
