import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Code, Globe, Languages, MessageCircle, Plane, Save, Shield, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings/")({
  component: AdminSettings,
});

function AirplaneToggle() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "airplane_enabled")
      .maybeSingle()
      .then(({ data }) => setEnabled(data?.value === "true"));
  }, []);

  const toggle = async () => {
    setLoading(true);
    const next = !enabled;
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "airplane_enabled", value: String(next), type: "boolean" }, { onConflict: "key" });
    setLoading(false);
    if (error) {
      toast.error("Erro ao salvar");
      return;
    }
    setEnabled(next);
    toast.success(next ? "Avião habilitado" : "Avião desabilitado");
  };

  return (
    <div className="bg-black-2 border border-border p-8 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Plane size={24} className="text-gold" />
        <div>
          <h4 className="font-amotha text-xl text-white">Animação do Avião</h4>
          <p className="font-urbanist text-xs text-white/40 uppercase tracking-widest mt-1">
            {enabled ? "Ativo na home" : "Desabilitado"}
          </p>
        </div>
      </div>
      <button
        onClick={toggle}
        disabled={loading}
        className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-bold transition-all ${
          enabled ? "bg-gold text-black" : "bg-white/10 text-white/60"
        }`}
      >
        {enabled ? "Habilitado" : "Desabilitado"}
      </button>
    </div>
  );
}

function SettingToggle({
  settingKey,
  icon: Icon,
  title,
  onLabel,
  offLabel,
  toastOn,
  toastOff,
}: {
  settingKey: string;
  icon: typeof Plane;
  title: string;
  onLabel: string;
  offLabel: string;
  toastOn: string;
  toastOff: string;
}) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", settingKey)
      .maybeSingle()
      .then(({ data }) => setEnabled(data?.value === "true"));
  }, [settingKey]);

  const toggle = async () => {
    setLoading(true);
    const next = !enabled;
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: settingKey, value: String(next), type: "boolean" }, { onConflict: "key" });
    setLoading(false);
    if (error) {
      toast.error("Erro ao salvar");
      return;
    }
    setEnabled(next);
    toast.success(next ? toastOn : toastOff);
  };

  return (
    <div className="bg-black-2 border border-border p-8 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon size={24} className="text-gold" />
        <div>
          <h4 className="font-amotha text-xl text-white">{title}</h4>
          <p className="font-urbanist text-xs text-white/40 uppercase tracking-widest mt-1">
            {enabled ? onLabel : offLabel}
          </p>
        </div>
      </div>
      <button
        onClick={toggle}
        disabled={loading}
        className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-bold transition-all ${
          enabled ? "bg-gold text-black" : "bg-white/10 text-white/60"
        }`}
      >
        {enabled ? "Habilitado" : "Desabilitado"}
      </button>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <h1 className="font-amotha text-4xl text-white mb-2">Configurações</h1>
        <p className="font-urbanist text-white-3 uppercase tracking-widest text-[11px]">Gestão Estratégica do Sistema</p>
      </div>

      <AirplaneToggle />

      <SettingToggle
        settingKey="language_switcher_enabled"
        icon={Languages}
        title="Seletor de Idioma"
        onLabel="Visível no menu"
        offLabel="Oculto do menu"
        toastOn="Seletor de idioma habilitado"
        toastOff="Seletor de idioma oculto"
      />

      <SettingToggle
        settingKey="whatsapp_enabled"
        icon={MessageCircle}
        title="WhatsApp no site"
        onLabel="Visível no rodapé e contacto"
        offLabel="Oculto do site"
        toastOn="WhatsApp habilitado no site"
        toastOff="WhatsApp oculto do site"
      />

      <div className="space-y-8 bg-black-2 border border-border p-10 rounded-lg">
        <div className="flex items-center gap-3 mb-10 border-b border-border pb-6">
          <Globe size={20} className="text-gold" />
          <h3 className="font-amotha text-2xl text-white">Integrações Globais</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Calendly URL</label>
            <input type="text" placeholder="https://calendly.com/frederico-prado" className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors" />
          </div>
          <div className="space-y-3">
            <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold">WhatsApp Operacional</label>
            <input type="text" placeholder="+351 9XX XXX XXX" className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors" />
          </div>
          <div className="space-y-3">
            <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold">GA4 Measurement ID</label>
            <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors" />
          </div>
          <div className="space-y-3">
            <label className="font-urbanist text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Meta Pixel ID</label>
            <input type="text" placeholder="XXXXXXXXXXXXXX" className="w-full bg-black border border-border p-4 text-sm text-white/80 outline-none focus:border-gold transition-colors" />
          </div>
        </div>

        <div className="pt-10 flex justify-end">
          <button className="flex items-center gap-2 px-10 py-4 bg-gold text-black text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gold-xl transition-all">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/admin/settings/team" className="bg-black-2 border border-border p-8 rounded-lg group hover:border-gold transition-colors cursor-pointer block">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={24} className="text-gold" />
            <h4 className="font-amotha text-xl text-white">Equipa e Permissões</h4>
          </div>
          <p className="font-urbanist text-xs text-white/40 leading-relaxed uppercase tracking-widest">Gerenciar usuários administrativos e níveis de acesso RBAC.</p>
        </Link>

        <Link to="/admin/settings/scripts" className="bg-black-2 border border-border p-8 rounded-lg group hover:border-gold transition-colors cursor-pointer block">
          <div className="flex items-center gap-4 mb-4">
            <Code size={24} className="text-gold" />
            <h4 className="font-amotha text-xl text-white">Scripts Dinâmicos</h4>
          </div>
          <p className="font-urbanist text-xs text-white/40 leading-relaxed uppercase tracking-widest">Injetar tags de marketing, pixels e widgets personalizados no head/body.</p>
        </Link>

        <Link to="/admin/settings/notifications" className="bg-black-2 border border-border p-8 rounded-lg group hover:border-gold transition-colors cursor-pointer block">
          <div className="flex items-center gap-4 mb-4">
            <Bell size={24} className="text-gold" />
            <h4 className="font-amotha text-xl text-white">Notificações</h4>
          </div>
          <p className="font-urbanist text-xs text-white/40 leading-relaxed uppercase tracking-widest">Configurar alertas via E-mail e Push para novos leads quentes.</p>
        </Link>

        <Link to="/admin/settings/financial" className="bg-black-2 border border-border p-8 rounded-lg group hover:border-gold transition-colors cursor-pointer block">
          <div className="flex items-center gap-4 mb-4">
            <Wallet size={24} className="text-gold" />
            <h4 className="font-amotha text-xl text-white">Financeiro</h4>
          </div>
          <p className="font-urbanist text-xs text-white/40 leading-relaxed uppercase tracking-widest">Taxas de câmbio, valores de mandatos e integrações de pagamento.</p>
        </Link>
      </div>
    </div>
  );
}