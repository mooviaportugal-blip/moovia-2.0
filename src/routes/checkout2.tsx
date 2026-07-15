import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import {
  getMercadoPagoConfigTest050 as getMercadoPagoConfig,
  processMercadoPagoPaymentTest050 as processMercadoPagoPayment,
} from "@/lib/mercadopago.functions";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import mercadoPagoLogo from "@/assets/logo-mercado-pago.png.asset.json";

export const Route = createFileRoute("/checkout2")({
  validateSearch: (s: Record<string, unknown>) => ({
    status: (s.status as "success" | "pending" | "failure" | undefined) ?? undefined,
    name: typeof s.name === "string" ? s.name : undefined,
    email: typeof s.email === "string" ? s.email : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout TESTE · R$ 0,50 · MOOVIA" },
      {
        name: "description",
        content:
          "Finalize o pagamento da Avaliação Estratégica MOOVIA (€250 + IVA) com cartão ou Pix.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://mooviaportugal.com/checkout2" }],
  }),
  component: CheckoutAssessmentPage,
});

const NET = 0.5;
const VAT_RATE = 0;
const VAT = Number((NET * VAT_RATE).toFixed(2));
const GROSS = Number((NET + VAT).toFixed(2));
const EUR_BRL_RATE = 1;
const GROSS_BRL = Number((GROSS * EUR_BRL_RATE).toFixed(2));
const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const inputCls =
  "w-full bg-transparent border-0 border-b border-b18 py-3 text-[15px] font-body font-[300] text-white placeholder:text-w35/60 focus:outline-none focus:border-gold transition-colors";

type BoletoAddress = {
  zip_code: string;
  street_name: string;
  street_number: string;
  neighborhood: string;
  city: string;
  federal_unit: string;
};

const emptyBoletoAddress: BoletoAddress = {
  zip_code: "",
  street_name: "",
  street_number: "",
  neighborhood: "",
  city: "",
  federal_unit: "",
};

const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

function normalizeBoletoAddress(address: BoletoAddress): BoletoAddress {
  return {
    zip_code: address.zip_code.replace(/\D/g, "").slice(0, 8),
    street_name: address.street_name.trim(),
    street_number: address.street_number.trim(),
    neighborhood: address.neighborhood.trim(),
    city: address.city.trim(),
    federal_unit: address.federal_unit.trim().toUpperCase(),
  };
}

function isBoletoAddressComplete(address: BoletoAddress) {
  return (
    address.zip_code.length === 8 &&
    address.street_name.length > 1 &&
    address.street_number.length > 0 &&
    address.neighborhood.length > 1 &&
    address.city.length > 1 &&
    address.federal_unit.length === 2
  );
}

function getMercadoPagoErrorDetail(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (!err || typeof err !== "object") return "";

  const record = err as Record<string, unknown>;
  const cause = Array.isArray(record.cause) ? record.cause[0] : undefined;
  const causeRecord = cause && typeof cause === "object" ? (cause as Record<string, unknown>) : undefined;

  return String(
    record.message ??
      causeRecord?.description ??
      causeRecord?.code ??
      record.code ??
      "",
  );
}

function isMercadoPagoAddressAutocompleteWarning(detail: string) {
  const normalized = detail.toLowerCase();
  return (
    normalized.includes("address") ||
    normalized.includes("zip_code") ||
    normalized.includes("zipcode") ||
    normalized.includes("postal") ||
    normalized.includes("cep") ||
    normalized.includes("countries/br/zip_codes")
  );
}

type PixData = {
  qr_code: string;
  qr_code_base64: string;
  ticket_url?: string;
};

