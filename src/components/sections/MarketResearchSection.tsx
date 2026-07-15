import { motion } from "framer-motion";

const cards = [
  {
    n: "01",
    title: "Quase metade das missões internacionais termina antes do previsto",
    body: "Um estudo internacional da AXA Global Healthcare (2026), realizado junto de 689 decisores de RH e 641 expatriados em 10 mercados, concluiu que quase metade das atribuições internacionais é interrompida antes do previsto. As principais causas não são técnicas ou profissionais, mas sim: dificuldades de adaptação da família, integração cultural e falta de apoio social.",
    insight: "Isto desloca o problema do RH tradicional para um problema de mobilidade global.",
  },
  {
    n: "02",
    title: "Mais de metade enfrenta problemas de saúde mental nos primeiros meses",
    body: "O mesmo estudo revelou que mais de 50% dos expatriados reportam desafios de saúde mental nos primeiros três meses, e que 1 em cada 3 espera receber apoio da empresa para a relocalização da família. Existe uma diferença significativa entre o apoio que as empresas acreditam prestar e aquele que os colaboradores efetivamente percecionam.",
  },
  {
    n: "03",
    title: "A família continua a ser o principal fator de retenção",
    body: "Décadas de investigação apontam na mesma direção: os fatores que mais influenciam o sucesso de uma expatriação são a adaptação do cônjuge, a integração dos filhos, a carreira do parceiro, a criação de rede social e a adaptação cultural. A performance profissional do colaborador raramente surge como o principal motivo do insucesso.",
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

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {cards.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pl-6 border-l-[3px] border-gold"
            >
              <span className="block font-display text-[2rem] font-[300] text-gold mb-2">{c.n}</span>
              <h3 className="font-display text-[1.15rem] text-ivory leading-[1.4] mb-3 font-[300]">{c.title}</h3>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75]">{c.body}</p>
              {c.insight && (
                <p className="font-body italic text-gold text-[14px] mt-3 leading-[1.6]">{c.insight}</p>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-right font-body text-[12px] text-w35/60">
          Fonte: AXA Global Healthcare, 2026
        </p>
      </div>
    </section>
  );
}
