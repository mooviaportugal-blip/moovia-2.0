import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  MessageSquare, User, Bot, Clock, ChevronRight, Search, UserCheck,
  Mail, Phone, Globe, MapPin, ExternalLink, Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/chat")({
  component: AdminChat,
});

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  city: string | null;
  country: string | null;
  ip_hash: string | null;
  temperature: string | null;
  status: string | null;
};

type Session = {
  id: string;
  session_id: string | null;
  created_at: string;
  messages: any[];
  lead_id: string | null;
  lead_captured: boolean;
  page_url: string | null;
  duration_secs: number | null;
  lead?: Lead | null;
};

function AdminChat() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [active, setActive] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    // Trigger cleanup of chats older than 60 days (admin-only RPC)
    supabase.rpc("cleanup_old_chat_logs" as any).then(({ data, error }) => {
      if (!error && typeof data === "number" && data > 0) {
        toast.success(`${data} conversa(s) antigas removidas (>60 dias)`);
      }
    });
    fetchSessions();
  }, []);

  async function deleteSession(s: Session, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(`Deletar esta conversa? Esta ação não pode ser desfeita.`)) return;
    try {
      const { error } = await supabase.from("chat_logs").delete().eq("id", s.id);
      if (error) throw error;
      setSessions((prev) => prev.filter((x) => x.id !== s.id));
      if (active?.id === s.id) setActive(null);
      toast.success("Conversa deletada");
    } catch (err: any) {
      toast.error(`Erro ao deletar: ${err?.message || err}`);
    }
  }

  async function fetchSessions() {
    setLoading(true);
    try {
      const { data: logs, error } = await supabase
        .from("chat_logs")
        .select("id,session_id,created_at,messages,lead_id,lead_captured,page_url,duration_secs")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;

      const rows = (logs as any[]) || [];
      const leadIds = Array.from(
        new Set(rows.map((r) => r.lead_id).filter(Boolean)),
      ) as string[];

      let leadsById: Record<string, Lead> = {};
      if (leadIds.length > 0) {
        const { data: leadsData, error: leadsErr } = await supabase
          .from("leads")
          .select("id,name,email,whatsapp,city,country,ip_hash,temperature,status")
          .in("id", leadIds);
        if (leadsErr) console.warn("[admin.chat] leads fetch warning", leadsErr);
        for (const l of (leadsData as any[]) || []) leadsById[l.id] = l as Lead;
      }

      const seen = new Set<string>();
      const unique: Session[] = rows
        .filter((row) => {
          const key = row.session_id || row.id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((row) => ({
          ...row,
          messages: Array.isArray(row.messages) ? row.messages : [],
          lead: row.lead_id ? leadsById[row.lead_id] || null : null,
        }));

      setSessions(unique);
      if (unique.length > 0) setActive(unique[0]);
    } catch (e: any) {
      console.error("[admin.chat] fetch error", e);
      toast.error(`Erro ao carregar conversas: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return sessions;
    return sessions.filter((s) =>
      (s.lead?.name || "").toLowerCase().includes(term) ||
      (s.lead?.email || "").toLowerCase().includes(term) ||
      (s.lead?.whatsapp || "").toLowerCase().includes(term) ||
      (s.session_id || "").toLowerCase().includes(term) ||
      (s.messages || []).some((m: any) => (m.content || "").toLowerCase().includes(term)),
    );
  }, [sessions, q]);

  return (
    <div className="space-y-8 h-[calc(100vh-160px)] flex flex-col">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">Chatbot · Conversas e Leads</h1>
        <p className="font-urbanist text-white/30 uppercase tracking-widest text-[11px]">
          {sessions.length} conversa{sessions.length === 1 ? "" : "s"} · clique para ver o lead vinculado
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* SESSIONS LIST */}
        <aside className="w-80 flex flex-col gap-0 bg-black-2 border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-black-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pesquisar por nome, email, sessão…"
                className="w-full bg-black border border-border pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-gold"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading && <div className="p-6 text-white/20 text-xs uppercase tracking-widest">A carregar…</div>}
            {!loading && filtered.length === 0 && (
              <div className="p-6 text-white/20 text-xs uppercase tracking-widest">Nenhuma conversa.</div>
            )}
            {filtered.map((s) => {
              const last = s.messages?.[s.messages.length - 1]?.content || "Conversa vazia";
              const name = s.lead?.name || (s.lead_captured ? "Lead capturado" : "Anônimo");
              return (
                <div
                  key={s.id}
                  onClick={() => setActive(s)}
                  className={cn(
                    "w-full p-5 text-left border-b border-border transition-all cursor-pointer group relative",
                    active?.id === s.id ? "bg-white/5" : "hover:bg-white/[0.02]",
                  )}
                >
                  <button
                    onClick={(e) => deleteSession(s, e)}
                    aria-label="Deletar conversa"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="flex items-center justify-between mb-2 pr-6">
                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold truncate">{name}</span>
                    {s.lead?.temperature && (
                      <span className={cn(
                        "text-[8px] uppercase font-bold px-1.5 py-0.5 rounded",
                        s.lead.temperature === "hot" ? "bg-red-500/20 text-red-400" :
                        s.lead.temperature === "warm" ? "bg-gold/20 text-gold" : "bg-white/5 text-white/40",
                      )}>{s.lead.temperature}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 font-urbanist line-clamp-2">{last}</p>
                  <p className="text-[9px] text-white/20 uppercase tracking-widest mt-2">
                    {format(new Date(s.created_at), "HH:mm · d MMM", { locale: ptBR })} · {s.messages?.length || 0} msg
                  </p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* MAIN PANE */}
        <div className="flex-1 bg-black-2 border border-border rounded-lg flex overflow-hidden">
          {!active ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <MessageSquare size={48} className="text-white/10 mb-6" />
              <p className="text-white/20 uppercase tracking-widest text-xs font-bold font-urbanist">Selecione uma conversa</p>
            </div>
          ) : (
            <>
              {/* CONVERSATION */}
              <div className="flex-1 flex flex-col">
                <div className="p-5 border-b border-border bg-black-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-urbanist text-[11px] uppercase tracking-widest text-gold font-bold">
                      Sessão {(active.session_id || active.id).slice(0, 8)}…
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-[10px] text-white/40">
                      <span className="flex items-center gap-1"><Clock size={10} /> {active.duration_secs || 0}s</span>
                      <span className="flex items-center gap-1"><MessageSquare size={10} /> {active.messages?.length || 0} msgs</span>
                      {active.page_url && (
                        <a href={active.page_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold">
                          <ExternalLink size={10} /> origem
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {(active.messages || []).map((msg: any, i: number) => (
                    <div key={i} className={cn("max-w-[80%] flex gap-3", msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        msg.role === "user" ? "bg-white/5 text-white/40" : "bg-gold text-black",
                      )}>
                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-lg border",
                        msg.role === "user" ? "bg-black-3 border-border text-white/80 rounded-tr-none" : "bg-white/5 border-gold/20 text-white/90 rounded-tl-none border-l-4 border-l-gold",
                      )}>
                        <p className="font-urbanist text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEAD INFO PANEL */}
              <aside className="w-80 border-l border-border bg-black-3 overflow-y-auto">
                <div className="p-5 border-b border-border flex items-center gap-2">
                  <UserCheck size={14} className={active.lead ? "text-gold" : "text-white/30"} />
                  <h3 className="font-urbanist text-[11px] uppercase tracking-widest text-gold font-bold">
                    {active.lead ? "Lead vinculado" : "Visitante anônimo"}
                  </h3>
                </div>
                {active.lead ? (
                  <div className="p-5 space-y-5">
                    <LeadField icon={User} label="Nome" value={active.lead.name} />
                    <LeadField icon={Mail} label="E-mail" value={active.lead.email} href={active.lead.email ? `mailto:${active.lead.email}` : undefined} />
                    <LeadField icon={Phone} label="WhatsApp" value={active.lead.whatsapp} href={active.lead.whatsapp ? `https://wa.me/${active.lead.whatsapp.replace(/\D/g, "")}` : undefined} />
                    <LeadField icon={MapPin} label="Localização" value={[active.lead.city, active.lead.country].filter(Boolean).join(" · ") || null} />
                    <LeadField icon={Globe} label="IP (hash)" value={active.lead.ip_hash} mono />

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-urbanist text-[10px] uppercase tracking-widest text-white/40">Status</span>
                        <span className="text-xs text-white">{active.lead.status || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-urbanist text-[10px] uppercase tracking-widest text-white/40">Temperatura</span>
                        <span className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5 rounded",
                          active.lead.temperature === "hot" ? "bg-red-500/20 text-red-400" :
                          active.lead.temperature === "warm" ? "bg-gold/20 text-gold" : "bg-white/5 text-white/40",
                        )}>{active.lead.temperature || "cold"}</span>
                      </div>
                    </div>

                    <a
                      href={`/admin/leads?id=${active.lead.id}`}
                      className="flex items-center justify-center gap-2 w-full mt-4 bg-gold text-black px-4 py-3 font-urbanist text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-xl"
                    >
                      Abrir ficha do lead <ChevronRight size={12} />
                    </a>
                  </div>
                ) : (
                  <div className="p-5 text-xs text-white/40 font-urbanist leading-relaxed">
                    Esta conversa ainda não foi vinculada a um lead. Quando o visitante deixa nome, e-mail ou WhatsApp no chat, os dados aparecem aqui.
                  </div>
                )}
              </aside>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LeadField({ icon: Icon, label, value, href, mono }: { icon: any; label: string; value: string | null; href?: string; mono?: boolean }) {
  const content = value ? (
    href ? <a href={href} target="_blank" rel="noreferrer" className="text-white hover:text-gold transition-colors">{value}</a> : <span className="text-white">{value}</span>
  ) : <span className="text-white/20">—</span>;
  return (
    <div>
      <div className="flex items-center gap-2 mb-1 text-white/40">
        <Icon size={12} />
        <span className="font-urbanist text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <div className={cn("text-sm font-urbanist break-all", mono && "font-mono text-xs")}>{content}</div>
    </div>
  );
}
