import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrainFront } from "lucide-react";

type Member = {
  id: string;
  number: string;
  name: string;
  role: string;
  img?: string;
  logo?: string;
  tags: string[];
  type: 'person' | 'entity' | 'hub';
};

const LINES = [
  {
    id: "L1",
    label: "LINHA 1",
    title: "FOUNDERS",
    subtitle: "DNA DA MOOVIA",
    members: [
      {
        id: "frederico",
        number: "01",
        name: "FREDERICO PRADO",
        role: "CEO & Founder",
        img: "/images/frederico.png",
        tags: ["Revenue Assurance", "Business Intelligence", "Human Mobility Assurance"],
        type: "person" as const
      },
      {
        id: "pablo",
        number: "02",
        name: "PABLO ALEJANDRO",
        role: "CTO & Co-Founder",
        img: "/images/pablo.png",
        tags: ["Tecnologia", "Inteligência de Dados", "Desenvolvimento de IA"],
        type: "person" as const
      },
      {
        id: "leticia",
        number: "03",
        name: "DRA. LETÍCIA MELLO",
        role: "Chief Scientific Officer",
        img: "/images/leticia.jpg",
        tags: ["Human Mobility Assurance", "Metodologias Preditivas", "Inteligência Humana"],
        type: "person" as const
      },
      {
        id: "joao",
        number: "04",
        name: "JOÃO GABRIEL PRADO",
        role: "Legal & Governance",
        img: "/images/joao.png",
        tags: ["Governança Corporativa", "Compliance", "Inteligência Legal"],
        type: "person" as const
      }
    ]
  },
  {
    id: "L2",
    label: "LINHA 2",
    title: "CORE TEAM",
    subtitle: "EQUIPA MOOVIA",
    members: [
      {
        id: "eduardo",
        number: "05",
        name: "EDUARDO TRINDADE",
        role: "Desenvolvimento de Negócio",
        img: "/images/eduardo.png",
        tags: ["Prospecção Empresarial", "Parcerias Estratégicas", "Expansão de Mercado"],
        type: "person" as const
      },
      {
        id: "dany",
        number: "06",
        name: "DANY",
        role: "Especialista em Educação",
        img: "/images/dany.png",
        tags: ["School Hunting", "Apoio à Integração Familiar", "Relação com Escolas"],
        type: "person" as const
      }
    ]
  },
  {
    id: "L3",
    label: "LINHA 3",
    title: "MOOVIA ORQUESTRAÇÃO",
    subtitle: "COORDENAMOS A EXCELÊNCIA",
    members: [
      {
        id: "hub",
        number: "HUB",
        name: "MOOVIA ORQUESTRAÇÃO",
        role: "Hub de Coordenação",
        tags: ["Coordenamos os melhores especialistas no momento certo para cada cliente."],
        type: "hub" as const
      }
    ]
  },
  {
    id: "L4",
    label: "LINHA 4",
    title: "TRUSTED PARTNERS",
    subtitle: "A NOSSA REDE DE ESPECIALISTAS",
    members: [
      {
        id: "sara",
        number: "07",
        name: "SARA",
        role: "Consultora Imobiliária",
        img: "/images/sara.png",
        tags: ["Habitação", "Mercado Imobiliário", "Aconselhamento local"],
        type: "person" as const
      },
      {
        id: "sandra",
        number: "08",
        name: "SANDRA",
        role: "Consultora de Mobilidade",
        img: "/images/sandra.png",
        tags: ["Acompanhamento", "Integração", "Apoio à Família"],
        type: "person" as const
      },
      {
        id: "cristina",
        number: "09",
        name: "CRISTINA",
        role: "Consultora de Mobilidade",
        img: "/images/cristina.png",
        tags: ["Relocation Support", "Integração Cultural", "Apoio à Família"],
        type: "person" as const
      },
      {
        id: "laura",
        number: "10",
        name: "DRA. LAURA COSTA",
        role: "Advogada de Imigração",
        img: "/images/laura.png",
        tags: ["Vistos", "Residência", "Nacionalidade"],
        type: "person" as const
      },
      {
        id: "kmi",
        number: "11",
        name: "KMI",
        role: "Wealth Management",
        logo: "/mooviagold.svg",
        tags: ["Planeamento Financeiro", "Proteção Patrimonial", "Investimentos"],
        type: "entity" as const
      },
      {
        id: "parceiros",
        number: "12",
        name: "+ PARCEIROS",
        role: "Ecossistema",
        tags: [
          "Seguros · Banca · Fiscalidade",
          "Saúde · Tradução · Outros",
          "Serviços Locais"
        ],
        type: "entity" as const
      }
    ]
  }
];

