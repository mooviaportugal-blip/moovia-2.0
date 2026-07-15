import { supabase } from "@/integrations/supabase/client";

/**
 * Notificação para o time — enviada SEMPRE para os dois destinatários:
 *   - frederico@mooviaportugal.com
 *   - contacto@mooviaglobal.com
 *
 * Erros são silenciados para não bloquear o fluxo do usuário.
 */

const RECIPIENTS = [
  "frederico@mooviaportugal.com",
  "contacto@mooviaglobal.com",
];

export type NotifyType =
  | "form_lead"
  | "form_contact"
  | "form_assessment"
  | "maia_lead"
  | "empresas_lead"
  | "payment_confirmed";

const baseStyle = `font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#06091a;color:#f9f5ec;padding:0;`;

function timestamp() {
  return new Date().toLocaleString("pt-BR", {
    timeZone: "Europe/Lisbon",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function header(label: string, color = "#ad8957") {
  return `<div style="background:${color};padding:16px 24px;">
    <h1 style="margin:0;font-size:15px;font-weight:700;letter-spacing:0.1em;color:#06091a;">${label}</h1>
    <p style="margin:4px 0 0;font-size:12px;color:rgba(6,9,26,0.7);">${timestamp()} · Lisboa</p>
  </div>`;
}

function row(label: string, value: any) {
  const v = value === undefined || value === null || value === "" ? "—" : String(value);
  return `<tr>
    <td style="padding:10px 24px;font-size:12px;color:rgba(249,245,236,0.5);white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
    <td style="padding:10px 24px 10px 0;font-size:14px;color:#f9f5ec;vertical-align:top;">${v}</td>
  </tr>`;
}

function table(rows: string[]) {
  return `<table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(173,137,87,0.2);">${rows.join("")}</table>`;
}

const footer = `<div style="padding:16px 24px;border-top:1px solid rgba(173,137,87,0.2);font-size:11px;color:rgba(249,245,236,0.3);text-align:center;">MOOVIA Portugal · Sistema de Notificações</div>`;

function build(type: NotifyType, data: Record<string, any>): { subject: string; html: string } {
  if (type === "form_lead" || type === "form_contact") {
    const origem = type === "form_contact" ? "Página /contacto" : "Formulário Principal (Home)";
    return {
      subject: `🔔 NOVO CADASTRO FORMULÁRIO — ${data.name || "Sem nome"}`,
      html: `<div style="${baseStyle}">${header("NOVO CADASTRO FORMULÁRIO")}<div style="padding:8px 0;">${table([
        row("Nome", data.name),
        row("Email", data.email),
        row("WhatsApp", data.whatsapp),
        row("Objetivo", data.objective),
        row("Timing", data.timing),
        row("Composição", data.composition),
        row("Fase", data.phase || data.decision_phase),
        row("Mensagem", data.message),
        row("Origem", origem),
        row("Interesse", "Conversa Gratuita"),
      ])}</div>${footer}</div>`,
    };
  }

  if (type === "form_assessment") {
    return {
      subject: `🔔 NOVO CADASTRO FORMULÁRIO — Assessment · ${data.name || "Sem nome"}`,
      html: `<div style="${baseStyle}">${header("NOVO CADASTRO FORMULÁRIO — AVALIAÇÃO ESTRATÉGICA")}<div style="padding:8px 0;">${table([
        row("Nome", data.name),
        row("Email", data.email),
        row("WhatsApp", data.whatsapp),
        row("Perfil", data.profile),
        row("Timing", data.timing),
        row("Composição", data.composition),
        row("Contexto", data.context || data.message),
        row("Interesse", "Avaliação Estratégica · €250"),
        row("Status", "Aguardando contacto do founder"),
      ])}</div>${footer}</div>`,
    };
  }

  if (type === "maia_lead") {
    return {
      subject: `🤖 NOVO CADASTRO FORMULÁRIO — MAIA · ${data.name || "Sem nome"}`,
      html: `<div style="${baseStyle}">${header("NOVO CADASTRO FORMULÁRIO — MAIA CHATBOT")}<div style="padding:8px 0;">${table([
        row("Nome", data.name),
        row("WhatsApp", data.whatsapp),
        row("Email", data.email),
        row("Cidade", data.city),
        row("Resumo conv.", data.summary),
        row("Interesse", data.interest || "Não identificado"),
        row("Temperatura", data.temperature),
        row("Duração", data.duration ? `${Math.round(Number(data.duration) / 60)} min` : "—"),
      ])}</div>${footer}</div>`,
    };
  }

  if (type === "empresas_lead") {
    return {
      subject: `🏢 NOVO LEAD EMPRESAS — ${data.company || data.contact_name || "Sem empresa"}`,
      html: `<div style="${baseStyle}">${header("NOVO LEAD B2B — HUMAN MOBILITY")}<div style="padding:8px 0;">${table([
        row("Empresa", data.company),
        row("Responsável", data.contact_name),
        row("Cargo", data.role),
        row("Volume 12m", data.volume),
        row("Origem/Destino", data.origin_destination),
        row("Desafio", data.main_challenge),
        row("Programa estruturado", data.has_program),
        row("Email", data.email),
        row("Telefone", data.phone),
        row("Mensagem", data.message),
      ])}</div>${footer}</div>`,
    };
  }

  if (type === "payment_confirmed") {
    const statusColor = data.status === "approved" ? "#1E7E34" : data.status === "rejected" ? "#8B1E1E" : "#B7590A";
    const statusLabel: Record<string, string> = { approved: "✅ APROVADO", pending: "⏳ PENDENTE", rejected: "❌ REJEITADO" };
    const label = statusLabel[data.status] || String(data.status || "").toUpperCase();
    return {
      subject: `💰 PAGAMENTO ${label} — ${data.name || "Sem nome"} · ${data.amount || ""}`,
      html: `<div style="${baseStyle}">${header(`PAGAMENTO ${label}`, statusColor)}<div style="padding:8px 0;">${table([
        row("Nome", data.name),
        row("Email", data.email),
        row("WhatsApp", data.whatsapp),
        row("Produto", data.product || "Avaliação Estratégica"),
        row("Valor", data.amount),
        row("Meio", data.payment_method),
        row("Status", label),
        row("ID pagamento", data.payment_id),
        row("ID pedido", data.order_id),
        row("Pago em", data.paid_at || timestamp()),
      ])}</div>${footer}</div>`,
    };
  }

  return { subject: "MOOVIA — Notificação", html: `<pre>${JSON.stringify(data, null, 2)}</pre>` };
}

export async function notifyTeam(type: NotifyType, data: Record<string, any>) {
  try {
    const { subject, html } = build(type, data);
    await Promise.allSettled(
      RECIPIENTS.map((to) =>
        supabase.functions.invoke("send-email", {
          body: { mode: "custom", to, subject, html, replyTo: data.email },
        }),
      ),
    );
  } catch (err) {
    console.error("notifyTeam error:", err);
  }
}
