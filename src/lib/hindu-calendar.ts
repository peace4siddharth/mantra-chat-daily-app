// Curated Hindu festival calendar. Dates are approximate for 2026 and
// hand-picked for the most observed festivals worldwide. A full Panchang
// engine is out of V1 scope; this gives users an accurate at-a-glance view.

export type FestivalKind =
  | "festival"
  | "ekadashi"
  | "pradosham"
  | "purnima"
  | "amavasya"
  | "fasting";

export interface Festival {
  date: string; // ISO YYYY-MM-DD
  name: string;
  kind: FestivalKind;
  deity?: string;
  note?: string;
}

export const FESTIVALS_2026: Festival[] = [
  { date: "2026-01-14", name: "Makar Sankranti", kind: "festival", deity: "Surya" },
  { date: "2026-01-23", name: "Vasant Panchami", kind: "festival", deity: "Saraswati" },
  { date: "2026-02-15", name: "Maha Shivaratri", kind: "festival", deity: "Shiva", note: "All-night vigil & fasting" },
  { date: "2026-03-03", name: "Holika Dahan", kind: "festival" },
  { date: "2026-03-04", name: "Holi", kind: "festival" },
  { date: "2026-03-27", name: "Ram Navami", kind: "festival", deity: "Rama" },
  { date: "2026-04-01", name: "Hanuman Jayanti", kind: "festival", deity: "Hanuman" },
  { date: "2026-04-26", name: "Akshaya Tritiya", kind: "festival" },
  { date: "2026-07-09", name: "Guru Purnima", kind: "purnima" },
  { date: "2026-07-16", name: "Shravan begins", kind: "festival", deity: "Shiva", note: "Holy month of Shiva" },
  { date: "2026-08-05", name: "Janmashtami", kind: "festival", deity: "Krishna" },
  { date: "2026-08-27", name: "Ganesh Chaturthi", kind: "festival", deity: "Ganesha" },
  { date: "2026-10-11", name: "Navratri begins", kind: "festival", deity: "Devi" },
  { date: "2026-10-19", name: "Dussehra", kind: "festival" },
  { date: "2026-11-08", name: "Diwali", kind: "festival", deity: "Lakshmi" },
  { date: "2026-11-15", name: "Tulsi Vivah", kind: "festival" },
  // Monthly observances — sample. Real Panchang varies by location.
  { date: "2026-01-04", name: "Ekadashi", kind: "ekadashi" },
  { date: "2026-01-19", name: "Ekadashi", kind: "ekadashi" },
  { date: "2026-02-02", name: "Ekadashi", kind: "ekadashi" },
  { date: "2026-02-18", name: "Ekadashi", kind: "ekadashi" },
  { date: "2026-01-11", name: "Pradosham", kind: "pradosham" },
  { date: "2026-01-26", name: "Pradosham", kind: "pradosham" },
  { date: "2026-01-13", name: "Amavasya", kind: "amavasya" },
  { date: "2026-01-28", name: "Purnima", kind: "purnima" },
];

export function festivalsForMonth(year: number, month: number): Festival[] {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return FESTIVALS_2026.filter((f) => f.date.startsWith(prefix));
}

export function upcomingFestivals(limit = 5, from = new Date()): Festival[] {
  const today = from.toISOString().slice(0, 10);
  return FESTIVALS_2026.filter((f) => f.date >= today).slice(0, limit);
}

export function festivalOnDate(iso: string): Festival | undefined {
  return FESTIVALS_2026.find((f) => f.date === iso && f.kind === "festival");
}
