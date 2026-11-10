import { CtaButton } from "@/components/ui/CtaButton";
import { useTranslation } from "react-i18next";
import "@/i18n";

interface FinalCtaStripProps {
  title?: string;
  buttonText?: string;
  subtitle?: string;
  line?: string;
  buttonTo?: string;
  children?: React.ReactNode;
}

export function FinalCtaStrip({
  title,
  buttonText,
  subtitle,
  line,
  buttonTo = "/contacto",
  children,
}: FinalCtaStripProps = {}) {
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

  const resolvedTitle = title ?? t("home.final_cta.title");
  const resolvedBody = subtitle !== undefined ? subtitle : t("home.final_cta.body");
  const resolvedLine = line !== undefined ? line : (title ? undefined : t("home.final_cta.line"));
  const resolvedButton = buttonText ?? t("home.final_cta.button");

  return (
    <section id="final-cta-section" className="section-spacing relative w-full bg-[#09183D] border-t border-b border-gold/25 px-6 lg:px-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(173,137,87,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[960px] text-center flex flex-col items-center">
        <h2 className="typo-h2 text-white mb-4 max-w-[800px]">
          {resolvedTitle}
        </h2>
        {children ? (
          <div className="mb-8 space-y-4 max-w-[760px] text-center">
            {children}
          </div>
        ) : (
          <div className="mb-8 space-y-3 max-w-[760px] text-center">
            {resolvedBody && (
              <p className="typo-body text-w70 max-w-[700px] mx-auto leading-relaxed">
                {resolvedBody}
              </p>
            )}
            {resolvedLine && (
              <p className="font-urbanist text-[15px] md:text-[16px] font-[500] text-white/90">
                {resolvedLine}
              </p>
            )}
          </div>
        )}
        <CtaButton to={buttonTo} onClick={handleClick}>
          {resolvedButton}
        </CtaButton>
      </div>
    </section>
  );
}

