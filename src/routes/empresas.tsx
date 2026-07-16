import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Human Mobility Risk Assurance Program — MOOVIA" },
      {
        name: "description",
        content:
          "Reduza o risco humano da mobilidade internacional dos seus talentos e aumente o retorno sobre o investimento em contratação global.",
      },
      { property: "og:title", content: "Human Mobility Risk Assurance Program — MOOVIA" },
      {
        property: "og:description",
        content:
          "Programa B2B da MOOVIA para reduzir o risco humano da mobilidade internacional e aumentar a retenção de talentos.",
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
    "Redução do risco humano da mobilidade",
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
            className="font-display text-[clamp(32px,5vw,68px)] font-[300] text-white leading-[1.05] tracking-[-0.03em] mb-8 max-w-[900px]"
          >
            Human Mobility Risk{" "}
            <span className="text-gold-l italic font-[400]">Assurance Program</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.7] max-w-[720px] mb-10"
          >
            Reduza o risco humano da mobilidade internacional dos seus talentos — e aumente o retorno sobre o investimento em contratação global.
          </motion.p>
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
            <span className="block">O investimento em talento internacional está exposto.</span>
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
                  <span className="mt-[10px] h-px w-4 bg-gold shrink-0" />
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
                  <span className="mt-[10px] h-px w-4 bg-gold shrink-0" />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/90 pt-4 border-l-2 border-gold pl-6 italic font-display text-[18px] md:text-[20px] font-[300]">
              O mercado já entende esse problema. O que ainda não existe é uma solução desenhada especificamente para reduzi-lo.
            </p>
          </div>
          <div className="mt-12">
            <Link
              to="/servicos"
              className="group relative overflow-hidden inline-flex bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center"
            >
              <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gold leading-tight">
                Conhecer o Human Mobility Risk Assurance Program™
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
            Atendemos particulares e empresas de todos os tamanhos. Cada proposta é desenhada à medida do perfil e da complexidade de cada transição.
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
                      <span className="mt-[10px] h-px w-4 bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
            O MOOVIA Framework™ coordena cada etapa da mobilidade do seu colaborador — do assessment inicial à integração completa da família — com o mesmo rigor que aplicamos a cada mandato individual.
          </p>
        </div>
      </section>
      <ProcessSection />

      {/* BENEFÍCIO VS RISCO */}
      <BeneficioGestaoRisco />

      {/* FORMULÁRIO UNIFICADO */}
      <section id="empresas-form" className="bg-black py-24 md:py-32 px-6 lg:px-20">
        <UnifiedLeadForm context="empresas" />
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#06091a] py-24 md:py-32 px-6 lg:px-20">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-8">
            <span className="block">Pretende reduzir o risco da sua</span>
            <span className="text-gold-l italic block mt-1">próxima contratação internacional?</span>
          </h2>
          <p className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.8] max-w-[780px] mx-auto mb-6">
            Agende uma Strategic Discovery Call para entendermos o perfil da sua equipa, os países envolvidos e como o Human Mobility Risk Assurance Program pode ser estruturado para a sua empresa.
          </p>
          <p className="font-body text-[13px] md:text-[14px] font-[400] text-gold/90 leading-[1.6] max-w-[780px] mx-auto mb-12 italic">
            Agende e a equipa MOOVIA entrará em contacto.
          </p>
          <CTALink label="Agendar Strategic Discovery Call" sublabel="Empresas" />
        </div>
      </section>
    </SiteLayout>
  );
}

/* ─────────────────────────── BENEFÍCIO VS GESTÃO DE RISCO ─────────────────────────── */
function BeneficioGestaoRisco() {
  return (
    <section className="bg-black-2 py-24 md:py-32 px-6 lg:px-20 border-t border-b18">
      <div className="mx-auto max-w-[900px]">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          Perspetiva de Valor
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-12 text-center">
          Benefício ou <span className="text-gold-l italic">gestão de risco?</span>
        </h2>
        
        <div className="space-y-6 text-w35 font-body font-[300] text-[15px] md:text-[17px] leading-[1.8]">
          <p>O nosso foco não reside na categoria de benefícios corporativos.</p>
          <p>
            É natural que o colaborador experiencie o acompanhamento da MOOVIA como um benefício vital durante uma fase crítica de transição pessoal e familiar.
          </p>
          <p>O racional da empresa para esta contratação assenta, contudo, numa gestão rigorosa de indicadores.</p>
          <p>
            O objetivo corporativo é maximizar as probabilidades de sucesso da mobilidade internacional. Ao mitigar riscos sociais e culturais, a empresa assegura a adaptação, potencia a produtividade e garante o retorno sobre o capital alocado a esse talento.
          </p>
        </div>

        <div className="mt-12 p-8 border-l-[3px] border-gold/30 bg-[#0a0d18] space-y-4">
          <p className="font-body font-[500] text-[16px] text-white">
            "Então vocês são uma empresa de benefícios?"
          </p>
          <p className="font-body font-[300] text-[15px] text-w70 leading-[1.7]">
            Somos uma empresa de <strong className="font-[500] text-gold-l">Human Mobility Assurance</strong>. O benefício para o colaborador é uma consequência do nosso trabalho. O valor para a empresa está na mitigação do risco humano da mobilidade internacional.
          </p>
        </div>

        <div className="mt-12 space-y-6 text-w35 font-body font-[300] text-[15px] md:text-[17px] leading-[1.8]">
          <p>
            Um seguro de saúde constitui indiscutivelmente um benefício para a equipa. A empresa disponibiliza-o porque reconhece que o bem-estar reduz absentismo, potencia a produtividade e reforça a retenção na organização.
          </p>
          <p>
            A intervenção da MOOVIA obedece a uma lógica estruturalmente idêntica: o colaborador recebe um apoio de imenso valor percebido, enquanto a empresa assegura uma ferramenta estratégica de retenção, integração e proteção do seu capital humano.
          </p>
        </div>

        <div className="mt-16 text-center">
          <p className="font-display font-[300] text-[clamp(20px,2.5vw,32px)] leading-[1.3] text-white">
            Para o colaborador, somos um benefício.
          </p>
          <p className="font-display font-[200] italic text-[clamp(20px,2.5vw,32px)] leading-[1.3] text-gold-l mt-2">
            Para a empresa, somos uma estratégia de mitigação de risco e proteção do investimento em capital humano.
          </p>
        </div>

      </div>
    </section>
  );
}
