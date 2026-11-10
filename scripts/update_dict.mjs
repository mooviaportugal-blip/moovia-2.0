import fs from 'fs';

let dictContent = fs.readFileSync('src/i18n/dict.ts', 'utf-8');

const additions = {
  // Sobre
  "A MOOVIA é a aplicação desta experiência à proteção do investimento humano.": {
    en: "MOOVIA is the application of this experience to the protection of human investment.",
    es: "MOOVIA es la aplicación de esta experiencia a la protección de la inversión humana."
  },
  "Tornar a mobilidade internacional mais informada, mais solidária e mais responsável perante as pessoas e os resultados do negócio.": {
    en: "Make international mobility more informed, more supportive and more accountable to people and business outcomes",
    es: "Hacer que la movilidad internacional sea más informada, más solidaria y más responsable ante las personas y los resultados empresariales."
  },
  "Carreira Internacional": { en: "International Career", es: "Carrera Internacional" },
  "Décadas de experiência em negócios internacionais, projetos globais e desenvolvimento de mercados em vários continentes.": {
    en: "Decades of experience in international business, global projects, and market development across multiple continents.",
    es: "Décadas de experiencia en negocios internacionales, proyectos globales y desarrollo de mercados en varios continentes."
  },
  "Identificar riscos e perdas ocultos: a disciplina que ensinou a MOOVIA a ver o que os modelos tradicionais de gestão não captam.": {
    en: "Identifying hidden risks and losses: the discipline that taught MOOVIA to see what traditional management models fail to capture.",
    es: "Identificar riesgos y pérdidas ocultos: la disciplina que enseñó a MOOVIA a ver lo que los modelos tradicionales de gestión no captan."
  },
  "Metodologias Próprias": { en: "Proprietary Methodologies", es: "Metodologías Propias" },
  "A combinação de ciência comportamental humana e engenharia de sistemas, transformando o conhecimento especializado num processo estruturado e replicável.": {
    en: "The combination of human behavioural science and systems engineering, transforming specialist knowledge into a structured and replicable process.",
    es: "La combinación de ciencia del comportamiento humano e ingeniería de sistemas, transformando el conocimiento especializado en un proceso estructurado y replicable."
  },
  "Raízes e Asas": { en: "Roots and Wings", es: "Raíces y Alas" },
  "A metodologia que estrutura a dimensão humana do sucesso, traduzindo adaptação, integração e bem-estar em variáveis mensuráveis.": {
    en: "The methodology that structures the human dimension of success, translating adaptation, integration, and well-being into measurable variables.",
    es: "La metodología que estructura la dimensión humana del éxito, traduciendo adaptación, integración y bienestar en variables medibles."
  },
  "Tecnologia": { en: "Technology", es: "Tecnología" },
  "A arquitetura que converte este conhecimento humano em lógica computacional explicável e rastreável, eliminando a ‘caixa negra’.": {
    en: "The architecture that converts this human knowledge into explainable, traceable computational logic, eliminating the ‘black box’.",
    es: "La arquitectura que convierte este conocimiento humano en lógica computacional explicable y trazable, eliminando la ‘caja negra’."
  },
  "Políticas": { en: "Policies", es: "Políticas" },
  "Vistos": { en: "Visas", es: "Visados" },
  "Impostos": { en: "Taxes", es: "Impuestos" },
  "Payroll": { en: "Payroll", es: "Nómina" },
  "Benefícios": { en: "Benefits", es: "Beneficios" },
  "Fornecedores": { en: "Suppliers", es: "Proveedores" },
  "Compliance": { en: "Compliance", es: "Cumplimiento" },
  "Logística da transferência": { en: "Relocation Logistics", es: "Logística de la mudanza" },
  "EXEMPLO DE ENTREGÁVEL PARA EMPRESAS": { en: "EXAMPLE OF DELIVERABLE FOR COMPANIES", es: "EJEMPLO DE ENTREGABLE PARA EMPRESAS" },
  "(Dados agregados e anonimizados)": { en: "(Aggregated and anonymised data)", es: "(Datos agregados y anonimizados)" },
  'Nota: "Estes indicadores são produzidos a partir da metodologia Human Mobility Assurance e não revelam respostas individuais nem informação pessoal identificável."': {
    en: 'Note: "These indicators are produced from the Human Mobility Assurance methodology and do not disclose individual responses or personally identifiable information."',
    es: 'Nota: "Estos indicadores se producen a partir de la metodología Human Mobility Assurance y no revelan respuestas individuales ni información personal identificable."'
  },
  "Avaliações estruturadas, check-ins regulares e apoio personalizado ao longo da missão.": {
    en: "Structured assessments, regular check-ins and personalised support throughout the assignment.",
    es: "Evaluaciones estructuradas, check-ins regulares y apoyo personalizado a lo largo de la misión."
  },
  "~30 dias": { en: "~30 days", es: "~30 días" },
  "~90 dias": { en: "~90 days", es: "~90 días" },
  "~180 dias": { en: "~180 days", es: "~180 días" },
  "T-30 / T0": { en: "T-30 / T0", es: "T-30 / T0" },
  "Contínuo": { en: "Ongoing", es: "Continuo" },

  // Equipa
  "Co-Founder & Legal | Advogado Associado da Abreu": {
    en: "Co-Founder & Legal | Associate Lawyer at Abreu",
    es: "Co-Founder & Legal | Abogado asociado de Abreu"
  },
  "Co-Founder & CSO | Wellness & Integração Familiar": {
    en: "Co-Founder & CSO | Wellness & Family Integration",
    es: "Co-Founder & CSO | Wellness e Integración Familiar"
  },
  "Abrir perfil de Rui Mano": { en: "View Rui Mano’s profile", es: "Ver el perfil de Rui Mano" },
  "Abrir perfil de Frederico Prado": { en: "View Frederico Prado’s profile", es: "Ver el perfil de Frederico Prado" },
  "Abrir perfil de Pablo Alejandro Saco Paim": { en: "View Pablo Alejandro Saco Paim’s profile", es: "Ver el perfil de Pablo Alejandro Saco Paim" },
  "Abrir perfil de João Gabriel Prado": { en: "View João Gabriel Prado’s profile", es: "Ver el perfil de João Gabriel Prado" },
  "Abrir perfil de Dra. Letícia de Mello": { en: "View Dr Letícia de Mello’s profile", es: "Ver el perfil de Dra. Letícia de Mello" },
  "Abrir perfil de Guilherme Souza": { en: "View Guilherme Souza’s profile", es: "Ver el perfil de Guilherme Souza" },
  "Abrir perfil de Sara Russo": { en: "View Sara Russo’s profile", es: "Ver el perfil de Sara Russo" },
  "Abrir perfil de Cristina Sousa": { en: "View Cristina Sousa’s profile", es: "Ver el perfil de Cristina Sousa" },
  "Abrir perfil de Sandra Santos": { en: "View Sandra Santos’s profile", es: "Ver el perfil de Sandra Santos" },
  "Abrir perfil de Dany Zukerman": { en: "View Dany Zukerman’s profile", es: "Ver el perfil de Dany Zukerman" },
  "Abrir perfil de Laura Costa, LL.M.": { en: "View Laura Costa, LL.M.’s profile", es: "Ver el perfil de Laura Costa, LL.M." },

  // Meta Titles & Descriptions for 6 main pages
  "Inteligência para os riscos humanos das missões internacionais": {
    en: "Intelligence for the human risks of international assignments",
    es: "Inteligencia para los riesgos humanos de las misiones internacionales"
  },
  "A MOOVIA ajuda empresas e executivos a identificar e gerir os desafios humanos, culturais e familiares que podem comprometer missões internacionais, antes que se transformem em problemas de desempenho, retenção ou repatriação.": {
    en: "MOOVIA helps companies and executives identify and address the human, cultural and family challenges that can compromise international assignments, before they become performance, retention or repatriation issues.",
    es: "MOOVIA ayuda a empresas y ejecutivos a identificar y abordar los desafíos humanos, culturales y familiares que pueden comprometer las misiones internacionales, antes de que se conviertan en problemas de desempeño, retención o repatriación."
  },
  "Proteja o valor das suas missões internacionais.": {
    en: "Protect the Value of Your International Assignments.",
    es: "Proteja el valor de sus misiones internacionales."
  },
  "A MOOVIA ajuda as empresas a avaliar a adaptação dos colaboradores e das famílias, a identificar riscos emergentes e a agir atempadamente para apoiar o desempenho, a retenção e a continuidade das missões.": {
    en: "MOOVIA helps companies assess employee and family adaptation, identify emerging risks and take timely action to support performance, retention and assignment continuity.",
    es: "MOOVIA ayuda a las empresas a evaluar la adaptación de los empleados y las familias, a identificar riesgos emergentes y a actuar a tiempo para apoyar el rendimiento, la retención y la continuidad de las misiones."
  },
  "Um novo país. Um novo capítulo. Apoio ao longo do caminho.": {
    en: "A new country. A new chapter. Support along the way.",
    es: "Un nuevo país. Un nuevo capítulo. Apoyo en el camino."
  },
  "Uma mudança internacional traz oportunidades profissionais e transformações pessoais. A MOOVIA ajuda-o a si e à sua família a preparar, adaptar e encontrar apoio prático ao longo de toda a transição.": {
    en: "An international move brings professional opportunities and personal change. MOOVIA helps you and your family prepare, adapt and find practical support throughout the transition.",
    es: "Una mudanza internacional trae oportunidades profesionales y transformaciones personales. MOOVIA le ayuda a usted y a su familia a prepararse, adaptarse y encontrar apoyo práctico a lo largo de toda la transición."
  },
  "Levar a disciplina da assurance à mobilidade internacional.": {
    en: "Bringing the discipline of assurance to international mobility.",
    es: "Llevar la disciplina de la assurance a la movilidad internacional."
  },
  "A MOOVIA foi criada para dar à dimensão humana de uma missão internacional a mesma atenção que o investimento financeiro e operacional que lhe está por trás. Combinamos avaliação estruturada, conhecimento especializado e acompanhamento para ajudar colaboradores, famílias e organizações a navegar as transições internacionais.": {
    en: "MOOVIA was created to give the human side of an international assignment the same attention as the financial and operational investment behind it. We combine structured assessment, specialist insight and follow-up to help employees, families and organisations navigate international transitions.",
    es: "MOOVIA se creó para prestar a la dimensión humana de una asignación internacional la misma atención que a la inversión financiera y operativa que hay detrás. Combinamos evaluación estructurada, criterio especializado y seguimiento para ayudar a colaboradores, familias y organizaciones a navegar las transiciones internacionales."
  },
  "Construída sobre décadas de experiência, unida por uma convicção: a dimensão humana da mobilidade internacional merece a mesma proteção que o investimento que está por trás dela.": {
    en: "Built on decades of experience, united by one conviction: the human side of international mobility deserves the same protection as the investment behind it.",
    es: "Construida sobre décadas de experiencia, unida por una convicción: la dimensión humana de la movilidad internacional merece la misma protección que la inversión que hay detrás de ella."
  },
  "A MOOVIA nasceu de uma amizade de décadas e de dois percursos profissionais que se cruzaram no mundo corporativo internacional, passando por Revenue Assurance, grandes consultoras e tecnologia empresarial, a par de experiência direta dos desafios humanos da mobilidade internacional.": {
    en: "MOOVIA was born from a decades-long friendship and two professional journeys that crossed paths in the international corporate world, spanning Revenue Assurance, major consultancies and enterprise technology, alongside firsthand experience of the human challenges of international mobility.",
    es: "MOOVIA nació de una amistad de décadas y de dos trayectorias profesionales que se cruzaron en el mundo corporativo internacional, abarcando Revenue Assurance, grandes consultoras y tecnología empresarial, junto con la experiencia directa de los desafíos humanos de la movilidad internacional."
  },
  "Vamos tornar as missões internacionais mais bem-sucedidas.": {
    en: "Let’s Make International Assignments More Successful.",
    es: "Hagamos que las misiones internacionales sean más exitosas."
  },
  "Descubra como a MOOVIA ajuda a sua empresa a antecipar riscos humanos, apoiar colaboradores e famílias e melhorar os resultados das missões internacionais.": {
    en: "Discover how MOOVIA helps your company anticipate human risks, support employees and their families, and improve international assignment outcomes.",
    es: "Descubra cómo MOOVIA ayuda a su empresa a anticipar riesgos humanos, apoyar a colaboradores y familias y mejorar los resultados de las misiones internacionales."
  }
};

// Also fix typo 'al mesmo tempo' -> 'al mismo tiempo'
dictContent = dictContent.replace(/al mismo tempo/g, 'al mismo tiempo');

// Append entries at the end of DICT object
let newEntriesStr = '\n  // --- AUTO-INJECTED CORRECTIONS ---\n';
for (const [k, v] of Object.entries(additions)) {
  newEntriesStr += '  ' + JSON.stringify(k) + ': ' + JSON.stringify(v, null, 2).replace(/\n/g, '\n  ') + ',\n';
}

const closingIdx = dictContent.lastIndexOf('};');
dictContent = dictContent.slice(0, closingIdx) + newEntriesStr + dictContent.slice(closingIdx);

fs.writeFileSync('src/i18n/dict.ts', dictContent, 'utf-8');
console.log('dict.ts updated successfully!');

