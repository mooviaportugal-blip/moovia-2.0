import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar,
  FileText,
  Clock,
  LayoutDashboard,
  Workflow,
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoWordmarkAsset from "@/assets/logo-moovia-global-mobility-assurance.png.asset.json";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

// --- Mock Data ---

const kpis = [
  {
    label: "Active Assignees",
    value: "24",
    change: "+2 vs mês anterior",
    icon: Users,
  },
  {
    label: "Global Mobility Success Score",
    value: "81/100",
    change: "↑ +4 vs anterior",
    icon: TrendingUp,
    trend: "up"
  },
  {
    label: "Human Mobility Risk",
    value: "15 Low · 7 Medium · 2 High",
    change: "Baseado em assessments",
    icon: ShieldAlert,
  },
  {
    label: "Assessments Completed",
    value: "92%",
    change: "9 novos este mês",
    icon: CheckCircle2,
  }
];

const expatriates = [
  { id: "01", name: "Expatriado-01", city: "Lisboa, PT", role: "Eng. Sénior", score: 86, risk: "Low", lastMeasure: "Hoje" },
  { id: "02", name: "Expatriado-02", city: "Porto, PT", role: "Gerente Projetos", score: 74, risk: "Medium", lastMeasure: "12 dias" },
  { id: "03", name: "Expatriado-03", city: "Braga, PT", role: "Analista Sistemas", score: 61, risk: "High", lastMeasure: "Hoje" },
];

const processes = [
  {
    id: "01",
    name: "Expatriado-01",
    phase: "Acompanhamento 60 dias",
    progress: 3,
    total: 5,
    nextStep: "Medição 90 dias",
    scheduledDate: "15 set 2026",
    status: "Em curso"
  },
  {
    id: "02",
    name: "Expatriado-02",
    phase: "Assessment Inicial",
    progress: 1,
    total: 5,
    nextStep: "Check-in 30 dias",
    scheduledDate: "10 out 2026",
    status: "Agendado"
  },
  {
    id: "03",
    name: "Expatriado-03",
    phase: "Integração 90 dias",
    progress: 5,
    total: 5,
    nextStep: "Relatório Final",
    scheduledDate: "02 out 2026",
    status: "Concluído"
  }
];

// --- Components ---

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "bg-black-2 border border-b18 p-6 rounded-sm relative overflow-hidden group",
      className
    )}>
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </div>
  );
}

function KPISection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, idx) => (
        <Card key={idx}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-black-3 border border-b18 rounded-sm">
              <kpi.icon size={20} className="text-gold" />
            </div>
            {kpi.trend && (
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                kpi.trend === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              )}>
                {kpi.change.split(' ')[0]}
              </span>
            )}
          </div>
          <p className="text-w35 text-[11px] uppercase tracking-widest mb-1">{kpi.label}</p>
          <p className="text-white text-2xl font-display font-light mb-2">{kpi.value}</p>
          {!kpi.trend && <p className="text-w35 text-[10px]">{kpi.change}</p>}
          {kpi.trend && <p className="text-w35 text-[10px]">{kpi.change.split(' ').slice(1).join(' ')}</p>}
        </Card>
      ))}
    </div>
  );
}

