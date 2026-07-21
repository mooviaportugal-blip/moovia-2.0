import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "isomorphic-dompurify";
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

async function fetchPost(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    return { post: await fetchPost(params.slug) };
  },
  head: ({ params, loaderData }) => {
    const post: any = loaderData?.post;
    const url = `https://mooviaportugal.com/blog/${params.slug}`;
    const title = post?.meta_title || (post ? `${post.title}, MOOVIA Portugal` : "Artigo, MOOVIA Portugal");
    const description = post?.meta_description || post?.excerpt || "Artigo MOOVIA Portugal sobre transição internacional.";
    const image = post?.og_image || post?.banner_image || post?.featured_image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: post?.title || title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post?.title || title },
        { name: "twitter:description", content: description },
        ...(post?.category ? [{ property: "article:section", content: post.category }] : []),
        ...(post?.published_at ? [{ property: "article:published_time", content: post.published_at }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [{
            type: "application/ld+json",
            children: JSON.stringify(post.schema_json || {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description,
              image: image ? [image] : undefined,
              datePublished: post.published_at || post.created_at,
              dateModified: post.updated_at || post.created_at,
              articleSection: post.category,
              mainEntityOfPage: url,
              author: { "@type": "Organization", name: "MOOVIA Portugal" },
              publisher: {
                "@type": "Organization",
                name: "MOOVIA Portugal",
                logo: { "@type": "ImageObject", url: "https://mooviaportugal.com/mooviagold.png" },
              },
            }),
          }]
        : [],
    };
  },
  component: Post,
});

