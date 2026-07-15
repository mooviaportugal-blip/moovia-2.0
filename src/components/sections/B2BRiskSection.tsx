import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Home as HomeIcon,
  Users,
  GraduationCap,
  UserX,
  Scale,
  Globe2,
  Wrench,
  TrendingDown,
  Frown,
  LogOut,
  Coins,
} from "lucide-react";

const riscos = [
  { icon: Users, label: "Dificuldade de adaptação da família" },
  { icon: HomeIcon, label: "Problemas com habitação" },
  { icon: Globe2, label: "Integração cultural" },
  { icon: GraduationCap, label: "Escolas" },
  { icon: UserX, label: "Isolamento social" },
  { icon: Scale, label: "Expectativas desalinhadas" },
  { icon: Wrench, label: "Dificuldades práticas do dia a dia" },
];

const consequencias = [
  { icon: TrendingDown, label: "Menor produtividade" },
  { icon: Frown, label: "Menor satisfação" },
  { icon: LogOut, label: "Maior risco de turnover" },
  { icon: Coins, label: "Perda do investimento na contratação" },
];

export function B2BRiskSection() {
  return (
    <section className="relative bg-[#05080f] py-24 md:py-32 px-6 lg:px-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(173,137,87,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="max-w-[880px] mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            <span className="h-px w-8 bg-gold/60" />
            Para empresas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-[200] text-white leading-[1.08] tracking-[-0.03em] text-[clamp(28px,4vw,52px)] mb-8"
          >
            O investimento em talento internacional está em risco —{" "}
            <span className="text-gold-l italic font-[300]">
              e a maioria das empresas não sabe disso.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[16px] md:text-[17px] font-[300] text-white/60 leading-[1.8]"
          >
            Empresas investem milhares de euros para contratar talentos internacionais.
            Mas uma parte significativa desse investimento é colocada em risco por
            fatores que ficam fora do processo tradicional de onboarding.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Riscos */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-gold/50" />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase text-white/50">
                Fatores de risco
              </span>
            </div>
            <ul className="space-y-px bg-gold/10">
              {riscos.map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 bg-[#080c18] px-5 py-4"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-gold/80">
                    <r.icon size={16} strokeWidth={1.5} />
                  </span>
                  <span className="font-body text-[14px] md:text-[15px] font-[300] text-white/85">
                    {r.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Consequências */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-gold/50" />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase text-gold">
                Consequências de negócio
              </span>
            </div>
            <ul className="space-y-4">
              {consequencias.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative flex items-center gap-5 border border-gold/20 bg-gradient-to-br from-[#0a1024] to-[#060a18] px-6 py-5 overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold/70"
                  />
                  <span className="flex-shrink-0 w-11 h-11 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                    <c.icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-[16px] md:text-[18px] font-[300] text-white leading-tight">
                    {c.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 font-body text-[14px] font-[300] text-white/55 leading-[1.75] border-l border-gold/30 pl-5">
              O mercado já entende esse problema.{" "}
              <span className="text-white/85">
                O que ainda não existe é uma solução desenhada especificamente
                para reduzi-lo.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex justify-center">
          <Link
            to="/servicos"
            className="group relative inline-flex overflow-hidden border border-gold/50 text-gold hover:text-black font-body font-[600] text-[11px] md:text-[12px] tracking-[0.24em] uppercase px-10 py-5 isolate transition-colors"
          >
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10">
              Conhecer o Human Mobility
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
