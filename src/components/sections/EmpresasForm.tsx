import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { notifyTeam } from "@/lib/notify";
import { supabase } from "@/integrations/supabase/client";

type EmpresaForm = {
  company: string;
  contact_name: string;
  role: string;
  volume: string;
  origin_destination: string;
  main_challenge: string;
  has_program: string;
  email: string;
  phone: string;
  message: string;
};

const VOLUMES = ["1 a 50", "50 a 100", "100 a 500", "Mais de 500"];
const CHALLENGES = [
  "Adaptação familiar",
  "Habitação",
  "Integração cultural",
  "Retenção pós-mudança",
  "Ainda não identificámos",
  "Outro",
];
const PROGRAM = ["Sim", "Não", "Parcialmente"];

export function EmpresasForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<EmpresaForm>({
    company: "",
    contact_name: "",
    role: "",
    volume: "",
    origin_destination: "",
    main_challenge: "",
    has_program: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = <K extends keyof EmpresaForm>(k: K, v: EmpresaForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canNext =
    form.company && form.contact_name && form.role && form.volume && form.has_program;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.phone) {
      toast.error("Preencha e-mail e telefone.");
      return;
    }
    setLoading(true);
    try {
      const description = [
        `Empresa: ${form.company}`,
        `Responsável: ${form.contact_name} (${form.role})`,
        `Volume 12m: ${form.volume}`,
        `Origem/Destino: ${form.origin_destination}`,
        `Desafio: ${form.main_challenge}`,
        `Programa estruturado: ${form.has_program}`,
        form.message ? `Mensagem: ${form.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      await supabase
        .from("leads")
        .insert([
          {
            name: `${form.contact_name} · ${form.company}`,
            email: form.email,
            phone: form.phone,
            description,
            source: "empresas",
          } as any,
        ]);

      await notifyTeam("empresas_lead", { ...form, description });
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-black py-24 md:py-32 px-6 lg:px-20">
        <div className="mx-auto max-w-[720px] text-center border border-gold/30 p-12">
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            Recebido
          </p>
          <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-[200] text-white leading-tight mb-6">
            Obrigado. A equipa MOOVIA entrará em contacto.
          </h2>
          <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7]">
            Vamos rever o perfil da sua empresa e responderemos em até um dia útil para agendar a Strategic Discovery Call.
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full bg-transparent border border-white/15 focus:border-gold outline-none text-white font-body text-[15px] font-[300] px-4 py-3 transition-colors";
  const labelCls =
    "block font-body text-[11px] tracking-[0.24em] uppercase text-gold/80 mb-2";

  return (
    <section id="empresas-form" className="bg-black py-24 md:py-32 px-6 lg:px-20">
      <div className="mx-auto max-w-[860px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
        >
          Falar com a MOOVIA
        </motion.p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[200] text-white leading-[1.1] tracking-[-0.03em] mb-6">
          Conte-nos sobre a sua{" "}
          <span className="text-gold-l italic">operação internacional.</span>
        </h2>
        <p className="font-body text-[15px] font-[300] text-w35 leading-[1.7] mb-12 max-w-[680px]">
          Estas perguntas ajudam-nos a entender o perfil da sua empresa antes da Strategic Discovery Call.
        </p>

        <form onSubmit={onSubmit} className="space-y-8">
          {step === 1 && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Nome da empresa</label>
                  <input
                    className={inputCls}
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Responsável / Cargo</label>
                  <input
                    className={inputCls}
                    placeholder="Ex: Ana Silva, RH"
                    value={form.contact_name}
                    onChange={(e) => {
                      const val = e.target.value;
                      set("contact_name", val);
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Cargo / Função</label>
                <input
                  className={inputCls}
                  placeholder="Ex: Head of Global Mobility"
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelCls}>
                  Quantidade de colaboradores
                </label>
                <div className="flex flex-wrap gap-2">
                  {VOLUMES.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => set("volume", v)}
                      className={`px-5 py-3 border font-body text-[13px] transition-colors ${
                        form.volume === v
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/15 text-white/70 hover:border-gold/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>País(es) de origem e destino</label>
                <input
                  className={inputCls}
                  placeholder="Ex: Brasil → Portugal, EUA → Portugal"
                  value={form.origin_destination}
                  onChange={(e) => set("origin_destination", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls}>Programa de mobilidade já estruturado?</label>
                <div className="flex flex-wrap gap-2">
                  {PROGRAM.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => set("has_program", v)}
                      className={`px-5 py-3 border font-body text-[13px] transition-colors ${
                        form.has_program === v
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/15 text-white/70 hover:border-gold/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setStep(2)}
                  className="bg-gold text-black font-body font-[600] text-[12px] tracking-[0.22em] uppercase px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelCls}>Principal desafio identificado</label>
                <div className="flex flex-wrap gap-2">
                  {CHALLENGES.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => set("main_challenge", v)}
                      className={`px-5 py-3 border font-body text-[13px] transition-colors ${
                        form.main_challenge === v
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/15 text-white/70 hover:border-gold/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>E-mail corporativo</label>
                  <input
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Telefone</label>
                  <input
                    type="tel"
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Mensagem (opcional)</label>
                <textarea
                  className={`${inputCls} min-h-[120px]`}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-white/20 text-white/70 font-body font-[500] text-[12px] tracking-[0.22em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold text-black font-body font-[600] text-[12px] tracking-[0.22em] uppercase px-10 py-4 disabled:opacity-50"
                >
                  {loading ? "A enviar..." : "Agendar Discovery Call"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
