import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Track = {
  id: string;
  title: string;
  cover: string;
  source_type: "mp3" | "youtube";
  source_url: string;
};

const STORAGE_KEY = "moovia_sound_preference";
const FADE_DURATION = 1500;
const TARGET_VOLUME = 0.18;

type Permission = "granted" | "denied" | null;

const isIOS =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1));
const canFade = !isIOS;

let globalState: {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  hasPermission: Permission;
  showModal: boolean;
  buttonEnabled: boolean;
} = {
  tracks: [],
  currentIndex: 0,
  isPlaying: false,
  progress: 0,
  hasPermission: null,
  showModal: false,
  buttonEnabled: true,
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

let audioEl: HTMLAudioElement | null = null;
let ytPlayer: any = null;
let ytContainerId = "moovia-yt-player";
let ytReady = false;
let ytApiLoading = false;
let ytProgressTimer: number | null = null;
let fadeTimer: number | null = null;
let initialized = false;

function clearFade() {
  if (fadeTimer !== null) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
}

function clearYTProgress() {
  if (ytProgressTimer !== null) {
    clearInterval(ytProgressTimer);
    ytProgressTimer = null;
  }
}

function ytIdFrom(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function ensureAudio(): HTMLAudioElement {
  if (audioEl) return audioEl;
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  (audio as any).playsInline = true;
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  audio.volume = canFade ? 0 : TARGET_VOLUME;

  audio.addEventListener("ended", () => nextTrack());
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      globalState = { ...globalState, progress: (audio.currentTime / audio.duration) * 100 };
      notify();
    }
  });
  audioEl = audio;
  return audio;
}

function ensureYTContainer() {
  if (typeof document === "undefined") return;
  if (document.getElementById(ytContainerId)) return;
  const div = document.createElement("div");
  div.id = ytContainerId;
  div.style.position = "fixed";
  div.style.width = "1px";
  div.style.height = "1px";
  div.style.left = "-9999px";
  div.style.top = "-9999px";
  document.body.appendChild(div);
}

