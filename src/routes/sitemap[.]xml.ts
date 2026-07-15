import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://mooviaportugal.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/assessment", changefreq: "monthly", priority: "0.9" },
  { path: "/empresas", changefreq: "monthly", priority: "0.9" },
  { path: "/perguntas-frequentes", changefreq: "monthly", priority: "0.7" },
  { path: "/servicos", changefreq: "monthly", priority: "0.8" },
  { path: "/equipa", changefreq: "monthly", priority: "0.7" },
  { path: "/sobre", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.6" },
  { path: "/contacto", changefreq: "yearly", priority: "0.5" },
  { path: "/privacidade", changefreq: "yearly", priority: "0.2" },
  { path: "/cookies", changefreq: "yearly", priority: "0.2" },
  { path: "/termos", changefreq: "yearly", priority: "0.2" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
