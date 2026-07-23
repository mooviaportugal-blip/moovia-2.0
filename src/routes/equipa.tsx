import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
import { EquipaShowcase } from "@/components/sections/EquipaShowcase";
import { JornadaCliente } from "@/components/sections/JornadaCliente";
import { LinhaMooverSection } from "@/components/sections/LinhaMooverSection";

export const Route = createFileRoute("/equipa")({
  head: () => ({
    meta: [
      { title: "Nossa Equipa e Rede de Parceiros | MOOVIA" },
      { name: "description", content: "Oito pessoas coordenam. Uma rede de parceiros executa quando é preciso. A MOOVIA integra estratégia, direito, fiscalidade, tecnologia e a dimensão humana." },
      { property: "og:title", content: "Nossa Equipa e Rede de Parceiros" },
      { property: "og:description", content: "Oito pessoas coordenam. Uma rede de parceiros executa quando é preciso." },
      { property: "og:url", content: "https://mooviaportugal.com/equipa" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Equipa e Rede MOOVIA" },
      { name: "twitter:description", content: "Oito pessoas coordenam. Uma rede de parceiros executa." },
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
            { "@type": "ListItem", position: 2, item: { "@type": "Person", name: "Pablo Alejandro Saco Paim", jobTitle: "Co-Founder & CPTO", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" } } },
            { "@type": "ListItem", position: 3, item: { "@type": "Person", name: "Dra. Letícia de Mello", jobTitle: "Co-Founder & CSO", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" } } },
            { "@type": "ListItem", position: 4, item: { "@type": "Person", name: "João Gabriel Prado", jobTitle: "Co-Founder & Legal Counsel", worksFor: { "@type": "Organization", name: "MOOVIA Portugal" } } },
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
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-8"
          >
            A equipa
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.03em] mb-14"
          >
            <span className="block font-[200] text-white mb-2">Oito pessoas coordenam.</span>
            <span className="block font-[300] italic text-gold-l">Uma rede executa quando é preciso.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-[720px] border-l-[3px] border-gold/40 pl-6 space-y-6"
          >
            <p className="font-display text-[20px] md:text-[24px] font-[300] text-white/90 leading-[1.5]">
              O Global Mobility Success Framework integra estratégia, direito, fiscalidade, tecnologia e a dimensão humana dentro da MOOVIA.
            </p>
            <p className="font-body text-[16px] md:text-[18px] font-[300] text-white/60 leading-[1.8]">
              E quando surgem as necessidades operacionais de cada mobilidade, orquestramos uma rede de parceiros especializados para executar com precisão.
            </p>
          </motion.div>
        </div>
      </div>

      <JornadaCliente />

      <LinhaMooverSection />

      <HistoriaPrecedeEquipa />

      <EquipaShowcase />
    </SiteLayout>
  );
}

function HistoriaPrecedeEquipa() {
  const paragrafos = [
    "A MOOVIA não nasce de uma ideia isolada. Nasce da amizade de décadas e de duas trajetórias que se cruzaram no mundo corporativo internacional, entre Revenue Assurance, grandes consultorias e tecnologia empresarial, e que viveram na pele os desafios humanos da mobilidade internacional.",
    "Depois de anos a proteger o investimento das empresas em processos e receita, decidimos aplicar a mesma disciplina de rigor, evidência e rastreabilidade a algo que nunca teve essa proteção: o investimento humano da mobilidade internacional.",
    "Dessa convicção, de que os fatores que mais determinam o sucesso de uma mobilidade raramente são medidos, nasce a MOOVIA.",
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[860px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
          A história que precede a equipa
        </p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-12">
          Antes das pessoas, <span className="italic text-gold-l">a convicção.</span>
        </h2>
        <div className="space-y-6">
          {paragrafos.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9]"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