async function loadYTApi(): Promise<void> {
  if (ytReady) return;
  if (typeof window === "undefined") return;
  if ((window as any).YT?.Player) {
    ytReady = true;
    return;
  }
  if (!ytApiLoading) {
    ytApiLoading = true;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  }
  await new Promise<void>((resolve) => {
    const check = () => {
      if ((window as any).YT?.Player) {
        ytReady = true;
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

function stopAll() {
  clearFade();
  clearYTProgress();
  if (audioEl) {
    try { audioEl.pause(); } catch {}
  }
  if (ytPlayer) {
    try { ytPlayer.stopVideo(); } catch {}
  }
}

async function playTrack(track: Track) {
  if (track.source_type === "youtube") {
    if (audioEl) { try { audioEl.pause(); } catch {} }
    ensureYTContainer();
    await loadYTApi();
    const YT = (window as any).YT;
    const videoId = ytIdFrom(track.source_url);
    if (!videoId) return;
    if (!ytPlayer) {
      ytPlayer = new YT.Player(ytContainerId, {
        height: "1",
        width: "1",
        videoId,
        playerVars: { autoplay: 1, controls: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(Math.round(TARGET_VOLUME * 100));
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            if (e.data === YT.PlayerState.ENDED) nextTrack();
            if (e.data === YT.PlayerState.PLAYING) {
              globalState = { ...globalState, isPlaying: true };
              notify();
              clearYTProgress();
              ytProgressTimer = window.setInterval(() => {
                if (!ytPlayer) return;
                const dur = ytPlayer.getDuration?.() || 0;
                const cur = ytPlayer.getCurrentTime?.() || 0;
                if (dur > 0) {
                  globalState = { ...globalState, progress: (cur / dur) * 100 };
                  notify();
                }
              }, 500);
            }
            if (e.data === YT.PlayerState.PAUSED) {
              globalState = { ...globalState, isPlaying: false };
              notify();
              clearYTProgress();
            }
          },
        },
      });
    } else {
      ytPlayer.loadVideoById(videoId);
      ytPlayer.setVolume(Math.round(TARGET_VOLUME * 100));
      ytPlayer.playVideo();
    }
    return;
  }

  // mp3
  if (ytPlayer) { try { ytPlayer.stopVideo(); } catch {} clearYTProgress(); }
  const audio = ensureAudio();
  if (audio.src !== track.source_url) {
    audio.src = track.source_url;
    audio.load();
  }
  if (!canFade) audio.volume = TARGET_VOLUME;
  try {
    await audio.play();
    globalState = { ...globalState, isPlaying: true };
    notify();
    if (canFade) fadeInVolume();
  } catch {
    globalState = { ...globalState, isPlaying: false };
    notify();
  }
}

function fadeInVolume() {
  if (!audioEl) return;
  clearFade();
  const step = TARGET_VOLUME / (FADE_DURATION / 100);
  fadeTimer = window.setInterval(() => {
    if (!audioEl) return clearFade();
    if (audioEl.volume < TARGET_VOLUME - step) {
      audioEl.volume = Math.min(audioEl.volume + step, TARGET_VOLUME);
    } else {
      audioEl.volume = TARGET_VOLUME;
      clearFade();
    }
  }, 100);
}

function pauseNow() {
  clearFade();
  const track = globalState.tracks[globalState.currentIndex];
  if (track?.source_type === "youtube" && ytPlayer) {
    try { ytPlayer.pauseVideo(); } catch {}
    return;
  }
  if (!audioEl) return;
  if (canFade) {
    const startVol = audioEl.volume || TARGET_VOLUME;
    const step = startVol / (FADE_DURATION / 100);
    fadeTimer = window.setInterval(() => {
      if (!audioEl) return clearFade();
      if (audioEl.volume > step) {
        audioEl.volume -= step;
      } else {
        audioEl.volume = 0;
        audioEl.pause();
        clearFade();
        globalState = { ...globalState, isPlaying: false };
        notify();
      }
    }, 100);
  } else {
    audioEl.pause();
    globalState = { ...globalState, isPlaying: false };
    notify();
  }
}

function nextTrack() {
  if (!globalState.tracks.length) return;
  const next = (globalState.currentIndex + 1) % globalState.tracks.length;
  goToTrack(next);
}

function prevTrack() {
  if (!globalState.tracks.length) return;
  const prev = (globalState.currentIndex - 1 + globalState.tracks.length) % globalState.tracks.length;
  goToTrack(prev);
}

function goToTrack(index: number) {
  clearFade();
  clearYTProgress();
  globalState = { ...globalState, currentIndex: index, progress: 0 };
  notify();
  const track = globalState.tracks[index];
  if (track) playTrack(track);
}

function togglePlay() {
  const track = globalState.tracks[globalState.currentIndex];
  if (!track) return;
  if (globalState.isPlaying) pauseNow();
  else playTrack(track);
}

function grantPermission() {
  try { localStorage.setItem(STORAGE_KEY, "granted"); } catch {}
  globalState = { ...globalState, hasPermission: "granted", showModal: false };
  notify();
  const track = globalState.tracks[globalState.currentIndex];
  if (track) playTrack(track);
}

function denyPermission() {
  try { localStorage.setItem(STORAGE_KEY, "denied"); } catch {}
  stopAll();
  globalState = { ...globalState, hasPermission: "denied", showModal: false, isPlaying: false };
  notify();
}

async function resolveMp3Url(url: string): Promise<string> {
  // If URL points to a private Supabase Storage object, replace with a signed URL
  const m = url.match(/\/storage\/v1\/object\/(?:public|sign)\/sound-assets\/([^?]+)/);
  if (!m) return url;
  const path = decodeURIComponent(m[1]);
  try {
    const { data, error } = await supabase.storage
      .from("sound-assets")
      .createSignedUrl(path, 60 * 60 * 6); // 6h
    if (error || !data?.signedUrl) return url;
    return data.signedUrl;
  } catch {
    return url;
  }
}

async function loadFromDB() {
  try {
    const [{ data: tracks }, { data: setting }] = await Promise.all([
      supabase
        .from("sound_tracks")
        .select("id,title,cover_url,source_type,source_url,position")
        .eq("is_enabled", true)
        .order("position", { ascending: true }),
      supabase
        .from("site_settings")
        .select("value")
        .eq("key", "sound_button_enabled")
        .maybeSingle(),
    ]);
    const mapped: Track[] = await Promise.all(
      (tracks || []).map(async (t: any) => ({
        id: t.id,
        title: t.title,
        cover: t.cover_url || "/mooviagold.svg",
        source_type: t.source_type,
        source_url: t.source_type === "mp3" ? await resolveMp3Url(t.source_url) : t.source_url,
      }))
    );
    globalState = {
      ...globalState,
      tracks: mapped,
      currentIndex: Math.min(globalState.currentIndex, Math.max(0, mapped.length - 1)),
      buttonEnabled: setting?.value !== "false",
    };
    notify();
  } catch (e) {
    console.error("[MooviaPlayer] load failed", e);
  }
}


export function useMooviaPlayer() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    let saved: Permission = null;
    try { saved = (localStorage.getItem(STORAGE_KEY) as Permission) || null; } catch {}
    globalState = { ...globalState, hasPermission: saved };
    notify();

    loadFromDB();

    if (!saved) {
      const t = window.setTimeout(() => {
        if (globalState.tracks.length && globalState.buttonEnabled) {
          globalState = { ...globalState, showModal: true };
          notify();
        }
      }, 8000);
      return () => clearTimeout(t);
    }
  }, []);

  const currentTrack = globalState.tracks[globalState.currentIndex] || {
    id: "",
    title: "",
    cover: "",
    source_type: "mp3" as const,
    source_url: "",
  };

  return {
    tracks: globalState.tracks,
    currentIndex: globalState.currentIndex,
    currentTrack,
    isPlaying: globalState.isPlaying,
    showModal: globalState.showModal,
    progress: globalState.progress,
    hasPermission: globalState.hasPermission,
    buttonEnabled: globalState.buttonEnabled,
    duration: audioEl?.duration || 0,
    currentTime: audioEl?.currentTime || 0,
    seekTo: (pct: number) => {
      const track = globalState.tracks[globalState.currentIndex];
      if (track?.source_type === "youtube" && ytPlayer) {
        const dur = ytPlayer.getDuration?.() || 0;
        if (dur > 0) ytPlayer.seekTo((pct / 100) * dur, true);
        return;
      }
      if (audioEl && audioEl.duration) {
        audioEl.currentTime = (pct / 100) * audioEl.duration;
        globalState = { ...globalState, progress: pct };
        notify();
      }
    },
    togglePlay,
    nextTrack,
    prevTrack,
    goToTrack,
    grantPermission,
    denyPermission,
    reload: loadFromDB,
  };
}
