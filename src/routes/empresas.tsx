import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { EverybodyWins } from "@/components/sections/EverybodyWins";
import { BusinessModelSection } from "@/components/sections/BusinessModelSection";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";
import dashboardMock from "@/assets/dashboard-mock.png.asset.json";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Global Mobility Assurance | MOOVIA" },
      {
        name: "description",
        content:
          "A nova categoria para tornar mensurável a dimensão humana da mobilidade internacional através da metodologia Human Mobility Assurance.",
      },
      { property: "og:title", content: "Global Mobility Assurance | MOOVIA" },
      {
        property: "og:description",
        content:
          "Programa B2B da MOOVIA para tornar mensurável a dimensão humana da mobilidade internacional através da metodologia Human Mobility Assurance.",
      },
    ],
  }),
  component: EmpresasPage,
});

function EmpresasPage() {
  const colaborador = [
    "Assessment inicial",
    "Roadmap personalizado",
    "Acompanhamento 30 dias",
    "Acompanhamento 60 dias",
    "Acompanhamento 90 dias",
    "Executive Mobility Success Dashboard",
  ];
  const empresa = [
    "Monitorização estruturada da mobilidade",
    "Global Mobility Success Dashboard",
    "Recomendações para RH e liderança",
    "Maior capacidade de intervenção preventiva",
    "Identificar e avaliar os fatores humanos da mobilidade",
    "Maior retenção e redução do turnover",
    "Fortalecimento da marca empregadora",
    "produzindo indicadores que permitem acompanhar a evolução da mobilidade e apoiar a avaliação do retorno sobre o investimento realizado",
  ];
  const familia = [
    "Acolhimento",
    "Integração",
    "Apoio à família",
    "Redução da ansiedade",
    "Melhor experiência",
  ];

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteLayout>
      {/* 1. HERO */}
      <section className="relative bg-[#06091a] pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
            >
              A nossa metodologia
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(32px,5vw,64px)] leading-[1.05] tracking-[-0.03em] mb-12 max-w-[900px]"
            >
              <span className="block font-[200] text-white mb-2 italic">GLOBAL MOBILITY ASSURANCE</span>
              <span className="block text-gold-l italic font-[300]">A nova categoria para tornar mensurável a dimensão humana da mobilidade internacional.</span>
            </motion.h1>
            
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-[14px] md:text-[16px] font-[400] text-gold-l/90 leading-[1.5] max-w-[700px]"
              >
                Um benefício para o colaborador. Um investimento mensurável para a empresa.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white/50 border-l-2 border-gold/50 pl-6 py-2 italic"
              >
                Contratado pela empresa. Vivido pelo executivo. Medido ao longo do tempo.
              </motion.p>

              <div className="space-y-6 max-w-[800px]">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-[16px] md:text-[18px] font-[600] text-white"
                >
                  A mobilidade internacional já é medida. Mas não onde mais importa.
                </motion.p>
                
                <div className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.7] space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-white/90"
                  >
                    As empresas acompanham vistos, custos, prazos e processos. A MOOVIA acrescenta uma nova camada de inteligência: mede e acompanha os fatores humanos que podem determinar o sucesso de uma mobilidade internacional.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Através da metodologia Human Mobility Assurance, transformamos fatores como integração, adaptação familiar, bem-estar e prontidão em indicadores estruturados para apoiar decisões de Global Mobility.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    A metodologia Human Mobility Assurance foi desenvolvida pela MOOVIA com base em princípios internacionalmente reconhecidos de gestão de risco, adaptados ao contexto da mobilidade internacional.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center"
          >
            <ConstellationLogo size={360} />
          </motion.div>
        </div>
      </section>

      {/* 2. O INVESTIMENTO EM TALENTO INTERNACIONAL EXIGE ATENÇÃO */}
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
        </div>
      </section>

      {/* 3. TRÊS INTERVENIENTES */}
      <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center"
          >
            Três intervenientes
          </motion.p>
          <h2 className="font-display text-[clamp(32px,5vw,60px)] leading-[1.05] tracking-[-0.03em] mb-8 text-center max-w-[1000px] mx-auto">
            <span className="block font-[200] text-white italic">Um programa desenhado para quem decide,</span>
            <span className="block text-gold-l font-[300] mt-2">quem coordena e quem vive a mobilidade.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-[900px] mx-auto">
            {[
              { label: "EMPRESA", desc: "ROI e Governança", icon: "briefcase" },
              { label: "EXECUTIVO", desc: "Foco e Performance", icon: "user" },
              { label: "FAMÍLIA", desc: "Bem-estar e Adaptação", icon: "users" }
            ].map((item) => (
              <div key={item.label} className="text-center p-6 border border-white/5 bg-white/5">
                <p className="text-gold font-body text-[11px] tracking-widest mb-2">{item.label}</p>
                <p className="text-white/70 font-display text-[14px]">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.8] max-w-[850px] mx-auto text-center mb-20">
            O sucesso de uma mobilidade internacional não é um evento isolado, mas o resultado da harmonia entre os objetivos da organização, a carreira do talento e a estabilidade do núcleo familiar.
          </p>
        </div>
      </section>

      {/* 4. PARA A EMPRESA · PARA O EXECUTIVO · PARA A FAMÍLIA (fundido) */}
      <section className="bg-[#06091a] pb-20 md:pb-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-6 text-center max-w-[900px] mx-auto">
            Um benefício para o colaborador.{" "}
            <span className="text-gold-l italic">Inteligência para a empresa.</span>
          </h2>
          <p className="font-body text-[14px] md:text-[15px] font-[300] italic text-white/60 leading-[1.7] text-center max-w-[720px] mx-auto mb-16">
            Atendemos empresas de todos os tamanhos. Cada proposta é desenhada à medida do perfil e da complexidade de cada transição.
          </p>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { title: "Para a empresa", items: empresa },
              { title: "Para o executivo", items: colaborador },
              { title: "Para a família", items: familia },
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

          {/* 5. VELOCIDADE DE EXECUÇÃO */}
          <div className="mt-14 md:mt-16 mx-auto max-w-[880px] border-l-2 border-gold pl-6 md:pl-8">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-3">
              Ação coordenada
            </p>
            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/85 leading-[1.85]">
              A Human Mobility Assurance não termina no diagnóstico. Quando os
              indicadores identificam uma necessidade específica, a MOOVIA pode
              ativar e coordenar especialistas qualificados para apoiar o
              executivo e a família, mantendo a intervenção alinhada aos
              fatores identificados.
            </p>
          </div>
        </div>
      </section>
      
      {/* 6. VALIDAÇÃO JURÍDICA */}
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

      {/* 7. NOSSO INSIGHT */}
      <NossaTeseSection />

      {/* 8. CONFIDENCIALIDADE E SEPARAÇÃO DE VISÕES */}
      <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="bg-w05 border border-b18 p-8 md:p-10 max-w-[1200px] mx-auto">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-6 text-center">
              Confidencialidade e separação de visões
            </p>
            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/90 leading-[1.8] max-w-[900px] mx-auto text-center">
              O acompanhamento do participante é confidencial e realizado em conformidade com a legislação aplicável.
            </p>
            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/80 leading-[1.8] max-w-[900px] mx-auto text-center mt-4">
              A empresa não recebe respostas individuais nem informação confidencial do participante. Recebe apenas indicadores agregados e estatísticos, sem acesso às entrevistas, às respostas individuais ou ao dashboard pessoal do colaborador.
            </p>
            
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 mt-12 max-w-[1100px] mx-auto items-center">
              <div className="space-y-6">
                <div className="border border-b18 bg-w05 p-6">
                  <p className="font-body text-[11px] tracking-[0.24em] uppercase text-gold mb-3">
                    Dashboard Individual
                  </p>
                  <p className="font-body text-[14px] font-[300] text-white/80 leading-[1.7]">
                    Exclusivo do participante, com o seu roadmap e recomendações pessoais.
                  </p>
                </div>
                <div className="border border-b18 bg-w05 p-6">
                  <p className="font-body text-[11px] tracking-[0.24em] uppercase text-gold mb-3">
                    Dashboard Corporativo
                  </p>
                  <p className="font-body text-[14px] font-[300] text-white/80 leading-[1.7]">
                    Apenas indicadores agregados, tendências e recomendações de gestão para a empresa.
                  </p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gold/10 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-lg overflow-hidden border border-gold/30 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                  <img 
                    src={dashboardMock.url} 
                    alt="Mock do Dashboard Corporativo MOOVIA" 
                    className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/80">Visualização de Dashboard Corporativo</span>
                </div>
              </motion.div>
            </div>

            <p className="font-body text-[12px] font-[300] text-white/50 leading-[1.7] max-w-[900px] mx-auto mt-12 text-center">
              Os resultados produzidos pela MOOVIA não constituem instrumento de avaliação de desempenho e não podem, por si só, fundamentar decisões de remuneração, promoção, procedimento disciplinar ou cessação da relação laboral. A participação no programa é voluntária.
            </p>
          </div>
        </div>
      </section>

      {/* 9. COMO FUNCIONA — O MOOVIA FRAMEWORK */}
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

      {/* 10. GLOBAL MOBILITY SUCCESS — EVERYBODY WINS */}
      <EverybodyWins />

      {/* 11. MODELO DE NEGÓCIO MOOVIA */}
      <BusinessModelSection />

      {/* 12. FORMULÁRIO */}
      <section id="lead-form" className="bg-black py-24 md:py-32 px-6 lg:px-20">
        <UnifiedLeadForm context="empresas" />
      </section>
    </SiteLayout>
  );
}