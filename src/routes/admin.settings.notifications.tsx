import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings/notifications")({
  component: NotificationsPage,
});

const KEYS = [
  { key: "notify_email", label: "E-mail de notificação", type: "email", placeholder: "contacto@mooviaportugal.com" },
  { key: "notify_on_new_lead", label: "Notificar em novo lead", type: "boolean" },
  { key: "notify_on_hot_lead", label: "Notificar apenas leads quentes", type: "boolean" },
  { key: "notify_on_payment", label: "Notificar em pagamento confirmado", type: "boolean" },
  { key: "notify_on_chat", label: "Notificar em novo chat MAIA", type: "boolean" },
];

function NotificationsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("key, value").in("key", KEYS.map((k) => k.key)).then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((r: any) => { map[r.key] = r.value; });
      setValues(map);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const rows = KEYS.map((k) => ({ key: k.key, value: values[k.key] ?? (k.type === "boolean" ? "false" : ""), type: k.type }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Notificações salvas");
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <Link to="/admin/settings" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-[11px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Voltar
      </Link>
      <div className="flex items-center gap-3">
        <Bell className="text-gold" />
        <h1 className="font-amotha text-4xl text-white">Notificações</h1>
      </div>

      <div className="bg-black-2 border border-border rounded-lg p-8 space-y-6">
        {loading && <p className="text-white/40 text-sm">Carregando…</p>}
        {!loading && KEYS.map((k) => (
          <div key={k.key} className="flex items-center justify-between gap-6 border-b border-border pb-6 last:border-0 last:pb-0">
            <label className="text-sm text-white flex-1">{k.label}</label>
            {k.type === "boolean" ? (
              <button
                onClick={() => setValues({ ...values, [k.key]: values[k.key] === "true" ? "false" : "true" })}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold ${values[k.key] === "true" ? "bg-gold text-black" : "bg-white/10 text-white/60"}`}
              >
                {values[k.key] === "true" ? "Ativo" : "Inativo"}
              </button>
            ) : (
              <input type={k.type} value={values[k.key] || ""} onChange={(e) => setValues({ ...values, [k.key]: e.target.value })} placeholder={k.placeholder}
                className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold w-72" />
            )}
          </div>
        ))}
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold disabled:opacity-50">
          <Save size={14} /> {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
