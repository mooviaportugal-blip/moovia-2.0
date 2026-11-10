import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { notifyTeam } from "@/lib/notify";
import { PhoneInput, EmailInput } from "@/components/ui/PhoneInput";

type Tipo = "pessoa" | "empresa";
type Ctx = "home" | "assessment" | "servicos" | "empresas" | "contacto";

const inputCls =
  "w-full bg-black-3 border-0 border-b border-b18 typo-body text-white placeholder:text-w70 p-4 focus:border-gold outline-none transition-all max-w-none";
const chipBtn = (active: boolean) =>
  `px-4 py-2.5 border typo-caption transition-colors ${
    active
      ? "border-gold bg-gold/10 text-gold-l font-semibold"
      : "border-b18 text-w70 hover:border-gold-l"
  }`;

export function UnifiedLeadForm({ context = "home" }: { context?: Ctx }) {
  const { t } = useTranslation();
  const [tipo] = useState<Tipo>("empresa");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const set = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.nome_empresa) {
      toast.error("Preencha nome do contacto, e-mail corporativo e nome da empresa.");
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        tipo,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp || "",
        message: form.message || null,
        source: context,
        nome_empresa: form.nome_empresa,
        cargo_responsavel: form.cargo_responsavel || null,
        colaboradores_12m: form.colaboradores_12m || null,
        paises_origem_destino: form.paises_origem_destino || null,
        desafio_principal: form.desafio_principal || null,
        programa_existente: form.programa_existente || null,
      };

      const { error } = await supabase.from("leads").insert([payload]);
      if (error) throw error;
      await notifyTeam(
        tipo === "empresa" ? ("empresas_lead" as any) : "form_lead",
        { ...payload, origem: context }
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
        <p className="typo-eyebrow mb-4">Recebido</p>
        <h3 className="typo-h3 text-white">
          Obrigado. A equipa MOOVIA entrará em contacto brevemente.
        </h3>
        <p className="mt-4 typo-body text-w70 mx-auto">
          Vamos rever o seu contexto e responderemos em até um dia útil.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-3"
      >
        {/* 4 campos visíveis por padrão */}
        <input
          required
          placeholder="Nome do contacto"
          value={form.name || ""}
          onChange={(e) => set("name", e.target.value)}
          className={inputCls}
        />

        <div className="bg-black-3 border-0 border-b border-b18 px-4 py-3.5">
          <EmailInput
            required
            value={form.email || ""}
            onChange={(v) => set("email", v)}
            placeholder="E-mail corporativo"
            className="w-full bg-transparent border-0 outline-none typo-body text-white placeholder:text-w70 max-w-none"
          />
        </div>

        <input
          required
          placeholder="Nome da empresa"
          value={form.nome_empresa || ""}
          onChange={(e) => set("nome_empresa", e.target.value)}
          className={inputCls}
        />

        <textarea
          rows={3}
          placeholder="Mensagem (opcional)"
          value={form.message || ""}
          onChange={(e) => set("message", e.target.value)}
          className={inputCls + " resize-none"}
        />

        {/* Bloco expansível fechado por padrão */}
        <div className="border border-b18 bg-black-2/60 mt-2">
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            aria-expanded={showMore}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left typo-caption font-semibold text-gold hover:text-gold-l transition-colors"
          >
            <span>{t("empresas.form.more_details_toggle")}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMore && (
            <div className="p-4 pt-2 flex flex-col gap-3 border-t border-b18">
              <input
                placeholder="Responsável / cargo (ex: Ana Silva, Recursos Humanos)"
                value={form.cargo_responsavel || ""}
                onChange={(e) => set("cargo_responsavel", e.target.value)}
                className={inputCls}
              />

              <div className="bg-black-3 border-0 border-b border-b18 p-4">
                <p className="typo-caption font-semibold text-w70 mb-3">
                  Quantidade de colaboradores
                </p>
                <div className="flex flex-wrap gap-2">
                  {["1-50", "50-100", "100-500", "500-1000", "mais_1000"].map(
                    (v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => set("colaboradores_12m", v)}
                        className={chipBtn(form.colaboradores_12m === v)}
                      >
                        {v === "mais_1000"
                          ? "Mais de 1000"
                          : v === "500-1000"
                          ? "500 a 1000"
                          : v === "1-50"
                          ? "1 a 50"
                          : v === "50-100"
                          ? "50 a 100"
                          : "100 a 500"}
                      </button>
                    )
                  )}
                </div>
              </div>

              <input
                placeholder="País(es) de origem e destino"
                value={form.paises_origem_destino || ""}
                onChange={(e) => set("paises_origem_destino", e.target.value)}
                className={inputCls}
              />

              <div className="bg-black-3 border-0 border-b border-b18 p-4">
                <p className="typo-caption font-semibold text-w70 mb-3">
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

              <div className="bg-black-3 border-0 border-b border-b18 p-4">
                <p className="typo-caption font-semibold text-w70 mb-3">
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

              <div className="bg-black-3 border-0 border-b border-b18 px-4 py-3.5">
                <PhoneInput
                  value={form.whatsapp || ""}
                  onChange={(v) => set("whatsapp", v)}
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-l text-black font-semibold typo-caption py-4 mt-4 rounded-[2px] transition-colors disabled:opacity-50"
        >
          {loading ? "A enviar..." : t("empresas.form.submit")}
        </button>

        <p className="mt-3 text-center font-body text-[12px] text-white/50 font-[300] leading-relaxed">
          {t("contact.privacyNote_prefix", "Ao enviar, reconhece que tratamos os seus dados para responder ao seu pedido, conforme a")}{" "}
          <Link
            to="/politica-de-privacidade"
            className="text-gold underline hover:text-white transition-colors"
          >
            {t("footer.privacy_policy", "Política de Privacidade")}
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
