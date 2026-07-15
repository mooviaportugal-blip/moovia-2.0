import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function SoundModal({
  open,
  onGrant,
  onDeny,
}: {
  open: boolean;
  onGrant: () => void;
  onDeny: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#06091a]/80 backdrop-blur-md px-6"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[380px] rounded-2xl border border-gold/25 bg-[#0b1225] p-10 text-center flex flex-col items-center gap-4"
          >
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
              <path d="M22 6v16.5a4.5 4.5 0 1 1-3-4.243V6h3z" fill="#ad8957" />
            </svg>

            <h3 className="font-display text-[18px] font-[400] text-white leading-[1.5]">
              A MOOVIA tem uma trilha
              <br />
              para acompanhar a sua visita.
            </h3>
            <p className="font-body text-[14px] text-w35 leading-[1.6]">
              Música instrumental suave,
              <br />
              para quem está pensando no próximo capítulo.
            </p>

            <div className="flex flex-col gap-3 w-full mt-3">
              <button
                onClick={onGrant}
                className="bg-gold text-black font-body font-[600] text-[12px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-[2px] hover:bg-gold-l transition-colors"
              >
                Ativar som
              </button>
              <button
                onClick={onDeny}
                className="text-w35 hover:text-w70 font-body font-[400] text-[12px] tracking-[0.18em] uppercase py-2 transition-colors"
              >
                Continuar em silêncio
              </button>
            </div>

            <Link
              to="/soundbrand"
              onClick={onDeny}
              className="font-body text-[11px] text-w35 hover:text-gold underline underline-offset-4 transition-colors mt-1"
            >
              Conferir nosso SoundBrand completo
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
