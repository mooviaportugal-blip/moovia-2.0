import { motion } from "framer-motion";

type Icon = { src: string; label: string; scale?: number };
type Group = { title: string; items: Icon[] };

const GROUPS: Group[] = [
  {
    title: "Solteiro(a)",
    items: [
      { src: "/familias/homem.png", label: "Homem" },
      { src: "/familias/mulher.png", label: "Mulher" },
    ],
  },
  {
    title: "Casais",
    items: [
      { src: "/familias/Casal.png", label: "Casal", scale: 1.7 },
      { src: "/familias/casal_homens.png", label: "Casal Homens", scale: 1.7 },
      { src: "/familias/Casal_Mulheres.png", label: "Casal Mulheres", scale: 1.7 },
    ],
  },
  {
    title: "Família",
    items: [
      { src: "/familias/Casal_Filhos.png", label: "Casal com Filhos", scale: 1.9 },
      { src: "/familias/Familia_Homem.png", label: "Família Homem", scale: 2.1 },
      { src: "/familias/Familia_Mulheres.png", label: "Família Mulheres", scale: 1.9 },
    ],
  },
  {
    title: "Pet Friendly",
    items: [
      { src: "/familias/pet_friendly.png", label: "Pet Friendly", scale: 1.5 },
    ],
  },
];

export function FamiliesSection() {
  return (
    <section className="bg-black px-6 py-[100px] lg:px-20 text-center">
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-body font-[400] text-[11px] tracking-[0.28em] uppercase text-gold"
        >
          Para quem coordenamos
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display font-[200] text-white leading-[1.15] text-[clamp(22px,4vw,52px)] px-2 break-words"
        >
          Atendemos executivos(as) e as suas famílias em todas as suas formas.{" "}
          <span className="block sm:inline">Coordenamos todas elas.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 font-body font-[300] text-[17px] text-w35"
        >
          Atendemos famílias internacionais em todas as suas formas.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ transformOrigin: "left" }}
          className="mx-auto my-10 h-px max-w-[480px] bg-b15"
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-16">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="font-body font-[400] text-[11px] tracking-[0.28em] uppercase text-gold mb-6"
              >
                {group.title}
              </motion.p>

              <div
                className="grid gap-y-8 justify-center"
                style={{
                  gridTemplateColumns: `repeat(${group.items.length}, minmax(90px, 1fr))`,
                  maxWidth: `${group.items.length * 150}px`,
                  margin: "0 auto",
                }}
              >
                {group.items.map((it, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group flex flex-col items-center gap-4 px-3 py-5 cursor-default transition-colors duration-300 hover:bg-[rgba(173,137,87,0.03)]"
                  >
                    <img
                      src={it.src}
                      alt={it.label}
                      className="h-14 w-14 object-contain opacity-[0.35] transition-all duration-300 group-hover:opacity-100"
                      style={{ filter: "brightness(0) invert(1)", transform: it.scale ? `scale(${it.scale})` : undefined }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>


        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 font-body font-[300] italic text-[13px] text-w12"
        >
          Independente da estrutura familiar, da origem ou do perfil. Ninguém fica de fora.
        </motion.p>
      </div>
    </section>
  );
}
