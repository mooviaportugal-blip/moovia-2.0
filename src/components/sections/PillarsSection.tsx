import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotatingLogo } from "@/components/ui/RotatingLogo";


const pillars = [
  {
    n: "01",
    verb: "Planejamos",
    tagline: '"Tomar as decisões certas antes de mudar."',
    services: [
      "Avaliação Estratégica", "Diagnóstico Habitacional", "Diagnóstico Educacional",
      "Diagnóstico Documental", "Diagnóstico Fiscal", "Mapa de Decisão",
      "Plano de Próximos Passos",
      "Estratégia Migratória", "Planejamento Fiscal", "City Experience",
      "Exploração de Bairros", "Planejamento Habitacional", "Avaliação de Crédito"
    ],
    result: "Plano Estratégico de Transição Internacional"
  },
  {
    n: "02",
    verb: "Instalamos",
    tagline: '"Tudo que precisa para chegar e ficar legalmente instalado."',
    services: [
      "Habitação (Busca Ativa, Airbnb Hunting, Visitas, Negociação)",
      "NIF", "NISS", "Número de Utente", "PB4", "Conta Bancária",
      "Carta de Condução", "Passe Navegante", "Abertura de Atividade",
      "Recibos Verdes", "Estatuto de Igualdade", "Airport Pick-up",
      "Concierge completo", "Água", "Gás", "Luz", "Internet",
      "Traduções Certificadas", "Equivalências de Diplomas",
      "Pet Relocation, Transporte de Animais",
      "Pet Relocation, Documentação Veterinária",
      "Pet Relocation, Inspeção VIGIAGRO",
      "Pet Relocation, Receção e Transporte do Animal"
    ],
    result: "Família legalmente instalada e operando"
  },
  {
    n: "03",
    verb: "Integramos",
    tagline: '"Transformando uma mudança numa transição de vida."',
    services: [
      "School Matching Nacional", "School Matching Internacional",
      "Gestão de Matrículas",
      "Programa de Integração 30 dias", "Programa de Integração 60 dias", "Programa de Integração 90 dias",
      "Orientação de Mercado", "Networking Estratégico", "Validação Profissional e Académica", "Apoio ao Empreendedorismo (quando aplicável)",
      "Conexão com Redes Locais", "Comunidades Compatíveis com o Perfil", "Atividades para Adultos e Crianças", "Construção de Rede de Apoio",
      "Rede de Saúde de Referência",
      "Apoio Psicológico Especializado, Dra. Letícia de Mello",
      "Atividades e Rotinas de Bem-Estar",
      "City Tour Estratégico",
      "Exploração de Bairros e Estilo de Vida",
      "Compreensão da Cultura Local",
      "Navegação da Vida Quotidiana em Portugal"
    ],
    result: "Uma mudança que vira transição de vida"
  },
  {
    n: "04",
    verb: "Estruturamos",
    tagline: '"Para quem quer estruturar a vida financeira em Portugal."',
    services: [
      "Diagnóstico Patrimonial para Mobilidade Internacional",
      "Identificação de necessidades de estruturação patrimonial",
      "Encaminhamento para parceiros especializados em investimento",
      "Apoio a Operações Imobiliárias",
      "Enquadramento Fiscal",
      "Identificação de temas fiscais relevantes para a mudança internacional",
      "Análise de Dupla Tributação",
      "Coordenação de Transferência de Residência Fiscal",
      "Regularização Fiscal",
      "Cumprimento das Obrigações Fiscais",
      "Segurança Social",
      "Constituição de Empresa",
      "Estruturação Societária",
      "Gestão Contabilística e Fiscal da Empresa",
      "Estrutura Operacional da Empresa",
      "Consultoria Fiscal Empresarial",
      "Apoio à Instalação Empresarial",
      "Revisão Estratégica Periódica",
      "Planejamento Educacional",
      "Apoio a Novos Projetos Familiares",
      "Coordenação de Parceiros Especializados"
    ],
    result: "Vida estruturada, património protegido e operações em conformidade"
  }
];

export function PillarsSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="servicos" className="bg-black-2 py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden">
      <RotatingLogo size="min(100vw,1300px)" opacity={0.025} duration={160} />
      <div className="mx-auto max-w-[1400px] relative">


        <div className="mb-20 relative z-[2] max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Quatro pilares
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(28px,4.5vw,60px)] font-[200] text-white leading-[0.95] tracking-[-0.04em] mb-12"
          >
            "Uma jornada completa."
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] font-[300] text-w35 leading-[1.85] max-w-2xl"
          >
            Não resolvemos tarefas isoladas. Coordenamos a jornada inteira, do planejamento à estruturação da vida em Portugal.
          </motion.p>
        </div>


        <div className="grid md:grid-cols-2 gap-px bg-b18">
          {pillars.map((pillar) => (
            <motion.div 
              key={pillar.n}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActive(active === pillar.n ? null : pillar.n)}
              className="bg-black-2 p-12 relative group cursor-pointer overflow-hidden flex flex-col min-h-[480px]"
            >
              {/* Ghost number */}
              <div className="absolute top-4 right-8 font-display text-[100px] font-[200] text-gold opacity-[0.05] pointer-events-none group-hover:-translate-y-2 transition-transform duration-700">
                {pillar.n}
              </div>

              <h3 className="font-display text-[40px] font-[300] text-gold-l leading-none tracking-[-0.02em] mb-4">
                {pillar.verb}
              </h3>
              <p className="font-body text-[14px] font-[300] italic text-w35 mb-8">
                {pillar.tagline}
              </p>


              <div className="flex flex-wrap gap-2 mb-12">
                {pillar.services.slice(0, active === pillar.n ? undefined : 6).map((service) => (
                  <span 
                    key={service} 
                    className="border border-b18 px-3 py-1.5 font-body text-[10px] uppercase tracking-widest text-w35 group-hover:border-b35 transition-colors"
                  >
                    {service}
                  </span>
                ))}
                {active !== pillar.n && pillar.services.length > 6 && (
                  <span className="font-body text-[10px] text-gold mt-2 uppercase tracking-widest">+ {pillar.services.length - 6} serviços</span>
                )}
              </div>

              <div className="mt-auto border-t border-b18 pt-8 group-hover:border-gold/30 transition-colors">
                <p className="font-body text-[11px] font-[500] uppercase tracking-widest text-gold mb-1">Resultado:</p>
                <p className="font-body text-[13px] font-[300] text-w35">{pillar.result}</p>
              </div>


              {/* Hover line bottom */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-teal transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
