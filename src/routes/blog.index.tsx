import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentLang } from "@/i18n";
import { pickPostLocale, type Locale } from "@/lib/post-locale";

function toLocale(lang: string): Locale {
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("es")) return "es";
  return "pt";
}

function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(() => toLocale(getCurrentLang()));
  useEffect(() => {
    const handler = () => setLocale(toLocale(getCurrentLang()));
    window.addEventListener("mv-lang-changed", handler);
    return () => window.removeEventListener("mv-lang-changed", handler);
  }, []);
  return locale;
}

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog, MOOVIA Portugal" },
      { name: "description", content: "Artigos sobre transição internacional, fiscalidade, habitação, escolas e adaptação. Brasil → Portugal." },
      { property: "og:title", content: "Blog MOOVIA Portugal" },
      { property: "og:description", content: "Estratégia para quem está a coordenar uma transição internacional." },
      { property: "og:url", content: "https://mooviaportugal.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/blog" }],
  }),
  component: Blog,
});

type SortKey = "newest" | "oldest";

function Blog() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [search, setSearch] = useState("");

  const locale = useLocale();

  const { data: rawPosts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const posts = useMemo(
    () =>
      (rawPosts || [])
        .map((p: any) => {
          const loc = pickPostLocale(p, locale);
          if (!loc) return null;
          return { ...p, ...loc };
        })
        .filter((x: any): x is any => x !== null),
    [rawPosts, locale],
  );


  const categories = useMemo(() => {
    const set = new Set<string>();
    (posts || []).forEach((p: any) => p.category && set.add(p.category));
    return ["all", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    let arr = [...(posts || [])];
    if (category !== "all") arr = arr.filter((p: any) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((p: any) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)
      );
    }
    arr.sort((a: any, b: any) => {
      const ad = new Date(a.published_at || a.created_at).getTime();
      const bd = new Date(b.published_at || b.created_at).getTime();
      return sort === "newest" ? bd - ad : ad - bd;
    });
    return arr;
  }, [posts, category, sort, search]);

  if (error) {
    return (
      <SiteLayout>
        <div className="bg-black pt-[120px]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 text-center">
            <h1 className="text-white text-2xl font-[200]">Não foi possível carregar o blog.</h1>
            <p className="text-white/35 mt-4">Por favor, tente novamente mais tarde.</p>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="bg-black pt-[120px]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-[80px] py-16">
          <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-gold" />
            Blog
          </p>
          <h1 className="font-sora text-[clamp(40px,6vw,68px)] font-[100] leading-[1.05] max-w-3xl text-white">
            Estratégia, não dicas.
          </h1>
          <p className="mt-8 max-w-2xl font-urbanist text-[17px] font-[300] text-w35 leading-relaxed">
            Conteúdo para quem está a coordenar uma decisão real, não a colecionar informação.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <section className="bg-black border-t border-b18 px-6 md:px-[80px] py-8">
        <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex-1 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-urbanist text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                  category === c
                    ? "bg-gold text-black border-gold"
                    : "border-b18 text-w35 hover:text-gold hover:border-gold"
                }`}
              >
                {c === "all" ? "Todas as categorias" : c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar…"
              className="bg-black-2 border border-b18 text-white placeholder:text-w35 font-urbanist text-[13px] px-4 py-2.5 focus:outline-none focus:border-gold w-56"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-black-2 border border-b18 text-white font-urbanist text-[13px] px-4 py-2.5 focus:outline-none focus:border-gold"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[80px] bg-transparent">
        <div className="mx-auto max-w-[1400px]">
          {isLoading ? (
            <p className="text-w35 font-urbanist">A carregar…</p>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent">
              {filtered.map((p: any, i: number) => {
                const date = new Date(p.published_at || p.created_at);
                return (
                  <Reveal key={p.id} delay={i * 60} className="h-full">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group flex h-full flex-col bg-black-2 hover:bg-black-3 transition-colors border-l-[3px] border-transparent hover:border-gold overflow-hidden"
                    >
                      {p.featured_image && (
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-b18">
                          <img
                            src={p.featured_image}
                            alt={p.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          {p.category && (
                            <div className="absolute left-5 top-5 bg-black/55 backdrop-blur-sm px-3 py-1 font-urbanist text-[10px] uppercase tracking-[0.18em] text-gold border border-b18">
                              {p.category}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-10">
                        <div className="font-urbanist text-[10px] uppercase tracking-[0.22em] text-w35 mb-3">
                          {date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })}
                          {p.category && !p.featured_image && <> · <span className="text-gold">{p.category}</span></>}
                        </div>
                        <h2 className="font-sora text-2xl font-[200] text-white leading-tight">{p.title}</h2>
                        {p.excerpt && (
                          <p className="mt-4 font-urbanist text-[15px] font-[300] text-w35 leading-relaxed line-clamp-3">{p.excerpt}</p>
                        )}
                        <div className="mt-auto pt-8 font-urbanist text-[11px] uppercase tracking-[0.16em] text-w35 group-hover:text-gold transition-colors">
                          {p.read_time ? <>{p.read_time} <span>min de leitura</span></> : <span>Ler artigo</span>} →
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="py-16 md:py-24 lg:py-32 text-center bg-black-2 border border-b18">
              <p className="font-sora text-2xl font-[100] text-w35">
                {posts && posts.length > 0 ? "Nenhum artigo corresponde aos filtros." : "Primeiros artigos em breve."}
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
