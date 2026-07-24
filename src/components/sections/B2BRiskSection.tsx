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
            className="inline-block font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Para empresas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-white leading-[1.05] tracking-[-0.03em] text-[clamp(32px,4vw,56px)] mb-10"
          >
            <span className="block font-[200] text-[clamp(28px,4vw,52px)]">Global Mobility Assurance</span>
            <span className="block text-[clamp(18px,2.5vw,28px)] font-body font-[300] tracking-normal text-gold-l mt-4">
              Reduzindo o Global Mobility Risk.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[16px] md:text-[18px] font-[300] text-white/70 leading-[1.8] max-w-[720px] space-y-6"
          >
            <p className="text-white/90 font-medium italic border-l-2 border-gold/50 pl-6 py-2">
              Contratado pela empresa. Vivido pelo executivo. Medido ao longo do tempo.
            </p>
            <p>
              Metodologia desenvolvida pela MOOVIA com base em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000, para reduzir o Global Mobility Risk através de Risk Intelligence, aumentando a retenção, acelerando a integração e transformando a mobilidade internacional em Global Mobility Success.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Riscos */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/mooviagold.png" alt="" className="h-3 w-3 object-contain opacity-50" />
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
              <img src="/mooviagold.png" alt="" className="h-3 w-3 object-contain opacity-50" />
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5"
        >
          <p className="text-[12px] font-body italic text-white/40 tracking-wide">
            Metodologia Global Mobility Assurance, desenvolvida pela MOOVIA com base em princípios internacionalmente reconhecidos de gestão de riscos, incluindo a ISO 31000.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
