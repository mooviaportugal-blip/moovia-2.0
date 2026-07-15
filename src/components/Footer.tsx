import { useTranslation } from "react-i18next";
import { useSiteContent } from "@/lib/useSiteContent";

export const Footer = () => {
  const { t } = useTranslation();
  const { data: cms } = useSiteContent();
  const cx = (k: string, fb: string) => (cms && cms[k]) || fb;

  const email = cx("footer.email", "contacto@mooviaglobal.com");
  const phone = cx("footer.phone", "+351 910 388 877");
  const whatsapp = cx("footer.whatsapp", "351910388877");
  const linkedin = cx("footer.linkedin", "https://www.linkedin.com/company/moovia-portugal");
  const address = cx("footer.address", "Rua Visconde de Santarém · 1009-287 Lisboa · PT");
  const rights = cx("footer.rights", t("footer.rights"));
  const tagline = cx("footer.tagline", t("footer.tagline"));

  return (
    <footer className="bg-black-2 border-t border-border pt-[72px] pb-10 px-8">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-20 mb-20">
        <div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-urbanist font-bold text-2xl text-white">MOO</span>
            <span className="font-urbanist font-bold text-2xl text-gold-l">VIA</span>
          </div>
          <div className="font-urbanist font-normal text-[12px] uppercase tracking-[0.28em] text-white/20">
            {tagline}
          </div>
        </div>

        <div>
          <h4 className="font-urbanist font-normal text-[10px] uppercase tracking-widest text-white/20 mb-6">{t("footer.services")}</h4>
          <ul className="space-y-4 font-urbanist font-light text-[13px] text-white/40">
            <li><a href="/assessment" className="hover:text-gold transition-colors">{cx("nav.link_assessment", "Avaliação Estratégica")}</a></li>
            <li><a href="/servicos" className="hover:text-gold transition-colors">{cx("nav.link_servicos", "Serviços")}</a></li>
            <li><a href="/blog" className="hover:text-gold transition-colors">{cx("nav.link_blog", "Blog")}</a></li>
            <li><a href="/sobre" className="hover:text-gold transition-colors">{cx("nav.link_sobre", "Sobre")}</a></li>
            <li><a href="/equipa" className="hover:text-gold transition-colors">{cx("nav.link_equipa", "Equipa")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-urbanist font-normal text-[10px] uppercase tracking-widest text-white/20 mb-6">{t("footer.contact")}</h4>
          <ul className="space-y-4 font-urbanist font-light text-[13px] text-white/40">
            <li><a href="/contacto" className="hover:text-gold transition-colors">{cx("nav.link_contacto", "Contacto")}</a></li>
            <li><a href={`mailto:${email}`} className="hover:text-gold transition-colors">{email}</a></li>
            <li><a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">{phone}</a></li>
            <li><a href={`https://wa.me/${whatsapp}`} className="hover:text-gold transition-colors">WhatsApp</a></li>
            <li><a href={linkedin} className="hover:text-gold transition-colors">LinkedIn</a></li>
            <li className="text-white/30">{address}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto border-t border-border pt-8 flex flex-col md:flex-row justify-between gap-4 font-urbanist font-light text-[12px] text-white/20">
        <div>{rights}</div>
        <div className="flex gap-6">
          <a href="/privacidade" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
          <a href="/cookies" className="hover:text-white transition-colors">{t("footer.cookies")}</a>
          <a href="/termos" className="hover:text-white transition-colors">Termos</a>
        </div>
      </div>
    </footer>
  );
};
