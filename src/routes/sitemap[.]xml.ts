import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { isLegalConfigured } from "@/config/legalConstants";

const BASE_URL = "https://moovia.global";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const baseEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/para-empresas", changefreq: "monthly", priority: "0.9" },
  { path: "/para-executivos-e-familias", changefreq: "monthly", priority: "0.9" },
  { path: "/assessment", changefreq: "monthly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.8" },
  { path: "/equipa", changefreq: "monthly", priority: "0.7" },
  { path: "/contacto", changefreq: "yearly", priority: "0.5" },
  { path: "/termos", changefreq: "yearly", priority: "0.2" },
];

const entries: SitemapEntry[] = isLegalConfigured
  ? [
      ...baseEntries,
      { path: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
      { path: "/termos-de-consentimento", changefreq: "yearly", priority: "0.3" },
      { path: "/cookies", changefreq: "yearly", priority: "0.2" },
    ]
  : baseEntries;

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
