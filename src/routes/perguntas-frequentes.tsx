import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/perguntas-frequentes")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes — MOOVIA" },
      {
        name: "description",
        content:
          "Respostas às principais dúvidas sobre a MOOVIA, o Strategic Assessment e o Human Mobility Risk Assurance Program.",
      },
      { property: "og:title", content: "Perguntas Frequentes — MOOVIA" },
      {
        property: "og:description",
        content:
          "Como funciona a MOOVIA, o Strategic Assessment, cronograma, cobrança e o programa para empresas.",
      },
    ],
  }),
  component: FAQPage,
});

type QA = { q: string; a: React.ReactNode; pending?: boolean };

const faqs: QA[] = [
  {
    q: "O que é a MOOVIA?",
    a: "A MOOVIA coordena transições internacionais de vida e património. Não somos uma empresa de imigração nem uma consultoria pontual — somos o ponto único que integra estratégia, execução e acompanhamento antes, durante e depois da chegada.",
  },
  {
    q: "O que é o Strategic Assessment?",
    a: "Trabalho estratégico real com entregável físico — não uma consulta. Uma sessão dedicada com um founder, mapeamento completo de perfil, riscos, estratégias e cronograma, incluindo o Human Dimension Assessment, conduzido por Frederico Prado com o apoio da Dra. Letícia de Mello. Sob consulta, personalizado conforme o perfil — cada proposta é construída à medida da necessidade de cada cliente, particular ou empresa.",
  },
  {
    q: "A MOOVIA trabalha com pacotes ou planos de serviço?",
    a: "Não. Cada cliente recebe uma proposta construída a partir do seu Strategic Assessment. Não existe Plano A, B ou C. Existe um mandato personalizado. Um alfaiate não tem prateleira. Nós também não.",
  },
  {
    q: "Quanto tempo leva o processo de transição?",
    a: "Depende do perfil. Um profissional com proposta de trabalho confirmada pode estar operacional em 30 a 90 dias. Uma família em transição patrimonial pode levar de 3 a 12 meses. O cronograma real é definido no Strategic Assessment.",
  },
  {
    q: "Quanto custa a transição completa com a MOOVIA?",
    a: "Não trabalhamos com tabela de preços nem pacotes fechados. Cada proposta — desde o Strategic Assessment até um mandato completo — é construída à medida da necessidade específica de cada cliente, seja um particular ou uma empresa de qualquer dimensão. O valor é sempre definido após entendermos o que precisa de ser feito.",
  },
  {
    q: "A MOOVIA atende apenas brasileiros?",
    a: "Não. A MOOVIA atende qualquer pessoa, família ou empresa que esteja a coordenar uma mobilidade internacional para Portugal, independentemente da nacionalidade de origem. A nossa metodologia foi desenhada para ser replicada internacionalmente, e Portugal continua a ser o nosso mercado principal.",
  },
  {
    q: "O que é o Human Mobility Risk Assurance Program?",
    a: "É o programa da MOOVIA para empresas que contratam talento internacional. Reduz o risco humano da mobilidade — adaptação da família, integração cultural, isolamento social — que normalmente fica fora do processo de onboarding e é uma das principais causas de turnover em contratações internacionais.",
  },
  {
    q: "Como funciona a cobrança do Human Mobility Risk Assurance Program?",
    a: "Estrutura de cobrança definida caso a caso, conforme o perfil da equipa e os países envolvidos. Detalhes são apresentados na Strategic Discovery Call para empresas.",
    pending: true,
  },
  {
    q: "Quantos colaboradores a empresa precisa ter para contratar o programa?",
    a: "Não existe um número mínimo rígido. O programa é estruturado a partir do perfil e da complexidade dos casos de mobilidade — validado na Strategic Discovery Call.",
    pending: true,
  },
  {
    q: "Como funciona a MAIA?",
    a: "A MAIA é a assistente inteligente da MOOVIA. Responde questões sobre mobilidade internacional, explica a nossa metodologia e ajuda a identificar qual programa é mais adequado ao seu caso. Quando fizer sentido, um especialista da MOOVIA dá continuidade ao processo.",
  },
];

function FAQItem({ item, index, open, onToggle }: { item: QA; index: number; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-b18"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
      >
        <div className="flex items-start gap-4 md:gap-6 min-w-0">
          <span className="font-body text-[11px] tracking-[0.28em] text-gold pt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[18px] md:text-[22px] font-[300] text-white leading-snug tracking-[-0.01em]">
            {item.q}
          </h3>
        </div>
        <span
          className={`shrink-0 mt-2 h-px w-6 bg-gold transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          aria-hidden
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-8 pl-0 md:pl-[52px] pr-2">
          <p className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.85] max-w-[820px]">
            {item.a}
          </p>
          {item.pending && (
            <p className="mt-3 font-body text-[11px] tracking-[0.2em] uppercase text-gold/70">
              Resposta em atualização
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-[#06091a] pt-36 pb-16 md:pt-44 md:pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(15,31,65,0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            Perguntas Frequentes
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,64px)] font-[300] text-white leading-[1.05] tracking-[-0.03em] mb-6 max-w-[900px]">
            Respostas <span className="text-gold-l italic font-[400]">diretas</span>{" "}
            para as decisões que exigem clareza.
          </h1>
          <p className="font-body text-[16px] md:text-[18px] font-[300] text-w35 leading-[1.7] max-w-[720px]">
            Sobre a MOOVIA, o Strategic Assessment, o mandato completo e o Human Mobility Risk Assurance Program para empresas.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="bg-black py-16 md:py-24 px-6 lg:px-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="border-t border-b18">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-[200] text-white leading-[1.15] tracking-[-0.02em] mb-6">
            Não encontrou a sua{" "}
            <span className="text-gold-l italic">resposta?</span>
          </h2>
          <p className="font-body text-[15px] md:text-[17px] font-[300] text-w35 leading-[1.8] max-w-[680px] mx-auto mb-10">
            Fale diretamente com um dos founders. A MOOVIA existe para transformar decisões complexas em transições coordenadas.
          </p>
          <Link
            to="/home"
            hash="lead-form"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/home") {
                e.preventDefault();
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group relative overflow-hidden bg-gold text-black font-body font-[600] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase px-8 py-4 rounded-[2px] shadow-[0_8px_24px_rgba(173,137,87,0.15)] isolate inline-flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gold">
              Conversa com um dos Fundadores
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
