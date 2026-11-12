import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { User, Users, Briefcase, TrendingDown, ShieldAlert } from "lucide-react";

export function RippleBottomSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const zones = [
    {
      id: "assignment",
      icon: User,
      title: t("rippleBottom.zone1_title"),
      ringCount: 1,
      circleSize: 56,
      isCenter: true,
      items: [] as string[],
    },
    {
      id: "family",
      icon: Users,
      title: t("rippleBottom.zone2_title"),
      ringCount: 2,
      circleSize: 66,
      isCenter: false,
      items: (t("rippleBottom.zone2_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "team",
      icon: Briefcase,
      title: t("rippleBottom.zone3_title"),
      ringCount: 3,
      circleSize: 76,
      isCenter: false,
      items: (t("rippleBottom.zone3_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "business",
      icon: TrendingDown,
      title: t("rippleBottom.zone4_title"),
      ringCount: 4,
      circleSize: 86,
      isCenter: false,
      items: (t("rippleBottom.zone4_items", { returnObjects: true }) as string[]) || [],
    },
    {
      id: "consequences",
      icon: ShieldAlert,
      title: t("rippleBottom.zone5_title"),
      ringCount: 5,
      circleSize: 96,
      isCenter: false,
      items: (t("rippleBottom.zone5_items", { returnObjects: true }) as string[]) || [],
    },
  ];

  return (
    <section
      id="ripple-effect-bottom"
      className="section-spacing bg-black px-6 lg:px-20 border-b border-b18 relative overflow-hidden"
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
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <p className="typo-eyebrow text-[#9B7A50] mb-3 tracking-[0.25em]">
            {t("rippleBottom.eyebrow")}
          </p>
          <h2 className="typo-h2 text-white max-w-2xl leading-tight">
            {t("rippleBottom.title")}
          </h2>
        </div>

        {/* Visual em código: cinco zonas de círculos que crescem da esquerda para a direita */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 items-stretch"
        >
          {zones.map((zone, idx) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                className={`flex flex-col justify-between p-5 lg:p-5.5 rounded-sm border transition-all ${
                  zone.isCenter
                    ? "border-[#9B7A50]/70 bg-[#9B7A50]/10 shadow-[0_0_20px_rgba(155,122,80,0.18)] items-center text-center"
                    : "border-b18 bg-w05/50 hover:border-[#9B7A50]/40 text-left"
                }`}
              >
                <div>
                  {/* Topo com círculos concêntricos em SVG que crescem da esquerda para a direita */}
                  <div
                    className="flex items-center justify-center my-3 h-28 relative select-none"
                    aria-hidden="true"
                  >
                    <div
                      className="relative flex items-center justify-center"
                      style={{ width: `${zone.circleSize + 16}px`, height: `${zone.circleSize + 16}px` }}
                    >
                      {/* Anéis concêntricos progressivos */}
                      {Array.from({ length: zone.ringCount }).map((_, rIdx) => {
                        const diameter = 32 + rIdx * 14;
                        return (
                          <span
                            key={rIdx}
                            className={`absolute rounded-full border transition-all ${
                              zone.isCenter
                                ? "border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                                : "border-[#9B7A50]"
                            }`}
                            style={{
                              width: `${diameter}px`,
                              height: `${diameter}px`,
                              opacity: zone.isCenter ? 0.9 : 0.2 + (rIdx + 1) * 0.16,
                              borderStyle: rIdx === zone.ringCount - 1 && !zone.isCenter ? "dashed" : "solid",
                            }}
                          />
                        );
                      })}

                      {/* Ícone central */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ${
                          zone.isCenter
                            ? "bg-[#D4AF37] text-black shadow-[0_0_14px_rgba(212,175,55,0.6)]"
                            : "bg-[#06091a] border border-[#9B7A50]/60 text-[#9B7A50]"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.8} />
                      </div>
                    </div>
                  </div>

                  {/* Título da Zona */}
                  <h3
                    className={`font-urbanist text-[15px] lg:text-[16px] font-[600] mb-3 leading-snug ${
                      zone.isCenter ? "text-[#D4AF37]" : "text-white"
                    }`}
                  >
                    {zone.title}
                  </h3>

                  {/* Lista dos 4 itens (para Zonas 2 a 5) */}
                  {zone.items.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-[#9B7A50]/20">
                      {zone.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A50] shrink-0 mt-1.5" />
                          <span className="font-urbanist text-[13px] lg:text-[13.5px] text-white/80 leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Para a Zona 1 (Missão Internacional): etiqueta central de contexto */}
                  {zone.isCenter && (
                    <p className="font-urbanist text-[12.5px] text-white/75 leading-relaxed pt-2">
                      {t("rippleDrill.intro_tag")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Narrativa por baixo do visual: parágrafos curtos na ordem solicitada */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 border border-b18 bg-w05/40 p-6 md:p-9 rounded-sm max-w-4xl mx-auto"
        >
          <div className="space-y-3 font-urbanist text-[15px] md:text-[16px] text-white/85 leading-relaxed">
            <p>{t("rippleBottom.narrative_p1")}</p>
            <p>{t("rippleBottom.narrative_p2")}</p>
            <p>{t("rippleBottom.narrative_p3")}</p>
            <p>{t("rippleBottom.narrative_p4")}</p>
            <p>{t("rippleBottom.narrative_p5")}</p>
          </div>

          {/* Frase em destaque */}
          <div className="my-6 py-4 px-5 border-l-2 border-[#9B7A50] bg-[#9B7A50]/10 rounded-r-sm">
            <p className="font-urbanist text-[17px] md:text-[19px] font-[600] text-[#9B7A50] leading-snug">
              {t("rippleBottom.narrative_highlight")}
            </p>
          </div>

          {/* Fecho */}
          <p className="font-urbanist text-[15px] md:text-[16px] text-white/95 font-[500] leading-relaxed pt-4 border-t border-[#9B7A50]/20">
            {t("rippleBottom.narrative_close")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

