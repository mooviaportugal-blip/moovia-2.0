import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { notifyLead } from "@/lib/leadNotifications";
import { notifyTeam } from "@/lib/notify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneInput, EmailInput } from "@/components/ui/PhoneInput";
import { ArrowRight } from "@phosphor-icons/react";


const selectFields = [
  { 
    name: "objective", 
    placeholder: "Qual o seu objetivo principal?", 
    options: ["Trabalhar em Portugal", "Estudar em Portugal", "Mudar com a família", "Investir em imóveis", "Reforma em Portugal", "Outro"] 
  },
  {
    name: "timing",
    placeholder: "Quando pretende mudar?",
    options: ["Menos de 60 dias", "3 a 6 meses", "6 a 12 meses", "Já tomei a decisão", "Já tenho proposta assinada", "Ainda pesquisando"]
  },
  {
    name: "composition",
    placeholder: "Quantas pessoas participam da mudança?",
    options: ["Apenas eu", "Casal", "Família com filhos", "Casal com pet", "Família com filhos e pets"]
  },

  {
    name: "decision_phase",
    placeholder: "Em que fase da decisão está?",
    options: ["Apenas pesquisando", "Comparando Portugal com outras opções", "Já decidi Portugal, planejando quando", "Tomei a decisão, preciso agir", "Já tenho proposta ou contrato assinado"]
  },
];

