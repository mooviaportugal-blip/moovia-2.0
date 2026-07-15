import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AddressSchema = z.object({
  zip_code: z.string().max(20).optional().default(""),
  street_name: z.string().max(200).optional().default(""),
  street_number: z.string().max(20).optional().default(""),
  neighborhood: z.string().max(120).optional().default(""),
  city: z.string().max(120).optional().default(""),
  federal_unit: z.string().max(10).optional().default(""),
}).partial().optional();

const PayerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(6).max(40).optional().default(""),
  fiscalId: z.string().max(40).optional().default(""),
  address: AddressSchema,
});

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidCPF(raw: string) {
  const cpf = onlyDigits(raw);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calc = (base: number) => {
    let sum = 0;
    for (let i = 0; i < base; i += 1) sum += Number(cpf[i]) * (base + 1 - i);
    const digit = (sum * 10) % 11;
    return digit === 10 ? 0 : digit;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

function isValidCNPJ(raw: string) {
  const cnpj = onlyDigits(raw);
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  const calc = (length: 12 | 13) => {
    const weights = length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, weight, index) => acc + Number(cnpj[index]) * weight, 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  return calc(12) === Number(cnpj[12]) && calc(13) === Number(cnpj[13]);
}

function normalizeIdentification(fiscalId: string) {
  const number = onlyDigits(fiscalId);
  if (number.length === 11 && isValidCPF(number)) return { type: "CPF", number };
  if (number.length === 14 && isValidCNPJ(number)) return { type: "CNPJ", number };
  return null;
}

const InputSchema = z.object({
  product: z.literal("assessment"),
  payer: PayerSchema,
});

async function isSandboxEnabled(): Promise<boolean> {
  // Sandbox desativado: /checkout opera sempre em PRODUÇÃO (igual /checkout2).
  return false;
}


async function getSetting(key: string): Promise<string | null> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("site_settings").select("value").eq("key", key).maybeSingle();
    const v = data?.value == null ? "" : String(data.value).trim();
    return v ? v : null;
  } catch { return null; }
}

async function getCreds() {
  const sandbox = await isSandboxEnabled();
  const accessToken = sandbox
    ? ((await getSetting("mp_test_access_token")) ?? process.env.MERCADOPAGO_TEST_ACCESS_TOKEN ?? process.env.MP_ACCESS_TOKEN_TEST)
    : ((await getSetting("mp_access_token")) ?? process.env.MERCADOPAGO_ACCESS_TOKEN);
  const publicKey = sandbox
    ? ((await getSetting("mp_test_public_key")) ?? process.env.MERCADOPAGO_TEST_PUBLIC_KEY ?? process.env.MP_PUBLIC_KEY_TEST)
    : ((await getSetting("mp_public_key")) ?? process.env.MERCADOPAGO_PUBLIC_KEY);
  return { sandbox, accessToken, publicKey };
}


const NET_EUR = 250;
const IVA = 0.23;
const GROSS_EUR = Number((NET_EUR * (1 + IVA)).toFixed(2));

function getAmountBRL() {
  const rate = Number(process.env.MERCADOPAGO_EUR_BRL_RATE ?? "6.0");
  return Number((GROSS_EUR * rate).toFixed(2));
}

