import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  Target,
  FileText,
  Lightbulb
} from "lucide-react";

export const Route = createFileRoute("/meu-dashboard")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });
    
    const { data: roleData } = await supabase
      .from("company_users" as any)
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!roleData || (roleData as any).role !== "expatriate") {
      throw redirect({ to: "/login" });
    }
  },
  component: ExpatriateDashboard,
});

function ExpatriateDashboard() {
  const { data: userData } = useQuery({
    queryKey: ["expatriate-self"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expatriates" as any)
        .select("*, assessments(*)")
        .single();
      if (error) throw error;
      return data as any;
    }
  });

  if (!userData) return null;

  const currentScore = userData.score || 0;
  
  return (
    <SiteLayout>
      <div className="min-h-screen bg-black pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-b18 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/mooviagold.svg" alt="MOOVIA" className="w-10 h-10" />
                <span className="h-6 w-px bg-b18" />
                <p className="text-gold text-[10px] uppercase tracking-[0.3em]">Portal do Colaborador</p>
              </div>
              <h1 className="text-white font-display text-4xl font-light">
                Olá, <span className="text-gold">{userData.name_masked}</span>
              </h1>
              <p className="text-w35 mt-2 max-w-lg">
                Bem-vindo ao seu espaço de acompanhamento. Aqui pode gerir o seu percurso de integração e sucesso internacional.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-w35 text-[10px] uppercase tracking-widest mb-2">Score de Sucesso Atual</p>
              <div className="text-6xl font-display font-light text-gold leading-none shadow-gold/20 drop-shadow-2xl">
                {currentScore}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Timeline & Progress */}
            <section className="lg:col-span-2 space-y-8">
              <div className="bg-black-2 border border-b18 p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold/30" />
                <h3 className="text-white font-display text-xl mb-8 flex items-center gap-3">
                  <Target className="text-gold" size={20} />
                  O seu percurso de integração
                </h3>

                <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gold/20">
                  {[
                    { label: "Assessment Inicial", status: "completed", date: "Concluído" },
                    { label: "Check-in 30 dias", status: "completed", date: "Concluído" },
                    { label: "Medição 60 dias", status: "current", date: "Em curso" },
                    { label: "Follow-up 90 dias", status: "pending", date: "Agendado para Outubro" },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-8 relative">
                      <div className={cn(
                        "w-[23px] h-[23px] rounded-full border flex items-center justify-center shrink-0 z-10",
                        step.status === "completed" ? "bg-gold border-gold" : 
                        step.status === "current" ? "bg-black border-gold animate-pulse" : "bg-black-3 border-b18"
                      )}>
                        {step.status === "completed" && <CheckCircle2 size={12} className="text-black" />}
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium", step.status === "pending" ? "text-w35" : "text-white")}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-w35 uppercase tracking-wide mt-1">
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-black-2 border border-b18 p-8 rounded-sm">
                <h3 className="text-white font-display text-xl mb-6 flex items-center gap-3">
                  <Lightbulb className="text-gold" size={20} />
                  As suas recomendações personalizadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Fortalecer rede de networking local em Lisboa",
                    "Explorar atividades culturais para acelerar adaptação",
                    "Agendar check-in psicológico preventivo",
                    "Revisão de objetivos de carreira a médio prazo"
                  ].map((rec, i) => (
                    <div key={i} className="bg-black-3 border border-b18 p-4 rounded-sm flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                      <p className="text-w35 text-xs leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sidebar Details */}
            <aside className="space-y-6">
              <div className="bg-black-2 border border-b18 p-6 rounded-sm">
                <p className="text-w35 text-[10px] uppercase tracking-widest mb-4">Próximo Marco</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-black-3 border border-b18 rounded-sm">
                    <Calendar className="text-gold" size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium italic">Sessão de Medição 60 Dias</p>
                    <p className="text-w35 text-[10px] uppercase tracking-widest mt-1">15 de Setembro, 2026</p>
                  </div>
                </div>
                <button className="w-full bg-gold text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-l transition-all">
                  Marcar na Agenda
                </button>
              </div>

              <div className="bg-black-2 border border-b18 p-6 rounded-sm">
                <p className="text-w35 text-[10px] uppercase tracking-widest mb-4">Documentação</p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-black-3 border border-b18 rounded-sm text-w35 hover:text-gold transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText size={16} />
                      <span className="text-xs uppercase tracking-widest">Relatório Individual</span>
                    </div>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-black-3 border border-b18 rounded-sm text-w35 hover:text-gold transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText size={16} />
                      <span className="text-xs uppercase tracking-widest">Guia de Integração PT</span>
                    </div>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
