import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { MarketResearchSection } from "@/components/sections/MarketResearchSection";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
import sobreHero from "@/assets/sobre-hero.jpg";
import fredericoNewAsset from "@/assets/frederico_new.webp.asset.json";
import { useText } from "@/lib/useSiteContent";

const problemLisboa = fredericoNewAsset.url;

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a MOOVIA, Global Mobility Success" },
      { name: "description", content: "A MOOVIA existe para aumentar a probabilidade de sucesso de cada sucesso humano, através de estratégia, coordenação e inteligência de fatores humanos." },
      { property: "og:title", content: "Sobre a MOOVIA, Global Mobility Success" },
      { property: "og:description", content: "A MOOVIA existe para aumentar a probabilidade de sucesso de cada sucesso humano." },
      { property: "og:url", content: "https://mooviaportugal.com/sobre" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: sobreHero },
      { name: "twitter:title", content: "Sobre a MOOVIA" },
      { name: "twitter:description", content: "Antes de coordenar transições internacionais, vivemos as nossas." },
      { name: "twitter:image", content: sobreHero },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/sobre" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://mooviaportugal.com/" },
            { "@type": "ListItem", position: 2, name: "Sobre", item: "https://mooviaportugal.com/sobre" },
          ],
        }),
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const historiaVisible = useText("section.historia.visible", "true") === "true";

  return (
    <SiteLayout>
      <Hero />
      <WhoWeAreSection />
      <OrigemMercado />
      <EquacaoMoovia />
      
      <MarketResearchSection />
      <SaudeMentalMigrantes />
      <NossaCategoria />
      <OqueSomos />
      <ComparacaoCategoria />
      <Diferencia />
      <MetodoSection />
      <RaizesEAsas />

      <ComoConstruimosInteligencia />
      <ComoFazemosSection />
      
      <PosicaoMarca />
      <MethodologySection />
      <GlossarioConceitual />
      <HowWeBuiltTimeline />
      <Cta />
    </SiteLayout>
  );
}