/** Expõe a public key (segura) + config para o Brick no frontend. */
export const getMercadoPagoConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { publicKey, accessToken, sandbox } = await getCreds();
  if (!publicKey) throw new Error("MERCADOPAGO_PUBLIC_KEY não configurado.");
  if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado.");

  const pk = publicKey.trim();
  const at = accessToken.trim();
  // Sandbox: ambas devem começar com TEST-. Produção: ambas com APP_USR-.
  if (sandbox) {
    if (!pk.startsWith("TEST-")) {
      throw new Error(`Sandbox ativo, mas Public Key não é de teste (prefixo "${pk.slice(0, 8)}"). Salve uma chave TEST- em Admin → Financeiro → Gateway.`);
    }
    if (!at.startsWith("TEST-")) {
      throw new Error(`Sandbox ativo, mas Access Token não é de teste. Salve um token TEST- em Admin → Financeiro → Gateway.`);
    }
  } else {
    if (!pk.startsWith("APP_USR-")) {
      throw new Error(`Modo produção, mas Public Key inválida (prefixo "${pk.slice(0, 8)}"). Use uma chave APP_USR-.`);
    }
    if (!at.startsWith("APP_USR-")) {
      throw new Error(`Modo produção, mas Access Token inválido. Use um token APP_USR-.`);
    }
  }

  // Cross-check: PK e AT devem pertencer à MESMA aplicação MP.
  try {
    const probe = await fetch(
      `https://api.mercadopago.com/v1/payment_methods?public_key=${encodeURIComponent(pk)}`,
      { headers: { Authorization: `Bearer ${at}` } },
    );
    if (!probe.ok) {
      const body = await probe.text().catch(() => "");
      throw new Error(
        `Public Key e Access Token não pertencem à mesma aplicação Mercado Pago (HTTP ${probe.status}). ` +
        `Abra developers.mercadopago.com → Suas integrações → escolha UMA aplicação e copie AMBAS as chaves (${sandbox ? "TEST-" : "APP_USR-"}) da MESMA app em Admin → Financeiro → Gateway. Detalhe MP: ${body.slice(0, 160)}`,
      );
    }
  } catch (e: any) {
    if (e?.message?.includes("mesma aplicação")) throw e;
    // rede/timeout: não bloqueia
  }

  return {
    publicKey: pk,
    sandbox,
    amount: getAmountBRL(),
    amountEUR: GROSS_EUR,
    currency: "BRL" as const,
    publicKeyPrefix: pk.slice(0, 12),
    accessTokenPrefix: at.slice(0, 12),
  };
});

/** Processa pagamento (cartão / pix / boleto) via /v1/payments. */
const ProcessSchema = z.object({
  formData: z.record(z.string(), z.any()),
  paymentType: z.string().optional(),
  payer: PayerSchema,
});

