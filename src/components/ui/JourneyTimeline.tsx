import React from "react";

export interface TimelineNode {
  step: number;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  isFilled?: boolean;
}

export const DEFAULT_JOURNEY_NODES: TimelineNode[] = [
  {
    step: 1,
    time: "T-30 / T0",
    title: "Antes da mudança",
    subtitle: "Linha de base de prontidão",
    description: "Expectativas · alinhamento familiar · contexto · fatores de proteção e de risco",
  },
  {
    step: 2,
    time: "~30 dias",
    title: "Chegada",
    subtitle: "Adaptação inicial",
    description: "Realidade versus expectativas · primeiras fricções · enquadramento prático e familiar",
  },
  {
    step: 3,
    time: "~90 dias",
    title: "Integração",
    subtitle: "Verificação de padrões",
    description: "Adequação ao papel · integração cultural · estabilidade familiar · apoio organizacional",
  },
  {
    step: 4,
    time: "~180 dias",
    title: "Estabilidade",
    subtitle: "Revisão de resultados",
    description: "Tendência face à linha de base · efeito das intervenções · perspetiva da missão",
  },
  {
    step: 5,
    time: "Contínuo",
    title: "Acompanhamento",
    subtitle: "Seguimento acionado por risco",
    description: "Check-in adicional quando um sinal relevante se altera",
    isFilled: true,
  },
];

interface JourneyTimelineProps {
  nodes?: TimelineNode[];
  className?: string;
}

export function JourneyTimeline({
  nodes = DEFAULT_JOURNEY_NODES,
  className = "",
}: JourneyTimelineProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* DESKTOP LAYOUT (>= 1024px) */}
      <div className="hidden lg:block relative">
        {/* Linha horizontal conectora em peru */}
        <div
          aria-hidden="true"
          className="absolute top-[68px] left-[10%] right-[10%] h-[1.5px] bg-[#9B7A50]/40 -z-0"
        />

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {nodes.map((node) => (
            <div
              key={node.step}
              className="flex flex-col items-center text-center px-2 group"
            >
              {/* 1. Time label (peru) */}
              <span className="font-mono text-xs uppercase tracking-wider text-gold font-semibold mb-3 h-5 flex items-center justify-center">
                {node.time}
              </span>

              {/* 2. Círculo numerado 1 a 5 */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-transform duration-300 group-hover:scale-105 mb-6 ${
                  node.isFilled
                    ? "bg-[#9B7A50] text-[#06091a] shadow-lg shadow-[#9B7A50]/20 font-bold"
                    : "border-2 border-[#9B7A50] text-gold bg-[#0b1225]"
                }`}
              >
                {node.step}
              </div>

              {/* 3. Título (Wright Pro, branco) */}
              <h4 className="font-display font-[300] text-white text-lg xl:text-xl leading-snug mb-2">
                {node.title}
              </h4>

              {/* 4. Subtítulo (peru) */}
              <p className="font-body text-xs xl:text-sm text-gold font-medium mb-3">
                {node.subtitle}
              </p>

              {/* 5. Descrição (branco a 60%) */}
              <p className="font-body text-xs text-white/60 font-[300] leading-relaxed max-w-[220px]">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (< 1024px) */}
      <div className="lg:hidden relative pl-8 sm:pl-12">
        {/* Linha vertical conectora em peru */}
        <div
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-[15px] sm:left-[21px] w-[1.5px] bg-[#9B7A50]/40"
        />

        <div className="flex flex-col space-y-10">
          {nodes.map((node) => (
            <div key={node.step} className="relative flex items-start group">
              {/* Círculo numerado posicionado sobre a linha vertical */}
              <div
                className={`absolute -left-[24px] sm:-left-[30px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-transform duration-300 ${
                  node.isFilled
                    ? "bg-[#9B7A50] text-[#06091a] shadow-md shadow-[#9B7A50]/20 font-bold"
                    : "border-2 border-[#9B7A50] text-gold bg-[#0b1225]"
                }`}
              >
                {node.step}
              </div>

              {/* Conteúdo à direita */}
              <div className="flex flex-col text-left pl-3 sm:pl-4">
                {/* Time label */}
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gold font-semibold mb-1">
                  {node.time}
                </span>

                {/* Título (Wright Pro, branco) */}
                <h4 className="font-display font-[300] text-white text-lg sm:text-xl leading-snug mb-1">
                  {node.title}
                </h4>

                {/* Subtítulo (peru) */}
                <p className="font-body text-xs sm:text-sm text-gold font-medium mb-2">
                  {node.subtitle}
                </p>

                {/* Descrição (branco a 60%) */}
                <p className="font-body text-xs sm:text-sm text-white/60 font-[300] leading-relaxed max-w-[460px]">
                  {node.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

