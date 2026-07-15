import { createFileRoute } from "@tanstack/react-router";

// ─── Emails para o CLIENTE ────────────────────────────────────────
const shell = (bodyInner: string) => `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#06091a;border-radius:12px;overflow:hidden;">${bodyInner}<tr><td style="padding:20px 40px;border-top:1px solid rgba(173,137,87,0.15);text-align:center;"><p style="margin:0;font-size:11px;color:rgba(249,245,236,0.3);">MOOVIA Portugal · contacto@mooviaportugal.com<br/>Rua Visconde de Santarém · Lisboa, Portugal</p></td></tr></table></td></tr></table></body></html>`;

const stepRow = (n: number, title: string, desc: string) => `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td width="36" valign="top"><div style="width:28px;height:28px;background:rgba(173,137,87,0.15);border:1px solid rgba(173,137,87,0.4);border-radius:50%;text-align:center;line-height:28px;font-size:12px;color:#ad8957;font-weight:700;">${n}</div></td><td valign="top" style="padding-left:12px;"><p style="margin:0;font-size:14px;color:#f9f5ec;font-weight:600;line-height:1.4;">${title}</p><p style="margin:4px 0 0;font-size:13px;color:rgba(249,245,236,0.6);line-height:1.6;">${desc}</p></td></tr></table>`;

function buildApprovedClientEmail(name: string) {
  const first = name.split(" ")[0];
  return shell(`
    <tr><td style="background:#06091a;padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(173,137,87,0.3);"><p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#ad8957;text-transform:uppercase;">MOOVIA Portugal</p><h1 style="margin:0;font-size:22px;font-weight:300;color:#f9f5ec;line-height:1.4;">Avaliação Estratégica<br/><strong style="font-weight:600;color:#ad8957;">confirmada.</strong></h1></td></tr>
    <tr><td style="padding:32px 40px 0;text-align:center;"><div style="display:inline-block;background:#1E7E34;color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:100px;letter-spacing:0.05em;">✅ Pagamento aprovado</div></td></tr>
    <tr><td style="padding:24px 40px 0;"><p style="margin:0;font-size:16px;color:#f9f5ec;line-height:1.7;">Olá, <strong>${first}</strong>.</p><p style="margin:12px 0 0;font-size:15px;color:rgba(249,245,236,0.75);line-height:1.8;">O pagamento da sua Avaliação Estratégica foi confirmado. Um dos nossos founders vai entrar em contacto pessoalmente nas próximas horas para confirmar a data e os detalhes da sua sessão.</p></td></tr>
    <tr><td style="padding:24px 40px;"><div style="height:1px;background:rgba(173,137,87,0.2);"></div></td></tr>
    <tr><td style="padding:0 40px;"><p style="margin:0 0 16px;font-size:12px;letter-spacing:0.15em;color:#ad8957;text-transform:uppercase;font-weight:600;">O que acontece agora</p>
      ${stepRow(1, "Um founder entra em contacto", "Frederico Prado vai enviar uma mensagem pessoal para confirmar disponibilidade e agendar a sessão.")}
      ${stepRow(2, "Sessão de 60 minutos agendada", "Por videochamada (Zoom ou Google Meet), no horário que melhor funcionar para a sua família.")}
      ${stepRow(3, "Relatório Estratégico Personalizado", "Após a sessão, recebe o seu relatório com diagnóstico, estratégias e roadmap — e o Parecer Emocional Familiar da Dra. Letícia de Mello.")}
    </td></tr>
    <tr><td style="padding:24px 40px;"><div style="height:1px;background:rgba(173,137,87,0.2);"></div></td></tr>
    <tr><td style="padding:0 40px 24px;"><p style="margin:0 0 12px;font-size:12px;letter-spacing:0.15em;color:#ad8957;text-transform:uppercase;font-weight:600;">Resumo do pagamento</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px;">
        <tr><td style="font-size:13px;color:rgba(249,245,236,0.5);padding:4px 16px;">Produto</td><td style="font-size:13px;color:#f9f5ec;text-align:right;padding:4px 16px;">Avaliação Estratégica MOOVIA</td></tr>
        <tr><td style="font-size:13px;color:rgba(249,245,236,0.5);padding:4px 16px;">Valor</td><td style="font-size:13px;color:#f9f5ec;text-align:right;padding:4px 16px;">R$ 1.490,00</td></tr>
        <tr><td style="font-size:13px;color:rgba(249,245,236,0.5);padding:4px 16px;">Status</td><td style="font-size:13px;color:#1E7E34;font-weight:700;text-align:right;padding:4px 16px;">✅ Aprovado</td></tr>
      </table></td></tr>
    <tr><td style="padding:0 40px 32px;text-align:center;"><p style="margin:0 0 16px;font-size:13px;color:rgba(249,245,236,0.5);">Alguma dúvida antes da sessão?</p><a href="https://wa.me/351910388877" style="display:inline-block;background:#ad8957;color:#06091a;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.03em;">Falar no WhatsApp →</a></td></tr>
  `);
}

