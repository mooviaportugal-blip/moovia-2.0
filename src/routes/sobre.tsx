import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SymbolSection } from "@/components/sections/SymbolSection";
import { MarketResearchSection } from "@/components/sections/MarketResearchSection";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
import sobreHero from "@/assets/sobre-hero.jpg";
import problemLisboa from "@/assets/problem-lisboa-planning.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a MOOVIA, Global Mobility Success" },
      { name: "description", content: "A MOOVIA existe para aumentar a probabilidade de sucesso de cada mobilidade internacional, através de estratégia, coordenação e adaptação humana." },
      { property: "og:title", content: "Sobre a MOOVIA, Global Mobility Success" },
      { property: "og:description", content: "A MOOVIA existe para aumentar a probabilidade de sucesso de cada mobilidade internacional." },
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
  return (
    <SiteLayout>
      <Hero />
      <OrigemMercado />
      <EquacaoHistoria />
      <MarketResearchSection />
      <Diferencia />
      <MetodoSection />
      <ValidacaoSection />
      <PosicaoMarca />
      <SymbolSection />
    </SiteLayout>
  );
}

/* ─────────────────────────── O NOSSO MÉTODO ─────────────────────────── */
function MetodoSection() {
  const blocos = [
    { n: "01", titulo: "Data Intelligence", texto: "Análise estruturada do contexto, objetivos, riscos e variáveis da mobilidade." },
    { n: "02", titulo: "AI Decision Engine", texto: "O nosso framework tecnológico organiza milhares de pontos de informação, identifica dependências, conflitos e fatores críticos de sucesso." },
    { n: "03", titulo: "Human Strategic Assessment", texto: "O diagnóstico é validado e aprofundado através de entrevistas conduzidas por especialistas em estratégia de mobilidade e adaptação humana." },
    { n: "04", titulo: "Global Mobility Success Report", texto: "Um relatório estratégico personalizado com riscos identificados, prioridades, recomendações e roadmap de implementação." },
  ];
  return (
    <section className="bg-black-2 py-[120px] px-6 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">O nosso método</p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(30px,3.8vw,48px)] mb-10">
          O <span className="italic text-gold-l">Global Mobility Success Framework™</span>
        </h2>
        <div className="max-w-[780px] space-y-4 font-body font-[300] text-[17px] text-w35 leading-[1.9] mb-14">
          <p>A mobilidade internacional tornou-se demasiado complexa para depender apenas da experiência ou de decisões isoladas.</p>
          <p>Por isso, a MOOVIA desenvolveu o Global Mobility Success Framework™, uma metodologia própria que combina inteligência artificial, análise multidisciplinar e avaliação humana para apoiar decisões críticas de mobilidade internacional.</p>
          <p className="text-gold-l italic pt-2">O resultado é um diagnóstico estratégico profundo que mitiga riscos, introduz previsibilidade e orquestra todas as variáveis da mobilidade numa visão executiva única.</p>
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

/* ─────────────────────── COMO VALIDAMOS O SERVIÇO ─────────────────────── */
function ValidacaoSection() {
  return (
    <section className="bg-black py-[100px] md:py-[140px] px-6 lg:px-20 border-t border-b18">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
          Metodologia
        </p>
        <h2 className="font-display font-[200] text-white leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3.8vw,48px)] mb-10">
          Como <span className="italic text-gold-l">validamos o nosso serviço.</span>
        </h2>

        <div className="max-w-[820px] space-y-6 font-body font-[300] text-[16px] md:text-[17px] text-w35 leading-[1.9] mb-12">
          <p>
            A nossa metodologia combina conhecimento de negócio dos fundadores,
            tecnologia aplicada e uma abordagem estruturada de avaliação de
            risco humano.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-14">
          <div className="pl-6 border-l-[3px] border-gold">
            <h3 className="font-display text-[1.2rem] text-white mb-3 font-[300]">
              Tecnologia aplicada
            </h3>
            <p className="font-body text-[15px] font-[300] text-w35 leading-[1.75]">
              A MOOVIA está a desenvolver modelos preditivos próprios para
              apoiar a avaliação de risco humano da mobilidade internacional —
              parte da evolução contínua da nossa metodologia.
            </p>
          </div>
          <div className="pl-6 border-l-[3px] border-gold/40">
            <h3 className="font-display text-[1.2rem] text-white mb-3 font-[300]">
              Abordagem multidisciplinar
            </h3>
            <p className="font-body text-[15px] font-[300] text-w35 leading-[1.75]">
              Diagnóstico validado por especialistas em estratégia, adaptação
              humana e coordenação patrimonial — orquestrado sob mandato.
            </p>
          </div>
        </div>

        <a
          href="#contacto"
          className="group relative overflow-hidden inline-flex bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate text-center"
        >
          <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-gold leading-tight">
            Conhecer a Metodologia
          </span>
        </a>
      </div>
    </section>
  );

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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-8 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-gold" /> Sobre a MOOVIA Portugal
        </motion.p>

        {/* Split "Success / Strategy" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center max-w-[900px] border-y border-b18 py-8"
        >
          <div className="text-center md:text-left">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-2">Global Mobility Success</p>
            <p className="font-display font-[200] text-white text-[clamp(18px,2vw,24px)] leading-[1.3]">é o resultado.</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-b30" />
          <div className="text-center md:text-left">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-2">Global Mobility Strategy</p>
            <p className="font-display font-[200] text-white text-[clamp(18px,2vw,24px)] leading-[1.3]">é a disciplina que o torna possível.</p>
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
  const paragraphs = [
    "Em 2018, Frederico Prado veio para Lisboa com a família. Depois de quase três décadas liderando projetos e negócios internacionais, sabia navegar ambientes corporativos complexos. Mas não estava preparado para o que encontrou: dez decisões simultâneas, fornecedores desconectados e ninguém que coordenasse o todo.",
    "Escola para os filhos. Apartamento no bairro certo. NIF, NISS, conta bancária. Fiscalidade em dois países. Cônjuge reinventando a carreira do zero. Cada profissional resolvia a sua parte, e ninguém integrava a decisão inteira. A família ficou no centro de uma transição complexa, tentando coordenar decisões que eram interdependentes, mas estavam distribuídas entre diferentes fornecedores.",
    "A MOOVIA nasceu dessa experiência. Não como uma empresa de imigração, não como uma agência de relocation, não como um despachante com site bonito. Como uma consultoria que coordena a jornada inteira, do primeiro diagnóstico à integração. Com o cuidado que uma das decisões mais importantes da vida de uma família merece.",
  ];
  return (
    <section className="bg-black py-[120px] px-6 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">A origem</p>
          <h2 className="font-display font-[200] text-white leading-[1.02] tracking-[-0.03em] text-[clamp(32px,4vw,52px)] mb-12">
            Uma empresa criada<br />de dentro para fora.
          </h2>
          <div className="space-y-8">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="font-body font-[300] text-[17px] text-w35 leading-[1.95]"
              >
                {p}
              </motion.p>
            ))}
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="border-l-2 border-gold bg-[rgba(173,137,87,0.04)] py-6 px-7 font-body font-[300] text-[17px] text-white/85 leading-[1.85] italic"
            >
              "O produto principal da MOOVIA não é o mandato. É o cuidado com que cada mandato é
              conduzido. Isso não se escala sem critério."
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 text-center font-body font-[300] text-[16px] text-w35"
            >
              Atendemos famílias internacionais em todas as suas formas.
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
              className="w-full h-[560px] object-cover grayscale-[0.4] contrast-[1.1] brightness-[0.92]"
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
    "A MOOVIA nasceu da combinação entre quase três décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em diferentes continentes, e da vivência direta dos desafios de uma mobilidade internacional.",
    "Ao longo de mais de 30 anos, a liderança da MOOVIA acompanhou projetos de expansão internacional, desenvolvimento de negócios e parcerias estratégicas em diferentes países, trabalhando com empresas e equipas em ambientes multiculturais e de elevada complexidade.",
    "Essa vivência, somada ao processo pessoal de mudança para Portugal, revelou um problema que o mercado ainda não tinha resolvido.",
    "A Global Mobility evoluiu na execução, mas continuava fragmentada na coordenação.",
    "Especialistas altamente competentes atuavam de forma independente, enquanto empresas e famílias permaneciam responsáveis por integrar decisões críticas que eram, por natureza, interdependentes.",
    "Foi dessa constatação que nasceu a MOOVIA.",
    "Não como mais uma empresa de mobilidade internacional.",
    "Mas como uma consultoria dedicada a coordenar decisões, reduzir riscos e aumentar a probabilidade de sucesso de cada mobilidade internacional.",
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
          "A MOOVIA não nasceu para fazer mobilidade internacional. Nasceu para aumentar a probabilidade de sucesso de cada mobilidade internacional."
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
          <p>Estamos a desafiar a forma como a mobilidade internacional é pensada.</p>
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
function EquacaoHistoria() {
  return (
    <section className="bg-black py-[100px] px-6 lg:px-20 border-b border-b18">
      <div className="max-w-[900px] mx-auto">
        <h2 className="font-display font-[200] text-ivory leading-[1.15] text-[clamp(28px,3.5vw,46px)] mb-16 text-center">
          A equação da sua história
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full bg-[#0a0d18] border border-b15 p-8 text-center"
          >
            <h3 className="font-body text-[13px] tracking-[0.2em] uppercase text-gold mb-3">Revenue Assurance</h3>
            <p className="font-body font-[300] text-[15px] text-w35 leading-[1.6]">
              ensinou a enxergar riscos e perdas invisíveis.
            </p>
          </motion.div>

          <span className="text-gold/50 text-2xl font-light">+</span>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 w-full bg-[#0a0d18] border border-b15 p-8 text-center"
          >
            <h3 className="font-body text-[13px] tracking-[0.2em] uppercase text-gold mb-3">Carreira internacional</h3>
            <p className="font-body font-[300] text-[15px] text-w35 leading-[1.6]">
              permitiu viver o problema da mobilidade.
            </p>
          </motion.div>

          <span className="text-gold-l text-2xl font-light">=</span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full p-8 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(173,137,87,0.06) 0%, rgba(15,31,65,0.4) 100%), #0a0d18",
              border: "1px solid rgba(173,137,87,0.25)"
            }}
          >
            <h3 className="font-display text-[22px] font-[300] text-white mb-3">MOOVIA</h3>
            <p className="font-body font-[300] text-[15px] text-w70 leading-[1.6]">
              é a aplicação dessa experiência à proteção do investimento humano.
            </p>
          </motion.div>

        </div>
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
    ["Não coordenamos apenas mobilidades internacionais.", "Coordenamos o sucesso da mobilidade internacional."],
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
            to="/home"
            hash="lead-form"
            className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[12px] tracking-[0.22em] uppercase px-10 py-4 isolate"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-gold">Solicitar Strategic Assessment</span>
          </Link>
          <Link
            to="/equipa"
            className="group relative overflow-hidden border border-b30 text-gold font-body font-[500] text-[12px] tracking-[0.22em] uppercase px-10 py-4 isolate hover:border-gold"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-[#06091a]">Ver a equipa</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
