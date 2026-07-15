import { supabase } from "@/integrations/supabase/client";

type LeadPayload = Record<string, any> & {
  name?: string;
  email?: string;
  whatsapp?: string;
};

function buildLeadHtml(lead: LeadPayload) {
  const rows = Object.entries(lead)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#8a8a8a;font-family:Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">${k}</td>` +
        `<td style="padding:6px 10px;color:#111;font-family:Arial,sans-serif;font-size:14px;">${String(v)}</td></tr>`,
    )
    .join("");
  return `
    <div style="background:#0b1225;padding:32px;color:#fff;font-family:Arial,sans-serif;">
      <h2 style="color:#cead84;font-weight:200;margin:0 0 16px;">Novo lead — MOOVIA Portugal</h2>
      <p style="color:#c9c9c9;margin:0 0 24px;">Um novo formulário foi preenchido no site.</p>
      <table style="background:#fff;border-collapse:collapse;width:100%;max-width:560px;">${rows}</table>
    </div>`;
}

function buildThankYouHtml(name?: string) {
  const first = (name || "").split(" ")[0] || "";
  return `
    <div style="background:#0b1225;padding:40px;color:#fff;font-family:Arial,sans-serif;text-align:center;">
      <h1 style="color:#cead84;font-weight:200;font-size:28px;margin:0 0 16px;">Muito obrigado${first ? `, ${first}` : ""}!</h1>
      <p style="color:#e6e6e6;font-size:16px;line-height:1.7;margin:0 0 12px;">
        Recebemos o seu caso. Em breve um dos <strong style="color:#cead84;">founders</strong> da MOOVIA irá entrar em contacto com você pessoalmente.
      </p>
      <p style="color:#9a9a9a;font-size:13px;margin-top:32px;">MOOVIA Portugal · Transição de Vida e Património</p>
    </div>`;
}

/**
 * Notifica o time (inbox padrão HOSTINGER_INBOX_EMAIL, ex.: Fred) e
 * envia um agradecimento para o lead. Erros são silenciados para não
 * bloquear o UX de sucesso.
 */
export async function notifyLead(lead: LeadPayload) {
  const subjectAdmin = `Novo lead — ${lead.name || lead.email || "sem nome"}`;
  const adminHtml = buildLeadHtml(lead);

  const tasks: Promise<any>[] = [];

  // Email para o time (usa HOSTINGER_INBOX_EMAIL configurado no backend)
  tasks.push(
    supabase.functions.invoke("send-email", {
      body: {
        mode: "inbox",
        subject: subjectAdmin,
        html: adminHtml,
        replyTo: lead.email,
      },
    }),
  );

  // Email de agradecimento para o lead
  if (lead.email) {
    tasks.push(
      supabase.functions.invoke("send-email", {
        body: {
          mode: "custom",
          to: lead.email,
          subject: "Recebemos o seu caso — MOOVIA Portugal",
          html: buildThankYouHtml(lead.name),
        },
      }),
    );
  }

  try {
    await Promise.allSettled(tasks);
  } catch {
    // silencioso — analytics não deve quebrar UX
  }
}