export const processMercadoPagoPayment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ProcessSchema.parse(d))
  .handler(async ({ data }) => {
    const { accessToken } = await getCreds();
    if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado.");

    const amount = getAmountBRL();
    const origin = process.env.PUBLIC_SITE_URL ?? "https://mooviaportugal.com";
    const identification = normalizeIdentification(data.payer.fiscalId);

    if (!identification) {
      throw new Error("Informe um CPF ou CNPJ válido para concluir o pagamento.");
    }

    const normalizePaymentAddress = (address: typeof data.payer.address) => {
      if (!address) return null;
      return {
        zip_code: String(address.zip_code ?? "").replace(/\D/g, "").slice(0, 8),
        street_name: String(address.street_name ?? "").trim(),
        street_number: String(address.street_number ?? "").trim(),
        neighborhood: String(address.neighborhood ?? "").trim(),
        city: String(address.city ?? "").trim(),
        federal_unit: String(address.federal_unit ?? "").trim().toUpperCase(),
      };
    };

    const isCompletePaymentAddress = (address: ReturnType<typeof normalizePaymentAddress>) =>
      Boolean(
        address &&
          address.zip_code.length === 8 &&
          address.street_name &&
          address.street_number &&
          address.neighborhood &&
          address.city &&
          address.federal_unit.length === 2,
      );

    const address = normalizePaymentAddress(data.payer.address);
    const selectedPaymentMethod = String(
      data.paymentType ?? data.formData?.payment_method_id ?? data.formData?.payment_type_id ?? "",
    ).toLowerCase();
    const isTicketPayment =
      selectedPaymentMethod.includes("ticket") ||
      selectedPaymentMethod.includes("bol") ||
      String(data.formData?.payment_type_id ?? "").toLowerCase() === "ticket";

    if (isTicketPayment && !isCompletePaymentAddress(address)) {
      throw new Error("Para gerar boleto, preencha CEP, rua, número, bairro, cidade e UF.");
    }

    // Normaliza o payload que o Payment Brick envia (formData) para o
    // formato esperado pela API /v1/payments.
    const fd = data.formData ?? {};
    const body: Record<string, unknown> = {
      transaction_amount: amount,
      description: "Avaliação Estratégica MOOVIA",
      external_reference: `assessment_${Date.now()}`,
      notification_url: `${origin}/api/public/mercadopago-webhook`,
      statement_descriptor: "MOOVIA",
      metadata: { product: "assessment", payer_email: data.payer.email },
      ...fd,
      payer: {
        ...(fd.payer ?? {}),
        email: data.payer.email,
        first_name: data.payer.name.split(" ")[0],
        last_name: data.payer.name.split(" ").slice(1).join(" ") || data.payer.name,
        identification,
        ...(address && Object.values(address).some(Boolean)
          ? { address }
          : {}),
      },
    };

    const res = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error("[mercadopago] payment failed", res.status, json);
      const message = String(json?.message ?? "");
      if (message.toLowerCase().includes("identification")) {
        throw new Error("CPF/CNPJ inválido para o Mercado Pago. Use um documento válido; em teste, use 123.456.789-09.");
      }
      throw new Error(message || `Mercado Pago erro ${res.status}`);
    }

    // Persiste o assessment no banco (pendente/pago conforme retorno)
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const mpStatus = String(json.status ?? "");
      const paymentStatus =
        mpStatus === "approved" ? "pago"
        : mpStatus === "rejected" || mpStatus === "cancelled" ? "recusado"
        : "pendente";

      // Cria/reaproveita um lead pelo email para vincular ao assessment
      let leadId: string | null = null;
      const email = data.payer.email.toLowerCase();
      const { data: existingLead } = await supabaseAdmin
        .from("leads").select("id").eq("email", email).maybeSingle();
      if (existingLead?.id) {
        leadId = existingLead.id;
      } else {
        const { data: newLead } = await supabaseAdmin
          .from("leads")
          .insert({ name: data.payer.name, email, source: "checkout-assessment" } as any)
          .select("id").maybeSingle();
        leadId = newLead?.id ?? null;
      }

      await supabaseAdmin.from("assessments").insert({
        lead_id: leadId,
        status: paymentStatus === "pago" ? "agendado" : "pendente",
        payment_status: paymentStatus,
        payment_method: String(json.payment_type_id ?? ""),
        amount_eur: GROSS_EUR,
        mp_payment_id: String(json.id),
        mp_external_reference: String(body.external_reference),
        payer_name: data.payer.name,
        payer_email: email,
        payer_phone: data.payer.phone || null,
      } as any);

      // Lead que pagou → qualificado no CRM
      if (leadId && paymentStatus === "pago") {
        await supabaseAdmin.from("leads").update({ status: "qualificado" }).eq("id", leadId);
      }
    } catch (e) {
      console.error("[mercadopago] persist assessment failed", e);
    }


    // Extrai QR Pix quando aplicável
    const poi = (json as any).point_of_interaction?.transaction_data;
    return {
      id: json.id,
      status: json.status as "approved" | "pending" | "in_process" | "rejected" | string,
      status_detail: json.status_detail as string,
      payment_method_id: json.payment_method_id as string,
      payment_type_id: json.payment_type_id as string,
      pix: poi?.qr_code
        ? {
            qr_code: poi.qr_code as string,
            qr_code_base64: poi.qr_code_base64 as string,
            ticket_url: poi.ticket_url as string | undefined,
          }
        : null,
      boleto_url: (json as any).transaction_details?.external_resource_url ?? null,
    };
  });




/**
 * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro)
 * para a Avaliação Estratégica MOOVIA (€250 + IVA).
 *
 * Pré-requisitos:
 *   - Secret MERCADOPAGO_ACCESS_TOKEN configurado (token de PRODUÇÃO ou TESTE).
 *   - Conta Mercado Pago habilitada para receber em EUR (ou ajustar currency_id).
 *
 * Devolve: { init_point, sandbox_init_point, preference_id }
 */
