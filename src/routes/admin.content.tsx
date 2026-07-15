import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Save, Layout, Type, Image as ImageIcon, Menu, ChevronRight, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

type Row = { key: string; section: string | null; type: string | null; label: string | null; value: string | null };

const SECTION_META: Record<string, { label: string; icon: any }> = {
  brand: { label: "Identidade da marca", icon: ImageIcon },
  nav: { label: "Menu / Navegação", icon: Menu },
  hero: { label: "Homepage · Hero", icon: Layout },
  footer: { label: "Rodapé / Contacto", icon: Type },
};

function AdminContent() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [newKey, setNewKey] = useState("");
  const [newType, setNewType] = useState<"text" | "richtext" | "image">("text");

  async function fetchAll() {
    setLoading(true);
    const { data, error } = await supabase.from("site_content").select("*").order("section").order("key");
    if (error) toast.error("Erro ao carregar conteúdo");
    else setRows((data as any) || []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  const sections = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.section && set.add(r.section));
    return Array.from(set);
  }, [rows]);

  const activeRows = rows.filter((r) => (r.section || "outros") === active);

  function setValue(key: string, v: string) {
    setDraft((d) => ({ ...d, [key]: v }));
  }

  const dirtyCount = Object.keys(draft).length;

  async function saveAll() {
    if (dirtyCount === 0) { toast("Nada para salvar"); return; }
    setSaving(true);
    const updates = Object.entries(draft).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_content").upsert(updates, { onConflict: "key" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`${dirtyCount} campo${dirtyCount === 1 ? "" : "s"} atualizado${dirtyCount === 1 ? "" : "s"}`);
    setDraft({});
    qc.invalidateQueries({ queryKey: ["site_content_all"] });
    fetchAll();
  }

  async function addField() {
    const key = newKey.trim();
    if (!key) return;
    const { error } = await supabase.from("site_content").insert({
      key, section: active, type: newType, label: key, value: "",
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Campo criado");
    setNewKey("");
    fetchAll();
  }

  async function removeField(key: string) {
    if (!confirm(`Remover campo "${key}"?`)) return;
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) { toast.error(error.message); return; }
    toast.success("Campo removido");
    fetchAll();
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">CMS · Gestão de Conteúdo</h1>
          <p className="font-urbanist text-white/30 uppercase tracking-widest text-[11px]">
            Edite textos, menus e imagens. As mudanças aparecem no site imediatamente após salvar.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving || dirtyCount === 0}
          className={cn(
            "flex items-center gap-2 px-8 py-3 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold transition-colors",
            dirtyCount === 0 ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-gold text-black hover:bg-gold-xl",
          )}
        >
          <Save size={14} /> {saving ? "Salvando…" : dirtyCount === 0 ? "Tudo salvo" : `Salvar ${dirtyCount} alteração${dirtyCount === 1 ? "" : "ões"}`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-2">
          {sections.map((id) => {
            const meta = SECTION_META[id] || { label: id, icon: Type };
            const Icon = meta.icon;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded transition-all",
                  active === id ? "bg-gold text-black font-bold" : "bg-black-2 border border-border text-white/50 hover:text-gold",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span className="font-urbanist text-[11px] uppercase tracking-widest">{meta.label}</span>
                </div>
                <ChevronRight size={14} className={cn("transition-transform", active === id ? "rotate-90" : "")} />
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-3 bg-black-2 border border-border rounded-lg p-8 space-y-8">
          {loading ? (
            <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">A carregar…</div>
          ) : activeRows.length === 0 ? (
            <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">Nenhum campo nesta seção.</div>
          ) : (
            activeRows.map((row) => {
              const value = draft[row.key] !== undefined ? draft[row.key] : (row.value || "");
              const isDirty = draft[row.key] !== undefined;
              return (
                <div key={row.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-urbanist text-[10px] uppercase tracking-[0.22em] text-gold font-bold flex items-center gap-2">
                      {row.label || row.key}
                      {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] text-white/20 uppercase">{row.type} · {row.key}</span>
                      <button onClick={() => removeField(row.key)} className="p-1 text-white/20 hover:text-red-400 transition-colors">
                        <X size={12} />
                      </button>
                    </div>
                  </div>

                  {row.type === "richtext" ? (
                    <textarea
                      value={value}
                      onChange={(e) => setValue(row.key, e.target.value)}
                      className="w-full h-32 bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors resize-none font-urbanist"
                    />
                  ) : row.type === "image" ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(row.key, e.target.value)}
                        placeholder="/caminho/imagem.png ou https://…"
                        className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors font-urbanist"
                      />
                      <label className="inline-flex items-center gap-2 cursor-pointer bg-white/5 border border-border text-white/70 px-4 py-2 hover:border-gold hover:text-gold font-urbanist text-[10px] uppercase tracking-[0.2em]">
                        <Plus size={12} /> Enviar arquivo
                        <input
                          type="file"
                          accept="image/*,.ico,.svg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 512 * 1024) {
                              toast.error("Imagem muito grande (máx 512KB)");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => setValue(row.key, String(reader.result));
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      {value && (
                        <div className="border border-border bg-black p-4 flex items-center justify-center">
                          <img src={value} alt={row.label || row.key} className="max-h-32 object-contain" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setValue(row.key, e.target.value)}
                      className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors font-urbanist"
                    />
                  )}
                </div>
              );
            })
          )}

          <div className="pt-6 border-t border-border">
            <p className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Adicionar campo a esta seção</p>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="ex: hero.subtitle"
                className="flex-1 bg-black border border-border px-4 py-3 text-sm text-white outline-none focus:border-gold font-urbanist"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="bg-black border border-border px-4 py-3 text-sm text-white outline-none focus:border-gold font-urbanist"
              >
                <option value="text">Texto curto</option>
                <option value="richtext">Texto longo</option>
                <option value="image">Imagem (URL)</option>
              </select>
              <button onClick={addField} className="flex items-center gap-2 bg-white/5 border border-border text-white px-6 py-3 hover:border-gold hover:text-gold font-urbanist text-[11px] uppercase tracking-[0.2em]">
                <Plus size={14} /> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
