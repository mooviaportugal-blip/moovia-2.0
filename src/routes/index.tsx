import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { NossaTeseSection } from "@/components/sections/NossaTeseSection";
import { B2BRiskSection } from "@/components/sections/B2BRiskSection";

import { ProcessSection } from "@/components/sections/ProcessSection";



import { AssessmentSection } from "@/components/sections/AssessmentSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { MandatoRedeSection } from "@/components/sections/MandatoRedeSection";

import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { FamiliesSection } from "@/components/sections/FamiliesSection";

import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { MaiaSection } from "@/components/sections/MaiaSection";

import { FormSection } from "@/components/sections/FormSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { LisboaGallery } from "@/components/sections/LisboaGallery";
import { AirplaneScene } from "@/components/AirplaneScene";
import { useAirplaneEnabled } from "@/hooks/useAirplaneEnabled";
import { motion } from "framer-motion";
import { MaintenancePage } from "@/components/site/MaintenancePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOVIA Portugal — Human Mobility Assurance" },
      { name: "description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal: visto, moradia, escola, fiscalidade e adaptação familiar. MOOVIA — Human Mobility Assurance | Global Mobility Success Framework™" },
      { property: "og:title", content: "MOOVIA Portugal — Human Mobility Assurance" },
      { property: "og:description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal: visto, moradia, escola, fiscalidade e adaptação familiar. MOOVIA — Human Mobility Assurance | Global Mobility Success Framework™" },
      { property: "og:url", content: "https://mooviaportugal.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "MOOVIA Portugal — Human Mobility Assurance" },
      { name: "twitter:description", content: "A MOOVIA coordena sua mudança do Brasil para Portugal. MOOVIA — Human Mobility Assurance | Global Mobility Success Framework™" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "O que é a MOOVIA Portugal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A MOOVIA Portugal é uma empresa de coordenação de transição internacional de vida e património, especializada no corredor Brasil → Portugal. Diferente de agências de imigração ou imobiliárias, a MOOVIA coordena toda a jornada, visto, moradia, escola, fiscalidade e adaptação familiar, através de uma equipa multidisciplinar integrada.",
              },
            },
            {
              "@type": "Question",
              name: "Quanto custa se mudar para Portugal saindo do Brasil?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "O custo de uma mudança do Brasil para Portugal varia significativamente dependendo do perfil familiar, cidade de destino, tipo de visto e estratégia patrimonial. A MOOVIA realiza uma Avaliação Estratégica (€250, 60 minutos) que mapeia o perfil específico de cada família e entrega um Plano Estratégico de Transição Internacional personalizado.",
              },
            },
            {
              "@type": "Question",
              name: "Qual o visto mais adequado para brasileiros que querem morar em Portugal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A escolha do visto depende do perfil do candidato: D7 para renda passiva ou trabalho remoto, D8 para nómadas digitais, D2 para empreendedores, e Reagrupamento Familiar para quem tem familiar com residência legal em Portugal. A MOOVIA conta com a Dra. Laura Costa, especialista em mobilidade internacional, para definir a estratégia migratória correta para cada perfil.",
              },
            },
            {
              "@type": "Question",
              name: "Como funciona a Avaliação Estratégica da MOOVIA?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sessão de 60 minutos conduzida por Frederico Prado (Founder & CEO) e Dra. Letícia de Mello (psicóloga, adaptação familiar internacional), que mapeia perfil, objetivos, riscos e prontidão emocional da família. Entrega um Relatório Estratégico Personalizado com diagnóstico, mapa de prioridades, e estratégia educacional, habitacional e patrimonial. €250, abatidos no Mandato caso a família avance.",
              },
            },
            {
              "@type": "Question",
              name: "O que é um Mandato MOOVIA?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Contrato de acompanhamento completo da transição internacional, cobrindo os 4 Pilares da metodologia MOOVIA: PLANEJAMOS (antes da mudança), INSTALAMOS (na chegada), INTEGRAMOS (primeiros meses) e ESTRUTURAMOS (para a vida toda). Cada Mandato é construído sob medida para o perfil da família, com escopo e valor definidos após a Avaliação Estratégica.",
              },
            },
            {
              "@type": "Question",
              name: "A MOOVIA atende famílias no Brasil ou só em Portugal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Atende clientes no Brasil e em Portugal através de reuniões previamente agendadas por videoconferência. A equipa opera no corredor Brasil → Portugal e acompanha a família antes da mudança, durante a chegada e nos primeiros meses de adaptação em Portugal.",
              },
            },
            {
              "@type": "Question",
              name: "Qual a diferença entre a MOOVIA e uma agência de imigração?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Uma agência de imigração resolve a parte documental. A MOOVIA coordena tudo o que acontece antes, durante e depois: estratégia de mudança, processo migratório, busca de moradia, matrícula dos filhos, abertura de contas, adaptação emocional e estruturação patrimonial em Portugal. O problema de uma mudança internacional nunca é a burocracia, é que ninguém coordena o todo.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <MaintenancePage />;
}

// Home original preservada — reativar trocando o componente da rota acima.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HomeReal() {
  const airplaneEnabled = useAirplaneEnabled();
  return (
    <SiteLayout>
      {airplaneEnabled && <AirplaneScene />}
      <Hero />
      
      {/* MARQUEE, SEÇÃO 2 */}
      <div className="bg-black/80 border-y border-b18 h-[46px] flex items-center overflow-hidden relative z-20">
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-16 px-16 font-urbanist text-[11px] font-[400] tracking-[0.24em] uppercase text-w35">
              Transição Internacional <span className="text-gold text-[10px]">♦</span> 
              Brasil para Portugal <span className="text-gold text-[10px]">♦</span> 
              Coordenação de Vida e Património <span className="text-gold text-[10px]">♦</span> 
              Avaliação Estratégica <span className="text-gold text-[10px]">♦</span> 
              Mandato Personalizado <span className="text-gold text-[10px]">♦</span> 
              90 dias Pós-chegada <span className="text-gold text-[10px]">♦</span> 
              School Matching <span className="text-gold text-[10px]">♦</span> 
              Fiscalidade Internacional <span className="text-gold text-[10px]">♦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <ProblemSection />
      <B2BRiskSection />
      <NossaTeseSection />
      <ProcessSection />


      <CasesSection />
      <AssessmentSection />
      <EcossistemaSection />
      
      <FamiliesSection />
      
      <LisboaGallery />
      <ManifestoSection />
      <BlogTeaserSection />
      <MaiaSection />
      
      <FormSection />
    </SiteLayout>
  );
}
