import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Music, Pause, Pencil, Play, Plus, Trash2, Upload, Video, Volume2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sound")({
  component: AdminSound,
});

interface SoundTrack {
  id: string;
  title: string;
  cover_url: string | null;
  source_type: "mp3" | "youtube";
  source_url: string;
  is_enabled: boolean;
  position: number | null;
}

function AdminSound() {
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [tracks, setTracks] = useState<SoundTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const MAX_MP3_BYTES = 10 * 1024 * 1024;

  const ytId = (url: string) => {
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m?.[1] ?? null;
  };

  const togglePreview = (t: SoundTrack) => {
    if (t.source_type === "youtube") {
      setPlayingId(playingId === t.id ? null : t.id);
      return;
    }
    if (playingId === t.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const audio = new Audio(t.source_url);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => { toast.error("Não foi possível reproduzir"); setPlayingId(null); };
    audio.play().catch(() => { toast.error("Falha ao reproduzir"); setPlayingId(null); });
    audioRef.current = audio;
    setPlayingId(t.id);
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const [form, setForm] = useState({
    title: "",
    cover_url: "",
    source_type: "mp3" as "mp3" | "youtube",
    source_url: "",
    coverFile: null as File | null,
    mp3File: null as File | null,
  });

  const load = async () => {
    setLoading(true);
    const [{ data: t }, { data: s }] = await Promise.all([
      supabase.from("sound_tracks").select("*").order("position", { ascending: true }),
      supabase.from("site_settings").select("value").eq("key", "sound_button_enabled").maybeSingle(),
    ]);
    setTracks((t as any) || []);
    setButtonEnabled(s?.value !== "false");
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleButton = async () => {
    const next = !buttonEnabled;
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "sound_button_enabled", value: String(next), type: "boolean" }, { onConflict: "key" });
    if (error) return toast.error("Erro ao salvar");
    setButtonEnabled(next);
    toast.success(next ? "Botão flutuante habilitado" : "Botão flutuante desabilitado");
  };

  const toggleTrack = async (t: SoundTrack) => {
    const nextEnabled = !t.is_enabled;
    let nextPosition: number | null = t.position;
    if (!nextEnabled) {
      nextPosition = null;
    } else {
      const used = new Set(
        tracks.filter((x) => x.id !== t.id && x.position != null).map((x) => x.position as number),
      );
      let p = 1;
      while (used.has(p)) p++;
      nextPosition = p;
    }
    const { error } = await supabase
      .from("sound_tracks")
      .update({ is_enabled: nextEnabled, position: nextPosition })
      .eq("id", t.id);
    if (error) return toast.error("Erro ao atualizar");
    setTracks((prev) => prev.map((x) => (x.id === t.id ? { ...x, is_enabled: nextEnabled, position: nextPosition } : x)));
  };

  const removeTrack = async (t: SoundTrack) => {
    if (!confirm(`Remover "${t.title}"?`)) return;
    const { error } = await supabase.from("sound_tracks").delete().eq("id", t.id);
    if (error) return toast.error("Erro ao remover");
    setTracks((prev) => prev.filter((x) => x.id !== t.id));
    toast.success("Removido");
  };

  const updatePosition = async (t: SoundTrack, next: number) => {
    if (!t.is_enabled) return toast.error("Ative a música para definir a ordem");
    if (!Number.isFinite(next) || next < 1) return toast.error("Ordem inválida");
    if (next === t.position) return;
    if (tracks.some((x) => x.id !== t.id && x.position === next)) {
      return toast.error(`Ordem ${next} já está em uso por outra música`);
    }
    const prev = tracks;
    setTracks((cur) => cur.map((x) => (x.id === t.id ? { ...x, position: next } : x)).sort((a, b) => (a.position ?? 9999) - (b.position ?? 9999)));
    const { error } = await supabase.from("sound_tracks").update({ position: next }).eq("id", t.id);
    if (error) { setTracks(prev); toast.error("Erro ao salvar ordem"); }
  };

  const uploadFile = async (file: File, prefix: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("sound-assets").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) { toast.error(`Upload falhou: ${error.message}`); return null; }
    const { data } = supabase.storage.from("sound-assets").getPublicUrl(path);
    return data.publicUrl;
  };

  const resetForm = () => {
    setForm({ title: "", cover_url: "", source_type: "mp3", source_url: "", coverFile: null, mp3File: null });
    setEditingId(null);
  };

  const startEdit = (t: SoundTrack) => {
    setEditingId(t.id);
    setForm({
      title: t.title,
      cover_url: t.cover_url || "",
      source_type: t.source_type,
      source_url: t.source_url,
      coverFile: null,
      mp3File: null,
    });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.title.trim()) return toast.error("Título obrigatório");
    setSaving(true);
    try {
      let cover_url: string | null = form.cover_url.trim() || null;
      let source_url = form.source_url.trim();

      if (form.coverFile) {
        const url = await uploadFile(form.coverFile, "covers");
        if (url) cover_url = url;
      }

      if (form.source_type === "mp3" && form.mp3File) {
        if (form.mp3File.size > MAX_MP3_BYTES) {
          setSaving(false);
          return toast.error("MP3 excede 10MB");
        }
        const url = await uploadFile(form.mp3File, "mp3");
        if (url) source_url = url;
      }

      if (!source_url) return toast.error(form.source_type === "mp3" ? "Envie um MP3 ou informe URL" : "Informe o link do YouTube");

      if (editingId) {
        const { error } = await supabase.from("sound_tracks").update({
          title: form.title.trim(),
          cover_url,
          source_type: form.source_type,
          source_url,
        }).eq("id", editingId);
        if (error) throw error;
        toast.success("Música atualizada");
      } else {
        const nextPos = tracks.length ? Math.max(...tracks.map((t) => t.position ?? 0)) + 1 : 1;
        const { error } = await supabase.from("sound_tracks").insert({
          title: form.title.trim(),
          cover_url,
          source_type: form.source_type,
          source_url,
          position: nextPos,
          is_enabled: true,
        });
        if (error) throw error;
        toast.success("Música adicionada");
      }

      setShowForm(false);
      resetForm();
      await load();
    } catch (e: any) {
      toast.error(e.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">Sound</h1>
        <p className="font-urbanist text-white/40 uppercase tracking-widest text-[11px]">
          Botão flutuante & biblioteca de músicas
        </p>
      </div>

      {/* Toggle do botão flutuante */}
      <div className="bg-black-2 border border-border p-8 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Volume2 size={24} className="text-gold" />
          <div>
            <h4 className="font-amotha text-xl text-white">Botão Flutuante de Som</h4>
            <p className="font-urbanist text-xs text-white/40 uppercase tracking-widest mt-1">
              {buttonEnabled ? "Visível no site" : "Oculto do site"}
            </p>
          </div>
        </div>
        <button
          onClick={toggleButton}
          className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-bold transition-all ${
            buttonEnabled ? "bg-gold text-black" : "bg-white/10 text-white/60"
          }`}
        >
          {buttonEnabled ? "Habilitado" : "Desabilitado"}
        </button>
      </div>

      {/* Lista de músicas */}
      <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <Music size={20} className="text-gold" />
            <h3 className="font-amotha text-xl text-white">Biblioteca de Músicas</h3>
            <span className="text-xs text-white/40">({tracks.length})</span>
          </div>
          <button
            onClick={() => { if (showForm) { setShowForm(false); resetForm(); } else { resetForm(); setShowForm(true); } }}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-l transition-all"
          >
            {showForm ? <><X size={14} /> Fechar</> : <><Plus size={14} /> Adicionar</>}
          </button>
        </div>

        {showForm && (
          <div className="p-6 border-b border-border bg-black/40 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold block mb-2">Título</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Chegando em Casa"
                  className="w-full bg-black border border-border p-3 text-sm text-white/80 outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold block mb-2">Fonte</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setForm({ ...form, source_type: "mp3" })}
                    className={`flex-1 py-3 text-[11px] uppercase tracking-widest ${form.source_type === "mp3" ? "bg-gold text-black" : "bg-white/5 text-white/60"}`}
                  >
                    MP3
                  </button>
                  <button
                    onClick={() => setForm({ ...form, source_type: "youtube" })}
                    className={`flex-1 py-3 text-[11px] uppercase tracking-widest ${form.source_type === "youtube" ? "bg-gold text-black" : "bg-white/5 text-white/60"}`}
                  >
                    YouTube
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold block mb-2">
                  Capa (upload ou URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, coverFile: e.target.files?.[0] || null })}
                  className="w-full text-xs text-white/70 mb-2"
                />
                <input
                  type="text"
                  value={form.cover_url}
                  onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                  placeholder="Ou cole a URL da imagem"
                  className="w-full bg-black border border-border p-3 text-sm text-white/80 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold block mb-2">
                  {form.source_type === "mp3" ? "Arquivo MP3 (upload ou URL)" : "Link do YouTube"}
                </label>
                {form.source_type === "mp3" && (
                  <>
                    <input
                      type="file"
                      accept="audio/mpeg,audio/mp3,.mp3"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        if (f && f.size > MAX_MP3_BYTES) {
                          toast.error(`Arquivo maior que 10MB (${(f.size / 1024 / 1024).toFixed(1)}MB)`);
                          e.target.value = "";
                          return;
                        }
                        setForm({ ...form, mp3File: f });
                      }}
                      className="w-full text-xs text-white/70 mb-1"
                    />
                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Máx. 10MB</p>
                  </>
                )}
                <input
                  type="text"
                  value={form.source_url}
                  onChange={(e) => setForm({ ...form, source_url: e.target.value })}
                  placeholder={form.source_type === "mp3" ? "Ou cole URL do MP3" : "https://www.youtube.com/watch?v=..."}
                  className="w-full bg-black border border-border p-3 text-sm text-white/80 outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={submit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-l disabled:opacity-50"
              >
                <Upload size={14} /> {saving ? "Salvando..." : editingId ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="p-8 text-white/40 text-sm">A carregar...</div>
        ) : tracks.length === 0 ? (
          <div className="p-8 text-white/40 text-sm">Nenhuma música cadastrada.</div>
        ) : (
          <ul className="divide-y divide-border">
            {tracks.map((t) => (
              <li key={t.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => togglePreview(t)}
                  className="relative w-14 h-14 rounded overflow-hidden border border-white/10 group shrink-0"
                  aria-label={playingId === t.id ? "Pausar" : "Reproduzir"}
                >
                  {t.cover_url ? (
                    <img src={t.cover_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center p-2">
                      <img src="/mooviagold.svg" alt="Moovia" className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    {playingId === t.id ? <Pause size={20} className="text-gold" /> : <Play size={20} className="text-gold" />}
                  </div>
                  {playingId === t.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Pause size={20} className="text-gold" />
                    </div>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-white truncate">{t.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2 mt-1">
                    {t.source_type === "youtube" ? <Video size={12} /> : <Music size={12} />}
                    {t.source_type}
                    <span className="truncate max-w-[240px]">{t.source_url}</span>
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Ordem</label>
                  <input
                    type="number"
                    min={1}
                    disabled={!t.is_enabled}
                    defaultValue={t.position ?? ""}
                    key={`${t.position ?? "null"}-${t.is_enabled}`}
                    onBlur={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (v === t.position) return;
                      if (tracks.some((x) => x.id !== t.id && x.position === v)) {
                        toast.error(`Ordem ${v} já está em uso`);
                        e.target.value = String(t.position ?? "");
                        return;
                      }
                      updatePosition(t, v);
                    }}
                    className="w-14 bg-black border border-border p-2 text-center text-sm text-white outline-none focus:border-gold disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  onClick={() => toggleTrack(t)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold ${
                    t.is_enabled ? "bg-gold text-black" : "bg-white/10 text-white/60"
                  }`}
                >
                  {t.is_enabled ? "Ativa" : "Desativada"}
                </button>
                <button
                  onClick={() => startEdit(t)}
                  className={`p-2 hover:text-gold ${editingId === t.id ? "text-gold" : "text-white/40"}`}
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => removeTrack(t)}
                  className="p-2 text-white/40 hover:text-red-400"
                  aria-label="Remover"
                >
                  <Trash2 size={16} />
                </button>
                </div>
                {playingId === t.id && t.source_type === "youtube" && ytId(t.source_url) && (
                  <iframe
                    className="w-full aspect-video rounded border border-white/10"
                    src={`https://www.youtube.com/embed/${ytId(t.source_url)}?autoplay=1`}
                    title={t.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
