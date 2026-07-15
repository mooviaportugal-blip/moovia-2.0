import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  UserPlus, 
  MessageSquare, 
  CheckCircle, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";

interface Activity {
  id: string;
  type: 'lead' | 'chat' | 'assessment' | 'status';
  message: string;
  timestamp: string;
  meta?: any;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchActivities() {
    try {
      // Mocking aggregated activity from multiple tables
      const [leads, chats] = await Promise.all([
        supabase.from("leads").select("id, name, created_at").order("created_at", { ascending: false }).limit(10),
        supabase.from("chat_logs").select("id, created_at, lead_captured").order("created_at", { ascending: false }).limit(10)
      ]);

      const combined: Activity[] = [
        ...(leads.data || []).map(l => ({
          id: l.id,
          type: 'lead' as const,
          message: `Novo lead registrado: ${l.name}`,
          timestamp: l.created_at as string
        })),
        ...(chats.data || []).map(c => ({
          id: c.id,
          type: 'chat' as const,
          message: c.lead_captured ? "Lead capturado via Chat" : "Nova conversa iniciada no Chat",
          timestamp: c.created_at as string
        }))
      ].sort((a, b) => new Date(b.timestamp as string).getTime() - new Date(a.timestamp as string).getTime()).slice(0, 15);

      setActivities(combined);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();

    const channel = supabase.channel('activity-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, (payload) => {
        toast(`🔥 Novo lead: ${payload.new.name}`, {
          icon: <UserPlus size={16} className="text-gold" />
        });
        fetchActivities();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_logs' }, (payload) => {
        if (payload.new.lead_captured) {
          toast(`✨ Lead capturado via chat!`, {
            icon: <MessageSquare size={16} className="text-gold" />
          });
        }
        fetchActivities();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  if (loading) return <div className="h-[400px] bg-black-2 border border-border animate-pulse rounded-lg" />;

  return (
    <div className="bg-black-2 border border-border rounded-lg flex flex-col h-full max-h-[600px]">
      <div className="p-6 border-b border-border">
        <h3 className="font-amotha text-xl text-white">Feed de Atividade</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activities.length === 0 ? (
          <p className="text-center text-white/20 font-urbanist text-sm py-10">Nenhuma atividade recente.</p>
        ) : (
          activities.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="flex gap-4 group">
              <div className="mt-1">
                {activity.type === 'lead' && <div className="p-2 bg-gold/10 text-gold rounded-full"><UserPlus size={14} /></div>}
                {activity.type === 'chat' && <div className="p-2 bg-blue-500/10 text-blue-400 rounded-full"><MessageSquare size={14} /></div>}
                {activity.type === 'assessment' && <div className="p-2 bg-purple-500/10 text-purple-400 rounded-full"><FileText size={14} /></div>}
                {activity.type === 'status' && <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-full"><CheckCircle size={14} /></div>}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-[13px] text-white/70 font-urbanist group-hover:text-white transition-colors leading-tight">
                  {activity.message}
                </p>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-medium">
                  {format(new Date(activity.timestamp), "HH:mm · d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
