import { motion } from "framer-motion";

export function AvailabilitySection() {
  return (
    <section
      className="px-6 lg:px-20 py-16 lg:py-24"
      style={{ background: "#0b1225", borderTop: "1px solid rgba(173,137,87,.15)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-urbanist text-gold mb-5 flex items-center gap-3"
            style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", fontWeight: 500 }}
          >
            <img src="/mooviagold.png" alt="" className="w-3.5 h-3.5 object-contain opacity-80" />
            Disponibilidade
          </p>
          <h2 className="font-sora font-[200] text-white leading-[1.15] mb-6" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
            Atendemos clientes em Portugal e internacionalmente,<br />
            mediante agendamento.
          </h2>
          <p className="font-urbanist font-[300] text-w70 leading-[1.9] max-w-2xl mb-12" style={{ fontSize: 15 }}>
            Horário comercial de Lisboa, de segunda a sexta-feira.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-b18">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#0b1225] p-8 md:p-12"
          >
            <h3 className="font-sora font-[200] text-white mb-8" style={{ fontSize: 24 }}>
              Primeira Conversa
              <span className="font-[400] text-w35 text-[0.7em] ml-2">· 20 minutos</span>
            </h3>

            <div className="flex justify-between gap-6 py-5 border-b border-b18">
              <span className="font-urbanist text-[11px] tracking-[0.22em] uppercase text-gold/80">Segunda a Sexta</span>
              <span className="font-urbanist text-[14px] text-white/85 text-right">09h00 às 18h00</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0b1225] p-8 md:p-12"
          >
            <h3 className="font-sora font-[200] text-white mb-8" style={{ fontSize: 24 }}>
              Strategic Assessment
            </h3>

            <div className="flex justify-between gap-6 py-5 border-b border-b18">
              <span className="font-urbanist text-[11px] tracking-[0.22em] uppercase text-gold/80">Segunda a Sexta</span>
              <span className="font-urbanist text-[14px] text-white/85 text-right">09h00 às 18h00</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
