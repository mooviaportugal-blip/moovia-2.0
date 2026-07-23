import { motion } from "framer-motion";
import { Compass, Network, Scale, Landmark, Users, Home } from "lucide-react";

const pilares = [
  { icon: Compass, title: "Estratégia", body: "Planeamento integrado antes de qualquer decisão." },
  { icon: Network, title: "Coordenação", body: "Um único ponto de contacto durante toda a jornada." },
  { icon: Scale, title: "Jurídico", body: "Segurança legal em todas as etapas." },
  { icon: Landmark, title: "Património", body: "Diagnóstico patrimonial para a mobilidade internacional." },
  { icon: Users, title: "Integração", body: "Estilo de vida, desportos, atividades culturais e religião." },
  { icon: Home, title: "Moradia e Escola", body: "Apoio na procura de habitação e escolha de escola alinhadas ao perfil da família." },
];

export function EcossistemaSection() {
  return (
    <section className="relative bg-black-2 py-24 md:py-32 px-6 lg:px-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(173,137,87,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="max-w-[900px] mx-auto text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Ecossistema MOOVIA
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-[200] text-white leading-[1.08] tracking-[-0.03em] text-[clamp(26px,4vw,48px)] mb-8"
          >
            Uma rede multidisciplinar.{" "}
            <span className="text-gold-l italic font-[300]">Uma única estratégia.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[15px] md:text-[16px] font-[300] text-white/60 leading-[1.85] max-w-[640px] mx-auto"
          >
            A mobilidade internacional envolve decisões jurídicas, fiscais, patrimoniais,
            imobiliárias, familiares, profissionais e humanas. O verdadeiro desafio não é
            encontrar especialistas para cada uma dessas áreas e garantir que o seu RH não precise de lidar com imprevistos operacionais.
            <span className="text-white/85">
              é garantir que todos trabalhem em conjunto, seguindo uma única estratégia.
            </span>
            <br />
            <br />
            É exatamente esse o papel da MOOVIA.
            <br />
            <br />
            Muitas empresas já trabalham com parceiros de relocation, imobiliário ou fiscalidade de confiança. A MOOVIA não substitui essas relações: orquestra-as. Coordenamos tanto a nossa rede de especialistas como os parceiros já existentes do cliente, sempre dentro da mesma estratégia integrada.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10 items-stretch">
          {pilares.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-black-2 p-10 md:p-12 overflow-hidden transition-colors hover:bg-[#0a1024] flex flex-col h-full"
            >
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <div className="mb-6 text-gold">
                <p.icon size={26} strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-[22px] md:text-[24px] font-[300] text-white leading-tight mb-3 tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="font-body text-[14px] font-[300] text-white/60 leading-[1.75]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
