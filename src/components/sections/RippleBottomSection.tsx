import { useTranslation } from "react-i18next";
import "@/i18n";
import { User, Users, Briefcase, TrendingDown, ShieldAlert } from "lucide-react";

export function RippleBottomSection() {
  const { t } = useTranslation();

  const zones = [
    {
      id: "assignment",
      icon: User,
      title: t("rippleBottom.zone1_title"),
      iconSize: 22,
      desktopCircleClass: "w-[110px] h-[110px] xl:w-[120px] xl:h-[120px]",
      isCenter: true,
      items: [] as string[],
    },
    {
      id: "family",
      icon: Users,
      title: t("rippleBottom.zone2_title"),
      iconSize: 24,
      desktopCircleClass: "w-[145px] h-[145px] xl:w-[160px] xl:h-[160px]",
      isCenter: false,
      items: (t("rippleBottom.zone2_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "team",
      icon: Briefcase,
      title: t("rippleBottom.zone3_title"),
      iconSize: 28,
      desktopCircleClass: "w-[180px] h-[180px] xl:w-[200px] xl:h-[200px]",
      isCenter: false,
      items: (t("rippleBottom.zone3_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "business",
      icon: TrendingDown,
      title: t("rippleBottom.zone4_title"),
      iconSize: 32,
      desktopCircleClass: "w-[215px] h-[215px] xl:w-[240px] xl:h-[240px]",
      isCenter: false,
      items: (t("rippleBottom.zone4_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "consequences",
      icon: ShieldAlert,
      title: t("rippleBottom.zone5_title"),
      iconSize: 36,
      desktopCircleClass: "w-[250px] h-[250px] xl:w-[280px] xl:h-[280px]",
      isCenter: false,
      items: (t("rippleBottom.zone5_items", { returnObjects: true }) as string[]) || [],
    },
  ];

  return (
    <section
      id="ripple-effect-bottom"
      className="section-spacing bg-black px-6 lg:px-12 xl:px-20 border-b border-b18 relative overflow-hidden"
    >
      {/* Brilho radial de fundo suave em peru */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(155, 122, 80, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1240px] relative z-10">
        {/* Cabeçalho da secção */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <p className="typo-eyebrow text-[#9B7A50] mb-2.5 tracking-[0.25em]">
            {t("rippleBottom.eyebrow")}
          </p>
          <h2 className="typo-h2 text-white max-w-2xl leading-tight">
            {t("rippleBottom.title")}
          </h2>
        </div>

        {/* 1. VISUAL DESKTOP: Cinco círculos luminosos numa fila, a crescer da esquerda para a direita */}
        <div className="hidden md:block relative select-none">
          {/* Linha fina horizontal ligando os 5 círculos pelo centro */}
          <div
            className="absolute top-[130px] xl:top-[140px] left-[55px] right-[130px] h-[1px] bg-[#9B7A50]/35 -translate-y-1/2 z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-3 lg:gap-4 xl:gap-6 items-start relative z-10">
            {zones.map((zone) => {
              const Icon = zone.icon;
              return (
                <div key={zone.id} className="flex flex-col items-center text-center">
                  {/* Contêiner de altura fixa (260px / xl:280px) para alinhar todos os centros de círculos horizontalmente */}
                  <div className="h-[260px] xl:h-[280px] w-full flex items-center justify-center">
                    <div
                      className={`relative rounded-full flex flex-col items-center justify-center transition-all ${zone.desktopCircleClass} ${
                        zone.isCenter
                          ? "bg-[#06091a] border border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.3)] ring-1 ring-[#D4AF37]/40"
                          : "bg-[#06091a] border border-[#9B7A50]/60 shadow-[0_0_22px_rgba(155,122,80,0.18)]"
                      }`}
                    >
                      {/* Anel interno suave para realçar o efeito cascata */}
                      <div
                        className="absolute inset-2.5 rounded-full border border-[#9B7A50]/20 pointer-events-none"
                        aria-hidden="true"
                      />

                      {/* Ícone */}
                      <div
                        className={`rounded-full flex items-center justify-center ${
                          zone.isCenter
                            ? "text-[#D4AF37]"
                            : "text-[#9B7A50]"
                        }`}
                      >
                        <Icon size={zone.iconSize} strokeWidth={1.8} />
                      </div>

                      {/* No Círculo 1 (Missão Internacional): legenda dentro do círculo */}
                      {zone.isCenter && (
                        <span className="mt-2 text-[10px] xl:text-[11px] font-urbanist font-[600] text-white tracking-wider uppercase text-center px-2 leading-tight">
                          {zone.title}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Abaixo do círculo: título e itens para Zonas 2 a 5 */}
                  {!zone.isCenter && (
                    <div className="w-full mt-3">
                      <h3 className="font-urbanist text-[15px] xl:text-[16px] font-[600] text-white text-center mb-2 leading-snug">
                        {zone.title}
                      </h3>
                      {zone.items.length > 0 && (
                        <ul className="space-y-1 text-center">
                          {zone.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="font-urbanist typo-caption text-[14px] text-white/80 text-center leading-snug"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. VISUAL MOBILE: Coluna vertical com círculos de ~96px, título e itens por baixo */}
        <div className="md:hidden flex flex-col items-center gap-7 relative select-none">
          {/* Linha fina vertical conectando os círculos no mobile */}
          <div
            className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#9B7A50]/25 z-0 pointer-events-none"
            aria-hidden="true"
          />

          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                className="w-full max-w-[300px] flex flex-col items-center text-center relative z-10"
              >
                {/* Círculo mobile de tamanho uniforme (~96px) com brilho reduzido */}
                <div
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center bg-[#06091a] transition-all ${
                    zone.isCenter
                      ? "border border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                      : "border border-[#9B7A50]/50 shadow-[0_0_10px_rgba(155,122,80,0.12)]"
                  }`}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                    className={zone.isCenter ? "text-[#D4AF37]" : "text-[#9B7A50]"}
                  />
                  {zone.isCenter && (
                    <span className="mt-1 text-[9.5px] font-urbanist font-[600] text-white tracking-wider uppercase text-center px-1.5 leading-tight">
                      {zone.title}
                    </span>
                  )}
                </div>

                {/* Título e itens abaixo do círculo */}
                {!zone.isCenter && (
                  <div className="w-full mt-2.5">
                    <h3 className="font-urbanist text-[15px] font-[600] text-white text-center mb-1.5 leading-snug">
                      {zone.title}
                    </h3>
                    {zone.items.length > 0 && (
                      <ul className="space-y-1 text-center">
                        {zone.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="font-urbanist typo-caption text-[14px] text-white/80 text-center leading-snug"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. NARRATIVA SEMPRE VISÍVEL: renderizado visível por defeito (opacity: 1), sem vazio */}
        <div className="mt-8 md:mt-10 border border-b18 bg-w05/40 p-6 md:p-8 rounded-sm max-w-4xl mx-auto opacity-100 print:opacity-100 relative z-10">
          <div className="space-y-3 font-urbanist text-[15px] md:text-[16px] text-white/85 leading-relaxed">
            <p>{t("rippleBottom.narrative_p1")}</p>
            <p>{t("rippleBottom.narrative_p2")}</p>
            <p>{t("rippleBottom.narrative_p3")}</p>
            <p>{t("rippleBottom.narrative_p4")}</p>
            <p>{t("rippleBottom.narrative_p5")}</p>
          </div>

          {/* Frase em destaque */}
          <div className="my-5 py-3.5 px-4 md:px-5 border-l-2 border-[#9B7A50] bg-[#9B7A50]/10 rounded-r-sm">
            <p className="font-urbanist text-[16px] md:text-[18px] font-[600] text-[#9B7A50] leading-snug">
              {t("rippleBottom.narrative_highlight")}
            </p>
          </div>

          {/* Fecho */}
          <p className="font-urbanist text-[14.5px] md:text-[15.5px] text-white/95 font-[500] leading-relaxed pt-3 border-t border-[#9B7A50]/20">
            {t("rippleBottom.narrative_close")}
          </p>
        </div>
      </div>
    </section>
  );
}