export function LeadForm() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("moovia_partial_lead");
    if (saved) {
      try { setForm(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(form).length > 0 && !submitted) {
      sessionStorage.setItem("moovia_partial_lead", JSON.stringify(form));
    }
  }, [form, submitted]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      if (!form.name || form.name.trim().length < 3) throw new Error("Insira seu nome completo.");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email || !emailRegex.test(form.email)) throw new Error("E-mail inválido.");
      if (!form.whatsapp || form.whatsapp.length < 8) throw new Error("WhatsApp inválido.");
      setStep(2);
    } catch (error: any) {
      setErr(error.message);
      toast.error(error.message);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact_period || !form.contact_method) {
      setErr("Selecione período e meio de contacto.");
      return;
    }
    setLoading(true);
    setErr(null);

    try {
      const sid = localStorage.getItem("moovia_session");
      const utm = JSON.parse(localStorage.getItem("moovia_utm") || "{}");
      const history = JSON.parse(localStorage.getItem("moovia_history") || "[]");

      const { error } = await supabase.from("leads").insert({
        ...form,
        source: "website_form",
        session_id: sid,
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
        page_history: history,
      });

      if (error) throw error;

      sessionStorage.removeItem("moovia_partial_lead");
      setSubmitted(true);
      toast.success("Recebemos seu caso!");
      notifyLead(form);
      notifyTeam("form_lead", form);


    } catch (error: any) {
      const message = error.message || "Tente novamente em instantes.";
      setErr(message);
      toast.error(message);
      reportLovableError(error, { component: "LeadForm", action: "submit" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bento-card p-5 sm:p-8 lg:p-14 bg-navy-rich relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <form onSubmit={step === 1 ? goToStep2 : onSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectFields.map((f) => (
                      <Select key={f.name} onValueChange={(v) => set(f.name, v)} value={form[f.name] || ""}>
                        <SelectTrigger className="w-full bg-navy-deep/50 border-0 border-b border-line-cool text-off font-body text-[14px] font-[300] h-[54px] px-0 outline-none transition-all duration-300 focus:border-cobre focus:ring-0 focus:bg-navy-raise/30 rounded-none">
                          <SelectValue placeholder={f.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-rich border border-line-cool text-off font-body">
                          {f.options.map((o) => (
                            <SelectItem key={o} value={o} className="focus:bg-cobre/10 focus:text-latte">{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="relative group">
                      <input
                        required
                        type="text"
                        id="name"
                        placeholder="Seu nome completo"
                        value={form.name || ""}
                        onChange={(e) => set("name", e.target.value)}
                        className="peer w-full bg-transparent border-0 border-b border-line-cool text-off font-body text-[15px] font-[300] py-4 outline-none transition-all duration-300 focus:border-cobre placeholder:text-transparent"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 top-4 text-mut font-body text-[15px] font-[300] pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-cobre peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-cobre"
                      >
                        Seu nome completo
                      </label>
                    </div>

                    <div className="border-b border-line-cool py-3">
                      <span className="block text-mut font-body text-[11px] font-[300] uppercase tracking-[0.2em] mb-2">WhatsApp</span>
                      <PhoneInput required value={form.whatsapp || ""} onChange={(v) => set("whatsapp", v)} />
                    </div>

                    <div className="border-b border-line-cool py-3">
                      <span className="block text-mut font-body text-[11px] font-[300] uppercase tracking-[0.2em] mb-2">E-mail</span>
                      <EmailInput required value={form.email || ""} onChange={(v) => set("email", v)} className="w-full bg-transparent border-0 outline-none font-body text-[15px] font-[300] text-off" />
                    </div>

                    <div className="relative group pt-2">
                      <textarea
                        id="message"
                        placeholder="Conte brevemente o seu caso (opcional)"
                        rows={2}
                        value={form.message || ""}
                        onChange={(e) => set("message", e.target.value)}
                        className="peer w-full bg-transparent border-0 border-b border-line-cool text-off font-body text-[15px] font-[300] py-4 outline-none transition-all duration-300 focus:border-cobre placeholder:text-transparent resize-none min-h-[80px]"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-0 top-6 text-mut font-body text-[15px] font-[300] pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-cobre peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-cobre"
                      >
                        Conte brevemente o seu caso (opcional)
                      </label>
                    </div>
                  </div>

                  {err && <p className="text-[12px] text-red-400 mt-4">{err}</p>}

                  <button
                    type="submit"
                    className="bg-cobre text-navy-deep font-body text-[11px] font-[600] tracking-[0.22em] uppercase py-5 relative overflow-hidden group w-full mt-6 lg:mt-10 rounded-none transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(173,137,87,0.3)]"
                  >
                    <span className="relative z-10">Continuar →</span>
                    <div className="absolute inset-0 bg-latte origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </button>
                </>
              ) : (
                <div className="space-y-8 py-2">
                  <div>
                    <p className="font-body text-[11px] tracking-[0.32em] uppercase text-cobre mb-2">Passo 2 de 2</p>
                    <h3 className="font-display text-[22px] font-[300] text-latte mb-1">Como prefere ser contatado?</h3>
                    <p className="font-body text-[13px] font-[300] text-mut">Só falta isso para concluir.</p>
                  </div>

                  <div>
                    <p className="block text-mut font-body text-[11px] font-[400] uppercase tracking-[0.2em] mb-3">Melhor período</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[{v:"manha",l:"Manhã"},{v:"tarde",l:"Tarde"},{v:"noite",l:"Noite"}].map(opt => (
                        <button key={opt.v} type="button" onClick={() => set("contact_period", opt.v)}
                          className={`py-4 border font-body text-[12px] tracking-[0.2em] uppercase transition-all ${form.contact_period === opt.v ? "border-cobre bg-cobre/10 text-latte" : "border-line-cool text-off hover:border-cobre"}`}>
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="block text-mut font-body text-[11px] font-[400] uppercase tracking-[0.2em] mb-3">Meio de contacto</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[{v:"ligacao",l:"Ligação"},{v:"video_chamada",l:"Vídeo Chamada"}].map(opt => (
                        <button key={opt.v} type="button" onClick={() => set("contact_method", opt.v)}
                          className={`py-4 border font-body text-[12px] tracking-[0.2em] uppercase transition-all ${form.contact_method === opt.v ? "border-cobre bg-cobre/10 text-latte" : "border-line-cool text-off hover:border-cobre"}`}>
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {err && <p className="text-[12px] text-red-400">{err}</p>}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-4 border border-line-cool text-off font-body text-[11px] tracking-[0.22em] uppercase hover:border-cobre">
                      ← Voltar
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 bg-cobre text-navy-deep font-body text-[11px] font-[600] tracking-[0.22em] uppercase py-4 rounded-none">
                      {loading ? "A processar..." : "Enviar e aguardar retorno"}
                    </button>
                  </div>
                </div>
              )}
            </form>

          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-14"
          >
            <p className="font-body text-[11px] tracking-[0.32em] uppercase text-cobre mb-6">
              Recebido com sucesso
            </p>
            <h3 className="font-display text-[26px] md:text-[32px] font-[300] text-latte leading-tight tracking-wide">
              MUITO OBRIGADO!<br />
              <span className="text-white">EM BREVE UM FUNDADOR IRÁ<br />ENTRAR EM CONTACTO CONSIGO</span>
            </h3>
            <p className="font-body text-[13px] font-[300] text-mut mt-8 max-w-[420px] mx-auto leading-relaxed">
              Enviamos um e-mail de confirmação para <span className="text-white/80">{form.email}</span>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

