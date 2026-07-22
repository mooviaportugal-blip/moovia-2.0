// Auto-translate post (PT -> EN) using Lovable AI Gateway with a MOOVIA
// brand glossary. Writes into posts.translations.en with status="draft" so
// the admin must explicitly promote to "published" before the EN version
// shows up on /blog when locale=en.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
// Claude Sonnet: better fidelity for brand terminology than Gemini Flash.
const AI_MODEL = "anthropic/claude-sonnet-4-5";

const GLOSSARY = `
MOOVIA BRAND GLOSSARY — preserve these terms EXACTLY, never translate, never confuse them with each other:

- MOOVIA (brand name)
- Global Mobility Assurance (the category MOOVIA created — B2B)
- GMA (abbreviation for Global Mobility Assurance)
- Global Mobility Success (the outcome — B2C service line)
- GMS (abbreviation for Global Mobility Success)
- Human Mobility Risk (the problem MOOVIA solves) — NEVER write "Global Mobility Risk"
- Human Mobility Assurance (methodological framing)
- Risk Intelligence (the methodology)
- NIF, NHR, IFICI, RNH, D7, D2, D3 (Portuguese legal/tax terms — keep as-is)
- MAIA (name of the AI assistant)

Nomenclature rules:
- Do NOT use "relocation", "expat services", or "immigration consulting" as translations for MOOVIA's offering.
- "Assessment Estratégico" -> "Strategic Assessment"
- "Discovery Call" stays in English.
- Keep the four category terms (GMA, GMS, Human Mobility Risk, Risk Intelligence) untouched even when the surrounding sentence is translated.
`;

async function aiTranslate(text: string, isHtml: boolean): Promise<string> {
  if (!text || !text.trim()) return text;
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("LOVABLE_API_KEY missing");
    return text;
  }
  const system = `You are MOOVIA's in-house translator. Translate the user message from Portuguese (pt-BR/pt-PT) into professional, publication-ready English.

${GLOSSARY}

STRICT RULES:
- Translate ONLY what is provided. Do NOT add, expand, summarize, explain, continue, or invent content.
- Output MUST have the same structure and approximately the same length as the input.
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
      signal: AbortSignal.timeout(90000),
    });
    if (!res.ok) {
      console.error("AI gateway error", res.status, await res.text().catch(() => ""));
      return text;
    }
    const json = await res.json();
    let out = json?.choices?.[0]?.message?.content;
    if (typeof out !== "string" || !out.trim()) return text;
    out = out.trim().replace(/^```[a-z]*\n?|\n?```$/gi, "").trim();
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

async function translateEnglish(post: any) {
  const [title, excerpt, content, meta_title, meta_description] = await Promise.all([
    aiTranslate(post.title || "", false),
    aiTranslate(post.excerpt || "", false),
    aiTranslate(post.content || "", true),
    aiTranslate(post.meta_title || post.title || "", false),
    aiTranslate(post.meta_description || post.excerpt || "", false),
  ]);
  return {
    title,
    excerpt,
    content,
    meta_title,
    meta_description,
    slug: slugify(title || post.slug),
    status: "draft" as const,
    generated_at: new Date().toISOString(),
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

    // Preserve any manual edits: if a reviewed/published EN version already
    // exists, do NOT overwrite it — return the existing one so the admin can
    // decide whether to force-regenerate.
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
      JSON.stringify({ ok: true, post_id, preserved: shouldPreserve, status: nextEn.status }),
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
