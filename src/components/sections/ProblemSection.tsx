import { motion } from "framer-motion";
import { LayersIcon, SearchIcon, AlertIcon, ClockIcon } from "@/components/ui/MooviaIcons";
import torreBelemAsset from "@/assets/segunda-secao.jpeg.asset.json";

export function ProblemSection() {
  const cards = [
    {
      icon: LayersIcon,
      title: "Decisões simultâneas",
      body: "O tempo não é o maior problema. É tomar dez decisões simultâneas sem noção do impacto que cada uma tem na sequência de decisões que precisam ser orquestradas.",
      fullBody: "O tempo não é o maior problema. É tomar dez decisões simultâneas sem noção do impacto que cada uma tem na sequência de decisões que precisam ser orquestradas."
    },
    {
      icon: SearchIcon,
      title: "Volume de informação",
      body: "Informação demais, clareza de menos",
      fullBody: "Grupos de WhatsApp, YouTube, advogados e corretores dizem coisas diferentes. O volume de informação não resolve a decisão, cria mais dúvida."
    },
    {
      icon: AlertIcon,
      title: "Riscos invisíveis",
      body: "Erros que custam",
      fullBody: "Apartamento no bairro errado. Escola sem vaga. Uma rotina mal estruturada para a família. Cada erro custa dinheiro, tempo e energia que a família não tem."
    },
    {
      icon: ClockIcon,
      title: "Adaptação estruturada",
      body: "O depois que ninguém resolve",
      fullBody: "Chegar é metade do processo. A adaptação do cônjuge que largou a carreira, das crianças na nova escola, da rotina reconstruída, exige acompanhamento real, com uma psicóloga, não apenas suporte logístico."
    }
  ];

  return (
    <section className="bg-black-2 py-16 md:py-24 lg:py-32 px-6 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-end mb-20">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
            >
              O mercado resolve tarefas
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            className="font-display text-[clamp(28px,4vw,60px)] font-[200] text-white leading-[1.05] tracking-[-0.03em] mb-12"
          >
            O maior risco da mobilidade internacional não está no visto.<br/>
            <span className="text-gold-l italic">Está no que acontece depois.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}
              className="font-body text-[18px] font-[300] text-w35 leading-[1.85] max-w-[640px]"
            >
              A mobilidade internacional é frequentemente tratada como uma sequência de tarefas: imigração, habitação, educação, fiscalidade e integração.
              <br /><br />
              O verdadeiro desafio, porém, é coordenar essas decisões para que pessoas, famílias e empresas alcancem uma <span className="text-ivory/90">transição internacional bem-sucedida</span>.
              <br /><br />
              <span className="text-gold font-[400]">É exatamente aí que a MOOVIA cria valor.</span>
            </motion.p>
          </div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative min-h-[480px] lg:min-h-[600px] rounded-2xl overflow-hidden ring-1 ring-gold/40 shadow-[0_20px_60px_-20px_rgba(173,137,87,0.35)]"
          >
            <img
              src={torreBelemAsset.url}
              loading="lazy"
              alt="Torre de Belém, Lisboa"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-y-[-20%] -left-3/4 w-1/2 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[goldSheen_1.6s_ease-in-out]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 0%, rgba(232,213,176,0.05) 30%, rgba(232,213,176,0.55) 48%, rgba(255,247,224,0.85) 50%, rgba(232,213,176,0.55) 52%, rgba(232,213,176,0.05) 70%, transparent 100%)",
                  filter: "blur(2px)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="absolute inset-y-[-20%] -left-3/4 w-1/3 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[goldSheen_1.6s_ease-in-out_0.15s]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 0%, rgba(173,137,87,0.4) 50%, transparent 100%)",
                  mixBlendMode: "overlay",
                }}
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(232,213,176,0.18),transparent_65%)] mix-blend-screen" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/30 transition-all duration-500 group-hover:ring-gold/70 group-hover:shadow-[inset_0_0_40px_rgba(232,213,176,0.25)]" />
          </motion.div>


        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-b18">
          {cards.map((card, i) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black-2 p-[52px_44px] relative group overflow-hidden rounded-[2px] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25),0_0_0_1px_rgba(173,137,87,0.2)]"
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 bg-gold transition-all duration-500 group-hover:h-full" />
              <div className="mb-8 text-gold">
                <card.icon size={28} />
              </div>
              <h3 className="font-display text-[19px] font-[300] text-white mb-4">
                {card.title}
              </h3>
              <p className="font-body text-[14px] font-[300] text-w35 leading-[1.7]">
                {card.fullBody}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-1 bg-black p-6 sm:p-16 md:p-20 text-center"
        >
          <p className="font-display text-[15px] sm:text-[28px] md:text-[clamp(28px,3.6vw,46px)] font-[200] text-white leading-tight">
            O mercado resolve tarefas.<br/>
            <span className="text-gold-l italic font-[200]">A MOOVIA coordena o sucesso da mobilidade internacional.</span>
          </p>

        </motion.div>

      </div>
    </section>
  );
}
