import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingLogoProps {
  className?: string;
  size?: string;
  opacity?: number;
  duration?: number;
}

/**
 * Decorative rotating MOOVIA logo used as a section watermark.
 * Renders absolutely positioned by default, wrap parent with relative + overflow-hidden.
 */
export function RotatingLogo({
  className,
  size = "min(120vw,1600px)",
  opacity = 0.04,
  duration = 80,
}: RotatingLogoProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <motion.img
        src="/mooviagold.png"
        alt=""
        style={{ width: size, height: size, opacity }}
        className="object-contain select-none"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
