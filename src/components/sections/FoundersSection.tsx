import { motion } from "framer-motion";
import { RotatingLogo } from "@/components/ui/RotatingLogo";

export function FoundersSection() {
  return (
    <section id="sobre" className="bg-black py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative z-10 overflow-hidden">
      <RotatingLogo size="min(110vw,1500px)" opacity={0.025} duration={150} />
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
          >
            Fundadores
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(32px,4.5vw,72px)] font-[200] text-white leading-[0.95] tracking-[-0.04em] mb-12"
          >
            "Antes de coordenar<br/>transições internacionais,<br/>vivemos as nossas."
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] font-[300] text-w35 leading-[1.85] max-w-[600px]"
          >
            Background internacional em tecnologia, consultoria e serviços. Cada sócio passou pelo processo que coordenamos. Essa experiência não é marketing: é o único diferencial que nenhum concorrente consegue replicar.
          </motion.p>
        </div>

        {/* Founders Grid, Frederico + Pablo + João (simétrico) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-32">
          {[
            {
              id: "frederico",
              img: "/images/frederico.png",
              name: "Frederico Prado",
              city: "Lisboa",
              role: "Founder & CEO",
              linkedin: "https://www.linkedin.com/in/fredericoprado/",
              chips: ["ORACLE", "GRUPO SONAE", "EUA", "PORTUGAL"],
              bio: "29 anos em TI, negócios internacionais e desenvolvimento de novos mercados. Estudou Comunicação na University of Tampa (EUA). Depois de viver entre Estados Unidos, Brasil e Portugal, fundou a MOOVIA para coordenar transições internacionais de vida e património com estratégia, visão integrada e acompanhamento próximo.",
              quote: "O sucesso de uma mobilidade internacional não depende apenas das decisões certas, mas de quem consegue coordená-las numa única estratégia.",
            },
            {
              id: "pablo",
              img: "/images/pablo.png",
              name: "Pablo Alejandro",
              city: "Lisboa",
              role: "Co-Founder & COO",
              linkedin: "https://www.linkedin.com/in/pablo-alejandro-bbb4681a6/",
              chips: ["IST", "SeaRider", "AXL MOTORS, Inc", "CFD"],
              bio: "Mestrando em Engenharia Mecânica no Instituto Superior Técnico (IST), com investigação em hidrodinâmica, aerodinâmica e otimização de sistemas de alta performance, incluindo projetos com a SeaRider e a AXL MOTORS, Inc. Vive na Europa desde os 17 anos e acompanha de perto as transformações em ativos digitais, inovação financeira e novas formas de preservação de património. Na MOOVIA, contribui para a visão de longo prazo sobre mobilidade internacional, tecnologia e património do futuro.",
              quote: "Transformamos processos complexos em jornadas coordenadas, previsíveis e escaláveis através da tecnologia e da engenharia de processos.",
            },
            {
              id: "joao",
              img: "/images/joao.png",
              name: "João Gabriel Prado",
              city: "Lisboa",
              role: "Co-Founder & Legal Counsel",
              linkedin: "https://www.linkedin.com/in/joaogabrielprado/",
              chips: ["Abreu Advogados", "ULisboa", "CIDP", "Corporate & M&A"],
              bio: "Licenciado pela Faculdade de Direito da Universidade de Lisboa e pós-graduado em Corporate Finance e em M&A & Corporate Litigation pelo CIDP. Integra a área de Corporate e M&A da Abreu Advogados, onde acompanha operações societárias, investimento e transações empresariais. Na MOOVIA, é responsável pelos assuntos jurídicos, societários e de governance da empresa, contribuindo para a construção de uma organização sólida, sustentável e preparada para crescer de forma estruturada.",
              quote: "Toda mobilidade internacional começa por uma decisão jurídica. O nosso papel é garantir que essa decisão seja segura, estruturada e preparada para o futuro.",
            },
            {
              id: "moyses",
              img: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/wL56vv9aWnXIzmsslu1zptvkF1F2/4f81f8a0-6ff2-428f-9eec-ffe38206b1e0.png",
              name: "Moyses Filipe Martins",
              city: "Lisboa",
              role: "Strategic Advisor",
              linkedin: "https://www.linkedin.com/in/moyses-filipe-martins-655168/",
              chips: ["Deloitte", "Oracle", "IBM", "SAP", "Salesforce", "25+ anos"],
              bio: "Conselheiro Estratégico da MOOVIA Portugal, com mais de 25 anos de experiência internacional em tecnologia, transformação digital e desenvolvimento de negócios. Passou por empresas como Deloitte, Oracle, IBM, SAP, Guidewire e Salesforce, apoiando grandes organizações na criação de valor tangível, modernização operacional e construção de relações duradouras com clientes.",
              quote: "Construir uma operação de alto padrão não é sobre tamanho. É sobre critério, disciplina e visão de longo prazo.",
            },


          ].map((f, idx) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col h-full"
            >
              <div className="aspect-[4/5] bg-black-3 overflow-hidden border border-b18 relative group mb-6">
                <img
                  src={f.img}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  alt={f.name}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=1a1d26&color=ad8957&size=512`;
                  }}
                />
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 z-[3] flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                    style={{ background: "#ad8957", border: "1px solid #ad8957" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="font-body text-[12px] font-[300] text-w35 uppercase tracking-widest text-center mb-8">
                {f.name.split(" ")[0]} · {f.city}
              </p>

              <h3 className="font-display text-[28px] font-[200] text-white">{f.name}</h3>
              <p className="font-body text-[11px] font-[400] tracking-[0.18em] uppercase text-gold mt-1 mb-6">
                {f.role}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {f.chips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-b18 px-3 py-1 font-body text-[11px] uppercase tracking-wider text-w35"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="font-body text-[15px] font-[300] text-w35 leading-[1.9] mb-8">{f.bio}</p>

              <div className="border-l-2 border-gold bg-w05 p-8 mt-auto">
                <p className="font-display text-[18px] font-[200] text-gold-m italic leading-relaxed">
                  "{f.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
