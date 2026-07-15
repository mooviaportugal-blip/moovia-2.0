import { motion } from "framer-motion";
import { Anchor, Feather } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import leticiaFullAsset from "@/assets/leticia.png.asset.json";

export function ApoioPsicologicoStrip() {
  return (
    <section
      className="px-6 lg:px-20 py-16 lg:py-[72px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(173,137,87,.06) 0%, rgba(15,31,65,.4) 100%), #0b1225",
        borderTop: "1px solid rgba(173,137,87,.2)",
        borderBottom: "1px solid rgba(173,137,87,.2)",
      }}
    >
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-10 lg:gap-12 items-start">

        {/* Col 1 — Vertical label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex lg:flex-col flex-row items-center lg:items-start gap-4"
        >
          <span
            className="font-body text-gold uppercase lg:[writing-mode:vertical-rl]"
            style={{ fontSize: 11, letterSpacing: ".25em" }}
          >
            Dimensão Humana
          </span>
          <p className="font-body font-[300] text-w35 leading-[1.5]" style={{ fontSize: 13 }}>
            Mobilidade é feita<br className="hidden lg:inline" /> por pessoas.
          </p>
        </motion.div>

        {/* Col 2 — Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-[720px]"
        >
          <p
            className="font-body text-gold mb-5"
            style={{ fontSize: 10, letterSpacing: ".24em", fontWeight: 500, textTransform: "uppercase" }}
          >
            O Fator Humano
          </p>
          <h2
            className="font-display font-[200] text-ivory leading-[1.2] mb-6"
            style={{ fontSize: "clamp(22px,2.6vw,34px)" }}
          >
            O sucesso de uma mobilidade internacional não depende apenas da estratégia.
            <span className="block mt-3 text-gold-l italic font-[300]" style={{ fontSize: "clamp(16px,1.8vw,22px)" }}>
              Depende das pessoas que a vão viver.
            </span>
          </h2>
          <p className="font-body font-[300] text-[15px] text-w35 leading-[1.8] mb-4">
            Mudar de país significa muito mais do que tratar vistos ou encontrar uma casa. Significa reconstruir rotinas, relações, carreira, identidade e expectativas.
          </p>
          <p className="font-body font-[300] text-[15px] text-w35 leading-[1.8] mb-6">
            Por isso, a MOOVIA integra a dimensão humana na sua metodologia, ajudando pessoas, famílias e empresas a antecipar desafios invisíveis e a aumentar as probabilidades de sucesso da mobilidade internacional.
          </p>

          <div
            className="p-6 mb-6"
            style={{
              background: "rgba(173,137,87,.08)",
              borderLeft: "3px solid #ad8957",
              borderRadius: 6,
            }}
          >
            <p className="font-body font-[300] text-[15px] text-ivory/90 leading-[1.8] mb-2">
              A avaliação da dimensão humana faz parte do{" "}
              <strong className="font-[500] text-ivory">MOOVIA Strategic Assessment</strong>.
            </p>
            <p className="font-body font-[300] text-[14px] text-ivory/80 leading-[1.8]">
              Porque uma estratégia sólida considera não apenas onde as pessoas vão viver, mas também como irão adaptar-se, crescer e construir o seu próximo capítulo.
            </p>
          </div>

          <MetodologiaDialog />
        </motion.div>

      </div>

    </section>
  );
}

function MetodologiaDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-3 px-6 py-3 border border-gold/40 text-gold-l hover:bg-gold/10 transition-colors font-body text-[12px] tracking-[0.24em] uppercase"
        >
          Ver Metodologia
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[920px] max-h-[90vh] overflow-y-auto border-gold/20 p-0"
        style={{ background: "#0b1225" }}
      >
        <div className="p-8 md:p-12">
          <DialogHeader>
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-4">
              AEAI · Avaliação Emocional Adaptativa de Imigração
            </p>
            <DialogTitle className="font-display text-[clamp(24px,3.5vw,40px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-6">
              A dimensão que as outras avaliações não medem.
            </DialogTitle>
            <DialogDescription className="font-body text-[15px] font-[300] text-w35 leading-[1.8] space-y-4">
              <span className="block">Uma família pode ter o visto, o imóvel e a escola. E ainda assim não estar pronta.</span>
              <span className="block">
                O que define se uma transição internacional se torna um novo lar ou uma experiência traumática raramente está nos documentos. Está na capacidade emocional e adaptativa de cada membro da família enfrentar o que vem a seguir.
              </span>
            </DialogDescription>
          </DialogHeader>

          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold-l mt-10 mb-5">
            Método Raízes e Asas
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-b15 mb-8">
            {[
              {
                Icon: Anchor,
                label: "Raízes",
                line: "O que sustenta",
                d: "O que cada membro da família traz consigo, vínculos, identidade, segurança emocional, rede de apoio. O que não pode ser abandonado para que a mudança funcione.",
              },
              {
                Icon: Feather,
                label: "Asas",
                line: "O que expande",
                d: "A capacidade de adaptação, abertura ao novo, tolerância à incerteza e disposição para reconstruir rotinas e conexões num novo contexto.",
              },
            ].map(({ Icon, label, line, d }) => (
              <div key={label} className="p-8" style={{ background: "#111d36" }}>
                <Icon size={24} strokeWidth={1.5} className="text-gold mb-4" />
                <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-2">{label}</p>
                <p className="font-display text-[20px] font-[300] italic text-gold-l mb-3">{line}</p>
                <p className="font-body text-[14px] font-[300] text-white/80 leading-[1.7]">{d}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-[14px] font-[300] text-w35 leading-[1.8] mb-8">
            Durante o Strategic Assessment, Frederico conduz uma entrevista conjunta, com o apoio da Dra. Letícia de Mello, mapeando onde a família está hoje em cada um desses eixos. O resultado integra o Relatório Estratégico Personalizado,
            <em className="text-gold-l not-italic"> respondendo se vocês estão prontos, e o que fortalecer antes de partir</em>.
          </p>

          <div className="flex items-center gap-4 border-t border-b15 pt-6">
            <img
              src={leticiaFullAsset.url}
              alt="Dra. Letícia de Mello"
              className="w-16 h-16 object-cover rounded-full grayscale-[20%]"
              loading="lazy"
            />
            <div>
              <p className="font-display text-[16px] font-[300] text-white">Dra. Letícia de Mello</p>
              <p className="font-body text-[11px] tracking-[0.24em] uppercase text-gold mt-1">
                Psicóloga · AEAI · +20 anos
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

