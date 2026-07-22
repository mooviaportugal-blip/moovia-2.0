// Source-text dictionary. Keys are the exact PT-PT strings as they appear in
// the rendered DOM. Values are native translations. Add new entries as the
// site grows, the auto-translator walks text nodes and swaps any match.

import type { Locale } from "./translations";

type Phrase = Partial<Record<Locale, string>>;

// key = source string (PT-PT). pt-PT is the source, no entry needed.
export const PHRASES: Record<string, Phrase> = {
  // Nav
  "Como funciona": { "pt-BR": "Como funciona", es: "Cómo funciona", en: "How it works" },
  "Serviços": { "pt-BR": "Serviços", es: "Servicios", en: "Services" },
  "Assessment": { "pt-BR": "Avaliação Estratégica", es: "Evaluación Estratégica", en: "Strategic Assessment" },
  "Blog": { "pt-BR": "Blog", es: "Blog", en: "Journal" },
  "Contacto": { "pt-BR": "Contacto", es: "Contacto", en: "Contact" },
  "Avaliar o meu caso": { "pt-BR": "Avaliar meu caso", es: "Evaluar mi caso", en: "Assess my case" },
  "Idioma": { "pt-BR": "Idioma", es: "Idioma", en: "Language" },

  // Hero / common
  "Coordenação de transição internacional. Brasil para Portugal.": {
    "pt-BR": "Coordenação de transição internacional. Brasil para Portugal.",
    es: "Coordinación de transición internacional. Brasil a Portugal.",
    en: "International transition coordination. Brazil to Portugal.",
  },
  "Do diagnóstico ao destino.": {
    "pt-BR": "Do diagnóstico ao destino.", es: "Del diagnóstico al destino.", en: "From diagnosis to destination.",
  },
  "Role para descobrir": { "pt-BR": "Role para descobrir", es: "Desliza para descubrir", en: "Scroll to discover" },
  "Desça para descobrir": { "pt-BR": "Role para descobrir", es: "Desliza para descubrir", en: "Scroll to discover" },
  "Saber mais": { "pt-BR": "Saiba mais", es: "Saber más", en: "Learn more" },
  "Saiba mais": { "pt-BR": "Saiba mais", es: "Saber más", en: "Learn more" },
  "Começar agora": { "pt-BR": "Começar agora", es: "Empezar ahora", en: "Get started" },
  "Avaliar meu caso": { "pt-BR": "Avaliar meu caso", es: "Evaluar mi caso", en: "Assess my case" },

  // Sections
  "Como trabalhamos": { "pt-BR": "Como trabalhamos", es: "Cómo trabajamos", en: "How we work" },
  "A posição da marca": { "pt-BR": "A posição da marca", es: "La posición de la marca", en: "Brand positioning" },
  "Antes de coordenar": { "pt-BR": "Antes de coordenar", es: "Antes de coordinar", en: "Before coordinating" },
  "Antes de coordenar transições internacionais, vivemos as nossas.": {
    "pt-BR": "Antes de coordenar transições internacionais, vivemos as nossas.",
    es: "Antes de coordinar transiciones internacionales, vivimos las nuestras.",
    en: "Before coordinating international transitions, we lived our own.",
  },
  "A equipa que coordena a sua jornada.": {
    "pt-BR": "A equipa que coordena a sua jornada.",
    es: "El equipo que coordina su trayecto.",
    en: "The team coordinating your journey.",
  },
  "As pessoas que conduzem cada mandato.": {
    "pt-BR": "As pessoas que conduzem cada mandato.",
    es: "Las personas que conducen cada mandato.",
    en: "The people leading every mandate.",
  },
  "Chegar é metade": { "pt-BR": "Chegar é metade", es: "Llegar es la mitad", en: "Arriving is half" },
  "Erros que custam": { "pt-BR": "Erros que custam", es: "Errores que cuestan", en: "Costly mistakes" },
  "Decisões simultâneas": { "pt-BR": "Decisões simultâneas", es: "Decisiones simultáneas", en: "Simultaneous decisions" },
  "A conversa certa.": { "pt-BR": "A conversa certa.", es: "La conversación correcta.", en: "The right conversation." },
  "Conversa Gratuita": { "pt-BR": "Conversa Gratuita", es: "Conversación gratuita", en: "Free consultation" },
  "Conversa direta com 1 founder": {
    "pt-BR": "Conversa direta com 1 founder", es: "Conversación direta con el fundador", en: "Direct chat with 1 founder",
  },
  "Diretamente com 1 founder": {
    "pt-BR": "Diretamente com 1 founder", es: "Diretamente con el fundador", en: "Direct with 1 founder",
  },
  "Conversa com um dos Fundadores (cta)": {
    "pt-BR": "Conversa com um dos Fundadores", es: "Conversación con un fundador", en: "Conversation with a founder",
  },
  "Confidencial": { "pt-BR": "Confidencial", es: "Confidencial", en: "Confidential" },
  "Concierge completo": { "pt-BR": "Concierge completo", es: "Conserjería completa", en: "Full concierge" },
  "Coordenação completa": { "pt-BR": "Coordenação completa", es: "Coordinación completa", en: "Full coordination" },
  "Entendemos o seu contexto": {
    "pt-BR": "Entendemos o seu contexto", es: "Entendemos su contexto", en: "We understand your context",
  },
  "Acompanhamos um número limitado": {
    "pt-BR": "Acompanhamos um número limitado", es: "Acompañamos un número limitado", en: "We take on a limited number",
  },
  "Adaptação estruturada": { "pt-BR": "Adaptação estruturada", es: "Adaptación estructurada", en: "Structured adaptation" },
  "Conteúdo estratégico": { "pt-BR": "Conteúdo estratégico", es: "Contenido estratégico", en: "Strategic content" },

  // Home marquee / problem
  "Transição Internacional": { "pt-BR": "Transição Internacional", es: "Transición internacional", en: "International transition" },
  "Brasil para Portugal": { "pt-BR": "Brasil para Portugal", es: "Brasil a Portugal", en: "Brazil to Portugal" },
  "Coordenação de Vida e Património": { "pt-BR": "Coordenação de Vida e Patrimônio", es: "Coordinación de vida y patrimonio", en: "Life and wealth coordination" },
  "Mandato Personalizado": { "pt-BR": "Mandato Personalizado", es: "Mandato personalizado", en: "Bespoke mandate" },
  "90 dias Pós-chegada": { "pt-BR": "90 dias Pós-chegada", es: "90 días posllegada", en: "90 days post-arrival" },
  "Fiscalidade Internacional": { "pt-BR": "Fiscalidade Internacional", es: "Fiscalidad internacional", en: "International tax" },
  "O mercado resolve tarefas": { "pt-BR": "O mercado resolve tarefas", es: "El mercado resuelve tareas", en: "The market handles tasks" },
  "O problema não é a burocracia. É que ninguém coordena o todo.": {
    "pt-BR": "O problema não é a burocracia. É que ninguém coordena o todo.",
    es: "El problema no es la burocracia. Es que nadie coordina el conjunto.",
    en: "The problem isn't bureaucracy. It's that no one coordinates the whole picture.",
  },
  "Você tem um advogado para o visto, um corretor para o imóvel, uma escola para os filhos, um contador para o NIF. Cada um no seu quadrado. E você no meio tentando fazer tudo encaixar numa das decisões mais complexas da sua vida.": {
    "pt-BR": "Você tem um advogado para o visto, um corretor para o imóvel, uma escola para os filhos, um contador para o NIF. Cada um no seu quadrado. E você no meio tentando fazer tudo encaixar numa das decisões mais complexas da sua vida.",
    es: "Tiene un abogado para el visado, un agente para la vivienda, una escuela para los hijos y un contable para el NIF. Cada uno en su parcela. Y usted en medio intentando encajar todo en una de las decisiones más complejas de su vida.",
    en: "You have a lawyer for the visa, an agent for the home, a school for the children and an accountant for the NIF. Each one in their own lane. And you in the middle, trying to make everything fit into one of the most complex decisions of your life.",
  },
  "O tempo não é o maior problema. É tomar dez decisões simultâneas sem ter feito nenhuma delas antes.": {
    "pt-BR": "O tempo não é o maior problema. É tomar dez decisões simultâneas sem ter feito nenhuma delas antes.",
    es: "El tiempo no es el mayor problema. Es tomar diez decisiones simultáneas sin haber tomado ninguna de ellas antes.",
    en: "Time is not the biggest problem. It is making ten simultaneous decisions without having made any of them before.",
  },
  "Volume de informação": { "pt-BR": "Volume de informação", es: "Volumen de información", en: "Information overload" },
  "Grupos de WhatsApp, YouTube, advogados e corretores dizem coisas diferentes. O volume de informação não resolve a decisão, cria mais dúvida.": {
    "pt-BR": "Grupos de WhatsApp, YouTube, advogados e corretores dizem coisas diferentes. O volume de informação não resolve a decisão, cria mais dúvida.",
    es: "Grupos de WhatsApp, YouTube, abogados y agentes dicen cosas distintas. El volumen de información no resuelve la decisión; genera más dudas.",
    en: "WhatsApp groups, YouTube, lawyers and agents all say different things. More information does not resolve the decision; it creates more doubt.",
  },
  "Riscos invisíveis": { "pt-BR": "Riscos invisíveis", es: "Riesgos invisibles", en: "Invisible risks" },
  "Apartamento no bairro errado. Escola sem vaga. Uma rotina mal estruturada para a família. Cada erro custa dinheiro, tempo e energia que a família não tem.": {
    "pt-BR": "Apartamento no bairro errado. Escola sem vaga. Uma rotina mal estruturada para a família. Cada erro custa dinheiro, tempo e energia que a família não tem.",
    es: "Un piso en el barrio equivocado. Una escuela sin plazas. Una rutina familiar mal estructurada. Cada error cuesta dinero, tiempo y energía que la familia no tiene.",
    en: "An apartment in the wrong neighbourhood. A school with no places. A poorly structured routine for the family. Every mistake costs money, time and energy the family does not have.",
  },
  "A adaptação humana é o fator crítico de sucesso na mobilidade internacional. O acompanhamento real reduz riscos de retenção e garante a continuidade do talento.": {
    "pt-BR": "A adaptação humana é o fator crítico de sucesso na mobilidade internacional. O acompanhamento real reduz riscos de retenção e garante a continuidade do talento.",
    es: "La adaptación humana es el factor crítico de éxito en la movilidad internacional. El acompañamiento real reduce riesgos de retención y garantiza la continuidad del talento.",
    en: "Human adaptation is the critical success factor in international mobility. Real support reduces retention risks and ensures talent continuity.",
  },
  "O mercado resolve tarefas. A MOOVIA assegura o sucesso da mobilidade corporativa.": {
    "pt-BR": "O mercado resolve tarefas. A MOOVIA assegura o sucesso da mobilidade corporativa.",
    es: "El mercado resuelve tareas. MOOVIA asegura el éxito de la movilidad corporativa.",
    en: "The market handles tasks. MOOVIA ensures corporate mobility success.",
  },

  // Founders / team
  "Os fundadores são o produto": { "pt-BR": "Os fundadores são o produto", es: "Los fundadores son el producto", en: "The founders are the product" },
  "Background de Deloitte, Oracle e SAP. Cada sócio passou pelo processo que coordenamos. Essa experiência não é marketing: é o único diferencial que nenhum concorrente consegue replicar.": {
    "pt-BR": "Background de Deloitte, Oracle e SAP. Cada sócio passou pelo processo que coordenamos. Essa experiência não é marketing: é o único diferencial que nenhum concorrente consegue replicar.",
    es: "Trayectoria en Deloitte, Oracle y SAP. Cada socio pasó por el proceso que coordinamos. Esa experiencia no es marketing: es el único diferencial que ningún competidor puede replicar.",
    en: "Backgrounds at Deloitte, Oracle and SAP. Every partner has gone through the process we coordinate. That experience is not marketing, it is the one differentiator no competitor can replicate.",
  },
  "Vamos coordenar a sua transição internacional com o mesmo nível de cuidado, estrutura e atenção que gostaríamos de ter recebido na nossa.": {
    "pt-BR": "Vamos coordenar a sua transição internacional com o mesmo nível de cuidado, estrutura e atenção que gostaríamos de ter recebido na nossa.",
    es: "Coordinaremos su transición internacional con el mismo nivel de cuidado, estructura y atención que nos habría gustado recibir en la nuestra.",
    en: "We will coordinate your international transition with the same level of care, structure and attention we would have wanted for our own.",
  },
  "Com trajetória internacional iniciada aos 17 anos, lidera as áreas financeira e tecnológica da MOOVIA. Mestrando em Engenharia Mecânica no Instituto Superior Técnico, assegura que cada mandato seja estruturado com eficiência, previsibilidade e visão de longo prazo.": {
    "pt-BR": "Com trajetória internacional iniciada aos 17 anos, lidera as áreas financeira e tecnológica da MOOVIA. Mestrando em Engenharia Mecânica no Instituto Superior Técnico, assegura que cada mandato seja estruturado com eficiência, previsibilidade e visão de longo prazo.",
    es: "Con una trayectoria internacional iniciada a los 17 años, lidera las áreas financiera y tecnológica de MOOVIA. Estudiante de máster en Ingeniería Mecánica en el Instituto Superior Técnico, garantiza que cada mandato se estructure con eficiencia, previsibilidad y visión de largo plazo.",
    en: "With an international path that began at 17, he leads MOOVIA's finance and technology areas. A Master's candidate in Mechanical Engineering at Instituto Superior Técnico, he ensures every mandate is structured with efficiency, predictability and long-term vision.",
  },
  "Estruturamos cada mandato com a precisão de engenharia e a previsibilidade financeira que uma decisão desta dimensão exige.": {
    "pt-BR": "Estruturamos cada mandato com a precisão de engenharia e a previsibilidade financeira que uma decisão desta dimensão exige.",
    es: "Estructuramos cada mandato con la precisión de la ingeniería y la previsibilidad financiera que exige una decisión de esta dimensión.",
    en: "We structure every mandate with the engineering precision and financial predictability that a decision of this scale requires.",
  },
  "Equipa": { "pt-BR": "Equipa", es: "Equipo", en: "Team" },
  "Cada membro da MOOVIA foi escolhido pela profundidade da experiência, não pelo tamanho do currículo. São as pessoas certas para as decisões que importam.": {
    "pt-BR": "Cada membro da MOOVIA foi escolhido pela profundidade da experiência, não pelo tamanho do currículo. São as pessoas certas para as decisões que importam.",
    es: "Cada miembro de MOOVIA fue elegido por la profundidad de su experiencia, no por el tamaño de su currículum. Son las personas adecuadas para las decisiones que importan.",
    en: "Each MOOVIA team member was chosen for the depth of their experience, not the length of their résumé. They are the right people for the decisions that matter.",
  },
  "Advogado na Abreu Advogados em Corporate e M&A. Pós-graduações CIDP em Corporate Finance e M&A. O braço jurídico da MOOVIA no ecossistema português.": {
    "pt-BR": "Advogado na Abreu Advogados em Corporate e M&A. Pós-graduações CIDP em Corporate Finance e M&A. O braço jurídico da MOOVIA no ecossistema português.",
    es: "Abogado en Abreu Advogados en Corporate y M&A. Posgrados CIDP en Corporate Finance y M&A. El brazo jurídico de MOOVIA en el ecosistema portugués.",
    en: "Lawyer at Abreu Advogados in Corporate and M&A. CIDP postgraduate studies in Corporate Finance and M&A. MOOVIA's legal arm within the Portuguese ecosystem.",
  },
  "25+ anos em tecnologia corporativa nas maiores empresas do setor, com especialização na indústria seguradora. Liderou equipas de alta performance e operações C-Level globais.": {
    "pt-BR": "25+ anos em tecnologia corporativa nas maiores empresas do setor, com especialização na indústria seguradora. Liderou equipes de alta performance e operações C-Level globais.",
    es: "Más de 25 años en tecnología corporativa en las mayores empresas del sector, con especialización en la industria aseguradora. Lideró equipos de alto rendimiento y operaciones C-Level globales.",
    en: "25+ years in enterprise technology at leading companies, with specialisation in the insurance industry. He has led high-performance teams and global C-level operations.",
  },
  "VP Global Sales na ADLS. Professor de MBA, palestrante internacional e investidor imobiliário em Santa Catarina. Fluente em PT, EN e ES.": {
    "pt-BR": "VP Global Sales na ADLS. Professor de MBA, palestrante internacional e investidor imobiliário em Santa Catarina. Fluente em PT, EN e ES.",
    es: "VP Global Sales en ADLS. Profesor de MBA, ponente internacional e inversor inmobiliario en Santa Catarina. Fluido en PT, EN y ES.",
    en: "Global Sales VP at ADLS. MBA lecturer, international speaker and real estate investor in Santa Catarina. Fluent in PT, EN and ES.",
  },
  "18 anos como Chief Legal Officer da CID Records. Especialista no acompanhamento de estudantes e famílias em transição para Portugal.": {
    "pt-BR": "18 anos como Chief Legal Officer da CID Records. Especialista no acompanhamento de estudantes e famílias em transição para Portugal.",
    es: "18 años como Chief Legal Officer de CID Records. Especialista en acompañar a estudiantes y familias en transición hacia Portugal.",
    en: "18 years as Chief Legal Officer at CID Records. Specialist in supporting students and families transitioning to Portugal.",
  },
  "Mestre em Direito pela ULisboa, com Erasmus em Itália e República Tcheca. Especialista em imigração, nacionalidade e regularização documental.": {
    "pt-BR": "Mestre em Direito pela ULisboa, com Erasmus em Itália e República Tcheca. Especialista em imigração, nacionalidade e regularização documental.",
    es: "Máster en Derecho por ULisboa, con Erasmus en Italia y República Checa. Especialista en inmigración, nacionalidad y regularización documental.",
    en: "Master's in Law from ULisboa, with Erasmus in Italy and the Czech Republic. Specialist in immigration, nationality and document regularisation.",
  },
  "Mais de 10 anos no mercado imobiliário português. Especialista RE/MAX Collection. Habitação a partir de €1.500/mês.": {
    "pt-BR": "Mais de 10 anos no mercado imobiliário português. Especialista RE/MAX Collection. Habitação a partir de €1.500/mês.",
    es: "Más de 10 años en el mercado inmobiliario portugués. Especialista RE/MAX Collection. Vivienda desde 1.500 €/mes.",
    en: "More than 10 years in the Portuguese real estate market. RE/MAX Collection specialist. Housing from €1,500/month.",
  },

  // Process / assessment / pillars
  "Um processo que vai do diagnóstico ao destino.": { "pt-BR": "Um processo que vai do diagnóstico ao destino.", es: "Un proceso del diagnóstico al destino.", en: "One process from diagnosis to destination." },
  "Conversa com um dos Fundadores": { "pt-BR": "Conversa com um dos Fundadores", es: "Sin coste · Calendly", en: "No cost · Calendly" },
  "Uma conversa direta com 1 founder, sem script, sem chatbot. Validamos o fit e mostramos como a MOOVIA pensa o seu caso.": {
    "pt-BR": "Uma conversa direta com 1 founder, sem script, sem chatbot. Validamos o fit e mostramos como a MOOVIA pensa o seu caso.",
    es: "Una conversación direta con el fundador, sin guion, sin chatbot. Validamos el encaje y mostramos cómo MOOVIA piensa su caso.",
    en: "A direct conversation with 1 founder, no script, no chatbot. We validate fit and show how MOOVIA thinks through your case.",
  },
  "Conversa com um dos Fundadores (agenda)": { "pt-BR": "Conversa com um dos Fundadores", es: "Conversación con un fundador", en: "Conversation with a founder" },
  "Diagnóstico": { "pt-BR": "Diagnóstico", es: "Diagnóstico", en: "Diagnosis" },
  "O primeiro trabalho real": { "pt-BR": "O primeiro trabalho real", es: "El primer trabajo real", en: "The first real piece of work" },
  "60 minutos com entregável físico. Mapeamento completo de perfil, riscos, estratégias e cronograma. Não é consulta: é diagnóstico.": {
    "pt-BR": "60 minutos com entregável físico. Mapeamento completo de perfil, riscos, estratégias e cronograma. Não é consulta: é diagnóstico.",
    es: "60 minutos con entregable físico. Mapeo completo de perfil, riesgos, estrategias y cronograma. No es una consulta: es un diagnóstico.",
    en: "60 minutes with a physical deliverable. Full mapping of profile, risks, strategies and timeline. It is not a consultation: it is a diagnosis.",
  },
  "Entregável físico": { "pt-BR": "Entregável físico", es: "Entregable físico", en: "Physical deliverable" },
  "Sob medida": { "pt-BR": "Sob medida", es: "A medida", en: "Bespoke" },
  "Do visto ao apartamento, da escola ao banco. Um único ponto de responsabilidade para a decisão mais importante da sua família.": {
    "pt-BR": "Do visto ao apartamento, da escola ao banco. Um único ponto de responsabilidade para a decisão mais importante da sua família.",
    es: "Del visado al piso, de la escuela al banco. Un único punto de responsabilidad para la decisión más importante de su familia.",
    en: "From visa to apartment, from school to bank. One single point of accountability for your family's most important decision.",
  },
  "Mandato completo": { "pt-BR": "Mandato completo", es: "Mandato completo", en: "Full mandate" },
  "Único no mercado": { "pt-BR": "Único no mercado", es: "Único en el mercado", en: "Unique in the market" },
  "Os 90 dias após o pouso são os mais críticos. Adaptação familiar, rotina, integração. Nenhum concorrente acompanha este período de forma estruturada.": {
    "pt-BR": "Os 90 dias após o pouso são os mais críticos. Adaptação familiar, rotina, integração. Nenhum concorrente acompanha este período de forma estruturada.",
    es: "Los 90 días posteriores al aterrizaje son los más críticos. Adaptación familiar, rutina, integración. Ningún competidor acompaña este período de forma estructurada.",
    en: "The 90 days after landing are the most critical. Family adaptation, routine, integration. No competitor supports this period in a structured way.",
  },
  "Pós-chegada": { "pt-BR": "Pós-chegada", es: "Posllegada", en: "Post-arrival" },
  "O diagnóstico que organiza o que você não sabia que precisava organizar.": {
    "pt-BR": "O diagnóstico que organiza o que você não sabia que precisava organizar.",
    es: "El diagnóstico que organiza lo que no sabía que necesitaba organizar.",
    en: "The diagnosis that organises what you didn't know you needed to organise.",
  },
  "Não é uma consulta. É o primeiro trabalho estratégico da MOOVIA, com entregável físico, que mapeia tudo o que precisa ser decidido antes de comprar a passagem.": {
    "pt-BR": "Não é uma consulta. É o primeiro trabalho estratégico da MOOVIA, com entregável físico, que mapeia tudo o que precisa ser decidido antes de comprar a passagem.",
    es: "No es una consulta. Es el primer trabajo estratégico de MOOVIA, con entregable físico, que mapea todo lo que debe decidirse antes de comprar el billete.",
    en: "It is not a consultation. It is MOOVIA's first strategic piece of work, with a physical deliverable, mapping everything that needs to be decided before booking the flight.",
  },
  "A maioria das pessoas chega a Portugal sem ter respondido as perguntas certas. Nós construímos o mapa antes da viagem.": {
    "pt-BR": "A maioria das pessoas chega a Portugal sem ter respondido as perguntas certas. Nós construímos o mapa antes da viagem.",
    es: "La mayoría de las personas llega a Portugal sin haber respondido las preguntas correctas. Nosotros construimos el mapa antes del viaje.",
    en: "Most people arrive in Portugal without having answered the right questions. We build the map before the journey.",
  },
  "60 minutos estruturados": { "pt-BR": "60 minutos estruturados", es: "60 minutos estructurados", en: "60 structured minutes" },
  "Entregável físico que você leva": { "pt-BR": "Entregável físico que você leva", es: "Entregable físico que se lleva", en: "Physical deliverable to take away" },
  "€250 abatidos no mandato": { "pt-BR": "€250 abatidos no mandato", es: "250 € descontados del mandato", en: "€250 deducted from the mandate" },
  "60 minutos · Entregável físico": { "pt-BR": "60 minutos · Entregável físico", es: "60 minutos · Entregable físico", en: "60 minutes · Physical deliverable" },
  "Mapa de decisão personalizado": { "pt-BR": "Mapa de decisão personalizado", es: "Mapa de decisión personalizado", en: "Personalised decision map" },
  "Estratégia de habitação": { "pt-BR": "Estratégia de habitação", es: "Estrategia de vivienda", en: "Housing strategy" },
  "Estratégia documental e migratória": { "pt-BR": "Estratégia documental e migratória", es: "Estrategia documental y migratoria", en: "Document and migration strategy" },
  "Estratégia familiar e escolar": { "pt-BR": "Estratégia familiar e escolar", es: "Estrategia familiar y escolar", en: "Family and school strategy" },
  "Estrutura fiscal inicial": { "pt-BR": "Estrutura fiscal inicial", es: "Estructura fiscal inicial", en: "Initial tax structure" },
  "Plano de próximos passos com cronograma": { "pt-BR": "Plano de próximos passos com cronograma", es: "Plan de próximos pasos con cronograma", en: "Next-step plan with timeline" },
  "Entregável físico: documento que você leva": { "pt-BR": "Entregável físico: documento que você leva", es: "Entregable físico: documento que se lleva", en: "Physical deliverable: a document to take away" },
  "Solicitar Assessment": { "pt-BR": "Solicitar Avaliação Estratégica", es: "Solicitar Evaluación Estratégica", en: "Request Strategic Assessment" },
  "Quatro pilares": { "pt-BR": "Quatro pilares", es: "Cuatro pilares", en: "Four pillars" },
  "Uma jornada completa.": { "pt-BR": "Uma jornada completa.", es: "Una jornada completa.", en: "A complete journey." },
  "Não resolvemos tarefas isoladas. Coordenamos a jornada inteira, do planejamento à estruturação da vida em Portugal.": {
    "pt-BR": "Não resolvemos tarefas isoladas. Coordenamos a jornada inteira, do planejamento à estruturação da vida em Portugal.",
    es: "No resolvemos tareas aisladas. Coordinamos todo el trayecto, desde la planificación hasta la estructuración de la vida en Portugal.",
    en: "We do not solve isolated tasks. We coordinate the entire journey, from planning to structuring life in Portugal.",
  },
  "Planejamos": { "pt-BR": "Planejamos", es: "Planificamos", en: "We plan" },
  "Instalamos": { "pt-BR": "Instalamos", es: "Instalamos", en: "We settle" },
  "Integramos": { "pt-BR": "Integramos", es: "Integramos", en: "We integrate" },
  "Estruturamos": { "pt-BR": "Estruturamos", es: "Estructuramos", en: "We structure" },
  "Tomar as decisões certas antes de mudar.": { "pt-BR": "Tomar as decisões certas antes de mudar.", es: "Tomar las decisiones correctas antes de mudarse.", en: "Making the right decisions before moving." },
  "Tudo que precisa para chegar e ficar legalmente instalado.": { "pt-BR": "Tudo que precisa para chegar e ficar legalmente instalado.", es: "Todo lo necesario para llegar y quedar legalmente instalado.", en: "Everything needed to arrive and be legally settled." },
  "Transformando uma mudança numa transição de vida.": { "pt-BR": "Transformando uma mudança numa transição de vida.", es: "Transformar una mudanza en una transición de vida.", en: "Turning a move into a life transition." },
  "Para quem quer estruturar a vida financeira em Portugal.": { "pt-BR": "Para quem quer estruturar a vida financeira em Portugal.", es: "Para quien quiere estructurar su vida financiera en Portugal.", en: "For those who want to structure their financial life in Portugal." },
  "serviços": { "pt-BR": "serviços", es: "servicios", en: "services" },
  "Resultado:": { "pt-BR": "Resultado:", es: "Resultado:", en: "Result:" },
  "Plano Estratégico de Transição Internacional": { "pt-BR": "Plano Estratégico de Transição Internacional", es: "Plan estratégico de transición internacional", en: "Strategic international transition plan" },
  "Família legalmente instalada e operando": { "pt-BR": "Família legalmente instalada e operando", es: "Familia legalmente instalada y operativa", en: "Family legally settled and operational" },
  "Uma mudança que vira transição de vida": { "pt-BR": "Uma mudança que vira transição de vida", es: "Una mudanza que se convierte en transición de vida", en: "A move that becomes a life transition" },
  "Vida financeira estruturada e em conformidade": { "pt-BR": "Vida financeira estruturada e em conformidade", es: "Vida financiera estructurada y en conformidad", en: "Financial life structured and compliant" },

  // Gallery / manifesto / blog / FAQ / footer
  "Uma vida em Portugal, vista por dentro.": { "pt-BR": "Uma vida em Portugal, vista por dentro.", es: "Una vida en Portugal, vista desde dentro.", en: "A life in Portugal, seen from the inside." },
  "Acompanhamos um número limitado de mandatos em simultâneo.": {
    "pt-BR": "Acompanhamos um número limitado de mandatos em simultâneo.",
    es: "Acompañamos un número limitado de mandatos simultáneamente.",
    en: "We support a limited number of mandates at the same time.",
  },
  "Não por limitação operacional, porque acreditamos que decisões desta importância exigem acompanhamento próximo, coordenação ativa e atenção individual. Para preservar este nível, aceitamos apenas o número de novos mandatos que conseguimos coordenar com a qualidade que a decisão exige.": {
    "pt-BR": "Não por limitação operacional, porque acreditamos que decisões desta importância exigem acompanhamento próximo, coordenação ativa e atenção individual. Para preservar este nível, aceitamos apenas o número de novos mandatos que conseguimos coordenar com a qualidade que a decisão exige.",
    es: "No por limitación operativa, sino porque creemos que decisiones de esta importancia exigen acompañamiento cercano, coordinación activa y atención individual. Para preservar este nivel, aceptamos solo el número de nuevos mandatos que podemos coordinar con la calidad que la decisión exige.",
    en: "Not because of operational limitation, but because we believe decisions of this importance require close support, active coordination and individual attention. To preserve this level, we accept only the number of new mandates we can coordinate with the quality the decision requires.",
  },
  "Se o seu caso merece isso, este é o lugar.": { "pt-BR": "Se o seu caso merece isso, este é o lugar.", es: "Si su caso merece eso, este es el lugar.", en: "If your case deserves this, this is the place." },
  "Atendemos famílias internacionais em todas as suas formas.": { "pt-BR": "Atendemos famílias internacionais em todas as suas formas.", es: "Atendemos a familias internacionales en todas sus formas.", en: "We serve international families in all their forms." },
  "O que você precisa entender antes de decidir.": { "pt-BR": "O que você precisa entender antes de decidir.", es: "Lo que necesita entender antes de decidir.", en: "What you need to understand before deciding." },
  "Artigos escritos pela equipa da MOOVIA sobre os temas que mais impactam a jornada de transição internacional.": {
    "pt-BR": "Artigos escritos pela equipa da MOOVIA sobre os temas que mais impactam a jornada de transição internacional.",
    es: "Artículos escritos por el equipo de MOOVIA sobre los temas que más impactan el trayecto de transición internacional.",
    en: "Articles written by the MOOVIA team on the themes that most affect the international transition journey.",
  },
  "Visto": { "pt-BR": "Visto", es: "Visado", en: "Visa" },
  "Fiscalidade": { "pt-BR": "Fiscalidade", es: "Fiscalidad", en: "Tax" },
  "Habitação": { "pt-BR": "Habitação", es: "Vivienda", en: "Housing" },
  "Visto D3, D2 ou D7: qual é o certo para o seu perfil?": { "pt-BR": "Visto D3, D2 ou D7: qual é o certo para o seu perfil?", es: "Visado D3, D2 o D7: ¿cuál es el adecuado para su perfil?", en: "D3, D2 or D7 visa: which is right for your profile?" },
  "A escolha do visto define o cronograma inteiro da sua mudança. Entender a diferença antes de contratar qualquer advogado é o primeiro passo para não perder tempo e dinheiro.": {
    "pt-BR": "A escolha do visto define o cronograma inteiro da sua mudança. Entender a diferença antes de contratar qualquer advogado é o primeiro passo para não perder tempo e dinheiro.",
    es: "La elección del visado define todo el cronograma de su mudanza. Entender la diferencia antes de contratar a cualquier abogado es el primer paso para no perder tiempo y dinero.",
    en: "The visa choice defines the entire timeline of your move. Understanding the difference before hiring any lawyer is the first step to avoiding wasted time and money.",
  },
  "Como funciona a tributação para brasileiros em Portugal em 2026": { "pt-BR": "Como funciona a tributação para brasileiros em Portugal em 2026", es: "Cómo funciona la tributación para brasileños en Portugal en 2026", en: "How taxation works for Brazilians in Portugal in 2026" },
  "O RNH acabou. O IFICI chegou. O que muda para quem pretende se mudar em 2026 e como estruturar a chegada para pagar menos imposto legalmente.": {
    "pt-BR": "O RNH acabou. O IFICI chegou. O que muda para quem pretende se mudar em 2026 e como estruturar a chegada para pagar menos imposto legalmente.",
    es: "El RNH terminó. El IFICI llegó. Qué cambia para quienes pretenden mudarse en 2026 y cómo estructurar la llegada para pagar menos impuestos legalmente.",
    en: "RNH has ended. IFICI has arrived. What changes for those planning to move in 2026, and how to structure arrival to legally pay less tax.",
  },
  "Quanto custa morar em Lisboa em 2026: bairro por bairro": { "pt-BR": "Quanto custa morar em Lisboa em 2026: bairro por bairro", es: "Cuánto cuesta vivir en Lisboa en 2026: barrio por barrio", en: "How much it costs to live in Lisbon in 2026: neighbourhood by neighbourhood" },
  "Os preços mudaram. Parque das Nações, Cascais, Almada: onde fica o melhor custo-benefício para quem chega com família.": {
    "pt-BR": "Os preços mudaram. Parque das Nações, Cascais, Almada: onde fica o melhor custo-benefício para quem chega com família.",
    es: "Los precios cambiaron. Parque das Nações, Cascais, Almada: dónde está la mejor relación coste-beneficio para quien llega con familia.",
    en: "Prices have changed. Parque das Nações, Cascais, Almada: where the best value lies for families arriving in Portugal.",
  },
  "Ver todos os artigos": { "pt-BR": "Ver todos os artigos", es: "Ver todos los artículos", en: "View all articles" },
  "Perguntas frequentes": { "pt-BR": "Perguntas frequentes", es: "Preguntas frecuentes", en: "Frequently asked questions" },
  "O que as pessoas perguntam antes de decidir.": { "pt-BR": "O que as pessoas perguntam antes de decidir.", es: "Lo que las personas preguntan antes de decidir.", en: "What people ask before deciding." },
  "O que exatamente a MOOVIA Portugal faz?": { "pt-BR": "O que exatamente a MOOVIA Portugal faz?", es: "¿Qué hace exactamente MOOVIA Portugal?", en: "What exactly does MOOVIA Portugal do?" },
  "O que é o Strategic Assessment de €250?": { "pt-BR": "O que é a Avaliação Estratégica de €250?", es: "¿Qué es la Evaluación Estratégica de 250 €?", en: "What is the €250 Strategic Assessment?" },
  "Qual a diferença entre a MOOVIA e uma empresa de imigração?": { "pt-BR": "Qual a diferença entre a MOOVIA e uma empresa de imigração?", es: "¿Cuál es la diferencia entre MOOVIA y una empresa de inmigración?", en: "What is the difference between MOOVIA and an immigration company?" },
  "A MOOVIA trabalha com pacotes ou planos de serviço?": { "pt-BR": "A MOOVIA trabalha com pacotes ou planos de serviço?", es: "¿MOOVIA trabaja con paquetes o planes de servicio?", en: "Does MOOVIA work with packages or service plans?" },
  "Quanto tempo leva o processo de transição?": { "pt-BR": "Quanto tempo leva o processo de transição?", es: "¿Cuánto tarda el proceso de transición?", en: "How long does the transition process take?" },
  "Quanto custa a transição completa com a MOOVIA?": { "pt-BR": "Quanto custa a transição completa com a MOOVIA?", es: "¿Cuánto cuesta la transición completa con MOOVIA?", en: "How much does the full transition with MOOVIA cost?" },
  "A MOOVIA atende apenas brasileiros?": { "pt-BR": "A MOOVIA atende apenas brasileiros?", es: "¿MOOVIA atiende solo a brasileños?", en: "Does MOOVIA only serve Brazilians?" },

  "O primeiro passo": { "pt-BR": "O primeiro passo", es: "El primer paso", en: "The first step" },
  "Não é um formulário de contacto. É o início de um diagnóstico. Quanto mais você nos contar, mais preciso será o nosso retorno.": {
    "pt-BR": "Não é um formulário de contacto. É o início de um diagnóstico. Quanto mais você nos contar, mais preciso será o nosso retorno.",
    es: "No es un formulario de contacto. Es el inicio de un diagnóstico. Cuanto más nos cuente, más precisa será nuestra respuesta.",
    en: "It is not a contact form. It is the start of a diagnosis. The more you tell us, the more precise our response will be.",
  },
  "Cada contacto é respondido pessoalmente por um founder, sem chatbot, sem script.": {
    "pt-BR": "Cada contacto é respondido pessoalmente por um founder, sem chatbot, sem script.",
    es: "Cada contacto es respondido personalmente por un founder, sin chatbot, sin guion.",
    en: "Every enquiry is answered personally by a founder, with no chatbot and no script.",
  },
  "Resposta no horário comercial": { "pt-BR": "Resposta no horário comercial", es: "Respuesta en horario comercial", en: "Reply during business hours" },
  "Sem pitch, sem script": { "pt-BR": "Sem pitch, sem script", es: "Sin pitch, sin guion", en: "No pitch, no script" },
  "Qual o seu objetivo principal?": { "pt-BR": "Qual o seu objetivo principal?", es: "¿Cuál es su objetivo principal?", en: "What is your main objective?" },
  "Trabalhar em Portugal": { "pt-BR": "Trabalhar em Portugal", es: "Trabajar en Portugal", en: "Work in Portugal" },
  "Estudar em Portugal": { "pt-BR": "Estudar em Portugal", es: "Estudiar en Portugal", en: "Study in Portugal" },
  "Mudar com a família": { "pt-BR": "Mudar com a família", es: "Mudarse con la familia", en: "Move with family" },
  "Investir em imóveis": { "pt-BR": "Investir em imóveis", es: "Invertir en inmuebles", en: "Invest in property" },
  "Reforma em Portugal": { "pt-BR": "Reforma em Portugal", es: "Jubilación en Portugal", en: "Retirement in Portugal" },
  "Outro": { "pt-BR": "Outro", es: "Otro", en: "Other" },
  "Quando pretende mudar?": { "pt-BR": "Quando pretende mudar?", es: "¿Cuándo pretende mudarse?", en: "When do you intend to move?" },
  "Menos de 3 meses (urgente)": { "pt-BR": "Menos de 3 meses (urgente)", es: "Menos de 3 meses (urgente)", en: "Less than 3 months (urgent)" },
  "3 a 6 meses": { "pt-BR": "3 a 6 meses", es: "3 a 6 meses", en: "3 to 6 months" },
  "6 a 12 meses": { "pt-BR": "6 a 12 meses", es: "6 a 12 meses", en: "6 to 12 months" },
  "Mais de 1 ano": { "pt-BR": "Mais de 1 ano", es: "Más de 1 año", en: "More than 1 year" },
  "Quantas pessoas participam da mudança?": { "pt-BR": "Quantas pessoas participam da mudança?", es: "¿Cuántas personas participan en la mudanza?", en: "How many people are part of the move?" },
  "Casal": { "pt-BR": "Casal", es: "Pareja", en: "Couple" },
  "Projeto individual": { "pt-BR": "Projeto individual", es: "Proyecto individual", en: "Individual project" },
  "Comparando Portugal com outras opções": { "pt-BR": "Comparando Portugal com outras opções", es: "Comparando Portugal con otras opciones", en: "Comparing Portugal with other options" },
  "Já decidi Portugal, planejando quando": { "pt-BR": "Já decidi Portugal, planejando quando", es: "Ya elegí Portugal, planificando cuándo", en: "I have chosen Portugal and am planning when" },
  "Tomei a decisão, preciso agir": { "pt-BR": "Tomei a decisão, preciso agir", es: "Ya tomé la decisión, necesito actuar", en: "I have made the decision and need to act" },
  "Já tenho proposta/contrato assinado": { "pt-BR": "Já tenho proposta/contrato assinado", es: "Ya tengo propuesta/contrato firmado", en: "I already have an offer/contract signed" },
  "Seu nome completo": { "pt-BR": "Seu nome completo", es: "Su nombre completo", en: "Your full name" },
  "WhatsApp com código do país, ex: +351 912 345 678": { "pt-BR": "WhatsApp com código do país, ex: +351 912 345 678", es: "WhatsApp con código de país, ej.: +351 912 345 678", en: "WhatsApp with country code, e.g. +351 912 345 678" },
  "Conte brevemente o seu caso (opcional)": { "pt-BR": "Conte brevemente o seu caso (opcional)", es: "Cuente brevemente su caso (opcional)", en: "Briefly describe your case (optional)" },
  "Já decidiu? →": { "pt-BR": "Já decidiu? →", es: "¿Ya decidió? →", en: "Already decided? →" },
  "Marcar Conversa Gratuita diretamente": { "pt-BR": "Marcar Conversa Gratuita diretamente", es: "Agendar una conversación gratuita diretamente", en: "Book a free consultation directly" },
  "Coordenação Internacional de Vida e Património. Brasil → Portugal": {
    "pt-BR": "Coordenação Internacional de Vida e Patrimônio. Brasil → Portugal",
    es: "Coordinación internacional de vida y patrimonio. Brasil → Portugal",
    en: "International coordination of life and wealth. Brazil → Portugal",
  },
  "Privacidade": { "pt-BR": "Privacidade", es: "Privacidad", en: "Privacy" },
  "Todos os direitos reservados": { "pt-BR": "Todos os direitos reservados", es: "Todos los derechos reservados", en: "All rights reserved" },

  // Form
  "Enviar e aguardar retorno": {
    "pt-BR": "Enviar e aguardar retorno", es: "Enviar y esperar respuesta", en: "Send and await reply",
  },
  "Enviando...": { "pt-BR": "Enviando...", es: "Enviando...", en: "Sending..." },
  "Enviado com sucesso!": { "pt-BR": "Enviado com sucesso!", es: "¡Enviado con éxito!", en: "Sent successfully!" },
  "Conte brevemente o seu caso": {
    "pt-BR": "Conte brevemente o seu caso", es: "Cuente brevemente su caso", en: "Briefly describe your case",
  },
  "Em que fase da decisão está?": {
    "pt-BR": "Em que fase da decisão está?", es: "¿En qué fase de la decisión está?", en: "Where are you in the decision?",
  },
  "Apenas eu": { "pt-BR": "Apenas eu", es: "Solo yo", en: "Just me" },
  "Família com filhos": { "pt-BR": "Família com filhos", es: "Familia con hijos", en: "Family with children" },
  "Família com filhos e pets": {
    "pt-BR": "Família com filhos e pets", es: "Familia con hijos y mascotas", en: "Family with kids and pets",
  },
  "Ainda estou pesquisando": { "pt-BR": "Ainda estou pesquisando", es: "Aún estoy investigando", en: "Still researching" },
  "Apenas pesquisando": { "pt-BR": "Apenas pesquisando", es: "Solo investigando", en: "Just exploring" },
  "E-mail inválido.": { "pt-BR": "E-mail inválido.", es: "Correo inválido.", en: "Invalid email." },
  "Escreva sua mensagem...": {
    "pt-BR": "Escreva sua mensagem...", es: "Escribe tu mensaje...", en: "Type your message...",
  },
  "Assistente": { "pt-BR": "Assistente", es: "Asistente", en: "Assistant" },

  // Founders / generic role labels
  "Co-Founder": { "pt-BR": "Co-Founder", es: "Cofundador", en: "Co-Founder" },
  "Conselheiro Estratégico": {
    "pt-BR": "Conselheiro Estratégico", es: "Asesor Estratégico", en: "Strategic Advisor",
  },
  "Family Transition Advisor": {
    "pt-BR": "Family Transition Advisor", es: "Asesora de Transición Familiar", en: "Family Transition Advisor",
  },

  // Footer / contact
  "Contacto MOOVIA Portugal": {
    "pt-BR": "Contacto MOOVIA Portugal", es: "Contacto MOOVIA Portugal", en: "Contact MOOVIA Portugal",
  },

  // Hero
  "Coordenação Internacional de Vida e Património": {
    "pt-BR": "Coordenação Internacional de Vida e Patrimônio",
    es: "Coordinación Internacional de Vida y Patrimonio",
    en: "International Coordination of Life & Wealth",
  },
  "Você não precisa": { "pt-BR": "Você não precisa", es: "No necesita", en: "You don't need" },
  "de mais informação.": { "pt-BR": "de mais informação.", es: "más información.", en: "more information." },
  "Precisa de alguém": { "pt-BR": "Precisa de alguém", es: "Necesita a alguien", en: "You need someone" },
  "que coordene": { "pt-BR": "que coordene", es: "que coordine", en: "who coordinates" },
  "a decisão.": { "pt-BR": "a decisão.", es: "la decisión.", en: "the decision." },
  "Você não precisa de mais informação. Precisa de alguém que coordene a decisão.": {
    "pt-BR": "Você não precisa de mais informação. Precisa de alguém que coordene a decisão.",
    es: "No necesita más información. Necesita a alguien que coordine la decisión.",
    en: "You don't need more information. You need someone who coordinates the decision.",
  },
  "A MOOVIA Portugal não resolve tarefas isoladas. Coordenação completa, do primeiro diagnóstico à integração.": {
    "pt-BR": "A MOOVIA Portugal não resolve tarefas isoladas. Coordenação completa, do primeiro diagnóstico à integração.",
    es: "MOOVIA Portugal no resuelve tareas aisladas. Coordinación completa, desde el primer diagnóstico hasta la integración.",
    en: "MOOVIA Portugal doesn't handle isolated tasks. End-to-end coordination, from the first diagnosis to integration.",
  },
  "Ver como funciona": { "pt-BR": "Ver como funciona", es: "Ver cómo funciona", en: "See how it works" },
  "Planejar · Chegar · Ficar": {
    "pt-BR": "Planejar · Chegar · Ficar", es: "Planejar · Llegar · Quedarse", en: "Plan · Arrive · Stay",
  },
  "Lisboa · Cascais · Estoril, 38.7223° N": {
    "pt-BR": "Lisboa · Cascais · Estoril, 38.7223° N",
    es: "Lisboa · Cascais · Estoril, 38.7223° N",
    en: "Lisbon · Cascais · Estoril, 38.7223° N",
  },
  "Capítulo 01": { "pt-BR": "Capítulo 01", es: "Capítulo 01", en: "Chapter 01" },
  "Mandato de transição": { "pt-BR": "Mandato de transição", es: "Mandato de transición", en: "Transition mandate" },

  // CTA section / contact
  "Conversa Gratuita de 20 minutos": {
    "pt-BR": "Conversa Gratuita de 20 minutos",
    es: "Conversación gratuita de 20 minutos",
    en: "Free 20-minute consultation",
  },
  "Fale com a MOOVIA": { "pt-BR": "Fale com a MOOVIA", es: "Hable con MOOVIA", en: "Talk to MOOVIA" },
  "Enviar mensagem": { "pt-BR": "Enviar mensagem", es: "Enviar mensaje", en: "Send message" },
  "Nome completo": { "pt-BR": "Nome completo", es: "Nombre completo", en: "Full name" },
  "E-mail": { "pt-BR": "E-mail", es: "Correo electrónico", en: "Email" },
  "Telefone": { "pt-BR": "Telefone", es: "Teléfono", en: "Phone" },
  "Mensagem": { "pt-BR": "Mensagem", es: "Mensaje", en: "Message" },

  // Footer
  "Todos os direitos reservados.": {
    "pt-BR": "Todos os direitos reservados.",
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
  "Política de privacidade": {
    "pt-BR": "Política de privacidade", es: "Política de privacidad", en: "Privacy policy",
  },
  "Termos": { "pt-BR": "Termos", es: "Términos", en: "Terms" },
};

