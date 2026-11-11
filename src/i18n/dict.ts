// Static PT→EN/ES dictionary covering all visible UI text.
// Keys are the EXACT trimmed Portuguese strings found in the JSX.
// Values are translations applied at runtime by the DOM walker.

import { DICT_AUTO } from "./dict.auto";

export type Lang = "pt" | "en" | "es";

export const DICT: Record<string, { en: string; es: string }> = {
  // ---------- CONTACTO / CONTACT ----------
  "Vamos tornar as missões internacionais mais bem-sucedidas.": {
    en: "Let’s Make International Assignments More Successful.",
    es: "Hagamos que las misiones internacionales sean más exitosas."
  },
  "Descubra como a MOOVIA ajuda a sua empresa a antecipar riscos humanos, apoiar colaboradores e famílias e melhorar os resultados das missões internacionais.": {
    en: "Discover how MOOVIA helps your company anticipate human risks, support employees and their families, and improve international assignment outcomes.",
    es: "Descubra cómo MOOVIA ayuda a su empresa a anticipar riesgos humanos, apoyar a los empleados y sus familias y mejorar los resultados de las misiones internacionales."
  },
  "Vamos falar das suas necessidades de Global Mobility.": {
    en: "Let’s talk about your Global Mobility needs.",
    es: "Hablemos de sus necesidades de Global Mobility."
  },
  "Marque uma chamada ou envie-nos uma mensagem": {
    en: "Book a call or Send us a message",
    es: "Reserve una llamada o envíenos un mensaje"
  },
  "marque uma chamada de 30 minutos com a nossa equipa": {
    en: "book a 30min call with our team",
    es: "reserve una llamada de 30 minutos con nuestro equipo"
  },
  "O primeiro passo": {
    en: "The first step",
    es: "El primer paso"
  },
  "O primeiro passo consiste na conversa certa.": {
    en: "The first step is having the right conversation.",
    es: "El primer paso consiste en la conversación adecuada."
  },
  "Uma conversa direta para entender o seu caso e mostrar como a MOOVIA pensa. Quer pretenda conhecer o Global Mobility Assurance para a sua empresa ou planear a sua própria transição com segurança, a nossa equipa ajuda a identificar e avaliar os fatores humanos e a definir a melhor estratégia.": {
    en: "A direct conversation to understand your case and show how MOOVIA thinks. Whether you want to learn about Global Mobility Assurance for your company or plan your own transition with confidence, our team helps identify and assess human factors and define the best strategy.",
    es: "Una conversación directa para entender su caso y mostrar cómo piensa MOOVIA. Ya sea que desee conocer Global Mobility Assurance para su empresa o planificar su propia transición con confianza, nuestro equipo ayuda a identificar y evaluar los factores humanos y a definir la mejor estrategia."
  },
  "Canais diretos": {
    en: "Direct channels",
    es: "Canales directos"
  },
  "E-mail institucional": {
    en: "Corporate email",
    es: "Correo corporativo"
  },
  "E-mail direto (Frederico Prado)": {
    en: "Direct email (Frederico Prado)",
    es: "Correo directo (Frederico Prado)"
  },
  "LinkedIn (empresa)": {
    en: "LinkedIn (Company)",
    es: "LinkedIn (empresa)"
  },
  "Horário": {
    en: "Opening hours",
    es: "Horario"
  },
  "Segunda a Sexta das 09h às 18h (horário de Lisboa)": {
    en: "Monday to Friday from 9am to 6pm (Lisbon time)",
    es: "Lunes a viernes de 09:00 a 18:00 (hora de Lisboa)"
  },

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
  "Ler mais": { en: "Read more", es: "Leer más" },
  "Ler menos": { en: "Show less", es: "Mostrar menos" },
  "Conheça a equipa": { en: "Meet the Team", es: "Conozca al equipo" },
  "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela.": {
    en: "Built on decades of experience, united by one conviction: the human side of international mobility deserves the same protection as the investment behind it.",
    es: "Construida sobre décadas de experiencia, unida por una convicción: la dimensión humana de la movilidad internacional merece la misma protección que la inversión que está detrás de ella."
  },
  "A MOOVIA nasceu de uma amizade de décadas e de dois percursos profissionais que se cruzaram no mundo corporativo internacional, passando por Revenue Assurance, grandes consultoras e tecnologia empresarial, a par de experiência direta dos desafios humanos da mobilidade internacional.": {
    en: "MOOVIA was born from a decades-long friendship and two professional journeys that crossed paths in the international corporate world, spanning Revenue Assurance, major consultancies and enterprise technology, alongside firsthand experience of the human challenges of international mobility.",
    es: "MOOVIA nació de una amistad de décadas y de dos trayectorias profesionales que se cruzaron en el mundo corporativo internacional, abarcando Revenue Assurance, grandes consultoras y tecnología empresarial, junto con la experiencia directa de los desafíos humanos de la movilidad internacional."
  },
  "Depois de anos a proteger investimentos corporativos em processos e receita, vimos a oportunidade de aplicar o mesmo rigor, evidência e responsabilização a um dos aspetos mais críticos, e muitas vezes esquecidos, das missões internacionais:": {
    en: "After years of protecting corporate investments in process and revenue, we saw the opportunity to bring the same discipline of rigour, evidence and accountability to one of the most critical, yet frequently overlooked, aspects of international assignments:",
    es: "Tras años protegiendo inversiones corporativas en procesos e ingresos, vimos la oportunidad de aplicar el mismo rigor, evidencia y rendición de cuentas a uno de los aspectos más críticos, y a menudo descuidados, de las asignaciones internacionales:"
  },
  "o fator humano.": {
    en: "the human factor.",
    es: "el factor humano."
  },
  "Hoje, a nossa equipa multidisciplinar reúne competências em mobilidade global, ciência comportamental, tecnologia, estratégia de negócio e governança corporativa, unidas por uma convicção: os fatores humanos que determinam o sucesso da mobilidade internacional merecem a mesma atenção e proteção que o investimento financeiro que está por trás deles.": {
    en: "Today, our multidisciplinary team brings together expertise in global mobility, behavioural science, technology, business strategy and corporate governance, united by one conviction: the human factors that make or break international mobility deserve the same attention and protection as the financial investment behind them.",
    es: "Hoy, nuestro equipo multidisciplinar reúne competencias en movilidad global, ciencia del comportamiento, tecnología, estrategia empresarial y gobernanza corporativa, unidos por una convicción: los factores humanos que determinan el éxito de la movilidad internacional merecen la misma atención y protección que la inversión financiera que está detrás de ellos."
  },
  "Equipa MOOVIA": { en: "MOOVIA Team", es: "Equipo MOOVIA" },
  "A equipa que coordena. Enxuta, multidisciplinar, por desenho.": {
    en: "The team coordinating. Lean, multidisciplinary, by design.",
    es: "El equipo que coordina. Ágil, multidisciplinar, por diseño."
  },
  "Advisor | Revenue Assurance": { en: "Advisor | Revenue Assurance", es: "Advisor | Revenue Assurance" },
  "Choice Technologies / Kema / eTECH": { en: "Choice Technologies / Kema / eTECH", es: "Choice Technologies / Kema / eTECH" },
  "Com mais de 25 anos de experiência executiva internacional, liderou operações globais e estratégias de Revenue Assurance em empresas líderes como Choice Technologies e Kema.": {
    en: "With over 25 years of international executive experience, he led global operations and Revenue Assurance strategies at industry leaders such as Choice Technologies and Kema.",
    es: "Con más de 25 años de experiencia ejecutiva internacional, lideró operaciones globales y estrategias de Revenue Assurance en empresas líderes como Choice Technologies y Kema."
  },
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

  // ---------- ABOUT / SOBRE ----------
  "SOBRE A MOOVIA": { en: "ABOUT MOOVIA", es: "SOBRE MOOVIA" },
  "Levar a disciplina da assurance à mobilidade internacional.": {
    en: "Bringing the discipline of assurance to international mobility.",
    es: "Llevar la disciplina de la assurance a la movilidad internacional."
  },
  "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás. Combinamos avaliação estruturada, conhecimento especializado e acompanhamento para ajudar colaboradores, famílias e organizações a navegar as transições internacionais.": {
    en: "MOOVIA was created to give the human side of an international assignment the same attention as the financial and operational investment behind it. We combine structured assessment, specialist insight and follow-up to help employees, families and organisations navigate international transitions.",
    es: "MOOVIA se creó para prestar a la dimensión humana de una asignación internacional la misma atención que a la inversión financiera y operativa que hay detrás. Combinamos evaluación estructurada, criterio especializado y seguimiento para ayudar a colaboradores, familias y organizaciones a navegar las transiciones internacionales."
  },
  "Experiência humana • Evidência • Ação": {
    en: "Human experience • Evidence • Action",
    es: "Experiencia humana • Evidencia • Acción"
  },
  "A NOSSA ORIGEM": { en: "OUR ORIGIN", es: "NUESTRO ORIGEN" },
  "De Revenue Assurance a Global Mobility Assurance.": {
    en: "From Revenue Assurance to Global Mobility Assurance.",
    es: "De Revenue Assurance a Global Mobility Assurance."
  },
  "A MOOVIA nasceu de uma amizade de décadas e de duas carreiras que se encontraram no mundo corporativo internacional, passando por Revenue Assurance, consultoria e tecnologia empresarial. Ambos os percursos trouxeram experiência direta dos desafios humanos de mudar de país por motivos de trabalho.": {
    en: "MOOVIA grew out of a decades-long friendship and two careers that met in the international corporate world, spanning Revenue Assurance, consultancy and enterprise technology. Both paths brought first-hand experience of the human challenges of moving internationally for work.",
    es: "MOOVIA surgió de una amistad de décadas y de dos trayectorias que se cruzaron en el mundo corporativo internacional, abarcando Revenue Assurance, consultoría y tecnología empresarial. Ambas aportaron experiencia directa de los desafíos humanos de trasladarse internacionalmente por motivos de trabajo."
  },
  "Depois de anos a proteger o investimento corporativo em processos e receita, reconhecemos uma lacuna: as empresas gerem com cuidado vistos, habitação e custos de mobilidade, mas têm uma visibilidade menos consistente sobre a forma como colaboradores e famílias se adaptam ao longo de uma missão.": {
    en: "After years of protecting corporate investment in processes and revenue, we recognised a gap: companies carefully manage visas, housing and mobility costs, but have less consistent visibility into how employees and families adapt throughout an assignment.",
    es: "Tras años protegiendo la inversión corporativa en procesos e ingresos, identificamos una carencia: las empresas gestionan con cuidado visados, alojamiento y costes de movilidad, pero tienen una visibilidad menos consistente de cómo se adaptan colaboradores y familias a lo largo de una asignación."
  },
  "Quisemos aplicar a mesma disciplina de rigor, evidência e rastreabilidade a esses fatores humanos: perceber o que está a mudar, identificar quando pode ser necessário apoio e verificar se a ação faz diferença.": {
    en: "We wanted to apply the same discipline of rigour, evidence and traceability to those human factors: understanding what is changing, identifying when support may be needed and reviewing whether action makes a difference.",
    es: "Quisimos aplicar la misma disciplina de rigor, evidencia y trazabilidad a esos factores humanos: comprender qué está cambiando, identificar cuándo se necesita apoyo y comprobar si las medidas adoptadas marcan la diferencia."
  },
  "O nosso legado.": { en: "Our heritage.", es: "Nuestro legado." },
  "Carreira Internacional": { en: "International Career", es: "Carrera Internacional" },
  "Décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em diferentes continentes.": {
    en: "Decades of experience in international business, global projects, and market development across multiple continents.",
    es: "Décadas de experiencia en negocios internacionales, proyectos globales y desarrollo de mercados en distintos continentes."
  },
  "Identificação de riscos e perdas invisíveis: a disciplina que ensinou a MOOVIA a ver o que os modelos tradicionais de gestão não capturam.": {
    en: "Identifying hidden risks and losses: the discipline that taught MOOVIA to see what traditional management models fail to capture.",
    es: "Identificación de riesgos y pérdidas invisibles: la disciplina que enseñó a MOOVIA a ver lo que los modelos tradicionales de gestión no capturan."
  },
  "Metodologias Próprias": { en: "Proprietary Methodologies", es: "Metodologías Propias" },
  "A combinação de ciência do comportamento humano e engenharia de sistemas, transformando conhecimento especializado num processo estruturado e replicável.": {
    en: "The combination of human behavioural science and systems engineering, transforming specialist knowledge into a structured and replicable process.",
    es: "La combinación de ciencia del comportamiento humano e ingeniería de sistemas, transformando el conocimiento especializado en un proceso estructurado y replicable."
  },
  "Raízes e Asas": { en: "Roots and Wings", es: "Raíces y Alas" },
  "A metodologia que estrutura a dimensão humana do sucesso, traduzindo adaptação, integração e bem-estar em variáveis mensuráveis.": {
    en: "The methodology that structures the human dimension of success, translating adaptation, integration, and well-being into measurable variables.",
    es: "La metodología que estructura la dimensión humana del éxito, traduciendo adaptación, integración y bienestar en variables medibles."
  },
  "A arquitetura que converte este conhecimento humano em lógica computacional explicável e rastreável, eliminando a 'caixa-negra'.": {
    en: "The architecture that converts this human knowledge into explainable, traceable computational logic, eliminating the ‘black box’.",
    es: "La arquitectura que convierte este conocimiento humano en lógica computacional explicable y trazable, eliminando la 'caja negra'."
  },
  "A MOOVIA é a aplicação desta experiência à proteção do investimento humano.": {
    en: "MOOVIA is the application of this experience to the protection of human investment.",
    es: "MOOVIA es la aplicación de esta experiencia a la protección de la inversión humana."
  },
  "A NOSSA ABORDAGEM": { en: "OUR APPROACH", es: "NUESTRO ENFOQUE" },
  "Três princípios orientam o nosso trabalho.": {
    en: "Three principles guide our work.",
    es: "Tres principios guían nuestro trabajo."
  },
  "A MOOVIA combina compreensão humana, inteligência estruturada e partilha responsável de informação para apoiar as missões internacionais ao longo de toda a jornada.": {
    en: "MOOVIA combines human understanding, structured intelligence and responsible information-sharing to support international assignments throughout their journey.",
    es: "MOOVIA combina comprensión humana, inteligencia estructurada y compartición responsable de información para acompañar las asignaciones internacionales a lo largo de toda su trayectoria."
  },
  "Experiência Humana": { en: "Human Experience", es: "Experiencia Humana" },
  "Compreender as pessoas para além do processo de relocalização.": {
    en: "Understanding people beyond the relocation process.",
    es: "Comprender a las personas más allá del proceso de relocalización."
  },
  "Cada missão internacional envolve desafios pessoais, profissionais, culturais e familiares. Através de avaliações estruturadas, conversas significativas e check-ins regulares, percebemos como as pessoas se estão a adaptar, de que apoio precisam e como evoluem as suas circunstâncias.": {
    en: "Every international assignment involves personal, professional, cultural and family challenges. Through structured assessments, meaningful conversations and regular check-ins, we understand how people are adapting, what support they need and how their circumstances evolve.",
    es: "Cada asignación internacional implica retos personales, profesionales, culturales y familiares. A través de evaluaciones estructuradas, conversaciones significativas y check-ins regulares, comprendemos cómo se adaptan las personas, qué apoyo necesitan y cómo evolucionan sus circunstancias."
  },
  "Inteligência de Mobilidade": { en: "Mobility Intelligence", es: "Inteligencia de Movilidad" },
  "Transformar conhecimento humano em ação informada.": {
    en: "Turning human insights into informed action.",
    es: "Transformar el conocimiento humano en acción informada."
  },
  "Ligamos sinais relevantes ao longo do tempo para identificar riscos emergentes, fatores de proteção e mudanças na adaptação. Critérios explicáveis e análise assistida por inteligência artificial apoiam os nossos especialistas na interpretação desses padrões e na recomendação de intervenções adequadas.": {
    en: "We connect relevant signals over time to identify emerging risks, protective factors and changes in adaptation. Explainable criteria and AI-assisted analysis support our specialists in interpreting these patterns and recommending appropriate interventions.",
    es: "Conectamos señales relevantes a lo largo del tiempo para identificar riesgos emergentes, factores de protección y cambios en la adaptación. Criterios explicables y análisis asistido por inteligencia artificial apoyan a nuestros especialistas a interpretar estos patrones y recomendar intervenciones adecuadas."
  },
  "A tecnologia apoia a análise. A experiência humana orienta as decisões.": {
    en: "Technology supports the analysis. Human expertise guides the decisions.",
    es: "La tecnología apoya el análisis. La experiencia humana guía las decisiones."
  },
  "Painel de Global Mobility": { en: "Global Mobility dashboard", es: "Panel de Global Mobility" },
  "Apoio pessoal e visibilidade corporativa, com a privacidade no centro.": {
    en: "Personal support and corporate visibility, with privacy at the centre.",
    es: "Apoyo personal y visibilidad corporativa, con la privacidad en el centro."
  },
  "Os colaboradores e as famílias recebem avaliações confidenciais, orientação personalizada e apoio contínuo. As empresas recebem indicadores ao nível da missão, tendências e ações recomendadas, sem acesso desnecessário a informação pessoal ou familiar.": {
    en: "Employees and families receive confidential assessments, personalised guidance and ongoing support. Companies receive relevant assignment-level indicators, trends and recommended actions, without unnecessary access to personal or family information.",
    es: "Los colaboradores y las familias reciben evaluaciones confidenciales, orientación personalizada y apoyo continuo. Las empresas reciben indicadores a nivel de asignación, tendencias y acciones recomendadas, sin acceso innecesario a información personal o familiar."
  },
  "Isto permite à MOOVIA apoiar as pessoas e, ao mesmo tempo, ajudar as organizações a tomar decisões de mobilidade mais informadas.": {
    en: "This allows MOOVIA to support individuals while helping organisations make better-informed mobility decisions.",
    es: "Esto permite a MOOVIA apoyar a las personas y, al mismo tiempo, ayudar a las organizaciones a tomar decisiones de movilidad mejor informadas."
  },
  "COMO NOS ENCAIXAMOS": { en: "HOW WE FIT", es: "CÓMO ENCAJAMOS" },
  "Complementamos o ecossistema existente de mobilidade global.": {
    en: "We complement the existing global mobility ecosystem.",
    es: "Complementamos el ecosistema existente de movilidad global."
  },
  "A MOOVIA não substitui prestadores de relocalização, equipas de Recursos Humanos nem serviços especializados. Complementamos o seu trabalho, focando-nos no que acontece para além da mudança prática: como os colaboradores e as famílias se adaptam, se integram e progridem ao longo de uma missão internacional.": {
    en: "MOOVIA does not replace relocation providers, HR teams or specialist services. We complement their work by focusing on what happens beyond the practical move: how employees and families adapt, integrate and progress throughout an international assignment.",
    es: "MOOVIA no sustituye a proveedores de relocalización, equipos de Recursos Humanos ni servicios especializados. Complementamos su labor centrándonos en lo que ocurre más allá del traslado práctico: cómo los colaboradores y sus familias se adaptan, se integran y progresan a lo largo de una asignación internacional."
  },
  "Ao ligar informação humana e contextual ao longo do tempo, a MOOVIA ajuda a identificar desafios emergentes, recomendar intervenções adequadas e apoiar uma melhor coordenação entre as pessoas e as organizações envolvidas.": {
    en: "By connecting human and contextual insights over time, MOOVIA helps identify emerging challenges, recommend appropriate interventions and support better coordination between the people and organisations involved.",
    es: "Al conectar información humana y contextual a lo largo del tiempo, MOOVIA ayuda a identificar desafíos emergentes, recomendar intervenciones adecuadas y facilitar una mejor coordinación entre las personas y las organizaciones involucradas."
  },
  "Ligamos a experiência humana à tomada de decisão corporativa, ajudando as empresas a proteger o seu investimento em mobilidade internacional e apoiando as pessoas que estão por trás dele.": {
    en: "We connect human experience with corporate decision-making, helping companies protect their international mobility investment while supporting the people behind it.",
    es: "Conectamos la experiencia humana con la toma de decisiones corporativas, ayudando a las empresas a proteger su inversión en movilidad internacional y apoyando a las personas que están detrás."
  },
  "The distinction to Global Mobility Management.": {
    en: "The distinction to Global Mobility Management.",
    es: "The distinction to Global Mobility Management."
  },
  "Exemplo de entregável para empresas": {
    en: "Sample corporate deliverable",
    es: "Ejemplo de entregable para empresas"
  },
  "Tornar a mobilidade internacional mais informada, mais solidária e mais responsável perante as pessoas e os resultados do negócio.": {
    en: "Make international mobility more informed, more supportive and more accountable to people and business outcomes",
    es: "Hacer que la movilidad internacional sea más informada, más solidaria y más responsable con las personas y los resultados del negocio."
  },
  "Cada proposta é desenhada à medida do perfil e da complexidade de cada transição.": {
    en: "Each proposal is tailored to the profile and complexity of each transition.",
    es: "Cada propuesta se diseña a medida del perfil y la complejidad de cada transición."
  },

  // ---------- PROCESS ----------
  "Como trabalhamos": { en: "How we work", es: "Cómo trabajamos" },
  "Uma metodologia. Três dimensões. Um único objetivo.": { en: "One methodology. Three dimensions. One single goal.", es: "Una metodología. Tres dimensiones. Un único objetivo." },
  "Aumentar a probabilidade de sucesso do sucesso humano.": { en: "Increasing the likelihood of success of international mobility.", es: "Aumentar la probabilidad de éxito de la movilidad internacional." },
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

  // ---------- NOVA HOME & EMPRESAS & METODOLOGIA ----------
  "Proteja o investimento da sua empresa em talento internacional.": {
    en: "Protect your company's investment in international talent.",
    es: "Proteja la inversión de su empresa en talento internacional.",
  },
  "A MOOVIA acompanha o executivo e a família antes, durante e depois da mudança e transforma fatores humanos em indicadores claros para os Recursos Humanos e a direção.": {
    en: "MOOVIA supports the executive and family before, during and after relocation and turns human factors into clear indicators for Human Resources and leadership.",
    es: "MOOVIA acompaña al ejecutivo y a la familia antes, durante y después del traslado y transforma factores humanos en indicadores claros para Recursos Humanos y la dirección.",
  },
  "Falar com a MOOVIA": { en: "Let's Talk", es: "Hablemos" },
  "Confidencial e em conformidade com o RGPD.": {
    en: "Confidential and compliant with the General Data Protection Regulation.",
    es: "Confidencial y en conformidad con el RGPD.",
  },
  "O que fazemos, em três passos": {
    en: "What we do, in three steps",
    es: "Lo que hacemos, en tres pasos",
  },
  "Avaliar": { en: "Assess", es: "Evaluar" },
  "Identificamos os fatores humanos que mais influenciam a adaptação do executivo e da família, desde antes da mudança.": {
    en: "We identify the human factors that most influence the adaptation of the executive and family, starting before the move.",
    es: "Identificamos los factores humanos que más influyen en la adaptación del ejecutivo y de la familia, desde antes del traslado.",
  },
  "Interpretar": { en: "Interpret", es: "Interpretar" },
  "Transformamos esses fatores em indicadores e recomendações práticas, interpretados por especialistas.": {
    en: "We transform these factors into practical indicators and recommendations, interpreted by specialists.",
    es: "Transformamos esos factores en indicadores y recomendaciones prácticas, interpretados por especialistas.",
  },
  "Acompanhar": { en: "Monitor", es: "Acompañar" },
  "Medimos a evolução ao longo da jornada e orientamos a ação preventiva, sem substituir os parceiros que a empresa já utiliza.": {
    en: "We measure progress throughout the journey and guide preventive action, without replacing the partners the company already uses.",
    es: "Medimos la evolución a lo largo del proceso y orientamos la acción preventiva, sin sustituir a los socios que la empresa ya utiliza.",
  },
  "Conhecer a metodologia completa": {
    en: "Explore the full methodology",
    es: "Conocer la metodología completa",
  },
  "Para quem é": { en: "Who it is for", es: "Para quién es" },
  "Contratado pela empresa. Vivido pelo executivo.": {
    en: "Contracted by the company. Experienced by the executive.",
    es: "Contratado por la empresa. Vivido por el ejecutivo.",
  },
  "Cliente": { en: "Client", es: "Cliente" },
  "Beneficiários": { en: "Beneficiaries", es: "Beneficiarios" },
  "Empresas.": { en: "Companies.", es: "Empresas." },
  "Recebem indicadores agregados e recomendações para decidir melhor sobre a mobilidade internacional.": {
    en: "Receive aggregated indicators and recommendations to make better decisions on international mobility.",
    es: "Reciben indicadores agregados y recomendaciones para decidir mejor sobre la movilidad internacional.",
  },
  "Empresas. Recebem indicadores agregados e recomendações para decidir melhor sobre a mobilidade internacional.": {
    en: "Companies. Receive aggregated indicators and recommendations to make better decisions on international mobility.",
    es: "Empresas. Reciben indicadores agregados y recomendaciones para decidir mejor sobre la movilidad internacional.",
  },
  "Executivo:": { en: "Executive:", es: "Ejecutivo:" },
  "recebe acompanhamento e um relatório pessoal, confidencial.": {
    en: "receives ongoing support and a confidential personal report.",
    es: "recibe acompañamiento y un informe personal, confidencial.",
  },
  "Executivo: recebe acompanhamento e um relatório pessoal, confidencial.": {
    en: "Executive: receives ongoing support and a confidential personal report.",
    es: "Ejecutivo: recibe acompañamiento y un informe personal, confidencial.",
  },
  "Família:": { en: "Family:", es: "Familia:" },
  "recebe acolhimento e apoio à adaptação.": {
    en: "receives guidance and adaptation support.",
    es: "recibe acogida y apoyo a la adaptación.",
  },
  "Família: recebe acolhimento e apoio à adaptação.": {
    en: "Family: receives guidance and adaptation support.",
    es: "Familia: recibe acogida y apoyo a la adaptación.",
  },
  "Valor para o negócio": { en: "Business value", es: "Valor de negocio" },
  "O que a sua empresa ganha": {
    en: "What your company gains",
    es: "Lo que su empresa gana",
  },
  "Retenção": { en: "Retention", es: "Retención" },
  "Identificar sinais a tempo de agir e reduzir o risco de turnover.": {
    en: "Identify signals in time to act and reduce turnover risk.",
    es: "Identificar señales a tiempo para actuar y reducir el riesgo de rotación.",
  },
  "Acelerar a adaptação do executivo e da família.": {
    en: "Accelerate the adaptation of the executive and family.",
    es: "Acelerar la adaptación del ejecutivo y de la familia.",
  },
  "Decisão": { en: "Decision", es: "Decisión" },
  "Mais informação para decisões de mobilidade.": {
    en: "Better information for mobility decisions.",
    es: "Más información para decisiones de movilidad.",
  },
  "Retorno": { en: "Return", es: "Retorno" },
  "Proteger o investimento feito no talento internacional.": {
    en: "Protect the investment made in international talent.",
    es: "Proteger la inversión realizada en el talento internacional.",
  },
  "Substituir um talento internacional que não se adaptou custa milhares de euros.": {
    en: "Replacing international talent who failed to adapt costs thousands of euros.",
    es: "Sustituir a un talento internacional que no se adaptó cuesta miles de euros.",
  },
  "Governança e proteção de dados": {
    en: "Governance and data protection",
    es: "Gobernanza y protección de datos",
  },
  "Confiança e confidencialidade": {
    en: "Trust and confidentiality",
    es: "Confianza y confidencialidad",
  },
  "Validação Jurídica": { en: "Legal Validation", es: "Validación Jurídica" },
  "O modelo jurídico da MOOVIA foi objeto de análise por uma sociedade de advogados de referência em Portugal, tendo sido considerado juridicamente viável, encontrando-se atualmente em fase de implementação das recomendações identificadas.": {
    en: "The legal model of MOOVIA was analysed by a leading law firm in Portugal, having been considered legally viable, and is currently in the phase of implementing the identified recommendations.",
    es: "El modelo jurídico de MOOVIA fue objeto de análisis por una firma de abogados de referencia en Portugal, habiendo sido considerado jurídicamente viable, encontrándose actualmente en fase de implementación de las recomendaciones identificadas.",
  },
  "A empresa recebe apenas indicadores agregados. As respostas individuais e o relatório pessoal do colaborador permanecem confidenciais.": {
    en: "The company receives only aggregated indicators. Individual responses and the employee's personal report remain confidential.",
    es: "La empresa recibe únicamente indicadores agregados. Las respuestas individuales y el informe personal del colaborador permanecen confidenciales.",
  },
  "Em conformidade com o RGPD": {
    en: "Compliant with the General Data Protection Regulation",
    es: "En conformidad con el RGPD",
  },
  "Quer perceber como isto se aplica à sua empresa?": {
    en: "Want to understand how this applies to your company?",
    es: "¿Quiere entender cómo se aplica esto a su empresa?",
  },
  "Em resumo": { en: "In summary", es: "En resumen" },
  "O que é:": { en: "What it is:", es: "Qué es:" },
  "Metodologia que identifica, mede e acompanha o risco humano da mobilidade internacional ao longo da transição.": {
    en: "A methodology that identifies, measures and tracks the human risk of international mobility throughout the transition.",
    es: "Metodología que identifica, mide y acompaña el riesgo humano de la movilidad internacional a lo largo de la transición.",
  },
  "Para quem é:": { en: "Who it is for:", es: "Para quién es:" },
  "Contratado por empresas que deslocam executivos e famílias para missões internacionais.": {
    en: "Contracted by companies relocating executives and families for international assignments.",
    es: "Contratado por empresas que trasladan ejecutivos y familias a misiones internacionales.",
  },
  "Qual o benefício:": { en: "Key benefit:", es: "Cuál es el beneficio:" },
  "Permite agir de forma preventiva, acelerar a integração e reduzir a exposição ao turnover precoce.": {
    en: "Enables preventive action, accelerates integration and reduces exposure to early turnover.",
    es: "Permite actuar de forma preventiva, acelerar la integración y reducir la exposición a la rotación temprana.",
  },
  "Acompanhamento da mobilidade internacional para empresas que investem em talento": {
    en: "International mobility support for companies that invest in talent",
    es: "Acompañamiento de la movilidad internacional para empresas que invierten en talento",
  },
  "Adicionar mais detalhes (opcional)": {
    en: "Add more details (optional)",
    es: "Añadir más detalles (opcional)",
  },
  "Saiba mais": { en: "Learn more", es: "Saber más" },
  "Mostrar menos": { en: "Show less", es: "Mostrar menos" },

  // ---------- HOME RESTRUCTURING (NOV 2026) ----------
  "Inteligência para os riscos humanos das missões internacionais": {
    en: "Intelligence for the human risks of international assignments",
    es: "Inteligencia para los riesgos humanos de las misiones internacionales",
  },
  "Identifique e gira os riscos de adaptação dos executivos em missões internacionais": {
    en: "Identify and Manage Adaptation Risks of Executives in International Assignments",
    es: "Identifique y gestione los riesgos de adaptación de los ejecutivos en misiones internacionales",
  },
  "A MOOVIA ajuda empresas e executivos a identificar e tratar os desafios humanos, culturais e familiares que podem comprometer as missões internacionais, antes que se tornem problemas de desempenho, retenção ou repatriamento.": {
    en: "MOOVIA helps companies and executives identify and address the human, cultural and family challenges that can undermine international assignments, before they escalate into performance, retention or repatriation problems.",
    es: "MOOVIA ayuda a empresas y ejecutivos a identificar y abordar los desafíos humanos, culturales y familiares que pueden comprometer las misiones internacionales, antes de que se conviertan en problemas de rendimiento, retención o repatriación.",
  },
  "Ver como a MOOVIA funciona": {
    en: "See How MOOVIA Works",
    es: "Ver cómo funciona MOOVIA",
  },
  "O problema e como a MOOVIA ajuda": {
    en: "The Problem & How MOOVIA Helps",
    es: "El problema y cómo MOOVIA ayuda",
  },
  "A maioria das falhas em missões internacionais não decorre de competência técnica ou de planeamento logístico, mas de fatores humanos: desafios de adaptação, tensões familiares e desalinhamento cultural que muitas vezes passam despercebidos até ser tarde demais.": {
    en: "Most international assignment failures do not stem from technical competence or logistical planning, but from human factors: adaptation challenges, family strain, and cultural misalignment that often go unnoticed until it is too late.",
    es: "La mayoría de los fracasos en misiones internacionales no se deben a la competencia técnica o a la planificación logística, sino a factores humanos: retos de adaptación, tensiones familiares y desalineación cultural que a menudo pasan desapercibidos hasta que es demasiado tarde.",
  },
  "Apoio fragmentado ou ausente para a família": {
    en: "Fragmented or missing support for the family",
    es: "Apoyo fragmentado o ausente para la familia",
  },
  "O parceiro e os filhos frequentemente enfrentam o isolamento e o choque cultural com pouco ou nenhum apoio estruturado.": {
    en: "The spouse and children frequently face isolation and cultural shock with little or no structured support.",
    es: "La pareja y los hijos a menudo se enfrentan al aislamiento y al choque cultural con poco o ningún apoyo estructurado.",
  },
  "Atrasos na adaptação e perda de produtividade": {
    en: "Adaptation delays and productivity loss",
    es: "Retrasos en la adaptación y pérdida de productividad",
  },
  "Meses gastos a resolver a vida pessoal e a navegar um novo ambiente diminuem o impacto do executivo.": {
    en: "Months spent settling personal life and navigating an unfamiliar environment reduce the executive's impact.",
    es: "Los meses dedicados a resolver la vida personal y a orientarse en un entorno nuevo reducen el impacto del ejecutivo.",
  },
  "Apoio reduzido após a chegada": {
    en: "Reduced support after arrival",
    es: "Apoyo reducido tras la llegada",
  },
  "A maioria dos programas foca-se na logística de relocalização, deixando executivos e famílias entregues a si próprios quando o trabalho real de adaptação começa.": {
    en: "Most programs focus on relocation logistics, leaving executives and families to manage on their own once the real work of adapting begins.",
    es: "La mayoría de los programas se centran en la logística de la reubicación, dejando a ejecutivos y familias a su suerte cuando empieza el verdadero trabajo de adaptación.",
  },
  "Uma missão internacional falhada pode custar entre 2 e 3 vezes o salário-base anual do executivo, sem contar com as oportunidades de negócio perdidas, a descontinuidade na equipa e o desgaste de reputação.": {
    en: "A failed international assignment can cost between 2 and 3 times the executive's annual base salary, without taking into account missed business opportunities, team disruption and reputational damage.",
    es: "Una misión internacional fallida puede costar entre 2 y 3 veces el salario base anual del ejecutivo, sin contar las oportunidades de negocio perdidas, la discontinuidad en el equipo y el desgaste de reputación.",
  },
  "A MOOVIA ajuda as empresas a intervir precocemente, com diagnósticos estruturados, apoio dedicado e acompanhamento contínuo que transformam a mobilidade internacional numa vantagem sustentável.": {
    en: "MOOVIA helps companies intervene early, with structured diagnostics, dedicated support, and ongoing monitoring that turn international mobility into a sustainable advantage.",
    es: "MOOVIA ayuda a las empresas a intervenir tempranamente, con diagnósticos estructurados, apoyo dedicado y seguimiento continuo que convierten la movilidad internacional en una ventaja sostenible.",
  },
  "AVALIAR": { en: "ASSESS", es: "EVALUAR" },
  "LIGAR E INTERPRETAR": { en: "CONNECT & INTERPRET", es: "CONECTAR E INTERPRETAR" },
  "AGIR": { en: "ACT", es: "ACTUAR" },
  "Mapeamento inicial de prontidão e contexto": {
    en: "Initial readiness and context mapping",
    es: "Mapeo inicial de preparación y contexto",
  },
  "Identificação de vulnerabilidades na adaptação": {
    en: "Identification of adaptation vulnerabilities",
    es: "Identificación de vulnerabilidades en la adaptación",
  },
  "Análise da dimensão familiar e de carreira": {
    en: "Family and career dimension analysis",
    es: "Análisis de la dimensión familiar y de carrera",
  },
  "Relatório de risco estruturado antes do início da missão": {
    en: "Structured risk report before assignment begins",
    es: "Informe de riesgo estructurado antes del inicio de la misión",
  },
  "Acompanhamento estruturado ao longo da transição": {
    en: "Structured check-ins throughout transition",
    es: "Seguimiento estructurado a lo largo de la transición",
  },
  "Acompanhamento da integração do executivo e da família": {
    en: "Executive and family integration tracking",
    es: "Seguimiento de la integración del ejecutivo y de la familia",
  },
  "Identificação precoce de sinais de atrito e desgaste": {
    en: "Early warning detection for strain and friction",
    es: "Detección temprana de señales de fricción y desgaste",
  },
  "Visão consolidada para os RH e para a liderança": {
    en: "Consolidated insights for HR and leadership",
    es: "Visión consolidada para RRHH y liderazgo",
  },
  "Intervenções direcionadas antes que os problemas escalem": {
    en: "Targeted interventions before issues escalate",
    es: "Intervenciones dirigidas antes de que los problemas escalen",
  },
  "Apoio especializado à integração da família": {
    en: "Specialized family integration support",
    es: "Apoyo especializado para la integración familiar",
  },
  "Mediação de desafios culturais e de contexto de trabalho": {
    en: "Mediation of cultural and workplace challenges",
    es: "Mediación en retos culturales y del entorno laboral",
  },
  "Recomendações contínuas para RH e executivo": {
    en: "Ongoing recommendations for HR and the executive",
    es: "Recomendaciones continuas para RRHH y el ejecutivo",
  },
  "Para quem é a MOOVIA": {
    en: "Who MOOVIA is for",
    es: "Para quién es MOOVIA",
  },
  "A MOOVIA trabalha na interseção entre as pessoas que vivem a transição e a organização que nela investe.": {
    en: "MOOVIA operates at the intersection of the individuals living the transition and the organization investing in it.",
    es: "MOOVIA opera en la intersección entre las personas que viven la transición y la organización que invierte en ella.",
  },
  "Para executivos e respetivas famílias": {
    en: "For Executives & Their Families",
    es: "Para ejecutivos y sus familias",
  },
  "Apoiamos os executivos e os seus agregados familiares em todas as fases da missão, assegurando que as dimensões pessoais, emocionais e práticas da adaptação são cuidadas com estrutura e confidencialidade.": {
    en: "We support executives and their family units through every stage of the assignment, ensuring that the personal, emotional, and practical dimensions of adaptation are managed with structure and confidentiality.",
    es: "Apoyamos a los ejecutivos y a sus unidades familiares en cada etapa de la misión, garantizando que las dimensiones personales, emocionales y prácticas de la adaptación se gestionen con estructura y confidencialidad.",
  },
  "Para empresas e liderança de Recursos Humanos": {
    en: "For Companies & HR Leadership",
    es: "Para empresas y liderazgo de Recursos Humanos",
  },
  "Damos às equipas de RH, de Global Mobility e à liderança de negócio a visibilidade necessária para proteger os seus investimentos em talento internacional, intervir antecipadamente e aumentar de forma consistente as taxas de sucesso das missões.": {
    en: "We give HR, Global Mobility teams, and business leadership the visibility they need to protect their international talent investments, intervene early, and consistently improve assignment success rates.",
    es: "Proporcionamos a los equipos de RRHH, Global Mobility y liderazgo empresarial la visibilidad necesaria para proteger sus inversiones en talento internacional, intervenir a tiempo y mejorar de forma consistente el éxito de las misiones.",
  },
  "Espaço seguro e independente, separado da hierarquia da empresa": {
    en: "Safe, independent space separate from corporate reporting",
    es: "Espacio seguro e independiente, separado de la jerarquía de la empresa",
  },
  "Apoio dedicado à adaptação do cônjuge e integração escolar dos filhos": {
    en: "Dedicated support for spouse adaptation and children's schooling",
    es: "Apoyo dedicado a la adaptación del cónyuge e integración escolar de los hijos",
  },
  "Apoio contínuo e estruturado para além das primeiras semanas": {
    en: "Continuous, structured check-ins beyond the first few weeks",
    es: "Acompañamiento continuo y estructurado más allá de las primeras semanas",
  },
  "Acesso a uma rede qualificada de especialistas em integração": {
    en: "Access to a vetted network of integration specialists",
    es: "Acceso a una red cualificada de especialistas en integración",
  },
  "Indicadores precoces de risco antes do impacto no desempenho": {
    en: "Early risk indicators before performance is affected",
    es: "Indicadores tempranos de riesgo antes de que afecten al rendimiento",
  },
  "Acompanhamento da integração sem violar a privacidade": {
    en: "Integration tracking without violating privacy",
    es: "Seguimiento de la integración sin invadir la privacidad",
  },
  "Menor probabilidade de regresso antecipado ou saída da empresa": {
    en: "Reduced probability of early return or departure",
    es: "Menor probabilidad de regreso anticipado o salida de la empresa",
  },
  "Retorno do investimento mais consistente nas missões": {
    en: "More predictable return on assignment investment",
    es: "Retorno de inversión más predecible en las misiones",
  },
  "Como a MOOVIA protege o seu investimento em mobilidade internacional": {
    en: "How MOOVIA protects your investment in international mobility",
    es: "Cómo MOOVIA protege su inversión en movilidad internacional",
  },
  "Reduza o risco de demissão ou regresso antecipado protegendo o investimento feito no executivo.": {
    en: "Reduce the risk of resignation or early repatriation by protecting the investment made in the executive.",
    es: "Reduzca el riesgo de renuncia o repatriación temprana protegiendo la inversión realizada en el ejecutivo.",
  },
  "Acelere o tempo até à plena produtividade através de uma adaptação estruturada do executivo e da sua família.": {
    en: "Accelerate time to full productivity through structured adaptation for both executive and family.",
    es: "Acelere el tiempo hasta la plena productividad mediante una adaptación estructurada del ejecutivo y su familia.",
  },
  "Melhores decisões": { en: "Better Decisions", es: "Mejores decisiones" },
  "Tenha visibilidade sobre a adaptação da missão com métricas estruturadas e sem violar a privacidade do colaborador.": {
    en: "Gain visibility into assignment adaptation through structured metrics without compromising employee privacy.",
    es: "Obtenga visibilidad sobre la adaptación de la misión con métricas estructuradas y sin comprometer la privacidad del empleado.",
  },
  "Proteja orçamentos significativos de mobilidade reduzindo o atrito e as falhas imprevistas em missões internacionais.": {
    en: "Protect substantial mobility budgets by reducing friction and unexpected failures in international assignments.",
    es: "Proteja presupuestos de movilidad significativos reduciendo la fricción y los fracasos imprevistos en misiones internacionales.",
  },
  "2 a 3× o salário-base anual": {
    en: "2-3x Annual Base Salary",
    es: "2 a 3× el salario base anual",
  },
  "É quanto uma missão internacional de longa duração pode custar a uma empresa.": {
    en: "That's what a long-term international assignment can cost a company.",
    es: "Es lo que puede costar a una empresa una misión internacional de larga duración.",
  },
  "A MOOVIA ajuda a proteger esse investimento, atuando nos fatores humanos que determinam se a missão tem sucesso ou falha.": {
    en: "MOOVIA helps protect that investment by addressing the human factors that determine whether an assignment succeeds or fails.",
    es: "MOOVIA ayuda a proteger esa inversión actuando sobre los factores humanos que determinan si la misión tiene éxito o fracasa.",
  },
  "Podemos ajudá-lo a identificar onde a nossa avaliação estruturada e o acompanhamento contínuo podem encaixar no seu programa de mobilidade.": {
    en: "We can help you identify where our structured assessment and ongoing support fit into your mobility program.",
    es: "Podemos ayudarle a identificar dónde encajan nuestra evaluación estructurada y el acompañamiento continuo en su programa de movilidad.",
  },

  // ---------- ABOUT PAGE (EXACT V2) ----------
  "Orientamos líderes na complexidade da mobilidade global de talento.": {
    en: "Guiding leaders through the complexity of global talent mobility.",
    es: "Orientamos a líderes en la complejidad de la movilidad global de talento.",
  },
  "Aplicamos os princípios de Revenue Assurance à dimensão humana da mobilidade internacional, transformando a vulnerabilidade em previsibilidade e em retorno mensurável sobre o investimento em talento.": {
    en: "We bring Revenue Assurance principles to the human dimension of international mobility, turning vulnerability into predictability and measurable return on talent investment.",
    es: "Aplicamos los principios de Revenue Assurance a la dimensión humana de la movilidad internacional, transformando la vulnerabilidad en previsibilidad y en un retorno medible sobre la inversión en talento.",
  },
  "A MOOVIA nasceu de décadas de consultoria em Revenue Assurance, gestão de risco e transformação digital em empresas multinacionais.": {
    en: "MOOVIA was born from decades of high-stakes consulting in Revenue Assurance, risk management, and digital transformation across multinational corporations.",
    es: "MOOVIA nació de décadas de consultoría en Revenue Assurance, gestión de riesgo y transformación digital en empresas multinacionales.",
  },
  "Nas telecomunicações, banca e energia, Revenue Assurance é uma disciplina estabelecida: previne sistematicamente perdas financeiras, assegura a integridade operacional e recupera valor antes de a fuga se tornar estrutural.": {
    en: "In telecommunications, banking, and energy, Revenue Assurance is an established discipline: systematically preventing financial loss, ensuring operational integrity, and recovering value before leakage becomes structural.",
    es: "En telecomunicaciones, banca y energía, Revenue Assurance es una disciplina consolidada: previene sistemáticamente pérdidas financieras, asegura la integridad operacional y recupera valor antes de que la fuga se vuelva estructural.",
  },
  "Percebemos que o maior risco não gerido nos negócios internacionais de hoje não está nos sistemas financeiros ou nas cadeias de abastecimento, está na transição humana. Milhões são investidos na mobilidade de pessoas-chave através de fronteiras, com quase nenhuma proteção sistemática para a fricção pessoal, familiar e operacional que leva as missões ao fracasso. Criámos a Global Mobility Assurance para fechar essa lacuna.": {
    en: "We realized that the greatest unmanaged risk in international business today is not financial systems or supply chains, it is the human transition. Millions are invested in moving key people across borders, with almost zero systematic protection for the personal, family, and operational friction that causes assignments to fail. We created Global Mobility Assurance to close that gap.",
    es: "Comprendimos que el mayor riesgo no gestionado en los negocios internacionales hoy no reside en los sistemas financieros ni en las cadenas de suministro, sino en la transición humana. Se invierten millones en trasladar personas clave a través de fronteras, prácticamente sin protección sistemática ante la fricción personal, familiar y operativa que hace fracasar los proyectos. Creamos Global Mobility Assurance para cerrar esa brecha.",
  },
  "Rigor Metodológico": { en: "Methodological Rigor", es: "Rigor metodológico" },
  "Auditorias estruturadas, controlos sistemáticos e processos comprovados.": {
    en: "Structured audits, systematic controls, and battle-tested processes.",
    es: "Auditorías estructuradas, controles sistemáticos y procesos contrastados.",
  },
  "Proteção Financeira": { en: "Financial Protection", es: "Protección financiera" },
  "Foco obsessivo na prevenção de fugas de valor e na salvaguarda do investimento.": {
    en: "An obsessive focus on preventing value leakage and safeguarding investment.",
    es: "Enfoque constante en prevenir fugas de valor y salvaguardar la inversión.",
  },
  "Escala Empresarial": { en: "Enterprise Scale", es: "Escala empresarial" },
  "Concebida para navegar a complexidade e a governança de grandes organizações multinacionais.": {
    en: "Built to navigate the complexity and governance of large multinational organisations.",
    es: "Diseñada para gestionar la complejidad y el gobierno de grandes organizaciones multinacionales.",
  },
  "A Nossa Matriz": { en: "Our Matrix", es: "Nuestra matriz" },
  "A experiência da Mindset Consulting e da sua equipa fundadora em múltiplos setores e geografias.": {
    en: "The track record of Mindset Consulting and its founding team across sectors and geographies.",
    es: "La trayectoria de Mindset Consulting y de su equipo fundador en múltiples sectores y geografías.",
  },
  "Inteligência Humana": { en: "Human Intelligence", es: "Inteligencia humana" },
  "Tecnologia e método a serviço do elemento mais decisivo e vulnerável: a pessoa.": {
    en: "Technology and method serving the most decisive and vulnerable element: the person.",
    es: "Tecnología y método al servicio del elemento más decisivo y vulnerable: la persona.",
  },
  "A disciplina de Revenue Assurance. A empatia da transição humana.": {
    en: "The discipline of Revenue Assurance. The empathy of human transition.",
    es: "La disciplina de Revenue Assurance. La empatía de la transición humana.",
  },
  "A Global Mobility Assurance não é uma lista de tarefas de recolocação. É uma camada independente de inteligência e proteção que opera em três dimensões:": {
    en: "Global Mobility Assurance is not a set of relocation checklists. It is an independent layer of intelligence and protection that operates across three dimensions:",
    es: "Global Mobility Assurance no es una lista de verificación de reubicación. Es una capa independiente de inteligencia y protección que opera en tres dimensiones:",
  },
  "Experiência": { en: "Experience", es: "Experiencia" },
  "Evidência": { en: "Evidence", es: "Evidencia" },
  "Ação": { en: "Action", es: "Acción" },
  "A experiência humana em primeiro lugar.": {
    en: "Human experience first.",
    es: "La experiencia humana en primer lugar.",
  },
  "Cada transição é vivida por um ser humano e, frequentemente, por uma família. Avaliamos a preparação psicológica, a adaptabilidade cultural, a estabilidade familiar e as expectativas antes, durante e após a mudança.": {
    en: "Every transition is lived by a human being and often a family. We assess psychological readiness, cultural adaptability, family stability, and expectations before, during, and after the move.",
    es: "Cada transición la vive un ser humano y, a menudo, una familia. Evaluamos la preparación psicológica, la adaptabilidad cultural, la estabilidad familiar y las expectativas antes, durante y después del traslado.",
  },
  "Inteligência baseada em evidência.": {
    en: "Evidence-based intelligence.",
    es: "Inteligencia basada en evidencia.",
  },
  "A intuição não basta. Combinamos modelos de diagnóstico próprios, análise de padrões assistida por inteligência artificial e monitorização contínua em tempo real para identificar riscos invisíveis antes que se tornem crises.": {
    en: "Intuition is not enough. We combine proprietary diagnostic frameworks, AI-assisted pattern analysis, and real-time pulse monitoring to surface invisible risks before they become crises.",
    es: "La intuición no es suficiente. Combinamos modelos de diagnóstico propios, análisis de patrones asistido por inteligencia artificial y seguimiento continuo en tiempo real para detectar riesgos invisibles antes de que se conviertan en crisis.",
  },
  "Assurance independente e acionável.": {
    en: "Independent, actionable assurance.",
    es: "Assurance independiente y aplicable.",
  },
  "Não vendemos vistos, alojamento ou serviços de mudanças. A nossa objetividade é o nosso valor: fornecemos à liderança empresarial avaliações de risco transparentes, alertas precoces e caminhos claros de intervenção.": {
    en: "We do not sell visas, housing, or moving services. Our objectivity is our value: we provide corporate leadership with unvarnished risk assessments, early-warning indicators, and clear remediation pathways.",
    es: "No vendemos visados, alojamiento ni servicios de mudanzas. Nuestra objetividad es nuestro valor: proporcionamos a la dirección empresarial evaluaciones de riesgo claras, alertas tempranas y vías directas de mitigación.",
  },
  "As organizações já contam com empresas de recolocação, consultores fiscais, advogados de imigração e prestadores de serviços de destino. Não substituímos nenhum deles.": {
    en: "Organizations already have relocation companies, tax advisors, immigration lawyers, and destination service providers. We do not replace any of them.",
    es: "Las organizaciones ya cuentan con empresas de reubicación, asesores fiscales, abogados de inmigración y proveedores de servicios en destino. No sustituimos a ninguno de ellos.",
  },
  "Esses prestadores executam a logística da mobilidade. A MOOVIA assegura o sucesso do investimento. Atuamos ao lado das equipas de recursos humanos, dos líderes de mobilidade e da gestão executiva como uma camada independente de assurance.": {
    en: "Those providers execute the logistics of mobility. MOOVIA ensures the success of the investment. We sit alongside corporate HR, mobility leaders, and executive sponsors as an independent assurance layer.",
    es: "Esos proveedores ejecutan la logística de la movilidad. MOOVIA asegura el éxito de la inversión. Trabajamos junto a los equipos de recursos humanos, líderes de movilidad y la dirección ejecutiva como una capa independiente de assurance.",
  },
  "Avaliamos a preparação, monitorizamos a vulnerabilidade, detetamos os primeiros sinais de atrito e proporcionamos aos decisores a visibilidade necessária para proteger tanto a pessoa quanto o investimento.": {
    en: "We audit readiness, monitor vulnerability, detect early friction, and provide executive decision-makers with the visibility they need to protect both the person and the bottom line.",
    es: "Evaluamos la preparación, monitorizamos la vulnerabilidad, detectamos fricciones tempranas y facilitamos a los directivos la visibilidad necesaria para proteger tanto a la persona como el retorno del proyecto.",
  },
  "Pronto para proteger os seus investimentos em mobilidade?": {
    en: "Ready to protect your mobility investments?",
    es: "¿Preparado para proteger sus inversiones en movilidad?",
  },
  "Fale com a MOOVIA": { en: "Let's Talk", es: "Hablemos" },
  "Cada proposta é adaptada ao perfil e à complexidade de cada transição.": {
    en: "Each proposal is tailored to the profile and complexity of each transition.",
    es: "Cada propuesta se adapta al perfil y a la complejidad de cada transición.",
  },
  "A diferença para Global Mobility Management.": {
    en: "The distinction to Global Mobility Management.",
    es: "La diferencia con Global Mobility Management.",
  },
  "Revenue Assurance. Human Success.": {
    en: "Revenue Assurance. Human Success.",
    es: "Revenue Assurance. Human Success.",
  },
  "Administra a mobilidade": {
    en: "Administers mobility",
    es: "Administra la movilidad",
  },
  "Avalia se as condições humanas, familiares, financeiras e territoriais estão alinhadas para que essa mobilidade produza o resultado esperado.": {
    en: "Assesses whether human, family, financial, and territorial conditions are aligned so that this mobility produces the expected outcome.",
    es: "Evalúa si las condiciones humanas, familiares, financieras y territoriales están alineadas para que esta movilidad produzca el resultado esperado.",
  },
  "A área de Global Mobility faz a mobilidade acontecer.": {
    en: "Global Mobility makes mobility happen.",
    es: "El área de Global Mobility hace que la movilidad suceda.",
  },
  "A MOOVIA ajuda a aumentar a confiança de que ela funcionará depois que acontecer.": {
    en: "MOOVIA helps increase confidence that it will work once it happens.",
    es: "MOOVIA ayuda a aumentar la confianza de que funcionará una vez realizada.",
  },
  // ---------- PARA EMPRESAS / FOR COMPANIES ----------
  "PARA LÍDERES DE GLOBAL MOBILITY E RH": {
    en: "FOR GLOBAL MOBILITY & HR LEADERS",
    es: "PARA LÍDERES DE GLOBAL MOBILITY Y RR. HH.",
  },
  "Proteja o valor das suas missões internacionais.": {
    en: "Protect the Value of Your International Assignments.",
    es: "Proteja el valor de sus misiones internacionales.",
  },
  "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.": {
    en: "MOOVIA helps companies assess employee and family adaptation, identify emerging risks and take timely action to support performance, retention and assignment continuity.",
    es: "MOOVIA ayuda a las empresas a evaluar la adaptación de los colaboradores y de las familias, a identificar riesgos emergentes y a actuar a tiempo para apoyar el desempeño, la retención y la continuidad de las misiones.",
  },
  "ONDE A MOOVIA ACRESCENTA VALOR": {
    en: "WHERE MOOVIA ADDS VALUE",
    es: "DÓNDE MOOVIA APORTA VALOR",
  },
  "Concentre-se nas missões que mais importam.": {
    en: "Focus on the Assignments That Matter Most.",
    es: "Céntrese en las misiones que más importan.",
  },
  "A MOOVIA foi concebida para missões internacionais em que as dificuldades de adaptação podem ter consequências significativas para o negócio.": {
    en: "MOOVIA is designed for international assignments where adaptation difficulties can have significant business consequences.",
    es: "MOOVIA está diseñada para misiones internacionales en las que las dificultades de adaptación pueden tener consecuencias significativas para el negocio.",
  },
  "TRÊS CASOS DE USO": {
    en: "THREE USE CASES",
    es: "TRES CASOS DE USO",
  },
  "Líderes críticos para o negócio": {
    en: "Business-Critical Leaders",
    es: "Líderes críticos para el negocio",
  },
  "Missões em que uma perturbação pode afetar equipas, projetos e a continuidade do negócio.": {
    en: "Assignments where disruption can affect teams, projects and business continuity.",
    es: "Misiones en las que una perturbación puede afectar a equipos, proyectos y a la continuidad del negocio.",
  },
  "Executivos e Famílias": {
    en: "Executives & Families",
    es: "Ejecutivos y Familias",
  },
  "Mudanças internacionais em que a adaptação da família é essencial para a estabilidade da missão.": {
    en: "International moves where family adaptation is essential to assignment stability.",
    es: "Traslados internacionales en los que la adaptación de la familia es esencial para la estabilidad de la misión.",
  },
  "Especialistas Seniores": {
    en: "Senior Specialists",
    es: "Especialistas Senior",
  },
  "Missões de longa duração ou culturalmente complexas que exigem apoio adicional.": {
    en: "Long-term or culturally complex assignments requiring additional support.",
    es: "Misiones de larga duración o culturalmente complejas que requieren apoyo adicional.",
  },
  "Mais visibilidade. Ação mais cedo. Decisões mais informadas.": {
    en: "Better Visibility. Earlier Action. More Informed Decisions.",
    es: "Mayor visibilidad. Acción más temprana. Decisiones más informadas.",
  },
  "A MOOVIA ajuda as empresas a reconhecer os desafios de adaptação antes que se agravem e fornece informação estruturada para orientar as intervenções.": {
    en: "MOOVIA helps companies recognise adaptation challenges before they escalate and provides structured information to guide interventions.",
    es: "MOOVIA ayuda a las empresas a reconocer los desafíos de adaptación antes de que se agraven y proporciona información estructurada para orientar las intervenciones.",
  },
  "O valor do programa pode ser avaliado através de:": {
    en: "Programme value can be assessed through:",
    es: "El valor del programa puede evaluarse mediante:",
  },
  "Progresso da adaptação ao longo do tempo.": {
    en: "Adaptation progress over time.",
    es: "Progreso de la adaptación a lo largo del tiempo.",
  },
  "Riscos identificados e ações recomendadas.": {
    en: "Risks identified and actions recommended.",
    es: "Riesgos identificados y acciones recomendadas.",
  },
  "Resultados do acompanhamento e estabilidade da missão.": {
    en: "Follow-up results and assignment stability.",
    es: "Resultados del seguimiento y estabilidad de la misión.",
  },
  "Feedback das equipas de Global Mobility.": {
    en: "Feedback from Global Mobility teams.",
    es: "Comentarios de los equipos de Global Mobility.",
  },
  "O QUE A SUA EMPRESA RECEBE": {
    en: "WHAT YOUR COMPANY RECEIVES",
    es: "LO QUE RECIBE SU EMPRESA",
  },
  "Informação clara. Recomendações práticas.": {
    en: "Clear Insights. Practical Recommendations.",
    es: "Información clara. Recomendaciones prácticas.",
  },
  "A MOOVIA presta apoio e informação distintos aos colaboradores e às equipas corporativas.": {
    en: "MOOVIA provides separate support and information for employees and corporate teams.",
    es: "MOOVIA ofrece apoyo e información diferenciados para los empleados y para los equipos corporativos.",
  },
  "PÚBLICO-ALVO": {
    en: "TARGET AUDIENCE",
    es: "DESTINATARIOS",
  },
  "COLABORADORES E FAMÍLIAS": {
    en: "EMPLOYEES & FAMILIES",
    es: "EMPLEADOS Y FAMILIAS",
  },
  "Avaliações confidenciais e check-ins regulares.": {
    en: "Confidential assessments and regular check-ins.",
    es: "Evaluaciones confidenciales y check-ins regulares.",
  },
  "Orientação personalizada e apoio à adaptação.": {
    en: "Personalised guidance and adaptation support.",
    es: "Orientación personalizada y apoyo a la adaptación.",
  },
  "Acompanhamento ao longo da missão.": {
    en: "Follow-up throughout the assignment.",
    es: "Seguimiento a lo largo de la misión.",
  },
  "GESTÃO CORPORATIVA": {
    en: "CORPORATE MANAGEMENT",
    es: "GESTIÓN CORPORATIVA",
  },
  "EQUIPAS DE GLOBAL MOBILITY E RH": {
    en: "GLOBAL MOBILITY & HR TEAMS",
    es: "EQUIPOS DE GLOBAL MOBILITY Y RR. HH.",
  },
  "Indicadores de prontidão e de adaptação.": {
    en: "Readiness and adaptation indicators.",
    es: "Indicadores de preparación y adaptación.",
  },
  "Identificação de riscos emergentes e de prioridades.": {
    en: "Identification of emerging risks and priorities.",
    es: "Identificación de riesgos emergentes y prioridades.",
  },
  "Ações recomendadas e atualizações de progresso.": {
    en: "Recommended actions and progress updates.",
    es: "Acciones recomendadas y actualizaciones de progreso.",
  },
  "Visibilidade sobre as missões acompanhadas.": {
    en: "Visibility across monitored assignments.",
    es: "Visibilidad sobre las misiones acompañadas.",
  },
  "Privacidade:": {
    en: "Privacy:",
    es: "Privacidad:",
  },
  "a informação pessoal e familiar permanece confidencial. As entidades empregadoras recebem apenas a informação necessária para gerir a missão.": {
    en: "Personal and family information remains confidential. Employers receive only the information necessary to manage the assignment.",
    es: "la información personal y familiar sigue siendo confidencial. Los empleadores solo reciben la información necesaria para gestionar la misión.",
  },
  "COMO FUNCIONA O PROGRAMA": {
    en: "HOW THE PROGRAMME WORKS",
    es: "CÓMO FUNCIONA EL PROGRAMA",
  },
  "Apoio estruturado ao longo de toda a missão.": {
    en: "Structured Support Throughout the Assignment.",
    es: "Apoyo estructurado a lo largo de toda la misión.",
  },
  "A MOOVIA combina a experiência humana, análise assistida por inteligência artificial e relatórios práticos para identificar riscos de adaptação e apoiar intervenções atempadas.": {
    en: "MOOVIA combines human expertise, AI-assisted intelligence and practical reporting to identify adaptation risks and support timely interventions.",
    es: "MOOVIA combina la experiencia humana, el análisis asistido por inteligencia artificial y los informes prácticos para identificar riesgos de adaptación y apoyar intervenciones oportunas.",
  },
  "TRÊS COMPONENTES CENTRAIS": {
    en: "THREE CORE COMPONENTS",
    es: "TRES COMPONENTES CENTRALES",
  },
  "Experiência do Colaborador e da Família": {
    en: "Employee & Family Experience",
    es: "Experiencia del Empleado y la Familia",
  },
  "Inteligência de Mobilidade baseada em inteligência artificial": {
    en: "AI-Powered Mobility Intelligence",
    es: "Inteligencia de Movilidad basada en inteligencia artificial",
  },
  "Liga sinais humanos e contextuais para identificar riscos emergentes, com revisão e recomendações de especialistas.": {
    en: "Connects human and contextual signals to identify emerging risks, with expert review and recommendations.",
    es: "Conecta señales humanas y contextuales para identificar riesgos emergentes, con revisión y recomendaciones de expertos.",
  },
  "Painéis de Global Mobility": {
    en: "Global Mobility Dashboards",
    es: "Paneles de Global Mobility",
  },
  "Orientação individual confidencial e informação ao nível da gestão para ajudar as empresas a acompanhar as missões e a priorizar a ação.": {
    en: "Confidential individual guidance and management-level insights to help companies monitor assignments and prioritise action.",
    es: "Orientación individual confidencial e información a nivel directivo para ayudar a las empresas a monitorizar misiones y priorizar acciones.",
  },
  "A nossa linha do tempo": {
    en: "Our timeline",
    es: "Nuestra línea de tiempo",
  },
  "Acompanhamento contínuo e preventivo estruturado em marcos de adaptação essenciais.": {
    en: "Continuous, preventative follow-up structured around key adaptation milestones.",
    es: "Seguimiento continuo y preventivo estructurado en hitos clave de adaptación.",
  },
  "Antes da mudança": {
    en: "Before the move",
    es: "Antes del traslado",
  },
  "Linha de base de prontidão": {
    en: "Readiness baseline",
    es: "Línea de base de preparación",
  },
  "Expectativas · alinhamento familiar · contexto · fatores de proteção e de risco": {
    en: "Expectations · family alignment · context · protective / risk factors",
    es: "Expectativas · alineación familiar · contexto · factores de protección y riesgo",
  },
  "Chegada": {
    en: "Landing",
    es: "Llegada",
  },
  "Adaptação inicial": {
    en: "Early adaptation",
    es: "Adaptación inicial",
  },
  "Realidade versus expectativas · primeiras fricções · enquadramento prático e familiar": {
    en: "Reality vs expectations · early friction · practical / family setting",
    es: "Realidad frente a expectativas · primeras fricciones · entorno práctico y familiar",
  },
  "Verificação de padrões": {
    en: "Pattern check",
    es: "Comprobación de patrones",
  },
  "Adequação ao papel · integração cultural · estabilidade familiar · apoio organizacional": {
    en: "Role fit · cultural integration · family stability · organisational support",
    es: "Adecuación al puesto · integración cultural · estabilidad familiar · apoyo organizativo",
  },
  "Estabilidade": {
    en: "Stability",
    es: "Estabilidad",
  },
  "Revisão de resultados": {
    en: "Outcome review",
    es: "Revisión de resultados",
  },
  "Tendência face à linha de base · efeito das intervenções · perspetiva da missão": {
    en: "Trend vs baseline · intervention effect · assignment outlook",
    es: "Tendencia frente a la línea de base · efecto de las intervenciones · perspectiva de la misión",
  },
  "Contínuo": {
    en: "Ongoing",
    es: "Continuo",
  },
  "Acompanhamento": {
    en: "Monitor",
    es: "Seguimiento",
  },
  "Seguimento acionado por risco": {
    en: "Risk-triggered follow-up",
    es: "Seguimiento activado por riesgo",
  },
  "Check-in adicional quando um sinal relevante se altera": {
    en: "Additional check-in when a meaningful signal changes",
    es: "Check-in adicional cuando cambia una señal relevante",
  },
  "Converse com a MOOVIA sobre o seu programa de mobilidade.": {
    en: "Discuss your mobility programme with MOOVIA.",
    es: "Hable con MOOVIA sobre su programa de movilidad.",
  },
  "Em conjunto, identificamos as missões adequadas, definimos o âmbito do apoio e acordamos um programa de acompanhamento.": {
    en: "Together, we identify suitable assignments, define the scope of support and agree on a monitoring programme.",
    es: "Juntos, identificamos las misiones adecuadas, definimos el alcance del apoyo y acordamos un programa de seguimiento.",
  },
  "Para Empresas": {
    en: "For Companies",
    es: "Para Empresas",
  },
  "Para Executivos e Famílias": {
    en: "For Executives & Families",
    es: "Para Ejecutivos y Familias",
  },
  // ---------- PARA EXECUTIVOS E FAMÍLIAS / FOR EXECUTIVES & FAMILIES ----------
  "PARA EXECUTIVOS E FAMÍLIAS": {
    en: "FOR EXECUTIVES & FAMILIES",
    es: "PARA EJECUTIVOS Y FAMILIAS",
  },
  "Você": {
    en: "You",
    es: "Usted",
  },
  "A sua família": {
    en: "Your family",
    es: "Su familia",
  },
  "Apoio": {
    en: "Support",
    es: "Apoyo",
  },
  "Um novo país.": {
    en: "A new country.",
    es: "Un nuevo país.",
  },
  "Um novo capítulo.": {
    en: "A new chapter.",
    es: "Un nuevo capítulo.",
  },
  "Apoio ao longo do caminho.": {
    en: "Support along the way.",
    es: "Apoyo a lo largo del camino.",
  },
  "Uma mudança internacional traz oportunidades profissionais e mudança pessoal. A MOOVIA ajuda-o a si e à sua família a preparar-se, a adaptar-se e a encontrar apoio prático ao longo da transição.": {
    en: "An international move brings professional opportunities and personal change. MOOVIA helps you and your family prepare, adapt and find practical support throughout the transition.",
    es: "Un traslado internacional aporta oportunidades profesionales y cambio personal. MOOVIA le ayuda a usted y a su familia a prepararse, adaptarse y encontrar apoyo práctico a lo largo de la transición.",
  },
  "O QUE A MOOVIA FAZ POR SI": {
    en: "WHAT MOOVIA DOES FOR YOU",
    es: "LO QUE MOOVIA HACE POR USTED",
  },
  "Orientação pessoal para as partes da mudança que não constam de uma lista de verificação.": {
    en: "Personal guidance for the parts of relocation that are not on a checklist.",
    es: "Orientación personal para las partes del traslado que no están en una lista de verificación.",
  },
  "A par da mudança prática, há questões sobre expectativas, rotinas familiares, trabalho, cultura, pertença e vida quotidiana. Criamos espaço para falar destes temas e identificar que apoio pode ser útil.": {
    en: "Alongside the practical move, there are questions about expectations, family routines, work, culture, belonging and everyday life. We create space to discuss these topics and identify what support may be useful.",
    es: "Junto con el traslado práctico, surgen preguntas sobre expectativas, rutinas familiares, trabajo, cultura, pertenencia y vida cotidiana. Creamos un espacio para hablar de estos temas e identificar qué apoyo puede ser útil.",
  },
  "Uma oportunidade para partilhar expectativas e preocupações antes ou logo depois da mudança.": {
    en: "A chance to share expectations and concerns before or shortly after moving.",
    es: "Una oportunidad para compartir expectativas y preocupaciones antes o poco después del traslado.",
  },
  "Conversas regulares e estruturadas à medida que a nova rotina se forma.": {
    en: "Regular, structured conversations as the new routine takes shape.",
    es: "Conversaciones regulares y estructuradas a medida que se va consolidando la nueva rutina.",
  },
  "Recomendações personalizadas e orientação especializada quando apropriado.": {
    en: "Personalised recommendations and specialist guidance where appropriate.",
    es: "Recomendaciones personalizadas y orientación especializada cuando corresponda.",
  },
  "O que lhe entregamos:": {
    en: "Our deliverables to you:",
    es: "Lo que le entregamos:",
  },
  "Uma avaliação individual e feedback pessoal.": {
    en: "An individual assessment and personal feedback.",
    es: "Una evaluación individual y comentarios personales.",
  },
  "Um plano prático de adaptação e integração.": {
    en: "A practical adaptation and integration plan.",
    es: "Un plan práctico de adaptación e integración.",
  },
  "Recomendações e acompanhamento planeado.": {
    en: "Recommendations and planned follow-up.",
    es: "Recomendaciones y seguimiento planificado.",
  },
  "Acesso a assistência especializada adicional quando faz parte do programa acordado.": {
    en: "Access to additional specialist assistance when part of the agreed programme.",
    es: "Acceso a asistencia especializada adicional cuando forme parte del programa acordado.",
  },
  "O seu percurso": {
    en: "Your journey",
    es: "Su recorrido",
  },
  "Dúvidas sobre o seu apoio à mobilidade?": {
    en: "Questions about your mobility support?",
    es: "¿Preguntas sobre su apoyo a la movilidad?",
  },
  "Se a sua entidade empregadora o apresentou à MOOVIA, podemos explicar o processo, o próximo check-in e como aceder ao seu apoio.": {
    en: "If your employer has introduced you to MOOVIA, we can explain the process, the next check-in and how to access your support.",
    es: "Si su empleador le ha presentado a MOOVIA, podemos explicarle el proceso, el próximo check-in y cómo acceder a su apoyo.",
  },
  "Se está a preparar uma mudança internacional ou já vive no estrangeiro, teremos todo o gosto em explicar como a MOOVIA o pode apoiar a si e à sua família.": {
    en: "If you’re preparing for an international move or already living abroad, we’d be happy to explain how MOOVIA can support you and your family.",
    es: "Si se está preparando para un traslado internacional o ya vive en el extranjero, estaremos encantados de explicarle cómo MOOVIA puede apoyarle a usted y a su familia.",
  },

  // --- AUTO-INJECTED CORRECTIONS ---
  "A MOOVIA é a aplicação desta experiência à proteção do investimento humano.": {
    "en": "MOOVIA is the application of this experience to the protection of human investment.",
    "es": "MOOVIA es la aplicación de esta experiencia a la protección de la inversión humana."
  },
  "Tornar a mobilidade internacional mais informada, mais solidária e mais responsável perante as pessoas e os resultados do negócio.": {
    "en": "Make international mobility more informed, more supportive and more accountable to people and business outcomes",
    "es": "Hacer que la movilidad internacional sea más informada, más solidaria y más responsable ante las personas y los resultados empresariales."
  },
  "Carreira Internacional": {
    "en": "International Career",
    "es": "Carrera Internacional"
  },
  "Décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em vários continentes.": {
    "en": "Decades of experience in international business, global projects, and market development across multiple continents.",
    "es": "Décadas de experiencia en negocios internacionales, proyectos globales y desarrollo de mercados en varios continentes."
  },
  "Identificar riscos e perdas ocultos: a disciplina que ensinou a MOOVIA a ver o que os modelos tradicionais de gestão não captam.": {
    "en": "Identifying hidden risks and losses: the discipline that taught MOOVIA to see what traditional management models fail to capture.",
    "es": "Identificar riesgos y pérdidas ocultos: la disciplina que enseñó a MOOVIA a ver lo que los modelos tradicionales de gestión no captan."
  },
  "Metodologias Próprias": {
    "en": "Proprietary Methodologies",
    "es": "Metodologías Propias"
  },
  "A combinação de ciência comportamental humana e engenharia de sistemas, transformando o conhecimento especializado num processo estruturado e replicável.": {
    "en": "The combination of human behavioural science and systems engineering, transforming specialist knowledge into a structured and replicable process.",
    "es": "La combinación de ciencia del comportamiento humano e ingeniería de sistemas, transformando el conocimiento especializado en un proceso estructurado y replicable."
  },
  "Raízes e Asas": {
    "en": "Roots and Wings",
    "es": "Raíces y Alas"
  },
  "A metodologia que estrutura a dimensão humana do sucesso, traduzindo adaptação, integração e bem-estar em variáveis mensuráveis.": {
    "en": "The methodology that structures the human dimension of success, translating adaptation, integration, and well-being into measurable variables.",
    "es": "La metodología que estructura la dimensión humana del éxito, traduciendo adaptación, integración y bienestar en variables medibles."
  },
  "Tecnologia": {
    "en": "Technology",
    "es": "Tecnología"
  },
  "A arquitetura que converte este conhecimento humano em lógica computacional explicável e rastreável, eliminando a ‘caixa negra’.": {
    "en": "The architecture that converts this human knowledge into explainable, traceable computational logic, eliminating the ‘black box’.",
    "es": "La arquitectura que convierte este conocimiento humano en lógica computacional explicable y trazable, eliminando la ‘caja negra’."
  },
  "Políticas": {
    "en": "Policies",
    "es": "Políticas"
  },
  "Vistos": {
    "en": "Visas",
    "es": "Visados"
  },
  "Impostos": {
    "en": "Taxes",
    "es": "Impuestos"
  },
  "Payroll": {
    "en": "Payroll",
    "es": "Nómina"
  },
  "Benefícios": {
    "en": "Benefits",
    "es": "Beneficios"
  },
  "Fornecedores": {
    "en": "Suppliers",
    "es": "Proveedores"
  },
  "Compliance": {
    "en": "Compliance",
    "es": "Cumplimiento"
  },
  "Logística da transferência": {
    "en": "Relocation Logistics",
    "es": "Logística de la mudanza"
  },
  "EXEMPLO DE ENTREGÁVEL PARA EMPRESAS": {
    "en": "EXAMPLE OF DELIVERABLE FOR COMPANIES",
    "es": "EJEMPLO DE ENTREGABLE PARA EMPRESAS"
  },
  "(Dados agregados e anonimizados)": {
    "en": "(Aggregated and anonymised data)",
    "es": "(Datos agregados y anonimizados)"
  },
  "Nota: \"Estes indicadores são produzidos a partir da metodologia Human Mobility Assurance e não revelam respostas individuais nem informação pessoal identificável.\"": {
    "en": "Note: \"These indicators are produced from the Human Mobility Assurance methodology and do not disclose individual responses or personally identifiable information.\"",
    "es": "Nota: \"Estos indicadores se producen a partir de la metodología Human Mobility Assurance y no revelan respuestas individuales ni información personal identificable.\""
  },
  "Avaliações estruturadas, check-ins regulares e apoio personalizado ao longo da missão.": {
    "en": "Structured assessments, regular check-ins and personalised support throughout the assignment.",
    "es": "Evaluaciones estructuradas, check-ins regulares y apoyo personalizado a lo largo de la misión."
  },
  "~30 dias": {
    "en": "~30 days",
    "es": "~30 días"
  },
  "~90 dias": {
    "en": "~90 days",
    "es": "~90 días"
  },
  "~180 dias": {
    "en": "~180 days",
    "es": "~180 días"
  },
  "T-30 / T0": {
    "en": "T-30 / T0",
    "es": "T-30 / T0"
  },
  "Contínuo": {
    "en": "Ongoing",
    "es": "Continuo"
  },
  "Co-Founder & Legal | Advogado Associado da Abreu": {
    "en": "Co-Founder & Legal | Associate Lawyer at Abreu",
    "es": "Co-Founder & Legal | Abogado asociado de Abreu"
  },
  "Co-Founder & CSO | Wellness & Integração Familiar": {
    "en": "Co-Founder & CSO | Wellness & Family Integration",
    "es": "Co-Founder & CSO | Wellness e Integración Familiar"
  },
  "Abrir perfil de Rui Mano": {
    "en": "View Rui Mano’s profile",
    "es": "Ver el perfil de Rui Mano"
  },
  "Abrir perfil de Frederico Prado": {
    "en": "View Frederico Prado’s profile",
    "es": "Ver el perfil de Frederico Prado"
  },
  "Abrir perfil de Pablo Alejandro Saco Paim": {
    "en": "View Pablo Alejandro Saco Paim’s profile",
    "es": "Ver el perfil de Pablo Alejandro Saco Paim"
  },
  "Abrir perfil de João Gabriel Prado": {
    "en": "View João Gabriel Prado’s profile",
    "es": "Ver el perfil de João Gabriel Prado"
  },
  "Abrir perfil de Dra. Letícia de Mello": {
    "en": "View Dr Letícia de Mello’s profile",
    "es": "Ver el perfil de Dra. Letícia de Mello"
  },
  "Abrir perfil de Guilherme Souza": {
    "en": "View Guilherme Souza’s profile",
    "es": "Ver el perfil de Guilherme Souza"
  },
  "Abrir perfil de Sara Russo": {
    "en": "View Sara Russo’s profile",
    "es": "Ver el perfil de Sara Russo"
  },
  "Abrir perfil de Cristina Sousa": {
    "en": "View Cristina Sousa’s profile",
    "es": "Ver el perfil de Cristina Sousa"
  },
  "Abrir perfil de Sandra Santos": {
    "en": "View Sandra Santos’s profile",
    "es": "Ver el perfil de Sandra Santos"
  },
  "Abrir perfil de Dany Zukerman": {
    "en": "View Dany Zukerman’s profile",
    "es": "Ver el perfil de Dany Zukerman"
  },
  "Abrir perfil de Laura Costa, LL.M.": {
    "en": "View Laura Costa, LL.M.’s profile",
    "es": "Ver el perfil de Laura Costa, LL.M."
  },
  "Inteligência para os riscos humanos das missões internacionais": {
    "en": "Intelligence for the human risks of international assignments",
    "es": "Inteligencia para los riesgos humanos de las misiones internacionales"
  },
  "A MOOVIA ajuda empresas e executivos a identificar e gerir os desafios humanos, culturais e familiares que podem comprometer missões internacionais, antes que se transformem em problemas de desempenho, retenção ou repatriação.": {
    "en": "MOOVIA helps companies and executives identify and address the human, cultural and family challenges that can compromise international assignments, before they become performance, retention or repatriation issues.",
    "es": "MOOVIA ayuda a empresas y ejecutivos a identificar y abordar los desafíos humanos, culturales y familiares que pueden comprometer las misiones internacionales, antes de que se conviertan en problemas de desempeño, retención o repatriación."
  },
  "Proteja o valor das suas missões internacionais.": {
    "en": "Protect the Value of Your International Assignments.",
    "es": "Proteja el valor de sus misiones internacionales."
  },
  "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.": {
    "en": "MOOVIA helps companies assess employee and family adaptation, identify emerging risks and take timely action to support performance, retention and assignment continuity.",
    "es": "MOOVIA ayuda a las empresas a evaluar la adaptación de los empleados y las familias, a identificar riesgos emergentes y a actuar a tiempo para apoyar el rendimiento, la retención y la continuidad de las misiones."
  },
  "Um novo país. Um novo capítulo. Apoio ao longo do caminho.": {
    "en": "A new country. A new chapter. Support along the way.",
    "es": "Un nuevo país. Un nuevo capítulo. Apoyo en el camino."
  },
  "Uma mudança internacional traz oportunidades profissionais e transformações pessoais. A MOOVIA ajuda-o a si e à sua família a preparar, adaptar e encontrar apoio prático ao longo de toda a transição.": {
    "en": "An international move brings professional opportunities and personal change. MOOVIA helps you and your family prepare, adapt and find practical support throughout the transition.",
    "es": "Una mudanza internacional trae oportunidades profesionales y transformaciones personales. MOOVIA le ayuda a usted y a su familia a prepararse, adaptarse y encontrar apoyo práctico a lo largo de toda la transición."
  },
  "Levar a disciplina da assurance à mobilidade internacional.": {
    "en": "Bringing the discipline of assurance to international mobility.",
    "es": "Llevar la disciplina de la assurance a la movilidad internacional."
  },
  "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás. Combinamos avaliação estruturada, conhecimento especializado e acompanhamento para ajudar colaboradores, famílias e organizações a navegar as transições internacionais.": {
    "en": "MOOVIA was created to give the human side of an international assignment the same attention as the financial and operational investment behind it. We combine structured assessment, specialist insight and follow-up to help employees, families and organisations navigate international transitions.",
    "es": "MOOVIA se creó para prestar a la dimensión humana de una asignación internacional la misma atención que a la inversión financiera y operativa que hay detrás. Combinamos evaluación estructurada, criterio especializado y seguimiento para ayudar a colaboradores, familias y organizaciones a navegar las transiciones internacionales."
  },
  "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela.": {
    "en": "Built on decades of experience, united by one conviction: the human side of international mobility deserves the same protection as the investment behind it.",
    "es": "Construida sobre décadas de experiencia, unida por una convicción: la dimensión humana de la movilidad internacional merece la misma protección que la inversión que hay detrás de ella."
  },

  // ---------- NEW RIPPLE, TECH ACCOUNTABILITY, TIMELINE, PRIVACY ----------
  "IMPACTO NO NEGÓCIO": {
    en: "BUSINESS IMPACT",
    es: "IMPACTO EN EL NEGOCIO",
  },
  "O efeito em cascata do desempenho oculto": {
    en: "The ripple effect of hidden performance",
    es: "El efecto en cascada del rendimiento oculto",
  },
  "Quando um colaborador ou a sua família tem dificuldade em adaptar-se, a missão continua, mas o resultado pode deteriorar-se sem que ninguém o veja. O efeito não fica na pessoa.": {
    en: "When an employee or family struggles to adapt, the assignment continues, but results may quietly decline. The effect does not stay with the individual.",
    es: "Cuando un colaborador o su familia tiene dificultades para adaptarse, la misión continúa, pero el resultado puede deteriorarse sin que nadie lo vea. El efecto no se queda en la persona.",
  },
  "Pessoa": {
    en: "Person",
    es: "Persona",
  },
  "Adaptação difícil": {
    en: "Difficult adaptation",
    es: "Adaptación difícil",
  },
  "Decisões mais lentas": {
    en: "Slower decisions",
    es: "Decisiones más lentas",
  },
  "Projeto": {
    en: "Project",
    es: "Proyecto",
  },
  "Atrasos na execução": {
    en: "Execution delays",
    es: "Retrasos en la ejecución",
  },
  "Negócio": {
    en: "Business",
    es: "Negocio",
  },
  "Margens, clientes e continuidade em risco": {
    en: "Margins, clients and continuity at risk",
    es: "Márgenes, clientes y continuidad en riesgo",
  },
  "Pessoa: Adaptação difícil": {
    en: "Person: Difficult adaptation",
    es: "Persona: Adaptación difícil",
  },
  "Equipa: Decisões mais lentas": {
    en: "Team: Slower decisions",
    es: "Equipo: Decisiones más lentas",
  },
  "Projeto: Atrasos na execução": {
    en: "Project: Execution delays",
    es: "Proyecto: Retrasos en la ejecución",
  },
  "Negócio: Margens, clientes e continuidade em risco": {
    en: "Business: Margins, clients and continuity at risk",
    es: "Negocio: Márgenes, clientes y continuidad en riesgo",
  },
  "Esquema qualitativo. O impacto pode ultrapassar os custos diretos da mobilidade.": {
    en: "Qualitative illustration. The impact may exceed the direct costs of mobility.",
    es: "Esquema cualitativo. El impacto puede superar los costes directos de la movilidad.",
  },
  "A MOOVIA ajuda a identificar sinais cedo, para que a ação chegue antes de o efeito se espalhar.": {
    en: "MOOVIA helps identify early signals so action can come before the effect spreads.",
    es: "MOOVIA ayuda a identificar señales a tiempo, para que la acción llegue antes de que el efecto se extienda.",
  },
  "TECNOLOGIA E RESPONSABILIDADE": {
    en: "TECHNOLOGY AND ACCOUNTABILITY",
    es: "TECNOLOGÍA Y RESPONSABILIDAD",
  },
  "Tecnologia que apoia decisões, sem as substituir": {
    en: "Technology that supports decisions, never replaces them",
    es: "Tecnología que apoya las decisiones, sin sustituirlas",
  },
  "A tecnologia interpreta": {
    en: "Technology interprets",
    es: "La tecnología interpreta",
  },
  "A análise assistida por inteligência artificial foi concebida para ler a informação e apresentá-la com clareza.": {
    en: "AI-assisted analysis is designed to read information and present it clearly.",
    es: "El análisis asistido por inteligencia artificial está concebido para leer la información y presentarla con claridad.",
  },
  "As regras calculam": {
    en: "Rules calculate",
    es: "Las reglas calculan",
  },
  "Regras definidas e versionadas produzem os indicadores. A mesma informação, com as mesmas regras, dá o mesmo resultado.": {
    en: "Defined, versioned rules produce the indicators. The same information with the same rules gives the same result.",
    es: "Reglas definidas y versionadas producen los indicadores. La misma información, con las mismas reglas, da el mismo resultado.",
  },
  "Cada recomendação é rastreável": {
    en: "Every recommendation is traceable",
    es: "Cada recomendación es trazable",
  },
  "Cada recomendação aponta para a evidência e para a regra que a originou.": {
    en: "Each recommendation points to the evidence and the rule behind it.",
    es: "Cada recomendación apunta a la evidencia y a la regla que la originó.",
  },
  "Os especialistas decidem": {
    en: "Specialists decide",
    es: "Los especialistas deciden",
  },
  "A revisão especializada valida qualquer intervenção com impacto humano. A tecnologia não altera os resultados sem decisão explícita.": {
    en: "Specialist review validates any intervention with human impact. Technology does not change results without an explicit decision.",
    es: "La revisión especializada valida cualquier intervención con impacto humano. La tecnología no modifica los resultados sin una decisión explícita.",
  },
  "Concebido para a privacidade desde a origem: apenas a informação necessária, acesso limitado e nenhuma decisão automatizada sobre emprego com base num resultado.": {
    en: "Designed for privacy from the start: only the information needed, limited access, and no automated employment decisions based on a score.",
    es: "Concebido para la privacidad desde el origen: solo la información necesaria, acceso limitado y ninguna decisión automatizada sobre el empleo basada en un resultado.",
  },
  "Algumas capacidades assistidas por inteligência artificial estão em desenvolvimento e em validação, com revisão especializada.": {
    en: "Some AI-assisted capabilities are still being developed and validated, with specialist review.",
    es: "Algunas capacidades assistidas por inteligencia artificial están en desarrollo y en validación, con revisión especializada.",
  },
  "Cada medição é comparada com a anterior, tornando visível a evolução ao longo do tempo.": {
    en: "Each measurement is compared with the previous one, so change over time becomes visible.",
    es: "Cada medición se compara con la anterior, haciendo visible la evolución a lo largo del tiempo.",
  },
  "Concebido a pensar na sua privacidade: apenas a informação necessária para o apoiar, com acesso limitado.": {
    en: "Designed with your privacy in mind: only the information needed to support you, with limited access.",
    es: "Concebido pensando en su privacidad: solo la información necesaria para apoyarle, con acceso limitado.",
  },
  "A arquitetura que converte este conhecimento humano em lógica computacional explicável e rastreável, concebida para evitar uma ‘caixa negra’.": {
    en: "The architecture that converts this human knowledge into explainable, traceable computational logic, designed to avoid a 'black box'.",
    es: "La arquitectura que convierte este conocimiento humano en lógica computacional explicable y trazable, concebida para evitar una 'caja negra'.",
  },
  "Ligamos sinais relevantes ao longo do tempo para identificar riscos emergentes, fatores de proteção e mudanças na adaptação. Critérios explicáveis e análise assistida por inteligência artificial apoiam os nossos especialistas na interpretação desses padrões e na recomendação de intervenções adequadas, à medida que estas capacidades são desenvolvidas e validadas.": {
    en: "We connect relevant signals over time to identify emerging risks, protective factors and changes in adaptation. Explainable criteria and AI-assisted analysis support our specialists in interpreting these patterns and recommending appropriate interventions, as these capabilities are developed and validated.",
    es: "Conectamos señales relevantes a lo largo del tiempo para identificar riesgos emergentes, factores de protección y cambios en la adaptación. Los criterios explicables y el análisis asistido por inteligencia artificial apoyan a nuestros especialistas en la interpretación de estos patrones y en la recomendación de intervenciones adecuadas, a medida que estas capacidades se desarrollan y se validan.",
  },
  "Lê a informação e apresenta-a com clareza.": {
    en: "Reads information and presents it clearly.",
    es: "Lee la información y la presenta con claridad.",
  },
  "Regras versionadas dão o mesmo resultado para a mesma informação.": {
    en: "Versioned rules give the same result for the same information.",
    es: "Reglas versionadas dan el mismo resultado para la misma información.",
  },
  "Rastreável": {
    en: "Traceable",
    es: "Trazable",
  },
  "Cada recomendação aponta para a sua evidência e regra.": {
    en: "Each recommendation points to its evidence and rule.",
    es: "Cada recomendación apunta a su evidencia y regla.",
  },
  "Os especialistas validam cada intervenção com impacto humano.": {
    en: "Specialists validate every intervention with human impact.",
    es: "Los especialistas validan cada intervención con impacto humano.",
  },
  "Ao enviar, reconhece que tratamos os seus dados para responder ao seu pedido, conforme a": {
    en: "By submitting, you acknowledge that we process your data to respond to your request, as described in our",
    es: "Al enviar, reconoce que tratamos sus datos para responder a su solicitud, conforme a la",
  },
  "Ao enviar, reconhece que tratamos os seus dados para responder ao seu pedido, conforme a Política de Privacidade.": {
    en: "By submitting, you acknowledge that we process your data to respond to your request, as described in our Privacy Policy.",
    es: "Al enviar, reconoce que tratamos sus datos para responder a su solicitud, conforme a la Política de Privacidad.",
  },

  // --- NOVAS ATUALIZAÇÕES DA HOME (A, B, C, D, E, F, G, H) ---
  "Vamos conversar": {
    en: "Let's Talk",
    es: "Hablemos",
  },
  "Inteligência de risco humano para a mobilidade global.": {
    en: "Human Risk Intelligence for Global Mobility.",
    es: "Inteligencia de riesgo humano para la movilidad global.",
  },
  "Proteger as pessoas, o desempenho e o seu investimento em mobilidade.": {
    en: "Protecting People. Performance. And Your Mobility Investment.",
    es: "Proteger a las personas, el rendimiento y su inversión en movilidad.",
  },
  "A MOOVIA combina avaliação estruturada de risco, monitorização contínua e uma visão de produto assente em inteligência artificial para ajudar as organizações a identificar os desafios humanos, culturais e familiares que podem comprometer as missões internacionais, antes de afetarem o desempenho, a retenção e a continuidade do negócio.": {
    en: "MOOVIA combines structured risk assessment, ongoing monitoring and an AI-powered product vision to help organisations identify the human, cultural and family challenges that can compromise international assignments, before they impact performance, retention and business continuity.",
    es: "MOOVIA combina evaluación estructurada del riesgo, monitorización continua y una visión de producto basada en inteligencia artificial para ayudar a las organizaciones a identificar los desafíos humanos, culturales y familiares que pueden comprometer las misiones internacionales, antes de que afecten al rendimiento, la retención y la continuidad del negocio.",
  },
  "GLOBAL MOBILITY ASSURANCE | AI-POWERED": {
    en: "GLOBAL MOBILITY ASSURANCE | AI-POWERED",
    es: "GLOBAL MOBILITY ASSURANCE | AI-POWERED",
  },
  "Descubra como a MOOVIA funciona": {
    en: "Discover How MOOVIA Works",
    es: "Descubra cómo funciona MOOVIA",
  },
  "Dos riscos humanos à inteligência de negócio.": {
    en: "From Human Risks to Business Intelligence.",
    es: "De los riesgos humanos a la inteligencia de negocio.",
  },
  "A MOOVIA transforma informação humana, familiar e contextual em inteligência de risco acionável, ajudando as organizações a antecipar problemas, decidir com informação e proteger os resultados das missões.": {
    en: "MOOVIA transforms human, family and contextual insights into actionable risk intelligence, helping organisations anticipate problems, make informed decisions and protect assignment outcomes.",
    es: "MOOVIA transforma información humana, familiar y contextual en inteligencia de riesgo accionable, ayudando a las organizaciones a anticipar problemas, decidir con información y proteger los resultados de las misiones.",
  },
  "Dos sinais humanos à ação preventiva": {
    en: "From Human Insights to Preventive Action",
    es: "De la información humana a la acción preventiva",
  },
  "Compreender os riscos humanos antes de se tornarem riscos de negócio.": {
    en: "Understand the human risks before they become business risks.",
    es: "Comprender los riesgos humanos antes de que se conviertan en riesgos de negocio.",
  },
  "Avaliamos os fatores humanos, familiares e organizacionais que influenciam o sucesso de uma missão internacional.": {
    en: "We assess the human, family and organisational factors that influence the success of an international assignment.",
    es: "Evaluamos los factores humanos, familiares y organizativos que influyen en el éxito de una misión internacional.",
  },
  "Preparação do colaborador e da família": {
    en: "Employee and family readiness",
    es: "Preparación del colaborador y de la familia",
  },
  "Adaptação cultural e pessoal": {
    en: "Cultural and personal adaptation",
    es: "Adaptación cultural y personal",
  },
  "Apoio organizacional": {
    en: "Organisational support",
    es: "Apoyo organizacional",
  },
  "Ligar e interpretar": {
    en: "Connect and Interpret",
    es: "Conectar e interpretar",
  },
  "Transformar dados humanos em inteligência de risco acionável.": {
    en: "Turn human data into actionable risk intelligence.",
    es: "Convertir datos humanos en inteligencia de riesgo accionable.",
  },
  "A nossa metodologia estruturada e o motor de decisão ligam indicadores de risco, identificam preocupações emergentes e apoiam recomendações lideradas por especialistas.": {
    en: "Our structured methodology and decision engine connect risk indicators, identify emerging concerns and support expert-led recommendations.",
    es: "Nuestra metodología estructurada y el motor de decisión conectan indicadores de riesgo, identifican preocupaciones emergentes y apoyan recomendaciones dirigidas por especialistas.",
  },
  "Indicadores de risco estruturados": {
    en: "Structured risk indicators",
    es: "Indicadores de riesgo estructurados",
  },
  "Inteligência de decisão": {
    en: "Decision intelligence",
    es: "Inteligencia de decisión",
  },
  "Interpretação especializada": {
    en: "Expert interpretation",
    es: "Interpretación especializada",
  },
  "Agir e acompanhar": {
    en: "Act and Monitor",
    es: "Actuar y monitorizar",
  },
  "Antecipar problemas. Orientar decisões. Proteger resultados.": {
    en: "Anticipate problems. Guide decisions. Protect outcomes.",
    es: "Anticipar problemas. Orientar decisiones. Proteger resultados.",
  },
  "Apoiamos ações preventivas e acompanhamos a adaptação ao longo do tempo, ajudando as organizações a gerir riscos antes de estes se agravarem.": {
    en: "We support preventive actions and monitor adaptation over time, helping organisations manage risks before they escalate.",
    es: "Apoyamos acciones preventivas y monitorizamos la adaptación a lo largo del tiempo, ayudando a las organizaciones a gestionar los riesgos antes de que se agraven.",
  },
  "Recomendações personalizadas": {
    en: "Personalised recommendations",
    es: "Recomendaciones personalizadas",
  },
  "Indicadores de risco ao nível da empresa": {
    en: "Company-level risk insights",
    es: "Indicadores de riesgo a nivel de empresa",
  },
  "Acompanhamento contínuo": {
    en: "Ongoing monitoring",
    es: "Seguimiento continuo",
  },
  "Transformar inteligência de risco humano em resultados de negócio.": {
    en: "Turning Human Risk Intelligence into Business Outcomes.",
    es: "Transformar la inteligencia de riesgo humano en resultados de negocio.",
  },
  "Retenção e continuidade": {
    en: "Retention and Continuity",
    es: "Retención y continuidad",
  },
  "Identificar cedo riscos de adaptação emergentes para reduzir regressos antecipados e desligamento.": {
    en: "Identify emerging adaptation risks early to reduce early returns and disengagement.",
    es: "Identificar pronto riesgos de adaptación emergentes para reducir regresos anticipados y desvinculación.",
  },
  "Integração do colaborador e da família": {
    en: "Employee and Family Integration",
    es: "Integración del colaborador y la familia",
  },
  "Tratar os desafios pessoais, culturais e familiares que moldam o envolvimento e o sucesso da missão.": {
    en: "Address the personal, cultural and family challenges that shape engagement and assignment success.",
    es: "Atender los desafíos personales, culturales y familiares que condicionan el compromiso y el éxito de la misión.",
  },
  "Decisões informadas pelo risco": {
    en: "Risk-Informed Decisions",
    es: "Decisiones basadas en el riesgo",
  },
  "Dar às equipas de Recursos Humanos e de Global Mobility indicadores de risco claros e prioridades de intervenção.": {
    en: "Give Human Resources and Global Mobility teams clear risk indicators and intervention priorities.",
    es: "Dar a los equipos de Recursos Humanos y Global Mobility indicadores de riesgo claros y prioridades de intervención.",
  },
  "Proteção do investimento": {
    en: "Investment Protection",
    es: "Protección de la inversión",
  },
  "Proteger o investimento em mobilidade gerindo os riscos humanos que afetam a produtividade e a continuidade.": {
    en: "Protect mobility investment by managing the human risks that affect productivity and continuity.",
    es: "Proteger la inversión en movilidad gestionando los riesgos humanos que afectan a la productividad y la continuidad.",
  },
  "O EFEITO EM CASCATA": {
    en: "THE RIPPLE EFFECT",
    es: "EL EFECTO EN CASCADA",
  },
  "2 a 3 vezes o salário base anual": {
    en: "2–3× Annual Base Salary",
    es: "De 2 a 3 veces el salario base anual",
  },
  "Mas o verdadeiro custo de uma missão que falha pode ir muito além do investimento inicial.": {
    en: "But the true cost of failure can extend far beyond the initial investment.",
    es: "Pero el verdadero coste de un fracaso puede ir mucho más allá de la inversión inicial.",
  },
  "A instabilidade familiar ou as dificuldades de adaptação podem desencadear uma reação em cadeia:": {
    en: "Family instability or adaptation difficulties can trigger a chain reaction:",
    es: "La inestabilidad familiar o las dificultades de adaptación pueden desencadenar una reacción en cadena:",
  },
  "Desligamento": {
    en: "Disengagement",
    es: "Desvinculación",
  },
  "Perda de produtividade": {
    en: "Productivity Loss",
    es: "Pérdida de productividad",
  },
  "Regresso antecipado": {
    en: "Early Return",
    es: "Regreso anticipado",
  },
  "Custos de substituição": {
    en: "Replacement Costs",
    es: "Costes de sustitución",
  },
  "Disrupção do negócio": {
    en: "Business Disruption",
    es: "Interrupción del negocio",
  },
  "O que começa como um desafio humano pode tornar-se um risco significativo para o negócio.": {
    en: "What begins as a human challenge can become a significant business risk.",
    es: "Lo que empieza como un desafío humano puede convertirse en un riesgo significativo para el negocio.",
  },
  "A MOOVIA ajuda a identificar os sinais de alerta cedo, antes de desafios geríveis se transformarem em consequências de negócio dispendiosas.": {
    en: "MOOVIA helps identify the warning signs early, before manageable challenges escalate into costly business consequences.",
    es: "MOOVIA ayuda a identificar las señales de alerta a tiempo, antes de que desafíos manejables se conviertan en consecuencias costosas para el negocio.",
  },
  "Quem apoiamos": {
    en: "Who We Support",
    es: "A quién apoyamos",
  },
  "Uma abordagem integrada. Valor para organizações, colaboradores e famílias.": {
    en: "One integrated approach. Value for organisations, employees and families.",
    es: "Un enfoque integrado. Valor para organizaciones, colaboradores y familias.",
  },
  "Proteja o seu investimento em mobilidade e a continuidade do negócio.": {
    en: "Protect your mobility investment and business continuity.",
    es: "Proteja su inversión en movilidad y la continuidad del negocio.",
  },
  "Ganhe visibilidade sobre os riscos humanos e familiares, priorize ações preventivas e tome decisões mais informadas para proteger o desempenho dos colaboradores, a retenção e o sucesso das missões.": {
    en: "Gain visibility into human and family-related risks, prioritise preventive actions and make better-informed decisions to protect employee performance, retention and assignment success.",
    es: "Obtenga visibilidad sobre los riesgos humanos y familiares, priorice acciones preventivas y tome decisiones mejor informadas para proteger el rendimiento de los colaboradores, la retención y el éxito de las misiones.",
  },
  "Para executivos e famílias": {
    en: "For Executives & Their Families",
    es: "Para ejecutivos y familias",
  },
  "Uma transição internacional mais confiante e apoiada.": {
    en: "A more confident and supported international transition.",
    es: "Una transición internacional más segura y acompañada.",
  },
  "Compreenda os desafios de adaptação, receba orientação personalizada e aceda a apoio confidencial para lidar com as mudanças culturais, pessoais e familiares ao longo de todo o percurso internacional.": {
    en: "Understand adaptation challenges, receive personalised guidance and access confidential support to navigate cultural, personal and family changes throughout the international journey.",
    es: "Comprenda los desafíos de adaptación, reciba orientación personalizada y acceda a apoyo confidencial para afrontar los cambios culturales, personales y familiares a lo largo de todo el recorrido internacional.",
  },
  "Proteja as suas pessoas. Proteja o seu investimento.": {
    en: "Protect Your People. Protect Your Investment.",
    es: "Proteja a sus personas. Proteja su inversión.",
  },
  "Descubra como a MOOVIA ajuda a sua organização a identificar cedo os riscos de mobilidade, a proteger o desempenho dos colaboradores e a evitar interrupções de missão dispendiosas.": {
    en: "Discover how MOOVIA helps your organisation identify mobility risks early, protect employee performance and prevent costly assignment disruptions.",
    es: "Descubra cómo MOOVIA ayuda a su organización a identificar pronto los riesgos de movilidad, proteger el rendimiento de los colaboradores y evitar interrupciones de misión costosas.",
  },
  "Vamos ver como podemos reforçar a sua estratégia de mobilidade global.": {
    en: "Let's explore how we can strengthen your global mobility strategy.",
    es: "Veamos cómo podemos reforzar su estrategia de movilidad global.",
  },

  // ---------- COOKIES ----------
  "Política de Cookies": {
    en: "Cookie Policy",
    es: "Política de Cookies",
  },
  "Transparência e Privacidade": {
    en: "Transparency and Privacy",
    es: "Transparencia y Privacidad",
  },
  "Em caso de divergência, prevalece a versão portuguesa.": {
    en: "In case of discrepancy, the Portuguese version prevails.",
    es: "En caso de divergencia, prevalece la versión en portugués.",
  },
  "Última atualização: ": {
    en: "Last updated: ",
    es: "Última actualización: ",
  },
  "1. O que são cookies": {
    en: "1. What cookies are",
    es: "1. Qué son las cookies",
  },
  "Cookies são pequenos ficheiros guardados no seu dispositivo quando visita um site. Usamos o termo também para tecnologias semelhantes, como o armazenamento local do navegador.": {
    en: "Cookies are small files saved on your device when you visit a website. We also use the term for similar technologies, such as browser local storage.",
    es: "Las cookies son pequeños archivos guardados en su dispositivo cuando visita un sitio web. Utilizamos el término también para tecnologías similares, como el almacenamiento local del navegador.",
  },
  "2. Quem é o responsável": {
    en: "2. Who is responsible",
    es: "2. Quién es el responsable",
  },
  "O responsável é ": {
    en: "The controller is ",
    es: "El responsable es ",
  },
  "Para qualquer questão, escreva para ": {
    en: "For any questions, write to ",
    es: "Para cualquier cuestión, escriba a ",
  },
  "O tratamento de dados pessoais está descrito na ": {
    en: "The processing of personal data is described in the ",
    es: "El tratamiento de datos personales está descrito en la ",
  },
  "3. Que cookies e armazenamento usamos": {
    en: "3. What cookies and storage we use",
    es: "3. Qué cookies y almacenamiento usamos",
  },
  "A lista seguinte descreve o que o site guarda no seu dispositivo.": {
    en: "The following list describes what the website saves on your device.",
    es: "La siguiente lista describe lo que el sitio web guarda en su dispositivo.",
  },
  "4. Cookies essenciais": {
    en: "4. Essential cookies",
    es: "4. Cookies esenciales",
  },
  "Os cookies essenciais são necessários ao funcionamento do site e à sua segurança. Não exigem o seu consentimento.": {
    en: "Essential cookies are necessary for the website to function and for its security. They do not require your consent.",
    es: "Las cookies esenciales son necesarias para el funcionamiento del sitio web y su seguridad. No requieren su consentimiento.",
  },
  "5. Cookies não essenciais": {
    en: "5. Non-essential cookies",
    es: "5. Cookies no esenciales",
  },
  "Os cookies de preferências, de medição e outros não essenciais só são ativados com o seu consentimento, que pode dar ou retirar a qualquer momento.": {
    en: "Preferences, measurement and other non-essential cookies are only activated with your consent, which you can give or withdraw at any time.",
    es: "Las cookies de preferencias, de medición y otras no esenciales solo se activan con su consentimiento, que puede dar o retirar en cualquier momento.",
  },
  "6. Serviços de terceiros": {
    en: "6. Third-party services",
    es: "6. Servicios de terceros",
  },
  "Alguns elementos do site, como o assistente de conversa MAIA, podem guardar ou ler informação no seu dispositivo.": {
    en: "Some elements of the website, such as the MAIA conversational assistant, may save or read information on your device.",
    es: "Algunos elementos del sitio web, como el asistente de conversación MAIA, pueden guardar o leer información en su dispositivo.",
  },
  "7. Como gerir": {
    en: "7. How to manage",
    es: "7. Cómo gestionar",
  },
  "Pode apagar ou bloquear cookies nas definições do seu navegador. Bloquear os essenciais pode afetar o funcionamento do site. Pode alterar a sua escolha a qualquer momento em «Gerir preferências de cookies», no rodapé.": {
    en: "You can delete or block cookies in your browser settings. Blocking essential ones may affect how the website works. You can change your choice at any time under «Manage preferences» in the footer.",
    es: "Puede eliminar o bloquear cookies en la configuración de su navegador. Bloquear las esenciales puede afectar al funcionamiento del sitio web. Puede cambiar su elección en cualquier momento en «Gestionar preferencias», en el pie de página.",
  },
  "8. Duração": {
    en: "8. Duration",
    es: "8. Duración",
  },
  "A duração de cada item consta da tabela do ponto 3.": {
    en: "The duration of each item is listed in the table in section 3.",
    es: "La duración de cada elemento figura en la tabla del punto 3.",
  },
  "9. Os seus direitos": {
    en: "9. Your rights",
    es: "9. Sus derechos",
  },
  "Os seus direitos sobre dados pessoais estão na ": {
    en: "Your rights regarding personal data are set out in the ",
    es: "Sus derechos sobre los datos personales se encuentran en la ",
  },
  "Política de Privacidade, secção 9": {
    en: "Privacy Policy, section 9",
    es: "Política de Privacidad, sección 9",
  },
  "10. Alterações": {
    en: "10. Changes",
    es: "10. Modificaciones",
  },
  "Publicamos qualquer alteração nesta página, com a data da última atualização.": {
    en: "We publish any changes on this page, along with the date of the last update.",
    es: "Publicamos cualquier modificación en esta página, con la fecha de la última actualización.",
  },
  "Usamos cookies não essenciais apenas com o seu consentimento. Pode alterar a sua escolha a qualquer momento.": {
    en: "We use non-essential cookies only with your consent. You can change your choice at any time.",
    es: "Usamos cookies no esenciales solo con su consentimiento. Puede cambiar su elección en cualquier momento.",
  },
  "Gerir preferências de cookies": {
    en: "Manage cookie preferences",
    es: "Gestionar preferencias de cookies",
  },

  // ---------- PRINCIPLES SYMBOL (/sobre) ----------
  "Compreensão humana": {
    en: "Human understanding",
    es: "Comprensión humana",
  },
  "Inteligência estruturada": {
    en: "Structured intelligence",
    es: "Inteligencia estructurada",
  },
  "Partilha responsável de informação": {
    en: "Responsible information-sharing",
    es: "Intercambio responsable de información",
  },
  "Onde os três se encontram": {
    en: "Where the three meet",
    es: "Donde los tres se encuentran",
  },
  "Três princípios que se encontram no centro: compreensão humana, inteligência estruturada e partilha responsável de informação": {
    en: "Three principles that meet at the center: human understanding, structured intelligence, and responsible information-sharing",
    es: "Tres principios que se encuentran en el centro: comprensión humana, inteligencia estructurada e intercambio responsable de información",
  },
};

export function translate(text: string, lang: "en" | "es"): string | undefined {
  // Curated dictionary wins; the auto-generated one (DeepL + native-fluency
  // review, regenerated by scripts/extract-i18n.py) covers everything else.
  const manual = DICT[text]?.[lang];
  if (manual) return manual;
  if (lang === "en") return DICT_AUTO[text]?.en;
  return undefined;
}
