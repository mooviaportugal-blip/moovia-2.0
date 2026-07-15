import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive Moovia logo:
 *  IDLE   -> dashed/outlined logo
 *  SCROLL -> auto-triggers spin + sparks when scrolled into view
 *  CLICK  -> manual re-trigger
 */
interface ConstellationLogoProps {
  className?: string;
  size?: number; // px
  outlineSrc?: string;
  filledSrc?: string;
}

const SPARK_COUNT_DESKTOP = 36;
const SPARK_COUNT_MOBILE = 12;
const GOLD = "#ad8957";
const SPIN_MS = 6000;

export function ConstellationLogo({
  className,
  size = 760,
  outlineSrc = "/moovia-logotype.png",
  filledSrc = "/mooviagold.png",
}: ConstellationLogoProps) {
  const [phase, setPhase] = useState<"idle" | "spinning" | "complete">("idle");
  const animating = useRef(false);
  const [sparkKey, setSparkKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  const handleClick = () => {
    if (animating.current) return;
    animating.current = true;

    if (phase === "complete") {
      setPhase("idle");
      hasTriggered.current = false;
      window.setTimeout(() => {
        animating.current = false;
      }, 500);
      return;
    }

    setSparkKey((k) => k + 1);
    setPhase("spinning");
    window.setTimeout(() => {
      setPhase("complete");
      animating.current = false;
    }, SPIN_MS);
  };

  // Auto-trigger on scroll into view (once). Respect prefers-reduced-motion.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("complete");
      hasTriggered.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !hasTriggered.current && !animating.current && phase === "idle") {
            hasTriggered.current = true;
            handleClick();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSpinning = phase === "spinning";
  const isComplete = phase === "complete";
  const filledOpacity = isComplete ? 1 : isSpinning ? 1 : 0;

  // Pre-compute spark trajectories around a circle, staggered through the spin.
  // NOTE: translate() % refers to the element's own box, so we must use px based on `size`.
  const radius = size / 2;
  const sparkCount = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    ? SPARK_COUNT_MOBILE
    : SPARK_COUNT_DESKTOP;
  const sparks = Array.from({ length: sparkCount }, (_, i) => {
    const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.4;
    const dist = radius * (0.55 + Math.random() * 0.55); // px from center
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      delay: Math.random() * (SPIN_MS / 1000 - 1.6),
    };
  });

  return (
    <>
      <style>{`
        @keyframes mlogo-spin {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(1440deg); }
        }
        @keyframes mlogo-fill-reveal {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes mlogo-spark {
          0%   { transform: translate(-50%, -50%) translate(0,0) scale(0.6); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.1); opacity: 0; }
        }
        .mlogo-wrap.spinning {
          animation: mlogo-spin ${SPIN_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .mlogo-filled.spinning {
          animation: mlogo-fill-reveal ${SPIN_MS}ms ease-out forwards;
        }
        .mlogo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }
        .mlogo-spark {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: ${GOLD};
          box-shadow: 0 0 6px ${GOLD}, 0 0 12px ${GOLD};
          pointer-events: none;
          opacity: 0;
          animation: mlogo-spark 1.6s ease-out forwards;
        }
      `}</style>

      <div
        ref={containerRef}
        onClick={handleClick}
        className={cn(
          "relative cursor-pointer select-none",
          className
        )}
        style={{ width: size, height: size }}
        role="button"
        aria-label="Logo Moovia interativa"
      >
        <div
          className={cn(
            "mlogo-wrap relative w-full h-full",
            isSpinning && "spinning"
          )}
          style={{
            transformOrigin: "center",
            transform: isComplete ? "rotate(360deg)" : undefined,
          }}
        >
          {/* Outline (dashed), visible when not complete */}
          <img
            src={outlineSrc}
            alt=""
            draggable={false}
            className="mlogo-img transition-opacity duration-500"
            style={{ opacity: isComplete ? 0 : 1 }}
          />

          {/* Filled, reveals bottom-up during spin, fully visible after */}
          <img
            key={`filled-${sparkKey}`}
            src={filledSrc}
            alt=""
            draggable={false}
            className={cn("mlogo-img mlogo-filled", isSpinning && "spinning")}
            style={{
              opacity: filledOpacity,
              clipPath: isComplete ? "inset(0 0 0 0)" : undefined,
            }}
          />

        </div>

        {/* Spark burst overlay */}
        {isSpinning && (
          <div
            key={`sparks-${sparkKey}`}
            className="absolute inset-0 pointer-events-none"
          >
            {sparks.map((s, i) => (
              <span
                key={i}
                className="mlogo-spark"
                style={
                  {
                    "--dx": `${s.dx}px`,
                    "--dy": `${s.dy}px`,
                    animationDelay: `${s.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
