/**
 * Constantes jurídicas e operacionais da MOOVIA.
 * Ficheiro único com todas as constantes centralizadas.
 * 
 * Regra de ocultação: qualquer frase, linha ou item que dependa de uma constante vazia
 * não é renderizado. Texto entre chavetas nunca é renderizado.
 */

export const LEGAL_ENTITY_NAME = "";
export const TAX_ID = "";
export const REGISTERED_OFFICE = "";
export const PRIVACY_EMAIL = "";
export const DPO_CONTACT = "";
export const RETENTION_PERIOD = "";
export const PROVIDERS = "";
export const TRANSFERS = "";
export const SUPERVISORY_AUTHORITY = "";
export const LAST_UPDATED = "";

/**
 * Enquanto LEGAL_ENTITY_NAME ou PRIVACY_EMAIL estiverem vazios, as páginas legais
 * ficam com noindex e fora do sitemap. Quando ambos tiverem valor, passam a indexáveis.
 */
export const isLegalConfigured = Boolean(
  LEGAL_ENTITY_NAME.trim() && PRIVACY_EMAIL.trim()
);

