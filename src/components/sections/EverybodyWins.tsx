import { motion } from "framer-motion";

export function EverybodyWins() {
  const outcomes = [
    {
      title: "COLABORADOR",
      items: ["Integrado", "Engajado", "Produtivo"],
    },
    {
      title: "FAMÍLIA",
      items: ["Estável", "Adaptada", "Apoiada"],
    },
    {
      title: "EMPRESA",
      items: [
        "Talento retido",
        "Produtividade mais rápida",
        "Menor exposição a imprevistos de mobilidade",
      ],
    },
  ];

  return (
    <section className="bg-black py-24 px-6 border-t border-w10/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-urbanist text-[11px] font-[500] tracking-[0.3em] uppercase text-gold mb-4 block">
            GLOBAL MOBILITY SUCCESS
          </span>
          <h2 className="font-urbanist text-4xl md:text-5xl font-[300] tracking-tight text-white">
            Everybody <span className="text-gold italic">wins.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outcomes.map((group, idx) => (group && group.items && group.items.length > 0) ? (
            <div
              key={idx}
              className="bg-w5/5 border border-w10/10 p-8 rounded-sm backdrop-blur-sm"
            >
              <h3 className="font-urbanist text-[12px] font-[600] tracking-[0.2em] uppercase text-gold mb-6 pb-4 border-b border-w10/10">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-gold/50" />
                    <span className="font-urbanist text-[15px] font-[300] text-w65">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null)}
        </div>
      </div>
    </section>
  );
}