import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Euro, 
  Calendar,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stats {
  totalLeads: number;
  leadsThisMonth: number;
  leadsThisWeek: number;
  assessmentsDone: number;
  activeMandatos: number;
  conversionLeadToAssessment: number;
  conversionAssessmentToMandato: number;
  estimatedRevenue: number;
}

export function KPICards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

        const [
          { count: totalLeads },
          { count: monthLeads },
          { count: weekLeads },
          { count: assessments },
          { data: mandatos },
          { data: assessmentsRev },
        ] = await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", firstDayOfMonth),
          supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
          supabase.from("assessments").select("*", { count: "exact", head: true }).eq("status", "realizado"),
          supabase.from("mandatos").select("value_eur, status"),
          supabase.from("assessments").select("amount_eur, status"),
        ]);

        const activeMandatosCount = (mandatos || []).filter((m: any) => m.status === 'ativo').length;
        const mandatosRevenue = (mandatos || [])
          .filter((m: any) => m.status !== 'cancelado')
          .reduce((acc: number, curr: any) => acc + Number(curr.value_eur || 0), 0);
        const assessmentsRevenue = (assessmentsRev || [])
          .filter((a: any) => a.status !== 'cancelado')
          .reduce((acc: number, curr: any) => acc + Number(curr.amount_eur || 0), 0);
        const totalRevenue = mandatosRevenue + assessmentsRevenue;


        // Mock conversion rates if zero data
        const leadToAssessment = totalLeads ? ((assessments || 0) / totalLeads) * 100 : 0;
        const assessmentToMandato = assessments ? (activeMandatosCount / assessments) * 100 : 0;

        setStats({
          totalLeads: totalLeads || 0,
          leadsThisMonth: monthLeads || 0,
          leadsThisWeek: weekLeads || 0,
          assessmentsDone: assessments || 0,
          activeMandatos: activeMandatosCount,
          conversionLeadToAssessment: leadToAssessment,
          conversionAssessmentToMandato: assessmentToMandato,
          estimatedRevenue: totalRevenue
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    
    // Set up realtime subscriptions
    const leadsSub = supabase.channel('stats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assessments' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mandatos' }, fetchStats)
      .subscribe();

    return () => {
      leadsSub.unsubscribe();
    };
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-black-2 border border-border animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const items = [
    { label: "Total de Leads", value: stats.totalLeads, icon: Users, color: "text-gold" },
    { label: "Leads este mês", value: stats.leadsThisMonth, icon: Calendar, color: "text-blue-400" },
    { label: "Leads esta semana", value: stats.leadsThisWeek, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Assessments", value: stats.assessmentsDone, icon: CheckCircle2, color: "text-purple-400" },
    { label: "Mandatos Ativos", value: stats.activeMandatos, icon: Briefcase, color: "text-orange-400" },
    { label: "Conv. Lead → Assess.", value: `${stats.conversionLeadToAssessment.toFixed(1)}%`, icon: Target, color: "text-pink-400" },
    { label: "Conv. Assess. → Mand.", value: `${stats.conversionAssessmentToMandato.toFixed(1)}%`, icon: Target, color: "text-cyan-400" },
    { label: "Receita Estimada", value: `€${stats.estimatedRevenue.toLocaleString()}`, icon: Euro, color: "text-gold-l" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {items.map((item) => (
        <div key={item.label} className="bg-black-2 border border-border p-6 rounded-lg group hover:border-gold transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-urbanist text-[11px] uppercase tracking-widest text-white/40 mb-2">{item.label}</p>
              <h3 className="font-amotha text-3xl text-white group-hover:text-gold transition-colors">{item.value}</h3>
            </div>
            <div className={cn("p-2 bg-white/05 rounded-md", item.color)}>
              <item.icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
