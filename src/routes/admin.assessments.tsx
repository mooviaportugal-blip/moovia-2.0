import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MoreHorizontal, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/assessments")({
  component: AdminAssessments,
  ssr: false,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  scheduled_at: string;
  amount_eur: string;
  status: string;
  payment_status: string;
  payment_method: string;
  notes: string;
};

type AssessmentKpis = {
  agendados: number;
  realizados: number;
  pagas: number;
  aguardando: number;
  receita: number;
  conv: number;
};

type AssessmentKpiRow = {
  status?: string | null;
  payment_status?: string | null;
  amount_eur?: number | string | null;
  converted_to_mandato?: boolean | null;
  mp_payment_id?: string | null;
  mp_external_reference?: string | null;
};

type AssessmentRow = AssessmentKpiRow & {
  id: string;
  lead_id?: string | null;
  created_at?: string | null;
  scheduled_at?: string | null;
  payment_method?: string | null;
  payer_name?: string | null;
  payer_email?: string | null;
  payer_phone?: string | null;
  notes?: string | null;
  leads?: {
    name?: string | null;
    email?: string | null;
    whatsapp?: string | null;
  } | null;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  scheduled_at: "",
  amount_eur: "250",
  status: "agendado",
  payment_status: "pendente",
  payment_method: "",
  notes: "",
};

