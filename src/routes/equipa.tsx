import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EquipaShowcase } from "@/components/sections/EquipaShowcase";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";
import { RotatingLogo } from "@/components/ui/RotatingLogo";

export const Route = createFileRoute("/equipa")({
    head: () => ({
        meta: [
            { title: "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela." },
            {
                name: "description",
                content:
                    "A MOOVIA nasceu de uma amizade de décadas e de dois percursos profissionais que se cruzaram no mundo corporativo internacional, passando por Revenue Assurance, grandes consultoras e tecnologia empresarial, a par de experiência direta dos desafios humanos da mobilidade internacional.",
            },
            { property: "og:title", content: "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela." },
            {
                property: "og:description",
                content:
                    "A MOOVIA nasceu de uma amizade de décadas e de dois percursos profissionais que se cruzaram no mundo corporativo internacional, passando por Revenue Assurance, grandes consultoras e tecnologia empresarial, a par de experiência direta dos desafios humanos da mobilidade internacional.",
            },
            { property: "og:url", content: "https://moovia.global/equipa" },
            { property: "og:type", content: "website" },
            { property: "og:image", content: "https://moovia.global/og-image.jpg" },
            { name: "twitter:title", content: "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela." },
            {
                name: "twitter:description",
                content:
                    "A MOOVIA nasceu de uma amizade de décadas e de dois percursos profissionais que se cruzaram no mundo corporativo internacional, passando por Revenue Assurance, grandes consultoras e tecnologia empresarial, a par de experiência direta dos desafios humanos da mobilidade internacional.",
            },
            { name: "twitter:image", content: "https://moovia.global/og-image.jpg" },
        ],
        links: [{ rel: "canonical", href: "https://moovia.global/equipa" }],
        scripts: [
            {
                type: "application/ld+json",
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: "https://moovia.global/" },
                        { "@type": "ListItem", position: 2, name: "Equipa", item: "https://moovia.global/equipa" },
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
            <div className="relative overflow-hidden bg-black pt-36 pb-10 md:pt-48 md:pb-14">
                <RotatingLogo size="min(90vw,1100px)" opacity={0.035} duration={150} />
                <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-[80px]">
                    <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-3 md:mb-5">
                        Conheça a equipa
                    </p>

                    <h1 className="equipa-hero-title font-[300] text-gold w-full mb-0">
                        Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela.
                    </h1>
                </div>
            </div>

            <EquipaShowcase />

            <FinalCtaStrip />
        </SiteLayout>
    );
}
