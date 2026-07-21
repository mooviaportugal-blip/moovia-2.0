import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export function ConversaGratuitaStrip() {
  return (
    <section
      className="px-6 lg:px-20 py-14 lg:py-[56px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(173,137,87,.06) 0%, rgba(15,31,65,.4) 100%), #0b1225",
        borderTop: "1px solid rgba(173,137,87,.2)",
        borderBottom: "1px solid rgba(173,137,87,.2)",
      }}
    >
      <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left, texto */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex-1 max-w-[560px]"
        >
          <p className="font-body text-gold mb-4" style={{ fontSize: 10, letterSpacing: ".24em", fontWeight: 500, textTransform: "uppercase" }}>
            O primeiro passo
          </p>
          <h2
            className="font-display font-[200] text-white leading-[1.1] mb-5"
            style={{ fontSize: "clamp(22px,3vw,38px)" }}
          >
            A primeira conversa.
          </h2>
          <p className="font-body font-[300] text-[15px] text-w35 leading-[1.8] max-w-[480px]">
            Antes de qualquer compromisso, o nosso time quer entender o seu caso. 20 minutos. Sem script. Sem pressão. Só para saber se faz sentido trabalharmos juntos.
          </p>
        </motion.div>

        {/* Right, CTA box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-auto lg:max-w-[340px] p-8"
          style={{
            background: "rgba(173,137,87,.08)",
            border: "1px solid rgba(173,137,87,.2)",
          }}
        >
          <div
            className="mb-5 flex items-center justify-center"
            style={{
              width: 88,
              height: 88,
              border: "1px solid rgba(173,137,87,.35)",
              background: "rgba(173,137,87,.06)",
              borderRadius: 4,
            }}
          >
            <CalendarDays size={40} strokeWidth={1.25} color="#ad8957" />
          </div>
          <p className="font-body font-[400] text-w35 mb-6" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>
            Strategic Discovery Call
          </p>
          <ul className="space-y-2 mb-7">
            {[
              "Sem script, sem chatbot",
              "Conversa com um dos Fundadores",
              "Sem compromisso de continuidade",
            ].map((it) => (
              <li key={it} className="flex gap-2 font-body font-[300] text-[13px] text-white/80 leading-[1.6]">
                <span className="text-gold shrink-0">→</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <a
            href="/home#lead-form"
            className="relative block w-full text-center font-body font-[600] uppercase overflow-hidden group"
            style={{ background: "#ad8957", color: "#06091a", fontSize: 12, letterSpacing: ".2em", padding: "14px 20px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ background: "#e8d5b0" }} />
            <span className="relative">Agendar agora</span>
          </a>
          <p className="font-body font-[300] italic text-[11px] text-w35 mt-4 leading-[1.5]">
            Se identificarmos fit, o próximo passo é o Global Mobility Success Assessment — com proposta sob consulta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
