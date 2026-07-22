// Picks localized post fields with graceful fallback to Portuguese original.
export type Locale = "pt" | "en" | "es";

export interface LocalizedPost {
  title: string;
  excerpt: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  slug: string;
}

// Returns null when a non-PT locale is requested but the post has no
// published translation for that locale — callers should filter these out
// so /en never shows PT copy as fallback (Opção A: 100% fidelity).
export function pickPostLocale(post: any, locale: Locale): LocalizedPost | null {
  if (!post) return post;
  if (locale === "pt") {
    return {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      slug: post.slug,
    };
  }
  const t = post.translations?.[locale];
  // Only surface translated posts whose status was flipped to "published".
  // Absence of a status field (legacy rows) counts as published for
  // backwards compatibility with content already translated pre-workflow.
  if (!t || (t.status && t.status !== "published")) return null;
  return {
    title: t.title || post.title,
    excerpt: t.excerpt ?? post.excerpt,
    content: t.content ?? post.content,
    meta_title: t.meta_title ?? post.meta_title,
    meta_description: t.meta_description ?? post.meta_description,
    slug: t.slug || post.slug,
  };
}

