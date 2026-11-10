// Translation dictionaries, written by native-quality manual translation.
// No external API. Add keys here as the app needs them.

export type Locale = "pt-BR" | "pt-PT" | "es" | "en";

export const LOCALES: { code: Locale; label: string; native: string; country: "BR" | "PT" | "ES" | "GB" }[] = [
  { code: "pt-BR", label: "Portuguese (Brazil)", native: "Português · BR", country: "BR" },
  { code: "pt-PT", label: "Portuguese (Portugal)", native: "Português · PT", country: "PT" },
  { code: "es", label: "Spanish", native: "Español", country: "ES" },
  { code: "en", label: "English (UK)", native: "English", country: "GB" },
];

type Dict = Record<string, string>;

const ptBR: Dict = {
  "nav.how_it_works": "Como funciona",
  "nav.services": "Serviços",
  "nav.assessment": "Avaliação Estratégica",
  "nav.blog": "Insights",
  "nav.contact": "Contacto",
  "nav.cta": "Vamos conversar",
  "nav.language": "Idioma",
  "common.gma": "Global Mobility Assurance",
  "common.cta_talk": "Vamos conversar",
  "common.learn_more": "Saiba mais",
  "common.show_less": "Mostrar menos",
  "common.start": "Começar agora",
  "common.scroll": "Role para descobrir",
};

const ptPT: Dict = {
  "nav.how_it_works": "Como funciona",
  "nav.services": "Serviços",
  "nav.assessment": "Avaliação Estratégica",
  "nav.blog": "Insights",
  "nav.contact": "Contacto",
  "nav.cta": "Vamos conversar",
  "nav.language": "Idioma",
  "common.gma": "Global Mobility Assurance",
  "common.cta_talk": "Vamos conversar",
  "common.learn_more": "Saiba mais",
  "common.show_less": "Mostrar menos",
  "common.start": "Começar agora",
  "common.scroll": "Desça para descobrir",
};

const es: Dict = {
  "nav.how_it_works": "Cómo funciona",
  "nav.services": "Servicios",
  "nav.assessment": "Evaluación Estratégica",
  "nav.blog": "Insights",
  "nav.contact": "Contacto",
  "nav.cta": "Hablemos",
  "nav.language": "Idioma",
  "common.gma": "Global Mobility Assurance",
  "common.cta_talk": "Hablemos",
  "common.learn_more": "Saber más",
  "common.show_less": "Mostrar menos",
  "common.start": "Empezar ahora",
  "common.scroll": "Desliza para descubrir",
};

const en: Dict = {
  "nav.how_it_works": "How it works",
  "nav.services": "Services",
  "nav.assessment": "Strategic Assessment",
  "nav.blog": "Insights",
  "nav.contact": "Contact",
  "nav.cta": "Let's Talk",
  "nav.language": "Language",
  "common.gma": "Global Mobility Assurance",
  "common.cta_talk": "Let's Talk",
  "common.learn_more": "Learn more",
  "common.show_less": "Show less",
  "common.start": "Get started",
  "common.scroll": "Scroll to discover",
};

export const TRANSLATIONS: Record<Locale, Dict> = {
  "pt-BR": ptBR,
  "pt-PT": ptPT,
  es,
  en,
};

export const DEFAULT_LOCALE: Locale = "pt-PT";
