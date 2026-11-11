import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MOOVIA_PATHS = [
  "M4047.14,4341.15c3.01,170.54,132.47,297.31,301.95,295.68,162.81-1.56,293.02-136.95,290.55-302.09-2.48-165.9-134.42-294.67-299.73-292.51-167,2.18-295.7,133.58-292.78,298.92Z",
  "M7732.63,2838.75c-36.52-18.06-48.11-38.85-48.03-78.66,1.24-565.92.78-1131.84.74-1697.76q0-63.53-64.04-63.64c-572.5-.17-1145-.71-1717.49.44-36.72.07-54.88-10.32-69.57-44.32-50.4-116.69-113.64-226.75-194.63-324.9C5233.51,137.83,4711.01-74.18,4081.67,23.04c-572.23,88.4-988.46,405.66-1237.97,932.51-16.02,33.83-34.15,44.13-70.29,43.95-287.89-1.46-575.79-.82-863.68-.87-286.25-.06-572.5.87-858.74-1.02-44.37-.29-57.55,10.72-57.41,56.74,1.72,567.56.81,1135.13,2.09,1702.69.09,39.33-9.84,61.86-47.22,79.2-89.58,41.57-173.44,94.14-253.77,151.49C58.21,3442.18-173.23,4266,136.01,4995.41c162.41,383.08,441.08,661.11,809.64,849.91,38.03,19.48,49.93,41.24,49.83,82.95-1.32,567.53-.2,1135.07-1.68,1702.61-.12,45.41,11.75,56.94,57.11,56.81,565.91-1.6,1131.83-.4,1697.75-2.13,44.84-.14,65.62,14.48,84.86,53.76,307.15,627.09,1005.75,1011.85,1696.06,924.32,599.01-75.96,1031.76-398.89,1316.32-925.71,21.73-40.23,43.71-51.75,86.48-51.66,564.27,1.14,1128.55.01,1692.82,1.48,46.98.12,60.36-11.44,60.21-59.62-1.76-567.56-.73-1135.12-1.98-1702.69-.09-41.78,12.25-64.06,51.25-82.25,137.96-64.33,260.9-151.92,374.92-252.72,557.24-492.63,694.91-1211.33,461.73-1842.79-153.44-415.53-443.23-713.36-838.72-908.93ZM7230.83,5494.76c-42.11,9.32-47.01,25.68-46.94,61.37.96,516.51,1.08,1033.01.59,1549.52-.09,96.47,14.49,83.96-82.64,84.03-509.93.35-1019.86.56-1529.78-.93-42.84-.12-61.96,9.57-72.9,54.74-125.73,519.34-580.87,905.85-1114.57,924.64-426.55,15.02-765.51-170.8-1018.52-512.42-92.07-124.31-153.54-264.27-187.51-415.04-8.91-39.54-22.73-52.26-64.16-52.12-518.15,1.69-1036.3,1.28-1554.46,1.42q-63.09.02-63.16-63.67c.11-523.09-.29-1046.18,1.46-1569.26.14-41.43-11.64-54.46-51.86-63.23-550.03-119.92-944.49-585.46-944.72-1147.64-.2-489.96,237.88-846.37,676.42-1066.65,85.57-42.98,176.01-73.96,270.29-89.92,40-6.77,48.71-23.09,48.63-61.15-1.15-523.08.07-1046.17-1.68-1569.25-.16-48.63,13.73-59.42,60.49-59.01,264.81,2.31,529.66,1.12,794.49,1.12,263.19.02,526.39-.85,789.56.93,40.96.28,58.31-8.7,66.7-52.59,95.61-500.18,475.54-864.4,977.45-940.42,488.21-73.94,994.38,203.4,1194.87,654.95,41.45,93.35,77.76,188.84,92.55,290.28,5.92,40.59,23.21,47.94,60.72,47.86,531.31-1.25,1062.62-.19,1593.93-2,48.09-.17,59.46,12.66,59.31,60.03-1.63,521.44-.26,1042.88-1.58,1564.32-.1,42.74,11.57,57.87,54.62,65.78,481.01,88.38,878.48,525.89,936.08,1010.36,67.91,571.27-313.92,1154.55-943.68,1293.97Z",
  "M7177.17,3504.44c.09-39.18-10.59-49.69-49.44-49.37-222.06,1.86-444.14.57-666.21,1.62-28.58.13-49.3-8.05-69.23-28.62-52.63-54.33-107.53-106.44-161.21-159.75-327.96-325.69-655.65-651.66-984.21-976.75-20.63-20.41-28.45-40.93-28.34-69.19.94-220.43-.02-440.86,1.47-661.28.25-36.61-6.82-51.32-48.19-51.22-554.36,1.46-1108.73,1.41-1663.09.24-37.55-.08-46.55,10.92-46.3,47.24,1.51,222.06.27,444.15.87,666.22.07,26.07-4.93,46.84-24.38,66.12-381.9,378.71-763.44,757.77-1144.33,1137.5-21.63,21.56-43.2,29.84-73.52,29.67-220.42-1.23-440.87.53-661.27-1.76-43.2-.45-55.53,10.55-55.21,54.36,1.99,276.35,1.01,552.71,1.01,829.07h-.51c0,278,.66,556.01-.79,834.01-.19,37.29,7.28,50.58,48.11,50.13,215.47-2.36,430.98-.53,646.47-2.22,35.77-.28,61.53,9.62,86.76,35,381.53,383.75,763.71,766.86,1146.43,1149.43,24.03,24.02,33.35,48.86,33.11,82.63-1.5,208.91-.35,417.83-1.94,626.74-.27,36.02,5.77,51.37,47.48,51.25,554.36-1.52,1108.73-1.6,1663.09-.21,43.28.11,50.81-15.06,50.5-53.88-1.67-208.9.12-417.83-1.48-626.73-.29-37.32,9.84-64.36,36.41-90.91,380.48-380.18,760.21-761.11,1139.35-1142.63,23.1-23.24,47.05-30.51,78.63-30.34,215.49,1.19,431-.07,646.47,1.79,38.74.33,53.76-6.51,53.63-50.13-1.56-556.01-1.44-1112.02-.15-1668.03ZM7012.61,4370.86c-239.92,236.94-478.96,474.77-717.04,713.55-21.74,21.81-44.5,23.77-71.1,23.76-348.76-.15-697.52-.06-1046.28,0-62.78.01-62.95.1-62.98,64.01-.09,176.02-.03,352.05-.03,528.07h.75c0,179.31-.53,358.63.6,537.94.16,25.31-7.23,43.35-24.77,60.83-240.01,239.18-479.88,478.5-718.72,718.83-24.47,24.62-38.41,23.04-62.23-.88-237.93-238.97-476.83-476.99-716.19-714.53-20.51-20.36-27.61-41.39-27.55-69.72.8-356.98-.31-713.97,1.56-1070.95.23-44.38-12.93-54.79-55.55-54.6-352.04,1.56-704.1.33-1056.14,1.45-37.48.12-63.65-11.28-90.19-38.04-232.75-234.82-466.57-468.59-701.49-701.24-26.48-26.22-25.86-39.64.14-65.5,237.94-236.62,474.78-474.34,710.76-712.91,22.34-22.59,45.54-27.7,74.52-27.67,353.69.37,707.39-.8,1061.07,1.26,46.83.27,56.88-14.25,56.67-58.03-1.72-348.75-.65-697.52-2.07-1046.27-.14-35.74,9.34-61.52,34.77-86.81,236.76-235.47,472.66-471.81,708.01-708.69,21.49-21.63,35.5-25.55,58.85-2.08,241.29,242.55,483.27,484.43,725.89,725.65,20.38,20.26,21.09,42.3,21.08,67.24-.17,350.41.71,700.81-.88,1051.21-.19,43.47,8.44,57.91,55.84,57.6,352.03-2.3,704.09-.75,1056.14-1.83,33.89-.1,58.26,9.39,82.14,33.47,235.06,237.11,470.63,473.71,708.98,28.06,27.86,21.5,41.58-3.11,65.88Z",
  "M2051.04,2574.18c-40.48,42.88-59.2,93.94-56.35,153.08,7.48,94.99,17.39,189.86,48.93,280.6,28.63,82.39,56.98,87.95,113.55,23.7,21.69-24.63,40.97-51.37,61.33-77.17,40.72-51.59,82.16-102.65,121.98-154.93,66.74-87.62,153.49-134.08,264.31-141.83,90.04-6.3,114.46-29.55,119.43-118,6.89-122.57,62.5-214.7,156.55-288.83,70.98-55.94,140.17-114.17,209.56-172.09,18.49-15.42,44.26-30.35,37.61-58.83-6.79-29.11-36.39-36.37-61.13-43.74-79.16-23.6-161.11-30.63-242.91-38.64-82.61-8.09-151.8,18.94-210.47,75.88-42.45,41.19-86.02,81.37-126.39,124.52-24.58,26.27-41.6,30.15-70.93,4.04-82.48-73.39-177.19-124.48-288.79-138.33-83.86-10.41-86.71-6.59-72.61,77.94,18.18,109.02,71.93,200.19,142.39,282.35,20.6,24.02,18.85,39.04-3,60.63-49.06,48.48-95.68,99.45-143.06,149.63Z",
  "M3102.63,6584.4c-87.99-74.21-175.97-148.43-263.43-223.26-63.14-54.03-94.09-124.04-104.01-206-14.54-119.97-29.67-135.82-152.29-152.28-82.18-11.03-148.94-44.98-204.66-106.63-75.14-83.13-143.08-171.84-211.95-259.95-15.85-20.28-28.67-50.84-58.25-47.33-33.97,4.02-42.96,38.39-52.27,65.79-30.35,89.26-44.05,181.87-50.66,275.64-4.27,60.66,13.78,113.46,55.5,157.93,43.87,46.76,85.24,96.29,132.58,139.24,31.38,28.48,33.16,46.78,6.66,80.14-71.46,89.97-121.88,190.44-138.36,306.33-6.22,43.73,4.05,59.2,51.23,53.35,112.83-14.01,213.85-54.91,298.06-130.08,40.11-35.8,63.79-33.47,98.24,5.87,36.61,41.8,82.38,75.42,122.42,114.38,55.65,54.15,120.85,77.56,183.46,68.74,101.71-5.13,188.5-13.01,271.57-42.35,72.59-25.64,75.86-49.19,16.16-99.55Z",
  "M6608.74,6093c43.03-50.52,66.18-105.15,58.26-159.13-3.23-103.61-21.45-191.88-49.5-278.08-8.96-27.55-17.42-61.99-50.65-66.7-29.3-4.15-42.38,27.24-58.53,46.9-70.88,86.32-135.29,177.7-211.11,260.28-58.89,64.14-129.21,99.29-214.74,107.39-17.95,1.7-35.99,4.18-53.52,8.32-39.89,9.43-67.82,33.08-77.95,73.71-6.33,25.4-12.05,51.3-14.34,77.31-7.14,81.22-41.43,147.55-103.55,200.11-89.03,75.32-178.33,150.34-266.35,226.83-51.19,44.48-46.28,69.37,17.08,91.44,98.88,34.44,201.53,45.27,305.68,44.9,49.81-.18,92.41-17.42,130.27-50.03,53.57-46.14,108.78-90.68,155.23-144.11,24.71-28.43,42.26-29.61,71.43-4.33,90.19,78.16,194.19,128.36,314.59,139.4,54.39,4.99,59.1-1.62,50.92-56.99-17.33-117.19-69.5-218.7-142.49-309.67-21.4-26.67-19.67-41.58,3.82-64.41,47.08-45.75,92.72-92.96,135.47-143.15Z",
  "M5626.64,2072.39c52.89,46.75,107.76,91.5,164.01,134.16,117.68,89.27,212.69,189.35,214.09,351.32.56,65,36.7,93.41,107.18,98.35,113.07,7.92,204.79,51.21,273.65,143.84,59.76,80.39,122.34,158.82,186.6,235.67,49.88,59.65,81.66,53.95,106.01-19.26,33.93-101.99,47.55-208.04,49.15-315.32.66-44.28-15.82-83.86-45.52-116.88-46.15-51.32-90.74-104.39-140.57-151.93-29.27-27.93-29.78-45.99-4.54-76.2,75.36-90.17,123.91-192.94,135.34-311.55,3.32-34.5-2.89-49.09-44.79-45.14-125.16,11.82-229.27,66.42-321.65,146.99-25.12,21.91-40.12,21.19-63.46-3.42-46.31-48.84-96.66-93.87-145.62-140.18-48.95-46.3-106.55-70.19-174.89-65.93-93.27,7.01-186.96,13.78-276.36,44.43-59.7,20.47-65.87,49.3-18.63,91.05Z",
  "M3763.89,3915.12c-27.63-34.05-42.79-27.54-64.74,3.49-90.3,127.65-131.63,269.98-131.71,412.24,2.36,175.28,54.91,337.46,134.32,432.21,21.06,25.14,33.85,36.91,61.66,2.55,192.87-238.29,193.43-612.71.47-850.5Z",
  "M4902.78,3937.36c-177.41,242.31-173.83,577.01,8.75,816.42,37.17,48.75,40.32,50.12,75.35.07,86.4-123.42,123.67-262.37,125.48-477.7,1.27-79.32-36.62-213.23-114.45-335.17-43.29-67.82-48.75-66.97-95.14-3.62Z",
  "M4774.81,4916.39c-224.82-191.14-627.42-194.76-856.11-7.04-27.92,22.92-33.55,35.46-1.21,60.73,123.07,96.16,264.21,133.69,430.79,137.6,144.53-2.07,291.08-40.41,419.35-136.73,20.38-15.31,39.54-27.05,7.18-54.56Z",
  "M3915.71,3763c125.17,97.61,268.18,140.89,433.66,143.96,146.87-1.69,287.81-46.07,413.48-139.07,31.14-23.05,36.76-37.56,2.79-64.25-226.65-178.09-627.12-175.18-851.62,6.14-28.31,22.87-23.2,33.8,1.7,53.22Z",
];

