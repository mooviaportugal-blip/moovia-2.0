import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { useMooviaPlayer } from "@/hooks/useMooviaPlayer";

export function SoundToggle({
  isPlaying,
  currentTrackTitle,
  onToggle,
}: {
  isPlaying: boolean;
  currentTrackTitle: string;
  onToggle: () => void;
}) {
  const player = useMooviaPlayer();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed right-4 sm:right-8 bottom-6 sm:bottom-[104px] z-[100]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-14 right-0 w-[280px] rounded-xl border border-gold/25 bg-[#0b1225]/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={player.currentTrack.cover || "/mooviagold.svg"}
                alt=""
                className="w-12 h-12 rounded-md object-cover border border-white/10 flex-shrink-0 bg-black p-1"
                onError={(e) => (e.currentTarget.src = "/mooviagold.svg")}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-1">
                  A tocar
                </div>
                <div className="font-display text-white text-[14px] leading-tight truncate">
                  {currentTrackTitle}
                </div>
              </div>
              <Link
                to="/soundbrand"
                onClick={() => setOpen(false)}
                aria-label="Abrir Sound Branding"
                title="Sound Branding completo"
                className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/40 text-gold hover:bg-gold/15 hover:border-gold flex items-center justify-center transition"
              >
                <Library size={14} />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <button
                onClick={player.prevTrack}
                aria-label="Anterior"
                className="flex-1 h-9 rounded-md border border-white/10 hover:border-gold/50 text-w70 hover:text-gold flex items-center justify-center transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12l8.5 6V6z"/></svg>
              </button>
              <button
                onClick={onToggle}
                aria-label={isPlaying ? "Pausar" : "Tocar"}
                className="flex-1 h-9 rounded-md bg-gold text-black hover:bg-gold-l flex items-center justify-center transition"
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button
                onClick={player.nextTrack}
                aria-label="Próxima"
                className="flex-1 h-9 rounded-md border border-white/10 hover:border-gold/50 text-w70 hover:text-gold flex items-center justify-center transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>
              </button>
            </div>

            <ul className="max-h-[180px] overflow-y-auto -mx-1">
              {player.tracks.map((t, i) => {
                const active = i === player.currentIndex;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => player.goToTrack(i)}
                      className={`w-full text-left px-3 py-2 rounded-md text-[12px] flex items-center gap-2 transition ${
                        active ? "bg-gold/10 text-white" : "text-w70 hover:bg-white/5"
                      }`}
                    >
                      <span className={`tabular-nums text-[10px] ${active ? "text-gold" : "text-w35"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate flex-1">{t.title}</span>
                      {active && isPlaying && (
                        <span className="flex items-end gap-[2px] h-3">
                          {[0, 1, 2].map((b) => (
                            <span
                              key={b}
                              className="w-[2px] bg-gold rounded-full"
                              style={{ animation: `soundBars 1s ease-in-out ${b * 0.15}s infinite` }}
                            />
                          ))}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                if (isPlaying) onToggle();
                player.denyPermission();
                setOpen(false);
              }}
              className="mt-3 w-full text-[10px] tracking-[0.2em] uppercase text-w35 hover:text-w70 py-2 transition"
            >
              Silenciar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Player de música"
        title={isPlaying ? `A tocar: ${currentTrackTitle}` : "Abrir player"}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 bg-[#0b1225]/90 border ${
          isPlaying
            ? "border-gold/60 shadow-[0_0_18px_rgba(173,137,87,0.2)]"
            : "border-gold/30"
        } hover:border-gold hover:scale-110`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 15.5V5l10-1.5v10"
            stroke={isPlaying ? "#ad8957" : "rgba(173,137,87,0.55)"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="7" cy="15.5" r="2.2" fill={isPlaying ? "#ad8957" : "rgba(173,137,87,0.55)"} />
          <circle cx="17" cy="14" r="2.2" fill={isPlaying ? "#ad8957" : "rgba(173,137,87,0.55)"} />
          {isPlaying && (
            <>
              <path
                d="M17 8c1.1.9 1.8 2.3 1.8 3.8S18.1 14.7 17 15.6"
                stroke="#ad8957"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                style={{ animation: "soundPulse 1.4s ease-in-out infinite" }}
              />
              <path
                d="M19.5 5.5c1.8 1.6 2.9 3.9 2.9 6.3s-1.1 4.7-2.9 6.3"
                stroke="#ad8957"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                style={{ animation: "soundPulse 1.4s ease-in-out 0.25s infinite" }}
              />
            </>
          )}
        </svg>
      </motion.button>
    </div>
  );
}