function CheckoutAssessmentPage() {
  const search = Route.useSearch();
  const router = useRouter();
  const getConfig = useServerFn(getMercadoPagoConfig);
  const processPayment = useServerFn(processMercadoPagoPayment);

  const [config, setConfig] = useState<{ publicKey: string; amount: number; sandbox?: boolean; publicKeyPrefix?: string; accessTokenPrefix?: string } | null>(null);
  const [name, setName] = useState(search.name ?? "");
  const [email, setEmail] = useState(search.email ?? "");
  const [phone, setPhone] = useState("");
  const [fiscalId, setFiscalId] = useState("");
  const [address, setAddress] = useState<BoletoAddress>(emptyBoletoAddress);
  const [zipLookup, setZipLookup] = useState<"idle" | "loading" | "not_found">("idle");
  const [accept, setAccept] = useState(false);
  const [payerReady, setPayerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pix, setPix] = useState<PixData | null>(null);
  const [boletoUrl, setBoletoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getConfig()
      .then((cfg) => {
        const w = window as unknown as { __mpInitialized?: string };
        if (w.__mpInitialized !== cfg.publicKey) {
          initMercadoPago(cfg.publicKey, { locale: "pt-BR" });
          w.__mpInitialized = cfg.publicKey;
        }
        setConfig({ publicKey: cfg.publicKey, amount: cfg.amount, sandbox: cfg.sandbox, publicKeyPrefix: (cfg as any).publicKeyPrefix, accessTokenPrefix: (cfg as any).accessTokenPrefix });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar checkout."));
  }, [getConfig]);

  // Máscara CPF/CNPJ
  const onFiscalChange = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 14);
    let masked = d;
    if (d.length <= 11) {
      masked = d
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      masked = d
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    setFiscalId(masked);
  };

  const onPhoneChange = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 13);
    if (!d.length) return setPhone("");
    // Detect country: 55 (BR) or 351 (PT); default keep raw
    let out = `+${d}`;
    if (d.startsWith("55") && d.length > 2) {
      const rest = d.slice(2);
      const ddd = rest.slice(0, 2);
      const p1 = rest.slice(2, 7);
      const p2 = rest.slice(7, 11);
      out = `+55 (${ddd}${rest.length > 2 ? ") " : ""}${p1}${p2 ? "-" + p2 : ""}`.trim();
    } else if (d.startsWith("351") && d.length > 3) {
      const rest = d.slice(3);
      const p1 = rest.slice(0, 3);
      const p2 = rest.slice(3, 6);
      const p3 = rest.slice(6, 9);
      out = `+351 ${p1}${p2 ? " " + p2 : ""}${p3 ? " " + p3 : ""}`.trim();
    }
    setPhone(out);
  };

  useEffect(() => {
    const zip = address.zip_code.replace(/\D/g, "");
    if (zip.length !== 8) {
      setZipLookup("idle");
      return;
    }

    const controller = new AbortController();
    setZipLookup("loading");
    fetch(`https://viacep.com.br/ws/${zip}/json/`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then(
        (
          data: {
            erro?: boolean;
            logradouro?: string;
            bairro?: string;
            localidade?: string;
            uf?: string;
          } | null,
        ) => {
          if (!data || data.erro) {
            setZipLookup("not_found");
            return;
          }

          setAddress((prev) => ({
            ...prev,
            street_name: data.logradouro?.trim() || prev.street_name,
            neighborhood: data.bairro?.trim() || prev.neighborhood,
            city: data.localidade?.trim() || prev.city,
            federal_unit: data.uf?.trim().toUpperCase() || prev.federal_unit,
          }));
          setZipLookup("idle");
        },
      )
      .catch((err: unknown) => {
        if ((err as { name?: string }).name !== "AbortError") setZipLookup("idle");
      });

    return () => controller.abort();
  }, [address.zip_code]);

  // Valida CPF (11 dígitos + checksum) ou CNPJ (14 dígitos + checksum)
  const isValidCPF = (raw: string) => {
    const c = raw.replace(/\D/g, "");
    if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
    const calc = (base: number) => {
      let sum = 0;
      for (let i = 0; i < base; i++) sum += parseInt(c[i]) * (base + 1 - i);
      const d = (sum * 10) % 11;
      return d === 10 ? 0 : d;
    };
    return calc(9) === parseInt(c[9]) && calc(10) === parseInt(c[10]);
  };

  const isValidCNPJ = (raw: string) => {
    const c = raw.replace(/\D/g, "");
    if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
    const calc = (length: 12 | 13) => {
      const weights = length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const sum = weights.reduce((acc, weight, index) => acc + parseInt(c[index]) * weight, 0);
      const rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };
    return calc(12) === parseInt(c[12]) && calc(13) === parseInt(c[13]);
  };

  const fiscalDigits = fiscalId.replace(/\D/g, "");
  const fiscalValid =
    fiscalDigits.length === 11
      ? isValidCPF(fiscalDigits)
      : fiscalDigits.length === 14
        ? isValidCNPJ(fiscalDigits)
        : false;
  const fiscalError = fiscalId && !fiscalValid ? "Informe um CPF ou CNPJ válido." : null;
  const boletoAddress = normalizeBoletoAddress(address);
  const boletoAddressReady = isBoletoAddressComplete(boletoAddress);
  const addressError =
    address.zip_code && !boletoAddressReady
      ? "Para boleto, preencha CEP, rua, número, bairro, cidade e UF."
      : null;

  const readyToPay =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.replace(/\D/g, "").length >= 8 &&
    fiscalValid &&
    boletoAddressReady &&
    accept;

  useEffect(() => {
    setPayerReady(readyToPay);
  }, [readyToPay]);

  const copyPix = async () => {
    if (!pix) return;
    await navigator.clipboard.writeText(pix.qr_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-10 md:py-16">
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.24em] uppercase text-w35 hover:text-gold transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Voltar para a Avaliação
        </Link>

        {search.status && (
          <StatusBanner
            status={search.status}
            onReset={() => router.navigate({ to: "/checkout2", search: {} })}
          />
        )}

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 mt-2">
          <div>
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-4">
              Checkout seguro
            </p>
            <h1 className="font-display text-[clamp(30px,4.5vw,52px)] font-[200] leading-[1.05] tracking-[-0.03em] mb-4">
              Finalizar pagamento da Avaliação Estratégica.
            </h1>
            <p className="font-body text-[15px] font-[300] text-w35 leading-[1.85] mb-10 max-w-[520px]">
              Pagamento processado com segurança pelo Mercado Pago. Cartão, Pix e Boleto — 100% no nosso site.
            </p>

            <div className="bg-black-3 border border-b18 p-8 md:p-10 space-y-5">
              <Field label="Nome completo">
                <input
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  autoComplete="name"
                />
              </Field>
              <Field label="E-mail (recibo será enviado para este endereço)">
                <input
                  required
                  type="email"
                  maxLength={180}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  autoComplete="email"
                />
              </Field>
              <Field label="WhatsApp / Telefone">
                <input
                  required
                  type="tel"
                  maxLength={20}
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  className={inputCls}
                  placeholder="+351 …"
                  autoComplete="tel"
                />
              </Field>
              <Field label="CPF / CNPJ (necessário para Pix e boleto)">
                <input
                  maxLength={18}
                  value={fiscalId}
                  onChange={(e) => onFiscalChange(e.target.value)}
                  className={inputCls}
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  aria-invalid={!!fiscalError}
                  aria-describedby={fiscalError ? "fiscal-id-error" : undefined}
                />
                {fiscalError && (
                  <span id="fiscal-id-error" className="mt-2 block font-body text-[12px] text-red-200">
                    {fiscalError}
                  </span>
                )}
              </Field>

              <div className="border-t border-b18 pt-5 space-y-4">
                <div>
                  <p className="font-body text-[11px] tracking-[0.24em] uppercase text-gold mb-1">
                    Endereço de cobrança do boleto
                  </p>
                  <p className="font-body text-[12px] font-[300] text-w35 leading-[1.6]">
                    Necessário para o boleto registrado do Mercado Pago.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="CEP">
                    <input
                      required
                      value={address.zip_code}
                      onChange={(e) =>
                        setAddress((prev) => ({ ...prev, zip_code: formatCep(e.target.value) }))
                      }
                      className={inputCls}
                      placeholder="00000-000"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      aria-invalid={!!addressError}
                      aria-describedby={addressError ? "boleto-address-error" : undefined}
                    />
                    {zipLookup === "loading" && (
                      <span className="mt-2 block font-body text-[12px] text-w35">
                        Buscando endereço pelo CEP…
                      </span>
                    )}
                    {zipLookup === "not_found" && (
                      <span className="mt-2 block font-body text-[12px] text-gold-l">
                        CEP não encontrado; preencha o endereço manualmente.
                      </span>
                    )}
                  </Field>
                  <Field label="Número">
                    <input
                      required
                      maxLength={20}
                      value={address.street_number}
                      onChange={(e) =>
                        setAddress((prev) => ({ ...prev, street_number: e.target.value }))
                      }
                      className={inputCls}
                      placeholder="123"
                      autoComplete="address-line2"
                    />
                  </Field>
                  <Field label="Rua / Avenida">
                    <input
                      required
                      maxLength={200}
                      value={address.street_name}
                      onChange={(e) =>
                        setAddress((prev) => ({ ...prev, street_name: e.target.value }))
                      }
                      className={inputCls}
                      autoComplete="address-line1"
                    />
                  </Field>
                  <Field label="Bairro">
                    <input
                      required
                      maxLength={120}
                      value={address.neighborhood}
                      onChange={(e) =>
                        setAddress((prev) => ({ ...prev, neighborhood: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Cidade">
                    <input
                      required
                      maxLength={120}
                      value={address.city}
                      onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                      className={inputCls}
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field label="UF">
                    <select
                      required
                      value={address.federal_unit}
                      onChange={(e) =>
                        setAddress((prev) => ({ ...prev, federal_unit: e.target.value }))
                      }
                      className={inputCls}
                      autoComplete="address-level1"
                    >
                      <option value="">Selecione</option>
                      {brazilianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                {addressError && (
                  <span id="boleto-address-error" className="block font-body text-[12px] text-red-200">
                    {addressError}
                  </span>
                )}
              </div>

              <label className="flex items-start gap-3 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="mt-1 accent-gold w-4 h-4"
                />
                <span className="font-body text-[12px] font-[300] text-w35 leading-[1.7]">
                  Li e aceito os{" "}
                  <Link to="/termos" className="text-gold-l underline decoration-gold/40 hover:decoration-gold">
                    Termos
                  </Link>{" "}
                  e a{" "}
                  <Link to="/privacidade" className="text-gold-l underline decoration-gold/40 hover:decoration-gold">
                    Política de Privacidade
                  </Link>
                  . €{GROSS.toFixed(2)} (€{NET} + IVA 23%) abatidos integralmente no Mandato caso a família avance.
                </span>
              </label>

              {error && (
                <div className="flex items-start gap-3 border border-red-400/30 bg-red-500/5 p-4">
                  <AlertTriangle size={18} className="text-red-300 shrink-0 mt-0.5" />
                  <p className="font-body text-[13px] text-red-200 leading-relaxed">{error}</p>
                </div>
              )}
            </div>

            {/* PAYMENT BRICK */}
            <div className="mt-6 bg-white/[0.02] border border-b18 p-6 md:p-8">
              <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-5 flex items-center gap-2">
                <Lock size={12} /> Método de pagamento
              </p>

              {!payerReady && (
                <p className="font-body text-[13px] text-w35 leading-relaxed">
                  Preencha nome, e-mail, telefone, CPF/CNPJ, endereço de cobrança e aceite os termos para desbloquear os métodos de pagamento.
                </p>
              )}

              {payerReady && (
                <div className="mb-5 inline-flex items-center gap-3 rounded-xl bg-white border border-black/5 px-4 py-2.5 shadow-sm">
                  <span className="font-body text-[11px] tracking-[0.18em] uppercase text-[#0a1a4a] font-[500]">
                    Pagamento seguro e verificado por:
                  </span>
                  <img
                    src={mercadoPagoLogo.url}
                    alt="Mercado Pago"
                    className="h-5 w-auto"
                    loading="lazy"
                  />
                </div>
              )}

              {payerReady && config?.sandbox && !pix && (
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 mb-4">
                  <p className="font-body text-[12px] font-[500] uppercase tracking-wide text-amber-300 mb-3">
                    Modo Sandbox · Cartões de teste
                  </p>
                  <p className="font-body text-[11px] text-w70 mb-3 font-mono">
                    PK: {config.publicKeyPrefix}… · AT: {config.accessTokenPrefix}…
                  </p>
                  <p className="font-body text-[12px] text-w70 mb-3 leading-relaxed">
                    Use qualquer cartão de teste do Mercado Pago (ex: <b>5031 4332 1540 6351</b>, CVV <b>123</b>, validade futura).
                    O <b>nome do titular</b> define o status. CPF de teste: <b>12345678909</b>.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] font-body">
                      <thead className="text-w35">
                        <tr className="border-b border-w15">
                          <th className="text-left py-2 pr-3 font-[500]">Titular</th>
                          <th className="text-left py-2 font-[500]">Resultado</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        {[
                          ["APRO", "Pagamento aprovado"],
                          ["OTHE", "Recusado por erro geral"],
                          ["CONT", "Pendente"],
                          ["CALL", "Recusado com validação para autorizar"],
                          ["FUND", "Recusado por quantia insuficiente"],
                          ["SECU", "Recusado por código de segurança inválido"],
                          ["EXPI", "Recusado por data de expiração"],
                          ["FORM", "Recusado por erro no formulário"],
                        ].map(([name, desc]) => (
                          <tr key={name} className="border-b border-w05">
                            <td className="py-2 pr-3 font-mono">{name}</td>
                            <td className="py-2 text-w70">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {payerReady && config && !pix && !boletoUrl && (
                <div className="mp-brick-wrap">
                <Payment
                  initialization={{
                    amount: config.amount,
                    payer: {
                      email,
                      firstName: name.trim().split(" ")[0],
                      lastName: name.trim().split(" ").slice(1).join(" ") || name.trim(),
                      entityType: fiscalDigits.length === 14 ? "association" : "individual",
                      identification: {
                        type: fiscalDigits.length === 14 ? "CNPJ" : "CPF",
                        number: fiscalDigits,
                      },
                        address: boletoAddress,
                    },
                  }}
                  customization={{
                    paymentMethods: {
                      creditCard: "all",
                      debitCard: "all",
                      bankTransfer: "all", // Pix
                      ticket: "all", // Boleto
                      maxInstallments: 12,
                    },
                    visual: {
                      style: {
                        theme: "dark",
                        customVariables: {
                          baseColor: "#AD8957",
                          formBackgroundColor: "transparent",
                          textPrimaryColor: "#ffffff",
                          textSecondaryColor: "#8a8a8a",
                          inputBackgroundColor: "rgba(255,255,255,0.03)",
                        },
                      },
                    },
                  }}
                  onSubmit={async ({ formData, selectedPaymentMethod }) => {
                    setError(null);
                    try {
                      const result = await processPayment({
                        data: {
                          formData: formData as unknown as Record<string, unknown>,
                          paymentType: selectedPaymentMethod,
                          payer: {
                            name, email, phone, fiscalId, address: boletoAddress,
                          },
                        },
                      });
                      if (result.pix) {
                        setPix(result.pix);
                        return;
                      }
                      if (result.status === "approved") {
                        router.navigate({ to: "/checkout2", search: { status: "success" } });
                        return;
                      }
                      if (result.boleto_url) {
                        setBoletoUrl(result.boleto_url);
                        try { window.open(result.boleto_url, "_blank"); } catch { /* popup pode ser bloqueado */ }
                        return;
                      }
                      router.navigate({
                        to: "/checkout2",
                        search: { status: result.status === "rejected" ? "failure" : "pending" },
                      });
                    } catch (e) {
                      setError(e instanceof Error ? e.message : "Falha no pagamento.");
                    }
                  }}
                  onError={(err: unknown) => {
                    const detail = getMercadoPagoErrorDetail(err);
                    const record = err && typeof err === "object" ? (err as Record<string, unknown>) : undefined;
                    const cause = Array.isArray(record?.cause) ? record?.cause[0] : undefined;
                    const causeRecord = cause && typeof cause === "object" ? (cause as Record<string, unknown>) : undefined;
                    const code = String(causeRecord?.code ?? record?.code ?? "");
                    const isBin = String(code).includes("get_card_bin_payment_methods_failed") || String(detail).includes("get_card_bin_payment_methods_failed");
                    if (isBin) {
                      setError(
                        config?.sandbox
                          ? "BIN não reconhecido. Use um cartão de TESTE do Mercado Pago (ex.: Mastercard 5031 4332 1540 6351, CVV 123, validade 11/30) e confirme que a Public Key salva começa com TEST-."
                          : "BIN não reconhecido. Você está em PRODUÇÃO — cartões de teste (5031…, 4235…, 4509…) não funcionam. Use um cartão real, ou ative o Sandbox em Admin → Financeiro → Gateway. Confirme também que Public Key e Access Token pertencem à MESMA conta Mercado Pago (mesmo app).",
                      );
                      return;
                    }
                    if (isMercadoPagoAddressAutocompleteWarning(detail)) {
                      setError(null);
                      return;
                    }
                    setError(
                      detail
                        ? `Erro no pagamento: ${detail}`
                        : "Não foi possível processar. Verifique os dados do cartão (número, validade, CVV e CPF/CNPJ).",
                    );
                  }}
                />
                </div>
              )}

              {pix && (
                <div className="text-center space-y-5">
                  <p className="font-display text-[22px] font-[300] text-white">
                    Escaneie o QR Code para pagar com Pix
                  </p>
                  <img
                    src={`data:image/png;base64,${pix.qr_code_base64}`}
                    alt="QR Code Pix"
                    className="mx-auto w-[240px] h-[240px] bg-white p-3 rounded"
                  />
                  <p className="font-body text-[12px] text-w35">Ou copie o código Pix:</p>
                  <div className="flex items-center gap-2 bg-black-3 border border-b18 p-3">
                    <code className="flex-1 font-mono text-[11px] text-white/80 truncate">
                      {pix.qr_code}
                    </code>
                    <button
                      onClick={copyPix}
                      className="shrink-0 flex items-center gap-2 bg-gold text-black font-body text-[11px] tracking-[0.2em] uppercase px-4 py-2"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                  <p className="font-body text-[12px] text-w35">
                    Assim que confirmado, receberá e-mail em {email}.
                  </p>
                </div>
              )}

              {boletoUrl && (
                <div className="text-center space-y-5">
                  <p className="font-display text-[22px] font-[300] text-white">
                    Boleto gerado com sucesso
                  </p>
                  <p className="font-body text-[13px] text-w35">
                    Clique abaixo para abrir, imprimir ou copiar a linha digitável. Também enviámos uma cópia para {email}.
                  </p>
                  <a
                    href={boletoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-black font-body text-[12px] tracking-[0.2em] uppercase px-6 py-3"
                  >
                    Ver / Baixar Boleto
                  </a>
                  <p className="font-body text-[12px] text-w35">
                    Compensação em até 3 dias úteis após o pagamento.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-10 self-start">
            <div className="bg-black-3 border border-b18 p-8">
              <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-5">
                Resumo do pedido
              </p>

              <div className="border-b border-b18 pb-5 mb-5">
                <h2 className="font-display text-[22px] font-[300] text-white leading-snug mb-2">
                  Avaliação Estratégica MOOVIA
                </h2>
                <p className="font-body text-[13px] font-[300] text-w35 leading-[1.75]">
                  Sessão de 60 min com Frederico Prado e Dra. Letícia de Mello, mais Relatório Estratégico Personalizado.
                </p>
              </div>

              <ul className="space-y-2 font-body text-[13px] font-[300] text-w35 mb-6">
                {[
                  "Diagnóstico de mudança para Portugal",
                  "Mapa de prioridades educacional, habitacional e patrimonial",
                  "Avaliação emocional e adaptativa (AEAI · Método Raízes e Asas)",
                  "Relatório entregue em até 5 dias úteis",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-gold shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 font-body text-[14px] font-[300] border-t border-b18 pt-5">
                <Row label="Subtotal" value={`€${NET.toFixed(2)}`} />
                <Row label="IVA (23%)" value={`€${VAT.toFixed(2)}`} />
                <div className="h-px bg-b18 my-2" />
                <Row label="Total a pagar" value={`€${GROSS.toFixed(2)}`} strong />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-w35 text-[12px]">
                    Cobrado em BRL (≈ €1 = R$ {EUR_BRL_RATE.toFixed(2)})
                  </span>
                  <span className="text-gold-l font-body text-[14px]">{fmtBRL(GROSS_BRL)}</span>
                </div>
              </div>

              <div
                className="mt-6 p-4 border-l-2 border-gold"
                style={{ background: "rgba(173,137,87,.06)" }}
              >
                <p className="font-body text-[12px] font-[300] text-white/85 leading-[1.7]">
                  <strong className="text-gold-l font-[500]">€{GROSS.toFixed(2)} abatidos no Mandato</strong>{" "}
                  se a sua família decidir avançar com a MOOVIA.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-w35">
                <ShieldCheck size={14} className="text-gold" />
                <span className="font-body text-[11px] tracking-[0.18em] uppercase">
                  Processado por Mercado Pago
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-body text-[11px] tracking-[0.24em] uppercase text-w35 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={strong ? "text-white font-[500]" : "text-w35"}>{label}</span>
      <span className={strong ? "text-gold font-display text-[20px] font-[400]" : "text-white"}>
        {value}
      </span>
    </div>
  );
}

function StatusBanner({
  status,
  onReset,
}: {
  status: "success" | "pending" | "failure";
  onReset: () => void;
}) {
  const map = {
    success: {
      accent: "text-emerald-300",
      ring: "ring-emerald-400/20",
      title: "Pagamento aprovado.",
      body: "Recebemos a sua confirmação. Em breve um founder entra em contacto para agendar a sessão.",
    },
    pending: {
      accent: "text-amber-300",
      ring: "ring-amber-400/20",
      title: "Pagamento pendente.",
      body: "O Mercado Pago está a processar. Assim que confirmado enviamos o e-mail com os próximos passos.",
    },
    failure: {
      accent: "text-red-300",
      ring: "ring-red-400/20",
      title: "O pagamento não foi concluído.",
      body: "Pode tentar novamente. Se persistir, contacte-nos.",
    },
  } as const;
  const m = map[status];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onReset();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onReset]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onReset}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[480px] bg-black-3 border border-b18 ring-1 ${m.ring} p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200`}
      >
        <p className={`font-body text-[11px] tracking-[0.32em] uppercase mb-4 ${m.accent}`}>
          {status === "success" ? "Confirmado" : status === "pending" ? "Aguardando" : "Não concluído"}
        </p>
        <p className="font-display text-[26px] font-[300] text-white leading-snug mb-3">{m.title}</p>
        <p className="font-body text-[14px] font-[300] text-w35 leading-[1.75] mb-8">{m.body}</p>
        <button
          type="button"
          onClick={onReset}
          className="w-full bg-gold text-black font-body text-[12px] tracking-[0.24em] uppercase py-3 hover:bg-gold-l transition-colors"
        >
          {status === "success" ? "Fechar" : "Recomeçar"}
        </button>
      </div>
    </div>
  );
}

