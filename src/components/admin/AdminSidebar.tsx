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
  ChevronLeft,
  Database,
  Activity,
  Brain,
  Scale,
  Music,
  Languages,
  Image as ImageIcon,
  LineChart,
  Shield,
  Volume2,
  Globe,
  Workflow,
  ChevronLeftSquare,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useAdminMe } from "@/hooks/useAdminPermissions";
import { useState } from "react";
import logoFooterAdminAsset from "@/assets/logo-footer-admin-transp.png.asset.json";

const menuItems = [
  { label: "Overview", icon: BarChart3, to: "/admin" },
  { label: "Empresas Clientes", icon: Building2, to: "/admin/companies" },
  { label: "Client Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Leads / CRM", icon: Users, to: "/admin/leads" },
  { label: "Assessments", icon: Package, to: "/admin/assessments" },
  { label: "Blog", icon: FileText, to: "/admin/blog" },
  { label: "Conteúdo / CMS", icon: Database, to: "/admin/content" },
  { label: "Imagens", icon: ImageIcon, to: "/admin/images" },
  { label: "Galeria", icon: ImageIcon, to: "/admin/gallery" },
  { label: "Páginas Legais", icon: Scale, to: "/admin/legal" },
  { label: "MAIA / IA", icon: Brain, to: "/admin/maia" },
  { label: "Chatbot", icon: MessageSquare, to: "/admin/chat" },
  { label: "Analytics", icon: LineChart, to: "/admin/analytics" },
  { label: "UX Insights", icon: Activity, to: "/admin/ux" },
  { label: "Sound", icon: Music, to: "/admin/sound" },
  { label: "Linguagens", icon: Languages, to: "/admin/languages" },
  { label: "Configurações", icon: Settings, to: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { me, loading, canAccess } = useAdminMe();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <aside className={cn(
      "h-screen bg-black-2 border-r border-border flex flex-col sticky top-0 transition-all duration-300 group/sidebar",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "p-6 border-b border-border flex items-center relative",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <div className={cn("flex flex-col gap-2 overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "w-full opacity-100")}>
          <img src={logoFooterAdminAsset.url} alt="MOOVIA Global Mobility Assurance" className="h-8 w-auto object-contain" />
          <p className="font-urbanist text-[9px] uppercase tracking-[0.2em] text-gold whitespace-nowrap">Admin Panel</p>
        </div>

        {isCollapsed && (
          <img src="/mooviagold.svg" alt="MOOVIA" className="w-8 h-8 opacity-100 transition-opacity" />
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-black border border-black shadow-lg transition-transform hover:scale-110 z-50",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      <nav className="flex-1 p-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
          
          return (
            <Link
              key={item.to}
              to={item.to}
              title={isCollapsed ? item.label : ""}
              className={cn(
                "flex items-center rounded-lg group transition-all duration-300",
                isCollapsed ? "justify-center p-3" : "justify-between p-4",
                isActive 
                  ? "bg-gold text-black font-semibold" 
                  : "text-white/40 hover:text-gold hover:bg-white/05"
              )}
            >
              <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
                <item.icon size={20} className={cn("transition-transform group-hover:scale-110 shrink-0", isActive ? "text-black" : "text-gold/60")} />
                {!isCollapsed && <span className="font-urbanist text-[13px] uppercase tracking-widest whitespace-nowrap">{item.label}</span>}
              </div>
              {!isCollapsed && isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Sair" : ""}
          className={cn(
            "w-full flex items-center p-4 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/05 transition-all group",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
          {!isCollapsed && <span className="font-urbanist text-[13px] uppercase tracking-widest whitespace-nowrap">Sair</span>}
        </button>
      </div>
    </aside>
  );
}
