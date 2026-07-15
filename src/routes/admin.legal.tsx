import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Save, FileText, ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/legal")({
  component: AdminLegal,
});

type LegalRow = {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
  updated_by: string | null;
};

function AdminLegal() {
  const [pages, setPages] = useState<LegalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    supabase
      .from("legal_pages")
      .select("*")
      .order("title")
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setPages((data as LegalRow[]) || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (editingSlug) {
    const page = pages.find((p) => p.slug === editingSlug);
    if (!page) return null;
    return (
      <LegalEditor
        page={page}
        onBack={() => {
          setEditingSlug(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <header>
        <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-2">
          CMS
        </p>
        <h1 className="font-sora text-3xl font-[200] text-white">Páginas Legais</h1>
        <p className="font-urbanist text-[14px] text-w35 mt-2">
          Edite os textos da Política de Privacidade, Cookies e Termos sem fazer deploy.
        </p>
      </header>

      <div className="border border-border">
        <table className="w-full">
          <thead className="bg-black-2">
            <tr className="text-left font-urbanist text-[11px] uppercase tracking-[0.2em] text-w35">
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Última atualização</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr
                key={p.id}
                className="border-t border-border hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-urbanist text-white text-[14px] flex items-center gap-3">
                  <FileText size={16} className="text-gold/70" />
                  {p.title}
                </td>
                <td className="px-6 py-4 font-mono text-[12px] text-w35">{p.slug}</td>
                <td className="px-6 py-4 font-urbanist text-[12px] text-w35">
                  {new Date(p.updated_at).toLocaleString("pt-PT")}
                  {p.updated_by && (
                    <span className="block text-[10px] opacity-60">por {p.updated_by}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditingSlug(p.slug)}
                    className="bg-gold text-black font-urbanist text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 hover:bg-gold-xl transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LegalEditor({ page, onBack }: { page: LegalRow; onBack: () => void }) {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const handleSave = async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("legal_pages")
      .update({
        title,
        content,
        updated_by: user?.email ?? null,
      })
      .eq("slug", page.slug);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSavedAt(new Date());
    toast.success("Página guardada");
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-w35 hover:text-gold font-urbanist text-[12px] uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft size={14} /> Voltar
        </button>
        <div className="flex items-center gap-4">
          {savedAt && (
            <span className="flex items-center gap-2 text-gold-l font-urbanist text-[12px]">
              <Check size={14} /> Guardado às{" "}
              {savedAt.toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold text-black font-urbanist text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-gold-xl transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Guardar
          </button>
        </div>
      </div>

      <div>
        <label className="block font-urbanist text-[11px] uppercase tracking-[0.2em] text-w35 mb-2">
          Título
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black-3 border border-border text-white p-3 font-urbanist text-[14px] outline-none focus:border-gold"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="block font-urbanist text-[11px] uppercase tracking-[0.2em] text-w35 mb-2">
            Conteúdo (Markdown)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-[600px] bg-black-3 border border-border text-white p-4 font-mono text-[13px] leading-[1.7] outline-none focus:border-gold resize-y"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col">
          <label className="block font-urbanist text-[11px] uppercase tracking-[0.2em] text-w35 mb-2">
            Pré-visualização
          </label>
          <div className="flex-1 min-h-[600px] bg-black-2 border border-border p-6 overflow-y-auto">
            <h2 className="font-sora text-2xl font-[200] text-white mb-6">{title}</h2>
            <div className="font-urbanist text-[14px] font-[300] text-white/70 leading-[1.85] space-y-4 [&_h1]:font-sora [&_h1]:text-xl [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:font-sora [&_h2]:text-xl [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:font-sora [&_h3]:text-lg [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_strong]:text-white [&_p]:mb-3">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
