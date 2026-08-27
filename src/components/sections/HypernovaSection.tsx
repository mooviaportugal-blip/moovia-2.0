import { motion } from "framer-motion";
import hypernovaLogo from "@/assets/hypernova-logo.png.asset.json";

export function HypernovaSection() {
  return (
    <section
      id="evolucao"
      data-no-translate
      className="bg-black py-24 md:py-32 lg:py-40 px-6 lg:px-20 border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-gold/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(34px,5vw,68px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-8"
        >
          MOOVIA is Evolving.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-body text-[clamp(16px,1.5vw,20px)] font-[300] text-w35 leading-[1.7] max-w-[780px] mx-auto mb-6"
        >
          We are currently partnering with{" "}
          <span className="text-gold-l font-normal">Hypernova</span> to refine
          MOOVIA&apos;s next-generation positioning, product architecture, and global
          go-to-market strategy.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-body text-[clamp(16px,1.5vw,20px)] font-[300] text-w35 leading-[1.7] max-w-[780px] mx-auto mb-16"
        >
          Our focus remains unwavering:{" "}
          <span className="text-gold-l italic">
            making the human system behind Global Mobility visible, measurable,
            and manageable.
          </span>{" "}
          We empower enterprise organizations to anticipate risk early, act
          decisively, and safeguard the strategic value of international
          assignments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent rounded-lg p-8 md:p-12 mb-16"
        >
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            Accelerated by Institutional Excellence
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
            <span className="font-body text-[10px] tracking-[0.32em] uppercase text-white/60">
              In partnership with
            </span>
            <a
              href="https://www.hypernova.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label="Visitar o site da Hypernova"
            >
              <img
                src={hypernovaLogo.url}
                alt="Hypernova"
                width={469}
                height={123}
                className="h-auto w-40 md:w-48 object-contain"
              />
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-gold/30" />
            <span className="font-body text-[10px] tracking-[0.32em] uppercase text-gold/70">
              Global venture acceleration
            </span>
            <div className="w-12 h-px bg-gold/30" />
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-[clamp(22px,2.6vw,34px)] font-[300] text-gold-l leading-[1.4] max-w-[700px] mx-auto mb-6"
          >
            Backed by an executive track record of{" "}
            <span className="text-gold font-normal">1,400+ accelerated startups globally</span>,
            Hypernova drives high-impact venture acceleration and deep-tech
            innovation.
          </motion.p>

          <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] max-w-[720px] mx-auto mb-10">
            Through this partnership, MOOVIA is directly connected to a premier
            industrial validation ecosystem alongside global leaders including:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-body text-[13px] md:text-[14px] tracking-[0.18em] uppercase text-white">
            <span>Bosch</span>
            <span className="text-gold">•</span>
            <span>Altice Labs</span>
            <span className="text-gold">•</span>
            <span>Siemens Gamesa</span>
            <span className="text-gold">•</span>
            <span>Prio</span>
            <span className="text-gold">•</span>
            <span>Bondalti</span>
            <span className="text-gold">•</span>
            <span>Group Amorim</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-display text-[clamp(20px,2.4vw,30px)] font-[300] text-white leading-[1.35]">
            The next chapter of MOOVIA arrives in{" "}
            <span className="text-gold-l italic">September 2026</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex items-center justify-center gap-6"
        >
          <div className="w-10 h-px bg-gold/30" />
          <p className="font-body text-[12px] tracking-[0.2em] uppercase text-w35">
            For early-access partnerships and PoC inquiries
          </p>
          <div className="w-10 h-px bg-gold/30" />
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
          href="mailto:contacto@mooviaglobal.com"
          className="inline-block mt-6 font-body text-[14px] tracking-[0.15em] uppercase text-gold hover:text-gold-l transition-colors border-b border-gold/30 pb-1"
        >
          contacto@mooviaglobal.com
        </motion.a>
      </div>
    </section>
  );
}
