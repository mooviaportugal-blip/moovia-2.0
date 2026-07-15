import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Shield, Trash2, UserPlus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { createAdminUser, updateAdminUser, deleteAdminUser } from "@/lib/admin-team.functions";

export const Route = createFileRoute("/admin/settings/team")({
  component: TeamPage,
});

type AdminUser = {
  id: string;
  name: string | null;
  role: "owner" | "admin" | "editor" | "viewer";
  allowed_tabs: string[] | null;
  created_at: string | null;
};

// Keep in sync with AdminSidebar menu
export const ADMIN_TABS = [
  { key: "/admin", label: "Dashboard" },
  { key: "/admin/leads", label: "Leads / CRM" },
  { key: "/admin/assessments", label: "Assessments" },
  { key: "/admin/blog", label: "Blog" },
  { key: "/admin/content", label: "Conteúdo / CMS" },
  { key: "/admin/legal", label: "Páginas Legais" },
  { key: "/admin/maia", label: "MAIA / IA" },
  { key: "/admin/chat", label: "Chatbot" },
  { key: "/admin/analytics", label: "Analytics" },
  { key: "/admin/ux", label: "UX Insights" },
  { key: "/admin/settings", label: "Configurações" },
];

function TeamPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "editor" as "admin" | "editor" | "viewer",
    allowed_tabs: [] as string[],
  });

  const createFn = useServerFn(createAdminUser);
  const updateFn = useServerFn(updateAdminUser);
  const deleteFn = useServerFn(deleteAdminUser);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setUsers((data as AdminUser[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function toggleTab(list: string[], key: string): string[] {
    return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createFn({ data: form });
      toast.success("Administrador criado");
      setForm({ email: "", password: "", name: "", role: "editor", allowed_tabs: [] });
      load();
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar");
    } finally {
      setSaving(false);
    }
  }

  async function saveRow(u: AdminUser) {
    try {
      await updateFn({ data: { id: u.id, role: u.role, allowed_tabs: u.allowed_tabs || [], name: u.name || "" } });
      toast.success("Atualizado");
      load();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remover este administrador? A conta de login também será excluída.")) return;
    try {
      await deleteFn({ data: { id } });
      toast.success("Removido");
      load();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <Link to="/admin/settings" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-[11px] uppercase tracking-widest">
        <ArrowLeft size={14} /> Voltar
      </Link>
      <div className="flex items-center gap-3">
        <Shield className="text-gold" />
        <h1 className="font-amotha text-4xl text-white">Equipa e Permissões</h1>
      </div>

      <form onSubmit={add} className="bg-black-2 border border-border rounded-lg p-8 space-y-5">
        <h3 className="font-amotha text-lg text-white flex items-center gap-2">
          <UserPlus size={16} className="text-gold" /> Adicionar Administrador
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required type="email" placeholder="E-mail" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold" />
          <input required type="password" minLength={6} placeholder="Senha (mín. 6)" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold" />
          <input required placeholder="Nome completo" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })}
            className="bg-black border border-border p-3 text-sm text-white outline-none focus:border-gold">
            <option value="admin">admin (acesso total)</option>
            <option value="editor">editor (abas específicas)</option>
            <option value="viewer">viewer (abas específicas)</option>
          </select>
        </div>

        {form.role !== "admin" && (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/60 mb-3">Abas liberadas</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ADMIN_TABS.map((t) => {
                const active = form.allowed_tabs.includes(t.key);
                return (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => setForm({ ...form, allowed_tabs: toggleTab(form.allowed_tabs, t.key) })}
                    className={`text-left text-sm px-3 py-2 rounded-md border transition-all ${
                      active
                        ? "bg-gold/20 border-gold text-gold shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                        : "bg-black/40 border-white/10 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

          </div>
        )}

        <button disabled={saving} className="px-6 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold disabled:opacity-50">
          {saving ? "Criando..." : "Criar administrador"}
        </button>
      </form>

      <div className="space-y-3">
        {loading && <p className="text-white/40 text-sm">Carregando…</p>}
        {!loading && users.length === 0 && <p className="text-white/40 text-sm">Nenhum admin.</p>}
        {users.map((u) => (
          <div key={u.id} className="bg-black-2 border border-border rounded-lg p-5 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white font-semibold">{u.name || "—"}</p>
                <p className="text-white/40 font-mono text-xs">{u.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={u.role}
                  disabled={u.role === "owner"}
                  onChange={(e) => setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, role: e.target.value as any } : x))}
                  className="bg-black border border-border px-3 py-2 text-xs text-white disabled:opacity-50">
                  {u.role === "owner" && <option value="owner">owner</option>}
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                </select>
                <button onClick={() => saveRow(u)} className="p-2 bg-gold/10 text-gold hover:bg-gold/20 rounded" title="Salvar">
                  <Save size={14} />
                </button>
                {u.role !== "owner" && (
                  <button onClick={() => remove(u.id)} className="p-2 text-red-400 hover:text-red-300" title="Remover">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {u.role !== "owner" && u.role !== "admin" && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Abas liberadas</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ADMIN_TABS.map((t) => {
                    const tabs = u.allowed_tabs || [];
                    const active = tabs.includes(t.key);
                    return (
                      <button
                        type="button"
                        key={t.key}
                        onClick={() => setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, allowed_tabs: toggleTab(tabs, t.key) } : x))}
                        className={`text-left text-xs px-3 py-2 rounded-md border transition-all ${
                          active
                            ? "bg-gold/20 border-gold text-gold shadow-[0_0_10px_rgba(212,175,55,0.45)]"
                            : "bg-black/40 border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
