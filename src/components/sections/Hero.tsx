import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import heroMedia from "@/assets/moovia-pt.gif.asset.json";

const HERO_MEDIA_URL = heroMedia.url;
const HERO_BG = "#06091a";

export function Hero() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const handleScrollToSteps = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-section relative min-h-[100svh] flex flex-col lg:flex-row bg-[#06091a] overflow-hidden border-b border-b18">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 10% 90%, rgba(173,137,87,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <div
        key={locale}
        className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center items-start text-left pt-28 pb-14 md:pt-32 md:pb-20 lg:py-32 px-6 lg:pl-20 lg:pr-12"
      >
        <p className="typo-eyebrow mb-5">{t("common.gma")}</p>

        <h1 className="typo-h1 text-white mb-6 max-w-[18ch]">
          {t("hero.title")}
        </h1>

        <p className="typo-body text-w70 mb-8">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Link
            to="/gma"
            hash="contacto"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-l text-black font-semibold typo-caption px-7 py-4 rounded-[2px] transition-colors text-center"
          >
            {t("hero.cta_primary")}
          </Link>

          <a
            href="#como-funciona"
            onClick={handleScrollToSteps}
            className="inline-flex items-center justify-center border border-gold/40 hover:border-gold text-gold hover:text-gold-l font-semibold typo-caption px-7 py-4 rounded-[2px] transition-colors text-center"
          >
            {t("hero.cta_secondary")}
          </a>
        </div>

        <p className="typo-caption text-w70 mt-4">
          {t("hero.microtext")}
        </p>
      </div>

      <div className="relative z-10 block lg:w-1/2 w-full h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[100svh] overflow-hidden flex items-center justify-center bg-[#06091a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            {HERO_MEDIA_URL.toLowerCase().includes(".mp4") ? (
              <video
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover"
              >
                <source src={HERO_MEDIA_URL} type="video/mp4" />
              </video>
            ) : (
              <img
                src={HERO_MEDIA_URL}
                alt="MOOVIA"
                className="w-full h-full object-cover"
                loading="eager"
              />
            )}

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 85% 85% at center, transparent 30%, ${HERO_BG} 100%)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
