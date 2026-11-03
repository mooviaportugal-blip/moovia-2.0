import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { ClipboardCheck, Compass, Activity, ArrowRight, type LucideIcon } from "lucide-react";

export interface StepCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function StepCard({ icon: Icon, title, body }: StepCardProps) {
  return (
    <article className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col h-full transition-colors hover:border-gold/40">
      <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-6 shrink-0">
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <h3 className="typo-h3 text-white mb-3">{title}</h3>
      <p className="typo-body text-w70">{body}</p>
    </article>
  );
}

export function HomeStepsSection() {
  const { t } = useTranslation();

  const steps: StepCardProps[] = [
    {
      icon: ClipboardCheck,
      title: t("home.steps.step1_title"),
      body: t("home.steps.step1_body"),
    },
    {
      icon: Compass,
      title: t("home.steps.step2_title"),
      body: t("home.steps.step2_body"),
    },
    {
      icon: Activity,
      title: t("home.steps.step3_title"),
      body: t("home.steps.step3_body"),
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
          {steps.map((step) => (
            <StepCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <Link
            to="/gma"
            hash="metodologia"
            className="inline-flex items-center gap-2 typo-caption font-semibold text-gold hover:text-gold-l transition-colors group"
          >
            <span>{t("home.steps.link_methodology")}</span>
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

