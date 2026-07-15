import { X, Phone, Mail, Clock, MapPin, User, Calendar, MessageSquare, History, Tag, Trash2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  objective: string;
  timing: string;
  composition: string;
  decision_phase: string;
  message: string;
  status: string;
  temperature: 'hot' | 'warm' | 'cold';
  notes: string;
  created_at: string;
  source?: string;
  interest?: string;
  contact_period?: string;
  contact_method?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ddi?: string;
  country?: string;
  city?: string;
}


const interestLabels: Record<string, string> = {
  conversa_gratuita: "Conversa Gratuita (founder entrará em contacto)",
  diagnostico: "Diagnóstico — foi para checkout",
};


const sourceLabels: Record<string, string> = {
  website: "Formulário do site",
  manual_admin: "Cadastro manual (admin)",
  chat: "Chat MAIA",
  assessment: "Avaliação Estratégica",
};




export function LeadDetailsDrawer({ lead, onClose, onUpdate }: { lead: Lead, onClose: () => void, onUpdate: () => void }) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (notes !== (lead.notes || "")) {
        setIsSaving(true);
        const { error } = await supabase
          .from("leads")
          .update({ notes })
          .eq("id", lead.id);
        
        if (!error) {
          onUpdate();
        }
        setIsSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes]);

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este lead?")) {
      const { error } = await supabase.from("leads").delete().eq("id", lead.id);
      if (error) {
        toast.error("Erro ao excluir lead");
      } else {
        toast.success("Lead excluído");
        onClose();
        onUpdate();
      }
    }
  };

  const statusLabels: Record<string, string> = {
    novo: "Novo",
    qualificado: "Qualificado",
    conv_agendada: "Conversa Agendada",
    diagnostico: "Diagnóstico",
    proposta: "Proposta Enviada",
    mandato_ativo: "Mandato Ativo",
    frio: "Frio",
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-[500px] bg-black-2 border-l border-border shadow-2xl z-[1000] flex flex-col animate-[slideInRight_0.4s_ease-out]">
      <div className="p-6 border-b border-border flex items-center justify-between bg-black-3/50">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-3 h-3 rounded-full",
            lead.temperature === 'hot' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
            lead.temperature === 'warm' ? "bg-orange-500" : "bg-blue-500"
          )} title={`Temperatura: ${lead.temperature}`} />
          <h2 className="font-amotha text-2xl text-white">{lead.name}</h2>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 font-urbanist">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a 
            href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
            target="_blank"
            className="flex items-center justify-center gap-2 bg-gold text-black py-4 font-bold text-[11px] uppercase tracking-widest hover:bg-gold-xl transition-all"
          >
            <Phone size={16} /> WhatsApp
          </a>
          <a 
            href={`mailto:${lead.email}`}
            className="flex items-center justify-center gap-2 border border-border text-white py-4 font-bold text-[11px] uppercase tracking-widest hover:border-gold transition-all"
          >
            <Mail size={16} /> E-mail
          </a>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-2">
            <Mail size={12} /> Contacto
          </h3>
          <div className="grid grid-cols-1 gap-4 bg-white/05 p-6 rounded-lg border border-white/05">
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><Mail size={10} /> E-mail</p>
              <a href={`mailto:${lead.email}`} className="text-sm text-white/80 hover:text-gold break-all">{lead.email || "—"}</a>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><Phone size={10} /> WhatsApp / Telefone</p>
              <a href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, "")}`} target="_blank" className="text-sm text-white/80 hover:text-gold">
                {lead.ddi ? `+${lead.ddi} ` : ""}{lead.whatsapp || "—"}
              </a>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><MapPin size={10} /> Localização (via IP)</p>
              <p className="text-sm text-white/80">
                {[lead.city, lead.country].filter(Boolean).join(", ") || "Não detectada"}
              </p>
            </div>
          </div>
        </div>

        {/* Core Info */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-2">
            <User size={12} /> Dados do Lead
          </h3>
          <div className="grid grid-cols-1 gap-4 bg-white/05 p-6 rounded-lg border border-white/05">
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Objetivo</p>
              <p className="text-sm text-white/80">{lead.objective}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Timing</p>
              <p className="text-sm text-white/80">{lead.timing}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Composição Familiar</p>
              <p className="text-sm text-white/80">{lead.composition}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Fase da Decisão</p>
              <p className="text-sm text-white/80">{lead.decision_phase}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-white/30 uppercase mb-1">Período de contacto</p>
                <p className="text-sm text-white/80 capitalize">{lead.contact_period || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase mb-1">Meio de contacto</p>
                <p className="text-sm text-white/80">{lead.contact_method === "video_chamada" ? "Vídeo Chamada" : lead.contact_method === "ligacao" ? "Ligação" : "—"}</p>
              </div>
            </div>

            {lead.message && (
              <div>
                <p className="text-[10px] text-white/30 uppercase mb-1">Mensagem</p>
                <p className="text-sm text-white/60 italic leading-relaxed">"{lead.message}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Marketing Info */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-2">
            <Tag size={12} /> Origem e Atribuição
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/05 p-4 rounded border border-white/05">
              <p className="text-[9px] text-white/30 uppercase mb-1">Data Registo</p>
              <p className="text-xs text-white/70">{format(new Date(lead.created_at), "d 'de' MMMM, yyyy", { locale: ptBR })}</p>
            </div>
            <div className="bg-white/05 p-4 rounded border border-white/05">
              <p className="text-[9px] text-white/30 uppercase mb-1">Origem</p>
              <p className="text-xs text-gold">{sourceLabels[lead.source || ""] || lead.source || "—"}</p>
            </div>
            <div className="bg-white/05 p-4 rounded border border-white/05 col-span-2">
              <p className="text-[9px] text-white/30 uppercase mb-1">Escolha do lead</p>
              <p className="text-xs text-gold-l">{interestLabels[lead.interest || ""] || "Ainda não escolheu"}</p>
            </div>
            <div className="bg-white/05 p-4 rounded border border-white/05 col-span-2">
              <p className="text-[9px] text-white/30 uppercase mb-1">Canal / UTM</p>
              <p className="text-xs text-white/70">{lead.utm_source || "Direto"}{lead.utm_medium ? ` · ${lead.utm_medium}` : ""}{lead.utm_campaign ? ` · ${lead.utm_campaign}` : ""}</p>
            </div>

          </div>
        </div>


        {/* Notes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-2">
              <MessageSquare size={12} /> Notas Internas
            </h3>
            {isSaving && <span className="text-[9px] text-white/20 animate-pulse uppercase">A guardar...</span>}
          </div>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Adicione observações sobre a qualificação..."
            className="w-full h-40 bg-black border border-border p-6 text-sm text-white/80 outline-none focus:border-gold transition-colors resize-none placeholder:text-white/10"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-10 border-t border-border flex items-center justify-between">
          <button 
            onClick={handleDelete}
            className="text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold"
          >
            <Trash2 size={14} /> Eliminar Registo
          </button>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/05 border border-white/10 text-white/40 text-[10px] uppercase tracking-widest rounded">
              {statusLabels[lead.status] || lead.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
