import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Wallet, Save, RefreshCw, TrendingUp, CreditCard, Eye, EyeOff, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


export const Route = createFileRoute("/admin/settings/financial")({
  component: FinancialPage,
});

const KEYS = [
  { key: "assessment_price_eur", label: "Valor Assessment (EUR, sem IVA)", type: "number", placeholder: "250" },
  { key: "iva_rate", label: "Taxa IVA (%)", type: "number", placeholder: "23" },
  { key: "eur_brl_rate", label: "Cotação EUR → BRL", type: "number", placeholder: "6.0" },
  { key: "mandato_min_eur", label: "Mandato mínimo (EUR)", type: "number", placeholder: "2500" },
];

const MP_KEYS = [
  { key: "mp_public_key", label: "Public Key (Produção)", placeholder: "APP_USR-..." },
  { key: "mp_access_token", label: "Access Token (Produção)", placeholder: "APP_USR-..." },
  { key: "mp_client_id", label: "Client ID (Produção)", placeholder: "" },
  { key: "mp_client_secret", label: "Client Secret (Produção)", placeholder: "" },
  { key: "mp_test_public_key", label: "Public Key (Sandbox)", placeholder: "TEST-..." },
  { key: "mp_test_access_token", label: "Access Token (Sandbox)", placeholder: "TEST-..." },
  { key: "mp_webhook_secret", label: "Webhook Secret (Produção)", placeholder: "" },
  { key: "mp_webhook_secret_test", label: "Webhook Secret (Sandbox)", placeholder: "" },
];

const SANDBOX_KEY = "mp_sandbox";


function FinancialPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sandbox, setSandbox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [live, setLive] = useState<{ rate: number; time: string } | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);

  async function fetchLiveRate() {
    setLiveLoading(true);
    try {
      // API gratuita, sem key, atualizada a cada ~24h
      const res = await fetch("https://open.er-api.com/v6/latest/EUR");
      const json = await res.json();
      const rate = json?.rates?.BRL;
      if (rate) setLive({ rate, time: json.time_last_update_utc || new Date().toUTCString() });
    } catch (e) {
      toast.error("Falha ao buscar cotação");
    } finally {
      setLiveLoading(false);
    }
  }

  const allKeys = [...KEYS.map((k) => k.key), ...MP_KEYS.map((k) => k.key), SANDBOX_KEY];
  useEffect(() => {
    supabase.from("site_settings").select("key, value").in("key", allKeys).then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((r: any) => {
        if (r.key === SANDBOX_KEY) setSandbox(String(r.value).toLowerCase() === "true");
        else map[r.key] = r.value;
      });
      setValues(map);
      setLoading(false);
    });
    fetchLiveRate();
    const t = setInterval(fetchLiveRate, 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [savingMp, setSavingMp] = useState(false);

  async function saveMp() {
    setSavingMp(true);
    const rows = MP_KEYS.map((k) => ({ key: k.key, value: values[k.key] ?? "", type: "text" }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSavingMp(false);
    if (error) return toast.error(error.message);
    toast.success("Credenciais Mercado Pago salvas");
  }

  async function toggleSandbox() {
    const next = !sandbox;
    setSandbox(next);
    const { error } = await supabase.from("site_settings").upsert(
      { key: SANDBOX_KEY, value: String(next), type: "boolean" },
      { onConflict: "key" },
    );
    if (error) {
      setSandbox(!next);
      toast.error(error.message);
    } else {
      toast.success(next ? "Modo Sandbox ATIVADO" : "Modo Produção ATIVADO");
    }
  }



  async function save() {
    setSaving(true);
    const rows = KEYS.map((k) => ({ key: k.key, value: values[k.key] ?? "", type: k.type }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Configurações financeiras salvas");
  }

  const price = parseFloat(values.assessment_price_eur || "250");
  const iva = parseFloat(values.iva_rate || "23");
  const rate = parseFloat(values.eur_brl_rate || "6");
  const totalEur = price * (1 + iva / 100);
  const totalBrl = totalEur * rate;

  return (
    <div className="space-y-8 max-w-3xl">
      <Link to="/admin/settings" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-[11px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Voltar
      </Link>
      <div className="flex items-center gap-3">
        <Wallet className="text-gold" />
        <h1 className="font-amotha text-4xl text-white">Financeiro</h1>
      </div>

      <div className={`rounded-lg p-6 flex items-center justify-between gap-4 border ${sandbox ? "border-amber-500/60 bg-amber-500/10" : "border-emerald-500/40 bg-emerald-500/5"}`}>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: sandbox ? "#fbbf24" : "#34d399" }}>
            Mercado Pago · Modo {sandbox ? "SANDBOX (teste)" : "PRODUÇÃO (real)"}
          </p>
          <p className="text-white/60 text-sm mt-1">
            {sandbox
              ? "Usando MERCADOPAGO_TEST_* — pagamentos NÃO são reais."
              : "Usando credenciais de produção — pagamentos reais serão processados."}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={sandbox}
          onClick={toggleSandbox}
          className={`relative w-16 h-8 rounded-full transition-colors ${sandbox ? "bg-amber-500" : "bg-white/20"}`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${sandbox ? "translate-x-8" : "translate-x-0"}`}
          />
        </button>
      </div>

      <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setGatewayOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="text-gold" size={18} />
            <div className="text-left">
              <p className="text-white font-bold text-sm">Gateway · Mercado Pago</p>
              <p className="text-white/50 text-[11px] mt-0.5">Ver e trocar credenciais (Sandbox e Produção)</p>
            </div>
          </div>
          <ChevronDown className={`text-white/50 transition-transform ${gatewayOpen ? "rotate-180" : ""}`} size={18} />
        </button>

        {gatewayOpen && (
          <div className="border-t border-border p-6 space-y-5">
            <p className="text-[11px] text-amber-300/80 bg-amber-500/5 border border-amber-500/30 rounded p-3">
              ⚠️ Valores salvos no banco (site_settings) sobrescrevem os secrets do servidor. Nunca compartilhe estas chaves.
            </p>
            {MP_KEYS.map((k) => {
              const shown = reveal[k.key];
              const val = values[k.key] || "";
              return (
                <div key={k.key} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{k.label}</label>
                  <div className="flex gap-2">
                    <input
                      type={shown ? "text" : "password"}
                      value={val}
                      onChange={(e) => setValues({ ...values, [k.key]: e.target.value })}
                      placeholder={k.placeholder}
                      className="flex-1 bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setReveal({ ...reveal, [k.key]: !shown })}
                      className="px-3 border border-border text-white/60 hover:text-gold hover:border-gold"
                      aria-label={shown ? "Ocultar" : "Mostrar"}
                    >
                      {shown ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
            <button onClick={saveMp} disabled={savingMp} className="flex items-center gap-2 px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold disabled:opacity-50">
              <Save size={14} /> {savingMp ? "Salvando..." : "Salvar Credenciais"}
            </button>
          </div>
        )}
      </div>




      <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-lg p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-gold" size={20} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-l font-bold">Cotação ao vivo · EUR → BRL</p>
            {live ? (
              <>
                <p className="text-white font-amotha text-3xl leading-tight">R$ {live.rate.toFixed(4)}</p>
                <p className="text-white/40 text-[10px] mt-1">Atualizado: {new Date(live.time).toLocaleString("pt-BR")} · fonte open.er-api.com</p>
              </>
            ) : (
              <p className="text-white/40 text-sm">{liveLoading ? "Carregando…" : "Sem dados"}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={fetchLiveRate} disabled={liveLoading} className="flex items-center gap-2 px-3 py-2 border border-gold/40 text-gold text-[10px] uppercase tracking-widest hover:bg-gold/10 disabled:opacity-50">
            <RefreshCw size={12} className={liveLoading ? "animate-spin" : ""} /> Atualizar
          </button>
          {live && (
            <button onClick={() => setValues({ ...values, eur_brl_rate: live.rate.toFixed(4) })} className="px-3 py-2 border border-white/20 text-white/70 text-[10px] uppercase tracking-widest hover:border-gold hover:text-gold">
              Usar cotação
            </button>
          )}
        </div>
      </div>

      <div className="bg-black-2 border border-border rounded-lg p-8 space-y-6">

        {loading && <p className="text-white/40 text-sm">Carregando…</p>}
        {!loading && KEYS.map((k) => (
          <div key={k.key} className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{k.label}</label>
            <input type={k.type} step="any" value={values[k.key] || ""} onChange={(e) => setValues({ ...values, [k.key]: e.target.value })} placeholder={k.placeholder}
              className="w-full bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold" />
          </div>
        ))}

        <div className="border-t border-border pt-6 space-y-2 text-sm">
          <div className="flex justify-between text-white/60"><span>Assessment c/ IVA</span><span className="text-gold font-bold">€ {totalEur.toFixed(2)}</span></div>
          <div className="flex justify-between text-white/60"><span>Equivalente BRL</span><span className="text-gold font-bold">R$ {totalBrl.toFixed(2)}</span></div>
        </div>

        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold disabled:opacity-50">
          <Save size={14} /> {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