/* ─────────────────────── GLOSSÁRIO CONCEITUAL ─────────────────────── */
function GlossarioConceitual() {
  const itens = [
    { termo: "Global Mobility Assurance", desc: "A disciplina de gestão." },
    { termo: "Fatores Humanos", desc: "Aquilo que identificamos, avaliamos e acompanhamos." },
    { termo: "Sinais Humanos", desc: "Indicadores e sinais observados ao longo da mobilidade." },
    { termo: "Human Mobility Intelligence", desc: "A inteligência produzida pela combinação de dados, metodologias preditivas, tecnologia e interpretação humana." },
    { termo: "Inteligência acionável", desc: "Informação estruturada que apoia a tomada de decisão." },
    { termo: "Resultados da Mobilidade Internacional", desc: "Integração, adaptação, engajamento, produtividade, retenção, etc." },
    { termo: "Global Mobility Success", desc: "O resultado desejado." },
  ];

  return (
    <section className="bg-[#06091a] py-24 px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Glossário Conceitual</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14">
          Como tudo se <span className="italic text-gold-l">conecta.</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {itens.map((item, i) => (
            <motion.div
              key={item.termo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-b18 bg-w05 p-6"
            >
              <h3 className="font-display text-[16px] text-gold-l mb-2 font-[400]">{item.termo}</h3>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.6]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────── RAÍZES E ASAS ─────────────────────── */
function RaizesEAsas() {
  const camadas = [
    {
      n: "01",
      titulo: "Aquisição estruturada de dados",
      texto: "Questionários, entrevistas e evidências documentais que transformam contexto humano em informação organizada.",
    },
    {
      n: "02",
      titulo: "Análise especializada",
      texto: "A experiência humana assegura que o contexto específico de cada missão é corretamente interpretado.",
    },
  ];

  return (
    <section className="bg-black py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Metodologia Própria</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-8">
          Metodologia <span className="italic text-gold-l">Raízes e Asas</span>.
        </h2>
        <p className="max-w-[820px] font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9] mb-6">
          Um framework proprietário de engenharia do conhecimento que formaliza décadas de experiência em adaptação humana, convertendo conceitos psicológicos, familiares e comportamentais em variáveis estruturadas, indicadores e regras de decisão que alimentam o Motor de Decisão da MOOVIA.
        </p>
        <p className="max-w-[820px] font-body font-[300] text-[15px] md:text-[16px] text-w35 leading-[1.9] mb-14">
          O Motor de Decisão da MOOVIA assenta em camadas complementares que cruzam centenas de variáveis através de metodologias e ponderações proprietárias, sempre com análise especializada.
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {camadas.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-b18 bg-w05 p-8"
            >
              <span className="block font-display text-[1.4rem] font-[300] text-gold mb-3">{c.n}</span>
              <h3 className="font-display text-[1.15rem] text-white mb-3 font-[300]">{c.titulo}</h3>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75]">{c.texto}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-body text-[13px] font-[300] italic text-w35 leading-[1.8] max-w-[820px]">
          A arquitetura foi concebida para evoluir continuamente, constituindo um dos principais ativos intelectuais da MOOVIA.
        </p>
      </div>
    </section>
  );
}



/* ─────────────────── COMO CONSTRUÍMOS A INTELIGÊNCIA DA MOOVIA ─────────────────── */
function ComoConstruimosInteligencia() {
  const cadeia = [
    "Conhecimento humano",
    "Dados estruturados",
    "Regras e scores",
    "Aprendizagem estatística",
    "Modelos preditivos",
    "Plataforma de decisão",
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Evolução do produto</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-8">
          A metodologia foi desenvolvida a partir de <span className="italic text-gold-l">oito pilares.</span>
        </h2>
        <p className="max-w-[820px] font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9] mb-12">
          O produto nasce do conhecimento estruturado gerado pelos especialistas e dos dados recolhidos em cada caso.
        </p>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-14">
          {cadeia.map((etapa, i) => (
            <div key={etapa} className="flex items-center gap-3 md:gap-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="inline-block px-4 py-2 border border-gold/40 bg-w05 font-body font-[400] text-[13px] md:text-[14px] text-white/90"
              >
                {etapa}
              </motion.span>
              {i < cadeia.length - 1 && <span className="text-gold/60 text-lg">→</span>}
            </div>
          ))}
        </div>

        <div className="max-w-[860px] space-y-8 font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9]">
          <p>
            A primeira versão não depende de Inteligência Artificial preditiva. Depende de transformar o conhecimento da equipa, feito de psicologia aplicada, inteligência de fatores humanos e regras de negócio, numa lógica computacional explicável.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────── HOW WE BUILT GLOBAL MOBILITY ASSESSMENT ─────────────────── */
function HowWeBuiltTimeline() {
  const marcos = [
    { texto: "Experiência internacional como expatriados" },
    { texto: "Liderança em negócios internacionais" },
    { texto: "Metodologias de Risk Intelligence" },
    { texto: "Ciência comportamental e metodologias psicológicas" },
    { texto: "Engenharia de decisão e motor de regras" },
    { texto: "Estudos de caso e assessments reais" },
    { texto: "Refinamento metodológico contínuo" },
    { texto: "Arquitetura jurídica e Privacy by Design" },
  ];
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1000px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Origem e método</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14">
          A metodologia foi desenvolvida a partir de <span className="italic text-gold-l">oito pilares.</span>
        </h2>


        <ol className="relative border-l border-gold/30 pl-8 md:pl-10 space-y-8">
          {marcos.map((m, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[42px] md:-left-[50px] top-2 h-2 w-2 rounded-full bg-gold" />
              <p className="font-body font-[300] text-[15px] md:text-[16px] text-white/85 leading-[1.7]">
                {m.texto}
              </p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-14 font-display font-[200] italic text-gold-l text-[clamp(20px,2.4vw,28px)] leading-[1.4] max-w-[820px]">
          A MOOVIA não nasceu de uma ideia. Nasceu da combinação entre experiência internacional, ciência comportamental e Risk Intelligence.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── A NOSSA CATEGORIA ─────────────────────────── */
function NossaCategoria() {
  const naoSomos = [
    "uma empresa de relocation",
    "uma empresa de imigração",
    "uma consultoria de Recursos Humanos",
    "uma empresa de benefícios",
    "uma consultoria tradicional de Global Mobility",
  ];
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[900px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">A nossa categoria</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-10">
          Criámos uma nova <span className="italic text-gold-l">camada de assurance</span> sobre o sucesso humano.
        </h2>
        <div className="space-y-6 font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9]">
          <p>
            Acreditamos que as categorias atualmente existentes não descrevem aquilo que fazemos.
          </p>
          <p>Não somos:</p>
          <ul className="space-y-2 pl-0 list-none">
            {naoSomos.map((n) => (
              <li key={n} className="flex items-start gap-3">
                <img src="/mooviagold.png" alt="" className="mt-[6px] h-3 w-3 object-contain shrink-0 opacity-80" />
                <span className="text-white/85">{n}</span>
              </li>
            ))}
          </ul>
          <p>
            Todas estas empresas desempenham um papel importante dentro do sucesso humano. Nós atuamos num espaço diferente.
          </p>
          <p>
            Criámos uma camada de <strong className="font-[500] text-gold-l">Global Mobility Assurance</strong> sobre o sucesso humano. O nosso objetivo é claro: identificar, compreender e avaliar os fatores humanos que podem comprometer o sucesso de um sucesso humano.
          </p>
          <p>
            Assim como Revenue Assurance surgiu para identificar perdas invisíveis dentro das telecomunicações, acreditamos que Global Mobility Assurance surge para identificar fatores humanos invisíveis dentro do sucesso humano.
          </p>
        </div>
        <div className="mt-12 border-l-2 border-gold pl-6 md:pl-8 py-4 space-y-4">
          <p className="font-display font-[200] text-white text-[clamp(20px,2.4vw,28px)] leading-[1.4]">
            <span className="text-gold-l font-normal">Assurance</span> é a categoria.
          </p>
          <p className="font-display font-[200] text-white text-[clamp(20px,2.4vw,28px)] leading-[1.4]">
            <span className="text-gold-l font-normal">Strategy</span> é a disciplina.
          </p>
          <p className="font-display font-[200] text-white text-[clamp(20px,2.4vw,28px)] leading-[1.4]">
            <span className="text-gold-l font-normal">Success</span> é o resultado.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── O QUE SOMOS ───────────────────────────── */
function OqueSomos() {
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20">
      <div className="max-w-[900px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">Identidade</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14 text-center">
          O que somos
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-w05 border border-b18 p-8 md:p-10">
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-gold/60 mb-4">Para o colaborador</p>
            <p className="font-body font-[300] text-[17px] text-white/85 leading-[1.8]">
              A MOOVIA é um <strong className="font-[500] text-gold-l">benefício</strong> que oferece um acompanhamento de alto valor durante uma das maiores transições da sua vida.
            </p>
          </div>
          <div className="bg-w05 border border-b18 p-8 md:p-10">
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-gold/60 mb-4">Para a empresa</p>
            <p className="font-body font-[300] text-[17px] text-white/85 leading-[1.8]">
              A MOOVIA é um <strong className="font-[500] text-gold-l">parceiro estratégico</strong> em Global Mobility. Somos a camada de avaliação dos fatores humanos que protege o investimento feito em cada talento internacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SAÚDE MENTAL DE MIGRANTES ───────────────────── */
function SaudeMentalMigrantes() {
  const stats = [
    {
      texto: "Portugal tem hoje cerca de 1,1 milhões de estrangeiros residentes. Para muitos, a saúde mental continua a ser um tabu cultural que atrasa a procura de apoio profissional. Além disso, a crise habitacional é apontada pela Ordem dos Psicólogos Portugueses como um dos fatores que mais compromete o bem-estar emocional de quem chega.",
    },
    {
      texto: "O AXA Mind Health Report identifica um aumento de 11% em depressão e ansiedade entre jovens não-nativos num único ano. 56% dos millennials não-nativos apontam a solidão e o isolamento como fatores que prejudicam significativamente a sua saúde mental, um valor 87% superior aos não-nativos entre 55 e 75 anos.",
    },
    {
      texto: "80% dos não-nativos reportam preocupações de saúde mental ligadas ao ambiente de trabalho, e 49% encontram-se em burnout. Ainda assim, desde 2023 há uma redução de 21% no número de jovens que recorrem ao médico do trabalho para gerir a sua saúde mental, pois preferem procurar ajuda fora do ambiente profissional.\n\nIsto reforça exatamente o espaço onde a MOOVIA atua: antes de o problema se tornar visível para a empresa.",
    },
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">O CONTEXTO EM PORTUGAL</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14 text-center">
          A saúde mental de quem migra <span className="italic text-gold-l">não é um detalhe.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="w-10 h-px bg-gold mb-6 opacity-40" />
              <p className="font-body font-[300] text-[15px] text-w35 leading-[1.8] whitespace-pre-line">
                {s.texto}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center font-body text-[11px] tracking-[0.2em] uppercase text-w12">
          Fonte: AXA Mind Health Report · Ordem dos Psicólogos Portugueses
        </p>
      </div>
    </section>
  );
}

/* ────────────────────── COMPARAÇÃO DE CATEGORIA (GMM vs HMA) ────────────────────── */
function ComparacaoCategoria() {
  const gmm = [
    "Políticas",
    "Vistos",
    "Impostos",
    "Payroll",
    "Benefícios",
    "Fornecedores",
    "Compliance",
    "Logística da transferência",
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">Categoria de mercado</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-2 text-center max-w-[880px] mx-auto">
          A diferença para <span className="italic text-gold-l">Global Mobility Management.</span>
        </h2>
        <p className="font-body text-[12px] font-[400] tracking-[0.2em] uppercase text-gold/60 mb-14 text-center">
          Risk Intelligence. Human Success.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <div className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-3">Global Mobility Management</p>
            <p className="font-display font-[300] text-white text-[20px] leading-[1.3] mb-6">Administra a mobilidade</p>
            <ul className="space-y-3">
              {gmm.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-[15px] md:text-[16px] font-[300] text-white/85 leading-[1.6]">
                  <img src="/mooviagold.png" alt="" className="mt-[6px] h-3 w-3 object-contain shrink-0 opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-gold/40 bg-[rgba(173,137,87,0.04)] p-8 md:p-10 flex flex-col">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-3">Global Mobility Assurance</p>
            
            {/* Mockup visual de relatório */}
            <div className="mb-8 rounded-lg border border-gold/20 bg-black/40 p-6 shadow-xl">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-4 border-b border-gold/10 pb-2">
                EXEMPLO DE ENTREGÁVEL PARA EMPRESAS<br/>
                <span className="text-[9px] normal-case opacity-60">(Dados agregados e anonimizados)</span>
              </p>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-tighter text-w35">Mission Readiness Index</p>
                  <p className="text-2xl font-display font-[300] text-white">24 <span className="text-sm text-white/40">/ 100</span></p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-widest rounded-full">🟢 Healthy Mission</span>

                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Family Alignment", score: 82, color: "bg-emerald-500/50" },
                  { label: "Financial Preparedness", score: 76, color: "bg-emerald-500/50" },
                  { label: "Cultural Adaptation", score: 81, color: "bg-emerald-500/50" },
                  { label: "Career Continuity", score: 88, color: "bg-emerald-500/50" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-w70 font-[300]">
                      <span>{item.label}</span>
                      <span>{item.score}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[9px] text-white/30 italic leading-relaxed text-center border-t border-white/5 pt-4">
                Nota: "Estes indicadores são produzidos a partir da metodologia Global Mobility Assurance e não revelam respostas individuais nem informação pessoal identificável."
              </p>

            </div>

            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/90 leading-[1.85]">
              Avalia se as condições humanas, familiares, financeiras e territoriais estão alinhadas para que essa mobilidade produza o resultado esperado.
            </p>
          </div>
        </div>
        <div className="mt-14 text-center max-w-[900px] mx-auto">
          <p className="font-display font-[200] text-white text-[clamp(20px,2.6vw,32px)] leading-[1.3]">
            A área de Global Mobility faz a mobilidade acontecer.
          </p>
          <p className="font-display font-[200] italic text-gold-l text-[clamp(20px,2.6vw,32px)] leading-[1.3] mt-2">
            A MOOVIA ajuda a aumentar a confiança de que ela funcionará depois que acontecer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── COMO FAZEMOS (6 passos resumidos) ─────────────────────── */
function ComoFazemosSection() {
  const passos = [
    {
      n: "01",
      titulo: "Entendemos o contexto da empresa",
      texto: "Antes de avaliar o profissional, compreendemos a mobilidade proposta: posição, destino, remuneração, prazo esperado e critérios de sucesso definidos pela empresa.",
    },
    {
      n: "02",
      titulo: "Avaliamos o profissional e o contexto familiar",
      texto: "Entrevistas e análise multidimensional para compreender expectativas, capacidade de adaptação, alinhamento familiar e fatores emocionais. Não avaliamos competência técnica, mas sim as condições que podem favorecer ou comprometer o sucesso da transição.",
    },
    {
      n: "03",
      titulo: "Cruzamos inteligência humana e tecnologia",
      texto: "A entrevista identifica nuances que não aparecem num formulário. A tecnologia estrutura os dados e aumenta a consistência da análise.",
    },
    {
      n: "04",
      titulo: "Entregamos diagnóstico e avaliação",
      texto: "Para o colaborador, recomendações práticas e personalizadas. Para a empresa, respeitando o RGPD, uma visão executiva sem dados pessoais ou sensíveis.",
    },
    {
      n: "05",
      titulo: "Coordenamos a implementação",
      texto: "Transformamos o diagnóstico em ação através da rede de parceiros orquestrados pela MOOVIA.",
    },
    {
      n: "06",
      titulo: "Acompanhamos e medimos",
      texto: "Marcos aos 30, 60 e 90 dias, com relatórios executivos sobre evolução e opções de intervenção.",
    },
  ];
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Como fazemos</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14">
          Do contexto da empresa <span className="italic text-gold-l">à evolução medida.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {passos.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="pl-6 border-l-[3px] border-gold/60"
            >
              <span className="block font-display text-[1.6rem] font-[300] text-gold mb-2">{p.n}</span>
              <h3 className="font-display text-[1.15rem] text-white mb-3 font-[300]">{p.titulo}</h3>
              <p className="font-body text-[15px] font-[300] text-w35 leading-[1.8]">{p.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────── O NOSSO MÉTODO ─────────────────────────── */
function MetodoSection() {
  const blocos = [
    { n: "01", titulo: "Inteligência de Dados", texto: "Análise estruturada do contexto, objetivos e variáveis da mobilidade." },
    { n: "02", titulo: "Motor de Decisão Inteligente", texto: "O nosso framework tecnológico integra metodologia proprietária, regras de decisão e inteligência analítica para transformar milhares de pontos de informação em recomendações estruturadas, identificando dependências e fatores críticos para um sucesso humano bem-sucedido." },
    { n: "03", titulo: "Avaliação Estratégica Humana", texto: "O diagnóstico é validado e aprofundado através de entrevistas conduzidas por especialistas em estratégia de mobilidade e adaptação humana." },
    { n: "04", titulo: "Global Mobility Success Report", texto: "Um relatório estratégico personalizado com indicadores identificados, prioridades, recomendações e roadmap de implementação." },
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">O nosso método</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(30px,3.8vw,48px)] mb-10">
          O <span className="italic text-gold-l">Global Mobility Success Framework</span>
        </h2>
        <div className="max-w-[780px] space-y-4 font-body font-[300] text-[17px] text-w35 leading-[1.9] mb-14">
          <p>O sucesso humano tornou-se demasiado complexa para depender apenas da experiência ou de decisões isoladas.</p>
          <p>Por isso, a MOOVIA desenvolveu o Global Mobility Success Framework, uma metodologia própria que combina inteligência artificial, análise multidisciplinar e avaliação humana para apoiar decisões críticas de sucesso humano.</p>
          <p className="text-gold-l italic pt-2">O resultado é um diagnóstico estratégico profundo que introduz previsibilidade e orquestra todas as variáveis da mobilidade numa visão executiva única.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {blocos.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="pl-6 border-l-[3px] border-gold"
            >
              <span className="block font-display text-[2rem] font-[300] text-gold mb-2">{b.n}</span>
              <h3 className="font-display text-[1.2rem] text-white mb-3 font-[300]">{b.titulo}</h3>
              <p className="font-body text-[15px] font-[300] text-w35 leading-[1.75]">{b.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate min-h-[70vh] flex items-end overflow-hidden">
      <img
        src={sobreHero}
        alt="Lisboa ao entardecer"
        className="absolute inset-0 -z-20 h-full w-full object-cover saturate-[0.55] contrast-[1.15] brightness-[0.85] [filter:hue-rotate(-8deg)]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06091a]/95 via-[#06091a]/70 to-[#06091a]/30" />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-20 pb-24 pt-[180px]">

        {/* Split "Success / Strategy" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-8 items-center max-w-[1100px] border-y border-b18 py-8"
        >
          <div className="text-center md:text-left">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-2">Assurance</p>
            <p className="font-display font-[200] text-white text-[clamp(18px,2vw,24px)] leading-[1.3]">é a categoria.</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-b30" />
          <div className="text-center md:text-left">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-2">Strategy</p>
            <p className="font-display font-[200] text-white text-[clamp(18px,2vw,24px)] leading-[1.3]">é a disciplina.</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-b30" />
          <div className="text-center md:text-left">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-2">Success</p>
            <p className="font-display font-[200] text-white text-[clamp(18px,2vw,24px)] leading-[1.3]">é o resultado.</p>
          </div>
        </motion.div>


        <h1 className="font-display font-[200] text-white leading-[1.02] tracking-[-0.03em] text-[clamp(52px,7vw,96px)]">
          {[
            { t: "Antes de desenvolvermos", cls: "" },
            { t: "uma metodologia,", cls: "" },
            { t: "vivemos a experiência.", cls: "text-gold-l italic font-[300]" },
          ].map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${l.cls}`}
            >
              {l.t}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-6 max-w-[520px] font-body font-[300] text-[18px] text-w35 leading-[1.7]"
        >
          A MOOVIA não foi criada num escritório. Foi criada numa mudança de país com a família,
          com os mesmos erros, medos e decisões simultâneas que hoje coordenamos para os nossos
          clientes.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-10 max-w-[640px] font-display font-[200] italic text-gold-l text-[clamp(18px,2vw,24px)] leading-[1.4]"
        >
          O problema nunca foi mudar de país. Foi medir o sucesso da mudança.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────── HISTÓRIA ─────────────────────────── */
function Historia() {
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">A origem</p>
          <h2 className="font-display font-[200] text-white leading-[1.02] tracking-[-0.03em] text-[clamp(32px,4vw,52px)] mb-12">
            Antes de desenvolvermos<br />uma metodologia,<br /><span className="italic text-gold-l">vivemos a experiência.</span>
          </h2>
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="font-body font-[300] text-[17px] text-w35 leading-[1.95]"
            >
              A MOOVIA não foi criada num escritório. Foi criada numa mudança de país com a família, com os mesmos erros, medos e decisões simultâneas que hoje coordenamos para os nossos clientes.
            </motion.p>
            
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="border-l-2 border-gold bg-[rgba(173,137,87,0.04)] py-6 px-7 font-display font-[300] text-[22px] md:text-[26px] text-gold-l leading-[1.45] italic"
            >
              "O problema nunca foi mudar de país. Foi medir o sucesso da mudança."
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-body font-[300] text-[17px] text-w35 leading-[1.95]"
            >
              Em 2018, Frederico Prado veio para Lisboa com a família. Depois de quase três décadas liderando projetos e negócios internacionais, sabia navegar ambientes corporativos complexos. Mas não estava preparado para o que encontrou: dez decisões simultâneas, fornecedores desconectados e ninguém que coordenasse o todo.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="font-body font-[300] text-[17px] text-w35 leading-[1.95]"
            >
              A MOOVIA nasceu dessa experiência. Não como uma empresa de imigração ou relocation, mas como uma consultoria que coordena a jornada inteira, protegendo o sucesso de cada missão internacional ao longo do tempo.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden border border-b15">
            <img
              src={problemLisboa}
              alt="Frederico em Lisboa, 2018"
              className="w-full h-[560px] object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06091a]/30 to-transparent" />
          </div>
          <p className="mt-5 font-body font-[300] italic text-[12px] tracking-[0.04em] text-w35">
            Lisboa, 2018. O mesmo caminho que hoje coordenamos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ORIGEM (MERCADO) ─────────────────────────── */
function OrigemMercado() {
  const paragraphs = [
    "A MOOVIA nasceu da combinação entre quase três décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em diferentes continentes, e da vivência direta dos desafios de um sucesso humano.",
    "Ao longo de mais de 30 anos, a liderança da MOOVIA acompanhou projetos de expansão internacional, desenvolvimento de negócios e parcerias estratégicas em diferentes países, trabalhando com empresas e equipas em ambientes multiculturais e de elevada complexidade.",
    "Essa vivência, somada ao processo pessoal de mudança para Portugal, revelou um problema que o mercado ainda não tinha resolvido.",
    "A Global Mobility evoluiu na execução, mas continuava fragmentada na coordenação.",
    "Especialistas altamente competentes atuavam de forma independente, enquanto empresas e famílias permaneciam responsáveis por integrar decisões críticas que eram, por natureza, interdependentes.",
    "Foi dessa constatação que nasceu a MOOVIA.",
    "Não como mais uma empresa de sucesso humano.",
    "Mas como uma consultoria dedicada a coordenar decisões, reduzir riscos e aumentar a probabilidade de sucesso de cada sucesso humano.",
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20">
      <div className="max-w-[900px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">A origem</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(30px,3.8vw,48px)] mb-14">
          A experiência criou a convicção.<br />
          <span className="italic text-gold-l">O mercado confirmou a oportunidade.</span>
        </h2>
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="font-body font-[300] text-[17px] text-w35 leading-[1.9]"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 border-l-2 border-gold bg-[rgba(173,137,87,0.04)] py-7 px-7 font-display font-[200] text-[20px] text-gold-l leading-[1.6] italic"
        >
          "A MOOVIA não nasceu para fazer sucesso humano. Nasceu para aumentar a probabilidade de sucesso de cada sucesso humano."
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────── DIFERENCIA (contraposições) ─────────────────────────── */
function Diferencia() {
  const contrasts = [
    { them: "Os outros executam processos.", us: "A MOOVIA coordena decisões." },
    { them: "Os outros entregam serviços.", us: "A MOOVIA aumenta a probabilidade de sucesso." },
    { them: "Os outros resolvem etapas.", us: "A MOOVIA integra a jornada." },
    { them: "Os outros respondem a pedidos.", us: "A MOOVIA constrói estratégia." },
    { them: "Os outros trabalham de forma isolada.", us: "A MOOVIA orquestra especialistas." },
    { them: "Os outros entregam execução.", us: "A MOOVIA entrega previsibilidade." },
    { them: "Os outros acompanham a mudança.", us: "A MOOVIA acompanha a adaptação." },
    { them: "Os outros medem entregas.", us: "A MOOVIA mede sucesso." },
  ];
  return (
    <section className="relative overflow-hidden bg-black py-[120px] px-6 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[-12%] lg:right-[-8%] w-[600px] h-[600px] lg:w-[820px] lg:h-[820px]"
      >
        <RotatingLogo size="100%" opacity={0.04} duration={150} />
      </div>
      <div className="relative max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">Por que a MOOVIA</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(32px,4vw,52px)] mb-10">
          Por que a MOOVIA.
        </h2>
        <div className="font-body font-[300] text-[17px] text-w35 leading-[1.85] max-w-[720px] mb-14 space-y-4">
          <p>Não estamos apenas a construir uma empresa.</p>
          <p>Estamos a desafiar a forma como o sucesso humano é pensada.</p>
          <p>Durante décadas, o setor concentrou-se em executar processos.</p>
          <p>A MOOVIA parte de uma pergunta diferente:</p>
          <p className="text-gold-l italic font-display text-[22px] leading-[1.4] pt-2">
            "E se o verdadeiro produto da Global Mobility não fosse a mudança de país, mas o sucesso dessa mudança?"
          </p>
        </div>

        <div className="flex flex-col gap-2 my-10">
          {contrasts.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6 py-3 border-b border-white/[0.08]"
            >
              <span className="font-body font-[300] text-[15px] text-w35/70">{c.them}</span>
              <span className="font-body font-[500] text-[15px] text-gold">{c.us}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-[900px] mx-auto">
          <p className="font-display font-[200] text-white leading-[1.2] text-[clamp(22px,3vw,40px)]">
            Os outros executam etapas.
          </p>
          <p className="font-display font-[200] italic text-gold-l leading-[1.2] text-[clamp(22px,3vw,40px)]">
            A MOOVIA coordena decisões.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── A EQUAÇÃO DA SUA HISTÓRIA ─────────────────────────── */
function EquacaoMoovia() {
  const blocos = [
    {
      title: "CARREIRA INTERNACIONAL",
      text: "Décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em diferentes continentes.",
    },
    {
      title: "REVENUE ASSURANCE",
      text: "Identificação de riscos e perdas invisíveis, a disciplina que ensinou a MOOVIA a enxergar aquilo que os modelos tradicionais de gestão não capturam.",
    },
    {
      title: "METODOLOGIAS PRÓPRIAS",
      text: "A combinação de ciência do comportamento humano e engenharia de sistemas, transformando conhecimento especializado em processo estruturado e replicável.",
    },
    {
      title: "RAÍZES E ASAS — DRA. LETÍCIA DE MELLO",
      text: "A metodologia que estrutura a dimensão humana do sucesso humano, traduzindo adaptação, integração e bem-estar em variáveis mensuráveis.",
    },
    {
      title: "TECNOLOGIA — PABLO ALEJANDRO",
      text: "A arquitetura que converte esse conhecimento humano em lógica computacional explicável, rastreável e sem caixa-preta.",
    },
  ];

  return (
    <section className="bg-black py-[120px] px-6 lg:px-20 border-b border-b18 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          A EQUAÇÃO DA MOOVIA
        </p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-14 text-center">
          De onde viemos.
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          {blocos.map((bloco, i) => (
            <motion.div
              key={bloco.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative border border-b18 bg-w05 p-6 md:p-8 flex flex-col h-full hover:border-gold/40 transition-colors duration-500"
            >
              {/* Optional connector visual */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gold/20 text-xl font-thin">
                  +
                </div>
              )}
              {i === 2 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gold/20 text-xl font-thin">
                  =
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-6">
                <p className="font-body text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-gold leading-tight">
                  {bloco.title.split(" — ").map((part, idx) => (
                    <span key={idx} className={idx > 0 ? "block mt-1 text-[9px] opacity-70 tracking-widest" : ""}>
                      {part}
                    </span>
                  ))}
                </p>
                <img src="/mooviagold.png" alt="" className="h-3 w-3 object-contain shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-0.5" />
              </div>

              <p className="font-body text-[14px] md:text-[15px] font-[300] text-w35 leading-[1.7] mt-auto">
                {bloco.text}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 font-display font-[200] italic text-gold-l text-[clamp(18px,2.4vw,26px)] leading-[1.4] text-center max-w-[820px] mx-auto">
          A MOOVIA é a aplicação dessa experiência à proteção do investimento humano.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── POSIÇÃO DA MARCA (nova) ─────────────────────────── */
function PosicaoMarca() {
  const blocos = [
    ["Não estamos a reinventar a Global Mobility.", "Estamos a redefinir a forma como o seu sucesso é medido."],
    ["Durante anos, a indústria concentrou-se na execução da mobilidade.", "A MOOVIA concentra-se no resultado dessa mobilidade."],
    ["Acreditamos que o sucesso não se mede pela chegada ao destino.", "Mede-se pela integração, retenção, adaptação e geração de valor para empresas e pessoas."],
    ["Não coordenamos apenas sucessos humanos.", "Coordenamos o sucesso do sucesso humano."],
  ];
  return (
    <section className="relative bg-black py-[160px] px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 [background:radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(9,24,61,0.6)_0%,transparent_65%)]" />
      <div className="relative max-w-[900px] mx-auto text-center">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-10">A posição da marca</p>
        <div className="space-y-10 mb-14">
          {blocos.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <p className="font-display font-[200] text-white/70 text-[clamp(18px,2vw,24px)] leading-[1.4]">{b[0]}</p>
              <p className="font-display font-[200] italic text-gold-l text-[clamp(20px,2.4vw,28px)] leading-[1.4] mt-2">{b[1]}</p>
            </motion.div>
          ))}
        </div>
        <div className="w-12 h-px bg-gold mx-auto mb-10" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-[200] text-white leading-[1.15] text-[clamp(28px,4vw,48px)]"
        >
          Não coordenamos mobilidades internacionais.<br />
          <span className="italic text-gold-l">Coordenamos o seu sucesso.</span>
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */
function Cta() {
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20">
      <div className="max-w-[760px] mx-auto text-center">
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(32px,4vw,52px)] mb-8">
          O primeiro passo<br />é a conversa certa.
        </h2>
        <p className="font-body font-[300] text-[17px] text-w35 leading-[1.7] max-w-[480px] mx-auto mb-12">
          Uma conversa direta para entender o seu caso e mostrar como a MOOVIA pensa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            hash="lead-form"
            className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[12px] tracking-[0.22em] uppercase px-10 py-4 isolate"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-gold">Conhecer Global Mobility Assurance</span>
          </Link>
          <Link
            to="/home"
            hash="lead-form"
            className="group relative overflow-hidden border border-b30 text-gold font-body font-[500] text-[12px] tracking-[0.22em] uppercase px-10 py-4 isolate hover:border-gold"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-[#06091a]">Como funciona</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
