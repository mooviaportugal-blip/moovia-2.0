import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus, Search, ExternalLink, Clock, Eye, Trash2, Save, ArrowLeft, X,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RichEditor } from "@/components/admin/RichEditor";
import { SeoScore } from "@/components/admin/SeoScore";
import { analyzeSeo, slugify, stripHtml, wordCount } from "@/lib/seo";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

type Post = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  featured_image: string | null;
  banner_image: string | null;
  og_image: string | null;
  read_time: number | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  published_at: string | null;
  created_at?: string;
};

const empty = (): Post => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [],
  published: false,
  featured_image: "",
  banner_image: "",
  og_image: "",
  read_time: null,
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
  published_at: null,
});

function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Post | null>(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id,title,slug,excerpt,content,category,tags,published,featured_image,banner_image,og_image,read_time,meta_title,meta_description,focus_keyword,published_at,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[admin.blog] fetch error", error);
      toast.error(`Erro ao carregar posts: ${error.message}`);
      setPosts([]);
    } else {
      setPosts((data as any) || []);
    }
    setLoading(false);
  }

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()),
  );

  if (editing) {
    return (
      <PostEditor
        post={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); fetchPosts(); }}
      />
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">Gestão do Blog</h1>
          <p className="font-urbanist text-white/30 uppercase tracking-widest text-[11px]">
            {posts.length} artigo{posts.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Pesquisar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black-2 border border-border text-white pl-12 pr-4 py-3 font-urbanist text-sm min-w-[280px] outline-none focus:border-gold transition-colors"
            />
          </div>

          <button
            onClick={() => setEditing(empty())}
            className="bg-gold text-black px-8 py-3 hover:bg-gold-xl transition-colors flex items-center gap-2 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold"
          >
            <Plus size={16} /> Novo Post
          </button>
        </div>
      </div>

      <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse font-urbanist">
          <thead>
            <tr className="bg-black-3 border-b border-border">
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Artigo</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Status</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Categoria</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Publicação</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr
                key={post.id}
                onClick={() => setEditing(post)}
                className="border-b border-border hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    {post.featured_image ? (
                      <img src={post.featured_image} className="w-12 h-12 object-cover rounded border border-border" alt="" />
                    ) : (
                      <div className="w-12 h-12 rounded border border-border bg-black-3" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{post.title}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 flex items-center gap-2">
                        <Clock size={10} /> {post.read_time || 5} min · /{post.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 border rounded text-[9px] uppercase tracking-widest font-bold",
                    post.published ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-white/5 border-white/10 text-white/40",
                  )}>
                    {post.published ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="p-6 text-xs text-white/60 uppercase tracking-widest">{post.category || "—"}</td>
                <td className="p-6 text-xs text-white/40">
                  {post.published_at ? format(new Date(post.published_at), "dd/MM/yyyy") : "—"}
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="p-2 text-white/30 hover:text-gold transition-colors"><Eye size={18} /></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">Nenhum artigo encontrado.</div>
        )}
        {loading && <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">A carregar…</div>}
      </div>
    </div>
  );
}

