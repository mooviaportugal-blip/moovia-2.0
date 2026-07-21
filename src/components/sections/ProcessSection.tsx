import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
const fredericoAsset = { url: "/images/frederico.png" };
import leticiaAsset from "@/assets/leticia.png.asset.json";

export function ProcessSection() {
  const steps = [
    {
      id: "01",
      tag: "Assessment",
      title: "Compreender antes de agir.",
      body: "Mapeamos os objetivos corporativos ou familiares, o contexto, os riscos e as prioridades antes de qualquer decisão logística.",
      badge: "Assessment",
    },
    {
      id: "02",
      tag: "Blueprint",
      title: "Converter risco num plano.",
      body: "A partir do diagnóstico inicial, desenvolvemos um roadmap estruturado para mitigar os riscos e maximizar a probabilidade de uma transição fluida.",
      badge: "Blueprint",
    },
    {
      id: "03",
      tag: "Orchestration",
      title: "Executar com inteligência.",
      body: "A MOOVIA atua como o hub estratégico que coordena advogados, especialistas e mercado imobiliário para garantir coesão em cada detalhe.",
      badge: "Orchestration",
    },
    {
      id: "04",
      tag: "Integration",
      title: "Acompanhamento pós-chegada.",
      body: "A fase de adaptação e integração nos primeiros meses determina o sucesso do processo. É nesta etapa que neutralizamos os principais fatores de turnover.",
      badge: "Integration",
    },
    {
      id: "05",
      tag: "Success",
      title: "O foco no longo prazo.",
      body: "Avaliamos o impacto duradouro da transição: estabilidade, integração efetiva e satisfação, assegurando o retorno final sobre o investimento da mudança.",
      badge: "Success",
    },
  ];


  return (
    <section id="processo" className="bg-black py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden">
      <RotatingLogo size="min(110vw,1400px)" opacity={0.03} duration={140} />
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="max-w-3xl mb-20 text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Como trabalhamos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display leading-[1.05] tracking-[-0.03em]"
          >
            <span className="block text-[clamp(32px,5vw,64px)] font-[200] text-white mb-1">
              Global Mobility Success
            </span>
            <span className="block text-[clamp(28px,4.5vw,56px)] font-[300] text-gold-l italic mb-8">
              The MOOVIA Framework
            </span>
            <span className="block text-[16px] md:text-[20px] font-body font-[300] tracking-normal text-w35 leading-[1.6] max-w-[500px] md:max-w-none">
              Cinco etapas. Uma metodologia para reduzir o Global Mobility Risk.
            </span>
          </motion.h2>

        </div>

        {/* Horizontal step flow */}
        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-b18" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`relative w-12 h-12 border flex items-center justify-center font-display text-[14px] transition-all duration-300 z-10 ${
                      i === 0
                        ? "bg-gold text-black border-gold"
                        : "border-b18 bg-black text-gold group-hover:bg-gold group-hover:text-black"
                    }`}
                  >
                    {step.id}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-b18" />
                  )}
                </div>
                <p className="font-body text-[11px] font-[400] text-gold-m uppercase tracking-[0.15em] mb-3">
                  {step.tag}
                </p>
                <h3 className="font-display text-[22px] font-[300] text-white mb-4 leading-tight">
                  {step.title}
                </h3>
                {i === 1 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      <img
                        src={fredericoAsset.url}
                        alt="Frederico Prado"
                        className="w-10 h-10 rounded-full object-cover border border-gold/40"
                      />
                      <img
                        src={leticiaAsset.url}
                        alt="Dra. Letícia de Mello"
                        className="w-10 h-10 rounded-full object-cover border border-gold/40"
                      />
                    </div>
                    <span className="font-body text-[11px] text-w35 leading-tight">
                      Frederico Prado<br />Dra. Letícia de Mello
                    </span>
                  </div>
                )}
                <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] mb-6">
                  {step.body}
                </p>
                {i === 0 && (
                  <div className="mb-6" />
                )}

                {i === 0 ? (
                  <a
                    href="/home#lead-form"
                    onClick={(e) => {
                      if (typeof window !== "undefined" && window.location.pathname === "/") {
                        e.preventDefault();
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.replaceState(null, "", "/home#lead-form");
                      }
                    }}
                    className="mt-auto px-3 py-2 w-fit flex items-center gap-2 transition-colors hover:bg-[rgba(173,137,87,.2)] cursor-pointer"
                    style={{ background: "rgba(173,137,87,.12)", border: "1px solid rgba(173,137,87,.35)" }}
                  >
                    <Calendar size={12} strokeWidth={1.5} className="text-gold-l" />
                    <span className="font-body text-[10px] font-[500] uppercase tracking-widest text-gold-l">
                      {step.badge}
                    </span>
                  </a>
                ) : (
                  <div className="mt-auto px-3 py-2 w-fit flex items-center gap-2 bg-w05 border border-b18">
                    <span className="font-body text-[10px] font-[500] uppercase tracking-widest text-gold-l">
                      {step.badge}
                    </span>
                  </div>
                )}

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
