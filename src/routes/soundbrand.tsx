import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMooviaPlayer } from "@/hooks/useMooviaPlayer";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/soundbrand")({
  head: () => ({
    meta: [
      { title: "Sound Branding · MOOVIA Portugal" },
      {
        name: "description",
        content:
          "Cinco faixas instrumentais criadas para acompanhar a jornada de quem decide, parte e chega a Portugal.",
      },
      { property: "og:title", content: "Sound Branding · MOOVIA Portugal" },
      {
        property: "og:description",
        content: "Rádio MOOVIA: trilha original para uma transição internacional.",
      },
    ],
  }),
  component: SoundBrandPage,
});

function formatTime(s: number) {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function SoundBrandPage() {
  const player = useMooviaPlayer();

  return (
    <SiteLayout>
      <section className="min-h-screen bg-[#06091a] pt-32 pb-24 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <header className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-[11px] font-[400] tracking-[0.32em] uppercase text-gold">
                MOOVIA
              </span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h1 className="font-display text-[clamp(36px,5vw,64px)] font-[300] text-white leading-[1.05] mb-6">
              Sound <span className="italic text-gold-l">Branding</span>
            </h1>
            <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] max-w-xl mx-auto">
              Cinco faixas criadas para acompanhar a jornada de quem está a decidir,
              a partir e a chegar a um novo lar em Portugal.
            </p>
          </header>

          {/* Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-gold/20 bg-[#0b1225] p-8 sm:p-12 mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
              <img
                src={player.currentTrack.cover}
                alt={player.currentTrack.title}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-cover border border-gold/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="font-display text-gold-l text-[28px] sm:text-[32px] font-[300] tabular-nums leading-none mb-2">
                  {String(player.currentIndex + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-white text-[20px] sm:text-[26px] font-[400]">
                  {player.currentTrack.title}
                </div>
              </div>
            </div>

            <div
              role="slider"
              aria-label="Progresso da faixa"
              aria-valuenow={Math.round(player.progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                player.seekTo(Math.max(0, Math.min(100, pct)));
              }}
              className="group relative h-3 w-full mb-2 cursor-pointer flex items-center"
            >
              <div className="h-[4px] w-full bg-white/10 rounded-full overflow-hidden group-hover:h-[6px] transition-all">
                <div
                  className="h-full bg-gold relative"
                  style={{ width: `${player.progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(173,137,87,0.6)]" />
                </div>
              </div>
            </div>
            <div className="flex justify-between font-body text-[11px] tabular-nums text-w35 mb-8">
              <span>{formatTime(player.currentTime)}</span>
              <span>{formatTime(player.duration)}</span>
            </div>


            <div className="flex items-center justify-center gap-6">
              <button
                onClick={player.prevTrack}
                aria-label="Faixa anterior"
                className="w-12 h-12 rounded-full border border-gold/30 text-gold-l hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
                </svg>
              </button>
              <button
                onClick={player.togglePlay}
                aria-label={player.isPlaying ? "Pausar" : "Reproduzir"}
                className="w-16 h-16 rounded-full bg-gold text-black hover:bg-gold-l transition-colors flex items-center justify-center shadow-[0_8px_24px_rgba(173,137,87,0.25)]"
              >
                {player.isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={player.nextTrack}
                aria-label="Próxima faixa"
                className="w-12 h-12 rounded-full border border-gold/30 text-gold-l hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Tracklist */}
          <ul className="rounded-2xl border border-white/5 bg-[#0b1225]/60 divide-y divide-white/5 overflow-hidden">
            {player.tracks.map((track, i) => {
              const active = i === player.currentIndex;
              return (
                <li key={track.id}>
                  <button
                    onClick={() => player.goToTrack(i)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                      active ? "bg-gold/5" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <span
                      className={`font-display text-[14px] tabular-nums w-6 ${
                        active ? "text-gold" : "text-w35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={track.cover}
                      alt=""
                      className="w-10 h-10 rounded-md object-cover border border-white/10"
                      onError={(e) => ((e.currentTarget.style.display = "none"))}
                    />
                    <span
                      className={`font-body text-[15px] flex-1 ${
                        active ? "text-white" : "text-w70"
                      }`}
                    >
                      {track.title}
                    </span>
                    {active && player.isPlaying && (
                      <span className="flex items-end gap-[3px] h-4">
                        {[0, 1, 2].map((b) => (
                          <span
                            key={b}
                            className="w-[3px] bg-gold rounded-full"
                            style={{
                              animation: `soundBars 1s ease-in-out ${b * 0.15}s infinite`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <footer className="mt-16 text-center">
            <p className="font-body text-[13px] font-[300] text-w35 leading-[1.7] max-w-lg mx-auto mb-4">
              Todas as faixas foram compostas exclusivamente para a MOOVIA Portugal.
              Instrumental, sem letra, pensadas para acompanhar uma das decisões mais
              importantes da sua vida sem interferir no pensamento.
            </p>
            <span className="font-body text-[11px] tracking-[0.25em] uppercase text-gold/60">
              © MOOVIA Portugal · Sound Branding
            </span>
          </footer>
        </div>

        <style>{`
          @keyframes soundBars {
            0%, 100% { height: 4px; }
            50% { height: 16px; }
          }
        `}</style>
      </section>
    </SiteLayout>
  );
}
