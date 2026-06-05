// Thin wrapper around the browser SpeechRecognition API.
// Detects chant repetitions by counting recognized speech segments
// that contain keywords from the mantra.

type SR = typeof window extends { SpeechRecognition: infer T } ? T : unknown;

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((ev: Event) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [i: number]: {
      isFinal: boolean;
      length: number;
      [j: number]: { transcript: string; confidence: number };
    };
  };
}

function getSR(): { new (): SpeechRecognitionLike } | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: { new (): SpeechRecognitionLike };
    webkitSpeechRecognition?: { new (): SpeechRecognitionLike };
  };
  return (w.SpeechRecognition || w.webkitSpeechRecognition) ?? null;
}

export function isVoiceSupported(): boolean {
  return getSR() !== null;
}

export interface ChantCounterOptions {
  /** Words/keywords that indicate one chant repetition. Lowercase. */
  keywords: string[];
  /** Called for each detected repetition (delta). */
  onCount: (delta: number) => void;
  /** Optional transcript callback for UI. */
  onTranscript?: (text: string, isFinal: boolean) => void;
  onError?: (msg: string) => void;
}

export interface ChantCounter {
  start: () => void;
  stop: () => void;
}

/**
 * Counts chant repetitions by matching keywords inside continuous
 * speech recognition results. Restarts automatically on `onend`
 * because some browsers cut sessions short.
 */
export function createChantCounter(opts: ChantCounterOptions): ChantCounter {
  const SR = getSR();
  let rec: SpeechRecognitionLike | null = null;
  let running = false;
  let lastProcessedIndex = 0;

  const tokens = opts.keywords.map((k) => k.toLowerCase()).filter(Boolean);
  // Build a regex that matches any keyword occurrence.
  const pattern = tokens.length
    ? new RegExp(tokens.map(escapeRe).join("|"), "g")
    : null;

  function escapeRe(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function build() {
    if (!SR) return null;
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-IN";
    r.onresult = (ev) => {
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const res = ev.results[i];
        const transcript = res[0]?.transcript ?? "";
        opts.onTranscript?.(transcript, res.isFinal);
        if (res.isFinal && i >= lastProcessedIndex) {
          lastProcessedIndex = i + 1;
          if (pattern) {
            const matches = transcript.toLowerCase().match(pattern);
            if (matches && matches.length > 0) {
              opts.onCount(matches.length);
            }
          } else {
            // Fallback: each final utterance = 1 chant
            opts.onCount(1);
          }
        }
      }
    };
    r.onerror = (ev) => {
      const err = (ev as unknown as { error?: string }).error;
      if (err && err !== "no-speech" && err !== "aborted") {
        opts.onError?.(err);
      }
    };
    r.onend = () => {
      if (running) {
        // auto-restart for continuous listening
        try { r.start(); } catch { /* ignore */ }
      }
    };
    return r;
  }

  return {
    start() {
      if (!SR) {
        opts.onError?.("Voice recognition is not supported on this device. Tap the mala beads to count manually.");
        return;
      }
      running = true;
      lastProcessedIndex = 0;
      rec = build();
      try { rec?.start(); } catch { /* already started */ }
    },
    stop() {
      running = false;
      try { rec?.stop(); } catch { /* ignore */ }
      rec = null;
    },
  };
}
