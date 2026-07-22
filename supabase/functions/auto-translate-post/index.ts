// Auto-translate post (PT -> EN) using DeepL API with a MOOVIA custom
// glossary. Writes into posts.translations.en with status="draft" so the
// admin must explicitly promote to "published" before the EN version shows
// up on /blog when locale=en.
//
// Required env (set on the Supabase project, not on Lovable):
//   supabase secrets set DEEPL_API_KEY=... DEEPL_GLOSSARY_ID_PT_EN=... \
//     --project-ref eueddvtfjdhmqudnpzcz
//
// Endpoint: api-free.deepl.com (key ends in :fx). Paid keys use api.deepl.com.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEEPL_KEY = Deno.env.get("DEEPL_API_KEY") ?? "";
const GLOSSARY_ID = Deno.env.get("DEEPL_GLOSSARY_ID_PT_EN") ?? "";
const DEEPL_HOST = DEEPL_KEY.endsWith(":fx")
  ? "https://api-free.deepl.com"
  : "https://api.deepl.com";

// DeepL free tier: rate limits are undocumented. Serialize all calls.
async function deeplTranslate(text: string, isHtml: boolean): Promise<string> {
  if (!text || !text.trim()) return text;
  if (!DEEPL_KEY) {
    console.error("DEEPL_API_KEY missing");
    return text;
  }
  const body = new URLSearchParams();
  body.append("text", text);
  body.append("source_lang", "PT");
  body.append("target_lang", "EN-US");
  if (GLOSSARY_ID) body.append("glossary_id", GLOSSARY_ID);
  if (isHtml) {
    body.append("tag_handling", "html");
    body.append("preserve_formatting", "1");
  }

  try {
    const res = await fetch(`${DEEPL_HOST}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(60000),
    });

    if (res.status === 456) {
      console.error("DeepL quota exceeded (456)");
      return text;
    }
    if (res.status === 429) {
      console.error("DeepL rate limited (429)");
      return text;
    }
    if (!res.ok) {
      console.error("DeepL error", res.status, await res.text().catch(() => ""));
      return text;
    }
    const json = await res.json();
    const out = json?.translations?.[0]?.text;
    return typeof out === "string" && out.trim() ? out : text;
  } catch (e) {
    console.error("DeepL translate failed", e);
    return text;
  }
}

function slugify(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

async function translateEnglish(post: any) {
  // Serialize calls to respect the free-tier undocumented rate limit.
  const title = await deeplTranslate(post.title || "", false);
  const excerpt = await deeplTranslate(post.excerpt || "", false);
  const content = await deeplTranslate(post.content || "", true);
  const meta_title = await deeplTranslate(post.meta_title || post.title || "", false);
  const meta_description = await deeplTranslate(post.meta_description || post.excerpt || "", false);

  return {
    title,
    excerpt,
    content,
    meta_title,
    meta_description,
    slug: slugify(title || post.slug),
    status: "draft" as const,
    generated_at: new Date().toISOString(),
    provider: "deepl" as const,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { post_id } = await req.json();
    if (!post_id) {
      return new Response(JSON.stringify({ error: "post_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: post, error } = await supabase.from("posts").select("*").eq("id", post_id).maybeSingle();
    if (error || !post) throw error || new Error("post not found");

    const en = await translateEnglish(post);

    // Preserve manual edits: if a reviewed/published EN version already
    // exists, do NOT overwrite it.
    const existing = post.translations?.en;
    const shouldPreserve = existing && (existing.status === "reviewed" || existing.status === "published");
    const nextEn = shouldPreserve ? existing : en;

    const translations = { ...(post.translations || {}), en: nextEn };

    const { error: upErr } = await supabase
      .from("posts")
      .update({ translations, auto_translated_at: new Date().toISOString() })
      .eq("id", post_id);
    if (upErr) throw upErr;

    return new Response(
      JSON.stringify({ ok: true, post_id, preserved: shouldPreserve, status: nextEn.status, provider: "deepl" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("auto-translate-post error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
