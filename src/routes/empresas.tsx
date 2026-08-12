import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Global Mobility Assurance | MOOVIA" },
      {
        name: "description",
        content:
          "Transformamos o Human Mobility Risk em Global Mobility Success. Identifique e avalie os fatores humanos da mobilidade internacional dos seus talentos e aumente o retorno sobre o investimento em contratação global.",
      },
      { property: "og:title", content: "Global Mobility Assurance | MOOVIA" },
      {
        property: "og:description",
        content:
          "Programa B2B da MOOVIA para identificar e avaliar os fatores humanos da mobilidade internacional e aumentar a retenção de talentos através do Global Mobility Success.",
      },
    ],
  }),
  component: EmpresasPage,
});

function CTALink({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <Link
      to="/home"
      hash="lead-form"
      onClick={(e) => {
        if (typeof window !== "undefined" && window.location.pathname === "/home") {
          e.preventDefault();
          document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center inline-flex flex-col"
    >
      <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-gold leading-tight">
        {label}
      </span>
      {sublabel && (
        <span className="relative z-10 text-[9px] tracking-[0.2em] opacity-70 mt-1 font-[400] transition-colors duration-300 group-hover:text-gold">
          {sublabel}
        </span>
      )}
    </Link>
  );
}

function EmpresasPage() {
  const colaborador = [
    "Acolhimento",
    "Integração",
    "Apoio à família",
    "Redução da ansiedade",
    "Melhor experiência",
  ];
  const empresa = [
    "Identificar e avaliar os fatores humanos da mobilidade",
    "Melhor integração",
    "Maior retenção",
    "Redução do turnover",
    "Fortalecimento da marca empregadora",
    "Maior retorno sobre o investimento em talento internacional",
  ];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-[#06091a] pt-36 pb-24 md:pt-44 md:pb-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Para Empresas
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(32px,5vw,68px)] font-[300] text-white leading-[1.05] tracking-[-0.03em] mb-4 max-w-[900px]"
          >
            Global Mobility <span className="text-gold-l italic font-[400]">Assurance</span>
            <span className="block text-[0.45em] mt-4 tracking-normal leading-tight font-body font-[400] text-white/90">
              para empresas que investem em talento internacional.
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-8 mb-10"
          >
            <div className="space-y-2">
              <p className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white/50 border-l-2 border-gold/50 pl-6 py-1 italic">
                Contratado pela empresa. Vivido pelo executivo. Medido ao longo do tempo.
              </p>
              <p className="font-body text-[14px] md:text-[15px] tracking-[0.1em] text-gold-l/80 pl-6">
                Um benefício para o colaborador que representa um investimento mensurável para a empresa.
              </p>
            </div>
            
            <div className="space-y-6 max-w-[800px]">
              <p className="font-display italic text-[20px] md:text-[24px] font-[300] text-white leading-relaxed border-l-2 border-gold pl-6">
                "Um dos maiores desafios de uma missão internacional não está na viagem. Está no que acontece depois da chegada."
              </p>
              
              <div className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.7] space-y-6">
                <p className="text-white/90">
                  A maioria das empresas gere vistos, fiscalidade e processos administrativos. A MOOVIA acrescenta uma camada de Global Mobility Assurance, identificando e avaliando os fatores humanos que influenciam o sucesso da mobilidade internacional, através da avaliação de indicadores como integração, adaptação familiar, retenção e produtividade.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* ISO Footer Seal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-6 border-t border-white/5"
          >
            <p className="font-body text-[12px] text-white/40 italic tracking-wide">
              Metodologia baseada em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000.
            </p>
          </motion.div>
          
          <CTALink label="Agendar Strategic Discovery Call" sublabel="Empresas" />
        </div>
      </section>

      {/* PROBLEMA B2B */}
      <section className="bg-black py-20 md:py-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            Para Empresas
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-10 max-w-[900px]">
            <span className="block">O investimento em talento internacional exige atenção.</span>
            <span className="text-gold-l italic block mt-2">A maioria das empresas não avalia esta exposição.</span>
          </h2>
          <div className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.85] space-y-6 max-w-[820px]">
            <p>
              Empresas investem milhares de euros para contratar talentos internacionais. Mas uma parte significativa desse investimento é colocada em risco por fatores que normalmente ficam fora do processo tradicional de onboarding:
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-none pl-0">
              {[
                "Dificuldade de adaptação da família",
                "Problemas com habitação",
                "Integração cultural",
                "Escolas",
                "Isolamento social",
                "Expectativas desalinhadas",
                "Dificuldades práticas do dia a dia",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <img src="/mooviagold.png" alt="" className="mt-[6px] h-3 w-3 object-contain shrink-0 opacity-80" />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
            <p>O resultado é conhecido por qualquer diretor de RH:</p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-none pl-0">
              {[
                "Menor produtividade",
                "Menor satisfação",
                "Maior risco de turnover",
                "Perda do investimento realizado na contratação",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <img src="/mooviagold.png" alt="" className="mt-[6px] h-3 w-3 object-contain shrink-0 opacity-80" />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/90 pt-4 border-l-2 border-gold pl-6 italic font-display text-[18px] md:text-[20px] font-[300]">
              O mercado já entende esse problema. O que ainda não existe é uma solução desenhada especificamente para atuar antecipadamente.
            </p>
          </div>
          <div className="mt-12">
            <Link
              to="/servicos"
              className="group relative overflow-hidden inline-flex bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center"
            >
              <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gold leading-tight">
                Conhecer o Global Mobility Assurance
              </span>
            </Link>
          </div>

        </div>
      </section>

      {/* DUAS COLUNAS */}
      <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-6 text-center max-w-[900px] mx-auto">
            Um benefício para o colaborador.{" "}
            <span className="text-gold-l italic">Um retorno para a empresa.</span>
          </h2>
          <p className="font-body text-[14px] md:text-[15px] font-[300] italic text-white/60 leading-[1.7] text-center max-w-[720px] mx-auto mb-16">
            Atendemos empresas de todos os tamanhos. Cada proposta é desenhada à medida do perfil e da complexidade de cada transição.
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {[
              { title: "Para o colaborador", items: colaborador },
              { title: "Para a empresa", items: empresa },
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
                      <img src="/mooviagold.png" alt="" className="mt-[6px] h-3 w-3 object-contain shrink-0 opacity-80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* REFORÇO — Velocidade de onboarding via rede */}
          <div className="mt-14 md:mt-16 mx-auto max-w-[880px] border-l-2 border-gold pl-6 md:pl-8">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-3">
              Velocidade de execução
            </p>
            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/85 leading-[1.85]">
              A velocidade de onboarding do talento contratado depende tanto da
              qualidade da estratégia quanto da capacidade de execução. O
              mandato MOOVIA aciona uma rede de especialistas credenciados em áreas como
              imobiliário, jurídico ou integração escolar. Esta ativação ocorre sob demanda, sem
              custo fixo de equipa própria em cada área operacional para a
              empresa contratante.
            </p>
          </div>
        </div>
      </section>
      
      {/* SELO DE VALIDAÇÃO JURÍDICA */}
      <section className="bg-[#06091a] pb-20 md:pb-28 px-6 lg:px-20 relative overflow-hidden">
        <div className="mx-auto max-w-[900px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 border-l-2 border-gold/40 bg-w05/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-body text-[10px] tracking-[0.32em] uppercase text-gold/80">Validação Jurídica</span>
            </div>
            <blockquote className="font-display italic text-[18px] md:text-[22px] font-[300] text-w85 leading-[1.6]">
              "O modelo jurídico da MOOVIA foi objeto de análise por uma sociedade 
              de advogados de referência em Portugal, tendo sido considerado 
              juridicamente viável, encontrando-se atualmente em fase de 
              implementação das recomendações identificadas."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* NOSSA TESE (reaproveitada) */}
      <NossaTeseSection />

      {/* COMO FUNCIONA — B2B intro + framework */}
      <section className="bg-black pt-20 md:pt-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            Como funciona
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-8">
            A mesma metodologia.{" "}
            <span className="text-gold-l italic">Aplicada à sua equipa.</span>
          </h2>
          <p className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.8] max-w-[780px] mx-auto">
            O MOOVIA Framework coordena cada etapa da mobilidade do seu colaborador, desde o assessment inicial até à integração completa da família, com o mesmo rigor que aplicamos a cada mandato individual.
          </p>
        </div>
      </section>
      <ProcessSection />

      {/* FORMULÁRIO UNIFICADO */}
      <section id="empresas-form" className="bg-black py-24 md:py-32 px-6 lg:px-20">
        <UnifiedLeadForm context="empresas" />
      </section>
      {/* EVERYBODY WINS — Global Mobility Success outcomes */}
      <EverybodyWins />

    </SiteLayout>
  );
}


/* ─────────────────────────── EVERYBODY WINS (Global Mobility Success) ─────────────────────────── */
function EverybodyWins() {
  const colunas = [
    {
      title: "Colaborador",
      items: ["Integrado", "Engajado", "Produtivo", "Construindo um futuro"],
    },
    {
      title: "Família",
      items: ["Estável", "Adaptada", "Apoiada", "Confiante"],
    },
    {
      title: "Empresa",
      items: [
        "Talento retido",
        "Produtividade mais rápida",
        "Menor exposição a imprevistos de mobilidade",
        "Melhor ROI",
      ],
    },
  ];
  return (
    <section className="bg-black py-24 md:py-32 px-6 lg:px-20 border-t border-b18">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          Global Mobility Success
        </p>
        <h2 className="font-display text-[clamp(32px,4.5vw,60px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-14 text-center">
          Everybody <span className="text-gold-l italic">wins.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {colunas.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col"
            >
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-6">
                {col.title}
              </p>
              <ul className="space-y-3">
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
            </motion.div>
          ))}
        </div>
        <p className="mt-14 font-display font-[200] italic text-gold-l text-[clamp(22px,3vw,36px)] leading-[1.3] text-center max-w-[820px] mx-auto">
          A chegada é o marco. O sucesso é o destino.
        </p>
      </div>
    </section>
  );
}
