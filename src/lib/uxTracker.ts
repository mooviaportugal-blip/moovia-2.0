import { supabase } from "@/integrations/supabase/client";

type EventType = "pageview" | "click" | "scroll" | "session_start" | "session_end";

interface UxEvent {
  session_id: string;
  event_type: EventType;
  page_path?: string;
  x_pct?: number;
  y_pct?: number;
  scroll_depth?: number;
  viewport_w?: number;
  viewport_h?: number;
  device?: string;
  referrer?: string;
  user_agent?: string;
  meta?: any;
}

const SESSION_KEY = "moovia_ux_session";
let queue: UxEvent[] = [];
let flushTimer: number | null = null;
let started = false;
let maxScroll = 0;
const reportedDepths = new Set<number>();

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

function track(ev: Omit<UxEvent, "session_id" | "viewport_w" | "viewport_h" | "device" | "user_agent">) {
  if (typeof window === "undefined") return;
  queue.push({
    session_id: getSessionId(),
    viewport_w: window.innerWidth,
    viewport_h: window.innerHeight,
    device: getDevice(),
    user_agent: navigator.userAgent.slice(0, 500),
    page_path: ev.page_path ?? window.location.pathname,
    ...ev,
  });
  scheduleFlush();
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = window.setTimeout(flush, 4000);
}

async function flush() {
  flushTimer = null;
  if (!queue.length) return;
  const batch = queue;
  queue = [];
  try {
    await supabase.from("ux_events").insert(batch);
  } catch {
    // Silent fail – analytics shouldn't break UX
  }
}

export function startUxTracker() {
  if (started || typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;
  started = true;

  track({ event_type: "session_start", referrer: document.referrer.slice(0, 500) });
  track({ event_type: "pageview" });

  const onClick = (e: MouseEvent) => {
    track({
      event_type: "click",
      x_pct: Number(((e.clientX / window.innerWidth) * 100).toFixed(2)),
      y_pct: Number((((e.clientY + window.scrollY) / Math.max(document.documentElement.scrollHeight, 1)) * 100).toFixed(2)),
    });
  };

  const onScroll = () => {
    const h = document.documentElement;
    const depth = Math.min(
      100,
      Math.round(((window.scrollY + window.innerHeight) / Math.max(h.scrollHeight, 1)) * 100)
    );
    if (depth > maxScroll) maxScroll = depth;
    [25, 50, 75, 90, 100].forEach((d) => {
      if (maxScroll >= d && !reportedDepths.has(d)) {
        reportedDepths.add(d);
        track({ event_type: "scroll", scroll_depth: d });
      }
    });
  };

  const onUnload = () => {
    queue.push({
      session_id: getSessionId(),
      event_type: "session_end",
      page_path: window.location.pathname,
      scroll_depth: maxScroll,
      device: getDevice(),
    });
    try {
      const blob = new Blob([JSON.stringify(queue)], { type: "application/json" });
      navigator.sendBeacon?.("/api/public/ux-beacon", blob);
    } catch {}
    flush();
  };

  window.addEventListener("click", onClick, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("beforeunload", onUnload);
}
