import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Code, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings/scripts")({
  component: ScriptsPage,
});

type Script = {
  id: string;
  name: string;
  code: string | null;
  placement: string | null;
  environment: string | null;
  active: boolean | null;
};

function ScriptsPage() {
  const [items, setItems] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", code: "", placement: "head", environment: "production", active: true });

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("script_injections").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Script[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim()) return toast.error("Nome e código obrigatórios");
    const { error } = await supabase.from("script_injections").insert(form);
    if (error) return toast.error(error.message);
    toast.success("Script criado");
    setForm({ name: "", code: "", placement: "head", environment: "production", active: true });
    load();
  }

  async function toggle(s: Script) {
    const { error } = await supabase.from("script_injections").update({ active: !s.active }).eq("id", s.id);
    if (error) return toast.error(error.message);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Remover script?")) return;
    const { error } = await supabase.from("script_injections").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removido");
    load();
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <Link to="/admin/settings" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-[11px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Voltar
      </Link>
      <div className="flex items-center gap-3">
        <Code className="text-gold" />
        <h1 className="font-amotha text-4xl text-white">Scripts Dinâmicos</h1>
      </div>

      <form onSubmit={add} className="bg-black-2 border border-border rounded-lg p-8 space-y-4">
        <h3 className="font-amotha text-lg text-white flex items-center gap-2"><Plus size={16} className="text-gold" /> Novo Script</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input required placeholder="Nome (ex: GA4)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold" />
          <select value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold">
            <option value="head">head</option>
            <option value="body_start">body (início)</option>
            <option value="body_end">body (fim)</option>
          </select>
          <select value={form.environment} onChange={(e) => setForm({ ...form, environment: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold">
            <option value="production">Produção</option>
            <option value="preview">Preview</option>
            <option value="all">Todos</option>
          </select>
        </div>
        <textarea required placeholder="<script>...</script>" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
          rows={5} className="w-full bg-black border border-border p-3 text-xs text-white font-mono outline-none focus:border-gold" />
        <label className="flex items-center gap-2 text-xs text-white/60">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Ativo
        </label>
        <button className="px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold">Criar</button>
      </form>

      <div className="space-y-3">
        {loading && <p className="text-white/40 text-sm">Carregando…</p>}
        {!loading && items.length === 0 && <p className="text-white/40 text-sm">Nenhum script.</p>}
        {items.map((s) => (
          <div key={s.id} className="bg-black-2 border border-border rounded-lg p-6 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-amotha text-white">{s.name}</h4>
                <span className="text-[9px] uppercase tracking-widest text-gold border border-gold/40 px-2 py-0.5 rounded">{s.placement}</span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">{s.environment}</span>
              </div>
              <pre className="text-[10px] text-white/40 font-mono overflow-x-auto whitespace-pre-wrap line-clamp-3">{s.code}</pre>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(s)} className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold ${s.active ? "bg-gold text-black" : "bg-white/10 text-white/60"}`}>
                {s.active ? "Ativo" : "Inativo"}
              </button>
              <button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
