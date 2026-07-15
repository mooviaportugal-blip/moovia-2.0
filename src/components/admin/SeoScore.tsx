import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { SeoAnalysis } from "@/lib/seo";

export function SeoScore({ analysis }: { analysis: SeoAnalysis }) {
  const { score, density, wordCount, occurrences, checks } = analysis;
  const color = score >= 80 ? "text-emerald-400" : score >= 50 ? "text-gold" : "text-red-400";
  const ring = score >= 80 ? "stroke-emerald-400" : score >= 50 ? "stroke-gold" : "stroke-red-400";
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="bg-black-3 border border-border rounded-lg p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r={r} className="stroke-white/10" strokeWidth="6" fill="none" />
            <circle cx="40" cy="40" r={r} className={ring} strokeWidth="6" fill="none"
              strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
              style={{ transition: "stroke-dashoffset .4s ease" }} />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center font-sora text-2xl ${color}`}>{score}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-urbanist text-[11px] uppercase tracking-[0.2em] text-gold-l mb-1">Avaliação SEO</h3>
          <p className="font-sora text-xl text-white font-[200]">
            {score >= 80 ? "Excelente" : score >= 50 ? "Pode melhorar" : "Precisa de trabalho"}
          </p>
          <p className="text-[11px] text-white/40 mt-2 font-urbanist uppercase tracking-widest">
            {wordCount} palavras · {occurrences} ocorrências · {density.toFixed(2)}% densidade
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {checks.map((c) => {
          const Icon = c.pass ? CheckCircle2 : c.warn ? AlertCircle : XCircle;
          const color = c.pass ? "text-emerald-400" : c.warn ? "text-gold" : "text-red-400";
          return (
            <li key={c.id} className="flex items-center gap-3 text-sm font-urbanist">
              <Icon size={16} className={`${color} shrink-0`} />
              <span className="text-white/80 flex-1">{c.label}</span>
              {c.detail && <span className="text-white/40 text-xs">{c.detail}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
