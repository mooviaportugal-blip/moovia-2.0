import { useEffect, useMemo, useRef, useState } from "react";
import { TrainFront } from "lucide-react";
import fredericoAsset from "@/assets/frederico.jpg.asset.json";
import leticiaAsset from "@/assets/leticia.png.asset.json";
import lauraAsset from "@/assets/laura.png.asset.json";
import saraAsset from "@/assets/sara.png.asset.json";
import cristinaAsset from "@/assets/cristina.png.asset.json";

import danyAsset from "@/assets/dany.png.asset.json";
import metroSound from "@/assets/metro.mp3.asset.json";

const PHOTO_BY_NAME: Record<string, string> = {
  "Frederico Prado": fredericoAsset.url,
  "Dra. Letícia de Mello": leticiaAsset.url,
  "Dra. Laura Costa": lauraAsset.url,
  "Sara Russo": saraAsset.url,
  "Sandra Santos": "/images/sandra.png",
  "Cristina Sousa": cristinaAsset.url,
  "Dany Zukerman": danyAsset.url,
  "Equipa MOOVIA": "/mooviagold.svg",
};

type Especialista = {
  nome: string;
  papel: string;
  imagem?: string | null;
  iniciais?: string;
  vaga?: boolean;
};

type Estacao = {
  id: number;
  nome: string;
  pergunta: string;
  objetivo: string;
  especialistas: Especialista[];
};

const initialsOf = (nome: string) =>
  nome
    .split(" ")
    .filter((p) => p.length > 2 && !["Dra.", "Dr."].includes(p))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

const ESTACOES: Estacao[] = [
  {
    id: 1,
    nome: "Diagnosticar",
    pergunta: "Compreender objetivos, riscos, stakeholders e fatores críticos de sucesso.",
    objetivo:
      "Análise inicial do contexto, dos stakeholders e das variáveis críticas da mobilidade. Metodologia: Entrevista Estratégica MOOVIA™, AI Mobility Discovery™, Context Mapping Framework™. A IA estrutura informação e identifica padrões; a decisão é sempre dos especialistas MOOVIA.",
    especialistas: [
      { nome: "Frederico Prado", papel: "Framework Owner · Lead Strategist" },
    ],
  },
  {
    id: 2,
    nome: "Avaliar",
    pergunta: "Identificar riscos estratégicos, operacionais, familiares e patrimoniais.",
    objetivo:
      "Diagnóstico multidimensional que integra entrevistas estruturadas e apoio de IA para orientar as decisões seguintes. Metodologia: Mobility Risk Assessment™.",
    especialistas: [
      { nome: "Frederico Prado", papel: "Global Mobility Strategy" },
      { nome: "Dra. Letícia de Mello", papel: "Adaptive Integration Assessment" },
    ],
  },
  {
    id: 3,
    nome: "Desenhar",
    pergunta: "Construir a estratégia integrada de mobilidade.",
    objetivo:
      "Definir prioridades, cronograma, responsáveis e roadmap de execução da mobilidade internacional.",
    especialistas: [
      { nome: "Frederico Prado", papel: "Framework Owner" },
    ],
  },
  {
    id: 4,
    nome: "Coordenar",
    pergunta: "Gerir especialistas, parceiros e fornecedores como um único projeto.",
    objetivo:
      "Orquestração operacional da execução, integrando tecnologia, processos e todos os intervenientes numa única governance.",
    especialistas: [
      { nome: "Pablo Alejandro Saco Paim", papel: "Co-Founder & COO · Lead Strategist" },
    ],
  },
  {
    id: 5,
    nome: "Integrar",
    pergunta: "Acompanhar a adaptação da família e garantir os resultados esperados.",
    objetivo:
      "Reduzir riscos após a chegada e apoiar a adaptação humana. Metodologia: Adaptive Integration Framework™, AEAI Follow-up™, AI Success Monitor™.",
    especialistas: [
      { nome: "Frederico Prado", papel: "Programme Director" },
      { nome: "Dra. Letícia de Mello", papel: "Adaptive Integration Specialist" },
    ],
  },
  {
    id: 6,
    nome: "Medir",
    pergunta: "Monitorizar indicadores de sucesso e apoiar decisões futuras.",
    objetivo:
      "Acompanhamento contínuo dos resultados da mobilidade. Metodologia: Global Mobility Success Index™, Outcome Dashboard™, AI Predictive Insights™.",
    especialistas: [
      { nome: "Frederico Prado", papel: "Programme Director" },
    ],
  },
].map<Estacao>((e) => ({
  ...e,
  especialistas: e.especialistas.map<Especialista>((s) => ({
    ...s,
    imagem: (s as Especialista).imagem ?? PHOTO_BY_NAME[s.nome] ?? null,
    iniciais: (s as Especialista).iniciais ?? initialsOf(s.nome),
  })),
}));

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function posAtProgress(progress: number, count: number) {
  const totalHops = count - 1;
  const scaled = Math.max(0, Math.min(progress, 1)) * totalHops;
  const hop = Math.min(Math.floor(scaled), totalHops - 1);
  const localT = Math.min(Math.max(scaled - hop, 0), 1);
  const eased = easeInOutCubic(localT);
  const p0 = hop / totalHops;
  const p1 = (hop + 1) / totalHops;
  return p0 + (p1 - p0) * eased;
}

