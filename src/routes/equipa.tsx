import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
import { EquipaShowcase } from "@/components/sections/EquipaShowcase";
import { JornadaCliente } from "@/components/sections/JornadaCliente";

export const Route = createFileRoute("/equipa")({
  head: () => ({
    meta: [
      { title: "Nossa Equipa, 12 Especialistas para sua Transição para Portugal | MOOVIA" },
      { name: "description", content: "Advogados, especialistas em imóveis, educação, psicologia, comunidades e património. 12 profissionais coordenados para acompanhar cada fase da sua jornada para Portugal." },
      { property: "og:title", content: "Nossa Equipa, 12 Especialistas para sua Transição" },
      { property: "og:description", content: "Advogados, imobiliário, educação, psicologia, comunidades e património. 12 profissionais coordenados pela MOOVIA." },
      { property: "og:url", content: "https://mooviaportugal.com/equipa" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Equipa MOOVIA, 12 especialistas" },
      { name: "twitter:description", content: "Multidisciplinares. Cada decisão importante coordenada por quem entende dela." },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/equipa" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Equipa MOOVIA Portugal",
          itemListElement: [
            { "@type": "ListItem", position: 1, item: { "@type": "Person", name: "Frederico Prado", jobTitle: "Founder & CEO", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" }, url: "https://www.linkedin.com/in/fredericoprado/" } },
            { "@type": "ListItem", position: 2, item: { "@type": "Person", name: "Pablo Alejandro Saco Paim", jobTitle: "Co-Founder", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" } } },
            { "@type": "ListItem", position: 3, item: { "@type": "Person", name: "João Gabriel Prado", jobTitle: "Co-Founder & Legal Counsel", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" } } },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://mooviaportugal.com/" },
            { "@type": "ListItem", position: 2, name: "Equipa", item: "https://mooviaportugal.com/equipa" },
          ],
        }),
      },
    ],
  }),
  component: Equipa,
});

function Equipa() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden bg-black pt-[120px]">
        <RotatingLogo size="min(90vw,1100px)" opacity={0.025} duration={150} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-[80px] py-20">
          <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-gold" />
            A equipa
          </p>
          <h1 className="font-sora text-[clamp(40px,6vw,72px)] font-[100] leading-[1.05] text-white">
            Multidisciplinar.<br />Por desenho, não por acaso.
          </h1>
          <p className="mt-10 max-w-2xl font-urbanist text-[17px] font-[300] text-w35 leading-relaxed">
            Doze especialistas, uma só coordenação. Direito, fiscalidade, imobiliário, educação, património e mobilidade internacional, pessoas que viveram o caminho antes de o coordenarem para si.
          </p>
        </div>
      </div>

      <JornadaCliente />

      <EquipaShowcase />
    </SiteLayout>
  );
}
