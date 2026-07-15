import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  Search, 
  Download, 
  Plus, 
  LayoutGrid, 
  Table as TableIcon,
  Filter,
  MoreHorizontal,
  Phone,
  ArrowRight,
  CheckSquare,
  Square,
  Trash2,
  X
} from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LeadDetailsDrawer } from "@/components/admin/LeadDetailsDrawer";

import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/admin/leads")({
  component: AdminCRM,
});

const STAGES = [
  { id: 'novo',           label: 'Novo',            color: '#ef4444' },
  { id: 'qualificado',    label: 'Qualificado',      color: '#f97316' },
  { id: 'conv_agendada',  label: 'Conversa Agendada',color: '#eab308' },
  { id: 'diagnostico',    label: 'Diagnóstico',      color: '#3b82f6' },
  { id: 'proposta',       label: 'Proposta Enviada', color: '#a855f7' },
  { id: 'mandato_ativo',  label: 'Mandato Ativo',    color: '#22c55e' },
  { id: 'frio',           label: 'Frio',             color: '#6b7280' },
];

function AdminCRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [paidAssessmentLeadIds, setPaidAssessmentLeadIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkMoveTarget, setBulkMoveTarget] = useState<string>("");
  const [showNewLead, setShowNewLead] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    objective: "",
    timing: "",
    status: "novo",
    created_at: new Date().toISOString().slice(0, 16),
    did_assessment: false,
    did_first_conversation: false,
    notes: "",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function createLead(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Nome é obrigatório"); return; }
    setSaving(true);
    try {
      let status = form.status;
      if (form.did_assessment) status = 'diagnostico';
      else if (form.did_first_conversation && status === 'novo') status = 'conv_agendada';

      const payload: any = {
        name: form.name.trim(),
        email: form.email.trim() || null,
        whatsapp: form.whatsapp.trim() || null,
        objective: form.objective || null,
        timing: form.timing || null,
        status,
        created_at: new Date(form.created_at).toISOString(),
        notes: form.notes || null,
        source: 'manual_admin',
      };
      const { error } = await supabase.from("leads").insert(payload);
      if (error) throw error;
      toast.success("Lead criado com sucesso");
      setShowNewLead(false);
      setForm({
        name: "", email: "", whatsapp: "", objective: "", timing: "",
        status: "novo", created_at: new Date().toISOString().slice(0, 16),
        did_assessment: false, did_first_conversation: false, notes: "",
      });
      fetchLeads();
    } catch (e: any) {
      toast.error(`Erro ao criar lead: ${e?.message || e}`);
    } finally {
      setSaving(false);
    }
  }

  async function fetchLeads() {
    try {
      const [{ data, error }, { data: paidRows }] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("assessments").select("lead_id, amount_eur, payment_status").eq("payment_status", "pago"),
      ]);

      if (error) throw error;
      setLeads(data || []);
      const ids = new Set<string>();
      (paidRows || []).forEach((r: any) => {
        const amt = Number(String(r.amount_eur ?? 0).replace(",", ".")) || 0;
        if (r.lead_id && amt > 0 && amt < 10) ids.add(r.lead_id);
      });
      setPaidAssessmentLeadIds(ids);
    } catch (e: any) {
      console.error("[admin.leads] fetch error:", e);
      toast.error(`Erro ao carregar leads: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.whatsapp?.includes(search)
    );
  }, [leads, search]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId;
    
    // Optimistic update
    const updatedLeads = leads.map(l => l.id === draggableId ? { ...l, status: newStatus } : l);
    setLeads(updatedLeads);

    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", draggableId);
      
      if (error) throw error;
    } catch (e) {
      toast.error("Erro ao atualizar status");
      fetchLeads(); // Rollback
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectColumn = (stageId: string) => {
    const columnIds = filteredLeads.filter(l => (l.status || 'novo') === stageId).map(l => l.id);
    setSelectedIds(prev => {
      const next = new Set(prev);
      const allSelected = columnIds.length > 0 && columnIds.every(id => next.has(id));
      if (allSelected) columnIds.forEach(id => next.delete(id));
      else columnIds.forEach(id => next.add(id));
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkMove = async (newStatus: string) => {
    if (!newStatus || selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    setLeads(prev => prev.map(l => ids.includes(l.id) ? { ...l, status: newStatus } : l));
    try {
      const { error } = await supabase.from("leads").update({ status: newStatus }).in("id", ids);
      if (error) throw error;
      toast.success(`${ids.length} lead(s) movido(s)`);
      clearSelection();
      setBulkMoveTarget("");
    } catch (e: any) {
      toast.error("Erro ao mover leads");
      fetchLeads();
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Excluir ${selectedIds.size} lead(s)? Esta ação não pode ser desfeita.`)) return;
    const ids = Array.from(selectedIds);
    try {
      const { error } = await supabase.from("leads").delete().in("id", ids);
      if (error) throw error;
      toast.success(`${ids.length} lead(s) excluído(s)`);
      clearSelection();
      fetchLeads();
    } catch (e: any) {
      toast.error("Erro ao excluir leads");
    }
  };

  const exportCSV = () => {
    const headers = ["Data", "Nome", "E-mail", "WhatsApp", "Objetivo", "Timing", "Status", "Temperatura"];
    const rows = filteredLeads.map(l => [
      format(new Date(l.created_at), "yyyy-MM-dd HH:mm"), 
      l.name, l.email, l.whatsapp, l.objective, l.timing, l.status, l.temperature
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `moovia_crm_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-amotha text-4xl text-white mb-2">CRM · Pipeline de Vendas</h1>
          <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">Gerenciamento de Transições Internacionais</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-black-2 border border-border p-1 rounded-md">
            <button 
              onClick={() => setView('kanban')}
              className={cn("p-2 rounded transition-all", view === 'kanban' ? "bg-gold text-black" : "text-white/40 hover:text-white")}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('table')}
              className={cn("p-2 rounded transition-all", view === 'table' ? "bg-gold text-black" : "text-white/40 hover:text-white")}
            >
              <TableIcon size={18} />
            </button>
          </div>

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white-4" />
            <input
              type="text"
              placeholder="Pesquisar leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black-2 border border-border text-white-2 pl-12 pr-4 py-3 font-urbanist text-sm min-w-[280px] outline-none focus:border-gold transition-colors"
            />
          </div>

          <button 
            onClick={exportCSV}
            className="bg-black-2 border border-border text-white-3 px-6 py-3 hover:text-gold hover:border-gold transition-colors flex items-center gap-2 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold"
          >
            <Download size={16} /> Exportar
          </button>

          <button 
            onClick={() => setShowNewLead(true)}
            className="bg-gold text-black px-6 py-3 hover:bg-gold-l transition-colors flex items-center gap-2 font-urbanist text-[11px] uppercase tracking-[0.2em] font-bold"
          >
            <Plus size={16} /> Novo Lead
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-40">
          <Loader2 className="animate-spin text-gold" size={40} />
        </div>
      ) : view === 'kanban' ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="sticky top-0 z-20 -mx-2 mb-4 flex gap-2 overflow-x-auto bg-black/60 backdrop-blur px-2 py-3 border-y border-border">
            {STAGES.map((stage) => {
              const count = filteredLeads.filter(l => (l.status || 'novo') === stage.id).length;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    const el = document.getElementById(`col-${stage.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                  }}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 border border-border bg-black-2 hover:border-gold transition-colors rounded"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="font-urbanist font-bold text-[10px] uppercase tracking-[0.2em] text-white-2 whitespace-nowrap">{stage.label}</span>
                  <span className="text-[9px] font-bold bg-white/05 px-2 py-0.5 border border-white/05 text-white/50 rounded-full">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 min-h-[70vh] scroll-smooth">
            {STAGES.map((stage) => (
              <div key={stage.id} id={`col-${stage.id}`} className="flex-shrink-0 w-80 flex flex-col gap-6 scroll-mt-24">
                <div className="flex items-center justify-between px-2 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                    <h3 className="font-urbanist font-bold text-[11px] uppercase tracking-[0.2em] text-white-2 truncate">{stage.label}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {(() => {
                      const colIds = filteredLeads.filter(l => (l.status || 'novo') === stage.id).map(l => l.id);
                      const allSelected = colIds.length > 0 && colIds.every(id => selectedIds.has(id));
                      return (
                        <button
                          onClick={() => toggleSelectColumn(stage.id)}
                          disabled={colIds.length === 0}
                          className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded border text-[9px] uppercase tracking-widest font-bold transition-colors disabled:opacity-30",
                            allSelected
                              ? "bg-gold text-black border-gold"
                              : "bg-black border-gold/40 text-gold hover:bg-gold/10"
                          )}
                        >
                          {allSelected ? <CheckSquare size={12} /> : <Square size={12} />}
                          {allSelected ? "Todos" : "Selec."}
                        </button>
                      );
                    })()}
                    <span className="text-[10px] font-bold bg-white/05 px-2 py-1 border border-white/05 text-white/40 rounded-full">
                      {filteredLeads.filter(l => l.status === stage.id).length}
                    </span>
                  </div>
                </div>


                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cn(
                        "flex-1 flex flex-col gap-4 p-2 rounded-lg transition-colors min-h-[500px]",
                        snapshot.isDraggingOver ? "bg-white/05" : "bg-transparent"
                      )}
                    >
                      {filteredLeads
                        .filter(l => (l.status || 'novo') === stage.id)
                        .map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                } as React.CSSProperties}
                                onClick={() => setSelectedLead(lead)}
                                className={cn(
                                  "bg-black-2 border border-border p-5 group cursor-pointer hover:border-gold transition-all relative overflow-hidden",
                                  snapshot.isDragging ? "shadow-2xl border-gold ring-2 ring-gold/20" : "",
                                  selectedIds.has(lead.id) ? "ring-2 ring-gold border-gold" : "",
                                  lead.temperature === 'hot' ? "border-l-4 border-l-red-500" : 
                                  lead.temperature === 'warm' ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-blue-500"
                                )}
                              >
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleSelect(lead.id); }}
                                  className={cn(
                                    "absolute top-2 left-2 p-1 rounded transition-colors z-10",
                                    selectedIds.has(lead.id) ? "text-gold" : "text-white/60 hover:text-gold"
                                  )}
                                  title={selectedIds.has(lead.id) ? "Desmarcar" : "Selecionar"}
                                >
                                  {selectedIds.has(lead.id) ? <CheckSquare size={14} /> : <Square size={14} />}
                                </button>
                                <div className="flex justify-between items-start mb-4 pl-6">
                                  <h4 className="font-amotha text-lg text-white group-hover:text-gold transition-colors">{lead.name}</h4>
                                  <div className={cn(
                                    "p-1.5 bg-white/05 rounded-full transition-transform group-hover:scale-110",
                                    lead.temperature === 'hot' ? "text-red-500" : "text-white/20"
                                  )}>
                                    <Phone size={12} />
                                  </div>
                                </div>

                                <div className="space-y-3 font-urbanist">
                                  {paidAssessmentLeadIds.has(lead.id) && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-widest font-bold rounded">
                                      ✓ Assessment Pago
                                    </span>
                                  )}
                                  <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed line-clamp-1">{lead.objective}</p>
                                  <div className="flex items-center justify-between pt-2 border-t border-white/05">
                                    <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">
                                      {format(new Date(lead.created_at), "d 'de' MMM", { locale: ptBR })}
                                    </span>
                                    <div className="flex items-center gap-1 text-gold-l">
                                      <span className="text-[10px] font-bold uppercase tracking-tighter">Detalhes</span>
                                      <ArrowRight size={10} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse font-urbanist">
            <thead>
              <tr className="bg-black-3 border-b border-border">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Data</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Lead</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Objetivo</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l">Temp.</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-l text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="border-b border-border hover:bg-white/05 cursor-pointer transition-colors group">
                  <td className="p-6 text-xs text-white/40">{format(new Date(lead.created_at), "dd/MM/yyyy HH:mm")}</td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{lead.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{lead.email}</p>
                  </td>
                  <td className="p-6 text-xs text-white/60">{lead.objective}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-white/05 border border-white/10 rounded text-[9px] uppercase tracking-widest text-white/40">
                      {STAGES.find(s => s.id === (lead.status || 'novo'))?.label}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      lead.temperature === 'hot' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" :
                      lead.temperature === 'warm' ? "bg-orange-500" : "bg-blue-500"
                    )} />
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-white/20 hover:text-gold transition-colors"><MoreHorizontal size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[900] bg-black-2 border border-gold rounded-lg shadow-2xl px-5 py-3 flex items-center gap-4 animate-[fadeIn_0.2s_ease-in-out]">
          <span className="text-[11px] uppercase tracking-widest font-bold text-gold">
            {selectedIds.size} selecionado(s)
          </span>
          <div className="h-6 w-px bg-white/10" />
          <select
            value={bulkMoveTarget}
            onChange={(e) => { const v = e.target.value; setBulkMoveTarget(v); if (v) bulkMove(v); }}
            className="bg-black border border-border px-3 py-2 text-[11px] uppercase tracking-widest text-white outline-none focus:border-gold"
          >
            <option value="">Mover para…</option>
            {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button
            onClick={bulkDelete}
            className="flex items-center gap-2 px-3 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 text-[11px] uppercase tracking-widest font-bold rounded transition-colors"
          >
            <Trash2 size={14} /> Excluir
          </button>
          <button
            onClick={clearSelection}
            className="p-2 text-white/40 hover:text-white transition-colors"
            title="Limpar seleção"
          >
            <X size={16} />
          </button>
        </div>
      )}


      {selectedLead && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[950] animate-[fadeIn_0.3s_ease-in-out]" onClick={() => setSelectedLead(null)} />
          <LeadDetailsDrawer 
            lead={selectedLead} 
            onClose={() => setSelectedLead(null)} 
            onUpdate={fetchLeads}
          />
        </>
      )}

      {showNewLead && (
        <div className="fixed inset-0 z-[960] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowNewLead(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={createLead} className="bg-black-2 border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6">
            <div>
              <h2 className="font-amotha text-3xl text-white mb-1">Novo Lead</h2>
              <p className="text-[11px] uppercase tracking-widest text-white/40 font-urbanist">Cadastro manual no pipeline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-urbanist text-sm">
              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Nome *</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">E-mail</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">WhatsApp</span>
                <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Objetivo</span>
                <input value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} placeholder="trabalho, familia, investir..." className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Timing</span>
                <select value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold">
                  <option value="">—</option>
                  <option value="menos_3_meses">Menos de 3 meses</option>
                  <option value="3_6_meses">3 a 6 meses</option>
                  <option value="6_12_meses">6 a 12 meses</option>
                  <option value="mais_12_meses">Mais de 12 meses</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Data de entrada</span>
                <input type="datetime-local" value={form.created_at} onChange={(e) => setForm({ ...form, created_at: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Etapa inicial</span>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold">
                  {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>

              <div className="md:col-span-2 flex flex-col gap-3 p-4 border border-border rounded bg-black-3/50">
                <span className="text-[10px] uppercase tracking-widest text-gold-l font-bold">Fluxo</span>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.did_first_conversation} onChange={(e) => setForm({ ...form, did_first_conversation: e.target.checked })} className="accent-gold w-4 h-4" />
                  <span className="text-white/80">Já fez a 1ª conversa</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.did_assessment} onChange={(e) => setForm({ ...form, did_assessment: e.target.checked })} className="accent-gold w-4 h-4" />
                  <span className="text-white/80">Já fez o Assessment (Diagnóstico)</span>
                </label>
                <p className="text-[10px] text-white/40">A etapa será ajustada automaticamente com base nas opções acima.</p>
              </div>

              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Notas</span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="bg-black-3 border border-border px-4 py-3 text-white outline-none focus:border-gold resize-none" />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button type="button" onClick={() => setShowNewLead(false)} className="px-6 py-3 border border-border text-white/60 hover:text-white text-[11px] uppercase tracking-widest font-bold">Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-3 bg-gold text-black hover:bg-gold-l disabled:opacity-50 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                {saving && <Loader2 className="animate-spin" size={14} />}
                Criar Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
