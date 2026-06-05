// Audio synthesis — temple bell, countdown tick, completion gong.
// Uses Web Audio API so no asset files needed.

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, durationMs: number, type: OscillatorType = "sine", gain = 0.3, delayMs = 0) {
  const ac = getCtx();
  if (!ac) return;
  const start = ac.currentTime + delayMs / 1000;
  const end = start + durationMs / 1000;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, end);
  osc.connect(g).connect(ac.destination);
  osc.start(start);
  osc.stop(end);
}

export function playBell() {
  tone(880, 2400, "sine", 0.35);
  tone(1320, 2200, "sine", 0.2, 10);
  tone(587, 2600, "triangle", 0.18, 20);
  tone(2200, 1500, "sine", 0.08, 30);
}

export function playTick() {
  tone(660, 120, "sine", 0.25);
}

export function playCompletionGong() {
  playBell();
  setTimeout(() => playBell(), 700);
}

/** Temple bell, then TTS after the bell ring finishes (~2.8s). */
export function playBellThenSpeak(text: string, opts?: { lang?: string }) {
  playBell();
  window.setTimeout(() => speak(text, opts), 2800);
}

// --- Female voice TTS in chosen language --------------------------------
// Heuristic: prefer voices whose name suggests a female speaker and whose
// language tag matches (or shares prefix with) the requested BCP-47 code.
const FEMALE_HINTS = [
  "female", "woman", "girl",
  // Common female voice names across browsers / OS:
  "samantha", "victoria", "karen", "tessa", "moira", "fiona", "susan",
  "zira", "hazel", "kalpana", "lekha", "swara", "veena", "sangeeta",
  "shelley", "isha", "neerja", "raveena", "aditi", "priya", "ananya",
  "google हिन्दी", "google हिंदी",
];

function isFemale(v: SpeechSynthesisVoice): boolean {
  const n = v.name.toLowerCase();
  return FEMALE_HINTS.some((h) => n.includes(h));
}

function pickVoice(lang?: string): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length || !lang) return undefined;
  const want = lang.toLowerCase();
  const prefix = want.split("-")[0];
  const sameLang = voices.filter((v) => v.lang?.toLowerCase().startsWith(prefix));
  const exact = sameLang.filter((v) => v.lang?.toLowerCase() === want);
  // Priority: exact + female → exact → sameLang + female → sameLang
  return (
    exact.find(isFemale) ??
    sameLang.find(isFemale) ??
    exact[0] ??
    sameLang[0]
  );
}

// Pre-warm voices list (some browsers populate it asynchronously).
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  } catch { /* ignore */ }
}

export function speak(text: string, opts?: { lang?: string; rate?: number }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
  const u = new SpeechSynthesisUtterance(text);
  u.rate = opts?.rate ?? 0.95;
  u.pitch = 1.1; // slightly higher for female timbre fallback
  if (opts?.lang) u.lang = opts.lang;
  const voice = pickVoice(opts?.lang);
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

let readingQueue: string[] = [];
let readingLang: string | undefined;
let readingActive = false;

/** Read multiple lines sequentially (for Aartis / Chalisas). */
export function speakReading(lines: string[], opts?: { lang?: string }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopReading();
  readingQueue = lines.filter((l) => l.trim().length > 0);
  readingLang = opts?.lang;
  readingActive = true;
  speakNextInQueue();
}

export function stopReading() {
  readingQueue = [];
  readingActive = false;
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
  }
}

export function isReadingAloud(): boolean {
  return readingActive;
}

function speakNextInQueue() {
  if (!readingActive || readingQueue.length === 0) {
    readingActive = false;
    return;
  }
  const line = readingQueue.shift()!;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(line);
  u.rate = 0.88;
  u.pitch = 1.05;
  if (readingLang) u.lang = readingLang;
  const voice = pickVoice(readingLang);
  if (voice) u.voice = voice;
  u.onend = () => speakNextInQueue();
  u.onerror = () => speakNextInQueue();
  window.speechSynthesis.speak(u);
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern); } catch { /* ignore */ }
  }
}
