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

  return (
    <section
      id="ganhos-empresa"
      className="section-spacing bg-black px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 md:mb-16">
          <p className="typo-eyebrow mb-4">{t("home.gains.eyebrow")}</p>
          <h2 className="typo-h2 text-white">{t("home.gains.title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="border border-b18 bg-w05 p-8 flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-5 shrink-0">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="typo-h3 text-white mb-2">{item.title}</h3>
                <p className="typo-body text-w70">{item.body}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 md:mt-12 typo-body text-gold-l font-semibold border-l-2 border-gold pl-4">
          {t("home.gains.support_line")}
        </p>
      </div>
    </section>
  );
}

