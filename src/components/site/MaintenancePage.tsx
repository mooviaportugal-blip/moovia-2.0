import { motion } from "framer-motion";
import hypernovaLogo from "@/assets/hypernova-logo.png.asset.json";

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden font-body">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(15,31,65,0.5) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Logo MOOVIA */}
        <div className="flex justify-center mb-10">
          <motion.img
            src="/mooviagold.png"
            alt="MOOVIA"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain brightness-110"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-[11px] tracking-[0.32em] uppercase text-gold">
            MOOVIA
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h1 className="font-display text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-[-0.02em] mb-10 text-gold-l">
          MOOVIA is evolving.
        </h1>

        <div className="space-y-7 font-body text-[15px] font-[300] text-w35 leading-[1.8] max-w-xl mx-auto">
          <p>
            We are currently working with Hypernova to refine the next generation of
            MOOVIA's positioning, product architecture and go-to-market strategy.
          </p>
          <p>
            Our focus remains clear: making the human system behind Global Mobility
            visible, measurable and manageable, so organizations can better
            understand risk, act earlier and protect the value of international
            assignments.
          </p>
          <p className="text-white/70">
            The next chapter of MOOVIA launches in September 2026.
          </p>
        </div>

        {/* Partnership seal */}
        <div className="mt-16 pt-10 border-t border-gold/25">
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-white/30 mb-5">
            In partnership with
          </p>
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
              className="h-auto w-44 sm:w-52 object-contain"
            />
          </a>
        </div>

        <div className="mt-12 text-[12px] tracking-[0.15em] uppercase">
          <a
            href="mailto:contacto@mooviaglobal.com"
            className="text-gold hover:text-gold-l transition-colors border-b border-gold/30 pb-1"
          >
            contacto@mooviaglobal.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
