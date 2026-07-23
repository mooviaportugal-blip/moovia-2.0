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
          "Transformamos Human Mobility Risk em Global Mobility Success. Reduza o risco humano da mobilidade internacional dos seus talentos e aumente o retorno sobre o investimento em contratação global.",
      },
      { property: "og:title", content: "Global Mobility Assurance | MOOVIA" },
      {
        property: "og:description",
        content:
          "Programa B2B da MOOVIA para reduzir o Human Mobility Risk da mobilidade internacional e aumentar a retenção de talentos através do Global Mobility Success.",
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
            className="font-display text-[clamp(32px,5vw,68px)] font-[300] text-white leading-[1.05] tracking-[-0.03em] mb-4 max-w-[900px]"
          >
            Global Mobility <span className="text-gold-l italic font-[400]">Assurance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-body text-[14px] md:text-[16px] font-[400] text-gold-l/90 leading-[1.5] max-w-[700px] mb-8"
          >
            A nova categoria para reduzir o Human Mobility Risk e transformar mobilidade internacional em melhores resultados para empresas e colaboradores.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white/50 mb-8 italic"
          >
            CONTRATADO PELA EMPRESA, VIVIDO PELO EXECUTIVO E MEDIDO AO LONGO DO TEMPO.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-10"
          >
            <p className="font-body text-[16px] md:text-[18px] font-[600] text-white mb-6">
              Um benefício para o colaborador que representa um investimento mensurável para a empresa.
            </p>
            <div className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.7] max-w-[800px] space-y-4">
              <p>
                Transformamos Human Mobility Risk em Global Mobility Success.
              </p>
              <p>
                Enquanto o mercado mede vistos emitidos, mudanças concluídas e processos administrativos, nós medimos aquilo que realmente determina o sucesso de uma mobilidade internacional: a adaptação humana. Nossa metodologia identifica riscos, gera inteligência e acompanha indicadores ao longo da jornada para reduzir turnover, acelerar a integração, aumentar a retenção e melhorar os resultados para o RH, para o CFO e para o negócio.
              </p>
            </div>
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

      {/* BENEFÍCIO VS RISCO */}
      <BeneficioGestaoRisco />

      {/* O QUE ESTAMOS ASSEGURANDO */}
      <OqueAsseguramos />

      {/* COMO GERAMOS VALOR (3 públicos) */}
      <ComoGeramosValor />

      {/* FORMULÁRIO UNIFICADO */}
      <section id="empresas-form" className="bg-black py-24 md:py-32 px-6 lg:px-20">
        <UnifiedLeadForm context="empresas" />
      </section>
      {/* EVERYBODY WINS — Global Mobility Success outcomes */}
      <EverybodyWins />

      {/* CTA FINAL */}
      <section className="bg-[#06091a] py-24 md:py-32 px-6 lg:px-20">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-8">
            <span className="block">Pretende reduzir o risco da sua</span>
            <span className="text-gold-l italic block mt-1">próxima contratação internacional?</span>
          </h2>
          <p className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.8] max-w-[780px] mx-auto mb-6">
            Agende uma Strategic Discovery Call para entendermos o perfil da sua equipa, os países envolvidos e como o Global Mobility Assurance pode ser estruturado para a sua empresa.
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
            Somos uma empresa de <strong className="font-[500] text-gold-l">Global Mobility Assurance</strong>. O benefício para o colaborador é uma consequência do nosso trabalho. O valor para a empresa está na mitigação do risco humano da mobilidade internacional.
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

/* ─────────────────────────── O QUE ESTAMOS ASSEGURANDO ─────────────────────────── */
function OqueAsseguramos() {
  const itens = [
    "Identificar riscos que normalmente ficam invisíveis",
    "Reduzir decisões baseadas apenas em perceção",
    "Tratar os fatores identificados",
    "Coordenar diferentes especialistas",
    "Acompanhar a adaptação",
    "Produzir evidências sobre a evolução da mobilidade",
    "Apoiar a empresa antes que o problema se transforme em turnover",
  ];
  return (
    <section className="bg-black py-24 md:py-32 px-6 lg:px-20 border-t border-b18">
      <div className="mx-auto max-w-[900px]">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          Escopo e limites
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-10 text-center">
          O que estamos <span className="text-gold-l italic">a assegurar?</span>
        </h2>
        <p className="font-body font-[300] text-[16px] md:text-[18px] text-white/85 leading-[1.85] text-center max-w-[780px] mx-auto mb-10">
          Não asseguramos que o profissional permanecerá na empresa independentemente de qualquer circunstância.
        </p>
        <p className="font-body font-[400] text-[15px] md:text-[16px] text-gold uppercase tracking-[0.15em] text-center mb-8">
          Asseguramos que existe um processo estruturado para:
        </p>
        <ul className="max-w-[780px] mx-auto space-y-4">
          {itens.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 font-body text-[15px] md:text-[16px] font-[300] text-white/90 leading-[1.7]"
            >
              <span className="mt-[10px] h-px w-5 bg-gold shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────── COMO GERAMOS VALOR (3 PÚBLICOS) ─────────────────────────── */
function ComoGeramosValor() {
  const empresa = [
    "Redução dos riscos humanos associados à mobilidade internacional",
    "Maior probabilidade de retenção do talento",
    "Integração mais rápida e estruturada",
    "Redução do risco de retorno antecipado",
    "Maior produtividade durante os primeiros meses",
    "Melhor retorno sobre o investimento realizado",
    "Apoio às equipas de RH e Global Mobility",
    "Informação estruturada para tomada de decisão",
  ];
  const executivo = [
    "Clareza antes da mudança",
    "Maior preparação para a nova realidade",
    "Apoio nas decisões críticas",
    "Redução da ansiedade durante a transição",
    "Coordenação de especialistas",
    "Acompanhamento estruturado",
    "Maior confiança para iniciar uma nova etapa profissional e pessoal",
  ];
  const familia = [
    "Alinhamento de expectativas",
    "Preparação para a mudança",
    "Estratégia para habitação e educação",
    "Melhor integração territorial",
    "Maior estabilidade emocional",
    "Apoio durante a adaptação",
    "Construção de uma base sólida para a permanência no novo país",
  ];
  const colunas = [
    { title: "Para a empresa", items: empresa },
    { title: "Para o executivo", items: executivo },
    { title: "Para a família", items: familia },
  ];
  return (
    <section className="bg-[#06091a] py-24 md:py-32 px-6 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          Valor entregue
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-14 text-center max-w-[880px] mx-auto">
          Como <span className="text-gold-l italic">geramos valor.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {colunas.map((col) => (
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
                    className="flex items-start gap-3 font-body text-[14px] md:text-[15px] font-[300] text-white/90 leading-[1.6]"
                  >
                    <span className="mt-[9px] h-px w-4 bg-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        "Menor risco de mobilidade",
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
