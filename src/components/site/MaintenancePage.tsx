import { motion } from "framer-motion";

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white flex items-center justify-center px-6 relative overflow-hidden">
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
        className="relative z-10 max-w-xl text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-[11px] tracking-[0.32em] uppercase text-gold">
            MOOVIA Portugal
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h1 className="font-display text-[clamp(32px,5vw,54px)] leading-[1.05] tracking-[-0.02em] mb-8">
          <span className="font-[300] block text-white/70">Estamos em</span>
          <span className="font-[400] text-gold-l italic block">manutenção</span>
        </h1>

        <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] mb-10">
          Estamos a aprimorar a sua experiência. Voltamos em breve, com uma
          nova versão da MOOVIA Portugal. Para assuntos urgentes, fale
          conosco pelos canais abaixo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[12px] tracking-[0.15em] uppercase">
          <a
            href="mailto:contacto@mooviaglobal.com"
            className="text-gold hover:text-gold-l transition-colors"
          >
            contacto@mooviaglobal.com
          </a>
          <span className="hidden sm:block text-w35">·</span>
          <a
            href="tel:+351910388877"
            className="text-gold hover:text-gold-l transition-colors"
          >
            +351 910 388 877
          </a>
        </div>
      </motion.div>
    </div>
  );
}
