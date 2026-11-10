import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguageSwitcherEnabled } from "@/hooks/useLanguageSwitcherEnabled";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSiteContent } from "@/lib/useSiteContent";
import { CtaButton } from "@/components/ui/CtaButton";
import logoNavAsset from "@/assets/logo-nav-v8.png.asset.json";

export function Nav() {
  const langEnabled = useLanguageSwitcherEnabled();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale } = useI18n();
  const isPt = locale.startsWith("pt");
  const { data: cms } = useSiteContent();
  const cmsText = (k: string, fb: string) => (isPt && cms && cms[k]) || fb;

  const logoNav = cmsText("brand.logo_nav", logoNavAsset.url);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const links = [
    { name: cmsText("nav.link_para_empresas", t("nav.for_companies", "Para Empresas")), to: "/para-empresas" },
    { name: cmsText("nav.link_para_executivos", t("nav.for_executives", "Para Executivos e Famílias")), to: "/para-executivos-e-familias" },
    { name: cmsText("nav.link_sobre", t("nav.about", "Sobre")), to: "/sobre" },
    { name: cmsText("nav.link_equipa", t("nav.team", "Equipa")), to: "/equipa" },
    { name: cmsText("nav.link_contacto", t("nav.contact", "Contacto")), to: "/contacto" },
  ];

  const handleCtaClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[900] h-[76px] lg:h-[88px] flex items-center px-4 sm:px-6 lg:px-12 transition-all duration-300 ${
        scrolled
          ? "bg-[#06091a]/95 backdrop-blur-[20px] border-b border-b18 shadow-lg"
          : "bg-gradient-to-b from-[#06091a]/95 via-[#06091a]/80 to-[#06091a]/25 backdrop-blur-[6px]"
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2.5 sm:gap-3 mr-auto group shrink-0">
        <img
          src="/mooviagold.png"
          alt=""
          aria-hidden="true"
          className="h-[32px] sm:h-[36px] lg:h-[44px] w-auto object-contain transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]"
        />
        <img
          src={logoNav}
          alt="MOOVIA"
          className="h-[44px] sm:h-[52px] lg:h-[64px] w-auto object-contain brightness-110 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>

      {/* LINKS (Desktop) */}
      <div className="hidden lg:flex items-center gap-7 xl:gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="typo-caption font-semibold text-gold-l hover:text-white transition-colors relative group drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* CTA + Language (Desktop) */}
      <div className="hidden lg:flex items-center gap-4 ml-auto">
        {langEnabled && <LanguageSwitcher />}
        <CtaButton
          to="/contacto"
          onClick={handleCtaClick}
          size="nav"
        >
          {t("nav.cta")}
        </CtaButton>
      </div>

      {/* Mobile CTA + language + hamburger */}
      <div className="lg:hidden flex items-center gap-2 ml-auto">
        <CtaButton
          to="/contacto"
          onClick={handleCtaClick}
          size="compact"
        >
          {t("nav.cta")}
        </CtaButton>
        {langEnabled && <LanguageSwitcher compact />}
        <button
          className="flex flex-col gap-[6px] z-[1001] p-2.5 rounded border border-gold/40 bg-[#06091a]/60 min-w-10 min-h-10 items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div
            className={`w-6 h-[2px] bg-gold transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <div
            className={`w-6 h-[2px] bg-gold transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-6 h-[2px] bg-gold transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              backgroundColor: "#06091a",
              zIndex: 1000,
            }}
            className="flex flex-col items-center justify-center gap-7 px-6 overflow-y-auto"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="typo-h3 text-gold hover:text-gold-l transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <CtaButton
                to="/contacto"
                onClick={handleCtaClick}
                className="px-6 py-3.5"
              >
                {t("nav.cta")}
              </CtaButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
