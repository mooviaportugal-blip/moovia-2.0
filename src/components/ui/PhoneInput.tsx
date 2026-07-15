import { useState, useRef, useEffect } from "react";

export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "BR", name: "Brasil", dial: "+55", flag: "🇧🇷" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "Reino Unido", dial: "+44", flag: "🇬🇧" },
  { code: "ES", name: "Espanha", dial: "+34", flag: "🇪🇸" },
  { code: "FR", name: "França", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Alemanha", dial: "+49", flag: "🇩🇪" },
  { code: "IT", name: "Itália", dial: "+39", flag: "🇮🇹" },
  { code: "NL", name: "Holanda", dial: "+31", flag: "🇳🇱" },
  { code: "CH", name: "Suíça", dial: "+41", flag: "🇨🇭" },
  { code: "BE", name: "Bélgica", dial: "+32", flag: "🇧🇪" },
  { code: "IE", name: "Irlanda", dial: "+353", flag: "🇮🇪" },
  { code: "CA", name: "Canadá", dial: "+1", flag: "🇨🇦" },
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colômbia", dial: "+57", flag: "🇨🇴" },
  { code: "UY", name: "Uruguai", dial: "+598", flag: "🇺🇾" },
  { code: "AO", name: "Angola", dial: "+244", flag: "🇦🇴" },
  { code: "MZ", name: "Moçambique", dial: "+258", flag: "🇲🇿" },
  { code: "AU", name: "Austrália", dial: "+61", flag: "🇦🇺" },
  { code: "AE", name: "Emirados Árabes", dial: "+971", flag: "🇦🇪" },
];

function formatBR(digits: string): string {
  const d = digits.slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Props = {
  value: string;
  onChange: (fullE164: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
};

export function PhoneInput({ value, onChange, className = "", required, placeholder }: Props) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [local, setLocal] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Initialize from value (best-effort)
  useEffect(() => {
    if (!value || local) return;
    const match = COUNTRIES.find((c) => value.startsWith(c.dial));
    if (match) {
      setCountry(match);
      setLocal(value.slice(match.dial.length).trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emit(c: Country, raw: string) {
    const digits = raw.replace(/\D/g, "");
    onChange(`${c.dial} ${digits}`.trim());
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    const formatted = country.code === "BR" ? formatBR(digits) : digits;
    setLocal(formatted);
    emit(country, formatted);
  }

  function selectCountry(c: Country) {
    setCountry(c);
    setOpen(false);
    const digits = local.replace(/\D/g, "");
    const formatted = c.code === "BR" ? formatBR(digits) : digits;
    setLocal(formatted);
    emit(c, formatted);
  }

  return (
    <div ref={ref} className={`relative flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 shrink-0 text-w70 hover:text-white transition-colors font-body text-[15px] font-[300]"
        aria-label="Selecionar país"
      >
        <span className="text-[18px] leading-none">{country.flag}</span>
        <span>{country.dial}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-50"><path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.2" /></svg>
      </button>
      <input
        type="tel"
        inputMode="tel"
        required={required}
        value={local}
        onChange={handleInput}
        placeholder={placeholder || (country.code === "BR" ? "(11) 99999-9999" : "Número")}
        className="flex-1 bg-transparent border-0 outline-none font-body text-[15px] font-[300] text-w70 placeholder:text-w35/50"
      />
      {open && (
        <ul className="absolute top-full left-0 z-50 mt-2 max-h-64 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto bg-black-3 border border-b18 shadow-xl">
          {COUNTRIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => selectCountry(c)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 font-body text-[14px] font-[300] text-w70"
              >
                <span className="text-[18px] leading-none">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-w35">{c.dial}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function EmailInput({
  value,
  onChange,
  className = "",
  required,
  placeholder = "seu@email.com",
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
}) {
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const showError = touched && value.length > 0 && !valid;
  return (
    <>
      <input
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\s+/g, "").toLowerCase())}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
        className={className}
      />
      {showError && (
        <p className="text-[11px] text-red-400 mt-1 font-body">E-mail inválido</p>
      )}
    </>
  );
}
