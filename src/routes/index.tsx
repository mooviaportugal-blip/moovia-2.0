import { createFileRoute, redirect } from "@tanstack/react-router";
import { MaintenancePage } from "@/components/site/MaintenancePage";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/home",
    });
  },
  head: () => ({
    meta: [
      { title: "MOOVIA Portugal | Global Mobility Assurance" },
      { name: "description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal: visto, moradia, escola, fiscalidade e adaptação familiar. Global Mobility Assurance e Global Mobility Success Framework." },
      { property: "og:title", content: "MOOVIA Portugal | Global Mobility Assurance" },
      { property: "og:description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal: visto, moradia, escola, fiscalidade e adaptação familiar. Global Mobility Assurance e Global Mobility Success Framework." },
      { property: "og:url", content: "https://mooviaportugal.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "MOOVIA Portugal | Global Mobility Assurance" },
      { name: "twitter:description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal. Global Mobility Assurance e Global Mobility Success Framework." },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/" }],
  }),
  component: () => <MaintenancePage />,
});