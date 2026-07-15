import { motion } from "framer-motion";
import danyAsset from "@/assets/dany.png.asset.json";

type HomeMember = {
  id: string;
  name: string;
  role: string;
  img?: string;
  linkedin?: string;
  chips: string[];
  bio: string;
  caption?: string;
};

type Block = {
  title: string;
  members: HomeMember[];
};

const FUNDADORES: HomeMember[] = [
  {
    id: "frederico",
    name: "Frederico Prado",
    role: "Founder & CEO",
    img: "/images/frederico.png",
    linkedin: "https://www.linkedin.com/in/fredericoprado/",
    chips: ["29 anos", "Tampa (EUA)", "Lisboa, 2018"],
    bio: "Founder & CEO da MOOVIA. 29 anos como executivo internacional. Viveu a mudança para Portugal em 2018.",
  },
  {
    id: "pablo",
    name: "Pablo Alejandro",
    role: "Co-Founder | Digital Assets",
    img: "/images/pablo.png",
    linkedin: "https://www.linkedin.com/in/pablo-alejandro-bbb4681a6/",
    chips: ["IST", "SeaRider", "AXL MOTORS, Inc", "Digital Assets"],
    bio: "Co-Founder da MOOVIA. Mestrando em Engenharia Mecânica no IST, com projetos na SeaRider e AXL MOTORS, Inc. Lidera a visão de tecnologia, ativos digitais e património do futuro.",
  },
  {
    id: "joao",
    name: "João Gabriel Prado",
    role: "Corporate & M&A Professional | Universidade de Lisboa",
    img: "/images/joao.png",
    linkedin: "https://www.linkedin.com/in/joaogabrielprado/",
    chips: ["Abreu Advogados", "ULisboa", "CIDP", "Corporate & M&A"],
    bio: "Pós-Graduado em Corporate Finance e em Mergers & Acquisitions (CIDP). Profissional da Abreu Advogados, integra a área de Corporate e M&A. Na MOOVIA, é responsável pela coordenação jurídica e societária do ecossistema português.",
  },
];

const CONSELHO: HomeMember[] = [
  {
    id: "moyses",
    name: "Moyses Filipe Martins",
    role: "Strategic Advisor",
    img: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/wL56vv9aWnXIzmsslu1zptvkF1F2/4f81f8a0-6ff2-428f-9eec-ffe38206b1e0.png",
    linkedin: "https://www.linkedin.com/in/moyses-filipe-martins-655168/",
    chips: ["Deloitte", "Oracle", "SAP", "25+ anos"],
    bio: "Conselheiro Estratégico com 25+ anos em tecnologia e transformação digital. Passagem por Deloitte, Oracle, IBM, SAP e Salesforce.",
  },
];

const ESPECIALISTAS: HomeMember[] = [
  {
    id: "laura",
    name: "Laura Costa, LL.M.",
    role: "Immigration Legal Specialist",
    img: "/images/laura.png",
    linkedin: "https://www.linkedin.com/in/laura-costa-334bab2a3",
    chips: ["Mestrado ULisboa", "Imigração", "Nacionalidade"],
    bio: "Responsável pelos temas jurídicos de imigração, residência, nacionalidade e enquadramento legal dos clientes.",
  },
  {
    id: "sara",
    name: "Sara Russo",
    role: "Head of Real Estate",
    img: "/images/sara.png",
    linkedin: "https://www.linkedin.com/in/sararussoesteves/",
    chips: ["RE/MAX Collection", "Luxo", "10+ anos"],
    bio: "Coordena a estratégia imobiliária da MOOVIA e a relação com a rede parceira. Especialista RE/MAX Collection.",
  },
  {
    id: "leticia",
    name: "Dra. Letícia de Mello",
    role: "Psicóloga | Wellness & Integração Familiar",
    img: "/__l5e/assets-v1/625c36cf-4e85-4b80-94f9-71df201f523b/leticia.png",
    chips: ["Psicologia", "Wellness", "Integração Familiar"],
    bio: "Apoia famílias internacionais no bem-estar emocional e na adaptação à nova vida em Portugal, com escuta clínica e abordagem humanizada.",
    linkedin: "https://www.linkedin.com/in/let%C3%ADcia-mello-48610721",
  },
];

const REGIONAIS: HomeMember[] = [
  {
    id: "sandra",
    name: "Sandra Santos",
    role: "Real Estate Advisor | Algarve",
    img: "/images/sandra.png",
    linkedin: "https://www.linkedin.com/in/sandra-santos-361863417",
    caption: "Algarve",
    chips: ["Real Estate", "Algarve", "Investimento"],
    bio: "Consultora imobiliária dedicada à cobertura do Algarve. Vivência em três continentes aplicada ao acompanhamento de clientes internacionais.",
  },
  {
    id: "cristina-sousa",
    name: "Cristina Sousa",
    role: "Real Estate Advisor | Grande Porto",
    img: "/__l5e/assets-v1/6da8aae4-ca63-49b0-8fbc-0313ccec9781/cristina.png",
    caption: "Grande Porto",
    chips: ["Grande Porto", "Fisioterapia", "Desde 2019", "Comprador & Arrendatário"],
    bio: "Fisioterapeuta reconvertida ao imobiliário em 2019, especialista no Grande Porto. Combina escuta clínica e conhecimento do mercado para acompanhar compradores e arrendatários com proximidade real em cada etapa do processo.",
  },
];

