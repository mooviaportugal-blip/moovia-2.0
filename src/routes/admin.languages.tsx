import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, Copy, Check, Terminal, FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DICT_AUTO } from "@/i18n/dict.auto";

export const Route = createFileRoute("/admin/languages")({
  component: AdminLanguages,
});

const EXTRACT_CMD = "python scripts/extract-i18n.py";
const REGEN_NOTE = "Regenera src/i18n/dict.auto.ts com DeepL + glossário MOOVIA.";

function AdminLanguages() {
  const [copied, setCopied] = useState(false);
  const entryCount = Object.keys(DICT_AUTO).length;

  const copyCmd = async () => {
    try {
      await navigator.clipboard.writeText(EXTRACT_CMD);
      setCopied(true);
      toast.success("Comando copiado");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Falha ao copiar");
    }
  };

  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">Linguagens</h1>
        <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">
          Tradução automática do site (PT → EN via DeepL)
        </p>
      </div>

      <div className="bg-black-2 border border-border p-8 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <Languages size={24} className="text-gold" />
          <div>
            <h4 className="font-amotha text-xl text-white">Dicionário Automático</h4>
            <p className="font-urbanist text-xs text-white/40 uppercase tracking-widest mt-1">
              {entryCount} entradas ativas em EN
            </p>
          </div>
        </div>

        <p className="font-urbanist text-sm text-white/60 leading-relaxed mb-6">
          Sempre que copy nova for adicionada ao site, execute o script abaixo para
          re-extrair as strings PT das páginas públicas e traduzi-las via DeepL com
          o glossário de marca MOOVIA. Isto regenera <code className="text-gold">src/i18n/dict.auto.ts</code>.
        </p>

        <div className="bg-black border border-border p-4 rounded-lg flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <Terminal size={16} className="text-gold shrink-0" />
            <code className="font-mono text-sm text-white/90 truncate">{EXTRACT_CMD}</code>
          </div>
          <button
            onClick={copyCmd}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-xl transition-all shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>

        <p className="font-urbanist text-[11px] text-white/40 uppercase tracking-widest">
          {REGEN_NOTE}
        </p>
      </div>

      <div className="bg-black-2 border border-border p-8 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <RefreshCw size={24} className="text-gold" />
          <h4 className="font-amotha text-xl text-white">Fluxo Recomendado</h4>
        </div>
        <ol className="space-y-4 font-urbanist text-sm text-white/70">
          <li className="flex gap-4">
            <span className="text-gold font-bold">01.</span>
            <span>Adicione ou edite copy em PT nos componentes/rotas.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-gold font-bold">02.</span>
            <span>Rode <code className="text-gold">{EXTRACT_CMD}</code> localmente.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-gold font-bold">03.</span>
            <span>Revise o diff em <code className="text-gold">src/i18n/dict.auto.ts</code>.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-gold font-bold">04.</span>
            <span>Commit + deploy. O <code className="text-gold">I18nProvider</code> aplica em runtime.</span>
          </li>
        </ol>
      </div>

      <div className="bg-black-2 border border-border p-8 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <FileText size={24} className="text-gold" />
          <h4 className="font-amotha text-xl text-white">Glossário de Marca (protegido)</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-urbanist text-sm">
          {[
            "Global Mobility Assurance",
            "Global Mobility Strategy",
            "Global Mobility Success",
            "Global Mobility Risk",
            "Risk Intelligence",
            "MOOVIA",
            "MAIA",
            "Framework Owner",
            "Lead Strategist",
            "Co-Founder & CPTO",
            "Co-Founder & CSO",
            "Trusted Partners",
          ].map((term) => (
            <div key={term} className="flex items-center gap-2 text-white/70">
              <span className="w-1 h-1 rounded-full bg-gold" />
              {term}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
