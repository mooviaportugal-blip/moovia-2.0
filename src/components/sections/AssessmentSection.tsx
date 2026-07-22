import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Quote da Dra. Letícia — deixar string vazia até validação final.
// Enquanto vazia, o bloco de citação NÃO é renderizado em produção.
const leticiaQuote = "";

export function AssessmentSection() {


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
              Global Mobility Success Assessment
            </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-white leading-[1.05] tracking-[-0.03em] mb-10 text-[clamp(28px,3.5vw,48px)]"
          >
            <span className="block font-[200]">O sucesso de uma mudança internacional</span>
            <span className="block font-[400] text-white/50 mt-2">define-se muito antes da partida.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(18px,2vw,24px)] font-[300] text-gold-l italic leading-[1.5] mb-12 border-l-[3px] border-gold/30 pl-5"
          >
            O objetivo não se resume a escolher um destino.
            <br className="hidden md:block" />
            O foco é garantir que essa transição protege a estabilidade da família, a carreira e o património.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[16px] md:text-[17px] font-[300] text-w35 leading-[1.9] max-w-[500px] space-y-6"
          >
            <p>
              O Global Mobility Success Assessment traduz uma decisão complexa e de alto impacto num plano estratégico estruturado e tangível.
            </p>
            <p>
              Nesta sessão de consultoria, conduzimos uma análise exaustiva ao contexto familiar e corporativo, mapeando riscos, prioridades e oportunidades para arquitetar uma transição segura.
            </p>
            <p className="font-body text-[15px] italic text-gold font-[400] mt-8 pt-6 border-t border-white/5">
              Esta sessão é um diagnóstico aprofundado e o ponto de partida de uma estratégia sólida.
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
              Global Mobility Success Assessment
            </h3>
            <p className="font-body text-[12px] font-[300] text-w35 uppercase tracking-widest text-center mb-10">
              Sessão de Consultoria Estratégica
            </p>

            <div className="mb-8">
              {/* Human Dimension Assessment */}
              <div className="mb-8 rounded-[10px] border border-gold/20 bg-white/[0.02] p-5">
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
            </div>

            {/* Assessment Methodology Quote - Expanded Version */}
            <div className="mb-8 font-body text-[13px] font-[300] text-w35 leading-[1.7] border-l border-gold/20 pl-4 py-2 space-y-3">
              <p>
                O Assessment é conduzido, sempre que possível, na língua emocional do participante.
              </p>
              <p>
                Falar numa segunda língua exige esforço cognitivo, pois a pessoa está a pensar, traduzir e escolher palavras simultaneamente. Esse esforço tem um efeito observável com menos gestos, mais pausas e um olhar menos espontâneo. Não porque a pessoa seja diferente, mas porque está ocupada a processar a língua.
              </p>
              <p>
                Isso contamina exatamente os sinais que uma avaliação comportamental precisa de captar. Por isso reduzimos essa interferência sempre que possível — para que o que é lido seja a pessoa, não o esforço de falar noutra língua.
              </p>
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

            <div className="max-w-[480px] mx-auto text-center mt-12 mb-6 opacity-75">
              <p className="font-body italic text-[13px] text-white/60 leading-[1.6] mb-1">
                "A experiência com o Assessment da MOOVIA superou as nossas expectativas."
              </p>
              <span className="font-body text-[11px] text-white/40">
                — Cliente MOOVIA, Brasil → Portugal
              </span>
            </div>

            <a
              href="#lead-form"
              onClick={(e) => {
                if (typeof window !== "undefined") {
                  const el = document.getElementById("lead-form");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }
              }}
              className="block text-center w-full bg-gold text-black font-body font-[600] text-[13px] tracking-[0.22em] uppercase py-6 transition-all hover:bg-gold-xl group overflow-hidden relative"
            >
              <span className="relative z-10 leading-tight">
                Solicitar Assessment
              </span>
              <div className="absolute inset-0 bg-gold-xl translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
