import { useTranslation } from "react-i18next";
import "@/i18n";
import { UserMinus, TrendingDown, HeartHandshake } from "lucide-react";

export function ProblemAndHelpSection() {
  const { t } = useTranslation();

  const columns = [
    {
      icon: UserMinus,
      title: t("home.problem_help.col1_title"),
      body: t("home.problem_help.col1_body"),
      help: t("home.problem_help.col1_help"),
    },
    {
      icon: TrendingDown,
      title: t("home.problem_help.col2_title"),
      body: t("home.problem_help.col2_body"),
      help: t("home.problem_help.col2_help"),
    },
    {
      icon: HeartHandshake,
      title: t("home.problem_help.col3_title"),
      body: t("home.problem_help.col3_body"),
      help: t("home.problem_help.col3_help"),
    },
  ];

  return (
    <section
      id="o-problema"
      className="section-spacing bg-black px-6 lg:px-20 border-b border-b18"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Cabeçalho da seção */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="typo-eyebrow mb-4">
            {t("home.problem_help.eyebrow")}
          </p>
          <h2 className="typo-h2 text-white mb-6">
            {t("home.problem_help.title")}
          </h2>
          <div className="space-y-4 font-urbanist text-[16px] font-[300] text-w70 leading-relaxed">
            <p>{t("home.problem_help.p1")}</p>
            <p className="text-white/90">{t("home.problem_help.p2")}</p>
          </div>
        </div>

        {/* 3 Colunas com os desafios e como a MOOVIA ajuda */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 md:mb-16">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <article
                key={col.title}
                className="border border-b18 bg-w05 p-8 flex flex-col justify-between h-full rounded-sm transition-colors hover:border-gold/40"
              >
                <div>
                  <div className="w-11 h-11 rounded-sm border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-6 shrink-0">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="typo-h3 text-white mb-3">{col.title}</h3>
                  <p className="typo-body text-w70 mb-6">{col.body}</p>
                </div>
                <div className="pt-4 border-t border-b18">
                  <p className="font-urbanist text-[14px] font-[400] text-[#e8d5b0] leading-relaxed">
                    {col.help}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bloco sob os três cartões: Dos riscos humanos à inteligência de negócio */}
        <div id="problem-help-bottom-block" className="pt-8 border-t border-b18">
          <h3 className="font-display text-[22px] md:text-[26px] font-[400] text-white mb-3">
            {t("home.problem_help.bottom_title")}
          </h3>
          <p className="font-urbanist text-[15px] md:text-[16px] font-[300] text-w70 leading-relaxed max-w-4xl">
            {t("home.problem_help.bottom_text")}
          </p>
        </div>
      </div>
    </section>
  );
}

