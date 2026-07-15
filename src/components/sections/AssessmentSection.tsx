import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Quote da Dra. Letícia — deixar string vazia até validação final.
// Enquanto vazia, o bloco de citação NÃO é renderizado em produção.
const leticiaQuote = "";

export function AssessmentSection() {
  const strategicItems = [
    "Diagnóstico estratégico da mobilidade",
    "Objetivos, prioridades e fatores críticos",
    "Avaliação de riscos e oportunidades",
    "Estratégia patrimonial, jurídica e de integração",
    "Human Dimension Assessment",
    "Roadmap personalizado",
    "Recomendações priorizadas",
    "Plano de implementação",
  ];

  return (
    <section
      id="assessment"
      className="bg-black py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative"
    >
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-20 items-start">
        {/* Lado esquerdo */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            The MOOVIA Strategic Assessment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(22px,3vw,44px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-8"
          >
            As decisões mais importantes da mobilidade internacional são tomadas
            antes da mudança.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(16px,1.8vw,22px)] font-[300] italic text-gold-l leading-[1.4] mb-10"
          >
            A pergunta não é apenas para onde vai. É se essa decisão faz sentido
            para si, para a sua família ou para a sua empresa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] font-[300] text-w35 leading-[1.9] max-w-lg space-y-5"
          >
            <p>
              O MOOVIA Strategic Assessment foi desenvolvido para transformar uma
              decisão complexa num plano estratégico estruturado.
            </p>
            <p>
              Durante uma sessão dedicada, analisamos objetivos, contexto,
              prioridades, riscos e fatores críticos de sucesso para construir
              uma visão integrada da sua mobilidade internacional.
            </p>
            <p className="italic text-white/70">
              Não se trata de uma reunião comercial. É o primeiro passo de uma
              estratégia.
            </p>
          </motion.div>
        </div>

        {/* Card direito */}
        <div className="lg:pl-20">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black-3 border border-b18 p-10 md:p-12 relative group z-10"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-teal to-gold bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]" />

            <p className="font-body text-[11px] font-[400] tracking-[0.24em] uppercase text-gold mb-4 text-center">
              O que receberá
            </p>
            <h3 className="font-display text-[26px] font-[300] text-white leading-tight mb-2 text-center">
              MOOVIA Strategic Assessment™
            </h3>
            <p className="font-body text-[12px] font-[300] text-w35 uppercase tracking-widest text-center mb-10">
              Sessão Estratégica + Relatório Personalizado
            </p>

            <div className="mb-8">
              <p className="font-body text-[13px] font-[500] text-white mb-4">
                O Strategic Assessment inclui:
              </p>
              <ul className="grid grid-cols-1 gap-y-2.5">
                {strategicItems.map((d) => (
                  <li
                    key={d}
                    className="flex gap-3 font-body text-[14px] font-[300] text-white/80 items-start"
                  >
                    <ArrowRight
                      size={16}
                      className="text-gold mt-[5px] shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Human Dimension Assessment */}
            <div className="mb-8 mt-8 rounded-[10px] border border-gold/20 bg-white/[0.02] p-5">
              <p className="font-body text-[15px] font-[600] text-white/95 mb-2">
                Human Dimension Assessment
              </p>
              <p className="font-body text-[13px] font-[300] italic text-white/75 leading-[1.7] mb-3">
                Uma avaliação integrada da dimensão humana da mobilidade
                internacional, ajudando a antecipar fatores que podem
                influenciar a adaptação, o bem-estar e o sucesso da transição.
              </p>
              <p className="font-body text-[12px] font-[300] italic text-white/50 leading-[1.5]">
                Conduzido por <span className="not-italic text-gold">Frederico Prado</span>, com o apoio da{" "}
                <span className="not-italic text-gold">Dra. Letícia de Mello</span>.
              </p>

              {leticiaQuote ? (
                <blockquote className="mt-5 pl-4 border-l-2 border-gold/60 font-display text-[14px] font-[300] italic text-white/85 leading-[1.6]">
                  &ldquo;{leticiaQuote}&rdquo;
                </blockquote>
              ) : null}
            </div>


            {/* Entregável */}
            <div className="mb-6">
              <p className="font-body text-[11px] font-[400] tracking-[0.24em] uppercase text-gold mb-2">
                Entregável
              </p>
              <p className="font-body text-[14px] font-[400] text-white mb-1">
                Relatório Estratégico Personalizado
              </p>
              <p className="font-body text-[13px] font-[300] text-w35 leading-[1.6]">
                Documento executivo com recomendações, prioridades e plano de
                ação.
              </p>
            </div>

            {/* Investimento */}
            <div className="border-t border-b18 pt-6 mb-8 text-center">
              <p className="font-body text-[11px] font-[400] tracking-[0.24em] uppercase text-gold mb-3">
                Investimento
              </p>
              <div className="font-display text-[24px] md:text-[28px] font-[300] text-gold-l leading-none tracking-[-0.02em] mb-4">
                Sob consulta
              </div>
              <p className="font-body text-[12px] font-[300] italic text-w35 leading-[1.6] max-w-[380px] mx-auto">
                Cada proposta é construída à medida da sua necessidade — para
                particulares e para empresas de qualquer dimensão.
              </p>
            </div>

            <div className="max-w-[480px] mx-auto text-center mb-6 opacity-75">
              <p className="font-body italic text-[13px] text-white/60 leading-[1.6] mb-1">
                "A experiência com o Assessment da MOOVIA superou as nossas expectativas."
              </p>
              <span className="font-body text-[11px] text-white/40">
                — Cliente MOOVIA, Brasil → Portugal
              </span>
            </div>

            <a
              href="/checkout"
              className="block text-center w-full bg-gold text-black font-body font-[600] text-[13px] tracking-[0.22em] uppercase py-6 transition-all hover:bg-gold-xl group overflow-hidden relative"
            >
              <span className="relative z-10">
                Solicitar Strategic Assessment
              </span>
              <div className="absolute inset-0 bg-gold-xl translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
