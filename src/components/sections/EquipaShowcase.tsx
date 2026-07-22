import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
const Linkedin = ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import { reapplyCurrentLang } from "@/i18n";

type Member = {
  id: string;
  name: string;
  initials: string;
  role: string;
  img?: string;
  linkedin?: string;
  chips: string[];
  bio: string[];
  quote?: string;
};

const ALL: Record<string, Member> = {
  frederico: {
    id: "frederico",
    name: "Frederico Prado",
    initials: "FP",
    role: "Founder & CEO",
    img: "/images/frederico.png",
    linkedin: "https://www.linkedin.com/in/fredericoprado/",
    chips: ["29 anos", "Tampa (EUA)", "Lisboa, 2018"],
    bio: [
      "Frederico Prado é Founder & CEO da MOOVIA Portugal. Desenvolveu a sua formação em Comunicação na University of Tampa, nos Estados Unidos, onde viveu durante 4 anos e iniciou a sua trajetória internacional.",
      "Com 29 anos de experiência como executivo em empresas multinacionais de tecnologia e serviços, construiu uma carreira sólida em desenvolvimento de negócios, vendas consultivas e expansão internacional, liderando projetos estratégicos e relações de alto nível entre América Latina, Europa e África.",
      "Ao viver processos de transição internacional em diferentes momentos da vida, como estudante, executivo, investidor e pai de família, passou a conhecer de perto os desafios humanos, financeiros e emocionais envolvidos numa mudança internacional.",
    ],
    quote: "Passei pelo que todo cliente nosso passa, e aprendi o que nunca mais vou deixar ninguém errar.",
  },
  pablo: {
    id: "pablo",
    name: "Pablo Alejandro Saco Paim",
    initials: "PP",
    role: "Co-Founder & CPTO",
    img: "/images/pablo.png",
    linkedin: "https://www.linkedin.com/in/pablo-alejandro-bbb4681a6/",
    chips: ["IST", "SeaRider", "AXL MOTORS", "Digital Assets"],
    bio: [
      "Pablo Alejandro Saco Paim é Co-Founder e Estrategista de Ativos Digitais da MOOVIA Portugal, atuando na interseção entre investimentos, tecnologia e novas dinâmicas globais de alocação patrimonial e mobilidade internacional.",
      "Vive na Europa desde os 17 anos. Atualmente trabalha como engenheiro e está concluindo o seu Mestrado em Engenharia Mecânica no Instituto Superior Técnico.",
    ],
    quote: "Rigor analítico e visão internacional aplicados a cada decisão que a MOOVIA toma.",
  },
  joao: {
    id: "joao",
    name: "João Gabriel Prado",
    initials: "JG",
    role: "Corporate & M&A | Universidade de Lisboa",
    img: "/images/joao.png",
    linkedin: "https://www.linkedin.com/in/joaogabrielprado/",
    chips: ["Abreu Advogados", "ULisboa", "CIDP"],
    bio: [
      "Pós-Graduado em Corporate Finance e em Mergers & Acquisitions (CIDP).",
      "Profissional da Abreu Advogados, integra a área de Corporate e M&A. Na MOOVIA, é responsável pela coordenação jurídica e societária do ecossistema português.",
    ],
    quote: "O conhecimento do sistema jurídico português de dentro é o que diferencia uma boa decisão de uma decisão cara.",
  },

  laura: {
    id: "laura",
    name: "Laura Costa, LL.M.",
    initials: "LC",
    role: "Immigration Legal Specialist",
    img: "/images/laura.png",
    linkedin: "https://www.linkedin.com/in/laura-costa-334bab2a3",
    chips: ["Mestrado ULisboa", "Imigração"],
    bio: [
      "Laura Costa é especialista em mobilidade internacional, imigração e documentação transfronteiriça na MOOVIA Portugal.",
      "Mestre em Direito Penal e Ciências Criminais pela Faculdade de Direito da Universidade de Lisboa, com formação internacional em Itália e República Tcheca.",
    ],
    quote: "Documentação não é burocracia. É a base que permite que a vida em Portugal comece com segurança.",
  },
  sara: {
    id: "sara",
    name: "Sara Russo",
    initials: "SR",
    role: "Head of Real Estate",
    img: "/images/sara.png",
    linkedin: "https://www.linkedin.com/in/sararussoesteves/",
    chips: ["RE/MAX Collection", "Luxo", "10+ anos"],
    bio: [
      "Sara Russo é Real Estate Specialist da MOOVIA Portugal, com mais de 10 anos de experiência no mercado imobiliário português.",
      "Especializada no atendimento a clientes nacionais e internacionais, atua com foco em aquisição imobiliária, investimento e relocation residencial.",
    ],
    quote: "Encontrar o lugar certo não é só sobre metros quadrados. É sobre entender onde cada família vai ser feliz.",
  },
  leticia: {
    id: "leticia",
    name: "Dra. Letícia de Mello",
    initials: "LM",
    role: "Co-Founder & CSO | Wellness & Integração Familiar",
    img: "/images/leticia.jpg",
    linkedin: "https://www.linkedin.com/in/let%C3%ADcia-mello-48610721",
    chips: ["Psicologia", "Wellness"],
    bio: [
      "Psicóloga responsável pela frente de Wellness e Integração Familiar da MOOVIA, com foco no acompanhamento emocional de famílias em processos de transição internacional.",
    ],
    quote: "Mudar de país é, antes de tudo, uma mudança interior.",
  },
  sandra: {
    id: "sandra",
    name: "Sandra Santos",
    initials: "SS",
    img: "/images/sandra.png",
    role: "Real Estate Advisor | Algarve",
    linkedin: "https://www.linkedin.com/in/sandra-santos-361863417",
    chips: ["Algarve", "Investimento"],
    bio: [
      "Consultora imobiliária dedicada, com vivência em três continentes aplicada ao acompanhamento de clientes internacionais.",
    ],
  },
  cristina: {
    id: "cristina-sousa",
    name: "Cristina Sousa",
    initials: "CS",
    role: "Real Estate Advisor | Grande Porto",
    img: "/images/cristina.png",
    chips: ["Grande Porto", "Desde 2019"],
    bio: [
      "Real Estate Advisor da MOOVIA para o Grande Porto. Fisioterapeuta reconvertida ao imobiliário em 2019, combina escuta clínica e conhecimento do mercado.",
    ],
    quote: "Mais do que encontrar um imóvel, quero ser a parceira em quem cada família pode confiar.",
  },
  eduardo: {
    id: "eduardo",
    name: "Eduardo Trindade",
    initials: "ET",
    role: "Director of Strategic Partnerships",
    img: "/images/eduardo.png",
    linkedin: "https://www.linkedin.com/in/eduardotrindade74/",
    chips: ["MBA USP", "25+ anos"],
    bio: [
      "Ponte entre clientes no Brasil e os processos de transição internacional em Portugal. Mais de 25 anos em desenvolvimento de negócios, educação executiva e relações comerciais internacionais.",
    ],
    quote: "A decisão de mudar de país é, antes de tudo, uma decisão de vida.",
  },
  dany: {
    id: "dany",
    name: "Dany Zukerman",
    initials: "DZ",
    role: "School Hunter",
    img: "/images/dany.png",
    chips: ["School Matching", "Educação"],
    bio: [
      "Responsável pela frente de School Hunting da MOOVIA, dedicada à procura, avaliação e apoio à matrícula em escolas para famílias em transição para Portugal.",
    ],
    quote: "A escola certa não é a mais prestigiada. É a que faz cada criança sentir que Portugal também pode ser casa.",
  },
  guilherme: {
    id: "guilherme",
    name: "Guilherme Souza",
    initials: "GS",
    role: "Head of Marketing & Brand",
    img: "/images/guilherme.png",
    linkedin: "https://www.linkedin.com/in/guilherme-souza-ux/",
    chips: ["Branding", "Estratégia"],
    bio: [
      "Head de Marketing & Branding da MOOVIA. Responsável pela estratégia de posicionamento, comunicação institucional e crescimento digital da marca.",
    ],
  },
};