function PostEditor({ post, onCancel, onSaved }: { post: Post; onCancel: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Post>({ ...post });
  const [saving, setSaving] = useState(false);
  const [slugDirty, setSlugDirty] = useState(!!post.slug);

  const set = <K extends keyof Post>(k: K, v: Post[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Auto-build slug from focus keyword (or title) until user edits the slug field
  useEffect(() => {
    if (slugDirty) return;
    const base = form.focus_keyword || form.title;
    if (base) set("slug", slugify(base));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.focus_keyword, form.title, slugDirty]);

  const analysis = useMemo(
    () => analyzeSeo({
      title: form.title,
      slug: form.slug,
      metaTitle: form.meta_title || "",
      metaDescription: form.meta_description || "",
      contentHtml: form.content || "",
      focusKeyword: form.focus_keyword || "",
      excerpt: form.excerpt || "",
    }),
    [form],
  );

  async function save(publishNow?: boolean) {
    if (!form.title.trim()) { toast.error("Título é obrigatório"); return; }
    if (!form.slug.trim()) { toast.error("URL (slug) é obrigatório"); return; }

    setSaving(true);
    const wc = wordCount(stripHtml(form.content || ""));
    const readTime = Math.max(1, Math.round(wc / 220));
    const willPublish = publishNow ?? form.published;

    const payload: any = {
      title: form.title.trim(),
      slug: slugify(form.slug),
      excerpt: form.excerpt || null,
      content: form.content || null,
      category: form.category || null,
      tags: form.tags || [],
      published: willPublish,
      featured_image: form.featured_image || null,
      banner_image: form.banner_image || null,
      og_image: form.og_image || form.banner_image || form.featured_image || null,
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || form.excerpt || null,
      focus_keyword: form.focus_keyword || null,
      read_time: readTime,
      published_at:
        willPublish && !form.published_at
          ? new Date().toISOString()
          : form.published_at,
    };

    const res = form.id
      ? await supabase.from("posts").update(payload).eq("id", form.id).select().single()
      : await supabase.from("posts").insert(payload).select().single();

    setSaving(false);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(willPublish ? "Artigo publicado" : "Rascunho salvo");
    onSaved();
  }

  async function remove() {
    if (!form.id) return onCancel();
    if (!confirm("Apagar este artigo? Esta ação não pode ser desfeita.")) return;
    const { error } = await supabase.from("posts").delete().eq("id", form.id);
    if (error) toast.error(error.message);
    else { toast.success("Artigo apagado"); onSaved(); }
  }

  const tagInput = (form.tags || []).join(", ");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button onClick={onCancel} className="flex items-center gap-2 text-white/60 hover:text-gold font-urbanist text-[11px] uppercase tracking-[0.2em]">
          <ArrowLeft size={14} /> Voltar
        </button>
        <div className="flex items-center gap-3">
          {form.id && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 border border-border text-white/60 hover:text-gold hover:border-gold transition-colors font-urbanist text-[11px] uppercase tracking-[0.2em]">
              <ExternalLink size={14} /> Pré-visualizar
            </a>
          )}
          {form.id && (
            <button onClick={remove} className="flex items-center gap-2 px-4 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-urbanist text-[11px] uppercase tracking-[0.2em]">
              <Trash2 size={14} /> Apagar
            </button>
          )}
          <button onClick={() => save(false)} disabled={saving} className="flex items-center gap-2 px-6 py-3 border border-border text-white hover:border-gold hover:text-gold transition-colors font-urbanist text-[11px] uppercase tracking-[0.2em]">
            <Save size={14} /> Salvar rascunho
          </button>
          <button onClick={() => save(true)} disabled={saving} className="flex items-center gap-2 bg-gold text-black px-8 py-3 hover:bg-gold-xl transition-colors font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold">
            {form.published ? "Atualizar" : "Publicar"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* MAIN COLUMN */}
        <div className="space-y-6">
          <Field label="Título">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Título do artigo"
              className="w-full bg-black-3 border border-border px-5 py-4 text-white font-sora text-2xl font-[200] focus:outline-none focus:border-gold"
            />
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Palavra-chave (foco)">
              <input
                value={form.focus_keyword || ""}
                onChange={(e) => set("focus_keyword", e.target.value)}
                placeholder="ex: visto d7 portugal"
                className="w-full bg-black-3 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
              />
            </Field>
            <Field label="URL (slug)" hint="Auto-gerado a partir da palavra-chave. Edite se necessário.">
              <div className="flex items-center bg-black-3 border border-border focus-within:border-gold">
                <span className="px-3 py-3 text-white/30 font-urbanist text-sm border-r border-border">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugDirty(true); set("slug", e.target.value); }}
                  className="flex-1 bg-transparent px-4 py-3 text-white font-urbanist text-sm focus:outline-none"
                />
              </div>
            </Field>
          </div>

          <Field label="Resumo (excerpt)">
            <textarea
              value={form.excerpt || ""}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="Resumo curto que aparece no card do blog."
              className="w-full bg-black-3 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold resize-none"
            />
          </Field>

          <Field label="Conteúdo">
            <RichEditor value={form.content || ""} onChange={(html) => set("content", html)} />
          </Field>

          <div className="grid md:grid-cols-3 gap-6">
            <Field label="Categoria">
              <input
                value={form.category || ""}
                onChange={(e) => set("category", e.target.value)}
                placeholder="ex: Fiscalidade"
                className="w-full bg-black-3 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
              />
            </Field>
            <Field label="Tags" hint="Separadas por vírgula" className="md:col-span-2">
              <input
                value={tagInput}
                onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                placeholder="visto, d7, fiscalidade"
                className="w-full bg-black-3 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
              />
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ImageField label="Thumbnail (card do blog)" value={form.featured_image || ""} onChange={(v) => set("featured_image", v)} />
            <ImageField label="Imagem de banner (topo do post)" value={form.banner_image || ""} onChange={(v) => set("banner_image", v)} />
          </div>

          <div className="border border-border bg-black-3 rounded-lg p-6 space-y-6">
            <h3 className="font-urbanist text-[11px] uppercase tracking-[0.22em] text-gold flex items-center gap-3">
              <span className="w-6 h-px bg-gold" /> Meta tags Google / SEO
            </h3>
            <Field label="Meta title" hint={`${(form.meta_title || form.title).length}/60 caracteres`}>
              <input
                value={form.meta_title || ""}
                onChange={(e) => set("meta_title", e.target.value)}
                placeholder={form.title || "Título para o Google"}
                className="w-full bg-black-2 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
              />
            </Field>
            <Field label="Meta description" hint={`${(form.meta_description || "").length}/160 caracteres`}>
              <textarea
                value={form.meta_description || ""}
                onChange={(e) => set("meta_description", e.target.value)}
                rows={3}
                placeholder="Descrição que aparece no Google (120–160 caracteres)."
                className="w-full bg-black-2 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold resize-none"
              />
            </Field>
            <ImageField label="Imagem para redes sociais (OG)" value={form.og_image || ""} onChange={(v) => set("og_image", v)} hint="Opcional. Se vazio, usa o banner ou a thumb." />

            {/* Google preview */}
            <div className="border border-border bg-black p-5 rounded">
              <p className="text-[11px] uppercase tracking-widest text-white/30 font-urbanist mb-3">Pré-visualização Google</p>
              <p className="text-xs text-white/40 font-urbanist">mooviaportugal.com › blog › {form.slug || "url"}</p>
              <p className="text-lg text-blue-400 mt-1 truncate">{form.meta_title || form.title || "Título do artigo"}</p>
              <p className="text-sm text-white/50 mt-1 line-clamp-2">{form.meta_description || form.excerpt || "Descrição do artigo aparecerá aqui."}</p>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <div className="bg-black-3 border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-urbanist text-[11px] uppercase tracking-[0.22em] text-gold-l">Publicação</h3>
            <label className="flex items-center gap-3 text-white/80 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set("published", e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              Publicado
            </label>
            <Field label="Data de publicação">
              <input
                type="date"
                value={form.published_at ? form.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                onChange={(e) => set("published_at", new Date(e.target.value).toISOString())}
                className="w-full bg-black-2 border border-border px-3 py-2 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
              />
            </Field>
          </div>

          <SeoScore analysis={analysis} />
        </aside>
      </div>
    </div>
  );
}

function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-urbanist text-[10px] uppercase tracking-[0.22em] text-gold-l">{label}</span>
        {hint && <span className="text-[10px] text-white/30 font-urbanist">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function ImageField({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… (URL da imagem)"
          className="w-full bg-black-3 border border-border px-4 py-3 text-white font-urbanist text-sm focus:outline-none focus:border-gold"
        />
        {value ? (
          <div className="relative aspect-[16/9] overflow-hidden border border-border bg-black-3">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 bg-black/70 text-white/80 hover:text-red-400 rounded"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="aspect-[16/9] border border-dashed border-border bg-black-3 flex items-center justify-center text-white/30 text-xs font-urbanist uppercase tracking-widest">
            sem imagem
          </div>
        )}
      </div>
    </Field>
  );
}
