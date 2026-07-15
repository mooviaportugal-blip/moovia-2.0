import { motion } from "framer-motion";

type Card = {
  num: string;
  concept: string;
  pillar: string;
  description: string;
  tagline: string;
  icon: string;
  alt: string;
  iconScale: number;
};

const cards: Card[] = [
  {
    num: "01 / 04",
    concept: "A Decisão",
    pillar: "Planejamos",
    description:
      "Toda transição começa com uma decisão. Antes de comprar a passagem, é preciso ter clareza sobre o que vem depois: visto, escola, imóvel, fiscalidade, família. A Avaliação Estratégica existe para que a partida seja o início de um plano, não o início de um improviso.",
    tagline: "A decisão certa começa aqui.",
    icon: "/icons/aviao.svg",
    alt: "Ícone de avião",
    iconScale: 1.16,
  },
  {
    num: "02 / 04",
    concept: "A Passagem",
    pillar: "Instalamos",
    description:
      "Cruzar uma fronteira não é só pegar um avião. É obter documentação, abrir uma conta bancária, conseguir o NIF, a casa, a escola, as ativações. A MOOVIA coordena cada etapa dessa passagem para que a família chegue a Portugal instalada, não perdida.",
    tagline: "A fronteira é o começo, não o obstáculo.",
    icon: "/icons/ponte.svg",
    alt: "Ícone de arco/ponte",
    iconScale: 1.28,
  },
  {
    num: "03 / 04",
    concept: "A Coordenação",
    pillar: "Integramos",
    description:
      "Uma mudança de país não termina quando o avião aterrissa. Começa. A escola das crianças, a rotina do cônjuge, a rede social, a adaptação cultural, tudo isso precisa de atenção nos primeiros 90 dias. A MOOVIA é a única empresa que acompanha este período de forma estruturada.",
    tagline: "Chegar é metade. Ficar é o que importa.",
    icon: "/icons/pessoa.svg",
    alt: "Ícone de pessoa",
    iconScale: 0.9,
  },
  {
    num: "04 / 04",
    concept: "O Destino",
    pillar: "Estruturamos",
    description:
      "O objetivo final não é ter o visto ou o NIF. É ter uma vida em Portugal, estruturada, legal e financeiramente organizada. Fiscalidade, empresa, patrimônio, investimento. A MOOVIA coordena a chegada e a construção do que vem depois.",
    tagline: "Portugal não é o destino. É o começo.",
    icon: "/icons/casa.svg",
    alt: "Ícone de casa",
    iconScale: 0.95,
  },
];

export function SymbolSection() {
  return (
    <section className="bg-black relative overflow-hidden" style={{ padding: "120px 80px" }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-urbanist text-[10px] font-[400] tracking-[0.24em] uppercase text-gold/80 mb-6"
        >
          O símbolo e o que ele diz
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-sora font-[200] text-white text-[clamp(36px,5vw,64px)] leading-[1.05] mb-8"
        >
          Quatro ícones.
          <br />
          <span className="italic text-gold/90">A sua jornada inteira.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-urbanist font-[300] text-w35 text-[15px] leading-[1.85] max-w-[580px]"
        >
          O símbolo da MOOVIA não é decorativo. Cada elemento do azulejo representa um momento real da
          sua transição, do planejamento ao destino. Quando você olha o símbolo, está olhando para a
          jornada que coordenamos.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-b15/70 relative z-10">
          {cards.map((card, i) => (
            <motion.article
              key={card.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex min-h-[520px] flex-col bg-black2 hover:bg-black3 transition-colors duration-500 overflow-hidden"
              style={{ padding: "44px 34px" }}
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                className="relative mb-10 flex h-16 w-16 items-center justify-center border border-gold/20"
              >
                <img
                  src={card.icon}
                  alt={card.alt}
                  className="h-9 w-9 object-contain opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(63%) sepia(31%) saturate(456%) hue-rotate(358deg) brightness(91%) contrast(86%)",
                    transform: `scale(${card.iconScale})`,
                  }}
                />
              </motion.div>


              {/* Number label */}
              <p className="font-urbanist font-[400] text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-3">
                {card.num}
              </p>

              {/* Concept */}
              <h3 className="font-sora font-[200] text-white mb-2" style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
                {card.concept}
              </h3>

              {/* Pillar */}
              <p className="font-urbanist font-[500] text-[10px] tracking-[0.16em] uppercase text-gold mb-5">
                {card.pillar}
              </p>

              {/* Description */}
              <p className="font-urbanist font-[300] text-[15px] text-w35 leading-[1.85]">
                {card.description}
              </p>

              {/* Tagline */}
              <p className="mt-auto pt-8 font-urbanist font-[300] text-[13px] text-w35 italic">
                {card.tagline}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