const EQUIPA_INTERNA = [ALL.frederico, ALL.pablo, ALL.joao, ALL.leticia, ALL.eduardo, ALL.guilherme, ALL.laura];
const REDE_PARCEIROS = [ALL.sara, ALL.cristina, ALL.sandra, ALL.dany];

function MemberCard({ m, onOpen, index, isPartner = false }: { m: Member; onOpen: () => void; index: number; isPartner?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center text-center"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Abrir perfil de ${m.name}`}
        className="relative block w-full max-w-[220px] aspect-square overflow-hidden bg-black-3 border border-b18 transition-all duration-500 hover:border-gold/50"
      >
        {m.img ? (
          <img
            src={m.img}
            alt={m.name}
            className="absolute inset-0 h-full w-full object-cover [filter:grayscale(0.5)] transition-all duration-700 group-hover:[filter:grayscale(0)] group-hover:scale-[1.03]"
            style={{ objectPosition: m.id === "sara" ? "center top" : m.id === "sandra" ? "center 15%" : "center 20%" }}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sora font-[100] text-[64px] text-gold/20">{m.initials}</span>
          </div>
        )}
        {m.linkedin && (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 z-[3] grid h-7 w-7 place-items-center bg-black/60 border border-gold/40 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gold hover:text-black"
          >
            <Linkedin className="h-3 w-3" strokeWidth={1.5} />
          </a>
        )}
      </button>

      <div className="mt-5 px-2">
        <h3 className="font-display text-[15px] md:text-[16px] font-[300] text-white leading-tight flex flex-col items-center gap-2">
          {m.name}
          {isPartner && (
            <span className="inline-block border border-gold/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-gold/80 rounded-sm">Rede de Parceiros</span>
          )}
        </h3>
        <p className="mt-1.5 font-body text-[10px] font-[400] uppercase tracking-[0.2em] text-gold/80">
          {m.role}
        </p>
      </div>
    </motion.div>
  );
}

