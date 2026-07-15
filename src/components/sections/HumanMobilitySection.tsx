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
  "Redução do risco humano da mobilidade",
  "Melhor integração",
  "Maior retenção",
  "Redução do turnover",
  "Fortalecimento da marca empregadora",
  "Maior retorno sobre o investimento em talento internacional",
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
        <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-6 text-center max-w-[900px] mx-auto">
          Human Mobility Risk{" "}
          <span className="text-gold-l italic">Assurance Program™</span>
        </h2>
        <p className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.7] max-w-[780px] mx-auto text-center mb-16">
          Um benefício para o colaborador. Um retorno para a empresa. Reduza o risco humano da mobilidade internacional dos seus talentos e aumente o retorno sobre o investimento em contratação global.
        </p>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {[
            { title: "Para o colaborador", items: COLABORADOR },
            { title: "Para a empresa", items: EMPRESA },
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

        <div className="mt-14 flex justify-center">
          <Link
            to="/empresas"
            className="group relative inline-flex overflow-hidden border border-gold/50 text-gold hover:text-black font-body font-[600] text-[11px] md:text-[12px] tracking-[0.24em] uppercase px-10 py-5 isolate transition-colors"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10">Falar com a MOOVIA para Empresas</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
