import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FormSection } from "@/components/sections/FormSection";
import { useWhatsappEnabled } from "@/hooks/useWhatsappEnabled";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Vamos tornar as missões internacionais mais bem-sucedidas." },
      { name: "description", content: "Descubra como a MOOVIA ajuda a sua empresa a antecipar riscos humanos, apoiar colaboradores e famílias e melhorar os resultados das missões internacionais." },
      { property: "og:title", content: "Vamos tornar as missões internacionais mais bem-sucedidas." },
      { property: "og:description", content: "Descubra como a MOOVIA ajuda a sua empresa a antecipar riscos humanos, apoiar colaboradores e famílias e melhorar os resultados das missões internacionais." },
      { property: "og:url", content: "https://moovia.global/contacto" },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/contacto" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MOOVIA",
        url: "https://moovia.global",
        email: "contacto@mooviaglobal.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rua Visconde de Santarém",
          addressLocality: "Lisboa",
          postalCode: "1009-287",
          addressCountry: "PT",
        },
        contactPoint: [{
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "contacto@mooviaglobal.com",
          areaServed: ["PT", "BR"],
          availableLanguage: ["pt-PT", "pt-BR", "en", "es"],
        }],
      }),
    }],
  }),
  component: Contacto,
});

function Contacto() {
  const whatsappEnabled = useWhatsappEnabled();
  const channels = [
    { label: "E-mail institucional", value: "contacto@mooviaglobal.com", href: "mailto:contacto@mooviaglobal.com" },
    { label: "E-mail direto (Frederico Prado)", value: "frederico.prado@mooviaglobal.com", href: "mailto:frederico.prado@mooviaglobal.com" },
    ...(whatsappEnabled ? [{ label: "WhatsApp", value: "+351 910 388 877", href: "https://wa.me/351910388877" }] : []),
    { label: "LinkedIn (empresa)", value: "/company/moovia-portugal", href: "https://www.linkedin.com/company/moovia-portugal" },
    { label: "Horário", value: "Segunda a Sexta das 09h às 18h (horário de Lisboa)" },
  ];

  return (
    <SiteLayout>
      {/* 1. Hero */}
      <div className="bg-black pt-[120px]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-[80px] py-16 lg:py-20 text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-[#9B7A50] mb-8"
          >
            Contacto
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(40px,6vw,72px)] font-[200] leading-[1.05] tracking-[-0.03em] mb-12 text-[#9B7A50] max-w-4xl"
          >
            Vamos tornar as missões internacionais mais bem-sucedidas.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-[760px] border-l-[3px] border-[#9B7A50] pl-6 space-y-4"
          >
            <p className="font-urbanist text-[15px] font-[300] text-white leading-relaxed">
              Descubra como a MOOVIA ajuda a sua empresa a antecipar riscos humanos, apoiar colaboradores e famílias e melhorar os resultados das missões internacionais.
            </p>
            <p className="font-urbanist text-[15px] font-[300] text-white leading-relaxed">
              Vamos falar das suas necessidades de Global Mobility.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. The first step (FormSection) */}
      <FormSection />

      {/* 3. Canais diretos + Lisboa */}
      <section className="bg-black px-6 md:px-[80px] py-16 border-t border-b18">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-px bg-b18">
          <div className="bg-black-2 p-10 md:p-14">
            <h2 className="font-sora text-[28px] font-[200] text-white mb-10 text-center lg:text-left">Canais diretos</h2>
            <ul className="divide-y divide-b18">
              {channels.map((c) => (
                <li key={c.label} className="py-5 flex items-baseline justify-between gap-6">
                  <span className="font-urbanist text-[11px] tracking-[0.22em] uppercase text-gold">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="font-urbanist text-[15px] text-white/80 hover:text-gold transition-colors text-right">{c.value}</a>
                  ) : (
                    <span className="font-urbanist text-[15px] text-white/80 text-right">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black-2 p-10 md:p-14">
            <h2 className="font-sora text-[28px] font-[200] text-white mb-6 text-center lg:text-left">Lisboa · Portugal</h2>
            <p className="font-urbanist text-[15px] font-[300] text-w35 leading-relaxed mb-6 text-center lg:text-left">
              Rua Visconde de Santarém<br />
              1009-287 Lisboa<br />
              Portugal
            </p>
            <div className="aspect-[16/10] border border-b18 overflow-hidden">
              <iframe
                title="MOOVIA, Lisboa"
                src="https://www.google.com/maps?q=Rua+Visconde+de+Santar%C3%A9m+32,+1009-287+Lisboa,+Portugal&output=embed"
                loading="lazy"
                className="w-full h-full grayscale-[0.6] contrast-110"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