function Lightbox({ m, onClose }: { m: Member; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    reapplyCurrentLang();
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-10"
      style={{ background: "rgba(4,6,16,0.92)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid w-full max-w-[860px] max-h-[92dvh] md:max-h-[85vh] grid-cols-1 overflow-y-auto md:overflow-hidden bg-black md:grid-cols-[320px_1fr] border border-gold/30"
      >
        <div className="relative h-[260px] md:h-auto overflow-hidden bg-black-3">
          {m.img && (
            <img
              src={m.img}
              alt={m.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: m.id === "sara" ? "center top" : undefined }}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-[22px] md:text-[24px] font-[300] text-white leading-tight">{m.name}</p>
            <p className="mt-1 font-body text-[11px] uppercase tracking-[0.22em] text-gold">{m.role}</p>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-gold hover:text-gold-l"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        <div className="relative md:max-h-[85vh] md:overflow-y-auto p-8 md:p-10">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="fixed md:absolute right-4 top-4 z-[30] grid h-10 w-10 place-items-center border border-b18 bg-b15 text-w70 hover:bg-gold hover:text-black"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex flex-wrap gap-2 pr-12">
            {m.chips.map((c) => (
              <span key={c} className="border border-gold/30 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-w70">
                {c}
              </span>
            ))}
          </div>

          <div className="my-6 h-px bg-b18" />

          <div className="space-y-4">
            {m.bio.map((p, i) => (
              <p key={i} className="font-body text-[15px] md:text-[16px] font-[300] leading-[1.8] text-w70">
                {p}
              </p>
            ))}
          </div>

          {m.quote && (
            <div className="mt-6 border-l-[3px] border-gold/40 pl-5 py-3">
              <p className="font-display text-[16px] md:text-[18px] font-[300] italic text-gold-l leading-relaxed">"{m.quote}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipaShowcase() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <section className="bg-black px-6 pb-24 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        
        {/* SECÇÃO A: EQUIPA MOOVIA */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display text-[28px] md:text-[36px] font-[300] text-white">Equipa MOOVIA</h2>
          <p className="mt-2 font-body text-[14px] md:text-[16px] text-white/60">A consultoria que coordena. Enxuta, multidisciplinar, por desenho.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8 mb-24">
          {EQUIPA_INTERNA.map((m, i) => (
            <MemberCard key={m.id} m={m} onOpen={() => setActive(m)} index={i} />
          ))}
        </div>

        {/* SECÇÃO B: REDE DE PARCEIROS */}
        <div id="rede-parceiros" className="mb-12 text-center md:text-left max-w-[800px] scroll-mt-24">
          <h2 className="font-display text-[28px] md:text-[36px] font-[300] text-white">Rede de Parceiros</h2>
          <p className="mt-4 font-body text-[14px] md:text-[16px] text-white/60 leading-[1.8]">
            Quando um executivo precisa de apoio adicional, seja encontrar casa, escolher escola ou tratar documentação, a MOOVIA orquestra uma rede de parceiros especializados para essas necessidades específicas. A empresa pode identificar essa necessidade pelo perfil do cargo e incluir no pacote de mobilidade, ou o próprio executivo aciona os serviços ao conhecer a rede de parceiros que a MOOVIA orquestra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8">
          {REDE_PARCEIROS.map((m, i) => (
            <MemberCard key={m.id} m={m} onOpen={() => setActive(m)} index={i} isPartner />
          ))}
        </div>

      </div>

      <AnimatePresence>{active && <Lightbox m={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}
