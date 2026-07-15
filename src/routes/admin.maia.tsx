import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Download, FileText, Image as ImageIcon, FileType, RefreshCw, Save, AlertCircle, CheckCircle2, Eye, X } from "lucide-react";

export const Route = createFileRoute("/admin/maia")({
  component: AdminMaia,
});

type Knowledge = {
  id: string;
  system_prompt: string;
  persona: string | null;
  rules: string[];
  faqs: { q: string; a: string }[];
  vocabulary: { use?: string[]; avoid?: string[] };
  examples: { user: string; maia: string }[];
};

type Document = {
  id: string;
  title: string;
  filename: string;
  file_type: string;
  file_size: number | null;
  status: string;
  error: string | null;
  chunk_count: number;
  created_at: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string);

function AdminMaia() {
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [chunksDoc, setChunksDoc] = useState<Document | null>(null);
  const [chunks, setChunks] = useState<{ chunk_index: number; content: string; tokens: number | null }[]>([]);
  const [chunksLoading, setChunksLoading] = useState(false);

  async function viewChunks(doc: Document) {
    setChunksDoc(doc);
    setChunksLoading(true);
    setChunks([]);
    const { data } = await supabase
      .from("maia_chunks" as any)
      .select("chunk_index, content, tokens")
      .eq("document_id", doc.id)
      .order("chunk_index", { ascending: true });
    setChunks((data as any) || []);
    setChunksLoading(false);
  }

  function assembledPrompt(): string {
    if (!knowledge) return "";
    const parts: string[] = [];
    if (knowledge.system_prompt) parts.push(knowledge.system_prompt);
    if (knowledge.persona) parts.push(`\n## PERSONA\n${knowledge.persona}`);
    if (knowledge.rules?.length) parts.push(`\n## REGRAS\n- ${knowledge.rules.join("\n- ")}`);
    const use = knowledge.vocabulary?.use || [];
    const avoid = knowledge.vocabulary?.avoid || [];
    if (use.length || avoid.length) {
      parts.push(`\n## VOCABULÁRIO\nUsar: ${use.join(", ") || "—"}\nEvitar: ${avoid.join(", ") || "—"}`);
    }
    if (knowledge.faqs?.length) {
      parts.push(`\n## FAQ\n${knowledge.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`);
    }
    if (knowledge.examples?.length) {
      parts.push(`\n## EXEMPLOS\n${knowledge.examples.map((e) => `Usuário: ${e.user}\nMAIA: ${e.maia}`).join("\n\n")}`);
    }
    return parts.join("\n");
  }

  async function load() {
    setLoading(true);
    const [{ data: kdata }, { data: ddata }] = await Promise.all([
      supabase
        .from("maia_knowledge" as any)
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("maia_documents" as any)
        .select("*")
        .order("created_at", { ascending: false }),
    ]);
    if (kdata) {
      const k = kdata as any;
      setKnowledge({
        id: k.id,
        system_prompt: k.system_prompt || "",
        persona: k.persona || "",
        rules: Array.isArray(k.rules) ? k.rules : [],
        faqs: Array.isArray(k.faqs) ? k.faqs : [],
        vocabulary: k.vocabulary && typeof k.vocabulary === "object" ? k.vocabulary : { use: [], avoid: [] },
        examples: Array.isArray(k.examples) ? k.examples : [],
      });
    }
    setDocuments((ddata as any) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // Realtime: refresh document list when status changes
  useEffect(() => {
    const channel = supabase
      .channel("maia_documents_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "maia_documents" }, () => {
        load();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function saveKnowledge() {
    if (!knowledge) return;
    setSaving(true);
    const { error } = await (supabase.from("maia_knowledge" as any) as any)
      .update({
        system_prompt: knowledge.system_prompt,
        persona: knowledge.persona,
        rules: knowledge.rules,
        faqs: knowledge.faqs,
        vocabulary: knowledge.vocabulary,
        examples: knowledge.examples,
      })
      .eq("id", knowledge.id);
    setSaving(false);
    if (error) toast.error("Erro ao salvar: " + error.message);
    else toast.success("Inteligência salva");
  }

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("maia-docs").upload(path, file, {
        contentType: file.type || "application/octet-stream",
      });
      if (upErr) throw upErr;

      const { data: inserted, error: insErr } = await (supabase
        .from("maia_documents" as any) as any)
        .insert({
          title: file.name.replace(/\.[^.]+$/, ""),
          filename: file.name,
          file_type: file.type || "application/octet-stream",
          file_size: file.size,
          storage_path: path,
          status: "pending",
        })
        .select()
        .single();
      if (insErr) throw insErr;

      // Trigger ingest
      const res = await fetch(`${SUPABASE_URL}/functions/v1/maia-ingest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({ document_id: (inserted as any).id }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      toast.success(`${file.name} processado`);
      load();
    } catch (e: any) {
      toast.error("Falha no upload: " + (e.message || e));
    } finally {
      setUploading(false);
    }
  }

  async function reprocess(docId: string) {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/maia-ingest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({ document_id: docId }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Reprocessado");
      load();
    } catch (e: any) {
      toast.error("Erro: " + e.message);
    }
  }

  async function deleteDoc(doc: Document) {
    if (!confirm(`Remover "${doc.title}"?`)) return;
    await supabase.storage.from("maia-docs").remove([(doc as any).storage_path]);
    await supabase.from("maia_documents" as any).delete().eq("id", doc.id);
    toast.success("Removido");
    load();
  }

  async function exportAll() {
    const { data: chunks } = await supabase.from("maia_chunks" as any).select("document_id, chunk_index, content, metadata, tokens");
    const payload = {
      version: 1,
      exported_at: new Date().toISOString(),
      knowledge,
      documents: documents.map((d) => ({ ...d })),
      chunks: chunks || [],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `maia-inteligencia-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importAll(file: File) {
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      if (!payload?.knowledge) throw new Error("JSON inválido (sem 'knowledge')");
      if (!confirm("Isso vai sobrescrever a inteligência atual da MAIA (prompt, regras, FAQs, exemplos). Continuar?")) return;
      const k = payload.knowledge;
      await (supabase.from("maia_knowledge" as any) as any)
        .update({
          system_prompt: k.system_prompt || "",
          persona: k.persona || null,
          rules: k.rules || [],
          faqs: k.faqs || [],
          vocabulary: k.vocabulary || {},
          examples: k.examples || [],
        })
        .eq("is_active", true);
      toast.success("Inteligência importada");
      load();
    } catch (e: any) {
      toast.error("Erro ao importar: " + e.message);
    }
  }

  if (loading || !knowledge) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-amotha text-4xl">MAIA</h1>
          <p className="font-urbanist text-white-3 text-sm mt-2">
            Inteligência conversacional · prompt editável + base de conhecimento (RAG)
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 px-4 py-3 border border-gold/40 hover:border-gold text-gold text-sm font-urbanist uppercase tracking-widest"
          >
            <Eye size={16} /> Visualizar
          </button>
          <button
            onClick={exportAll}
            className="flex items-center gap-2 px-4 py-3 border border-border hover:border-gold text-sm font-urbanist uppercase tracking-widest"
          >
            <Download size={16} /> Exportar
          </button>
          <button
            onClick={() => importInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-3 border border-border hover:border-gold text-sm font-urbanist uppercase tracking-widest"
          >
            <Upload size={16} /> Importar
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && importAll(e.target.files[0])}
          />
          <button
            onClick={saveKnowledge}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-3 bg-gold text-black text-sm font-urbanist uppercase tracking-widest font-bold disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Salvar
          </button>
        </div>
      </header>

      {/* Prompt principal */}
      <section className="space-y-3">
        <label className="block font-urbanist text-[11px] uppercase tracking-widest text-gold">
          System Prompt da MAIA
        </label>
        <p className="text-xs text-white-3 font-urbanist">
          O prompt-base. Define personalidade, regras e fluxo. Deixe vazio para usar o prompt padrão do sistema.
        </p>
        <textarea
          value={knowledge.system_prompt}
          onChange={(e) => setKnowledge({ ...knowledge, system_prompt: e.target.value })}
          rows={18}
          className="w-full bg-black-3 border border-border p-4 font-mono text-xs text-white outline-none focus:border-gold"
          placeholder="Você é a MAIA..."
        />
      </section>

      {/* Persona curta */}
      <section className="space-y-3">
        <label className="block font-urbanist text-[11px] uppercase tracking-widest text-gold">Persona (resumo)</label>
        <textarea
          value={knowledge.persona || ""}
          onChange={(e) => setKnowledge({ ...knowledge, persona: e.target.value })}
          rows={4}
          className="w-full bg-black-3 border border-border p-4 font-urbanist text-sm text-white outline-none focus:border-gold"
          placeholder="Ex: Tom sóbrio, curiosa, portuguesa, evita marketing..."
        />
      </section>

      {/* Vocabulário */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block font-urbanist text-[11px] uppercase tracking-widest text-gold">Palavras a usar</label>
          <input
            value={(knowledge.vocabulary.use || []).join(", ")}
            onChange={(e) => setKnowledge({
              ...knowledge,
              vocabulary: { ...knowledge.vocabulary, use: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) },
            })}
            className="w-full bg-black-3 border border-border p-4 font-urbanist text-sm text-white outline-none focus:border-gold"
            placeholder="transição, mandato, jornada..."
          />
        </div>
        <div className="space-y-3">
          <label className="block font-urbanist text-[11px] uppercase tracking-widest text-gold">Palavras a evitar</label>
          <input
            value={(knowledge.vocabulary.avoid || []).join(", ")}
            onChange={(e) => setKnowledge({
              ...knowledge,
              vocabulary: { ...knowledge.vocabulary, avoid: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) },
            })}
            className="w-full bg-black-3 border border-border p-4 font-urbanist text-sm text-white outline-none focus:border-gold"
            placeholder="relocação, pacote, garantimos..."
          />
        </div>
      </section>

      {/* Regras */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-urbanist text-[11px] uppercase tracking-widest text-gold">Regras adicionais</label>
          <button
            onClick={() => setKnowledge({ ...knowledge, rules: [...knowledge.rules, ""] })}
            className="text-xs text-gold hover:underline"
          >+ adicionar</button>
        </div>
        {knowledge.rules.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={r}
              onChange={(e) => {
                const next = [...knowledge.rules];
                next[i] = e.target.value;
                setKnowledge({ ...knowledge, rules: next });
              }}
              className="flex-1 bg-black-3 border border-border p-3 text-sm text-white outline-none focus:border-gold"
            />
            <button
              onClick={() => setKnowledge({ ...knowledge, rules: knowledge.rules.filter((_, j) => j !== i) })}
              className="px-3 border border-border hover:border-red-500 text-red-400"
            ><Trash2 size={14} /></button>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-urbanist text-[11px] uppercase tracking-widest text-gold">FAQ (perguntas frequentes)</label>
          <button
            onClick={() => setKnowledge({ ...knowledge, faqs: [...knowledge.faqs, { q: "", a: "" }] })}
            className="text-xs text-gold hover:underline"
          >+ adicionar</button>
        </div>
        {knowledge.faqs.map((f, i) => (
          <div key={i} className="border border-border p-4 space-y-2">
            <input
              value={f.q}
              onChange={(e) => {
                const next = [...knowledge.faqs]; next[i] = { ...next[i], q: e.target.value };
                setKnowledge({ ...knowledge, faqs: next });
              }}
              placeholder="Pergunta"
              className="w-full bg-black-3 border border-border p-3 text-sm text-white outline-none focus:border-gold"
            />
            <textarea
              value={f.a}
              onChange={(e) => {
                const next = [...knowledge.faqs]; next[i] = { ...next[i], a: e.target.value };
                setKnowledge({ ...knowledge, faqs: next });
              }}
              placeholder="Resposta"
              rows={2}
              className="w-full bg-black-3 border border-border p-3 text-sm text-white outline-none focus:border-gold"
            />
            <button
              onClick={() => setKnowledge({ ...knowledge, faqs: knowledge.faqs.filter((_, j) => j !== i) })}
              className="text-xs text-red-400 hover:underline"
            >remover</button>
          </div>
        ))}
      </section>

      {/* Exemplos */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-urbanist text-[11px] uppercase tracking-widest text-gold">Exemplos de conversa</label>
          <button
            onClick={() => setKnowledge({ ...knowledge, examples: [...knowledge.examples, { user: "", maia: "" }] })}
            className="text-xs text-gold hover:underline"
          >+ adicionar</button>
        </div>
        {knowledge.examples.map((ex, i) => (
          <div key={i} className="border border-border p-4 space-y-2">
            <input
              value={ex.user}
              onChange={(e) => {
                const next = [...knowledge.examples]; next[i] = { ...next[i], user: e.target.value };
                setKnowledge({ ...knowledge, examples: next });
              }}
              placeholder='Usuário: "..."'
              className="w-full bg-black-3 border border-border p-3 text-sm text-white outline-none focus:border-gold"
            />
            <input
              value={ex.maia}
              onChange={(e) => {
                const next = [...knowledge.examples]; next[i] = { ...next[i], maia: e.target.value };
                setKnowledge({ ...knowledge, examples: next });
              }}
              placeholder='MAIA: "..."'
              className="w-full bg-black-3 border border-border p-3 text-sm text-white outline-none focus:border-gold"
            />
            <button
              onClick={() => setKnowledge({ ...knowledge, examples: knowledge.examples.filter((_, j) => j !== i) })}
              className="text-xs text-red-400 hover:underline"
            >remover</button>
          </div>
        ))}
      </section>

      {/* Documentos */}
      <section className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-amotha text-2xl">Base de Conhecimento</h2>
            <p className="text-xs text-white-3 font-urbanist mt-1">
              PDFs, DOCX, TXT, imagens. A MAIA usa esses documentos para responder (RAG).
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-3 bg-gold text-black text-sm font-urbanist uppercase tracking-widest font-bold disabled:opacity-50"
          >
            {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
            Enviar arquivo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.md,.json,.csv,image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
          />
        </div>

        {documents.length === 0 ? (
          <p className="text-white-3 text-sm py-8 text-center border border-dashed border-border">
            Nenhum documento ainda. Envie PDFs, DOCX, TXT ou imagens.
          </p>
        ) : (
          <div className="space-y-2">
            {documents.map((d) => (
              <div key={d.id} className="flex items-center gap-4 border border-border p-4">
                <DocIcon type={d.file_type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-urbanist truncate">{d.title}</p>
                  <p className="text-xs text-white-3 mt-1">
                    {d.filename} · {d.chunk_count} chunks {d.file_size ? `· ${(d.file_size / 1024).toFixed(0)} KB` : ""}
                  </p>
                  {d.error && <p className="text-xs text-red-400 mt-1 truncate" title={d.error}>{d.error}</p>}
                </div>
                <StatusBadge status={d.status} />
                <button onClick={() => viewChunks(d)} className="p-2 border border-border hover:border-gold" title="Ver conteúdo indexado">
                  <Eye size={14} />
                </button>
                <button onClick={() => reprocess(d.id)} className="p-2 border border-border hover:border-gold" title="Reprocessar">
                  <RefreshCw size={14} />
                </button>
                <button onClick={() => deleteDoc(d)} className="p-2 border border-border hover:border-red-500 text-red-400" title="Remover">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreviewOpen(false)}>
          <div className="bg-black-3 border border-gold/40 max-w-4xl w-full max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="font-amotha text-2xl text-white">Inteligência atual da MAIA</h3>
                <p className="text-xs text-white-3 mt-1">Exatamente o que é montado e enviado ao modelo como system prompt.</p>
              </div>
              <button onClick={() => setPreviewOpen(false)} className="text-white-3 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              <pre className="whitespace-pre-wrap font-mono text-xs text-white leading-relaxed">{assembledPrompt() || "(vazio)"}</pre>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-[11px] uppercase tracking-widest text-gold mb-3">Documentos indexados ({documents.filter((d) => d.status === "ready").length})</p>
                <ul className="text-xs text-white-3 space-y-1">
                  {documents.filter((d) => d.status === "ready").map((d) => (
                    <li key={d.id}>· {d.title}, {d.chunk_count} chunks</li>
                  ))}
                  {documents.filter((d) => d.status === "ready").length === 0 && <li>Nenhum documento indexado ainda.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {chunksDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setChunksDoc(null)}>
          <div className="bg-black-3 border border-gold/40 max-w-4xl w-full max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="font-amotha text-2xl text-white">{chunksDoc.title}</h3>
                <p className="text-xs text-white-3 mt-1">{chunks.length} chunks indexados · conteúdo que a MAIA consulta</p>
              </div>
              <button onClick={() => setChunksDoc(null)} className="text-white-3 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-auto p-5 space-y-3">
              {chunksLoading && <Loader2 className="animate-spin text-gold mx-auto" size={24} />}
              {!chunksLoading && chunks.length === 0 && <p className="text-white-3 text-sm">Nenhum chunk encontrado.</p>}
              {chunks.map((c) => (
                <div key={c.chunk_index} className="border border-border p-3">
                  <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Chunk #{c.chunk_index} {c.tokens ? `· ~${c.tokens} tokens` : ""}</p>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-white-3 leading-relaxed">{c.content}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DocIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) return <ImageIcon size={20} className="text-gold" />;
  if (type.includes("pdf")) return <FileType size={20} className="text-gold" />;
  return <FileText size={20} className="text-gold" />;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "ready") return <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle2 size={12} /> pronto</span>;
  if (status === "error") return <span className="flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} /> erro</span>;
  if (status === "processing") return <span className="flex items-center gap-1 text-xs text-gold"><Loader2 size={12} className="animate-spin" /> processando</span>;
  return <span className="text-xs text-white-3">pendente</span>;
}
