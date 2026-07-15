import { Link } from "@tanstack/react-router";
import { LinkedinLogo, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWhatsappEnabled } from "@/hooks/useWhatsappEnabled";

const LEGAL_ROUTES: Record<string, string> = {
  "politica-privacidade": "/privacidade",
  "politica-cookies": "/cookies",
  "termos-condicoes": "/termos",
};

export function Footer() {
  const whatsappEnabled = useWhatsappEnabled();
  const [legal, setLegal] = useState<{ slug: string; title: string }[]>([]);
  useEffect(() => {
    supabase
      .from("legal_pages")
      .select("slug,title")
      .order("title")
      .then(({ data }) => {
        if (data) setLegal(data as { slug: string; title: string }[]);
      });
  }, []);
  return (
    <footer className="bg-black-2 border-t border-b18 py-20 px-6 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-4 gap-16 lg:gap-8 mb-20 text-center lg:text-left">
          
          {/* ESQUERDA */}
          <div className="flex flex-col items-center lg:items-start">
            <Link to="/" className="flex flex-col items-center lg:items-start mb-6">
              <img src="/moovia-logotype.png" alt="MOOVIA Portugal" className="h-[40px] w-auto object-contain" />
            </Link>
            <p className="font-urbanist text-[12px] font-[400] tracking-[0.28em] uppercase text-w35 mb-6">Planear · Decidir · Integrar</p>
            <p className="font-urbanist text-[13px] font-[300] text-w35 max-w-[260px] leading-relaxed mx-auto lg:mx-0">
              Global Mobility Success™
            </p>

          </div>

          {/* CENTRO */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <h5 className="font-urbanist font-[500] text-[11px] tracking-[0.2em] uppercase text-gold">Navegação</h5>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              {[
                { label: "Serviços", to: "/servicos" },
                { label: "Empresas", to: "/empresas" },
                { label: "Sobre", to: "/sobre" },
                { label: "Equipa", to: "/equipa" },
                { label: "Blog", to: "/blog" },
                { label: "Contacto", to: "/contacto" },
              ].map((l) => (
                <a key={l.label} href={l.to} className="font-urbanist text-[14px] font-[300] text-w70 hover:text-gold-l transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* POLÍTICAS */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <h5 className="font-urbanist font-[500] text-[11px] tracking-[0.2em] uppercase text-gold">Políticas</h5>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              {legal.map((p) => {
                const to = LEGAL_ROUTES[p.slug];
                if (!to) return null;
                return (
                  <Link key={p.slug} to={to} className="font-urbanist text-[14px] font-[300] text-w70 hover:text-gold-l transition-colors">
                    {p.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <h5 className="font-urbanist font-[500] text-[11px] tracking-[0.2em] uppercase text-gold">Contacto</h5>
            <div className="flex flex-col gap-3 font-urbanist text-[14px] font-[300] text-w70 items-center lg:items-start">
              <a href="mailto:contacto@mooviaglobal.com" className="hover:text-gold-l transition-colors">contacto@mooviaglobal.com</a>
              <a href="tel:+351910388877" className="hover:text-gold-l transition-colors">Telefone · +351 910 388 877</a>
              {whatsappEnabled && (
                <a href="https://wa.me/351910388877" className="hover:text-gold-l transition-colors">WhatsApp · +351 910 388 877</a>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <a href="https://www.linkedin.com/company/moovia-portugal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-11 h-11 text-w70 hover:text-gold-l transition-colors">
                <LinkedinLogo size={22} weight="thin" />
              </a>
              <a href="https://www.instagram.com/mooviapt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center w-11 h-11 text-w70 hover:text-gold-l transition-colors">
                <InstagramLogo size={22} weight="thin" />
              </a>
              {whatsappEnabled && (
                <a href="https://wa.me/351910388877" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex items-center justify-center w-11 h-11 text-w70 hover:text-gold-l transition-colors">
                  <WhatsappLogo size={22} weight="thin" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-b18 flex flex-col md:flex-row justify-between items-center gap-6 font-urbanist text-[12px] font-[300] text-w35">
          <span>© 2026 MOOVIA Portugal · Todos os direitos reservados</span>
          <span>
            Desenvolvido por{" "}
            <a href="https://www.linkedin.com/in/guilherme-souza-ux/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-l transition-colors">
              Guilherme Souza
            </a>
          </span>
          <div className="flex gap-8">
            {legal.map((p) => {
              const to = LEGAL_ROUTES[p.slug];
              if (!to) return null;
              return (
                <Link key={p.slug} to={to} className="hover:text-gold-l transition-colors">
                  {p.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* LEGAL DISCLAIMER */}
        <div className="pt-8 text-center">
          <p
            className="font-urbanist mx-auto"
            style={{
              fontSize: "12px",
              color: "rgba(249,245,236,0.4)",
              maxWidth: "800px",
              lineHeight: 1.6,
            }}
          >
            A MOOVIA Portugal não presta serviços de gestão de património, consultoria para investimentos, intermediação financeira ou aconselhamento financeiro. Sempre que necessário, os clientes poderão ser encaminhados para parceiros independentes devidamente qualificados e regulados para essas atividades.
          </p>
        </div>
      </div>
    </footer>
  );
}