function buildPendingClientEmail(name: string) {
  const first = name.split(" ")[0];
  return shell(`
    <tr><td style="background:#06091a;padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(173,137,87,0.3);"><p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#ad8957;text-transform:uppercase;">MOOVIA Portugal</p><h1 style="margin:0;font-size:22px;font-weight:300;color:#f9f5ec;line-height:1.4;">Seu pagamento está<br/><strong style="font-weight:600;color:#B7590A;">pendente.</strong></h1></td></tr>
    <tr><td style="padding:32px 40px 0;text-align:center;"><div style="display:inline-block;background:#B7590A;color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:100px;letter-spacing:0.05em;">⏳ Aguardando confirmação</div></td></tr>
    <tr><td style="padding:24px 40px 0;"><p style="margin:0;font-size:16px;color:#f9f5ec;line-height:1.7;">Olá, <strong>${first}</strong>.</p><p style="margin:12px 0 0;font-size:15px;color:rgba(249,245,236,0.75);line-height:1.8;">Recebemos a sua solicitação de Avaliação Estratégica, mas o pagamento ainda não foi confirmado pelo MercadoPago.</p><p style="margin:12px 0 0;font-size:15px;color:rgba(249,245,236,0.75);line-height:1.8;">Isso pode acontecer quando o PIX demora alguns minutos para ser processado. Assim que o banco confirmar, você receberá automaticamente o email de confirmação.</p></td></tr>
    <tr><td style="padding:24px 40px;"><div style="height:1px;background:rgba(173,137,87,0.2);"></div></td></tr>
    <tr><td style="padding:0 40px 24px;"><p style="margin:0 0 16px;font-size:12px;letter-spacing:0.15em;color:#ad8957;text-transform:uppercase;font-weight:600;">O que fazer agora</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(183,89,10,0.08);border:1px solid rgba(183,89,10,0.25);border-radius:8px;padding:16px;margin-bottom:16px;"><tr><td style="font-size:14px;color:#f9f5ec;line-height:1.7;padding:0 16px;"><strong>Se já realizou o PIX:</strong><br/>Aguarde até 30 minutos. O banco pode demorar para confirmar. Você receberá um email automático assim que o pagamento for aprovado.</td></tr></table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(173,137,87,0.06);border:1px solid rgba(173,137,87,0.2);border-radius:8px;padding:16px;"><tr><td style="font-size:14px;color:#f9f5ec;line-height:1.7;padding:0 16px;"><strong>Se não realizou o PIX ainda:</strong><br/>Volte à página de checkout e complete o pagamento. O código PIX gerado pode ter expirado — nesse caso, inicie um novo pedido.</td></tr></table>
    </td></tr>
    <tr><td style="padding:0 40px 32px;text-align:center;"><a href="https://mooviaportugal.com/checkout" style="display:inline-block;background:#ad8957;color:#06091a;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;margin-bottom:12px;letter-spacing:0.03em;">Voltar ao checkout →</a><br/><a href="https://wa.me/351910388877" style="display:inline-block;font-size:13px;color:rgba(249,245,236,0.5);padding:8px;text-decoration:none;">Precisa de ajuda? Fale no WhatsApp</a></td></tr>
  `);
}

