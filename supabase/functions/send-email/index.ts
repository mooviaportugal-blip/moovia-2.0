// Edge Function: envia emails via SMTP Hostinger (denomailer)
// Uso:
//   POST /functions/v1/send-email
//   body: { to?: string, subject: string, html?: string, text?: string, replyTo?: string, mode?: "inbox" | "custom" }
//   - mode "inbox" (default se `to` ausente): envia para HOSTINGER_INBOX_EMAIL (form contato)
//   - mode "custom": exige `to`
//
// CORS liberado (público). Se precisar restringir, adicione verificação de origem/token.

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  to?: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  mode?: "inbox" | "custom";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const host = Deno.env.get("HOSTINGER_SMTP_HOST");
  const port = Number(Deno.env.get("HOSTINGER_SMTP_PORT") ?? "465");
  const user = Deno.env.get("HOSTINGER_SMTP_USER");
  const pass = Deno.env.get("HOSTINGER_SMTP_PASSWORD");
  const fromEmail = Deno.env.get("HOSTINGER_FROM_EMAIL") ?? user;
  const fromName = Deno.env.get("HOSTINGER_FROM_NAME") ?? "Moovia";
  const inbox = Deno.env.get("HOSTINGER_INBOX_EMAIL");

  if (!host || !user || !pass || !fromEmail) {
    console.error("SMTP env vars missing");
    return new Response(JSON.stringify({ error: "SMTP not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { subject, html, text, replyTo } = payload;
  const inboxList = inbox ? inbox.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
  const to = payload.to ?? (payload.mode === "custom" ? undefined : inboxList);

  if (!to || !subject || (!html && !text)) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: to, subject, html|text" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const client = new SMTPClient({
    connection: {
      hostname: host,
      port,
      tls: port === 465,
      auth: { username: user, password: pass },
    },
  });

  try {
    await client.send({
      from: `${fromName} <${fromEmail}>`,
      to,
      replyTo: replyTo ?? undefined,
      subject,
      content: text ?? "",
      html: html ?? undefined,
    });
    await client.close();
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("SMTP send failed:", err);
    try { await client.close(); } catch { /* ignore */ }
    return new Response(
      JSON.stringify({ error: "Failed to send email", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
