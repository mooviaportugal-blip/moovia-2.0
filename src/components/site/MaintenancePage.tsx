import { motion } from "framer-motion";

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white flex items-center justify-center px-6 relative overflow-hidden font-body">
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
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-[11px] tracking-[0.32em] uppercase text-gold">
            MOOVIA Portugal
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h1 className="font-display text-[clamp(32px,5vw,54px)] leading-[1.05] tracking-[-0.02em] mb-12">
          <span className="font-[400] text-gold-l italic block underline decoration-gold/30">Global Mobility Assurance</span>
        </h1>

        <div className="flex justify-center mb-12">
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <img 
              src="/mooviagold.png" 
              alt="MOOVIA Logo" 
              className="w-24 h-24 object-contain brightness-110"
            />
            {/* Spinning ring around the logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-gold/10 rounded-full border-t-gold/40"
            />
          </motion.div>
        </div>

        <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] mb-10 max-w-lg mx-auto">
          Global Mobility Assurance. Estamos a melhorar a sua experiência.<br />
          Uma nova fase da MOOVIA está a chegar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[12px] tracking-[0.15em] uppercase">
          <a
            href="mailto:contato@mooviaglobal.com"
            className="text-gold hover:text-gold-l transition-colors border-b border-gold/30 pb-1"
          >
            contacto@mooviaglobal.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