export const createMercadoPagoAssessmentPreference = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    // Modo sandbox: usa credenciais de TESTE quando toggle admin ativo ou MERCADOPAGO_SANDBOX=true
    const { sandbox, accessToken } = await getCreds();
    if (!accessToken) {
      throw new Error(
        sandbox
          ? "Sandbox ativo mas MERCADOPAGO_TEST_ACCESS_TOKEN não configurado."
          : "Mercado Pago não está configurado. Adicione o secret MERCADOPAGO_ACCESS_TOKEN.",
      );
    }


    const origin =
      process.env.PUBLIC_SITE_URL ?? "https://mooviaportugal.com";
    const identification = normalizeIdentification(data.payer.fiscalId);

    if (!identification) {
      throw new Error("Informe um CPF ou CNPJ válido para concluir o pagamento.");
    }

    // Preço base (sem IVA) e IVA 23% Portugal.
    const unitPriceNet = 250;
    const ivaRate = 0.23;
    const unitPriceEUR = Number((unitPriceNet * (1 + ivaRate)).toFixed(2));

    // A conta Mercado Pago (BR) só aceita BRL. Converte via taxa
    // configurável em MERCADOPAGO_EUR_BRL_RATE (default 6.0).
    const currency = (process.env.MERCADOPAGO_CURRENCY ?? "BRL").toUpperCase();
    const rate =
      currency === "BRL"
        ? Number(process.env.MERCADOPAGO_EUR_BRL_RATE ?? "6.0")
        : 1;
    const unitPriceGross = Number((unitPriceEUR * rate).toFixed(2));

    const body = {
      items: [
        {
          id: "moovia-assessment-strategic-250",
          title: "Avaliação Estratégica MOOVIA",
          description:
            "Sessão de 60 min com Frederico Prado e Dra. Letícia de Mello + Relatório Estratégico Personalizado. Valor abatido no Mandato.",
          quantity: 1,
          currency_id: currency,
          unit_price: unitPriceGross,
          category_id: "services",
        },
      ],
      payer: {
        name: data.payer.name,
        email: data.payer.email,
        ...(data.payer.phone
          ? { phone: { area_code: "", number: data.payer.phone } }
          : {}),
        identification,
      },
      back_urls: {
        success: `${origin}/checkout?status=success`,
        pending: `${origin}/checkout?status=pending`,
        failure: `${origin}/checkout?status=failure`,
      },
      auto_return: "approved",
      statement_descriptor: "MOOVIA",
      external_reference: `assessment_${Date.now()}`,
      notification_url: `${origin}/api/public/mercadopago-webhook`,
      metadata: {
        product: "assessment",
        payer_email: data.payer.email,
      },
    };

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[mercadopago] preference creation failed", res.status, text);
      throw new Error(`Mercado Pago erro ${res.status}`);
    }

    const json = (await res.json()) as {
      id: string;
      init_point: string;
      sandbox_init_point: string;
    };

    return {
      preference_id: json.id,
      init_point: json.init_point,
      sandbox_init_point: json.sandbox_init_point,
      amount: unitPriceGross,
      currency,
    };
  });

/**
 * Preferência de TESTE real: R$ 0,50 em PRODUÇÃO (ignora toggle sandbox).
 * Usada pela rota /checkout2 para validar o fluxo end-to-end com cartão real.
 */
export const createMercadoPagoTestPreference = createServerFn({ method: "POST" })
  .handler(async () => {
    const accessToken =
      process.env.MERCADOPAGO_ACCESS_TOKEN ?? (await getSetting("mp_access_token"));
    if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado.");
    if (!accessToken.startsWith("APP_USR-")) {
      throw new Error("O Access Token salvo não é de produção (deve começar com APP_USR-).");
    }

    const origin = process.env.PUBLIC_SITE_URL ?? "https://mooviaportugal.com";
    const body = {
      items: [
        {
          id: "moovia-test-050",
          title: "Teste MOOVIA · Gateway",
          description: "Cobrança de teste real para validação do gateway.",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 0.5,
          category_id: "services",
        },
      ],
      back_urls: {
        success: `${origin}/checkout2?status=success`,
        pending: `${origin}/checkout2?status=pending`,
        failure: `${origin}/checkout2?status=failure`,
      },
      auto_return: "approved",
      statement_descriptor: "MOOVIA",
      external_reference: `test_${Date.now()}`,
      notification_url: `${origin}/api/public/mercadopago-webhook`,
      metadata: { product: "gateway_test" },
    };

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Mercado Pago erro ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { id: string; init_point: string };
    return { preference_id: json.id, init_point: json.init_point };
  });

/* ============================================================
 * VARIANTE /checkout2 — idêntica ao /checkout, mas força:
 * - credenciais de PRODUÇÃO (APP_USR-)
 * - valor fixo R$ 0,50
 * Usada para teste real end-to-end com cartão de verdade.
 * ============================================================ */

const TEST050_AMOUNT_BRL = 0.5;

