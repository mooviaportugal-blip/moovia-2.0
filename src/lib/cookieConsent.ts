export interface CookieConsentState {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
}

const STORAGE_KEY = "moovia_cookie_consent";

export function getCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: { analytics: boolean; preferences: boolean }): CookieConsentState {
  const state: CookieConsentState = {
    essential: true,
    analytics: consent.analytics,
    preferences: consent.preferences,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: state }));
    } catch {}
  }

  return state;
}

export function isAnalyticsAllowed(): boolean {
  const consent = getCookieConsent();
  return consent !== null && consent.analytics === true;
}

export function isPreferencesAllowed(): boolean {
  const consent = getCookieConsent();
  return consent !== null && consent.preferences === true;
}

export function openCookiePreferencesModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open_cookie_preferences"));
  }
}
