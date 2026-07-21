import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const COLABORADOR = [
  "Acolhimento",
  "Integração",
  "Apoio à família",
  "Redução da ansiedade",
  "Melhor experiência",
];

const EMPRESA = [
  "Monitorização estruturada da mobilidade",
  "Indicadores de Global Mobility Risk",
  "Executive Mobility Success Report",
  "Recomendações para RH e liderança",
  "Maior capacidade de intervenção preventiva",
  "Mais informação para decisões de mobilidade",
];

const MEDIDA = [
  "Assessment inicial",
  "Roadmap personalizado",
  "Acompanhamento 30 dias",
  "Acompanhamento 60 dias",
  "Acompanhamento 90 dias",
  "Executive Mobility Success Report",
];

export function HumanMobilitySection() {
  return (
    <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center"
        >
          Para empresas
        </motion.p>
        <h2 className="font-display text-[clamp(32px,5vw,60px)] leading-[1.05] tracking-[-0.03em] mb-8 text-center max-w-[900px] mx-auto">
          <span className="block font-[200] text-white">Global Mobility Risk</span>
          <span className="block text-gold-l italic font-[300]">Assurance Program</span>
        </h2>
        <p className="font-body text-[14px] md:text-[16px] font-[400] text-gold uppercase tracking-[0.15em] mb-8 text-center">
          Contratado pela empresa. Vivido pelo executivo. Medido ao longo do tempo.
        </p>
        <p className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.8] max-w-[780px] mx-auto text-center mb-20">
          Um benefício para o colaborador. Um retorno para a empresa.<br className="hidden sm:block" />
          Reduza o risco humano da mobilidade internacional dos seus talentos e aumente o retorno sobre o investimento em contratação global.
        </p>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {[
            { title: "Para o colaborador", items: COLABORADOR },
            { title: "Para a empresa", items: EMPRESA },
            { title: "Como medimos o impacto", items: MEDIDA },
          ].map((col) => (
            <div
              key={col.title}
              className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col"
            >
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-6">
                {col.title}
              </p>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-[15px] md:text-[16px] font-[300] text-white/90 leading-[1.6]"
                  >
                    <span className="mt-[10px] h-px w-4 bg-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-w05 border border-b18 p-8 md:p-10 max-w-[1200px] mx-auto text-center">
          <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/90 leading-[1.8] max-w-[900px] mx-auto">
            <strong className="text-gold-l font-[500]">Confidencialidade garantida.</strong> O acompanhamento do executivo é integralmente confidencial e realizado em conformidade com o RGPD. A empresa recebe indicadores de evolução, níveis de risco e recomendações de gestão, nunca dados pessoais ou informações protegidas do colaborador.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/empresas"
            className="group relative inline-flex overflow-hidden border border-gold/50 text-gold hover:text-black font-body font-[600] text-[11px] md:text-[12px] tracking-[0.24em] uppercase px-10 py-5 isolate transition-colors"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10">Conhecer o Global Mobility Risk Assurance Program</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