export const getMercadoPagoConfigTest050 = createServerFn({ method: "GET" }).handler(async () => {
  const publicKey =
    process.env.MERCADOPAGO_PUBLIC_KEY ?? (await getSetting("mp_public_key"));
  const accessToken =
    process.env.MERCADOPAGO_ACCESS_TOKEN ?? (await getSetting("mp_access_token"));
  if (!publicKey) throw new Error("MERCADOPAGO_PUBLIC_KEY (produção) não configurada.");
  if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN (produção) não configurado.");
  const pk = publicKey.trim();
  const at = accessToken.trim();
  if (!pk.startsWith("APP_USR-")) throw new Error(`Public Key não é de produção (prefixo "${pk.slice(0, 8)}"). Use APP_USR-.`);
  if (!at.startsWith("APP_USR-")) throw new Error(`Access Token não é de produção. Use APP_USR-.`);
  return {
    publicKey: pk,
    sandbox: false,
    amount: TEST050_AMOUNT_BRL,
    amountEUR: TEST050_AMOUNT_BRL,
    currency: "BRL" as const,
    publicKeyPrefix: pk.slice(0, 12),
    accessTokenPrefix: at.slice(0, 12),
  };
});

export const processMercadoPagoPaymentTest050 = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ProcessSchema.parse(d))
  .handler(async ({ data }) => {
    const accessToken =
      process.env.MERCADOPAGO_ACCESS_TOKEN ?? (await getSetting("mp_access_token"));
    if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN (produção) não configurado.");
    if (!accessToken.startsWith("APP_USR-")) throw new Error("Access Token não é de produção (APP_USR-).");

    const origin = process.env.PUBLIC_SITE_URL ?? "https://mooviaportugal.com";
    const identification = normalizeIdentification(data.payer.fiscalId);
    if (!identification) throw new Error("Informe um CPF ou CNPJ válido.");

    const fd = data.formData ?? {};
    const body: Record<string, unknown> = {
      transaction_amount: TEST050_AMOUNT_BRL,
      description: "Teste MOOVIA · Gateway (R$ 0,50)",
      external_reference: `test050_${Date.now()}`,
      notification_url: `${origin}/api/public/mercadopago-webhook`,
      statement_descriptor: "MOOVIA",
      metadata: { product: "gateway_test_050", payer_email: data.payer.email },
      ...fd,
      payer: {
        ...(fd.payer ?? {}),
        email: data.payer.email,
        first_name: data.payer.name.split(" ")[0],
        last_name: data.payer.name.split(" ").slice(1).join(" ") || data.payer.name,
        identification,
      },
    };

    const res = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("[mp test050] payment failed", res.status, json);
      throw new Error(String(json?.message ?? `Mercado Pago erro ${res.status}`));
    }

    // Persiste o assessment de TESTE (aparece no Assessments Tracker)
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const mpStatus = String(json.status ?? "");
      const paymentStatus =
        mpStatus === "approved" ? "pago"
        : mpStatus === "rejected" || mpStatus === "cancelled" ? "recusado"
        : "pendente";

      let leadId: string | null = null;
      const email = data.payer.email.toLowerCase();
      const { data: existingLead } = await supabaseAdmin
        .from("leads").select("id").eq("email", email).maybeSingle();
      if (existingLead?.id) {
        leadId = existingLead.id;
      } else {
        const { data: newLead } = await supabaseAdmin
          .from("leads")
          .insert({ name: data.payer.name, email, source: "checkout2-test050" } as any)
          .select("id").maybeSingle();
        leadId = newLead?.id ?? null;
      }

      await supabaseAdmin.from("assessments").insert({
        lead_id: leadId,
        status: paymentStatus === "pago" ? "agendado" : "pendente",
        payment_status: paymentStatus,
        payment_method: String(json.payment_type_id ?? ""),
        amount_eur: TEST050_AMOUNT_BRL,
        mp_payment_id: String(json.id),
        mp_external_reference: String(body.external_reference),
        payer_name: data.payer.name,
        payer_email: email,
        payer_phone: data.payer.phone || null,
      } as any);

      if (leadId && paymentStatus === "pago") {
        await supabaseAdmin.from("leads").update({ status: "qualificado" }).eq("id", leadId);
      }
    } catch (e) {
      console.error("[mp test050] persist assessment failed", e);
    }

    const poi = (json as any).point_of_interaction?.transaction_data;
    return {
      id: json.id,
      status: json.status as string,
      status_detail: json.status_detail as string,
      payment_method_id: json.payment_method_id as string,
      payment_type_id: json.payment_type_id as string,
      pix: poi?.qr_code
        ? {
            qr_code: poi.qr_code as string,
            qr_code_base64: poi.qr_code_base64 as string,
            ticket_url: poi.ticket_url as string | undefined,
          }
        : null,
      boleto_url: (json as any).transaction_details?.external_resource_url ?? null,
    };
  });
