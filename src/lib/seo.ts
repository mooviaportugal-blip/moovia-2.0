export function slugify(input: string): string {
  return (input || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function stripHtml(html: string): string {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function wordCount(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function occurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (haystack.match(re) || []).length;
}

export interface SeoCheck {
  id: string;
  label: string;
  pass: boolean;
  warn?: boolean;
  detail?: string;
}

export interface SeoAnalysis {
  score: number; // 0-100
  density: number; // %
  wordCount: number;
  occurrences: number;
  checks: SeoCheck[];
}

export interface PostSeoInput {
  title?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  contentHtml?: string;
  focusKeyword?: string;
  excerpt?: string;
}

export function analyzeSeo(p: PostSeoInput): SeoAnalysis {
  const kw = (p.focusKeyword || "").trim().toLowerCase();
  const plain = stripHtml(p.contentHtml || "");
  const wc = wordCount(plain);
  const occ = kw ? occurrences(plain, kw) : 0;
  const density = wc > 0 && kw ? (occ / wc) * 100 : 0;

  const checks: SeoCheck[] = [
    { id: "kw", label: "Palavra-chave definida", pass: !!kw },
    { id: "title", label: "Palavra-chave no título", pass: !!kw && (p.title || "").toLowerCase().includes(kw) },
    { id: "slug", label: "Palavra-chave no URL (slug)", pass: !!kw && (p.slug || "").toLowerCase().includes(kw.replace(/\s+/g, "-")) },
    { id: "meta", label: "Palavra-chave na meta description", pass: !!kw && (p.metaDescription || "").toLowerCase().includes(kw) },
    { id: "metaLen", label: "Meta description entre 120–160 caracteres", pass: (p.metaDescription || "").length >= 120 && (p.metaDescription || "").length <= 160 },
    { id: "titleLen", label: "Título SEO até 60 caracteres", pass: (p.metaTitle || p.title || "").length > 0 && (p.metaTitle || p.title || "").length <= 60 },
    { id: "wc", label: "Conteúdo com pelo menos 300 palavras", pass: wc >= 300, detail: `${wc} palavras` },
    { id: "density", label: "Densidade da palavra-chave entre 0,5% e 2,5%", pass: density >= 0.5 && density <= 2.5, warn: density > 2.5, detail: `${density.toFixed(2)}%` },
    { id: "first", label: "Palavra-chave nos primeiros 100 caracteres", pass: !!kw && plain.slice(0, 100).toLowerCase().includes(kw) },
    { id: "excerpt", label: "Resumo (excerpt) preenchido", pass: (p.excerpt || "").trim().length >= 40 },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);

  return { score, density, wordCount: wc, occurrences: occ, checks };
}
