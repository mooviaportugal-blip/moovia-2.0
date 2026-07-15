import { useState } from "react";
import { User, Building2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { notifyTeam } from "@/lib/notify";
import { PhoneInput, EmailInput } from "@/components/ui/PhoneInput";
import { FamilySelector } from "@/components/ui/FamilySelector";

type Tipo = "pessoa" | "empresa";
type Ctx = "home" | "assessment" | "servicos" | "empresas" | "contacto";

const inputCls =
  "w-full bg-black-3 border-0 border-b border-b18 font-urbanist text-[15px] font-[300] text-w70 p-5 focus:border-gold outline-none transition-all";
const chipBtn = (active: boolean) =>
  `px-4 py-3 border font-urbanist text-[12px] tracking-[0.15em] uppercase transition-colors ${
    active
      ? "border-gold bg-gold/10 text-gold-l"
      : "border-b18 text-w70 hover:border-gold-l"
  }`;

export function UnifiedLeadForm({ context = "home" }: { context?: Ctx }) {
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({});
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.whatsapp) {
      toast.error("Preencha nome, e-mail e telefone.");
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        tipo,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        message: form.message || null,
        source: context,
      };
      if (tipo === "pessoa") {
        Object.assign(payload, {
          objective: form.objective,
          timing: form.timing,
          composition: form.composition,
          decision_phase: form.decision_phase,
        });
      } else {
        Object.assign(payload, {
          nome_empresa: form.nome_empresa,
          cargo_responsavel: form.cargo_responsavel,
          colaboradores_12m: form.colaboradores_12m,
          paises_origem_destino: form.paises_origem_destino,
          desafio_principal: form.desafio_principal,
          programa_existente: form.programa_existente,
        });
      }
      const { error } = await supabase.from("leads").insert([payload]);
      if (error) throw error;
      await notifyTeam(
        tipo === "empresa" ? ("empresas_lead" as any) : "form_lead",
        { ...payload, origem: context },
      );
      setDone(true);
    } catch (e: any) {
      toast.error(e?.message || "Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-[720px] text-center border border-gold/30 p-10 md:p-12 bg-black-2">
        <p className="font-urbanist text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
          Recebido
        </p>
        <h3 className="font-sora text-[clamp(22px,3vw,32px)] font-[200] text-white leading-tight">
          Obrigado. A equipa MOOVIA entrará em contacto.
        </h3>
        <p className="mt-6 font-urbanist text-[14px] font-[300] text-w35">
          Vamos rever o seu contexto e responderemos em até um dia útil.
        </p>
      </div>
    );
  }

  // PASSO 0 — bifurcação
  if (tipo === null) {
    return (
      <div className="mx-auto max-w-[860px]">
        <p className="font-urbanist text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
          Primeiro passo
        </p>
        <h3 className="font-sora text-[clamp(24px,3.5vw,38px)] font-[200] text-white leading-tight text-center mb-10">
          Isto é para si ou para a sua <span className="text-gold-l italic">empresa?</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setTipo("pessoa")}
            className="group border border-b30 bg-black-2 p-8 text-left transition-colors hover:border-gold-l"
          >
            <User className="w-8 h-8 text-gold mb-4" />
            <p className="font-sora text-[20px] font-[300] text-white mb-2">Pessoa Física</p>
            <p className="font-urbanist text-[13px] font-[300] text-w35 leading-relaxed">
              Estou a planear a minha mudança.
            </p>
          </button>
          <button
            onClick={() => setTipo("empresa")}
            className="group border border-b30 bg-black-2 p-8 text-left transition-colors hover:border-gold-l"
          >
            <Building2 className="w-8 h-8 text-gold mb-4" />
            <p className="font-sora text-[20px] font-[300] text-white mb-2">Empresa</p>
            <p className="font-urbanist text-[13px] font-[300] text-w35 leading-relaxed">
              Quero mover colaboradores internacionalmente.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px]">
      <button
        onClick={() => setTipo(null)}
        className="font-urbanist text-[11px] tracking-[0.24em] uppercase text-w35 hover:text-gold mb-6"
      >
        ← voltar
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-1"
      >
        {tipo === "pessoa" ? (
          <>
            <select
              required
              value={form.objective || ""}
              onChange={(e) => set("objective", e.target.value)}
              className={inputCls + " appearance-none"}
            >
              <option value="">Qual o seu objetivo principal?</option>
              <option value="trabalhar">Trabalhar em Portugal</option>
              <option value="estudar">Estudar em Portugal</option>
              <option value="familia">Mudar com a família</option>
              <option value="imoveis">Investir em imóveis</option>
              <option value="aposentadoria">Reforma em Portugal</option>
              <option value="outro">Outro</option>
            </select>
            <select
              required
              value={form.timing || ""}
              onChange={(e) => set("timing", e.target.value)}
              className={inputCls + " appearance-none"}
            >
              <option value="">Quando pretende mudar?</option>
              <option value="3m">Menos de 3 meses (urgente)</option>
              <option value="3-6m">3 a 6 meses</option>
              <option value="6-12m">6 a 12 meses</option>
              <option value="1y">Mais de 1 ano</option>
              <option value="pesquisa">Ainda estou a pesquisar</option>
            </select>
            <div className="bg-black-3 border-0 border-b border-b18 p-5">
              <p className="font-urbanist text-[11px] tracking-[0.24em] uppercase text-w35 mb-3">
                Composição
              </p>
              <FamilySelector
                value={form.composition || ""}
                onChange={(v) => set("composition", v)}
              />
            </div>
            <select
              required
              value={form.decision_phase || ""}
              onChange={(e) => set("decision_phase", e.target.value)}
              className={inputCls + " appearance-none"}
            >
              <option value="">Em que fase da decisão está?</option>
              <option value="pesquisa">Apenas a pesquisar</option>
              <option value="comparando">Comparando Portugal com outras opções</option>
              <option value="decidi">Já decidi Portugal, a planear quando</option>
              <option value="agir">Tomei a decisão, preciso agir</option>
              <option value="proposta">Já tenho proposta/contrato assinado</option>
            </select>
          </>
        ) : (
          <>
            <input
              required
              placeholder="Nome da empresa"
              value={form.nome_empresa || ""}
              onChange={(e) => set("nome_empresa", e.target.value)}
              className={inputCls}
            />
            <input
              required
              placeholder="Responsável / cargo (ex: Ana Silva, RH)"
              value={form.cargo_responsavel || ""}
              onChange={(e) => set("cargo_responsavel", e.target.value)}
              className={inputCls}
            />
            <div className="bg-black-3 border-0 border-b border-b18 p-5">
              <p className="font-urbanist text-[11px] tracking-[0.24em] uppercase text-w35 mb-3">
                Colaboradores a mover (12 meses)
              </p>
              <div className="flex flex-wrap gap-2">
                {["1", "2-5", "6-20", "mais_20"].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => set("colaboradores_12m", v)}
                    className={chipBtn(form.colaboradores_12m === v)}
                  >
                    {v === "mais_20" ? "Mais de 20" : v}
                  </button>
                ))}
              </div>
            </div>
            <input
              placeholder="País(es) de origem e destino"
              value={form.paises_origem_destino || ""}
              onChange={(e) => set("paises_origem_destino", e.target.value)}
              className={inputCls}
            />
            <div className="bg-black-3 border-0 border-b border-b18 p-5">
              <p className="font-urbanist text-[11px] tracking-[0.24em] uppercase text-w35 mb-3">
                Principal desafio
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  ["adaptacao_familiar", "Adaptação familiar"],
                  ["habitacao", "Habitação"],
                  ["integracao_cultural", "Integração cultural"],
                  ["retencao_pos_mudanca", "Retenção pós-mudança"],
                  ["nao_identificado", "Ainda não identificámos"],
                  ["outro", "Outro"],
                ].map(([v, l]) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => set("desafio_principal", v)}
                    className={chipBtn(form.desafio_principal === v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-black-3 border-0 border-b border-b18 p-5">
              <p className="font-urbanist text-[11px] tracking-[0.24em] uppercase text-w35 mb-3">
                Programa de mobilidade estruturado?
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  ["sim", "Sim"],
                  ["nao", "Não"],
                  ["parcial", "Parcialmente"],
                ].map(([v, l]) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => set("programa_existente", v)}
                    className={chipBtn(form.programa_existente === v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Contacto — comum */}
        <input
          required
          placeholder={tipo === "empresa" ? "Nome do contacto" : "Nome completo"}
          value={form.name || ""}
          onChange={(e) => set("name", e.target.value)}
          className={inputCls}
        />
        <div className="bg-black-3 border-0 border-b border-b18 px-5 py-4">
          <PhoneInput
            required
            value={form.whatsapp || ""}
            onChange={(v) => set("whatsapp", v)}
          />
        </div>
        <div className="bg-black-3 border-0 border-b border-b18 px-5 py-4">
          <EmailInput
            required
            value={form.email || ""}
            onChange={(v) => set("email", v)}
            placeholder={tipo === "empresa" ? "E-mail corporativo" : "E-mail"}
            className="w-full bg-transparent border-0 outline-none font-urbanist text-[15px] font-[300] text-w70"
          />
        </div>
        <textarea
          rows={3}
          placeholder="Mensagem (opcional)"
          value={form.message || ""}
          onChange={(e) => set("message", e.target.value)}
          className={inputCls + " resize-none"}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black font-urbanist font-[600] text-[13px] tracking-[0.22em] uppercase py-5 mt-8 hover:bg-gold-xl transition-colors disabled:opacity-50"
        >
          {loading ? "A enviar..." : "Enviar e aguardar retorno"}
        </button>
      </form>
    </div>
  );
}
