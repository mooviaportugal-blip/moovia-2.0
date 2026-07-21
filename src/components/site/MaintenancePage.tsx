import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Definir a próxima sexta-feira (horário de Lisboa/GMT)
    const getNextFriday = () => {
      const now = new Date();
      const nextFriday = new Date(now);
      nextFriday.setDate(now.getDate() + ((5 + 7 - now.getDay()) % 7));
      nextFriday.setHours(10, 0, 0, 0); // 10:00 da manhã
      
      // Se hoje já for sexta e já passou das 10h, move para a próxima sexta
      if (now.getTime() > nextFriday.getTime()) {
        nextFriday.setDate(nextFriday.getDate() + 7);
      }
      return nextFriday;
    };

    const target = getNextFriday();

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });

      if (difference < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-[11px] tracking-[0.32em] uppercase text-gold">
            MOOVIA Portugal
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h1 className="font-display text-[clamp(32px,5vw,54px)] leading-[1.05] tracking-[-0.02em] mb-8">
          <span className="font-[300] block text-white/70">Aguarde até</span>
          <span className="font-[400] text-gold-l italic block underline decoration-gold/30">sexta-feira</span>
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-12 max-w-md mx-auto">
          {[
            { label: "Dias", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Seg", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-[clamp(24px,4vw,36px)] font-display text-white font-[400]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] mb-10 max-w-lg mx-auto">
          Estamos a finalizar a nova infraestrutura digital da MOOVIA. 
          A contagem regressiva para a Global Mobility Assurance começou.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[12px] tracking-[0.15em] uppercase">
          <a
            href="mailto:contato@mooviaglobal.com"
            className="text-gold hover:text-gold-l transition-colors border-b border-gold/30 pb-1"
          >
            contato@mooviaglobal.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
