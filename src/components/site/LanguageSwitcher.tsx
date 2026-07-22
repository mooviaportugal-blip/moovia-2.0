import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BR from "country-flag-icons/react/3x2/BR";

import ES from "country-flag-icons/react/3x2/ES";
import GB from "country-flag-icons/react/3x2/GB";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Lang } from "@/i18n";
import { cn } from "@/lib/utils";

const LANGS: { code: Lang; native: string; label: string; short: string }[] = [
  { code: "pt-BR", native: "Português · Brasil", label: "Portuguese (Brazil)", short: "BR" },
  { code: "en", native: "English", label: "English", short: "EN" },
];


const FlagFor: Record<Lang, React.ComponentType<{ className?: string; title?: string }>> = {
  "pt-BR": BR,
  "pt-PT": BR,
  en: GB,
  es: ES,
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale } = useI18n();
  const current = (LANGS.find((l) => l.code === locale) ?? LANGS[0]) as { code: Lang; native: string; label: string; short: string };
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const Current = FlagFor[current.code];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 border border-b35 px-3 py-2 text-w35 hover:text-gold hover:border-gold transition-all group",
          compact && "px-2 py-1.5"
        )}
        aria-label="Select language"
      >
        <Current className="w-5 h-3.5 rounded-[1px] shadow-sm" title={current.label} />
        {!compact && (
          <span className="font-body font-[500] text-[11px] tracking-[0.14em] uppercase">
            {current.short}
          </span>
        )}
        <ChevronDown
          size={12}
          className={cn("transition-transform text-gold/60", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 min-w-[220px] bg-[#06091a] border border-b35 shadow-2xl z-[1100] overflow-hidden"
          >
            {LANGS.map((l) => {
              const Flag = FlagFor[l.code];
              const active = l.code === current.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    if (l.code === current.code) {
                      setOpen(false);
                      return;
                    }
                    try {
                      localStorage.setItem("mv_lang", l.code);
                    } catch {}
                    setOpen(false);
                    // Hard refresh guarantees every component (Nav, Hero, MAIA,
                    // DOM walker, CMS overlays) is remounted in the new language.
                    window.location.reload();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors font-body text-[12px] tracking-[0.05em]",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-w35 hover:bg-white/05 hover:text-white"
                  )}
                >
                  <Flag className="w-6 h-4 rounded-[1px] shadow-md flex-shrink-0" title={l.label} />
                  <span className="flex-1">{l.native}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
