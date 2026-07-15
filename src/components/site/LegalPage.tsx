import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

type LegalPageData = {
  slug: string;
  title: string;
  content: string;
  updated_at: string;
};

export function LegalPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<LegalPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("legal_pages")
      .select("slug,title,content,updated_at")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setPage(data as LegalPageData | null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <SiteLayout>
      <article className="bg-black pt-[120px]">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-20">
          <p className="font-urbanist text-[11px] tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-gold" />
            Compliance
          </p>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-12 w-2/3 bg-white/5 rounded" />
              <div className="h-4 w-1/3 bg-white/5 rounded" />
              <div className="mt-12 space-y-3">
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-11/12 bg-white/5 rounded" />
                <div className="h-4 w-10/12 bg-white/5 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
              </div>
            </div>
          ) : !page ? (
            <div className="text-w35 font-urbanist">Página não encontrada.</div>
          ) : (
            <>
              <h1 className="font-sora text-[clamp(32px,5vw,56px)] font-[200] leading-[1.1] text-white">
                {page.title}
              </h1>
              <p className="mt-4 text-w35 font-urbanist text-[13px]">
                Última atualização:{" "}
                {new Date(page.updated_at).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="legal-markdown mt-12 font-urbanist text-[16px] font-[300] text-white/70 leading-[1.9] space-y-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h2 className="font-sora text-2xl font-[200] text-white mt-10 mb-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="font-sora text-2xl font-[200] text-white mt-10 mb-4" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="font-sora text-xl font-[200] text-white mt-8 mb-3" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    a: ({ node, ...props }) => (
                      <a className="text-gold underline hover:text-gold-l" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="text-white font-medium" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
                        <table className="w-full border-collapse text-[14px]" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-gold/10" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="border-b border-white/10 px-4 py-3 text-left font-sora font-[300] text-gold uppercase tracking-[0.12em] text-[12px]" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border-b border-white/5 px-4 py-3 align-top text-white/70" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="hover:bg-white/[0.02] transition-colors" {...props} />
                    ),
                  }}
                >

                  {page.content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
