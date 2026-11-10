import { createFileRoute } from "@tanstack/react-router";
import { FinalCtaStrip } from "@/components/sections/FinalCtaStrip";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import sobreHero from "@/assets/sobre-hero.jpg";
import heroHumanoid from "@/assets/hero-humanoid.png";
import threePillarsImg from "@/assets/three-pillars.png";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Levar a disciplina da assurance à mobilidade internacional." },
      {
        name: "description",
        content:
          "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás. Combinamos avaliação estruturada, conhecimento especializado e acompanhamento para ajudar colaboradores, famílias e organizações a navegar as transições internacionais.",
      },
      { property: "og:title", content: "Levar a disciplina da assurance à mobilidade internacional." },
      {
        property: "og:description",
        content:
          "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás.",
      },
      { property: "og:url", content: "https://moovia.global/sobre" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: sobreHero },
      { name: "twitter:title", content: "Levar a disciplina da assurance à mobilidade internacional." },
      {
        name: "twitter:description",
        content:
          "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás.",
      },
      { name: "twitter:image", content: sobreHero },
    ],
    links: [{ rel: "canonical", href: "https://moovia.global/sobre" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://moovia.global/" },
            { "@type": "ListItem", position: 2, name: "Sobre", item: "https://moovia.global/sobre" },
          ],
        }),
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <SiteLayout>
      <div className="bg-black text-white">
        <SobreHero />
        <SobreOrigem />
        <SobreAbordagem />
        <SobreComoNosEncaixamos />
        <FinalCtaStrip
          title="Tornar a mobilidade internacional mais informada, mais solidária e mais responsável perante as pessoas e os resultados do negócio."
          buttonText="Falar com a MOOVIA"
          subtitle="Cada proposta é adaptada ao perfil e à complexidade de cada transição."
        />
      </div>
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. HERO
   Fundo contínuo com a seção 2 em bg-black (--black: #06091a).
   Sem borda entre Hero e Seção 2.
   ───────────────────────────────────────────────────────────── */
function SobreHero() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Brilho radial muito sutil em peru centrado na metade direita (não clareia o fundo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(155, 122, 80, 0.05) 0%, rgba(6, 9, 26, 0) 70%)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Lado esquerdo: Textos do Hero */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-6">
              SOBRE A MOOVIA
            </p>

            {/* H1 em Wright Pro, branco, token compartilhado, máx 3 linhas */}
            <h1 className="sobre-hero-title font-display font-[300] text-white mb-8">
              Levar a disciplina da assurance à mobilidade internacional.
            </h1>

            {/* Parágrafo do Hero: INTRO canônico do documento do Wilson */}
            <p className="font-body text-[15px] md:text-[17px] text-white/80 font-[300] leading-[1.7] max-w-[54ch]">
              A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás. Combinamos avaliação estruturada, conhecimento especializado e acompanhamento para ajudar colaboradores, famílias e organizações a navegar as transições internacionais.
            </p>
          </div>

          {/* Lado direito: Humanoide com anéis concêntricos e legenda */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Anéis orbitais decorativos em SVG (aria-hidden) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow opacity-30"
                style={{ animationDuration: "90s" }}
              >
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  fill="none"
                  stroke="#9B7A50"
                  strokeWidth="0.75"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="#9B7A50"
                  strokeWidth="0.75"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="110"
                  fill="none"
                  stroke="#9B7A50"
                  strokeWidth="0.75"
                  strokeDasharray="2 6"
                />
              </svg>

              {/* Imagem do Humanoide espelhado */}
              <img
                src={heroHumanoid}
                alt="Representação visual do executivo em mobilidade global com anéis concêntricos de proteção"
                className="relative z-10 w-full h-full object-contain pointer-events-none select-none"
                style={{
                  transform: "scaleX(-1)",
                  mixBlendMode: "screen",
                  maskImage: "radial-gradient(closest-side, #000 68%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(closest-side, #000 68%, transparent 100%)",
                }}
              />
            </div>

            {/* Legenda decorativa em peru e branco */}
            <p
              aria-hidden="true"
              className="mt-4 font-body text-[12px] tracking-[0.24em] uppercase text-center text-gold/90 font-light"
            >
              <span className="text-white/80">Experiência humana</span> • <span className="text-white/80">Evidência</span> • <span className="text-gold">Ação</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. A NOSSA ORIGEM
   Fundo contínuo em bg-black (--black: #06091a).
   Forma bloco contínuo com o Hero.
   ───────────────────────────────────────────────────────────── */
function SobreOrigem() {
  const cards = [
    {
      title: "Carreira Internacional",
      text: "Décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em vários continentes.",
    },
    {
      title: "Revenue Assurance",
      text: "Identificar riscos e perdas ocultos: a disciplina que ensinou a MOOVIA a ver o que os modelos tradicionais de gestão não captam.",
    },
    {
      title: "Metodologias Próprias",
      text: "A combinação de ciência comportamental humana e engenharia de sistemas, transformando o conhecimento especializado num processo estruturado e replicável.",
    },
    {
      title: "Raízes e Asas",
      subtitle: "Dra. Letícia de Mello",
      text: "A metodologia que estrutura a dimensão humana do sucesso, traduzindo adaptação, integração e bem-estar em variáveis mensuráveis.",
    },
    {
      title: "Tecnologia",
      subtitle: "Pablo Alejandro",
      text: "A arquitetura que converte este conhecimento humano em lógica computacional explicável e rastreável, concebida para evitar uma ‘caixa negra’.",
    },
  ];

  return (
    <section className="bg-black pt-4 pb-24 md:pb-32 px-6 lg:px-12 border-b border-b18">
      <div className="max-w-[1240px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
          A NOSSA ORIGEM
        </p>

        <h2 className="sobre-section-title font-display text-[clamp(28px,3.4vw,46px)] leading-[1.18] font-[300] text-gold mb-12 max-w-[32ch]">
          De Revenue Assurance a Global Mobility Assurance.
        </h2>

        {/* 3 Parágrafos em 2 Colunas no Desktop / Empilhados no Mobile */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-20 text-white/80 font-body text-[15px] md:text-[16px] leading-[1.75] font-[300]">
          <div className="space-y-6">
            <p>
              A MOOVIA nasceu de uma amizade de décadas e de duas carreiras que se encontraram no mundo corporativo internacional, passando por Revenue Assurance, consultoria e tecnologia empresarial. Ambos os percursos trouxeram experiência direta dos desafios humanos de mudar de país por motivos de trabalho.
            </p>
            <p>
              Depois de anos a proteger o investimento corporativo em processos e receita, reconhecemos uma lacuna: as empresas gerem com cuidado vistos, habitação e custos de mobilidade, mas têm uma visibilidade menos consistente sobre a forma como colaboradores e famílias se adaptam ao longo de uma missão.
            </p>
          </div>
          <div>
            <p>
              Quisemos aplicar a mesma disciplina de rigor, evidência e rastreabilidade a esses fatores humanos: perceber o que está a mudar, identificar quando pode ser necessário apoio e verificar se a ação faz diferença.
            </p>
          </div>
        </div>

        {/* Bloco "O nosso legado." com 5 cards */}
        <div className="pt-10 border-t border-b18">
          <h3 className="font-display font-[300] text-white/95 text-[22px] md:text-[26px] mb-8">
            O nosso legado.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-b18 bg-black-3 p-5 flex flex-col justify-between rounded-sm"
              >
                <div>
                  <p className="font-display text-[15px] md:text-[16px] text-gold font-normal mb-1">
                    {c.title}
                  </p>
                  {c.subtitle && (
                    <p className="font-body text-[11px] uppercase tracking-wider text-gold/75 mb-3 font-medium">
                      {c.subtitle}
                    </p>
                  )}
                  <p className="font-body text-[13px] md:text-[14px] text-white/70 font-[300] leading-[1.6]">
                    {c.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Linha de fecho destacada, centralizada, em peru */}
          <p className="mt-14 text-center font-display text-[clamp(17px,2.2vw,24px)] font-[300] text-gold tracking-wide">
            A MOOVIA é a aplicação desta experiência à proteção do investimento humano.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. A NOSSA ABORDAGEM
   Faixa alternada em bg-black-2 (--black-2: #0b1225).
   ───────────────────────────────────────────────────────────── */
function SobreAbordagem() {
  const cards = [
    {
      num: "01",
      title: "Experiência Humana",
      highlight: "Compreender as pessoas para além do processo de relocalização.",
      text: "Cada missão internacional envolve desafios pessoais, profissionais, culturais e familiares. Através de avaliações estruturadas, conversas significativas e check-ins regulares, percebemos como as pessoas se estão a adaptar, de que apoio precisam e como evoluem as suas circunstâncias.",
    },
    {
      num: "02",
      title: "Inteligência de Mobilidade",
      highlight: "Transformar conhecimento humano em ação informada.",
      text: "Ligamos sinais relevantes ao longo do tempo para identificar riscos emergentes, fatores de proteção e mudanças na adaptação. Critérios explicáveis e análise assistida por inteligência artificial apoiam os nossos especialistas na interpretação desses padrões e na recomendação de intervenções adequadas, à medida que estas capacidades são desenvolvidas e validadas.",
      extra: "A tecnologia apoia a análise. A experiência humana orienta as decisões.",
    },
    {
      num: "03",
      title: "Painel de Global Mobility",
      highlight: "Apoio pessoal e visibilidade corporativa, com a privacidade no centro.",
      text: "Os colaboradores e as famílias recebem avaliações confidenciais, orientação personalizada e apoio contínuo. As empresas recebem indicadores ao nível da missão, tendências e ações recomendadas, sem acesso desnecessário a informação pessoal ou familiar.",
      extra: "Isto permite à MOOVIA apoiar as pessoas e, ao mesmo tempo, ajudar as organizações a tomar decisões de mobilidade mais informadas.",
    },
  ];

  return (
    <section className="bg-black-2 py-24 md:py-32 px-6 lg:px-12 border-b border-b18">
      <div className="max-w-[1240px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
          A NOSSA ABORDAGEM
        </p>

        <h2 className="sobre-section-title font-display text-[clamp(28px,3.4vw,46px)] leading-[1.18] font-[300] text-gold mb-6 max-w-[32ch]">
          Três princípios orientam o nosso trabalho.
        </h2>

        {/* Parágrafo canônico do documento do Wilson */}
        <p className="font-body text-[15px] md:text-[17px] text-white/80 font-[300] leading-[1.7] max-w-[72ch] mb-16">
          A MOOVIA combina compreensão humana, inteligência estruturada e partilha responsável de informação para apoiar as missões internacionais ao longo de toda a jornada.
        </p>

        {/* Imagem dos 3 pilares */}
        <div className="relative my-10 max-w-[960px] mx-auto">
          {/* Imagem dos 3 pilares com máscara radial suave */}
          <div className="relative flex justify-center items-center">
            <img
              src={threePillarsImg}
              alt="Os três pilares da MOOVIA: Experiência, Evidência e Ação"
              className="w-full max-h-[340px] md:max-h-[420px] object-contain pointer-events-none select-none"
              style={{
                maskImage:
                  "radial-gradient(ellipse 92% 88% at 50% 50%, #000 70%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 88% at 50% 50%, #000 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* 3 cards numerados com os títulos do documento do Wilson */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {cards.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-b18 bg-w05 p-7 md:p-8 flex flex-col justify-between rounded-sm"
            >
              <div>
                <span className="font-mono text-gold/60 text-[13px] tracking-widest mb-3 block">
                  {c.num}
                </span>
                <p className="font-body text-[12px] tracking-[0.22em] uppercase text-gold font-medium mb-3">
                  {c.title}
                </p>
                <h3 className="font-display text-[18px] md:text-[20px] text-white font-[300] leading-[1.3] mb-4">
                  {c.highlight}
                </h3>
                <p className="font-body text-[14px] md:text-[15px] text-white/75 font-[300] leading-[1.7] mb-4">
                  {c.text}
                </p>
              </div>
              {c.extra && (
                <p className="font-body text-[13px] text-gold/90 italic leading-[1.6] pt-3 border-t border-b18">
                  {c.extra}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. COMO NOS ENCAIXAMOS
   Fundo base em bg-black (--black: #06091a).
   ───────────────────────────────────────────────────────────── */
function SobreComoNosEncaixamos() {
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
    <section className="bg-black py-24 md:py-32 px-6 lg:px-12 border-b border-b18">
      <div className="max-w-[1240px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold font-medium mb-4">
          COMO NOS ENCAIXAMOS
        </p>

        {/* Título canônico: "We complement the existing global mobility ecosystem." */}
        <h2 className="sobre-section-title font-display text-[clamp(28px,3.4vw,46px)] leading-[1.18] font-[300] text-gold mb-12 max-w-[34ch]">
          Complementamos o ecossistema existente de mobilidade global.
        </h2>

        {/* 3 Parágrafos do documento do Wilson em 3 Colunas no Desktop / Empilhados no Mobile */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-20 text-white/80 font-body text-[15px] md:text-[16px] leading-[1.75] font-[300]">
          <div>
            <p>
              A MOOVIA não substitui prestadores de relocalização, equipas de Recursos Humanos nem serviços especializados. Complementamos o seu trabalho, focando-nos no que acontece para além da mudança prática: como os colaboradores e as famílias se adaptam, se integram e progridem ao longo de uma missão internacional.
            </p>
          </div>
          <div>
            <p>
              Ao ligar informação humana e contextual ao longo do tempo, a MOOVIA ajuda a identificar desafios emergentes, recomendar intervenções adequadas e apoiar uma melhor coordenação entre as pessoas e as organizações envolvidas.
            </p>
          </div>
          <div>
            <p>
              Ligamos a experiência humana à tomada de decisão corporativa, ajudando as empresas a proteger o seu investimento em mobilidade internacional e apoiando as pessoas que estão por trás dele.
            </p>
          </div>
        </div>

        {/* Bloco ilustrativo exato: "The distinction to Global Mobility Management" */}
        <div className="pt-12 border-t border-b18">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-4 text-center">
            The distinction to Global Mobility Management.
          </p>
          <p className="font-body text-[12px] font-[400] tracking-[0.24em] uppercase text-gold mb-14 text-center">
            Revenue Assurance. Human Success.
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Coluna GMM */}
            <div className="border border-b18 bg-w05 p-8 md:p-10 flex flex-col justify-between rounded-sm">
              <div>
                <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-3">
                  Global Mobility Management
                </p>
                <p className="font-display font-[300] text-white text-[20px] leading-[1.3] mb-6">
                  Administra a mobilidade
                </p>
                <ul className="space-y-3">
                  {gmm.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-[14px] md:text-[15px] font-[300] text-white/80 leading-[1.6]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coluna GMA com Mockup do Entregável - valores e selo originais mantidos estritamente */}
            <div className="border border-gold/40 bg-black-2/60 p-8 md:p-10 flex flex-col justify-between rounded-sm">
              <div>
                <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-3">
                  Global Mobility Assurance
                </p>

                {/* Mockup visual de dashboard */}
                <div className="mb-8 rounded-lg border border-gold/20 bg-black-3/90 p-6 shadow-xl">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/90 mb-4 border-b border-gold/15 pb-2">
                    EXEMPLO DE ENTREGÁVEL PARA EMPRESAS
                    <br />
                    <span className="text-[9px] normal-case opacity-70">
                      (Dados agregados e anonimizados)
                    </span>
                  </p>

                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-tighter text-white/50">
                        Mission Readiness Index
                      </p>
                      <p className="text-2xl font-display font-[300] text-white">
                        24 <span className="text-sm text-white/40">/ 100</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 bg-gold/15 border border-gold/40 text-gold text-[9px] uppercase tracking-widest rounded-full">
                        🟢 Healthy Mission
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Family Alignment", score: 82 },
                      { label: "Financial Preparedness", score: 76 },
                      { label: "Cultural Adaptation", score: 81 },
                      { label: "Career Continuity", score: 88 },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-[10px] text-white/70 font-[300]">
                          <span>{item.label}</span>
                          <span>{item.score}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-[9px] text-white/45 italic leading-relaxed text-center border-t border-white/10 pt-4">
                    Nota: "Estes indicadores são produzidos a partir da metodologia Human Mobility Assurance e não revelam respostas individuais nem informação pessoal identificável."
                  </p>
                </div>

                <p className="font-body text-[14px] md:text-[15px] font-[300] text-white/90 leading-[1.8]">
                  Avalia se as condições humanas, familiares, financeiras e territoriais estão alinhadas para que essa mobilidade produza o resultado esperado.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center max-w-[900px] mx-auto">
            <p className="font-display font-[200] text-white text-[clamp(19px,2.4vw,28px)] leading-[1.35]">
              A área de Global Mobility faz a mobilidade acontecer.
            </p>
            <p className="font-display font-[200] italic text-gold text-[clamp(19px,2.4vw,28px)] leading-[1.35] mt-2">
              A MOOVIA ajuda a aumentar a confiança de que ela funcionará depois que acontecer.
            </p>
            <p className="mt-8 font-display text-[15px] tracking-[0.24em] uppercase text-gold font-[400]">
              Revenue Assurance. Human Success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
