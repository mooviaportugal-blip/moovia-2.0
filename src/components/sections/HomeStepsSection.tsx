import { useTranslation } from "react-i18next";
import "@/i18n";
import { ClipboardCheck, Compass, Activity, Check, type LucideIcon } from "lucide-react";

export interface StepCardData {
  number: string;
  icon: LucideIcon;
  title: string;
  highlight: string;
  body: string;
  items: string[];
}

export function HomeStepsSection() {
  const { t } = useTranslation();

  const steps: StepCardData[] = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: t("home.steps.step1_title"),
      highlight: t("home.steps.step1_highlight"),
      body: t("home.steps.step1_body"),
      items: [
        t("home.steps.step1_item1"),
        t("home.steps.step1_item2"),
        t("home.steps.step1_item3"),
      ],
    },
    {
      number: "02",
      icon: Compass,
      title: t("home.steps.step2_title"),
      highlight: t("home.steps.step2_highlight"),
      body: t("home.steps.step2_body"),
      items: [
        t("home.steps.step2_item1"),
        t("home.steps.step2_item2"),
        t("home.steps.step2_item3"),
      ],
    },
    {
      number: "03",
      icon: Activity,
      title: t("home.steps.step3_title"),
      highlight: t("home.steps.step3_highlight"),
      body: t("home.steps.step3_body"),
      items: [
        t("home.steps.step3_item1"),
        t("home.steps.step3_item2"),
        t("home.steps.step3_item3"),
      ],
    },
  ];

  return (
    <section
      id="como-funciona"
      className="section-spacing bg-black px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 md:mb-16">
          <p className="typo-eyebrow mb-4">{t("home.steps.eyebrow")}</p>
          <h2 className="typo-h2 text-white">{t("home.steps.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col justify-between h-full rounded-sm transition-colors hover:border-gold/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <span className="font-urbanist text-[13px] tracking-[0.2em] uppercase text-[#9B7A50] font-[600]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-urbanist text-[16px] md:text-[18px] font-[600] tracking-wider uppercase text-[#9B7A50] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-urbanist text-[15px] font-[500] text-white leading-snug mb-3">
                    {step.highlight}
                  </p>
                  <p className="typo-body text-w70 mb-6">{step.body}</p>
                </div>

                <ul className="pt-5 border-t border-b18 space-y-2.5">
                  {step.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-[14px] font-urbanist text-white/85"
                    >
                      <Check size={14} className="text-[#9B7A50] shrink-0" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
