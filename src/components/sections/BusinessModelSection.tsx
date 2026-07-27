/**
 * Modelo de Negócio MOOVIA — fonte única de verdade dos valores de investimento.
 *
 * Qualquer atualização de preço deve ser feita APENAS aqui: todas as páginas
 * (Home e /servicos) consomem este mesmo componente/constantes.
 */

export interface BusinessModelItem {
  /** Título do item de investimento */
  readonly title: string;
  /** Descrição detalhada, em PT-PT */
  readonly description: string;
}

export const BUSINESS_MODEL_ITEMS: readonly BusinessModelItem[] = [
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

export const BUSINESS_MODEL_CLOSING =
  "Um modelo transparente, sem taxas ocultas, ancorado na remuneração de entrada e no acompanhamento contínuo até à estabilização completa do colaborador.";

export interface BusinessModelSectionProps {
  /**
   * `compact` remove o wrapper de secção, a Equação de Custo e Retorno,
   * o Retorno do Investimento e o Ciclo Operacional, para reutilização
   * dentro de páginas já densas (ex.: /servicos).
   */
  readonly variant?: "full" | "compact";
  readonly className?: string;
}

export function BusinessModelSection({
  variant = "full",
  className,
}: BusinessModelSectionProps) {
  const isFull = variant === "full";

  const content = (
    <div className={className} data-section="business-model">
      <p className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6 text-center">
        Modelo de Negócio MOOVIA
      </p>
      <h2 className="font-display text-[clamp(26px,3.6vw,42px)] leading-[1.1] tracking-[-0.02em] text-center mb-4">
        <span className="block font-[200] text-white italic">
          O retorno do seu investimento em mobilidade internacional.
        </span>
      </h2>
      <p className="font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.8] max-w-[820px] mx-auto text-center mb-12">
        Substituir um expatriado que não se adaptou custa milhares de euros.
        Garantir a sua adaptação custa uma fração do primeiro salário.
      </p>

      {isFull && (
        <div className="border border-b18 bg-w05 p-8 md:p-10 max-w-[900px] mx-auto mb-12">
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-4">
            A Equação de Custo e Retorno
          </p>
          <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/85 leading-[1.8]">
            O custo médio de uma expatriação malsucedida ou com adaptação lenta
            é de 2 a 3 vezes o salário anual do executivo, somando perda de
            produtividade, fricção familiar e risco de substituição. O nosso
            modelo foi desenhado para eliminar esse risco com um investimento
            proporcional e transparente.
          </p>
        </div>
      )}

      <p className="font-body text-[11px] tracking-[0.28em] uppercase text-white/45 text-center mb-10">
        A Estrutura de Investimento
      </p>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {BUSINESS_MODEL_ITEMS.map((item) => (
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

      {isFull && (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          <div className="border border-b18 bg-w05 p-8">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-4">
              O Retorno do Investimento
            </p>
            <p className="font-body text-[15px] font-[300] text-white/85 leading-[1.7]">
              Com o acompanhamento da MOOVIA, o executivo atinge a sua
              capacidade máxima de trabalho até 2 vezes mais rápido,
              amortizando o investimento logo nos primeiros 3 meses.
            </p>
          </div>
          <div className="border border-b18 bg-w05 p-8">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-4">
              Ciclo Operacional
            </p>
            <p className="font-body text-[15px] font-[300] text-white/85 leading-[1.7]">
              Onboarding e medição operacional em 2 semanas por expatriado, com
              capacidade de escala simultânea até 20 processos em paralelo.
            </p>
          </div>
        </div>
      )}

      <p className="mt-8 font-body text-[15px] md:text-[16px] font-[300] text-w35 leading-[1.8] max-w-[820px] mx-auto text-center">
        {BUSINESS_MODEL_CLOSING}
      </p>
    </div>
  );

  if (!isFull) {
    return content;
  }

  return (
    <section className="bg-[#06091a] py-20 md:py-28 px-6 lg:px-20">
      <div className="mx-auto max-w-[1200px]">{content}</div>
    </section>
  );
}
