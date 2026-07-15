import { createFileRoute } from "@tanstack/react-router";
import { KPICards } from "@/components/admin/KPICards";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell,
  Legend,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [sourceData, setSourceData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const [
        { count: leadsCount },
        { data: chats },
        { count: assessSched },
        { count: assessDone },
        { data: mandatos },
        { data: leadsSrc },
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("chat_logs").select("session_id"),
        supabase.from("assessments").select("*", { count: "exact", head: true }).eq("status", "agendado"),
        supabase.from("assessments").select("*", { count: "exact", head: true }).eq("status", "realizado"),
        supabase.from("mandatos").select("value_eur, created_at, status"),
        supabase.from("leads").select("source, utm_source"),
      ]);

      const uniqueChats = new Set((chats || []).map((c: any) => c.session_id || '')).size;
      const activeMand = (mandatos || []).filter((m: any) => m.status === 'ativo').length;

      setFunnelData([
        { value: Math.max(uniqueChats, leadsCount || 0, 1), name: 'Conversas iniciadas', fill: '#8884d8' },
        { value: leadsCount || 0, name: 'Leads capturados', fill: '#83a6ed' },
        { value: assessSched || 0, name: 'Assessments agendados', fill: '#8dd1e1' },
        { value: assessDone || 0, name: 'Assessments realizados', fill: '#82ca9d' },
        { value: activeMand, name: 'Mandatos ativos', fill: '#d0ed57' },
      ]);

      // Revenue per month (last 6)
      const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        return { key: `${d.getFullYear()}-${d.getMonth()}`, name: d.toLocaleString('pt-BR', { month: 'short' }), revenue: 0 };
      });
      (mandatos || []).forEach((m: any) => {
        if (!m.created_at) return;
        const d = new Date(m.created_at);
        const k = `${d.getFullYear()}-${d.getMonth()}`;
        const slot = months.find(x => x.key === k);
        if (slot) slot.revenue += Number(m.value_eur || 0);
      });
      setRevenueData(months);

      // Sources
      const counts: Record<string, number> = {};
      (leadsSrc || []).forEach((l: any) => {
        const s = (l.utm_source || l.source || 'Direct').toString();
        counts[s] = (counts[s] || 0) + 1;
      });
      const palette = ['#ad8957', '#407e8d', '#f9f5ec', '#cead84', '#22c55e'];
      setSourceData(
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }))
      );
    }
    fetchAll();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">Dashboard Operacional</h1>
        <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">Bem-vindo de volta, Frederico</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Funnel Section */}
          <div className="bg-black-2 border border-border p-8 rounded-lg">
            <h3 className="font-amotha text-2xl text-white mb-8">Funil de Conversão (End-to-End)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1d26', borderColor: 'rgba(173,137,87,0.18)', color: '#fff' }}
                    itemStyle={{ color: '#ad8957' }}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                  >
                    <LabelList position="right" fill="#ad8957" stroke="none" dataKey="name" />
                    <LabelList position="center" fill="#000" stroke="none" dataKey="value" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart Section */}
          <div className="bg-black-2 border border-border p-8 rounded-lg">
            <h3 className="font-amotha text-2xl text-white mb-8">Receita Estimada (Últimos 6 meses)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>

                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ad8957" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ad8957" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1d26', borderColor: 'rgba(173,137,87,0.18)', border: '1px solid' }}
                    itemStyle={{ color: '#ad8957' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#ad8957" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <ActivityFeed />
          
          <div className="bg-black-2 border border-border p-8 rounded-lg">
            <h3 className="font-amotha text-xl text-white mb-6">Origem dos Leads</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={sourceData}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} width={80} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1a1d26', borderColor: '#ad895733' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