export function LinhaMooverSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Main Title - Centered above the lines */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex items-center gap-3 border border-gold/40 bg-gradient-to-b from-[#1a1308] to-black px-6 py-3 shadow-[0_0_24px_rgba(173,137,87,0.18)] rounded-sm">
            <span className="h-8 w-8 rounded-full bg-gold text-black flex items-center justify-center font-sora font-bold text-sm">M</span>
            <span className="font-urbanist uppercase text-gold tracking-[0.32em] text-sm">
              <span className="opacity-70">Linha</span> <span className="font-semibold">Moovers</span>
            </span>
          </div>
        </div>

        {/* Lines Stack */}
        <div className="space-y-12 md:space-y-20 relative">
          
          {LINES.map((line, lineIdx) => (
            <div key={line.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12" style={{ zIndex: LINES.length - lineIdx }}>
              
              {/* Left Label */}
              <div className="w-full md:w-48 shrink-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                    <TrainFront size={18} />
                  </div>
                  <div>
                    <span className="block font-urbanist text-[10px] tracking-[0.2em] text-gold/60">{line.label}</span>
                    <h3 className="font-sora text-white text-sm font-light tracking-wide">{line.title}</h3>
                  </div>
                </div>
                <p className="font-urbanist text-[10px] tracking-[0.3em] uppercase text-gold/40 ml-14">{line.subtitle}</p>
              </div>

              {/* Rails Container */}
              <div className="relative flex-1 w-full">
                
                {/* Horizontal Rail Line */}
                <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-gold/40 via-gold/60 to-gold/10 hidden md:block" />

                {/* Stations Horizontal (Desktop) / Vertical (Mobile) */}
                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                  {line.members.map((member) => (
                    <div 
                      key={member.id} 
                      className="flex flex-row md:flex-col items-center gap-4 md:gap-0 relative group"
                      onMouseEnter={() => setActiveId(member.id)}
                      onMouseLeave={() => setActiveId(null)}
                    >
                      {/* Station Marker */}
                      <button
                        className={cn(
                          "h-12 w-12 rounded-full border-2 flex items-center justify-center font-urbanist text-xs transition-all duration-300",
                          member.type === 'hub' 
                            ? "h-20 w-20 bg-black border-gold/60 text-gold scale-110 shadow-[0_0_20px_rgba(173,137,87,0.3)]" 
                            : activeId === member.id
                              ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(173,137,87,0.6)] scale-110"
                              : "bg-black border-gold/40 text-gold/70 group-hover:border-gold group-hover:text-gold"
                        )}
                      >
                        {member.type === 'hub' ? (
                          <div className="flex flex-col items-center">
                            <div className="flex gap-1 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                          </div>
                        ) : (
                          member.number
                        )}
                      </button>

                      {/* Content Card (Visible on Hover/Active) */}
                      <AnimatePresence>
                        {activeId === member.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                              "absolute z-[100] w-64 p-5 bg-navy border border-gold/30 shadow-2xl rounded-sm",
                              "md:top-16 md:left-1/2 md:-translate-x-1/2",
                              "left-16 top-0"
                            )}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              {member.type === 'person' && member.img ? (
                                <img src={member.img} alt={member.name} className="h-14 w-14 rounded-full border border-gold/30 object-cover" />
                              ) : member.type === 'entity' && member.logo ? (
                                <div className="h-14 w-14 rounded-full border border-gold/30 bg-black p-2 flex items-center justify-center">
                                  <img src={member.logo} alt={member.name} className="w-full h-full object-contain" />
                                </div>
                              ) : member.type === 'hub' ? (
                                <div className="h-14 w-14 rounded-full border border-gold/60 bg-gold/10 flex items-center justify-center text-gold">
                                  <TrainFront size={24} />
                                </div>
                              ) : (
                                <div className="h-14 w-14 rounded-full border border-gold/30 bg-black/40 flex items-center justify-center text-gold/40">
                                  <span className="font-sora text-xs">M</span>
                                </div>
                              )}
                              <div>
                                <h4 className="font-sora text-white text-sm font-medium tracking-wide">{member.name}</h4>
                                <p className="font-urbanist text-gold/80 text-[10px] uppercase tracking-wider mt-1">{member.role}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {member.tags.map((tag, i) => (
                                <span key={i} className="text-[9px] font-urbanist text-w35 px-2 py-0.5 border border-white/10 rounded-full whitespace-nowrap">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Static Info for Desktop (Simplified) */}
                      <div className="hidden md:block mt-4 text-center w-32 -mx-10 opacity-60 group-hover:opacity-100 transition-opacity">
                        <p className="font-sora text-[11px] text-white/90 truncate">{member.name}</p>
                        <p className="font-urbanist text-[9px] text-gold/60 uppercase tracking-widest mt-1 truncate">{member.role}</p>
                      </div>

                      {/* Mobile Label */}
                      <div className="md:hidden">
                        <h4 className="font-sora text-white text-sm">{member.name}</h4>
                        <p className="font-urbanist text-gold/60 text-[10px] uppercase tracking-wider">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* End Flag */}
          <div className="flex justify-center pt-8">
            <div className="relative flex flex-col items-center">
              <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
              <div className="border border-gold/40 bg-navy px-8 py-3 rounded-sm shadow-[0_0_30px_rgba(173,137,87,0.2)]">
                <div className="flex items-center gap-3">
                  <img src="/logo-icon.svg" alt="MOOVIA" className="h-6 w-6 object-contain" />
                  <div className="text-center">
                    <h3 className="font-sora text-gold text-sm font-semibold tracking-[0.2em] uppercase">Global Mobility Success</h3>
                    <p className="font-urbanist text-w35 text-[10px] mt-1 italic uppercase tracking-widest">
                      Melhores decisões, transições mais suaves e futuros mais fortes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
