import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";

function CaseEditorial({ t, index }: { t: Testimonial; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[1180px] mx-auto"
    >
      {/* Frame */}
      <div className="relative py-12 md:py-16 border-t border-b border-gold/10 bg-black/20 backdrop-blur-sm overflow-hidden text-center">
        {/* soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(173,137,87,0.08), transparent 70%)" }}
        />

        <div className="relative max-w-[800px] mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <span className="block font-body text-[9px] tracking-[0.32em] uppercase text-gold/60 mb-4">
              Case · {num}
            </span>
            <div className="text-gold/80 text-[12px] tracking-[3px] mb-8" aria-label={`${t.stars} de 5 estrelas`}>
              {"★".repeat(t.stars)}
            </div>
          </div>

          <blockquote className="font-display italic font-[200] text-[18px] md:text-[24px] text-white/90 leading-[1.7] tracking-tight mb-10">
            "{t.text}"
          </blockquote>

          <div className="flex flex-col items-center">
            <span className="block font-display text-[18px] md:text-[20px] text-white font-[300] tracking-wide">
              {t.name}
            </span>
            <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mt-3">
              {t.context}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CasesSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="relative bg-[#04060f] px-6 lg:px-20 py-24 md:py-32 overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(173,137,87,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(173,137,87,0.35), transparent)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="max-w-[880px] mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-3 font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
            <span className="h-px w-8 bg-gold/60" />
            Cases reais
            <span className="h-px w-8 bg-gold/60" />
          </span>
          <h2 className="font-display font-[200] text-white leading-[1.1] tracking-[-0.03em] text-[clamp(30px,4.5vw,52px)]">
            O que as famílias dizem <br className="hidden sm:block" />
            <span className="text-gold-l italic font-[300]">depois do Strategic Assessment.</span>
          </h2>
          <p className="mt-6 font-body text-[15px] md:text-[16px] font-[300] text-white/55 leading-[1.7] max-w-[620px] mx-auto">
            Histórias reais de famílias que atravessaram a transição com clareza, estrutura e um plano coordenado.
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-10 md:space-y-14">
          {testimonials.map((t, i) => (
            <CaseEditorial key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* CTA */}
        {showCta && (
          <div className="mt-20 md:mt-24 flex flex-col items-center gap-5">
            <p className="font-body text-[15px] md:text-[16px] font-[300] text-white/60 text-center max-w-[520px]">
              Pronto para ter essa clareza sobre a sua mudança?
            </p>
            <a
              href="/home#lead-form"
              className="group relative inline-flex overflow-hidden bg-gold text-black font-body font-[600] text-[11px] md:text-[12px] tracking-[0.24em] uppercase px-10 py-5 isolate"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gold">
                Solicitar Global Mobility Success Assessment · A partir de €350 (+IVA)
              </span>
              <span className="absolute inset-0 bg-[#06091a] -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
