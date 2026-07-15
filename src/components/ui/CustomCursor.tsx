import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Convert any css color string to rgb via offscreen canvas
function parseColor(color: string): [number, number, number] | null {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = color;
    const m = ctx.fillStyle.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    const rgb = ctx.fillStyle.match(/rgba?\(([^)]+)\)/);
    if (rgb) {
      const parts = rgb[1].split(',').map((s) => parseFloat(s.trim()));
      return [parts[0], parts[1], parts[2]];
    }
  } catch {}
  return null;
}

function luminance(rgb: [number, number, number]) {
  const [r, g, b] = rgb.map((v) => v / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function readBgUnder(el: HTMLElement | null): 'dark' | 'light' {
  let node: HTMLElement | null = el;
  while (node) {
    const bg = window.getComputedStyle(node).backgroundColor;
    const rgb = parseColor(bg);
    if (rgb && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return luminance(rgb) > 0.55 ? 'light' : 'dark';
    }
    node = node.parentElement;
  }
  return 'dark';
}

// Filters to recolor the gold PNG. Source is gold/warm; we overwrite with hue-rotate + saturate.
// Dark bg → original gold (no filter). Light/white/yellow bg → light blue.
const FILTER_DARK_BG = 'none';
const FILTER_LIGHT_BG =
  'brightness(0) saturate(100%) invert(62%) sepia(85%) saturate(450%) hue-rotate(175deg) brightness(100%) contrast(95%)';
const FILTER_HOVER_DARK = 'none';
const FILTER_HOVER_LIGHT = FILTER_LIGHT_BG;

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [bgMode, setBgMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@media (pointer: fine) { html, body, * { cursor: none !important; } }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastTarget: HTMLElement | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      if (target === lastTarget) return;
      lastTarget = target;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const isInteractive =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          window.getComputedStyle(target).cursor === 'pointer';
        setIsHovering(!!isInteractive);
        setBgMode(readBgUnder(target));
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  const filter = isHovering
    ? bgMode === 'light' ? FILTER_HOVER_LIGHT : FILTER_HOVER_DARK
    : bgMode === 'light' ? FILTER_LIGHT_BG : FILTER_DARK_BG;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="hidden md:block"
    >
      <motion.img
        src="/mooviagold.png"
        alt="Cursor"
        className="w-8 h-8 object-contain drop-shadow-2xl"
        style={{ filter }}
        animate={{ rotate: isHovering ? 360 : 0, scale: isHovering ? 1.2 : 1 }}
        transition={{
          rotate: { duration: 1, repeat: isHovering ? Infinity : 0, ease: 'linear' },
          scale: { duration: 0.3 },
        }}
      />
    </motion.div>
  );
}
