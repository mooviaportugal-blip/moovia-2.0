import { useTranslation } from "react-i18next";
import "@/i18n";
import { ShieldCheck, Users, BarChart3, TrendingUp } from "lucide-react";

export function CompanyGainsSection() {
  const { t } = useTranslation();

  const items = [
    {
      icon: ShieldCheck,
      title: t("home.gains.item1_title"),
      body: t("home.gains.item1_body"),
    },
    {
      icon: Users,
      title: t("home.gains.item2_title"),
      body: t("home.gains.item2_body"),
    },
    {
      icon: BarChart3,
      title: t("home.gains.item3_title"),
      body: t("home.gains.item3_body"),
    },
    {
      icon: TrendingUp,
      title: t("home.gains.item4_title"),
      body: t("home.gains.item4_body"),
    },
  ];

  const rippleSteps = (t("home.gains.ripple.steps", { returnObjects: true }) as string[]) || [];

  return (
    <section
      id="ganhos-empresa"
      className="section-spacing bg-black px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 md:mb-12">
          <p className="typo-eyebrow mb-3">{t("home.gains.eyebrow")}</p>
          <h2 className="typo-h2 text-white mb-3">{t("home.gains.title")}</h2>
          <p className="font-urbanist text-[16px] md:text-[18px] font-[400] text-w70 max-w-2xl leading-relaxed">
            {t("home.gains.subtitle")}
          </p>
        </div>

        {/* 4 Cartões com altura reduzida e alinhamento ao topo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="border border-b18 bg-w05 p-6 md:p-7 flex flex-col justify-start items-start h-full rounded-sm transition-colors hover:border-gold/40 text-left"
              >
                <div className="w-10 h-10 rounded-sm border border-[#9B7A50]/40 bg-[#9B7A50]/10 flex items-center justify-center text-[#9B7A50] mb-4 shrink-0">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="typo-h3 text-white mb-2 leading-snug">{item.title}</h3>
                <p className="typo-body text-w70 leading-relaxed text-[14px] md:text-[15px]">{item.body}</p>
              </article>
            );
          })}
        </div>

        {/* Bloco Custos Visíveis (Visible Costs) */}
        <div id="custos-visiveis" className="mt-12 md:mt-16 border border-b18 bg-w05/60 p-7 md:p-10 rounded-sm relative overflow-hidden">
          <p className="typo-eyebrow text-[#9B7A50] mb-2">
            {t("home.gains.ripple.eyebrow")}
          </p>
          <h3 className="font-display text-[26px] sm:text-[34px] md:text-[40px] font-[300] text-[#9B7A50] leading-tight mb-4">
            {t("home.gains.ripple.highlight")}
          </h3>

          <div className="space-y-2.5 font-urbanist text-[15px] md:text-[16px] font-[400] text-white/95 max-w-3xl leading-relaxed mb-7">
            <p>{t("home.gains.ripple.line1")}</p>
            <p className="text-white/80">{t("home.gains.ripple.line2")}</p>
            <p className="text-[#9B7A50] font-[500]">{t("home.gains.ripple.line3")}</p>
          </div>

          {/* Cadeia de 5 passos com anéis concêntricos discretos e setas finas */}
          <ol className="my-7 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 md:gap-1.5">
            {rippleSteps.map((step, idx) => {
              const isLast = idx === rippleSteps.length - 1;
              const ringCount = idx + 1;
              return (
                <li key={idx} className="flex flex-col md:flex-row items-center flex-1 w-full md:w-auto">
                  <div
                    className={`relative w-full flex flex-col items-center justify-center text-center p-3.5 md:p-4 rounded-sm border transition-all ${
                      isLast
                        ? "border-[#9B7A50] bg-[#9B7A50]/15 shadow-[0_0_18px_rgba(155,122,80,0.2)]"
                        : "border-b18 bg-black/40 hover:border-[#9B7A50]/40"
                    }`}
                  >
                    {/* Anéis concêntricos discretos */}
                    <div className="w-11 h-11 flex items-center justify-center relative mb-2" aria-hidden="true">
                      {Array.from({ length: ringCount }).map((_, rIdx) => {
                        const size = 14 + rIdx * 7;
                        return (
                          <span
                            key={rIdx}
                            className="absolute rounded-full border border-[#9B7A50]"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              opacity: 0.2 + (rIdx + 1) * 0.15,
                            }}
                          />
                        );
                      })}
                      <span className={`w-2 h-2 rounded-full ${isLast ? "bg-white" : "bg-[#9B7A50]"}`} />
                    </div>
                    <span className={`font-urbanist text-[13px] md:text-[13.5px] leading-tight ${isLast ? "font-[600] text-white" : "font-[400] text-white/85"}`}>
                      {step}
                    </span>
                  </div>

                  {/* Seta entre passos */}
                  {!isLast && (
                    <div className="flex items-center justify-center text-[#9B7A50] py-1.5 md:py-0 md:px-1.5 shrink-0">
                      <span className="hidden md:inline text-[16px]">→</span>
                      <span className="md:hidden text-[15px]">↓</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="space-y-2.5 font-urbanist text-[14.5px] md:text-[15.5px] text-w70 leading-relaxed max-w-3xl pt-5 border-t border-b18">
            <p className="text-white/90 font-[500]">{t("home.gains.ripple.line5")}</p>
            <p>{t("home.gains.ripple.line6")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

