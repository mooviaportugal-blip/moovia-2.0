// Static PT→EN/ES dictionary covering all visible UI text.
// Keys are the EXACT trimmed Portuguese strings found in the JSX.
// Values are translations applied at runtime by the DOM walker.

import { DICT_AUTO } from "./dict.auto";

export type Lang = "pt" | "en" | "es";

export const DICT: Record<string, { en: string; es: string }> = {
  // ---------- NAV ----------
  "Como funciona": { en: "How it works", es: "Cómo funciona" },
  "Serviços": { en: "Services", es: "Servicios" },
  "Assessment": { en: "Assessment", es: "Assessment" },
  "Global Mobility Assurance": { en: "Global Mobility Assurance", es: "Global Mobility Assurance" },
  "Insights": { en: "Insights", es: "Insights" },
  "Contacto": { en: "Contact", es: "Contacto" },
  "Avaliar o meu caso": { en: "Assess my case", es: "Evaluar mi caso" },
  "Menu": { en: "Menu", es: "Menú" },

  // ---------- HERO / MARQUEE ----------
  "Coordenação Internacional de Vida e Património": { en: "International Life and Wealth Coordination", es: "Coordinación Internacional de Vida y Patrimonio" },
  "Você não precisa": { en: "You don’t need", es: "No necesitas" },
  "de mais informação.": { en: "more information.", es: "más información." },
  "Precisa de alguém": { en: "You need someone", es: "Necesitas a alguien" },
  "que coordene": { en: "to coordinate", es: "que coordine" },
  "a decisão.": { en: "the decision.", es: "la decisión." },
  "A MOOVIA não resolve tarefas isoladas. Coordenação completa, do primeiro diagnóstico à integração.":
    { en: "MOOVIA doesn't solve isolated tasks. Complete coordination, from the initial diagnostic to integration.", es: "MOOVIA no resuelve tareas aisladas. Coordinación completa, desde el primer diagnóstico hasta la integración." },
  "Ver como funciona": { en: "See how it works", es: "Ver cómo funciona" },
  "Identificar · Medir · Mitigar": { en: "Identify · Measure · Mitigate", es: "Identificar · Medir · Mitigar" },
  "Capítulo 01": { en: "Chapter 01", es: "Capítulo 01" },
  "Mandato de transição": { en: "Transition Mandate", es: "Mandato de transición" },
  "Transição Internacional": { en: "International Transition", es: "Transición Internacional" },
  "Brasil para Portugal": { en: "Brazil to Portugal", es: "Brasil a Portugal" },
  "Coordenação de Vida e Património": { en: "Life and Wealth Coordination", es: "Coordinación de Vida y Patrimonio" },
  "Strategic Assessment": { en: "Strategic Assessment", es: "Strategic Assessment" },
  "Mandato Personalizado": { en: "Personalised Mandate", es: "Mandato Personalizado" },
  "90 dias Pós-chegada": { en: "90-Day Post-Arrival", es: "90 días Post-llegada" },
  "School Matching": { en: "School Matching", es: "School Matching" },
  "Fiscalidade Internacional": { en: "International Taxation", es: "Fiscalidad Internacional" },

  // ---------- PROBLEM ----------
  "O mercado resolve tarefas": { en: "The market solves tasks", es: "El mercado resuelve tareas" },
  "O problema não é a burocracia.": { en: "The problem isn’t bureaucracy.", es: "El problema no es la burocracia." },
  "É que ninguém coordena o todo.": { en: "It’s that no one coordinates the whole picture.", es: "Es que nadie coordina el todo." },
  "Você tem um advogado para o visto, um corretor para o imóvel, uma escola para os filhos, um contador para o NIF. Cada um no seu quadrado. E você no meio tentando fazer tudo encaixar numa das decisões mais complexas da sua vida.":
    { en: "You have a lawyer for the visa, an agent for the property, a school for your children, an accountant for the NIF. Each in their own silo. And you’re in the middle, trying to make everything fit together for one of the most complex decisions of your life.", es: "Tienes un abogado para el visado, un agente para el inmueble, un colegio para los hijos, un contable para el NIF. Cada uno en su cuadrado. Y tú en medio intentando encajar todo en una de las decisiones más complejas de tu vida." },
  "Decisões simultâneas": { en: "Simultaneous Decisions", es: "Decisiones simultáneas" },
  "O tempo não é o maior problema. É tomar dez decisões simultâneas sem ter feito nenhuma delas antes.":
    { en: "Time isn’t the biggest problem. It’s making ten simultaneous decisions without having made any of them before.", es: "El tiempo no es el mayor problema. Es tomar diez decisiones simultáneas sin haber hecho ninguna antes." },
  "Volume de informação": { en: "Information Overload", es: "Volumen de información" },
  "Informação demais, clareza de menos": { en: "Too much information, not enough clarity", es: "Demasiada información, poca claridad" },
  "Grupos de WhatsApp, YouTube, advogados e corretores dizem coisas diferentes. O volume de informação não resolve a decisão, cria mais dúvida.":
    { en: "WhatsApp groups, YouTube, lawyers and agents all say different things. The volume of information doesn't help the decision-making process; it creates more uncertainty.", es: "Grupos de WhatsApp, YouTube, abogados y corredores dicen cosas diferentes. El volumen de información no resuelve la decisión, crea más dudas." },
  "Fatores Humanos Invisíveis": { en: "Invisible Human Factors", es: "Factores humanos invisibles" },
  "Erros que custam": { en: "Costly Mistakes", es: "Errores que cuestan" },
  "As empresas acompanham vistos, custos, prazos e processos. A MOOVIA acrescenta uma nova camada de inteligência: mede e acompanha os fatores humanos que podem determinar o sucesso de uma mobilidade internacional.":
    { en: "Most companies measure visas, arrival dates and administrative processes. MOOVIA adds a new layer of intelligence, measuring the human factors that influence the success of international mobility: integration, family adaptation, engagement, retention and productivity.", es: "La mayoría de las empresas miden visados, fechas de llegada y procesos administrativos. MOOVIA añade una nueva capa de inteligencia, midiendo los factores humanos que influyen en el éxito de la movilidad internacional: integración, adaptación familiar, compromiso, retención y productividad." },
  "Adaptação estruturada": { en: "Structured Integration", es: "Adaptación estructurada" },
  "O depois que ninguém resolve": { en: "The 'after' that no one addresses", es: "El después que nadie resuelve" },
  "Chegar é metade do processo. A adaptação, do cônjuge que largou a carreira, das crianças na nova escola, da rotina reconstruída, exige acompanhamento real.":
    { en: "Arriving is only half the process. The adaptation—for the spouse who left a career behind, for the children in a new school, for the rebuilt family routine—requires real support.", es: "Llegar es la mitad del proceso. La adaptación, del cónyuge que dejó su carrera, de los hijos en la nueva escuela, de la rutina reconstruida, exige acompañamiento real." },
  "O mercado resolve tarefas.": { en: "The market solves tasks.", es: "El mercado resuelve tareas." },
  "A MOOVIA resolve a decisão.": { en: "MOOVIA solves the decision.", es: "MOOVIA resuelve la decisión." },

  // ---------- FOUNDERS ----------
  "Os fundadores são o produto": { en: "The founders are the product", es: "Los fundadores son el producto" },
  "\"Antes de coordenar": { en: "\"Before coordinating", es: "\"Antes de coordinar" },
  "transições internacionais,": { en: "international transitions,", es: "transiciones internacionales," },
  "vivemos as nossas.\"": { en: "we went through our own.\"", es: "vivimos las nuestras.\"" },
  "Background de Deloitte, Oracle e SAP. Cada sócio passou pelo processo que coordenamos. Essa experiênia não é marketing: é o único diferencial que nenhum concorrente consegue replicar.":
    { en: "Backgrounds from Deloitte, Oracle and SAP. Each partner has been through the process we now coordinate. This experience isn’t marketing: it’s the one differentiator no competitor can replicate.", es: "Trayectoria en Deloitte, Oracle y SAP. Cada socio pasó por el proceso que coordinamos. Esa experiencia no es marketing: es el único diferencial que ningún competidor logra replicar." },
  "Founder & CEO": { en: "Founder & CEO", es: "Founder & CEO" },
  "Co-Founder & CFO": { en: "Co-Founder & CFO", es: "Co-Founder & CFO" },
  "Co-Founder": { en: "Co-Founder", es: "Co-Founder" },
  "29 anos em TI multinacional. MBA em Empreendedorismo FGV. Formação em Comunicação na University of Tampa. Em Lisboa desde 2018 com a família. Viveu a transição que hoje coordena e conduz pessoalmente cada mandato.":
    { en: "29 years in multinational IT. MBA in Entrepreneurship from FGV. Communications degree from the University of Tampa. Based in Lisbon with his family since 2018. He has personally experienced the transition he now coordinates, and personally leads every mandate.", es: "29 años en TI multinacional. MBA en Emprendimiento FGV. Formación en Comunicación en la University of Tampa. En Lisboa desde 2018 con su familia. Vivió la transición que hoy coordina y conduce personalmente cada mandato." },
  "Vamos coordenar a sua transição internacional com o mesmo nível de cuidado, estrutura e atenção que gostaríamos de ter recebido na nossa.":
    { en: "We will coordinate your international transition with the same level of care, structure and attention that we would have wanted to receive during our own.", es: "Coordinaremos tu transición internacional con el mismo nivel de cuidado, estructura y atención que nos habría gustado recibir en la nuestra." },
  "Com trajetória internacional iniciada aos 17 anos, lidera as áreas financeira e tecnológica da MOOVIA. Mestrando em Engenharia Mecânica no Instituto Superior Técnico, assegura que cada mandato seja estruturado com eficiência, previsibilidade e visão de longo prazo.":
    { en: "With an international career that began at 17, he heads the finance and technology areas at MOOVIA. A Master's student in Mechanical Engineering at Instituto Superior Técnico, he ensures every mandate is structured with efficiency, predictability and a long-term vision.", es: "Con una trayectoria internacional iniciada a los 17 años, lidera las áreas financiera y tecnológica de MOOVIA. Maestrando en Ingeniería Mecánica en el Instituto Superior Técnico, asegura que cada mandato se estructure con eficiencia, previsibilidad y visión a largo plazo." },
  "Estruturamos cada mandato com a precisão de engenharia e a previsibilidade financeira que uma decisão desta dimensão exige.":
    { en: "We structure each mandate with the engineering precision and financial predictability that a decision of this magnitude requires.", es: "Estructuramos cada mandato con la precisión de la ingeniería y la previsibilidad financiera que una decisión de esta dimensión exige." },
  "Engenharia Mecânica": { en: "Mechanical Engineering", es: "Ingeniería Mecánica" },
  "Europa desde os 17": { en: "Europe since 17", es: "Europa desde los 17" },
  "Lisboa, 2018": { en: "Lisbon, 2018", es: "Lisboa, 2018" },
  "Equipa": { en: "Team", es: "Equipo" },
  "FUNDADORES": { en: "FOUNDERS", es: "FUNDADORES" },
  "LIDERANÇA & ESTRATÉGIA": { en: "LEADERSHIP & STRATEGY", es: "LIDERAZGO & ESTRATEGIA" },
  "EQUIPA PRINCIPAL": { en: "CORE TEAM", es: "EQUIPO PRINCIPAL" },
  "TECNOLOGIA & ESPECIALISTAS": { en: "TECHNOLOGY & SPECIALISTS", es: "TECNOLOGÍA & ESPECIALISTAS" },
  "GLOBAL MOBILITY ASSURANCE": { en: "GLOBAL MOBILITY ASSURANCE", es: "GLOBAL MOBILITY ASSURANCE" },
  "INTELIGÊNCIA & COORDENAÇÃO": { en: "INTELLIGENCE & COORDINATION", es: "INTELIGENCIA & COORDINACIÓN" },
  "REDE DE ESPECIALISTAS": { en: "EXPERT NETWORK", es: "RED DE ESPECIALISTAS" },
  "ECOSSISTEMA MULTIDISCIPLINAR": { en: "MULTIDISCIPLINARY ECOSYSTEM", es: "ECOSISTEMA MULTIDISCIPLINARIO" },
  "Ecossistema": { en: "Ecosystem", es: "Ecosistema" },
  "ECOSSISTEMA MOOVIA": { en: "MOOVIA ECOSYSTEM", es: "ECOSISTEMA MOOVIA" },
  "As pessoas que conduzem cada mandato.": { en: "The people who lead each mandate.", es: "Las personas que conducen cada mandato." },
  "Inteligência & Coordenação": { en: "Intelligence & Coordination", es: "Inteligencia & Coordinación" },
  "Head of Operations": { en: "Head of Operations", es: "Head of Operations" },
  "Legal & Compliance": { en: "Legal & Compliance", es: "Legal & Compliance" },
  "Relocation Lead": { en: "Relocation Lead", es: "Relocation Lead" },
  "Client Experience": { en: "Client Experience", es: "Client Experience" },

  // ---------- TEAM ----------
  "A equipa que coordena a sua jornada.": { en: "The team coordinating your journey.", es: "El equipo que coordina tu trayecto." },
  "Cada membro da MOOVIA foi escolhido pela profundidade da experiência, não pelo tamanho do currículo. São as pessoas certas para as decisões que importam.":
    { en: "Each member of the MOOVIA team was chosen for the depth of their experience, not the length of their CV. They are the right people for the decisions that matter.", es: "Cada miembro de MOOVIA fue elegido por la profundidad de su experiencia, no por el tamaño de su currículum. Son las personas adecuadas para las decisiones que importan." },
  "Conselheiro Estratégico": { en: "Strategic Advisor", es: "Asesor Estratégico" },
  "Strategic Relocation Advisor": { en: "Strategic Relocation Advisor", es: "Strategic Relocation Advisor" },
  "Education & Family Transition Advisor": { en: "Education & Family Transition Advisor", es: "Education & Family Transition Advisor" },
  "Mobilidade Internacional": { en: "International Mobility", es: "Movilidad Internacional" },
  "Real Estate Specialist": { en: "Real Estate Specialist", es: "Real Estate Specialist" },
  "Advogado na Abreu Advogados em Corporate e M&A. Pós-graduações CIDP em Corporate Finance e M&A. O braço jurídico da MOOVIA no ecossistema português.":
    { en: "Lawyer at Abreu Advogados in Corporate and M&A. Postgraduate degrees from CIDP in Corporate Finance and M&A. MOOVIA's legal arm in the Portuguese ecosystem.", es: "Abogado en Abreu Advogados en Corporate y M&A. Posgrados CIDP en Corporate Finance y M&A. El brazo jurídico de MOOVIA en el ecosistema portugués." },
  "25+ anos em tecnologia corporativa nas maiores empresas do setor, com especialização na indústria seguradora. Liderou equipas de alta performance e operações C-Level globais.":
    { en: "25+ years in corporate technology at the industry's largest firms, specialising in the insurance sector. Has led high-performance teams and global C-Level operations.", es: "25+ años en tecnología corporativa en las mayores empresas del sector, con especialización en la industria aseguradora. Lideró equipos de alto rendimiento y operaciones C-Level globales." },
  "VP Global Sales na ADLS. Professor de MBA, palestrante internacional e investidor imobiliário em Santa Catarina. Fluente em PT, EN e ES.":
    { en: "VP Global Sales at ADLS. MBA professor, international speaker and real estate investor in Santa Catarina. Fluent in PT, EN and ES.", es: "VP Global Sales en ADLS. Profesor de MBA, conferencista internacional e inversor inmobiliario en Santa Catarina. Fluido en PT, EN y ES." },
  "18 anos como Chief Legal Officer da CID Records. Especialista no acompanhamento de estudantes e famílias em transição para Portugal.":
    { en: "18 years as Chief Legal Officer at CID Records. Specialist in supporting students and families transitioning to Portugal.", es: "18 años como Chief Legal Officer de CID Records. Especialista en el acompañamiento de estudiantes y familias en transición a Portugal." },
  "Mestre em Direito pela ULisboa, com Erasmus em Itália e República Tcheca. Especialista em imigração, nacionalidade e regularização documental.":
    { en: "Master of Laws from ULisboa, with Erasmus exchange in Italy and the Czech Republic. Specialist in immigration, nationality and document regularisation.", es: "Máster en Derecho por la ULisboa, con Erasmus en Italia y la República Checa. Especialista en inmigración, nacionalidad y regularización documental." },
  "Mais de 10 anos no mercado imobiliário português. Especialista RE/MAX Collection. Habitação a partir de €1.500/mês.":
    { en: "Over 10 years in the Portuguese real estate market. RE/MAX Collection specialist. Housing from €1,500/month.", es: "Más de 10 años en el mercado inmobiliario portugués. Especialista RE/MAX Collection. Vivienda desde €1.500/mes." },

  // ---------- PROCESS ----------
  "Como trabalhamos": { en: "How we work", es: "Cómo trabajamos" },
  "Uma metodologia. Três dimensões. Um único objetivo.": { en: "One methodology. Three dimensions. One single goal.", es: "Una metodología. Tres dimensiones. Un único objetivo." },
  "Aumentar a probabilidade de sucesso do sucesso humano.": { en: "Increasing the likelihood of success of international mobility.", es: "Aumentar la probabilidad de éxito de la movilidad internacional." },
  "\"Um processo.": { en: "\"One process.", es: "\"Un proceso." },
  "Do diagnóstico ao destino.\"": { en: "From diagnostic to destination.\"", es: "Del diagnóstico al destino." },
  "Conversa com um dos Fundadores": { en: "Conversation with a founder", es: "Conversación con un fundador" },
  "Entendemos o seu contexto": { en: "Understanding your context", es: "Entendemos tu contexto" },
  "Uma conversa direta com 1 founder, sem script, sem chatbot. Validamos o fit e mostramos como a MOOVIA pensa o seu caso.":
    { en: "A direct conversation with one of our founders—no script, no chatbot. We assess the fit and show you how MOOVIA would approach your case.", es: "Una conversación direta con 1 founder, sin script, sin chatbot. Validamos el fit y mostramos cómo MOOVIA piensa tu caso." },
  "Diagnóstico": { en: "Diagnostic", es: "Diagnóstico" },
  "O primeiro trabalho real": { en: "The first real work", es: "El primer trabalho real" },
  "60 minutos com entregável físico. Mapeamento completo de perfil, fatores humanos, estratégias e cronograma. Não é consulta: é diagnóstico.":
    { en: "A 60-minute session with a physical deliverable. A complete mapping of your profile, human factors, strategies and timeline. Not a consultation: a diagnostic.", es: "60 minutos con entregable físico. Mapeo completo de perfil, factores humanos, estrategias y cronograma. No es consulta: es diagnóstico." },
  "Entregável físico": { en: "Physical deliverable", es: "Entregable físico" },
  "Sob medida": { en: "Tailor-made", es: "A medida" },
  "Coordenação completa": { en: "Complete coordination", es: "Coordinación completa" },
  "Do visto ao apartamento, da escola ao banco. Um único ponto de responsabilidade para a decisão mais importante da sua família.":
    { en: "From the visa to the apartment, the school to the bank. A single point of accountability for your family's most important decision.", es: "Del visado al apartamento, del colegio al banco. Un único punto de responsabilidad para la decisión más importante de tu familia." },
  "Mandato completo": { en: "Full mandate", es: "Mandato completo" },
  "Único no mercado": { en: "Unique in the market", es: "Único en el mercado" },
  "Chegar é metade": { en: "Arriving is only half the journey", es: "Llegar es la mitad" },
  "Os 90 dias após o pouso são os mais críticos. Adaptação familiar, rotina, integração. Nenhum concorrente acompanha este período de forma estruturada.":
    { en: "The 90 days after landing are the most critical. Family adaptation, routine, integration. No competitor offers structured support during this period.", es: "Los 90 días tras el aterrizaje son los más críticos. Adaptación familiar, rutina, integración. Ningún competidor acompaña este período de forma estructurada." },
  "Pós-chegada": { en: "Post-arrival", es: "Post-llegada" },

  // ---------- ASSESSMENT ----------
  "Human Mobility Assessment": { en: "Human Mobility Assessment", es: "Human Mobility Assessment" },
  "O Human Mobility Assessment inclui:": { en: "The Human Mobility Assessment includes:", es: "El Human Mobility Assessment incluye:" },
  "O Human Mobility Assessment foi desenvolvido para transformar uma decisão complexa num plano estratégico estruturado.": {
    en: "The Human Mobility Assessment was developed to transform a complex decision into a structured strategic plan.",
    es: "El Human Mobility Assessment fue desarrollado para transformar una decisión compleja en un plan estratégico estructurado."
  },
  "Sessão individual com Frederico Prado": { en: "One-on-one session with Frederico Prado", es: "Sesión individual con Frederico Prado" },
  "Human Dimension Assessment (Dra. Letícia de Mello)": { en: "Human Dimension Assessment (Dr. Letícia de Mello)", es: "Human Dimension Assessment (Dra. Letícia de Mello)" },
  "Mapa de prontidão financeira e habitacional": { en: "Financial and housing readiness map", es: "Mapa de preparación financiera y de vivienda" },
  "Estratégia de vistos e compliance": { en: "Visa and compliance strategy", es: "Estrategia de visados y cumplimiento" },
  "Cronograma executivo de transição": { en: "Executive transition timeline", es: "Cronograma ejecutivo de transición" },
  "Identificação de dependências críticas": { en: "Identification of critical dependencies", es: "Identificación de dependencias críticas" },
  "Plano de integração e orquestração": { en: "Integration and orchestration plan", es: "Plan de integración y orquestación" },
  "O Strategic Assessment não é uma conversa de vendas. É o momento onde o seu caso sai do campo das ideias e ganha uma arquitetura real.":
    { en: "The Strategic Assessment isn't a sales pitch. It’s the moment your case moves from ideas to a real architecture.", es: "El Strategic Assessment no es una charla de ventas. Es el momento en que tu caso sale del campo de las ideas y adquiere una arquitectura real." },
  "Solicitar a minha Avaliação Estratégica": { en: "Request my Strategic Assessment", es: "Solicitar mi Evaluación Estratégica" },

  // ---------- MARQUEE ----------
  "Produtividade": { en: "Productivity", es: "Productividad" },
  "Integração": { en: "Integration", es: "Integración" },
  "Global Mobility Success": { en: "Global Mobility Success", es: "Global Mobility Success" },
  "Global Mobility Strategy": { en: "Global Mobility Strategy", es: "Global Mobility Strategy" },
};

export function translate(text: string, lang: "en" | "es"): string | undefined {
  // Curated dictionary wins; the auto-generated one (DeepL + native-fluency
  // review, regenerated by scripts/extract-i18n.py) covers everything else.
  const manual = DICT[text]?.[lang];
  if (manual) return manual;
  if (lang === "en") return DICT_AUTO[text]?.en;
  return undefined;
}
