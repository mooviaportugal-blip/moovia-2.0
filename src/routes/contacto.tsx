import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FormSection } from "@/components/sections/FormSection";
import { AvailabilitySection } from "@/components/sections/AvailabilitySection";
import { useWhatsappEnabled } from "@/hooks/useWhatsappEnabled";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto, MOOVIA Portugal | Lisboa" },
      { name: "description", content: "Fale com a MOOVIA Portugal em Lisboa. Formulário, e-mail, WhatsApp e LinkedIn. Cada contacto é respondido pessoalmente." },
      { property: "og:title", content: "Contacto MOOVIA Portugal" },
      { property: "og:description", content: "Sediados em Lisboa. O primeiro passo é a conversa certa." },
      { property: "og:url", content: "https://mooviaportugal.com/contacto" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/contacto" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MOOVIA Portugal",
        url: "https://mooviaportugal.com",
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
    { label: "E-mail", value: "contacto@mooviaglobal.com", href: "mailto:contacto@mooviaglobal.com" },
    ...(whatsappEnabled ? [{ label: "WhatsApp", value: "+351 910 388 877", href: "https://wa.me/351910388877" }] : []),
    { label: "LinkedIn", value: "/company/moovia-portugal", href: "https://www.linkedin.com/company/moovia-portugal" },
    { label: "Horário", value: "Seg–Sex 09h–18h (horário de Lisboa)" },
  ];

  return (
    <SiteLayout>
      <div className="bg-black pt-[120px]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-[80px] py-16 text-center lg:text-left">
          <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center justify-center lg:justify-start gap-3">
            <span className="w-6 h-px bg-gold" />
            Contacto
          </p>
          <h1 className="font-sora text-[clamp(28px,4.5vw,52px)] font-[100] leading-[1.05] max-w-3xl mx-auto lg:mx-0 text-white">
            Vamos coordenar a sua mobilidade<br />internacional, do diagnóstico<br />à integração.
          </h1>
          <div className="mt-8 max-w-2xl mx-auto lg:mx-0 space-y-5 font-urbanist text-[17px] font-[300] text-w35 leading-relaxed">
            <p>
              A MOOVIA não resolve tarefas isoladas. Coordenamos toda a jornada, do planejamento à adaptação dos primeiros meses em Portugal.
            </p>
            <p>
              Porque o verdadeiro diferencial da MOOVIA não é imigração, casa ou escola. É o que acontece entre essas coisas.
            </p>
          </div>
        </div>

      </div>

      {/* Canais + Localização */}
      <section className="bg-black px-6 md:px-[80px] pb-16">
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
                title="MOOVIA Portugal, Lisboa"
                src="https://www.google.com/maps?q=Rua+Visconde+de+Santar%C3%A9m+32,+1009-287+Lisboa,+Portugal&output=embed"
                loading="lazy"
                className="w-full h-full grayscale-[0.6] contrast-110"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <AvailabilitySection />
      <FormSection />
    </SiteLayout>
  );
}
