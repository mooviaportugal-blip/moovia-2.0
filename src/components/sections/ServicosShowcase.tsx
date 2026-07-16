import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ConstellationLogo } from "@/components/ui/ConstellationLogo";
import { reapplyCurrentLang } from "@/i18n";


type Service = { name: string; desc: string };
type Group = { label?: string; items: Service[] };
type Pillar = {
  id: string;
  num: string;
  verb: string;
  moment: string;
  tagline: string;
  result: string;
  groups: Group[];
};

const PILLARS: Pillar[] = [
  {
    id: "planejamos",
    num: "01",
    verb: "Planejamos",
    moment: "Antes da mudança",
    tagline: "Tomar as decisões certas antes de mudar.",
    result: "Plano Estratégico de Transição Internacional",
    groups: [
      {
        items: [
          { name: "Avaliação Estratégica", desc: "Sessão de 60 minutos com 1 founder. Diagnóstico completo do perfil familiar, financeiro e migratório. Entregável físico com mapa de decisão, estratégias e cronograma. É o primeiro trabalho real da MOOVIA." },
          { name: "Diagnóstico Habitacional", desc: "Análise das opções de habitação alinhadas ao perfil, orçamento e zona pretendida. Define estratégia de arrendamento ou compra, bairros prioritários e próximos passos concretos." },
          { name: "Diagnóstico Educacional", desc: "Levantamento das opções de escolas, públicas, privadas e internacionais, em função da idade, língua, currículo e zona de residência pretendida. Define timeline de matrícula." },
          { name: "Diagnóstico Documental", desc: "Mapeamento de todos os documentos necessários para a transição: passaportes, certidões, apostilas, contratos, diplomas e equivalências. Cronograma de obtenção antes da partida." },
          { name: "Diagnóstico Fiscal Inicial", desc: "Primeira análise do perfil fiscal do cliente: enquadramento mais vantajoso, impacto do IFICI, dupla tributação e estrutura de rendimentos recomendada para a chegada." },
          { name: "Mapa de Decisão", desc: "Documento visual e estruturado com todas as decisões que precisam ser tomadas, em que ordem, com que prazo e com que impacto. O guia central da transição." },
          { name: "Plano de Próximos Passos", desc: "Cronograma detalhado com todas as ações necessárias antes e depois da mudança, distribuídas por responsável, prazo e dependência." },
          { name: "Estratégia Migratória", desc: "Definição do melhor visto ou via de entrada em Portugal (D3, D2, D7, reunificação familiar) com base no perfil, rendimentos e timing. Inclui análise de riscos e alternativas." },
          { name: "Planejamento Fiscal", desc: "Estratégia fiscal de longo prazo: estrutura de rendimentos, enquadramento no IFICI, gestão de dupla tributação, recomendações para minimizar carga fiscal legal em Portugal." },
          { name: "City Experience", desc: "Visita estratégica guiada a Lisboa ou Porto para reconhecimento de bairros, escolas, supermercados, transportes e qualidade de vida. Orientada à decisão, não ao turismo." },
          { name: "Exploração de Bairros e Estilo de Vida", desc: "Análise comparativa de bairros por perfil familiar: segurança, transportes, escolas próximas, comércio, comunidade internacional e custo de vida real por zona." },
          { name: "Planejamento Habitacional", desc: "Definição da estratégia de habitação: arrendar ou comprar, zona prioritária, tipologia ideal, budget compatível com o perfil e timing de busca." },
          { name: "Avaliação de Crédito", desc: "Análise das condições de acesso ao crédito imobiliário em Portugal para não residentes e residentes recentes. Simula capacidade de financiamento e requisitos dos bancos." },
        ],
      },
    ],
  },
  {
    id: "instalamos",
    num: "02",
    verb: "Instalamos",
    moment: "Na chegada",
    tagline: "Tudo que precisa para chegar e ficar legalmente instalado.",
    result: "Família legalmente instalada e operando",
    groups: [
      {
        label: "Habitação",
        items: [
          { name: "Busca Ativa de Habitação", desc: "Identificação e seleção de imóveis alinhados ao perfil, orçamento e zona definidos no diagnóstico. A MOOVIA faz o filtro, o cliente visita apenas o que realmente importa." },
          { name: "Airbnb Hunting & Negotiation", desc: "Para chegadas urgentes ou períodos de transição: identificação de acomodações temporárias de qualidade com negociação de valor e condições de permanência estendida." },
          { name: "Visitas Presenciais", desc: "Acompanhamento nas visitas aos imóveis selecionados com análise crítica de estrutura, localização, vizinhança e adequação ao perfil da família." },
          { name: "Negociação Contratual", desc: "Apoio na negociação dos termos do contrato de arrendamento: valor, duração, cláusulas, garantias e condições de saída. Revisão antes da assinatura." },
        ],
      },
      {
        label: "Documentação",
        items: [
          { name: "NIF (Número de Identificação Fiscal)", desc: "Obtenção do número fiscal português, obrigatório para qualquer ato jurídico ou financeiro em Portugal. Inclui representação fiscal quando necessário." },
          { name: "NISS (Segurança Social)", desc: "Cadastro na Segurança Social portuguesa para acesso a benefícios, contribuições e sistema de saúde complementar." },
          { name: "Número de Utente do SNS", desc: "Inscrição no Serviço Nacional de Saúde para acesso a cuidados de saúde públicos em Portugal." },
          { name: "PB4 (Cobertura de Saúde Internacional)", desc: "Gestão do formulário PB4 entre Brasil e Portugal para cobertura de saúde durante o período de transição para cidadãos com direito." },
          { name: "Conta Bancária", desc: "Abertura de conta bancária em Portugal, processo específico para novos residentes com requisitos próprios de documentação e histórico financeiro." },
          { name: "Carta de Condução", desc: "Processo de troca ou validação da carta de condução estrangeira em Portugal, incluindo prazos e documentação necessária." },
          { name: "Passe Navegante", desc: "Subscrição ao passe de transportes públicos de Lisboa ou Porto, com orientação sobre os tipos disponíveis e vantagens fiscais." },
          { name: "Abertura de Atividade (Recibos Verdes)", desc: "Registo como trabalhador independente em Portugal para emissão de recibos verdes. Inclui enquadramento no regime mais vantajoso." },
          { name: "Estatuto de Igualdade", desc: "Processo para obtenção do Estatuto de Igualdade de Direitos e Deveres para cidadãos brasileiros em Portugal, amplia direitos de residência e acesso a serviços públicos." },
        ],
      },
      {
        label: "Concierge & Instalação",
        items: [
          { name: "Airport Pick-up", desc: "Recepção no aeroporto de Lisboa ou Porto com transporte para o destino, orientação inicial sobre a cidade e primeiros apoios logísticos." },
          { name: "Apoio nas Compras da Primeira Semana", desc: "Acompanhamento nas compras essenciais da primeira semana: supermercado, farmácia, equipamentos básicos do apartamento e orientação sobre onde comprar o quê." },
          { name: "Ativação de Água, Gás, Luz e Internet", desc: "Gestão completa das ativações de utilities no novo apartamento: contratos, agendamentos de instalação e primeiras faturas." },
          { name: "Traduções Certificadas e Juramentadas", desc: "Tradução de documentos pessoais, académicos e profissionais para português europeu, com certificação reconhecida por entidades portuguesas." },
          { name: "Equivalências de Diplomas", desc: "Processo de validação e equivalência de títulos académicos obtidos no Brasil junto às entidades competentes em Portugal." },
        ],
      },
      {
        label: "Pet Relocation",
        items: [
          { name: "Transporte de Animais", desc: "Coordenação completa do transporte de animais de estimação como carga ou bagagem acompanhada pelas companhias parceiras, com orientação sobre caixas, peso e rotas disponíveis." },
          { name: "Documentação Veterinária", desc: "Obtenção do Certificado Veterinário Internacional (CVI) e passaporte europeu para o animal: vacinas, microchip, atestados e validação VIGIAGRO." },
          { name: "Inspeção VIGIAGRO", desc: "Coordenação e orientação para a inspeção sanitária obrigatória à chegada em Portugal (VIGIAGRO), incluindo documentação exigida e pontos de controlo no aeroporto." },
          { name: "Receção e Transporte do Animal", desc: "Receção do animal no aeroporto e transporte até ao destino final, com cuidados de bem-estar no trajeto." },
        ],
      },
    ],
  },
  {
    id: "integramos",
    num: "03",
    verb: "Integramos",
    moment: "Nos primeiros meses",
    tagline: "Transformando uma mudança numa transição de vida.",
    result: "Uma mudança que vira transição de vida",
    groups: [
      {
        label: "Educação",
        items: [
          { name: "School Matching Nacional", desc: "Análise e seleção de escolas públicas e privadas portuguesas com base no perfil da criança, zona de residência, ano letivo e necessidades específicas." },
          { name: "School Matching Internacional", desc: "Seleção de escolas com currículo internacional (IB, British, American) em Lisboa e Porto para famílias que pretendem continuidade curricular ou preparação para universidades internacionais." },
          { name: "Gestão de Matrículas", desc: "Gestão completa do processo de candidatura e matrícula: documentação exigida, prazos, contactos com as escolas e acompanhamento até confirmação da vaga." },
        ],
      },
      {
        label: "Integração Familiar",
        items: [
          { name: "Programa de Integração 30 dias", desc: "Acompanhamento estruturado nas primeiras quatro semanas: check-ins semanais, resolução de imprevistos, orientação sobre serviços locais e apoio emocional à família." },
          { name: "Programa de Integração 60 dias", desc: "Versão estendida com foco na rotina da família: escola, trabalho, saúde, lazer e integração social. Identificação e resolução proativa de desafios de adaptação." },
          { name: "Programa de Integração 90 dias", desc: "Acompanhamento completo dos três primeiros meses, o período mais crítico de qualquer transição internacional. Relatório final de integração com recomendações para os próximos 6 meses." },
        ],
      },
      {
        label: "Continuidade Profissional",
        items: [
          { name: "Orientação de Mercado", desc: "Leitura do mercado português por setor: oportunidades, salários de referência, dinâmicas locais e caminhos realistas para retomar a carreira em Portugal." },
          { name: "Networking Estratégico", desc: "Conexões com profissionais, associações e ambientes relevantes ao perfil da família, para acelerar a entrada no mercado e a construção de reputação local." },
          { name: "Validação Profissional e Académica", desc: "Orientação sobre reconhecimento de diplomas, equivalências e certificações necessárias para o exercício da profissão em Portugal e na União Europeia." },
          { name: "Apoio ao Empreendedorismo (quando aplicável)", desc: "Orientação inicial para quem pretende empreender em Portugal: estrutura, enquadramento, primeiros passos e ligação a parceiros especializados." },
        ],
      },
      {
        label: "Comunidade e Pertencimento",
        items: [
          { name: "Conexão com Redes Locais", desc: "Ligação a redes, associações e ambientes locais alinhados ao momento de vida da família, para criar pertencimento real desde os primeiros meses." },
          { name: "Comunidades Compatíveis com o Perfil", desc: "Identificação de comunidades compatíveis com o perfil cultural, profissional e familiar, respeitando a singularidade de cada família." },
          { name: "Atividades para Adultos e Crianças", desc: "Curadoria de atividades, clubes e experiências regulares para adultos e crianças, criando rotina, vínculo e qualidade de vida em Portugal." },
          { name: "Construção de Rede de Apoio", desc: "Apoio na construção de uma rede de relações próximas, pessoais e profissionais, que sustenta a família para além do período de chegada." },
        ],
      },
      {
        label: "Bem-Estar e Qualidade de Vida",
        items: [
          { name: "Rede de Saúde de Referência", desc: "Mapeamento e indicação de médicos, clínicas e hospitais de referência alinhados ao perfil da família, com orientação sobre seguros, SNS e acesso à rede privada." },
          { name: "Apoio Psicológico Especializado, Dra. Letícia de Mello", desc: "Acompanhamento psicológico direto com a Dra. Letícia de Mello, Head de Wellness & Integração Familiar da MOOVIA, com 26 anos de experiência em transição internacional e adaptação familiar, em português brasileiro." },
          { name: "Atividades e Rotinas de Bem-Estar", desc: "Orientação sobre ginásios, desporto, atividades para crianças, espaços ao ar livre e rotinas de bem-estar adaptadas ao novo contexto de vida em Portugal." },
        ],
      },
      {
        label: "Integração Cultural",
        items: [
          { name: "City Tour Estratégico", desc: "Tour pela cidade orientado à vida real, não ao turismo: bairros residenciais, mercados, escolas, transportes, restaurantes e espaços do quotidiano. Para quem quer conhecer Lisboa como morador." },
          { name: "Exploração de Bairros e Estilo de Vida", desc: "Visita comparativa a diferentes zonas de Lisboa ou Porto com análise de custo de vida, comunidade, acessos e qualidade do ambiente para famílias e casais." },
          { name: "Compreensão da Cultura Local", desc: "Orientação sobre costumes, códigos sociais, gastronomia, tradições e formas de relacionamento típicas da cultura portuguesa, para uma integração real e não superficial." },
          { name: "Navegação da Vida Quotidiana em Portugal", desc: "Apoio prático para navegar serviços públicos, comércio, saúde, transportes e a burocracia do dia-a-dia em Portugal com autonomia e segurança." },
        ],
      },
    ],
  },
  {
    id: "estruturamos",
    num: "04",
    verb: "Estruturamos",
    moment: "Para a vida toda",
    tagline: "Para quem quer estruturar a vida financeira em Portugal.",
    result: "Vida estruturada, património protegido e operações em conformidade",
    groups: [
      {
        label: "Estruturação e Encaminhamento Patrimonial",
        items: [
          { name: "Diagnóstico Patrimonial para Mobilidade Internacional", desc: "Mapeamento inicial da situação patrimonial da família entre Brasil e Portugal (contas, imóveis, ativos), identificando pontos que requerem organização e coordenação com parceiros regulados." },
          { name: "Identificação de necessidades de estruturação patrimonial", desc: "Levantamento das necessidades específicas de estruturação, para posterior encaminhamento a parceiros independentes especializados e regulados." },
          { name: "Encaminhamento para parceiros especializados em investimento", desc: "Ponte com parceiros independentes qualificados e regulados (como a KMI Consultants) para as decisões de investimento. A MOOVIA coordena; o aconselhamento financeiro é prestado pelo parceiro." },
          { name: "Apoio a Operações Imobiliárias", desc: "Coordenação operacional em operações imobiliárias em Portugal: aquisição, venda, financiamento e articulação com advogados, notários e fiscalistas parceiros." },
        ],
      },
      {
        label: "Fiscalidade & Compliance",
        items: [
          { name: "Enquadramento Fiscal", desc: "Análise do regime fiscal mais vantajoso para o perfil do cliente em Portugal: trabalhador por conta de outrem, independente, empresário ou investidor. Inclui recomendação de estrutura." },
          { name: "Identificação de temas fiscais relevantes para a mudança internacional", desc: "Mapeamento dos temas fiscais que impactam a mudança entre Brasil e Portugal, com articulação de parceiros contabilísticos e fiscais qualificados para o aconselhamento técnico." },
          { name: "Análise de Dupla Tributação", desc: "Estudo descritivo do Tratado de Dupla Tributação Brasil-Portugal aplicado ao caso do cliente, em articulação com parceiros fiscais especializados." },
          { name: "Coordenação de Transferência de Residência Fiscal", desc: "Coordenação do processo de alteração da residência fiscal do Brasil para Portugal, articulando parceiros contabilísticos nos dois países para a execução técnica." },
          { name: "Regularização Fiscal", desc: "Processo de regularização de situações fiscais em dívida ou irregulares junto à Autoridade Tributária, com plano de pagamento e resolução estruturada." },
          { name: "Cumprimento das Obrigações Fiscais", desc: "Gestão integral das obrigações fiscais anuais e periódicas em Portugal, IRS, IVA e demais declarações, garantindo conformidade e prazos junto à Autoridade Tributária." },
          { name: "Segurança Social", desc: "Orientação e gestão das contribuições para a Segurança Social em Portugal: regime de trabalhador independente, isenções disponíveis e impacto nos direitos futuros." },
        ],
      },
      {
        label: "Empreendedorismo & Empresas",
        items: [
          { name: "Constituição de Empresa", desc: "Criação de sociedade em Portugal (ENI, Lda. ou SA): escolha da forma jurídica, capital social, sede, pacto social e cadastro na Conservatória e nas Finanças." },
          { name: "Estruturação Societária", desc: "Definição da melhor estrutura legal e fiscal para a empresa: sócios, quotas, distribuição de lucros, holding ou estrutura operacional simples." },
          { name: "Gestão Contabilística e Fiscal da Empresa", desc: "Gestão contabilística e fiscal mensal da empresa em Portugal: lançamentos, balancetes, declarações periódicas e cumprimento integral das obrigações legais." },
          { name: "Estrutura Operacional da Empresa", desc: "Definição da estrutura operacional da empresa em Portugal: equipas, processos, gestão de remunerações e relação com a Autoridade Tributária e Segurança Social." },
          { name: "Consultoria Fiscal Empresarial", desc: "Apoio estratégico contínuo em questões fiscais da empresa: otimização de carga tributária, reorganização societária e compliance permanente." },
          { name: "Apoio à Instalação Empresarial", desc: "Suporte completo para empresários e investidores que pretendem estabelecer operações em Portugal: licenças, localização, recrutamento inicial e conexão com o ecossistema local." },
        ],
      },
      {
        label: "Planejamento Familiar de Longo Prazo",
        items: [
          { name: "Revisão Estratégica Periódica", desc: "Encontros periódicos de revisão da estratégia patrimonial, fiscal e familiar, com ajustes face à evolução da vida em Portugal e aos novos objetivos da família." },
          { name: "Planejamento Educacional", desc: "Acompanhamento estratégico do percurso educacional dos filhos ao longo dos anos, incluindo transição entre ciclos, opções internacionais e preparação universitária." },
          { name: "Apoio a Novos Projetos Familiares", desc: "Apoio estruturado a novos projetos da família, aquisição de imóveis, novos negócios, mudança de cidade ou expansão patrimonial, sempre alinhado à estratégia global." },
          { name: "Coordenação de Parceiros Especializados", desc: "Coordenação da rede de parceiros especializados (advogados, notários, gestores, médicos) garantindo que cada decisão é tomada com o melhor apoio técnico disponível." },
        ],
      },
    ],
  },
];

