import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Save, Upload, Users, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/images")({
  component: AdminImages,
});

type Row = {
  key: string;
  section: string | null;
  type: string | null;
  label: string | null;
  value: string | null;
};

const GROUPS: { id: string; label: string; icon: any; sections: string[] }[] = [
  { id: "team", label: "Equipa", icon: Users, sections: ["team"] },
  { id: "site", label: "Imagens do site", icon: ImageIcon, sections: ["images", "hero"] },
  { id: "brand", label: "Marca / Logo", icon: Sparkles, sections: ["brand"] },
];

async function uploadToBucket(file: File, bucket: string, keyHint: string): Promise<string | null> {
  const ext = file.name.split(".").pop() || "png";
  const safe = keyHint.replace(/[^a-z0-9._-]/gi, "_");
  const path = `${safe}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) {
    toast.error(`Upload falhou: ${error.message}`);
    return null;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

function AdminImages() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState<string>("team");

  async function fetchAll() {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("type", "image")
      .order("key");
    if (error) toast.error(error.message);
    else setRows((data as any) || []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  const group = GROUPS.find((g) => g.id === active)!;
  const activeRows = useMemo(
    () => rows.filter((r) => group.sections.includes(r.section || "")),
    [rows, group]
  );

  const dirtyCount = Object.keys(draft).length;

  function setVal(k: string, v: string) {
    setDraft((d) => ({ ...d, [k]: v }));
  }

  async function handleFile(row: Row, file: File) {
    if (file.size > 4 * 1024 * 1024) { toast.error("Imagem grande demais (máx 4MB)"); return; }
    const bucket = row.section === "team" ? "team-photos" : "site-images";
    const url = await uploadToBucket(file, bucket, row.key);
    if (url) setVal(row.key, url);
  }

  async function saveAll() {
    if (dirtyCount === 0) return;
    setSaving(true);
    const updates = Object.entries(draft).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_content").upsert(updates, { onConflict: "key" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`${dirtyCount} imagem${dirtyCount === 1 ? "" : "s"} atualizada${dirtyCount === 1 ? "" : "s"}`);
    setDraft({});
    qc.invalidateQueries({ queryKey: ["site_content_all"] });
    fetchAll();
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">Imagens do site</h1>
          <p className="font-urbanist text-white/30 uppercase tracking-widest text-[11px]">
            Envie ou cole URLs. As alterações refletem no site após salvar.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving || dirtyCount === 0}
          className={cn(
            "flex items-center gap-2 px-8 py-3 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold transition-colors",
            dirtyCount === 0 ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-gold text-black hover:bg-gold-xl"
          )}
        >
          <Save size={14} /> {saving ? "Salvando…" : dirtyCount === 0 ? "Tudo salvo" : `Salvar ${dirtyCount}`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-2">
          {GROUPS.map((g) => {
            const Icon = g.icon;
            const count = rows.filter((r) => g.sections.includes(r.section || "")).length;
            return (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded transition-all",
                  active === g.id ? "bg-gold text-black font-bold" : "bg-black-2 border border-border text-white/50 hover:text-gold"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span className="font-urbanist text-[11px] uppercase tracking-widest">{g.label}</span>
                </div>
                <span className="text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-3 bg-black-2 border border-border rounded-lg p-8">
          {loading ? (
            <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">A carregar…</div>
          ) : activeRows.length === 0 ? (
            <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">
              Nenhuma imagem nesta categoria. Adicione campos type=image na aba CMS.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRows.map((row) => {
                const val = draft[row.key] !== undefined ? draft[row.key] : (row.value || "");
                const isDirty = draft[row.key] !== undefined;
                return (
                  <div key={row.key} className="border border-border bg-black rounded p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-urbanist text-[10px] uppercase tracking-[0.22em] text-gold font-bold flex items-center gap-2">
                        {row.label || row.key}
                        {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                      </label>
                      <span className="text-[9px] text-white/20">{row.key}</span>
                    </div>
                    <div className="aspect-video bg-black-2 border border-border flex items-center justify-center overflow-hidden">
                      {val ? (
                        <img src={val} alt="" className="max-h-full max-w-full object-contain"
                             onError={(e) => (e.currentTarget.style.opacity = "0.15")} />
                      ) : (
                        <span className="text-white/20 text-[10px] uppercase tracking-widest">Sem imagem</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setVal(row.key, e.target.value)}
                      placeholder="URL ou caminho /images/…"
                      className="w-full bg-black-2 border border-border p-3 text-xs text-white/80 outline-none focus:border-gold font-urbanist"
                    />
                    <label className="inline-flex w-full items-center justify-center gap-2 cursor-pointer bg-white/5 border border-border text-white/70 px-4 py-2 hover:border-gold hover:text-gold font-urbanist text-[10px] uppercase tracking-[0.2em]">
                      <Upload size={12} /> Enviar imagem
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(row, f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