interface PrinciplesSymbolProps {
  activePrinciple?: number | null;
  onHoverPrinciple?: (principle: number | null) => void;
}

export function PrinciplesSymbol({
  activePrinciple = null,
  onHoverPrinciple,
}: PrinciplesSymbolProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // Dimensões do Desktop:
  // Círculo com raio R = 66
  // Centróide em (380, 142)
  const R_DESK = 66;
  const R_DASH_DESK = R_DESK * 1.12; // ~73.92

  // 1. Círculo 02 (Top: Inteligência estruturada)
  const cTop = { cx: 380, cy: 96, id: 2 };
  // 2. Círculo 01 (Bottom Left: Compreensão humana)
  const cLeft = { cx: 343.6, cy: 163, id: 1 };
  // 3. Círculo 03 (Bottom Right: Partilha responsável)
  const cRight = { cx: 416.4, cy: 163, id: 3 };

  // Dimensões do Mobile:
  // Centróide em (140, 105), R = 50
  const R_MOB = 50;
  const R_DASH_MOB = R_MOB * 1.12; // 56
  const cTopMob = { cx: 140, cy: 72, id: 2 };
  const cLeftMob = { cx: 112, cy: 121, id: 1 };
  const cRightMob = { cx: 168, cy: 121, id: 3 };

  const p1Name = t("sobre.approach.principles.p1", "Compreensão humana");
  const p2Name = t("sobre.approach.principles.p2", "Inteligência estruturada");
  const p3Name = t(
    "sobre.approach.principles.p3",
    "Partilha responsável de informação"
  );
  const whereMeetText = t(
    "sobre.approach.principles.where_three_meet",
    "Onde os três se encontram"
  );
  const ariaLabel = t(
    "sobre.approach.principles.symbol_aria",
    "Três princípios que se encontram no centro: compreensão humana, inteligência estruturada e partilha responsável de informação"
  );

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="w-full flex flex-col items-center justify-center my-6 md:my-10 select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. VERSÃO DESKTOP (altura ~300px, centrado, com legendas em torno)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full max-w-[760px] h-[300px]">
        <svg
          viewBox="0 0 760 300"
          className="w-full h-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          {/* DEFINIÇÕES / DECORAÇÕES */}
          <defs>
            <radialGradient id="deskCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9B7A50" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#9B7A50" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow suave no centro */}
          <circle cx="380" cy="142" r="60" fill="url(#deskCenterGlow)" />

          {/* ── CÍRCULO 01 (EM BAIXO À ESQUERDA: COMPREENSÃO HUMANA) ── */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => onHoverPrinciple?.(1)}
            onMouseLeave={() => onHoverPrinciple?.(null)}
          >
            {/* Anel secundário tracejado (22% opacidade, 12% maior) */}
            <motion.circle
              cx={cLeft.cx}
              cy={cLeft.cy}
              r={R_DASH_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity={activePrinciple === 1 ? 0.6 : 0.22}
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: activePrinciple === 1 ? 0.6 : 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.15 }
              }
              className="transition-[stroke-opacity] duration-300"
            />
            {/* Círculo principal (traço 1.2px em peru, sem preenchimento) */}
            <motion.circle
              cx={cLeft.cx}
              cy={cLeft.cy}
              r={R_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 1 ? 2.4 : 1.2}
              strokeOpacity={activePrinciple === 1 ? 1 : 0.85}
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.3, ease: "easeOut", delay: 0.1 }
              }
              className="transition-[stroke-width,stroke-opacity] duration-300"
            />

            {/* Ícone de pessoas (Compreensão humana) na zona não sobreposta */}
            <g
              transform="translate(298, 175)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 1 ? 1.6 : 1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
              opacity={activePrinciple === 1 ? 1 : 0.85}
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </g>

            {/* Linha fina de ligação de 1px com ponto final na borda */}
            <line
              x1="240"
              y1="163"
              x2="277.6"
              y2="163"
              stroke="#9B7A50"
              strokeWidth="1"
              strokeOpacity={activePrinciple === 1 ? 0.95 : 0.45}
              className="transition-[stroke-opacity] duration-300"
            />
            <circle
              cx="277.6"
              cy="163"
              r="2.5"
              fill="#9B7A50"
              fillOpacity={activePrinciple === 1 ? 1 : 0.75}
            />

            {/* Legenda 01 */}
            <text
              x="230"
              y="167"
              textAnchor="end"
              className="font-body select-none"
            >
              <tspan
                fill="#9B7A50"
                className="font-mono text-[11px] font-medium"
                fillOpacity={activePrinciple === 1 ? 1 : 0.75}
              >
                01{"  "}
              </tspan>
              <tspan
                fill="#FFFFFF"
                className="font-body text-[13px] uppercase tracking-wider font-light"
                fillOpacity={activePrinciple === 1 ? 1 : 0.78}
              >
                {p1Name}
              </tspan>
            </text>
          </g>

          {/* ── CÍRCULO 02 (EM CIMA: INTELIGÊNCIA ESTRUTURADA) ── */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => onHoverPrinciple?.(2)}
            onMouseLeave={() => onHoverPrinciple?.(null)}
          >
            {/* Anel secundário tracejado */}
            <motion.circle
              cx={cTop.cx}
              cy={cTop.cy}
              r={R_DASH_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity={activePrinciple === 2 ? 0.6 : 0.22}
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: activePrinciple === 2 ? 0.6 : 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.05 }
              }
              className="transition-[stroke-opacity] duration-300"
            />
            {/* Círculo principal */}
            <motion.circle
              cx={cTop.cx}
              cy={cTop.cy}
              r={R_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 2 ? 2.4 : 1.2}
              strokeOpacity={activePrinciple === 2 ? 1 : 0.85}
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.3, ease: "easeOut" }
              }
              className="transition-[stroke-width,stroke-opacity] duration-300"
            />

            {/* Ícone de controlos deslizantes (Inteligência estruturada) */}
            <g
              transform="translate(369, 53)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 2 ? 1.6 : 1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
              opacity={activePrinciple === 2 ? 1 : 0.85}
            >
              <path d="M10 5H3" />
              <path d="M12 19H3" />
              <path d="M14 3v4" />
              <path d="M16 17v4" />
              <path d="M21 12h-9" />
              <path d="M21 19h-5" />
              <path d="M21 5h-7" />
              <path d="M8 10v4" />
              <path d="M8 12H3" />
            </g>

            {/* Linha fina de ligação vertical de 1px com ponto final na borda */}
            <line
              x1="380"
              y1="22"
              x2="380"
              y2="30"
              stroke="#9B7A50"
              strokeWidth="1"
              strokeOpacity={activePrinciple === 2 ? 0.95 : 0.45}
              className="transition-[stroke-opacity] duration-300"
            />
            <circle
              cx="380"
              cy="30"
              r="2.5"
              fill="#9B7A50"
              fillOpacity={activePrinciple === 2 ? 1 : 0.75}
            />

            {/* Legenda 02 */}
            <text
              x="380"
              y="14"
              textAnchor="middle"
              className="font-body select-none"
            >
              <tspan
                fill="#9B7A50"
                className="font-mono text-[11px] font-medium"
                fillOpacity={activePrinciple === 2 ? 1 : 0.75}
              >
                02{"  "}
              </tspan>
              <tspan
                fill="#FFFFFF"
                className="font-body text-[13px] uppercase tracking-wider font-light"
                fillOpacity={activePrinciple === 2 ? 1 : 0.78}
              >
                {p2Name}
              </tspan>
            </text>
          </g>

          {/* ── CÍRCULO 03 (EM BAIXO À DIREITA: PARTILHA RESPONSÁVEL) ── */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => onHoverPrinciple?.(3)}
            onMouseLeave={() => onHoverPrinciple?.(null)}
          >
            {/* Anel secundário tracejado */}
            <motion.circle
              cx={cRight.cx}
              cy={cRight.cy}
              r={R_DASH_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity={activePrinciple === 3 ? 0.6 : 0.22}
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: activePrinciple === 3 ? 0.6 : 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.25 }
              }
              className="transition-[stroke-opacity] duration-300"
            />
            {/* Círculo principal */}
            <motion.circle
              cx={cRight.cx}
              cy={cRight.cy}
              r={R_DESK}
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 3 ? 2.4 : 1.2}
              strokeOpacity={activePrinciple === 3 ? 1 : 0.85}
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.3, ease: "easeOut", delay: 0.2 }
              }
              className="transition-[stroke-width,stroke-opacity] duration-300"
            />

            {/* Ícone de escudo com visto (Partilha responsável) */}
            <g
              transform="translate(442, 175)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth={activePrinciple === 3 ? 1.6 : 1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
              opacity={activePrinciple === 3 ? 1 : 0.85}
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </g>

            {/* Linha fina de ligação de 1px com ponto final na borda */}
            <line
              x1="482.4"
              y1="163"
              x2="520"
              y2="163"
              stroke="#9B7A50"
              strokeWidth="1"
              strokeOpacity={activePrinciple === 3 ? 0.95 : 0.45}
              className="transition-[stroke-opacity] duration-300"
            />
            <circle
              cx="482.4"
              cy="163"
              r="2.5"
              fill="#9B7A50"
              fillOpacity={activePrinciple === 3 ? 1 : 0.75}
            />

            {/* Legenda 03 */}
            <text
              x="530"
              y="167"
              textAnchor="start"
              className="font-body select-none"
            >
              <tspan
                fill="#9B7A50"
                className="font-mono text-[11px] font-medium"
                fillOpacity={activePrinciple === 3 ? 1 : 0.75}
              >
                03{"  "}
              </tspan>
              <tspan
                fill="#FFFFFF"
                className="font-body text-[13px] uppercase tracking-wider font-light"
                fillOpacity={activePrinciple === 3 ? 1 : 0.78}
              >
                {p3Name}
              </tspan>
            </text>
          </g>

          {/* ── CENTRO: SÍMBOLO DA MOOVIA EM PERU (TAMANHO PEQUENO, PULSAÇÃO LENTA) ── */}
          <g transform="translate(380, 141)" className="pointer-events-none">
            <motion.g
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 0.95 }
                  : { scale: [0.92, 1.08, 0.92], opacity: [0.85, 1, 0.85] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <g transform="translate(-13, -13)">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 8679.84 8675.99"
                  fill="#9B7A50"
                >
                  {MOOVIA_PATHS.map((d, idx) => (
                    <path key={idx} d={d} />
                  ))}
                </svg>
              </g>
            </motion.g>
          </g>

          {/* ── LEGENDA SOB O CONJUNTO ("Onde os três se encontram") ── */}
          <g className="pointer-events-none select-none">
            <line
              x1="380"
              y1="234"
              x2="380"
              y2="252"
              stroke="#9B7A50"
              strokeWidth="1"
              strokeDasharray="2 3"
              strokeOpacity="0.4"
            />
            <circle cx="380" cy="234" r="1.5" fill="#9B7A50" fillOpacity="0.6" />
            <text
              x="380"
              y="272"
              textAnchor="middle"
              className="font-body text-[11px] tracking-[0.24em] uppercase font-light"
              fill="#9B7A50"
              fillOpacity="0.85"
            >
              {whereMeetText}
            </text>
          </g>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. VERSÃO MOBILE (símbolo reduzido a ~220px, legendas em 1 coluna por baixo)
          ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col items-center w-full max-w-[340px]">
        {/* Símbolo compacto a cerca de 220px de altura */}
        <div className="w-[240px] h-[220px] flex items-center justify-center">
          <svg
            viewBox="0 0 280 230"
            className="w-full h-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            {/* Top Circle (02) */}
            <motion.circle
              cx={cTopMob.cx}
              cy={cTopMob.cy}
              r={R_DASH_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity="0.22"
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 1 }
              }
            />
            <motion.circle
              cx={cTopMob.cx}
              cy={cTopMob.cy}
              r={R_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.2"
              strokeOpacity="0.85"
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: "easeOut" }
              }
            />
            {/* Top Icon: SlidersHorizontal */}
            <g
              transform="translate(131, 38)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            >
              <path d="M10 5H3" />
              <path d="M12 19H3" />
              <path d="M14 3v4" />
              <path d="M16 17v4" />
              <path d="M21 12h-9" />
              <path d="M21 19h-5" />
              <path d="M21 5h-7" />
              <path d="M8 10v4" />
              <path d="M8 12H3" />
            </g>

            {/* Left Circle (01) */}
            <motion.circle
              cx={cLeftMob.cx}
              cy={cLeftMob.cy}
              r={R_DASH_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity="0.22"
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.1 }
              }
            />
            <motion.circle
              cx={cLeftMob.cx}
              cy={cLeftMob.cy}
              r={R_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.2"
              strokeOpacity="0.85"
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: "easeOut", delay: 0.1 }
              }
            />
            {/* Left Icon: Users */}
            <g
              transform="translate(79, 131)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </g>

            {/* Right Circle (03) */}
            <motion.circle
              cx={cRightMob.cx}
              cy={cRightMob.cy}
              r={R_DASH_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              strokeOpacity="0.22"
              initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
              whileInView={{ opacity: 0.22 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.2 }
              }
            />
            <motion.circle
              cx={cRightMob.cx}
              cy={cRightMob.cy}
              r={R_MOB}
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.2"
              strokeOpacity="0.85"
              initial={
                shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
              }
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: "easeOut", delay: 0.2 }
              }
            />
            {/* Right Icon: ShieldCheck */}
            <g
              transform="translate(187, 131)"
              fill="none"
              stroke="#9B7A50"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </g>

            {/* Rosette central no mobile */}
            <g transform="translate(140, 105)" className="pointer-events-none">
              <motion.g
                animate={
                  shouldReduceMotion
                    ? { scale: 1, opacity: 0.95 }
                    : { scale: [0.92, 1.08, 0.92], opacity: [0.85, 1, 0.85] }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <g transform="translate(-11, -11)">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 8679.84 8675.99"
                    fill="#9B7A50"
                  >
                    {MOOVIA_PATHS.map((d, idx) => (
                      <path key={idx} d={d} />
                    ))}
                  </svg>
                </g>
              </motion.g>
            </g>

            {/* Linha curta apontando para a legenda inferior */}
            <line
              x1="140"
              y1="172"
              x2="140"
              y2="192"
              stroke="#9B7A50"
              strokeWidth="1"
              strokeDasharray="2 3"
              strokeOpacity="0.4"
            />
            <circle cx="140" cy="172" r="1.5" fill="#9B7A50" fillOpacity="0.6" />
            <text
              x="140"
              y="212"
              textAnchor="middle"
              className="font-body text-[10px] tracking-[0.22em] uppercase font-light"
              fill="#9B7A50"
              fillOpacity="0.85"
            >
              {whereMeetText}
            </text>
          </svg>
        </div>

        {/* Três legendas por baixo, dispostas numa coluna */}
        <div className="flex flex-col gap-2.5 mt-5 w-full px-4">
          <div className="flex items-center gap-3 p-2.5 rounded border border-[#9B7A50]/20 bg-black/40">
            <span className="font-mono text-[#9B7A50] text-[12px] font-medium shrink-0">
              01
            </span>
            <span className="font-body text-[13px] text-white/90 uppercase tracking-wider font-light">
              {p1Name}
            </span>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded border border-[#9B7A50]/20 bg-black/40">
            <span className="font-mono text-[#9B7A50] text-[12px] font-medium shrink-0">
              02
            </span>
            <span className="font-body text-[13px] text-white/90 uppercase tracking-wider font-light">
              {p2Name}
            </span>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded border border-[#9B7A50]/20 bg-black/40">
            <span className="font-mono text-[#9B7A50] text-[12px] font-medium shrink-0">
              03
            </span>
            <span className="font-body text-[13px] text-white/90 uppercase tracking-wider font-light">
              {p3Name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