function buildRejectedClientEmail(name: string) {
  const first = name.split(" ")[0];
  return shell(`
    <tr><td style="background:#06091a;padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(173,137,87,0.3);"><p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#ad8957;text-transform:uppercase;">MOOVIA Portugal</p><h1 style="margin:0;font-size:22px;font-weight:300;color:#f9f5ec;line-height:1.4;">Não conseguimos confirmar<br/><strong style="font-weight:600;color:#8B1E1E;">seu pagamento.</strong></h1></td></tr>
    <tr><td style="padding:32px 40px 0;text-align:center;"><div style="display:inline-block;background:#8B1E1E;color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:100px;letter-spacing:0.05em;">❌ Pagamento não aprovado</div></td></tr>
    <tr><td style="padding:24px 40px 0;"><p style="margin:0;font-size:16px;color:#f9f5ec;line-height:1.7;">Olá, <strong>${first}</strong>.</p><p style="margin:12px 0 0;font-size:15px;color:rgba(249,245,236,0.75);line-height:1.8;">Infelizmente o seu pagamento não pôde ser aprovado. Nenhum valor foi cobrado. Pode tentar novamente com outro método ou falar connosco para ajudarmos.</p></td></tr>
    <tr><td style="padding:24px 40px 32px;text-align:center;"><a href="https://mooviaportugal.com/checkout" style="display:inline-block;background:#ad8957;color:#06091a;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;margin-bottom:12px;letter-spacing:0.03em;">Tentar novamente →</a><br/><a href="https://wa.me/351910388877" style="display:inline-block;font-size:13px;color:rgba(249,245,236,0.5);padding:8px;text-decoration:none;">Precisa de ajuda? Fale no WhatsApp</a></td></tr>
  `);
}


