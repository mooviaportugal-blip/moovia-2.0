import { motion } from "framer-motion";

const cards: { n: string; title: string; body: string; source: string; insight?: string }[] = [
  {
    n: "01",
    title: "Quase metade das missões internacionais termina antes do previsto",
    body: "Um estudo internacional da AXA Global Healthcare (2025), realizado junto de 689 decisores de RH e 641 expatriados em 10 mercados, concluiu que quase metade das atribuições internacionais é interrompida antes do previsto. As principais causas não são técnicas ou profissionais, mas sim: dificuldades de adaptação da família, integração cultural e falta de apoio social.",
    source: "",
    insight: "Isto desloca o problema do RH tradicional para um problema de mobilidade global.",
  },
  {
    n: "02",
    title: "Mais de metade enfrenta problemas de saúde mental nos primeiros meses",
    body: "O mesmo estudo revelou que mais de 50% dos expatriados reportam desafios de saúde mental nos primeiros três meses, e que 1 em cada 3 espera receber apoio da empresa para a relocalização da família. Existe uma diferença significativa entre o apoio que as empresas acreditam prestar e aquele que os colaboradores efetivamente percecionam.",
    source: "",
  },
  {
    n: "03",
    title: "A família continua a ser o principal fator de retenção",
    body: "Décadas de investigação apontam na mesma direção: os fatores que mais influenciam o sucesso de uma expatriação são a adaptação do cônjuge, a integração dos filhos, a carreira do parceiro, a criação de rede social e a adaptação cultural. A performance profissional do colaborador raramente surge como o principal motivo do insucesso.",
    source: "",
  },
  {
    n: "04",
    title: "A solidão é o fator emocional mais determinante para os millennials expatriados",
    body: "\"O AXA Mind Health Report mostra que 56% dos millennials não-nativos apontam a solidão e o isolamento como fatores que prejudicam significativamente a sua saúde mental — 87% mais do que profissionais não-nativos entre 55 e 75 anos. A ausência de rede de apoio no destino é, portanto, um risco mensurável, não apenas uma perceção subjetiva.\"",
    source: "",
  },
];

export function MarketResearchSection() {
  return (
    <section className="px-6 lg:px-20 py-20 lg:py-28" style={{ background: "#0b1225" }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
        >
          A evidência por trás do problema
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(28px,4vw,54px)] font-[200] text-white leading-[1.1] tracking-[-0.02em] mb-14"
        >
          Os dados <span className="italic text-gold-l">mais relevantes</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] uppercase tracking-wider text-w35/60 mb-8"
        >
          Fonte: AXA Global Healthcare & AXA Mind Health Report (2025)
        </motion.p>

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-16">
          {cards.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pl-6 border-l-[3px] border-gold flex flex-col justify-between"
            >
              <div>
                <span className="block font-display text-[2rem] font-[300] text-gold mb-2">{c.n}</span>
                <h3 className="font-display text-[1.15rem] text-ivory leading-[1.4] mb-3 font-[300]">{c.title}</h3>
                <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] whitespace-pre-line">{c.body}</p>
                {c.insight && (
                  <p className="font-body italic text-gold text-[14px] mt-3 leading-[1.6]">{c.insight}</p>
                )}
              </div>
              {c.source && (
                <p className="mt-4 font-body text-[10px] uppercase tracking-wider text-w35/40">
                  {c.source}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
