import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Upload, Link as LinkIcon, ArrowUp, ArrowDown, Download, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero-lisboa-editorial.jpg";
import problem from "@/assets/problem-lisboa-planning.jpg";
import processImg from "@/assets/process-relocation-documents.jpg";
import fiscal from "@/assets/blog-fiscal-lisboa.jpg";
import habit from "@/assets/blog-habitacao-lisboa.jpg";
import visto from "@/assets/blog-visto-lisboa.jpg";

const DEFAULT_TOP = [hero, problem, processImg, fiscal, habit, visto];
const DEFAULT_BOTTOM = [visto, habit, fiscal, processImg, problem, hero];

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

type Img = {
  id: string;
  gallery: string;
  row_index: number;
  position: number;
  url: string;
  alt: string | null;
};

const ROWS = [0, 1];

type DragState = { row: number; id: string } | null;

function AdminGallery() {
  const [items, setItems] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState<Record<number, string>>({});
  const [uploading, setUploading] = useState<number | null>(null);
  const [drag, setDrag] = useState<DragState>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  async function reorder(row: number, fromId: string, toId: string) {
    if (fromId === toId) return;
    const rowItems = items.filter((i) => i.row_index === row).sort((a, b) => a.position - b.position);
    const fromIdx = rowItems.findIndex((i) => i.id === fromId);
    const toIdx = rowItems.findIndex((i) => i.id === toId);
    if (fromIdx < 0 || toIdx < 0) return;
    const next = [...rowItems];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    // optimistic
    setItems((prev) => [
      ...prev.filter((i) => i.row_index !== row),
      ...next.map((it, idx) => ({ ...it, position: idx })),
    ]);
    await Promise.all(
      next.map((it, idx) => supabase.from("gallery_images").update({ position: idx }).eq("id", it.id)),
    );
    load();
  }

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("gallery", "lisboa")
      .order("row_index")
      .order("position");
    if (error) toast.error(error.message);
    else setItems((data as Img[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addUrl(row: number) {
    const url = (newUrl[row] || "").trim();
    if (!url) return;
    const maxPos = Math.max(-1, ...items.filter((i) => i.row_index === row).map((i) => i.position));
    const { error } = await supabase.from("gallery_images").insert({
      gallery: "lisboa", row_index: row, position: maxPos + 1, url,
    });
    if (error) return toast.error(error.message);
    setNewUrl((s) => ({ ...s, [row]: "" }));
    toast.success("Imagem adicionada");
    load();
  }

  async function uploadFile(row: number, file: File) {
    if (file.size > 8 * 1024 * 1024) return toast.error("Máx 8MB.");
    setUploading(row);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      const maxPos = Math.max(-1, ...items.filter((i) => i.row_index === row).map((i) => i.position));
      const { error } = await supabase.from("gallery_images").insert({
        gallery: "lisboa", row_index: row, position: maxPos + 1, url: dataUrl,
      });
      setUploading(null);
      if (error) return toast.error(error.message);
      toast.success("Imagem enviada");
      load();
    };
    reader.onerror = () => { setUploading(null); toast.error("Falha ao ler arquivo"); };
    reader.readAsDataURL(file);
  }

  async function remove(id: string) {
    if (!confirm("Remover esta imagem?")) return;
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removida");
    load();
  }

  async function updateUrl(id: string, url: string) {
    const { error } = await supabase.from("gallery_images").update({ url }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  async function replaceWithFile(id: string, file: File) {
    if (file.size > 8 * 1024 * 1024) return toast.error("Máx 8MB.");
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      const { error } = await supabase.from("gallery_images").update({ url: dataUrl }).eq("id", id);
      if (error) return toast.error(error.message);
      toast.success("Imagem substituída");
      load();
    };
    reader.onerror = () => toast.error("Falha ao ler arquivo");
    reader.readAsDataURL(file);
  }

  async function swap(row: number, idx: number, dir: -1 | 1) {
    const rowItems = items.filter((i) => i.row_index === row).sort((a, b) => a.position - b.position);
    const j = idx + dir;
    if (j < 0 || j >= rowItems.length) return;
    const a = rowItems[idx], b = rowItems[j];
    await supabase.from("gallery_images").update({ position: b.position }).eq("id", a.id);
    await supabase.from("gallery_images").update({ position: a.position }).eq("id", b.id);
    load();
  }

  async function duplicate(id: string) {
    const src = items.find((i) => i.id === id);
    if (!src) return;
    const rowItems = items.filter((i) => i.row_index === src.row_index).sort((a, b) => a.position - b.position);
    const idx = rowItems.findIndex((i) => i.id === id);
    const after = rowItems.slice(idx + 1);
    // shift positions of items after src by +1
    await Promise.all(
      after.map((it) => supabase.from("gallery_images").update({ position: it.position + 1 }).eq("id", it.id)),
    );
    const { error } = await supabase.from("gallery_images").insert({
      gallery: src.gallery, row_index: src.row_index, position: src.position + 1, url: src.url, alt: src.alt,
    });
    if (error) return toast.error(error.message);
    toast.success("Imagem duplicada");
    load();
  }

  async function importDefaults() {
    if (!confirm("Importar as imagens padrão que estão no ar? Elas serão adicionadas às fileiras.")) return;
    const origin = window.location.origin;
    const abs = (u: string) => (u.startsWith("http") ? u : origin + u);
    const rows = [
      { row: 0, urls: DEFAULT_TOP.map(abs) },
      { row: 1, urls: DEFAULT_BOTTOM.map(abs) },
    ];
    const payload: { gallery: string; row_index: number; position: number; url: string }[] = [];
    for (const { row, urls } of rows) {
      const maxPos = Math.max(-1, ...items.filter((i) => i.row_index === row).map((i) => i.position));
      urls.forEach((url, i) => payload.push({ gallery: "lisboa", row_index: row, position: maxPos + 1 + i, url }));
    }
    const { error } = await supabase.from("gallery_images").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(`${payload.length} imagens importadas`);
    load();
  }

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">Galeria · Uma vida em Portugal</h1>
          <p className="font-urbanist text-white/30 uppercase tracking-widest text-[11px]">
            Duas fileiras (topo e base). Adicione, remova ou reordene as imagens que aparecem no marquee.
          </p>
        </div>
        <button
          onClick={importDefaults}
          className="flex items-center gap-2 bg-white/5 border border-border text-white px-4 py-2 hover:border-gold hover:text-gold font-urbanist text-[11px] uppercase tracking-[0.2em] whitespace-nowrap"
        >
          <Download size={12} /> Importar padrões
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">A carregar…</div>
      ) : (
        ROWS.map((row) => {
          const rowItems = items.filter((i) => i.row_index === row).sort((a, b) => a.position - b.position);
          return (
            <section key={row} className="bg-black-2 border border-border rounded-lg p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-urbanist text-[12px] uppercase tracking-[0.22em] text-gold font-bold">
                  Fileira {row === 0 ? "Superior" : "Inferior"} · {rowItems.length} imagens
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rowItems.map((img, idx) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={(e) => { setDrag({ row, id: img.id }); e.dataTransfer.effectAllowed = "move"; }}
                    onDragEnd={() => { setDrag(null); setDragOverId(null); }}
                    onDragOver={(e) => { if (drag?.row === row) { e.preventDefault(); setDragOverId(img.id); } }}
                    onDragLeave={() => { if (dragOverId === img.id) setDragOverId(null); }}
                    onDrop={(e) => { e.preventDefault(); if (drag?.row === row) reorder(row, drag.id, img.id); setDrag(null); setDragOverId(null); }}
                    className={cn(
                      "border bg-black p-3 space-y-2 cursor-move transition-all",
                      dragOverId === img.id && drag?.row === row ? "border-gold ring-2 ring-gold/40" : "border-border",
                      drag?.id === img.id && "opacity-40",
                    )}
                  >
                    <div className="aspect-video bg-black overflow-hidden pointer-events-none">
                      {img.url ? (
                        <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <input
                      defaultValue={img.url.startsWith("data:") ? "" : img.url}
                      placeholder={img.url.startsWith("data:") ? "(upload)" : "URL"}
                      onBlur={(e) => { if (e.target.value && e.target.value !== img.url) updateUrl(img.id, e.target.value); }}
                      className="w-full bg-black border border-border px-2 py-1.5 text-[11px] text-white/70 outline-none focus:border-gold font-urbanist truncate"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <button onClick={() => swap(row, idx, -1)} disabled={idx === 0} className="p-1.5 text-white/40 hover:text-gold disabled:opacity-20"><ArrowUp size={12} /></button>
                        <button onClick={() => swap(row, idx, 1)} disabled={idx === rowItems.length - 1} className="p-1.5 text-white/40 hover:text-gold disabled:opacity-20"><ArrowDown size={12} /></button>
                      </div>
                      <div className="flex gap-1">
                        <label className="p-1.5 text-white/40 hover:text-gold cursor-pointer" title="Substituir por upload">
                          <Upload size={12} />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) replaceWithFile(img.id, f); e.target.value = ""; }}
                          />
                        </label>
                        <button onClick={() => duplicate(img.id)} className="p-1.5 text-white/40 hover:text-gold" title="Duplicar"><Copy size={12} /></button>
                        <button onClick={() => remove(img.id)} className="p-1.5 text-white/40 hover:text-red-400"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex gap-2">
                  <LinkIcon size={14} className="text-gold self-center" />
                  <input
                    value={newUrl[row] || ""}
                    onChange={(e) => setNewUrl((s) => ({ ...s, [row]: e.target.value }))}
                    placeholder="https://… (URL da imagem)"
                    className="flex-1 bg-black border border-border px-3 py-2 text-sm text-white outline-none focus:border-gold font-urbanist"
                  />
                  <button onClick={() => addUrl(row)} className="flex items-center gap-2 bg-white/5 border border-border text-white px-4 py-2 hover:border-gold hover:text-gold font-urbanist text-[11px] uppercase tracking-[0.2em]">
                    <Plus size={12} /> URL
                  </button>
                </div>
                <label className={cn(
                  "flex items-center gap-2 cursor-pointer bg-gold text-black px-4 py-2 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-xl",
                  uploading === row && "opacity-50 cursor-wait",
                )}>
                  <Upload size={12} /> {uploading === row ? "Enviando…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading === row}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(row, f); e.target.value = ""; }}
                  />
                </label>
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