function normalizeStatus(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function amountValue(value: unknown): number {
  const normalized = typeof value === "string" ? value.replace(",", ".") : value;
  const amount = Number(normalized ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

function isGatewayPayment(row: AssessmentKpiRow): boolean {
  return Boolean(String(row.mp_payment_id ?? row.mp_external_reference ?? "").trim());
}

function isAssessmentProductPayment(row: AssessmentKpiRow): boolean {
  const amount = amountValue(row.amount_eur);
  return isGatewayPayment(row) || (amount > 0 && amount < 10);
}

function isPaid(row: AssessmentKpiRow): boolean {
  return ["pago", "paid", "approved", "aprovado"].includes(normalizeStatus(row.payment_status));
}

function isWaitingPayment(row: AssessmentKpiRow): boolean {
  return ["pendente", "pending", "in_process", "aguardando"].includes(normalizeStatus(row.payment_status));
}

function isScheduled(row: AssessmentKpiRow): boolean {
  return normalizeStatus(row.status) === "agendado";
}

function isCompleted(row: AssessmentKpiRow): boolean {
  return ["realizado", "mandato"].includes(normalizeStatus(row.status));
}

function computeAssessmentKpis(rows: AssessmentKpiRow[]): AssessmentKpis {
  const totals = rows.reduce(
    (acc, row) => {
      if (!isAssessmentProductPayment(row)) return acc;

      acc.total += 1;
      if (isPaid(row)) {
        acc.pagas += 1;
        acc.receita += amountValue(row.amount_eur);
      }
      if (isWaitingPayment(row)) acc.aguardando += 1;
      if (isScheduled(row)) acc.agendados += 1;
      if (isCompleted(row)) acc.realizados += 1;
      if (row.converted_to_mandato || normalizeStatus(row.status) === "mandato") acc.mandatos += 1;
      return acc;
    },
    { agendados: 0, realizados: 0, pagas: 0, aguardando: 0, receita: 0, mandatos: 0, total: 0 },
  );

  const conv = totals.total ? (totals.mandatos / totals.total) * 100 : 0;

  return {
    agendados: totals.agendados,
    realizados: totals.realizados,
    pagas: totals.pagas,
    aguardando: totals.aguardando,
    receita: Number(totals.receita.toFixed(2)),
    conv,
  };
}

function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function AdminAssessments() {
  const [assessments, setAssessments] = useState<AssessmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [mpSandbox, setMpSandbox] = useState<boolean>(false);
  const kpis = computeAssessmentKpis(assessments);

  useEffect(() => {
    fetchAssessments();
  }, []);

  async function fetchAssessments() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*, leads(name, email, whatsapp)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const rows = (data || []) as AssessmentRow[];
      setAssessments(rows);
    } catch (e: any) {
      console.error("[admin.assessments] fetch error:", e);
      toast.error(`Erro ao carregar: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(a: any) {
    setEditingId(a.id);
    setEditing(a);
    setForm({
      name: a.payer_name || a.leads?.name || "",
      email: a.payer_email || a.leads?.email || "",
      phone: a.payer_phone || a.leads?.whatsapp || "",
      scheduled_at: toLocalInput(a.scheduled_at),
      amount_eur: String(a.amount_eur ?? "250"),
      status: a.status || "agendado",
      payment_status: a.payment_status || "pendente",
      payment_method: a.payment_method || "",
      notes: a.notes || "",
    });
    setOpen(true);
  }

  function gatewayLabel(a: any): string {
    if (!a) return "—";
    if (a.mp_payment_id || a.mp_external_reference) {
      return mpSandbox ? "Mercado Pago (sandbox)" : "Mercado Pago";
    }
    const m = String(a.payment_method || "").toLowerCase();
    if (m === "transfer") return "Transferência (manual)";
    if (m === "pix") return "Pix (manual)";
    if (m === "boleto") return "Boleto (manual)";
    if (m === "credit_card" || m === "debit_card") return "Cartão (manual)";
    if (m === "other") return "Outro (manual)";
    return "Manual";
  }


  async function deleteAssessment(id: string) {
    if (!confirm("Excluir este agendamento? Não pode ser desfeito.")) return;
    const { error } = await supabase.from("assessments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Excluído");
    setOpen(false);
    fetchAssessments();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Nome é obrigatório");
    setSaving(true);
    try {
      const patch: Record<string, any> = {
        scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
        amount_eur: Number(form.amount_eur) || 0,
        status: form.status,
        payment_status: form.payment_status,
        payment_method: form.payment_method || null,
        payer_name: form.name.trim(),
        payer_email: form.email.trim().toLowerCase() || null,
        payer_phone: form.phone.trim() || null,
        notes: form.notes.trim() || null,
      };
      // Business rules
      if (patch.payment_status === "pendente" && form.status !== "cancelado") patch.status = "pendente";
      if (patch.status === "mandato") patch.converted_to_mandato = true;
      else patch.converted_to_mandato = false;

      if (editingId) {
        const { error } = await (supabase.from("assessments") as any)
          .update(patch)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Atualizado");
      } else {
        let leadId: string | null = null;
        if (form.email.trim()) {
          const { data: existing } = await supabase
            .from("leads")
            .select("id")
            .eq("email", form.email.trim().toLowerCase())
            .maybeSingle();
          if (existing?.id) leadId = existing.id;
        }
        if (!leadId) {
          const { data: lead, error: leadErr } = await supabase
            .from("leads")
            .insert({
              name: form.name.trim(),
              email: form.email.trim().toLowerCase() || null,
              whatsapp: form.phone.trim() || null,
            } as any)
            .select("id")
            .single();
          if (leadErr) throw leadErr;
          leadId = lead.id;
        }
        const { error } = await supabase.from("assessments").insert({
          lead_id: leadId,
          ...patch,
        } as any);
        if (error) throw error;
        toast.success("Agendamento criado");
      }
      setOpen(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchAssessments();
    } catch (e: any) {
      console.error("[admin.assessments] save error:", e);
      toast.error(`Erro: ${e?.message || e}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">Assessments Tracker</h1>
          <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">
            Gestão de Diagnósticos e Agendamentos
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-gold text-black px-8 py-3 hover:bg-gold-xl transition-colors flex items-center gap-2 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold"
        >
          <Calendar size={16} /> Novo Agendamento
        </button>
      </div>

      <div key={`kpi-${assessments.length}-${kpis.pagas}-${kpis.receita}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Avaliações Pagas" value={kpis.pagas} accent="text-emerald-400" />
        <KpiCard label="Aguardando Pagamento" value={kpis.aguardando} accent="text-amber-400" />
        <KpiCard label="Agendados" value={kpis.agendados} />
        <KpiCard label="Realizados" value={kpis.realizados} />
        <KpiCard label="Receita Total" value={`€${kpis.receita.toFixed(2).replace(".", ",")}`} accent="text-gold" />
        <KpiCard label="Conversão Mandato" value={`${kpis.conv.toFixed(1)}%`} accent="text-white-2" />
      </div>


      <div className="bg-black-2 border border-border rounded-lg overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse font-urbanist">
          <thead>
            <tr className="bg-black-3 border-b border-border">
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Cliente</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Compra em</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Data Agendada</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Valor</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Status</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Pagamento</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a) => (
              <tr
                key={a.id}
                onClick={() => openEdit(a)}
                className="border-b border-border hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <td className="p-6">
                  <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                    {a.leads?.name || a.payer_name || "Desconhecido"}
                  </p>
                  {(a.payer_email || a.leads?.email) && (
                    <p className="text-[11px] text-white/40 mt-1">{a.payer_email || a.leads?.email}</p>
                  )}
                </td>
                <td className="p-6 text-xs text-white/60 whitespace-nowrap">
                  {a.created_at ? format(new Date(a.created_at), "dd/MM/yyyy · HH:mm") : "—"}
                </td>
                <td className="p-6 text-xs text-white/60 whitespace-nowrap">
                  {a.scheduled_at ? format(new Date(a.scheduled_at), "dd/MM/yyyy · HH:mm") : "Não agendado"}
                </td>
                <td className="p-6 text-xs text-gold whitespace-nowrap">
                  €{Number(a.amount_eur || 0).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                </td>
                <td className="p-6">
                  <StatusBadge status={a.status} />
                </td>
                <td className="p-6">
                  <PaymentBadge status={a.payment_status} />
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(a); }}
                    className="p-2 text-white/40 hover:text-gold transition-colors"
                    aria-label="Editar"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && assessments.length === 0 && (
          <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">
            Nenhum assessment registrado.
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => !saving && setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-black-2 border border-border rounded-lg w-full max-w-lg p-8 space-y-5 font-urbanist max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-amotha text-2xl text-white">
                {editingId ? "Editar Agendamento" : "Novo Agendamento"}
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <Field label="Nome *">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email">
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                </Field>
                <Field label="Telefone">
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
                </Field>
              </div>
              <Field label="Data & Hora">
                <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} className="input" />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Valor (€)">
                  <input type="number" step="0.01" value={form.amount_eur} onChange={(e) => setForm({ ...form, amount_eur: e.target.value })} className="input" />
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input">
                    <option value="pendente">Pendente</option>
                    <option value="agendado">Agendado</option>
                    <option value="realizado">Realizado</option>
                    <option value="mandato">Mandato (convertido)</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </Field>
                <Field label="Pagamento">
                  <select value={form.payment_status} onChange={(e) => setForm({ ...form, payment_status: e.target.value })} className="input">
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </Field>
              </div>
              {editingId && (
                <Field label="Gateway">
                  <div className="input flex items-center justify-between !cursor-default">
                    <span className={cn(
                      "font-bold",
                      editing?.mp_payment_id || editing?.mp_external_reference ? "text-emerald-400" : "text-white/70"
                    )}>
                      {gatewayLabel(editing)}
                    </span>
                    {editing?.mp_payment_id && (
                      <span className="text-[10px] text-white/40 font-mono">#{editing.mp_payment_id}</span>
                    )}
                  </div>
                </Field>
              )}
              <Field label="Tipo de Pagamento">
                <select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="input">
                  <option value="">— não definido —</option>
                  <option value="credit_card">Cartão de Crédito</option>
                  <option value="debit_card">Cartão de Débito</option>
                  <option value="pix">Pix</option>
                  <option value="boleto">Boleto</option>
                  <option value="transfer">Transferência</option>
                  <option value="other">Outro</option>
                </select>
              </Field>
              <Field label="Notas">
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input resize-none" />
              </Field>
            </div>

            <div className="flex justify-between items-center pt-2">
              {editingId ? (
                <button
                  type="button"
                  onClick={() => deleteAssessment(editingId)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 text-[11px] uppercase tracking-widest"
                >
                  <Trash2 size={14} /> Excluir
                </button>
              ) : <span />}
              <div className="flex gap-3">
                <button type="button" onClick={() => setOpen(false)} disabled={saving} className="px-6 py-2 text-white/60 hover:text-white text-xs uppercase tracking-widest">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="bg-gold text-black px-6 py-2 hover:bg-gold-xl transition-colors text-[11px] uppercase tracking-[0.2em] font-bold disabled:opacity-50">
                  {saving ? "Salvando..." : editingId ? "Salvar" : "Criar"}
                </button>
              </div>
            </div>

            <style>{`
              .input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 0.6rem 0.8rem; border-radius: 6px; font-size: 13px; }
              .input:focus { outline: none; border-color: var(--color-gold, #c9a24b); }
            `}</style>
          </form>
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, accent = "text-white" }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="bg-black-2 border border-border p-6 rounded-lg">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{label}</p>
      <p className={cn("font-amotha text-3xl", accent)}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status?: string | null }) {
  const s = String(status ?? "").toLowerCase();
  const cls =
    s === "mandato" ? "bg-gold/10 border-gold/30 text-gold" :
    s === "realizado" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
    s === "agendado" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
    s === "cancelado" ? "bg-red-500/10 border-red-500/20 text-red-400" :
    "bg-white/5 border-white/10 text-white/40";
  return (
    <span className={cn("px-3 py-1 border rounded text-[9px] uppercase tracking-widest font-bold", cls)}>
      {status || "—"}
    </span>
  );
}

function PaymentBadge({ status }: { status?: string | null }) {
  const s = String(status ?? "").toLowerCase();
  const cls =
    s === "pago" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
    s === "cancelado" ? "bg-white/5 border-white/10 text-white/40" :
    "bg-red-500/10 border-red-500/20 text-red-400";
  return (
    <span className={cn("px-3 py-1 border rounded text-[9px] uppercase tracking-widest font-bold", cls)}>
      {status || "—"}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