function Post() {
  const { slug } = Route.useParams();
  const initialData = Route.useLoaderData();
  const locale = useLocale();

  const { data: rawPost, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    initialData: initialData?.post,
    retry: 1,
  });
  const post: any = rawPost ? { ...rawPost, ...pickPostLocale(rawPost, locale) } : rawPost;

  if (error) {
    return (
      <SiteLayout>
        <div className="bg-black pt-[120px]">
          <div className="mx-auto max-w-3xl px-6 md:px-10 py-20 text-center">
            <h1 className="text-white text-2xl font-light">Erro ao carregar o artigo.</h1>
            <p className="text-white/35 mt-4">Por favor, tente novamente mais tarde.</p>
            <Link to="/blog" className="mt-8 inline-block font-urbanist text-[12px] uppercase tracking-[0.18em] border-b border-gold text-gold-l pb-1">
              Voltar ao blog →
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="bg-black pt-[120px]">
        <div className="mx-auto max-w-[720px] px-6 md:px-10 py-20">
          {isLoading && !post ? (
            <p className="text-white/35 font-urbanist">A carregar…</p>
          ) : !post ? (
            <div>
              <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-gold" />
                Não encontrado
              </p>
              <h1 className="font-sora text-4xl font-[200] text-white">Este artigo não existe ou ainda não foi publicado.</h1>
              <Link to="/blog" className="mt-8 inline-block font-urbanist text-[12px] uppercase tracking-[0.18em] border-b border-gold text-gold-l pb-1">
                Voltar ao blog →
              </Link>
            </div>
          ) : (
            <>
              {post.category && (
                <div className="font-urbanist text-[11px] uppercase tracking-[0.28em] mb-8 text-gold flex items-center gap-3">
                  <span className="w-8 h-px bg-gold" />
                  {post.category}
                </div>
              )}
              <h1 className="font-sora text-[clamp(34px,5.5vw,60px)] font-[200] leading-[1.05] tracking-[-0.02em] text-white">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-8 font-urbanist text-[20px] md:text-[22px] font-[300] text-white/70 leading-[1.55] italic border-l-2 border-gold/40 pl-6">{post.excerpt}</p>
              )}
              <div className="mt-8 flex items-center gap-4 font-urbanist text-[11px] uppercase tracking-[0.22em] text-w35">
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" })}</span>
                )}
                {post.read_time && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    <span>{post.read_time} min de leitura</span>
                  </>
                )}
              </div>
              {(post.banner_image || post.featured_image) && (
                <div className="mt-14 relative aspect-[16/9] overflow-hidden border border-b18 rounded-sm">
                  <img src={post.banner_image || post.featured_image} alt={post.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              )}
              <div
                className="
                  mt-16 max-w-none font-urbanist font-[300] text-white/80
                  text-[18px] md:text-[19px] leading-[1.85] tracking-[0.005em]
                  [&>p]:mb-7
                  [&>p:first-of-type]:first-letter:font-sora [&>p:first-of-type]:first-letter:text-gold
                  [&>p:first-of-type]:first-letter:text-[64px] [&>p:first-of-type]:first-letter:leading-[0.9]
                  [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1
                  [&>h2]:font-sora [&>h2]:font-[300] [&>h2]:text-white [&>h2]:text-[clamp(26px,3.2vw,36px)] [&>h2]:leading-[1.2] [&>h2]:tracking-[-0.01em] [&>h2]:mt-16 [&>h2]:mb-6
                  [&>h3]:font-sora [&>h3]:font-[300] [&>h3]:text-white [&>h3]:text-[22px] md:[&>h3]:text-[26px] [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-4
                  [&>h4]:font-urbanist [&>h4]:font-[500] [&>h4]:uppercase [&>h4]:tracking-[0.18em] [&>h4]:text-gold [&>h4]:text-[13px] [&>h4]:mt-10 [&>h4]:mb-3
                  [&>blockquote]:my-10 [&>blockquote]:pl-8 [&>blockquote]:border-l-2 [&>blockquote]:border-gold
                  [&>blockquote]:font-sora [&>blockquote]:font-[300] [&>blockquote]:italic [&>blockquote]:text-white/90
                  [&>blockquote]:text-[22px] md:[&>blockquote]:text-[26px] [&>blockquote]:leading-[1.5]
                  [&>ul]:my-6 [&>ul]:pl-6 [&>ul>li]:mb-3 [&>ul>li]:list-disc [&>ul>li]:marker:text-gold
                  [&>ol]:my-6 [&>ol]:pl-6 [&>ol>li]:mb-3 [&>ol>li]:list-decimal [&>ol>li]:marker:text-gold
                  [&_strong]:text-white [&_strong]:font-[500]
                  [&_em]:text-white/90 [&_em]:italic
                  [&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-gold
                  [&>img]:my-12 [&>img]:w-full [&>img]:rounded-sm [&>img]:border [&>img]:border-b18
                  [&>hr]:my-16 [&>hr]:border-0 [&>hr]:h-px [&>hr]:bg-gradient-to-r [&>hr]:from-transparent [&>hr]:via-gold/40 [&>hr]:to-transparent
                  [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-gold-l [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
                  [&>pre]:my-8 [&>pre]:p-6 [&>pre]:bg-black-2 [&>pre]:border [&>pre]:border-b18 [&>pre]:rounded-sm [&>pre]:overflow-x-auto
                "
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "", { FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"], FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur", "onchange", "onsubmit", "style"] }) }}
              />

              <div className="mt-20 pt-10 border-t border-b18 flex items-center justify-between">
                <Link to="/blog" className="font-urbanist text-[11px] uppercase tracking-[0.22em] text-w35 hover:text-gold transition-colors">
                  ← Todos os artigos
                </Link>
                <span className="font-urbanist text-[11px] uppercase tracking-[0.22em] text-w35">MOOVIA · Portugal</span>
              </div>

              <div className="mt-16 p-10 md:p-14 border border-b18 bg-black-2 relative overflow-hidden group rounded-sm">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold to-teal" />
                <p className="font-urbanist text-[11px] tracking-[0.22em] uppercase text-gold mb-4">Pronto para o próximo passo?</p>
                <h2 className="font-sora text-[clamp(24px,3vw,36px)] font-[200] text-white leading-tight mb-8">Avalie o seu caso com a MOOVIA.</h2>
                <Link to="/home" hash="lead-form" className="bg-gold text-black font-urbanist text-[12px] font-bold tracking-[0.18em] uppercase px-10 py-5 relative overflow-hidden group/btn transition-all duration-300 inline-block">
                  <span className="relative z-10">Solicitar Global Mobility Success Assessment</span>
                  <div className="absolute inset-0 bg-gold-xl origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
                </Link>
              </div>

            </>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
