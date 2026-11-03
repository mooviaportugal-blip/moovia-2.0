import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "@/i18n";

export function FinalCtaStrip() {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/gma") {
      e.preventDefault();
      const target =
        document.getElementById("contacto") ??
        document.getElementById("lead-form");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section-spacing relative w-full bg-[#09183D] border-t border-b border-gold/25 px-6 lg:px-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(173,137,87,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[960px] text-center flex flex-col items-center">
        <h2 className="typo-h2 text-white mb-4">
          {t("home.final_cta.title")}
        </h2>
        <p className="typo-body text-w70 mb-8 text-center">
          {t("home.final_cta.body")}
        </p>
        <Link
          to="/gma"
          hash="contacto"
          onClick={handleClick}
          className="inline-flex items-center justify-center bg-gold hover:bg-gold-l text-black font-semibold typo-caption px-8 py-4 rounded-[2px] transition-colors"
        >
          {t("home.final_cta.button")}
        </Link>
      </div>
    </section>
  );
}

