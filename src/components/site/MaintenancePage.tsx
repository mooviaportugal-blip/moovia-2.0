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
        className="relative z-10 w-full max-w-3xl text-center"
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
          MOOVIA is Evolving.
        </h1>

        <div className="space-y-7 font-body text-[15px] font-[300] text-w35 leading-[1.8] max-w-2xl mx-auto">
          <p>
            We are currently partnering with{" "}
            <span className="text-gold-l font-normal">Hypernova</span> to refine
            MOOVIA&apos;s next-generation positioning, product architecture, and global
            go-to-market strategy.
          </p>
          <p>
            Our focus remains unwavering:{" "}
            <span className="text-gold-l italic">
              making the human system behind Global Mobility visible, measurable,
              and manageable.
            </span>{" "}
            We empower enterprise organizations to anticipate risk early, act
            decisively, and safeguard the strategic value of international
            assignments.
          </p>
        </div>

        {/* Partnership seal */}
        <div className="mt-16 pt-10 border-t border-gold/25">
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-gold mb-4">
            Accelerated by Institutional Excellence
          </p>
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-white/50 mb-5">
            In partnership with
          </p>
          <a
            href="https://www.hypernova.global/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            aria-label="Visit Hypernova website"
          >
            <img
              src={hypernovaLogo.url}
              alt="Hypernova"
              width={469}
              height={123}
              className="h-auto w-44 sm:w-52 object-contain"
            />
          </a>

          <p className="font-body text-[14px] md:text-[15px] font-[300] text-w35 leading-[1.7] max-w-2xl mx-auto mt-8 mb-8">
            Backed by an executive track record of{" "}
            <span className="text-gold-l font-normal">1,400+ accelerated startups globally</span>,
            Hypernova drives high-impact venture acceleration and deep-tech
            innovation. Through this partnership, MOOVIA is directly connected to a
            premier institutional validation ecosystem alongside global leaders
            including:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-body text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-white">
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
        </div>

        <div className="mt-14 space-y-4">
          <p className="font-display text-[clamp(18px,2.4vw,26px)] font-[300] text-white leading-[1.35]">
            The next chapter of MOOVIA arrives in{" "}
            <span className="text-gold-l italic">September 2026</span>.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="w-10 h-px bg-gold/30" />
            <p className="font-body text-[12px] tracking-[0.2em] uppercase text-w35">
              For early-access partnerships and PoC inquiries
            </p>
            <div className="w-10 h-px bg-gold/30" />
          </div>

          <a
            href="mailto:contacto@mooviaglobal.com"
            className="inline-block mt-2 font-body text-[14px] tracking-[0.15em] uppercase text-gold hover:text-gold-l transition-colors border-b border-gold/30 pb-1"
          >
            contacto@mooviaglobal.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