const COMUNIDADE: HomeMember[] = [
  {
    id: "dany",
    name: "Dany Zukerman",
    role: "Jewish Community Advisor",
    img: danyAsset.url,
    chips: ["Direito UCAM", "18 anos CLO", "Hebraico"],
    bio: "Lidera a integração comunitária e familiar, conectando clientes à comunidade judaica e às redes de apoio em Portugal.",
  },
  {
    id: "eduardo",
    name: "Eduardo Trindade",
    role: "Director of Strategic Partnerships",
    img: "/images/eduardo.png",
    linkedin: "https://www.linkedin.com/in/eduardotrindade74/",
    chips: ["MBA USP", "LIVE UNIVERSITY MBA PROFESSOR", "Parcerias"],
    bio: "Prospecção de parceiros, desenvolvimento de negócios e expansão comercial. 25+ anos em desenvolvimento internacional.",
  },
  {
    id: "guilherme",
    name: "Guilherme Souza",
    role: "Head of Marketing & Brand",
    img: "/images/guilherme.png",
    linkedin: "https://www.linkedin.com/in/guilherme-souza-ux/",
    chips: ["Branding", "Marketing Digital", "Estratégia"],
    bio: "Responsável pela estratégia de marca, posicionamento, comunicação digital e presença institucional da MOOVIA.",
  },
];

const BLOCKS: Block[] = [
  { title: "Conselho Estratégico", members: CONSELHO },
  { title: "Especialistas", members: ESPECIALISTAS },
  { title: "Equipa Regional", members: REGIONAIS },
  { title: "Crescimento da MOOVIA", members: COMUNIDADE },
];

const TOTAL_PROFISSIONAIS = FUNDADORES.length + BLOCKS.reduce((acc, b) => acc + b.members.length, 0);

function LinkedInBadge({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      onClick={(e) => e.stopPropagation()}
      className="absolute top-3 right-3 z-[3] flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
      style={{
        background: "#ad8957",
        border: "1px solid #ad8957",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </a>
  );
}

function MemberCard({ member, index, highlight }: { member: HomeMember; index: number; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`p-6 md:p-10 flex flex-col group relative bg-transparent w-full max-w-[320px] md:max-w-none mx-auto ${highlight ? "ring-1 ring-gold/40" : ""}`}
    >
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-gold transition-all duration-500 group-hover:h-full z-20" />

      <div className="aspect-[4/5] bg-black-3 overflow-hidden border border-b18 relative group mb-8 z-20">
        <img
          src={member.img}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{ objectPosition: member.id === "sara" ? "center top" : undefined }}
          alt={member.name}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1d26&color=ad8957&size=512`;
          }}
        />
        {member.linkedin && <LinkedInBadge url={member.linkedin} />}
        {member.caption && (
          <span className="absolute bottom-3 left-3 z-[3] font-body text-[10px] font-[500] tracking-[0.2em] uppercase text-black bg-gold px-2 py-1">
            {member.caption}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {member.chips.map((chip) => (
          <span key={chip} className="font-body text-[10px] font-[400] text-w35 uppercase tracking-widest border border-b18 px-2 py-1">
            {chip}
          </span>
        ))}
      </div>
      <h4 className="font-display text-[18px] font-[300] text-white mb-1 group-hover:text-gold-l transition-colors">{member.name}</h4>
      <p className="font-body text-[11px] font-[400] tracking-[0.18em] uppercase text-gold mb-6">{member.role}</p>
      <p className="font-body text-[14px] font-[300] text-w35 leading-[1.7]">{member.bio}</p>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative bg-transparent">
      <div className="mx-auto max-w-[1400px] relative bg-transparent">
        <div className="mb-20">
          <h3 className="font-display text-[clamp(28px,3.4vw,42px)] font-[300] text-white mb-6 leading-[1.15]">
            As pessoas certas para as decisões que importam.
          </h3>
          <p className="font-body text-[17px] font-[300] text-w35 leading-[1.85] max-w-[700px]">
            Atendemos famílias internacionais em todas as suas formas.
          </p>
        </div>

        <div className="space-y-20">
          {BLOCKS.map((block) => {
            const single = block.members.length === 1;
            // Always use a consistent 3-column track so every card has the same width
            const gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            void single;
            return (
              <div key={block.title}>
                <p className="mb-8 font-body text-[11px] uppercase tracking-[0.32em] text-gold">{block.title}</p>
                <div className={`grid ${gridCols} gap-px relative bg-transparent`}>
                  {block.members.map((m, i) => (
                    <MemberCard key={m.id} member={m} index={i} highlight={single} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="font-body text-[13px] font-[300] text-w35">{TOTAL_PROFISSIONAIS} profissionais diretamente ligados à MOOVIA.</p>
          <a
            href="/equipa"
            className="font-body text-[11px] font-[500] tracking-[0.22em] uppercase text-black bg-gold border border-gold px-7 py-3 hover:bg-gold-xl hover:border-gold-xl transition-all"
          >
            Ver toda a equipa
          </a>
        </div>
      </div>
    </section>
  );
}
