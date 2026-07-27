/**
 * Modelo Comercial — fonte única de verdade dos valores de investimento.
 *
 * Qualquer atualização de preço deve ser feita APENAS aqui: todas as páginas
 * (Home e /servicos) consomem este mesmo componente/constantes.
 */

export interface CommercialModelItem {
  /** Título do item de investimento */
  readonly title: string;
  /** Descrição detalhada, em PT-PT */
  readonly description: string;
}

export const COMMERCIAL_MODEL_ITEMS: readonly CommercialModelItem[] = [
  {
    title: "Setup e Onboarding de Entrada",
    description:
      "20% do primeiro salário bruto do colaborador, taxa única associada ao sucesso do início do processo.",
  },
  {
    title: "Acompanhamento e Medição Contínua",
    description:
      "250€ por marco de medição, com um mínimo de 3 medições ao longo do ciclo de 3 a 6 meses, para garantir a estabilização completa.",
  },
  {
    title: "Orquestração Integrada",
    description:
      "Sem custos duplicados. Trabalhamos diretamente com os parceiros fiscais, jurídicos e de mobilidade que a sua empresa já utiliza.",
  },
] as const;

export const COMMERCIAL_MODEL_CLOSING =
  "Um modelo sem taxas ocultas, ancorado na remuneração de entrada e no acompanhamento contínuo até à estabilização completa do colaborador.";

export interface CommercialModelSectionProps {
  /**
   * `compact` remove o wrapper de secção e a Equação de Custo/Retorno,
   * para reutilização dentro de páginas já densas (ex.: /servicos).
   */
  readonly variant?: "full" | "compact";
  readonly className?: string;
}

export function CommercialModelSection({
  variant = "full",
  className,
}: CommercialModelSectionProps) {
  const content = (
    <div className={className}>
      <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
        Modelo Comercial
      </p>
      <h2 className="font-display text-[clamp(26px,3.6vw,42px)] leading-[1.1] tracking-[-0.02em] text-center mb-4">
        <span className="block font-[200] text-white italic">
          Um investimento transparente e proporcional.
        </span>
      </h2>
      <p className="font-body text-[11px] tracking-[0.28em] uppercase text-white/45 text-center mb-10">
        A estrutura de investimento
      </p>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {COMMERCIAL_MODEL_ITEMS.map((item) => (
          <div
            key={item.title}
            className="border border-b18 bg-w05 p-8 flex flex-col"
          >
            <p className="font-display text-[17px] font-[400] text-gold-l mb-3 leading-[1.3]">
              {item.title}
            </p>
            <p className="font-body text-[15px] font-[300] text-white/80 leading-[1.7]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.8] max-w-[820px] mx-auto text-center">
        {COMMERCIAL_MODEL_CLOSING}
      </p>
    </div>
  );

  if (variant === "compact") {
    return content;
  }

  return (
    <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
      <div className="mx-auto max-w-[1200px]">{content}</div>
    </section>
  );
}
