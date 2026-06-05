// Daily spiritual guidance — deity of the day, recommended mantra, prayer time.

export interface DailyGuide {
  weekday: string;
  deity: string;
  mantra: string;
  suggestedCount: number;
  bestTime: string;
  focus: string;
  emoji: string;
}

// Traditional weekday-deity associations in Hindu practice.
const SCHEDULE: DailyGuide[] = [
  {
    weekday: "Sunday",
    deity: "Surya",
    mantra: "Om Suryaya Namaha",
    suggestedCount: 108,
    bestTime: "Sunrise",
    focus: "Health, vitality, leadership",
    emoji: "☀️",
  },
  {
    weekday: "Monday",
    deity: "Shiva",
    mantra: "Om Namah Shivaya",
    suggestedCount: 108,
    bestTime: "Brahma Muhurta (4:00–6:00 AM)",
    focus: "Inner peace, transformation, surrender",
    emoji: "🔱",
  },
  {
    weekday: "Tuesday",
    deity: "Hanuman",
    mantra: "Om Hanumate Namaha",
    suggestedCount: 108,
    bestTime: "Early morning",
    focus: "Courage, strength, protection",
    emoji: "🙏",
  },
  {
    weekday: "Wednesday",
    deity: "Ganesha",
    mantra: "Om Gam Ganapataye Namaha",
    suggestedCount: 108,
    bestTime: "Morning",
    focus: "Removing obstacles, new beginnings",
    emoji: "🐘",
  },
  {
    weekday: "Thursday",
    deity: "Vishnu / Guru",
    mantra: "Om Namo Bhagavate Vasudevaya",
    suggestedCount: 108,
    bestTime: "Morning",
    focus: "Wisdom, devotion, gratitude",
    emoji: "🪷",
  },
  {
    weekday: "Friday",
    deity: "Devi (Lakshmi)",
    mantra: "Om Shreem Mahalakshmiyei Namaha",
    suggestedCount: 108,
    bestTime: "Evening",
    focus: "Abundance, grace, beauty",
    emoji: "🌺",
  },
  {
    weekday: "Saturday",
    deity: "Shani / Hanuman",
    mantra: "Om Sham Shanaischaraya Namaha",
    suggestedCount: 108,
    bestTime: "Evening",
    focus: "Discipline, karma, perseverance",
    emoji: "🪔",
  },
];

export function getDailyGuide(date: Date = new Date()): DailyGuide {
  return SCHEDULE[date.getDay()];
}
