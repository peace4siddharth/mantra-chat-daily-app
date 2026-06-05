// Offline-first localStorage helpers for Divine Chant Companion.
// All data is stored under a single namespaced key.

export type MalaType = "rudraksha" | "tulsi" | "crystal" | "sandalwood";

export interface Mantra {
  id: string;
  name: string;
  deity: string;
  target: number;
  favorite?: boolean;
  custom?: boolean;
}

export interface Session {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  mantraId: string;
  mantraName: string;
  count: number;
  target: number;
  completed: boolean;
  durationSec: number;
}

export interface AppState {
  mantras: Mantra[];
  sessions: Session[];
  malaType: MalaType;
  vibrateEvery108: boolean;
  totalChants: number;
}

const KEY = "divine-chant-v1";

const DEFAULT_MANTRAS: Mantra[] = [
  { id: "om-suryaya", name: "Om Suryaya Namaha", deity: "Surya", target: 108 },
  { id: "om-namah-shivaya", name: "Om Namah Shivaya", deity: "Shiva", target: 108 },
  { id: "hare-krishna", name: "Hare Krishna Hare Rama", deity: "Krishna", target: 108 },
  { id: "om-hanumate", name: "Om Hanumate Namaha", deity: "Hanuman", target: 108 },
  { id: "hanuman-chalisa", name: "Jai Hanuman", deity: "Hanuman", target: 108 },
  { id: "gayatri", name: "Om Bhur Bhuvah Svaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat", deity: "Gayatri Devi", target: 108 },
  { id: "ganesha", name: "Om Gam Ganapataye Namaha", deity: "Ganesha", target: 108 },
  { id: "vasudevaya", name: "Om Namo Bhagavate Vasudevaya", deity: "Vishnu / Guru", target: 108 },
  { id: "mahalakshmi", name: "Om Shreem Mahalakshmiyei Namaha", deity: "Devi (Lakshmi)", target: 108 },
  { id: "shani", name: "Om Sham Shanaischaraya Namaha", deity: "Shani / Hanuman", target: 108 },
];

const DEFAULT_STATE: AppState = {
  mantras: DEFAULT_MANTRAS,
  sessions: [],
  malaType: "rudraksha",
  vibrateEvery108: true,
  totalChants: 0,
};

export function getDefaultState(): AppState {
  return {
    ...DEFAULT_STATE,
    mantras: [...DEFAULT_MANTRAS],
    sessions: [],
  };
}

function mergeDefaultMantras(saved: Mantra[] | undefined): Mantra[] {
  const savedArr = Array.isArray(saved) ? saved : [];
  const merged: Mantra[] = DEFAULT_MANTRAS.map((d) => {
    const match = savedArr.find(
      (m) => m.id === d.id || m.name.toLowerCase() === d.name.toLowerCase(),
    );
    return match ? { ...d, favorite: match.favorite, target: match.target ?? d.target } : d;
  });
  for (const mantra of savedArr) {
    const exists = merged.some(
      (m) => m.id === mantra.id || m.name.toLowerCase() === mantra.name.toLowerCase(),
    );
    if (!exists) merged.push({ ...mantra, custom: true });
  }
  return merged;
}

export function loadState(): AppState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      mantras: mergeDefaultMantras(parsed.mantras),
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
    };
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("divine-chant:update"));
}

export function addSession(session: Session) {
  const s = loadState();
  s.sessions.unshift(session);
  s.totalChants += session.count;
  saveState(s);
}

export function addMantra(input: { name: string; deity: string; target?: number }): Mantra {
  const s = loadState();
  const id = `custom-${Date.now().toString(36)}`;
  const mantra: Mantra = {
    id,
    name: input.name.trim(),
    deity: input.deity.trim() || "Custom",
    target: input.target ?? 108,
    custom: true,
  };
  s.mantras = [...s.mantras, mantra];
  saveState(s);
  return mantra;
}

export function toggleFavoriteMantra(id: string) {
  const s = loadState();
  s.mantras = s.mantras.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m));
  saveState(s);
}

export function removeMantra(id: string) {
  const s = loadState();
  s.mantras = s.mantras.filter((m) => !(m.id === id && m.custom));
  saveState(s);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function computeStreak(sessions: Session[]): { current: number; longest: number } {
  if (sessions.length === 0) return { current: 0, longest: 0 };
  const days = new Set(sessions.filter((s) => s.completed).map((s) => s.date));
  let current = 0;
  const d = new Date();
  // walk back from today
  while (true) {
    const iso = d.toISOString().slice(0, 10);
    if (days.has(iso)) {
      current++;
      d.setDate(d.getDate() - 1);
    } else {
      // allow today to be empty without breaking streak (count from yesterday)
      if (current === 0 && iso === new Date().toISOString().slice(0, 10)) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
  }
  // longest: walk all days
  const sorted = [...days].sort();
  let longest = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const iso of sorted) {
    const day = new Date(iso);
    if (prev && (day.getTime() - prev.getTime()) / 86400000 === 1) {
      run++;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prev = day;
  }
  return { current, longest };
}
