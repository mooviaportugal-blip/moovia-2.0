import { useState, type ReactNode } from "react";

type Option = {
  value: string;
  label: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const img = (file: string, alt: string) => (
  <img src={`/familias/${file}`} alt={alt} className="w-full h-full object-contain" />
);

const options: Option[] = [
  { value: "individual", label: "Vou sozinho(a)", icon: img("homem.png", "Individual") },
  { value: "casal", label: "Casal", icon: img("Casal.png", "Casal") },
  { value: "casal-filhos", label: "Casal com filhos", icon: img("Casal_Filhos.png", "Casal com filhos") },
  { value: "pet", label: "Vou com meu pet", icon: img("pet_friendly.png", "Pet friendly") },
  { value: "familia", label: "Família", icon: img("Casal_Filhos.png", "Família") },
  { value: "todas-familias", label: "Todos os tipos de famílias", icon: img("Familia_Homem.png", "Todos os tipos de famílias") },
];



export function FamilySelector({
  value,
  onChange,
  className = "",
}: {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState<string>("");
  const selected = value ?? internal;

  const handle = (v: string) => {
    setInternal(v);
    onChange(v);
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-[2px] ${className}`}
      role="radiogroup"
      aria-label="Composição"
    >
      {options.map((o) => {
        const isSel = selected === o.value;
        return (
          <button
            type="button"
            key={o.value}
            role="radio"
            aria-checked={isSel}
            onClick={() => handle(o.value)}
            className={[
              "flex flex-col items-center gap-2.5 px-3 py-6 border transition-all duration-300 select-none cursor-pointer",
              isSel
                ? "bg-[rgba(173,137,87,0.08)] border-gold"
                : "bg-transparent border-[rgba(173,137,87,0.1)] hover:bg-[rgba(173,137,87,0.04)] hover:border-[rgba(173,137,87,0.2)]",
            ].join(" ")}
          >
            <span
              className={[
                "block w-[52px] h-[52px] transition-colors duration-300",
                isSel
                  ? "text-gold"
                  : "text-[rgba(249,245,236,0.3)] group-hover:text-[rgba(173,137,87,0.6)]",
              ].join(" ")}
              aria-hidden
            >
              {o.icon}
            </span>
            <span
              className={[
                "font-body text-[11px] font-[400] tracking-[0.08em] uppercase text-center transition-colors duration-300",
                isSel ? "text-white" : "text-[rgba(249,245,236,0.4)]",
              ].join(" ")}
            >
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
