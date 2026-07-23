import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguageSwitcherEnabled } from "@/hooks/useLanguageSwitcherEnabled";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSiteContent } from "@/lib/useSiteContent";

export function Nav() {
  const langEnabled = useLanguageSwitcherEnabled();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale } = useI18n();
  const isPt = locale.startsWith("pt");
  const { data: cms } = useSiteContent();
  const cmsText = (k: string, fb: string) => (isPt && cms && cms[k]) || fb;

  const logoIcon = cmsText("brand.logo_icon", "/mooviagold.png");
  const logoWord = cmsText("brand.logo_wordmark", "/moovia-logotype.png");

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
    { name: cmsText("nav.link_servicos", t("nav.services")), to: "/servicos" },
    { name: cmsText("nav.link_hma", "Human Mobility Assurance"), to: "/empresas" },
    { name: cmsText("nav.link_sobre", t("nav.about")), to: "/sobre" },
    { name: cmsText("nav.link_equipa", t("nav.team")), to: "/equipa" },
    { name: cmsText("nav.link_insights", "Insights"), to: "/blog" },
    { name: cmsText("nav.link_contacto", t("nav.contact")), to: "/contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[900] h-[76px] lg:h-[88px] flex items-center px-5 lg:px-12 transition-all duration-300 ${
        scrolled ? "bg-[#06091a]/92 backdrop-blur-[20px] border-b border-b18" : "bg-transparent"
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 mr-auto group">
        <img src={logoIcon} alt="MOOVIA" className="w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
        <div className="hidden lg:flex flex-col items-start h-[40px] justify-center">
          <img src={logoWord} alt="MOOVIA Portugal" className="h-[38px] w-auto object-contain brightness-110" />
        </div>
      </Link>

      {/* LINKS (Desktop) */}
      <div className="hidden lg:flex items-center gap-7 xl:gap-11">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="font-body font-[400] text-[12px] tracking-[0.14em] uppercase text-w35 hover:text-white transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>


      {/* CTA + Language (Desktop) */}
      <div className="hidden lg:flex items-center gap-3 ml-auto">
        {langEnabled && <LanguageSwitcher />}

      </div>


      {/* Mobile language + hamburger */}
      <div className="lg:hidden flex items-center gap-3 ml-auto">
        {langEnabled && <LanguageSwitcher compact />}
        <button
          className="flex flex-col gap-[6px] z-[1001] p-3 -mr-2 rounded border border-gold/40 bg-[#06091a]/60 min-w-11 min-h-11 items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className={`w-7 h-[2px] bg-gold transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-7 h-[2px] bg-gold transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-7 h-[2px] bg-gold transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              backgroundColor: "#06091a",
              zIndex: 1000,
            }}
            className="flex flex-col items-center justify-center gap-8 overflow-y-auto"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-[200] text-[22px] text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