function OverviewTab({ displayExpatriates }: { displayExpatriates: any[] }) {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <div className="space-y-6">
      <KPISection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Placeholder */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-display text-lg font-light mb-1">Evolução do Mobility Success Score</h3>
            <p className="text-w35 text-xs mb-8">Médias agregadas dos últimos 4 meses</p>
          </div>
          
          <div className="h-[200px] w-full flex items-end gap-2 px-2 pb-2">
            {[72, 75, 77, 81].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                <div className="relative w-full">
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gold/20 border-t-2 border-gold relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gold/10 group-hover/bar:bg-gold/20 transition-colors" />
                  </motion.div>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {val}
                  </span>
                </div>
                <span className="text-[10px] text-w35 uppercase tracking-tighter">Mês {i+1}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Breakdown / Sidebar info */}
        <Card>
          <h3 className="text-white font-display text-lg font-light mb-6">Próximos Assessments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-black-3 border border-b18 rounded-sm">
                <div className="w-10 h-10 rounded-full bg-navy border border-b18 flex items-center justify-center text-gold font-display text-xs">
                  E-{i+10}
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">Expatriado-{i+10}</p>
                  <p className="text-w35 text-[10px] uppercase tracking-wide">Agendado: 12 Out</p>
                </div>
                <ChevronRight size={14} className="text-w35" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-6 border-b border-b18 flex justify-between items-center">
          <h3 className="text-white font-display text-lg font-light">Tabela de Expatriados</h3>
          <button className="flex items-center gap-2 text-gold text-[11px] uppercase tracking-widest hover:text-gold-l transition-colors">
            <Download size={14} /> Exportar Lista
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-b18 bg-black/40">
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Nome</th>
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Cidade</th>
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Cargo</th>
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Score</th>
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Risco</th>
                <th className="p-4 text-w35 text-[10px] uppercase tracking-widest font-normal">Última Medição</th>
              </tr>
            </thead>
            <tbody>
              {displayExpatriates.map((exp) => (
                <tr 
                  key={exp.id} 
                  onClick={() => setSelectedExp(exp)}
                  className="border-b border-b18 hover:bg-gold/5 cursor-pointer transition-colors"
                >
                  <td className="p-4 text-white text-xs font-medium">{exp.name}</td>
                  <td className="p-4 text-w35 text-xs">{exp.city}</td>
                  <td className="p-4 text-w35 text-xs">{exp.role}</td>
                  <td className="p-4 font-display text-gold font-medium">{exp.score}</td>
                  <td className="p-4">
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase",
                      exp.risk === "Low" ? "bg-green-500/10 text-green-500" : 
                      exp.risk === "Medium" ? "bg-yellow-500/10 text-yellow-500" : 
                      "bg-red-500/10 text-red-500"
                    )}>
                      {exp.risk}
                    </span>
                  </td>
                  <td className="p-4 text-w35 text-xs">{exp.lastMeasure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Drawer Placeholder */}
      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-black-2 border-l border-b18 z-[101] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-white font-display text-2xl font-light mb-1">{selectedExp.name}</h2>
                  <p className="text-gold text-xs uppercase tracking-widest">{selectedExp.role} · {selectedExp.city}</p>
                </div>
                <button 
                  onClick={() => setSelectedExp(null)}
                  className="p-2 hover:bg-black-3 border border-b18 rounded-sm text-w35"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-10">
                <section>
                  <h3 className="text-w35 text-[11px] uppercase tracking-widest mb-6">Radar Comparativo</h3>
                  <div className="aspect-square bg-black-3 border border-b18 rounded-sm flex items-center justify-center p-8">
                    {/* Simplified Radar Mock */}
                    <div className="relative w-full h-full border border-gold/20 rounded-full flex items-center justify-center">
                      <div className="absolute inset-4 border border-gold/10 rounded-full" />
                      <div className="absolute inset-12 border border-gold/5 rounded-full" />
                      <div className="absolute inset-0 flex flex-col justify-between items-center py-2">
                        <span className="text-[9px] text-w35 uppercase">Adaptação Cultural</span>
                        <span className="text-[9px] text-w35 uppercase">Habitação</span>
                      </div>
                      <div className="absolute inset-0 flex justify-between items-center px-2">
                        <span className="text-[9px] text-w35 uppercase -rotate-90">Bem-estar</span>
                        <span className="text-[9px] text-w35 uppercase rotate-90">Prontidão</span>
                      </div>
                      {/* Random polygon shape to represent data */}
                      <svg className="absolute inset-0 w-full h-full fill-gold/20 stroke-gold stroke-[1px]">
                        <path d="M 100,20 L 160,80 L 140,160 L 60,150 L 30,70 Z" />
                      </svg>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-w35 text-[11px] uppercase tracking-widest mb-6">Timeline do Processo</h3>
                  <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gold/20">
                    {[
                      { label: "Assessment", date: "12 Mai 2026", status: "completed" },
                      { label: "30 dias", date: "15 Jun 2026", status: "completed" },
                      { label: "60 dias", date: "18 Jul 2026", status: "current" },
                      { label: "90 dias", date: "20 Ago 2026", status: "pending" },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 relative">
                        <div className={cn(
                          "w-[23px] h-[23px] rounded-full border flex items-center justify-center shrink-0 z-10",
                          step.status === "completed" ? "bg-gold border-gold" : 
                          step.status === "current" ? "bg-black border-gold animate-pulse" : "bg-black-3 border-b18"
                        )}>
                          {step.status === "completed" && <CheckCircle2 size={12} className="text-black" />}
                        </div>
                        <div>
                          <p className={cn("text-xs font-medium", step.status === "pending" ? "text-w35" : "text-white")}>{step.label}</p>
                          <p className="text-[10px] text-w35 uppercase tracking-wide">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-6 border-t border-b18 flex gap-3">
                  <button className="flex-1 bg-gold text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-l transition-colors">
                    Exportar Resumo PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProcessesTab({ displayProcesses }: { displayProcesses: any[] }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
         <div className="flex items-center gap-2 px-4 py-2 bg-black-2 border border-b18 rounded-sm text-w35 text-[11px] uppercase tracking-widest">
           <Filter size={14} /> Filtros
         </div>
         <div className="flex gap-4">
           {["Assessment", "30 dias", "60 dias", "90 dias"].map(f => (
             <button key={f} className="text-[10px] uppercase tracking-widest text-w35 hover:text-gold transition-colors">{f}</button>
           ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProcesses.map((p) => (
          <Card key={p.id}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-white font-display text-lg font-light">{p.name}</h4>
                <p className="text-gold text-[10px] uppercase tracking-widest mt-1">Fase: {p.phase}</p>
              </div>
              <span className={cn(
                "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase",
                p.status === "Concluído" ? "bg-green-500/10 text-green-500" : 
                p.status === "Em curso" ? "bg-blue-500/10 text-blue-500" : 
                "bg-yellow-500/10 text-yellow-500"
              )}>
                {p.status}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-w35 mb-2">
                  <span>Progresso</span>
                  <span>{p.progress} de {p.total} marcos</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(p.total)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < p.progress ? "bg-gold shadow-[0_0_8px_rgba(173,137,87,0.4)]" : "bg-black-3 border border-b18"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-black-3 border border-b18 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-w35">
                  <Clock size={12} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-widest">Próximo passo:</span>
                </div>
                <p className="text-white text-xs pl-5">{p.nextStep}</p>
                <div className="flex items-center gap-2 text-w35">
                  <Calendar size={12} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-widest">Agendado para:</span>
                </div>
                <p className="text-white text-xs pl-5">{p.scheduledDate}</p>
              </div>

              <button className="w-full border border-b18 text-w35 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10 hover:text-gold transition-all group">
                Ver dashboard mais recente <ArrowUpRight size={12} className="inline ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "processes">("overview");

  // Fetch real data for current user's company
  const { data: expatriatesData } = useQuery({
    queryKey: ["expatriates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expatriates" as any)
        .select("*");
      if (error) throw error;
      return data || [];
    }
  });

  const { data: assessmentsData } = useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assessments" as any)
        .select("*, expatriates(*)");
      if (error) throw error;
      return data || [];
    }
  });

  // Data processing
  const displayExpatriates = expatriatesData && expatriatesData.length > 0 ? expatriatesData.map((e: any) => ({
    id: e.id,
    name: e.name_masked,
    city: e.city,
    role: e.role,
    score: e.score,
    risk: e.risk_level.charAt(0).toUpperCase() + e.risk_level.slice(1),
    lastMeasure: e.last_measurement_date || "N/A"
  })) : expatriates;

  const displayProcesses = assessmentsData && assessmentsData.length > 0 ? assessmentsData.map((a: any) => ({
    id: a.id,
    name: a.expatriates?.name_masked || "N/A",
    phase: a.phase.replace("_", " "),
    progress: a.status === "completed" ? 5 : 3, // Logic for progress bar
    total: 5,
    nextStep: a.status === "completed" ? "Relatório Final" : "Acompanhamento",
    scheduledDate: a.scheduled_date,
    status: a.status === "completed" ? "Concluído" : a.status === "scheduled" ? "Agendado" : "Em curso"
  })) : processes;


  return (
    <div className="min-h-screen bg-black text-white p-2">
      <Reveal>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-b18">
          <div className="flex items-center gap-8">
            <img src={logoWordmarkAsset.url} alt="MOOVIA" className="h-10 w-auto opacity-90" />
            <div className="h-10 w-px bg-b18 hidden md:block" />
            <div>
              <h1 className="text-white font-display text-xl tracking-tight mb-1">TechCorp Lda</h1>
              <p className="text-w35 text-[10px] uppercase tracking-[0.2em]">Última atualização: 04 Ago 2026</p>
            </div>
          </div>

          <div className="flex p-1 bg-black-2 border border-b18 rounded-sm">
            <button 
              onClick={() => setActiveTab("overview")}
              className={cn(
                "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-2",
                activeTab === "overview" ? "bg-gold text-black shadow-lg" : "text-w35 hover:text-white"
              )}
            >
              <LayoutDashboard size={14} /> Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab("processes")}
              className={cn(
                "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-2",
                activeTab === "processes" ? "bg-gold text-black shadow-lg" : "text-w35 hover:text-white"
              )}
            >
              <Workflow size={14} /> Processos em Curso
            </button>
          </div>
        </header>

        <main>
          {activeTab === "overview" ? <OverviewTab displayExpatriates={displayExpatriates} /> : <ProcessesTab displayProcesses={displayProcesses} />}
        </main>
      </Reveal>
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