function ServiceTag({ s, i, visible }: { s: Service; i: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group/tag transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${i * 40}ms`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative overflow-hidden border border-b18 px-3.5 py-2 font-urbanist text-[11px] uppercase tracking-[0.14em] text-w70 transition-colors hover:border-gold hover:text-white"
      >
        <span className="absolute inset-0 -translate-y-full bg-gold/15 transition-transform duration-500 group-hover/tag:translate-y-0" />
        <span className="relative">{s.name}</span>
      </button>
      {open && (
        <p className="mt-2 max-w-md font-urbanist text-[13px] font-[300] leading-[1.7] text-w35">
          {s.desc}
        </p>
      )}
    </div>
  );
}

function PillarSection({ p, idx }: { p: Pillar; idx: number }) {
  const [visible, setVisible] = useState(false);
  const alt = idx % 2 === 1;

  useEffect(() => {
    setVisible(false);
    const t = window.setTimeout(() => {
      setVisible(true);
      reapplyCurrentLang();
      // re-apply after tag entrance animations mount
      [200, 800, 1800].forEach((d) => window.setTimeout(() => reapplyCurrentLang(), d));
    }, 40);
    return () => window.clearTimeout(t);
  }, [p.id]);

  return (
    <section
      id={p.id}
      className={`relative overflow-hidden px-6 py-16 md:py-24 lg:py-32 lg:px-20 ${alt ? "bg-black-2" : "bg-black"}`}
    >
      {/* Ghost number */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-sora font-[100] leading-none text-white md:block ${
          alt ? "left-[-2vw]" : "right-[-2vw]"
        }`}
        style={{ fontSize: "clamp(200px, 28vw, 360px)", opacity: 0.04 }}
      >
        {p.num}
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <motion.div
          key={`${p.id}-left`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <p className="mb-4 flex items-center gap-3 font-urbanist text-[11px] uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-6 bg-gold" /> Momento
          </p>
          <p className="font-urbanist text-[13px] font-[300] uppercase tracking-[0.18em] text-w35">
            Pilar {p.num} · {p.moment}
          </p>
          <h2
            className="mt-4 font-sora font-[100] leading-[0.95] text-gold-l"
            style={{ fontSize: "clamp(52px, 6vw, 88px)" }}
          >
            {p.verb}
          </h2>
          <p className="mt-8 border-l-2 border-b30 pl-5 font-urbanist text-[18px] font-[300] italic leading-[1.6] text-w70">
            "{p.tagline}"
          </p>
          <div
            className="mt-10 border-l-2 border-gold px-6 py-5"
            style={{ background: "rgba(173,137,87,0.04)" }}
          >
            <p className="font-urbanist text-[10px] uppercase tracking-[0.28em] text-gold">Resultado</p>
            <p className="mt-2 font-sora text-[18px] font-[300] text-white">{p.result}</p>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          key={`${p.id}-right`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative space-y-10"
        >
          {p.id === "estruturamos" && (
            <div
              className="border-l-2 border-gold px-5 py-4 rounded-sm"
              style={{ background: "rgba(173,137,87,0.06)" }}
            >
              <p className="font-urbanist text-[10px] uppercase tracking-[0.28em] text-gold mb-2">Nota Importante</p>
              <p className="font-urbanist text-[13px] font-[300] leading-[1.6] text-w70">
                Os serviços de estruturação patrimonial, planeamento de investimentos e gestão de ativos são prestados pelos nossos parceiros independentes especializados e regulados, nomeadamente a KMI Consultants. A MOOVIA coordena e encaminha, não presta aconselhamento financeiro regulado.
              </p>
            </div>
          )}
          {p.groups.map((g, gi) => {
            const start = p.groups.slice(0, gi).reduce((a, x) => a + x.items.length, 0);
            return (
              <div key={gi}>
                {g.label && (
                  <p className="mb-4 font-urbanist text-[10px] uppercase tracking-[0.28em] text-b30">{g.label}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s, i) => (
                    <ServiceTag key={s.name} s={s} i={start + i} visible={visible} />
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SideNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="fixed right-8 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {PILLARS.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className="group relative grid h-3 w-3 place-items-center"
            aria-label={p.verb}
          >
            <span
              className={`h-2 w-2 rounded-full border border-gold transition-all duration-300 ${
                isActive ? "scale-[1.4] bg-gold" : "bg-transparent group-hover:bg-gold/40"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap border border-b18 bg-black px-2 py-1 font-urbanist text-[10px] uppercase tracking-[0.18em] text-w70 opacity-0 transition-opacity group-hover:opacity-100">
              {p.verb}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function JourneyBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="sticky top-[96px] z-[60] border-y border-b18 bg-black/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] md:overflow-x-auto">
        <div className="grid grid-cols-1 md:min-w-[640px] md:grid-cols-4">
          {PILLARS.map((p, i) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className={`block text-left border-b border-b18 md:border-b-0 md:border-r border-b18 px-5 py-4 md:py-5 transition-colors hover:bg-white/[0.03] ${
                  i === PILLARS.length - 1 ? "md:border-r-0 border-b-0" : ""
                } ${isActive ? "md:border-b-2 md:border-b-gold border-l-2 border-l-gold md:border-l-0" : "md:border-b-2 md:border-b-transparent border-l-2 border-l-transparent md:border-l-0"}`}
              >
                <p className="font-urbanist text-[10px] uppercase tracking-[0.22em] text-gold">
                  {p.num} · {p.verb}
                </p>
                <p className="mt-1 font-urbanist text-[12px] font-[300] text-w70">{p.moment}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>

  );
}

export function ServicosShowcase() {
  const [active, setActive] = useState(PILLARS[0].id);
  const activePillar = PILLARS.find((p) => p.id === active) ?? PILLARS[0];
  const activeIdx = PILLARS.findIndex((p) => p.id === active);

  return (
    <>
      <SideNav active={active} onSelect={setActive} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-black px-6 pb-16 pt-[140px] md:pt-[160px] lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 10% 30%, rgba(173,137,87,0.10), transparent 65%), radial-gradient(50% 60% at 80% 20%, rgba(15,30,60,0.6), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-12">
            <div>
              <p className="mb-6 flex items-center gap-3 font-urbanist text-[11px] uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-6 bg-gold" /> Os pilares
              </p>
              <h1
                className="font-sora font-[100] leading-[1.02] text-white"
                style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              >
                Não resolvemos
                <br />
                tarefas isoladas.
                <br />
                <span className="font-[200] italic text-gold-l">Coordenamos</span>
                <br />
                <span className="font-[200] italic text-gold-l">a jornada inteira.</span>
              </h1>
              <p className="mt-10 max-w-2xl font-urbanist text-[17px] font-[300] leading-[1.8] text-w35">
                Do planejamento estratégico antes da mudança à estruturação da vida financeira em Portugal. Um único ponto de responsabilidade para tudo.
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <ConstellationLogo size={420} />
            </div>
            <div className="lg:hidden flex justify-center">
              <ConstellationLogo size={260} />
            </div>
          </div>
        </div>

      </section>

      <JourneyBar active={active} onSelect={setActive} />

      <PillarSection key={activePillar.id} p={activePillar} idx={activeIdx} />


      {/* CTA */}
      <section className="relative overflow-hidden bg-black px-6 py-16 md:py-24 lg:py-32 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 70% at 50% 40%, rgba(173,137,87,0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <h2
            className="font-sora font-[200] leading-[1.05] text-white"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            As decisões mais caras de uma mudança são tomadas antes da mudança.
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 font-urbanist text-[17px] font-[300] leading-[1.95] text-w35">
            <p>A Avaliação Estratégica é a primeira etapa da metodologia MOOVIA.</p>
            <p>
              Em 60 minutos mapeamos o seu perfil, objetivos e contexto familiar para construir um Plano Estratégico de Transição Internacional que orienta todas as decisões seguintes.
            </p>
          </div>
          <p className="mt-10 font-sora text-[22px] font-[300] italic text-gold-l leading-[1.4]">
            Porque mudar de país não é uma decisão.
            <br />
            É um conjunto de decisões que precisam de fazer sentido em conjunto.
          </p>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 font-urbanist text-[17px] font-[300] leading-[1.95] text-w35">
            <p>
              Isoladamente, cada uma delas tem solução. O desafio é garantir que todas funcionem na mesma direção.
            </p>
            <p>É exatamente isso que a MOOVIA faz.</p>
          </div>
          <p className="mx-auto mt-10 max-w-xl font-urbanist text-[16px] font-[500] leading-[1.8] text-white">
            Não resolvemos tarefas isoladas.
            <br />
            Orquestramos toda a jornada para que cada decisão contribua para a vida que pretende construir em Portugal.
          </p>
          <a
            href="/checkout"
            className="group relative mt-12 inline-flex items-center overflow-hidden bg-gold px-8 py-4 font-urbanist text-[13px] font-[600] uppercase tracking-[0.22em] text-black transition-colors"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold-xl transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Solicitar Global Mobility Success Assessment™</span>
          </a>

        </div>

      </section>
    </>
  );
}
