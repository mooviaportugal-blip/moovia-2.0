import { motion } from "framer-motion";
import { LayersIcon, SearchIcon, AlertIcon, ClockIcon } from "@/components/ui/MooviaIcons";
import airportFamilyAsset from "@/assets/problem-family-airport.png.asset.json";

export function ProblemSection() {
  const cards = [
    {
      icon: LayersIcon,
      title: "Complexidade Humana",
      body: "Uma contratação internacional exige a coordenação de múltiplas decisões interdependentes, que afetam diretamente a capacidade de adaptação, a produtividade e a permanência do talento.",
      fullBody: "Uma contratação internacional exige a coordenação de múltiplas decisões interdependentes, que afetam diretamente a capacidade de adaptação, a produtividade e a permanência do talento."
    },
    {
      icon: SearchIcon,
      title: "Falta de Visibilidade",
      body: "As empresas têm ferramentas para medir custos, prazos burocráticos e compliance jurídico. O desafio reside em antecipar o impacto e o risco humano da mobilidade antes que afete os resultados.",
      fullBody: "As empresas têm ferramentas para medir custos, prazos burocráticos e compliance jurídico. O desafio reside em antecipar o impacto e o risco humano da mobilidade antes que afete os resultados."
    },
    {
      icon: AlertIcon,
      title: "Riscos Invisíveis",
      body: "Os fatores determinantes para o sucesso de uma mobilidade dificilmente constam dos indicadores tradicionais. O contexto familiar e a adaptação cultural revelam-se fundamentais para a estabilidade do processo.",
      fullBody: "Os fatores determinantes para o sucesso de uma mobilidade dificilmente constam dos indicadores tradicionais. O contexto familiar e a adaptação cultural revelam-se fundamentais para a estabilidade do processo."
    },
    {
      icon: ClockIcon,
      title: "Integração Sustentável",
      body: "A emissão do visto marca apenas o início logístico da mobilidade. A consolidação do investimento requer um processo estruturado de acompanhamento contínuo e gestão de expectativas.",
      fullBody: "A emissão do visto marca apenas o início logístico da mobilidade. A consolidação do investimento requer um processo estruturado de acompanhamento contínuo e gestão de expectativas."
    }
  ];

  return (
    <section className="bg-black-2 py-16 md:py-24 lg:py-32 px-6 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-stretch mb-20">
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
            >
              O mercado resolve tarefas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(32px,4vw,64px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-10"
            >
              <span className="block mb-1">O maior risco</span>
              <span className="block font-[300] mb-1">da mobilidade internacional</span>
              <span className="block mb-6 text-white/60">não está no visto.</span>
              <span className="text-gold-l italic font-[300] block">
                Está no que <br className="hidden sm:block" />acontece depois.
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.9] max-w-[540px] space-y-6"
            >
              <p>
                As empresas estruturam contratações internacionais focadas na previsibilidade e no rigor operacional. A maioria dos programas permanece centrada quase em exclusivo na componente logística e documental.
              </p>
              <p>
                O ponto crítico surge na fase posterior à chegada: a integração corporativa e a adaptação familiar ditam o verdadeiro retorno sobre o investimento.
              </p>
              <p className="text-gold font-[400] pt-4">
                A intervenção da MOOVIA protege o valor deste ciclo completo.
              </p>
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative min-h-[520px] lg:min-h-[640px] rounded-2xl overflow-hidden ring-1 ring-gold/40 shadow-[0_20px_60px_-20px_rgba(173,137,87,0.35)]"
          >
            <img
              src={airportFamilyAsset.url}
              loading="lazy"
              alt="Família expatriada no aeroporto ao pôr do sol"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-y-[-20%] -left-3/4 w-1/2 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[goldSheen_1.6s_ease-in-out]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 0%, rgba(232,213,176,0.05) 30%, rgba(232,213,176,0.55) 48%, rgba(255,247,224,0.85) 50%, rgba(232,213,176,0.55) 52%, rgba(232,213,176,0.05) 70%, transparent 100%)",
                  filter: "blur(2px)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="absolute inset-y-[-20%] -left-3/4 w-1/3 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[goldSheen_1.6s_ease-in-out_0.15s]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 0%, rgba(173,137,87,0.4) 50%, transparent 100%)",
                  mixBlendMode: "overlay",
                }}
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(232,213,176,0.18),transparent_65%)] mix-blend-screen" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/30 transition-all duration-500 group-hover:ring-gold/70 group-hover:shadow-[inset_0_0_40px_rgba(232,213,176,0.25)]" />

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 right-4 bottom-4 sm:left-8 sm:right-8 sm:bottom-8 lg:left-10 lg:right-10 lg:bottom-10 z-10"
            >
              <div className="relative backdrop-blur-xl bg-black/55 border border-gold/30 rounded-xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                <span className="absolute -top-3 left-6 sm:left-8 font-body text-[10px] tracking-[0.32em] uppercase text-gold bg-black-2 px-3 py-1 rounded-sm border border-gold/30">
                  Visão MOOVIA
                </span>
                <p className="font-display text-[17px] sm:text-[20px] md:text-[22px] font-[300] text-white/95 leading-[1.45] italic">
                  "A MOOVIA posiciona-se para redefinir como o sucesso da mobilidade internacional é avaliado pelas organizações."
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="font-body text-[10px] tracking-[0.28em] uppercase text-gold/90">
                    Global Mobility Assurance
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>


        </div>


        <div className="mb-12 mt-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(26px,3vw,38px)] font-[200] text-white leading-[1.1] tracking-[-0.02em] max-w-[700px]"
          >
            <span className="text-white/60">Porque a mobilidade internacional continua a ser</span><br className="hidden md:block" />
            <span className="font-[300] text-gold-l">um investimento de alto risco.</span>
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-b18">
          {cards.map((card, i) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black-2 p-[52px_44px] relative group overflow-hidden rounded-[2px] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25),0_0_0_1px_rgba(173,137,87,0.2)]"
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 bg-gold transition-all duration-500 group-hover:h-full" />
              <div className="mb-8 text-gold">
                <card.icon size={28} />
              </div>
              <h3 className="font-display text-[19px] font-[300] text-white mb-4">
                {card.title}
              </h3>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.7]">
                {card.fullBody}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-1 bg-black p-6 sm:p-16 md:p-20 text-center"
        >
          <div className="font-display text-[15px] sm:text-[28px] md:text-[clamp(28px,3.6vw,46px)] font-[200] text-white leading-[1.1] tracking-[-0.02em]">
            <span className="text-white/60 block mb-3">O mercado resolve tarefas.</span>
            <span className="text-gold-l italic font-[300] block">
              A MOOVIA coordena o sucesso<br className="hidden sm:block" /> da mobilidade internacional.
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
