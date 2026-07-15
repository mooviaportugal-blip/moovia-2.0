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

export function pickPostLocale(post: any, locale: Locale): LocalizedPost {
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
  if (!t) {
    return {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      slug: post.slug,
    };
  }
  return {
    title: t.title || post.title,
    excerpt: t.excerpt ?? post.excerpt,
    content: t.content ?? post.content,
    meta_title: t.meta_title ?? post.meta_title,
    meta_description: t.meta_description ?? post.meta_description,
    slug: post.slug, // keep canonical slug; locale slug stored in translations for SEO if needed
  };
}
