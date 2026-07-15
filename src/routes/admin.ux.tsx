import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, MousePointerClick, ScrollText, Users, Loader2 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/ux")({
  component: AdminUx,
});

interface UxRow {
  id: string;
  created_at: string;
  session_id: string;
  event_type: string;
  page_path: string | null;
  x_pct: number | null;
  y_pct: number | null;
  scroll_depth: number | null;
  device: string | null;
  viewport_w: number | null;
  viewport_h: number | null;
  referrer: string | null;
}

function AdminUx() {
  const [events, setEvents] = useState<UxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string>("/");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("ux_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) console.error("[ux_events]", error);
      setEvents((data as UxRow[]) || []);
      setLoading(false);
    })();
  }, []);

  const pages = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.page_path && set.add(e.page_path));
    return Array.from(set);
  }, [events]);

  const scrollDist = useMemo(() => {
    const buckets = [25, 50, 75, 90, 100].map((d) => ({ depth: `${d}%`, sessions: 0 }));
    const seen: Record<string, Set<number>> = {};
    events
      .filter((e) => e.event_type === "scroll" && e.page_path === selectedPage)
      .forEach((e) => {
        if (!e.scroll_depth) return;
        seen[e.session_id] ||= new Set();
        if (!seen[e.session_id].has(e.scroll_depth)) {
          seen[e.session_id].add(e.scroll_depth);
          const b = buckets.find((x) => x.depth === `${e.scroll_depth}%`);
          if (b) b.sessions += 1;
        }
      });
    return buckets;
  }, [events, selectedPage]);

  const clicks = useMemo(
    () => events.filter((e) => e.event_type === "click" && e.page_path === selectedPage && e.x_pct != null && e.y_pct != null),
    [events, selectedPage]
  );

  const sessions = useMemo(() => {
    const map = new Map<string, { id: string; first: string; last: string; pages: Set<string>; clicks: number; maxScroll: number; device: string }>();
    events.forEach((e) => {
      const s = map.get(e.session_id) || {
        id: e.session_id,
        first: e.created_at,
        last: e.created_at,
        pages: new Set(),
        clicks: 0,
        maxScroll: 0,
        device: e.device || "—",
      };
      if (e.created_at < s.first) s.first = e.created_at;
      if (e.created_at > s.last) s.last = e.created_at;
      if (e.page_path) s.pages.add(e.page_path);
      if (e.event_type === "click") s.clicks += 1;
      if (e.scroll_depth && e.scroll_depth > s.maxScroll) s.maxScroll = e.scroll_depth;
      map.set(e.session_id, s);
    });
    return Array.from(map.values()).sort((a, b) => (a.last < b.last ? 1 : -1));
  }, [events]);

  const sessionTimeline = useMemo(() => {
    if (!selectedSession) return [];
    return events
      .filter((e) => e.session_id === selectedSession)
      .sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  }, [events, selectedSession]);

  const totalSessions = sessions.length;
  const totalClicks = events.filter((e) => e.event_type === "click").length;
  const avgScroll = sessions.length
    ? Math.round(sessions.reduce((a, s) => a + s.maxScroll, 0) / sessions.length)
    : 0;
  const totalPageviews = events.filter((e) => e.event_type === "pageview").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">UX Insights</h1>
        <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">
          Sessões, profundidade de scroll e mapa de cliques
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Users} label="Sessões" value={totalSessions} />
        <Stat icon={Activity} label="Pageviews" value={totalPageviews} />
        <Stat icon={MousePointerClick} label="Cliques" value={totalClicks} />
        <Stat icon={ScrollText} label="Scroll médio" value={`${avgScroll}%`} />
      </div>

      <div className="bg-black-2 border border-border p-6 rounded-lg space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="font-amotha text-2xl text-white">Heatmap & Scroll por página</h3>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="bg-black-3 border border-border text-white-2 px-4 py-2 text-sm font-urbanist outline-none focus:border-gold"
          >
            {pages.length === 0 && <option value="/">/</option>}
            {pages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Profundidade de scroll</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scrollDist}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="depth" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1d26", border: "1px solid #ad895733" }}
                    itemStyle={{ color: "#ad8957" }}
                  />
                  <Bar dataKey="sessions" fill="#ad8957" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
              Click heatmap ({clicks.length} cliques)
            </p>
            <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-black-3 border border-border rounded overflow-hidden">
              {clicks.map((c) => (
                <div
                  key={c.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${c.x_pct}%`,
                    top: `${Math.min(c.y_pct ?? 0, 100)}%`,
                    width: 22,
                    height: 22,
                    background: "radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0) 70%)",
                  }}
                />
              ))}
              {clicks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest text-center px-4">
                  Sem cliques registrados
                </div>
              )}
            </div>
            <p className="text-[10px] text-white/30 text-center mt-3">
              Cada ponto = clique (posição relativa à altura da página)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-amotha text-xl text-white">Sessões recentes</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full text-left font-urbanist">
              <thead className="sticky top-0 bg-black-3">
                <tr className="text-[10px] uppercase tracking-widest text-gold-l">
                  <th className="p-3">Sessão</th>
                  <th className="p-3">Device</th>
                  <th className="p-3">Páginas</th>
                  <th className="p-3">Scroll</th>
                  <th className="p-3">Início</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 100).map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedSession(s.id)}
                    className={cn(
                      "border-t border-border cursor-pointer hover:bg-white/05 transition-colors text-xs",
                      selectedSession === s.id && "bg-gold/10"
                    )}
                  >
                    <td className="p-3 text-white/70 font-mono text-[10px]">{s.id.slice(0, 12)}…</td>
                    <td className="p-3 text-white/50">{s.device}</td>
                    <td className="p-3 text-white/70">{s.pages.size}</td>
                    <td className="p-3 text-gold">{s.maxScroll}%</td>
                    <td className="p-3 text-white/40 text-[10px]">
                      {format(new Date(s.first), "dd/MM HH:mm")}
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-white/20 uppercase tracking-widest text-xs">
                      Nenhuma sessão ainda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-black-2 border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-amotha text-xl text-white">
              {selectedSession ? "Timeline da sessão" : "Selecione uma sessão"}
            </h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto p-6 space-y-3">
            {sessionTimeline.map((e) => (
              <div key={e.id} className="flex items-start gap-3 text-xs font-urbanist">
                <span className="text-white/30 font-mono text-[10px] mt-0.5">
                  {format(new Date(e.created_at), "HH:mm:ss")}
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-bold",
                    e.event_type === "click" && "bg-red-500/10 text-red-400",
                    e.event_type === "scroll" && "bg-blue-500/10 text-blue-400",
                    e.event_type === "pageview" && "bg-gold/10 text-gold",
                    e.event_type.includes("session") && "bg-white/10 text-white/60"
                  )}
                >
                  {e.event_type}
                </span>
                <span className="text-white/60 truncate">
                  {e.page_path}
                  {e.scroll_depth ? ` · ${e.scroll_depth}%` : ""}
                  {e.x_pct != null ? ` · ${Math.round(e.x_pct)},${Math.round(e.y_pct || 0)}` : ""}
                </span>
              </div>
            ))}
            {!selectedSession && (
              <p className="text-white/20 text-xs uppercase tracking-widest text-center py-10">
                Clique numa sessão à esquerda
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="bg-black-2 border border-border p-6 rounded-lg">
      <Icon className="text-gold mb-3" size={20} />
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{label}</p>
      <p className="font-amotha text-3xl text-white">{value}</p>
    </div>
  );
}