function Avatar({ s }: { s: Especialista }) {
  if (s.vaga) {
    return (
      <div className="h-12 w-12 shrink-0 rounded-full border border-dashed border-gold/60 flex items-center justify-center text-gold/70 font-urbanist text-lg">
        +
      </div>
    );
  }
  if (s.imagem) {
    const isLogo = s.imagem.endsWith(".svg");
    return (
      <img
        src={s.imagem}
        alt={s.nome}
        className={`h-12 w-12 shrink-0 rounded-full border border-gold/30 ${
          isLogo ? "object-contain p-2 bg-navy" : "object-cover"
        }`}
      />
    );
  }
  return (
    <div className="h-12 w-12 shrink-0 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold font-urbanist text-sm tracking-wider">
      {s.iniciais}
    </div>
  );
}

function EspecialistaCard({ s, delay }: { s: Especialista; delay: number }) {
  return (
    <li
      className={[
        "flex items-start gap-4 p-5 opacity-0 translate-y-2",
        "animate-[card-in_0.5s_ease-out_forwards]",
        s.vaga
          ? "border border-dashed border-gold/40 bg-gold/[0.03]"
          : "border border-white/5 bg-white/[0.02]",
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Avatar s={s} />
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-sora text-[16px] font-[300] text-white">{s.nome}</p>
          {s.vaga && (
            <span className="font-urbanist text-[9px] tracking-[0.24em] uppercase text-gold border border-gold/40 px-2 py-0.5">
              Vaga aberta
            </span>
          )}
        </div>
        <p className="mt-1 font-urbanist text-[13px] font-[300] text-w35 leading-relaxed">
          {s.papel}
        </p>
      </div>
    </li>
  );
}

function LinhaMooversSign({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex justify-center ${compact ? "mb-5" : "mb-8"}`} aria-hidden>
      <div
        className={[
          "linha-moovers-sign relative inline-flex items-center gap-3 border border-gold/40",
          "bg-gradient-to-b from-[#1a1308] to-black px-4 py-2 sm:px-5 sm:py-2.5",
          "shadow-[inset_0_1px_0_rgba(173,137,87,0.25),0_0_24px_rgba(173,137,87,0.18)]",
          "overflow-hidden rounded-sm",
        ].join(" ")}
      >
        <span
          className={[
            "linha-moovers-bulb relative grid place-items-center rounded-full bg-gold text-black",
            "font-sora font-[700]",
            compact ? "h-6 w-6 text-[12px]" : "h-7 w-7 text-[13px]",
          ].join(" ")}
        >
          M
        </span>
        <span
          className={[
            "font-urbanist uppercase text-gold-l tracking-[0.32em]",
            compact ? "text-[10px]" : "text-[11px] sm:text-[12px]",
          ].join(" ")}
        >
          <span className="opacity-70">Linha</span>{" "}
          <span className="font-[600] text-gold">Moovers</span>
        </span>
        <span className="linha-moovers-shimmer pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}

function StationPanel({ estacao }: { estacao: Estacao }) {
  const total = ESTACOES.length;
  const idx = ESTACOES.findIndex((e) => e.id === estacao.id);
  const pct = (idx / (total - 1)) * 100;
  return (
    <div className="border border-gold/25 bg-gradient-to-b from-white/[0.02] to-transparent p-5 sm:p-6 md:p-8">
      {/* Mini metro line indicator inside the box (mobile-only, desktop has it above) */}
      <div className="relative mb-8 hidden" aria-hidden>
        <div className="relative h-px w-full bg-gradient-to-r from-gold/10 via-gold/50 to-gold/10" />
        <div className="absolute inset-x-0 -top-2 flex justify-between">
          {ESTACOES.map((e) => (
            <span
              key={e.id}
              className={[
                "h-4 w-4 rounded-full border",
                e.id === estacao.id
                  ? "bg-gold border-gold"
                  : e.id < estacao.id
                  ? "bg-gold/60 border-gold/60"
                  : "bg-black border-gold/40",
              ].join(" ")}
            />
          ))}
        </div>
        <div
          className="absolute -top-5 -translate-x-1/2 transition-all duration-500"
          style={{ left: `${pct}%` }}
        >
          <div className="flex flex-col items-center">
            <div className="h-7 w-7 rounded-full bg-gold text-black flex items-center justify-center shadow-[0_0_18px_rgba(173,137,87,0.65)]">
              <TrainFront size={14} strokeWidth={2.2} />
            </div>
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-gold" />
          </div>
        </div>
      </div>

      <p className="font-urbanist text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
        Etapa {String(estacao.id).padStart(2, "0")} · {estacao.nome}
      </p>
      <h3 className="font-sora text-[clamp(22px,2.6vw,32px)] font-[100] text-white leading-tight max-w-3xl">
        {estacao.pergunta}
      </h3>
      <p className="mt-5 max-w-2xl font-urbanist text-[15px] font-[300] text-w35 leading-relaxed">
        {estacao.objetivo}
      </p>
      <div className="mt-8">
        <p className="font-urbanist text-[10px] tracking-[0.28em] uppercase text-gold/70 mb-5">
          Componentes da etapa
        </p>
        <ul key={estacao.id} className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {estacao.especialistas.map((s, idx) => (
            <EspecialistaCard key={`${estacao.id}-${idx}`} s={s} delay={idx * 90} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============ DESKTOP, pinned scroll-jacking ============ */
function DesktopJornada() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(new Set([1]));
  const [activeId, setActiveId] = useState(1);
  const [reopened, setReopened] = useState<number | null>(null);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const innerH = window.innerHeight;
      const denom = rect.height - innerH;
      const p = Math.max(0, Math.min(1, -rect.top / denom));
      setProgress(p);

      // Shake only while actively scrolling inside the pinned section
      const inSection = rect.top <= 0 && rect.bottom >= innerH;
      if (inSection) {
        setIsScrolling(true);
        if (idleTimer.current) window.clearTimeout(idleTimer.current);
        idleTimer.current = window.setTimeout(() => setIsScrolling(false), 140);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  const trainX = useMemo(
    () => posAtProgress(progress, ESTACOES.length) * 100,
    [progress]
  );

  const { nearestId, atStation } = useMemo(() => {
    const stationPositions = ESTACOES.map((e, i) => ({
      id: e.id,
      pct: (i / (ESTACOES.length - 1)) * 100,
    }));
    let near = stationPositions[0];
    let minD = Infinity;
    for (const sp of stationPositions) {
      const d = Math.abs(sp.pct - trainX);
      if (d < minD) {
        minD = d;
        near = sp;
      }
    }
    return { nearestId: near.id, atStation: minD < 1.2 };
  }, [trainX]);

  // Shake only while user is scrolling AND train is between stations
  // (stops at the final station, train has arrived)
  const lastStationId = ESTACOES[ESTACOES.length - 1].id;
  const arrived = nearestId === lastStationId && atStation;
  const transiting = isScrolling && !atStation && !arrived;

  // Metro sound during station transitions, plays to completion
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasTransiting = useRef(false);
  useEffect(() => {
    if (transiting && !wasTransiting.current) {
      // Only play metro sound on the /equipa page
      const onEquipa = typeof window !== "undefined" && window.location.pathname.startsWith("/equipa");
      if (onEquipa) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        const a = new Audio(metroSound.url);
        a.volume = 0.45;
        a.onended = () => {
          if (audioRef.current === a) audioRef.current = null;
        };
        audioRef.current = a;
        a.play().catch(() => {
          if (audioRef.current === a) audioRef.current = null;
        });
      }
    }
    wasTransiting.current = transiting;
  }, [transiting]);
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (atStation) {
      setActiveId(nearestId);
      setReopened(null);
      setVisited((prev) => {
        if (prev.has(nearestId)) return prev;
        const next = new Set(prev);
        next.add(nearestId);
        return next;
      });
    }
  }, [atStation, nearestId]);

  const displayedId = reopened ?? activeId;
  const displayed = ESTACOES.find((e) => e.id === displayedId)!;

  return (
    <div ref={wrapRef} className="relative hidden md:block" style={{ height: `${ESTACOES.length * 100}vh` }}>
      <div className="jornada-wrap sticky top-0 h-dvh w-full overflow-hidden flex flex-col justify-start pt-[3vh]">

        <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-[80px]">
          <LinhaMooversSign />
          {/* Metro line */}
          <div className="relative mt-2">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10 -translate-y-1/2" />

            <ul className="relative flex items-center justify-between">
              {ESTACOES.map((e, i) => {
                const isVisited = visited.has(e.id) || e.id <= displayedId;
                const isOpen = displayedId === e.id;
                return (
                  <li key={e.id} className="flex flex-col items-center" style={{ width: `${100 / ESTACOES.length}%` }}>
                    <button
                      type="button"
                      onClick={() => {
                        setReopened(e.id);
                        setVisited((prev) => {
                          const next = new Set(prev);
                          for (const s of ESTACOES) if (s.id <= e.id) next.add(s.id);
                          return next;
                        });
                      }}
                      aria-label={`Estação ${e.id}: ${e.nome}`}
                      className={[
                        "relative h-12 w-12 rounded-full border-2 transition-all duration-300",
                        "flex items-center justify-center font-urbanist text-[10px] gap-0.5 cursor-pointer",
                        isVisited
                          ? "bg-gold border-gold text-black"
                          : "bg-black border-gold/40 text-gold/70 hover:border-gold hover:text-gold",
                        isOpen ? "shadow-[0_0_0_6px_rgba(173,137,87,0.15),0_0_30px_rgba(173,137,87,0.6)]" : "",
                      ].join(" ")}
                    >
                      <span className="font-urbanist text-[12px]">{String(e.id).padStart(2, "0")}</span>
                    </button>

                    <div className="mt-4 text-center px-1">
                      <p className="font-urbanist text-[9px] tracking-[0.24em] uppercase text-gold/70">
                        Estação {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-sora text-[13px] font-[200] text-white leading-tight">
                        {e.nome}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Active station panel */}
          <div className="mt-6">
            <div key={displayedId} className="animate-[card-in_0.45s_ease-out_forwards]">
              <StationPanel estacao={displayed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ MOBILE, horizontal swipe with snap, same metro logic ============ */
function MobileJornada() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [atStation, setAtStation] = useState(true);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const x = el.scrollLeft;
      const idx = Math.round(x / w);
      setActiveIdx(Math.max(0, Math.min(ESTACOES.length - 1, idx)));
      const distToSnap = Math.abs(x - idx * w);
      setAtStation(distToSnap < w * 0.06);
      setIsScrolling(true);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIsScrolling(false), 160);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  const lastIdx = ESTACOES.length - 1;
  const arrived = activeIdx === lastIdx && atStation;
  const transiting = isScrolling && !atStation && !arrived;

  // Metro sound on swipe between stations
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasTransiting = useRef(false);
  useEffect(() => {
    if (transiting && !wasTransiting.current) {
      const onEquipa = typeof window !== "undefined" && window.location.pathname.startsWith("/equipa");
      if (onEquipa) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        const a = new Audio(metroSound.url);
        a.volume = 0.45;
        a.onended = () => {
          if (audioRef.current === a) audioRef.current = null;
        };
        audioRef.current = a;
        a.play().catch(() => {
          if (audioRef.current === a) audioRef.current = null;
        });
      }
    }
    wasTransiting.current = transiting;
  }, [transiting]);
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // Train X position as fraction across the metro line
  const el = scrollerRef.current;
  const scrollFraction = el && el.scrollWidth > el.clientWidth
    ? el.scrollLeft / (el.scrollWidth - el.clientWidth)
    : activeIdx / Math.max(1, lastIdx);
  const trainPct = Math.max(0, Math.min(1, scrollFraction)) * 100;

  return (
    <div className={`md:hidden mt-8 ${transiting ? "jornada-wrap transiting" : ""}`}>

      <div className="px-4"><LinhaMooversSign compact /></div>
      {/* Horizontal metro line with stations */}
      <div className="px-4 mb-6">
        <div className="relative h-14">
          <div className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10 -translate-y-1/2" />
          <ul className="relative flex items-center justify-between h-full">
            {ESTACOES.map((e, i) => {
              const isActive = i === activeIdx;
              const isPast = i < activeIdx;
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Estação ${e.id}: ${e.nome}`}
                    className={[
                      "h-11 w-11 rounded-full border-2 flex items-center justify-center font-urbanist text-[11px] transition-all duration-300",
                      isActive
                        ? "bg-gold border-gold text-black shadow-[0_0_0_4px_rgba(173,137,87,0.15),0_0_18px_rgba(173,137,87,0.6)]"
                        : isPast
                        ? "bg-gold/70 border-gold/70 text-black"
                        : "bg-black border-gold/40 text-gold/70",
                    ].join(" ")}
                  >
                    {String(e.id).padStart(2, "0")}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Train icon */}
          <div
            className="absolute -top-1 -translate-x-1/2 transition-[left] duration-150"
            style={{ left: `calc(${trainPct}% * (100% - 32px) / 100% + 16px)` }}
            aria-hidden
          >
            <div className="h-6 w-6 rounded-full bg-gold text-black flex items-center justify-center shadow-[0_0_14px_rgba(173,137,87,0.7)]">
              <TrainFront size={12} strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </div>

      {/* Swipe carousel */}
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {ESTACOES.map((e) => (
          <div key={e.id} className="shrink-0 w-full snap-center px-4">
            <StationPanel estacao={e} />
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-urbanist text-[10px] tracking-[0.24em] uppercase text-gold/60">
        Deslize para a próxima estação →
      </p>
    </div>
  );
}

export function JornadaCliente() {
  return (
    <section className="bg-black py-16 md:py-24 lg:py-32">
      <style>{`
        @keyframes train-shake {
          0%,100% { transform: translate(0,0); }
          20% { transform: translate(-4px,2px); }
          40% { transform: translate(4px,-3px); }
          60% { transform: translate(-3px,-2px); }
          80% { transform: translate(3px,3px); }
        }
        @keyframes streak-sweep {
          0%   { transform: translateX(-120%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(900%); opacity: 0; }
        }
        @keyframes card-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .jornada-wrap.transiting { animation: train-shake 0.13s linear infinite; }
        .streak-bar {
          position: absolute; left: 0;
          width: 22%; height: 3px; background: #ad8957;
          opacity: 0; animation: streak-sweep 0.55s linear infinite;
        }
        .jornada-wrap.transiting .streak-bar { opacity: 1; }
        @keyframes lm-bulb-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(173,137,87,0.55), 0 0 14px rgba(173,137,87,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(173,137,87,0), 0 0 22px rgba(173,137,87,0.85); }
        }
        @keyframes lm-shimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes lm-flicker {
          0%, 100% { opacity: 1; }
          47% { opacity: 1; }
          48% { opacity: 0.55; }
          49% { opacity: 1; }
        }
        .linha-moovers-sign { animation: lm-flicker 6s ease-in-out infinite; }
        .linha-moovers-bulb { animation: lm-bulb-pulse 2.4s ease-in-out infinite; }
        .linha-moovers-shimmer {
          background: linear-gradient(110deg, transparent 30%, rgba(255,220,170,0.18) 50%, transparent 70%);
          animation: lm-shimmer 3.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .jornada-wrap.transiting { animation: none; }
          .streak-bar { display: none; }
          .linha-moovers-sign, .linha-moovers-bulb, .linha-moovers-shimmer { animation: none; }
        }
      `}</style>
      <div className="mx-auto max-w-[1400px] px-6 md:px-[80px]">
        <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-gold" />
          Framework Global Mobility Success™
        </p>
        <h2 className="font-sora text-[clamp(32px,4.5vw,56px)] font-[100] leading-[1.1] text-white max-w-4xl">
          O sucesso de uma mobilidade internacional não acontece por acaso.
          Acontece quando cada decisão é tomada na sequência certa.
        </h2>
        <div className="mt-8 max-w-3xl space-y-4 font-urbanist text-[16px] font-[300] text-w35 leading-relaxed">
          <p>
            O problema nunca foi a falta de especialistas. Sempre foi a falta de
            coordenação. A MOOVIA resolve essa lacuna através de uma metodologia
            que integra estratégia, coordenação multidisciplinar e adaptação
            humana em seis etapas encadeadas.
          </p>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <DesktopJornada />
        <MobileJornada />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-[80px]">
        <p className="mt-16 max-w-3xl font-sora text-[clamp(20px,2.2vw,28px)] font-[200] leading-snug text-white/90">
          Existe um método. Existe coordenação. Existe uma equipa especializada
          por trás de cada etapa da sua mudança.
        </p>
      </div>
    </section>
  );
}
