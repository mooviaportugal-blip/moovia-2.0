import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/mp-test")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: setting } = await supabaseAdmin
          .from("site_settings").select("value").eq("key", "mp_sandbox").maybeSingle();
        const sandbox = String(setting?.value ?? "").toLowerCase() === "true";
        const token = sandbox
          ? (process.env.MP_ACCESS_TOKEN_TEST ?? process.env.MERCADOPAGO_TEST_ACCESS_TOKEN)
          : process.env.MERCADOPAGO_ACCESS_TOKEN;

        if (!token) {
          return Response.json({ ok: false, sandbox, error: "token ausente" }, { status: 500 });
        }

        const body = {
          transaction_amount: 1,
          description: "MOOVIA sandbox test",
          payment_method_id: "pix",
          payer: {
            email: "test_user_123@testuser.com",
            first_name: "Test",
            last_name: "User",
            identification: { type: "CPF", number: "19119119100" },
          },
        };

        const res = await fetch("https://api.mercadopago.com/v1/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Idempotency-Key": crypto.randomUUID(),
          },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        return Response.json({
          ok: res.ok,
          status: res.status,
          sandbox,
          tokenPrefix: token.slice(0, 12),
          mp: {
            id: json.id,
            status: json.status,
            status_detail: json.status_detail,
            message: json.message,
            error: json.error,
            hasQr: !!json?.point_of_interaction?.transaction_data?.qr_code,
          },
        });
      },
    },
  },
});
