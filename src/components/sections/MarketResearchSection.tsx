import { motion } from "framer-motion";

/* ---------- SVG helpers ---------- */

function Donut({
  percent,
  size = 180,
  stroke = 14,
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(173,137,87,0.15)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#ad8957"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

function MiniDonut({ percent, label }: { percent: number; label: string }) {
  return (
    <div className="flex items-center gap-5">
      <Donut percent={percent} size={78} stroke={7}>
        <span className="font-display text-[15px] font-[400] text-gold-l">{percent}%</span>
      </Donut>
      <span className="font-body text-[13px] text-w35 leading-[1.5] flex-1">{label}</span>
    </div>
  );
}

function XCircleIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke="#ad8957" strokeWidth="1.2" />
      <path d="M22 22 L42 42 M42 22 L22 42" stroke="#ad8957" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CoinsIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="#ad8957" strokeWidth="1.2">
      <ellipse cx="24" cy="20" rx="14" ry="5" />
      <path d="M10 20 v10 c0 2.8 6.3 5 14 5 s14-2.2 14-5 V20" />
      <path d="M10 30 v10 c0 2.8 6.3 5 14 5 s14-2.2 14-5 V30" />
      <ellipse cx="42" cy="42" rx="14" ry="5" />
      <path d="M28 42 v10 c0 2.8 6.3 5 14 5 s14-2.2 14-5 V42" />
    </svg>
  );
}

function PersonIcon({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="#ad8957" strokeWidth="1.4">
      <circle cx="32" cy="22" r="9" />
      <path d="M14 54 c0-10 8-16 18-16 s18 6 18 16" />
    </svg>
  );
}

/* ---------- Section ---------- */

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
          className="font-display text-[clamp(28px,4vw,54px)] font-[200] text-white leading-[1.1] tracking-[-0.02em] mb-6"
        >
          Os dados <span className="italic text-gold-l">mais relevantes</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] uppercase tracking-wider text-w35/60 mb-14"
        >
          Fontes: Cambridge · AXA Global Healthcare (2025) · livingintraining.nl · Repositório ISCTE
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Card 01 */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border-b18 bg-black/30 p-8 lg:p-10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-display text-[2rem] font-[300] text-gold">01</span>
              <span className="font-body text-[10px] tracking-[0.28em] uppercase text-w35/60">
                Desempenho abaixo do esperado
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
              <Donut percent={33}>
                <div className="flex flex-col items-center gap-1">
                  <PersonIcon />
                  <span className="font-display text-[13px] text-gold-l tracking-wider">1 EM 3</span>
                </div>
              </Donut>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] flex-1">
                Estudos clássicos mostram que aproximadamente 1 em cada 3 expatriados apresenta
                desempenho abaixo das expectativas durante a missão.
              </p>
            </div>

            <p className="font-body italic text-gold text-[14px] leading-[1.6] mt-auto">
              Muito mais relevante para um CFO do que o simples regresso antecipado.
            </p>
            <p className="mt-6 font-body text-[10px] uppercase tracking-wider text-w35/40">
              Fonte: Cambridge
            </p>
          </motion.article>

          {/* Card 02 */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="border border-border-b18 bg-black/30 p-8 lg:p-10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-display text-[2rem] font-[300] text-gold">02</span>
              <span className="font-body text-[10px] tracking-[0.28em] uppercase text-w35/60">
                O mito dos "40% de fracasso"
              </span>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <XCircleIcon />
              <p className="font-display text-[1.15rem] text-ivory leading-[1.4] font-[300]">
                "Não é verdade que 40% regressem para casa."
              </p>
            </div>

            <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] mb-4">
              Durante décadas repetiu-se que 20 a 40% dos expatriados regressavam antes do fim da
              missão. Hoje sabemos que esse número foi amplamente sobrestimado e repetido sem uma
              base empírica sólida. Um dos estudos mais citados na área demonstra que essa taxa se
              tornou um mito por citações incorretas entre pesquisas.
            </p>

            <p className="font-body italic text-gold text-[14px] leading-[1.6] mt-auto">
              O verdadeiro fracasso não é voltar para casa. É permanecer no país e produzir abaixo
              do esperado. É exatamente aqui que a MOOVIA ganha força.
            </p>
          </motion.article>

          {/* Card 03 */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="border border-border-b18 bg-black/30 p-8 lg:p-10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-display text-[2rem] font-[300] text-gold">03</span>
              <span className="font-body text-[10px] tracking-[0.28em] uppercase text-w35/60">
                Problemas de adaptação são o fator decisivo
              </span>
            </div>

            <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] mb-6">
              Em pesquisas com empresas multinacionais, os principais fatores associados ao
              insucesso da mobilidade internacional são:
            </p>

            <div className="flex flex-col gap-5 mb-6">
              <MiniDonut percent={47} label="apontam a incapacidade de adaptação cultural como uma das principais causas de falha." />
              <MiniDonut percent={65} label="apontam a insatisfação do cônjuge ou parceiro." />
              <MiniDonut percent={40} label="referem outros problemas familiares." />
            </div>

            <p className="mt-auto font-body text-[10px] uppercase tracking-wider text-w35/40">
              Fonte: livingintraining.nl
            </p>
          </motion.article>

          {/* Card 04 */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="border border-border-b18 bg-black/30 p-8 lg:p-10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-display text-[2rem] font-[300] text-gold">04</span>
              <span className="font-body text-[10px] tracking-[0.28em] uppercase text-w35/60">
                O custo de uma missão falhada
              </span>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <CoinsIcon />
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] flex-1">
                As empresas atualmente reportam entre 5% e 10% das missões terminando antes do
                previsto. Empresas com programas maduros chegam a menos de 5%.
              </p>
            </div>

            <div className="border-t border-border-b18 pt-6 mt-auto">
              <p className="font-body text-[10px] tracking-[0.28em] uppercase text-w35/60 mb-2">
                Custo total estimado por expatriado
              </p>
              <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-[300] text-gold-l leading-none tracking-[-0.02em]">
                €215K <span className="text-gold/60">–</span> €470K
              </p>
              <p className="font-body text-[12px] font-[300] text-w35/70 leading-[1.6] mt-3">
                Somando salário, benefícios, repatriação e substituição.
              </p>
            </div>

            <p className="mt-6 font-body text-[10px] uppercase tracking-wider text-w35/40">
              Fonte: Repositório ISCTE
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
