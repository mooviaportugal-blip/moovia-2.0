// Auto-translate post (PT -> EN, ES) using Lovable AI Gateway (Gemini).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const AI_MODEL = "google/gemini-2.5-flash";

const LANG_NAMES: Record<"en" | "es", string> = {
  en: "English",
  es: "Spanish (neutral, Latin American)",
};

async function aiTranslate(text: string, target: "en" | "es", isHtml: boolean): Promise<string> {
  if (!text || !text.trim()) return text;
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("LOVABLE_API_KEY missing");
    return text;
  }
  const system = `You are a professional translator. Translate the user message from Portuguese (pt-PT) into ${LANG_NAMES[target]}.

STRICT RULES:
- Translate ONLY what is provided. Do NOT add, expand, summarize, explain, continue, or invent content.
- Output MUST have the same structure and approximately the same length as the input.
- Preserve names and brand terms exactly: MOOVIA, NIF, NHR, IFICI, RNH, D7, D2, D3.
- Do NOT wrap the output in quotes, code fences, or markdown.
- Do NOT add prefixes like "Translation:" or commentary of any kind.
${
    isHtml
      ? "- Input is HTML. Preserve every tag, attribute and structural element exactly. Translate only visible text nodes."
      : "- Input is short plain text (a title, excerpt or meta tag). Return ONLY the translated line, nothing else."
  }`;
  try {
    const res = await fetch(AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: text },
        ],
      }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) {
      console.error("AI gateway error", res.status, await res.text().catch(() => ""));
      return text;
    }
    const json = await res.json();
    let out = json?.choices?.[0]?.message?.content;
    if (typeof out !== "string" || !out.trim()) return text;
    out = out.trim().replace(/^```[a-z]*\n?|\n?```$/gi, "").trim();
    // Safety net for short fields: if model hallucinated extra content, keep only the first line
    // and cap to 3x the source length.
    if (!isHtml) {
      const firstLine = out.split(/\r?\n/)[0].trim();
      const maxLen = Math.max(160, text.length * 3);
      out = (firstLine.length > 0 ? firstLine : out).slice(0, maxLen);
    }
    return out;
  } catch (e) {
    console.error("AI translate failed", e);
    return text;
  }
}


function slugify(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

async function translateForLocale(post: any, target: "en" | "es") {
  const [title, excerpt, content, meta_title, meta_description] = await Promise.all([
    aiTranslate(post.title || "", target, false),
    aiTranslate(post.excerpt || "", target, false),
    aiTranslate(post.content || "", target, true),
    aiTranslate(post.meta_title || post.title || "", target, false),
    aiTranslate(post.meta_description || post.excerpt || "", target, false),
  ]);
  return {
    title, excerpt, content, meta_title, meta_description,
    slug: slugify(title || post.slug),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { post_id } = await req.json();
    if (!post_id) return new Response(JSON.stringify({ error: "post_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: post, error } = await supabase.from("posts").select("*").eq("id", post_id).maybeSingle();
    if (error || !post) throw error || new Error("post not found");

    const [en, es] = await Promise.all([
      translateForLocale(post, "en"),
      translateForLocale(post, "es"),
    ]);

    const translations = { ...(post.translations || {}), en, es };

    const { error: upErr } = await supabase
      .from("posts")
      .update({ translations, auto_translated_at: new Date().toISOString() })
      .eq("id", post_id);
    if (upErr) throw upErr;

    return new Response(JSON.stringify({ ok: true, post_id, locales: ["en", "es"] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("auto-translate-post error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
