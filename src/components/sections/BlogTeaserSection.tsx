import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentLang } from "@/i18n";
import { pickPostLocale, type Locale } from "@/lib/post-locale";
import blogVistoLisboa from "@/assets/blog-visto-lisboa.jpg";

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

export function BlogTeaserSection() {
  const locale = useLocale();

  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ["posts", "home-teaser"] as const, []);

  const { data: rawPosts } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });

  // Realtime: refetch when posts change
  useEffect(() => {
    const channel = supabase
      .channel("posts-home-teaser")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => queryClient.invalidateQueries({ queryKey }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, queryKey]);

  const posts = useMemo(
    () =>
      (rawPosts || []).map((p: any) => {
        const localized = pickPostLocale(p, locale);
        const date = new Date(p.published_at || p.created_at);
        return {
          slug: p.slug,
          category: p.category || "Artigo",
          title: localized.title || p.title,
          excerpt: localized.excerpt || p.excerpt || "",
          date: date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" }),
          readTime: p.read_time ? `${p.read_time} min` : "",
          image: p.featured_image || blogVistoLisboa,
          alt: p.title,
        };
      }),
    [rawPosts, locale],
  );

  return (
    <section className="bg-transparent py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Conteúdo estratégico
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(28px,4.5vw,56px)] font-[200] text-white leading-[0.95] tracking-[-0.04em] mb-12"
          >
            "O que você precisa entender<br />antes de decidir."
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] font-[300] text-w35 leading-[1.7] max-w-xl"
          >
            Artigos escritos pela equipa da MOOVIA sobre os temas que mais impactam a jornada de transição internacional.
          </motion.p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-px bg-transparent">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-transparent flex flex-col group border border-b18 hover:border-gold transition-all overflow-hidden"
              >
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-b18">
                    <img
                      src={post.image}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      alt={post.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06091a]/50 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-block bg-black/55 backdrop-blur-sm px-3 py-1 font-body text-[10px] font-[500] uppercase tracking-widest text-gold w-fit border border-b18">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="font-display text-[20px] font-[300] text-white mb-4 line-clamp-2">{post.title}</h3>
                    <p className="font-body text-[14px] font-[300] text-w35 leading-[1.7] mb-10 line-clamp-3">{post.excerpt}</p>

                    <div className="mt-auto pt-6 border-t border-b18 flex items-center justify-between text-[11px] font-body text-w35 uppercase tracking-widest">
                      <div className="flex gap-4">
                        <span>{post.date}</span>
                        {post.readTime && <span>{post.readTime}</span>}
                      </div>
                      <span className="text-gold text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-black-3 border border-b18">
            <p className="font-display text-[20px] font-[200] text-w35">Primeiros artigos em breve.</p>
          </div>
        )}

        <div className="mt-20 text-center">
          <Link
            to="/blog"
            className="inline-block border border-b18 px-10 py-4 font-body text-[12px] uppercase tracking-[0.2em] text-w35 hover:text-white hover:border-gold transition-all"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  );
}
