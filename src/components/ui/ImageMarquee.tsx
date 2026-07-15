import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageMarqueeProps {
  images: string[];
  speed?: number; // px per second
  reverse?: boolean;
  height?: string;
  className?: string;
}

/**
 * Continuous editorial-style horizontal image marquee.
 * Pauses on hover. Doubles content for seamless loop.
 */
export function ImageMarquee({
  images,
  speed = 40,
  reverse = false,
  height = "h-[280px] md:h-[380px]",
  className = "",
}: ImageMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40);

  useEffect(() => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    setDuration(halfWidth / speed);
  }, [images, speed]);

  const loop = [...images, ...images];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <motion.div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className={`relative ${height} aspect-[3/4] flex-shrink-0 overflow-hidden group`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