function buildPaymentEmail(d: Record<string, any>) {
  const statusColor = d.status === "approved" ? "#1E7E34" : d.status === "rejected" ? "#8B1E1E" : "#B7590A";
  const label = d.status === "approved" ? "✅ APROVADO" : d.status === "rejected" ? "❌ REJEITADO" : "⏳ PENDENTE";
  const ts = new Date().toLocaleString("pt-BR", { timeZone: "Europe/Lisbon" });
  const row = (k: string, v: any) => `<tr><td style="padding:10px 24px;font-size:12px;color:rgba(249,245,236,0.5);width:160px;vertical-align:top;">${k}</td><td style="padding:10px 24px 10px 0;font-size:14px;color:#f9f5ec;">${v ?? "—"}</td></tr>`;
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#06091a;color:#f9f5ec;">
    <div style="background:${statusColor};padding:16px 24px;"><h1 style="margin:0;font-size:15px;font-weight:700;letter-spacing:0.1em;color:#fff;">PAGAMENTO ${label}</h1><p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.8);">${ts} · Lisboa</p></div>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(173,137,87,0.2);">
      ${row("Nome", d.name)}${row("Email", d.email)}${row("WhatsApp", d.whatsapp)}${row("Produto", d.product)}${row("Valor", d.amount)}${row("Meio", d.payment_method)}${row("Status", label)}${row("ID pagamento", d.payment_id)}${row("ID pedido", d.order_id)}${row("Pago em", ts)}
    </table>
    <div style="padding:16px 24px;border-top:1px solid rgba(173,137,87,0.2);font-size:11px;color:rgba(249,245,236,0.3);text-align:center;">MOOVIA Portugal · Sistema de Notificações</div>
  </div>`;
}


/**
 * Webhook do Mercado Pago (IPN/Webhooks v2).
 *
 * Configurar no painel do Mercado Pago como:
 *   https://<seu-dominio>/api/public/mercadopago-webhook
 *
 * Eventos relevantes: payment, merchant_order.
 *
 * Em produção: validar assinatura via header `x-signature` + `x-request-id`
 * usando o webhook secret do Mercado Pago, depois buscar o pagamento em
 * https://api.mercadopago.com/v1/payments/{id} com o ACCESS_TOKEN e
 * persistir o status (approved/pending/rejected) no Lovable Cloud.
 */
export const Route = createFileRoute("/api/public/mercadopago-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const rawBody = await request.text();
          const body = rawBody ? JSON.parse(rawBody) : {};
          // Detecta sandbox pelo toggle admin para escolher token/secret corretos
          let sandbox = false;
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const { data: setting } = await supabaseAdmin
              .from("site_settings").select("value").eq("key", "mp_sandbox").maybeSingle();
            sandbox = String(setting?.value ?? "").toLowerCase() === "true";
          } catch {}
          const accessToken = sandbox
            ? (process.env.MERCADOPAGO_TEST_ACCESS_TOKEN ?? process.env.MP_ACCESS_TOKEN_TEST)
            : process.env.MERCADOPAGO_ACCESS_TOKEN;
          const webhookSecret = sandbox
            ? (process.env.MERCADOPAGO_WEBHOOK_SECRET_TEST ?? process.env.MERCADOPAGO_WEBHOOK_SECRET)
            : process.env.MERCADOPAGO_WEBHOOK_SECRET;
          const url = new URL(request.url);
          const paymentId = body?.data?.id ?? url.searchParams.get("id");

          // Valida assinatura (x-signature: ts=...,v1=...) se secret configurado.
          if (webhookSecret) {
            const sigHeader = request.headers.get("x-signature") ?? "";
            const requestId = request.headers.get("x-request-id") ?? "";
            const parts = Object.fromEntries(
              sigHeader.split(",").map((p) => {
                const [k, ...v] = p.trim().split("=");
                return [k, v.join("=")];
              }),
            );
            const ts = parts.ts;
            const v1 = parts.v1;
            const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`;
            const key = await crypto.subtle.importKey(
              "raw",
              new TextEncoder().encode(webhookSecret),
              { name: "HMAC", hash: "SHA-256" },
              false,
              ["sign"],
            );
            const sigBuf = await crypto.subtle.sign(
              "HMAC",
              key,
              new TextEncoder().encode(manifest),
            );
            const expected = Array.from(new Uint8Array(sigBuf))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");
            if (expected !== v1) {
              console.warn("[mp-webhook] invalid signature", { expected, v1 });
              return new Response("invalid signature", { status: 401 });
            }
          }


          if (accessToken && paymentId && body?.type === "payment") {
            const r = await fetch(
              `https://api.mercadopago.com/v1/payments/${paymentId}`,
              { headers: { Authorization: `Bearer ${accessToken}` } },
            );
            if (r.ok) {
              const payment = await r.json();
              const mpStatus = String(payment.status ?? "");
              const paymentStatus =
                mpStatus === "approved" ? "pago"
                : mpStatus === "rejected" || mpStatus === "cancelled" ? "recusado"
                : "pendente";
              const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
              const { data: updated } = await supabaseAdmin
                .from("assessments")
                .update({
                  payment_status: paymentStatus,
                  status: paymentStatus === "pago" ? "agendado" : "pendente",
                  payment_method: String(payment.payment_type_id ?? ""),
                  updated_at: new Date().toISOString(),
                })
                .eq("mp_payment_id", String(payment.id))
                .select("lead_id")
                .maybeSingle();

              // Lead que pagou o assessment → move para Diagnóstico no CRM
              if (paymentStatus === "pago" && updated?.lead_id) {
                await supabaseAdmin
                  .from("leads")
                  .update({ status: "diagnostico" })
                  .eq("id", updated.lead_id);
              }
              console.log("[mp-webhook] payment", { id: payment.id, status: mpStatus });

              // Helper: chama send-email via HTTP direto (mais confiável no Worker que supabaseAdmin.functions.invoke)
              const SUPABASE_URL = (process.env.SUPABASE_URL ?? process.env.EXTERNAL_SUPABASE_URL)!;
              const SUPABASE_ANON = (process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.EXTERNAL_SUPABASE_PUBLISHABLE_KEY)!;
              async function sendEmail(payload: Record<string, any>) {
                try {
                  const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${SUPABASE_ANON}`,
                      "apikey": SUPABASE_ANON,
                    },
                    body: JSON.stringify(payload),
                  });
                  const txt = await resp.text();
                  console.log("[mp-webhook] send-email", resp.status, payload.to, txt.slice(0, 200));
                  return resp.ok;
                } catch (e) {
                  console.error("[mp-webhook] send-email fetch error", e);
                  return false;
                }
              }

              // Carrega dados do lead (uma vez só) e do payer
              const leadRes = updated?.lead_id
                ? await supabaseAdmin.from("leads").select("name,email,whatsapp").eq("id", updated.lead_id).maybeSingle()
                : null;
              const leadData = leadRes?.data ?? null;
              const payer = payment.payer ?? {};
              const clientName = (leadData?.name as string | undefined)
                || `${payer.first_name ?? ""} ${payer.last_name ?? ""}`.trim()
                || "Cliente";
              const clientEmail = (leadData?.email as string | undefined) || payer.email;
              const amount = Number(payment.transaction_amount ?? 0);
              const currency = String(payment.currency_id ?? "BRL");

              // Notifica o time (frederico@ + contacto@) sobre o pagamento
              const teamSubject = `💰 PAGAMENTO ${mpStatus === "approved" ? "✅ APROVADO" : mpStatus === "rejected" ? "❌ REJEITADO" : "⏳ PENDENTE"} — ${clientName} · ${currency} ${amount.toFixed(2)}`;
              const teamHtml = buildPaymentEmail({
                name: clientName,
                email: clientEmail,
                whatsapp: leadData?.whatsapp,
                product: "Avaliação Estratégica MOOVIA",
                amount: `${currency} ${amount.toFixed(2)}`,
                payment_method: String(payment.payment_type_id ?? ""),
                status: mpStatus,
                payment_id: String(payment.id),
                order_id: updated?.lead_id ?? "",
              });
              const recipients = ["frederico@mooviaportugal.com", "contacto@mooviaglobal.com"];
              await Promise.allSettled(recipients.map((to) =>
                sendEmail({ mode: "custom", to, subject: teamSubject, html: teamHtml })
              ));

              // Email para o CLIENTE (aprovado / pendente / rejeitado)
              if (clientEmail) {
                let subject: string | null = null;
                let html: string | null = null;
                if (mpStatus === "approved") {
                  subject = `✅ Avaliação Estratégica confirmada — bem-vindo(a), ${clientName.split(" ")[0]}`;
                  html = buildApprovedClientEmail(clientName);
                } else if (mpStatus === "pending" || mpStatus === "in_process") {
                  subject = `⏳ Seu pagamento ainda está pendente — Avaliação Estratégica MOOVIA`;
                  html = buildPendingClientEmail(clientName);
                } else if (mpStatus === "rejected" || mpStatus === "cancelled") {
                  subject = `❌ Não conseguimos confirmar seu pagamento — MOOVIA Portugal`;
                  html = buildRejectedClientEmail(clientName);
                }
                if (subject && html) {
                  await sendEmail({ mode: "custom", to: clientEmail, subject, html });
                } else {
                  console.log("[mp-webhook] no client email for status", mpStatus);
                }
              } else {
                console.warn("[mp-webhook] missing clientEmail", { lead_id: updated?.lead_id, payer_email: payer.email });
              }

            }


          } else {
            console.log("[mp-webhook] event", body?.type, body?.action, paymentId);
          }

          return new Response("ok", { status: 200 });
        } catch (err) {
          console.error("[mp-webhook] error", err);
          // Devolve 200 para evitar retries em loop em payloads não suportados.
          return new Response("ok", { status: 200 });
        }
      },
      GET: async () => new Response("ok", { status: 200 }),
    },
  },
});
