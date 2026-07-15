import { Link, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  BarChart3, 
  Package, 
  LogOut,
  ChevronRight,
  Database,
  Activity,
  Brain,
  Scale,
  Music,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useAdminMe } from "@/hooks/useAdminPermissions";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Leads / CRM", icon: Users, to: "/admin/leads" },
  { label: "Assessments", icon: Package, to: "/admin/assessments" },
  { label: "Blog", icon: FileText, to: "/admin/blog" },
  { label: "Conteúdo / CMS", icon: Database, to: "/admin/content" },
  { label: "Galeria", icon: ImageIcon, to: "/admin/gallery" },
  { label: "Páginas Legais", icon: Scale, to: "/admin/legal" },
  { label: "MAIA / IA", icon: Brain, to: "/admin/maia" },
  { label: "Chatbot", icon: MessageSquare, to: "/admin/chat" },
  { label: "Analytics", icon: BarChart3, to: "/admin/analytics" },
  { label: "UX Insights", icon: Activity, to: "/admin/ux" },
  { label: "Sound", icon: Music, to: "/admin/sound" },
  { label: "Configurações", icon: Settings, to: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { me, loading, canAccess } = useAdminMe();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  };

  const visibleItems = !me || loading
    ? menuItems
    : (me.role === "owner" || me.role === "admin")
      ? menuItems
      : menuItems.filter((i) => canAccess(i.to));

  return (
    <aside className="w-64 h-screen bg-black-2 border-r border-border flex flex-col sticky top-0">
      <div className="p-8 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/mooviagold.svg" alt="MOOVIA" className="w-8 h-8" />
          <div>
            <h2 className="font-amotha text-xl text-white leading-none">MOOVIA</h2>
            <p className="font-urbanist text-[9px] uppercase tracking-[0.2em] text-gold mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 py-8 space-y-2 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg group transition-all duration-300",
                isActive 
                  ? "bg-gold text-black font-semibold" 
                  : "text-white/40 hover:text-gold hover:bg-white/05"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-black" : "text-gold/60")} />
                <span className="font-urbanist text-[13px] uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/05 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-urbanist text-[13px] uppercase tracking-widest">Sair</span>
        </button>
      </div>
    </aside>
  );
}
