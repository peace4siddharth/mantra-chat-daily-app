// Rahu Kaal (inauspicious) and Abhijit Muhurta (auspicious) calculations.
// Both depend on local sunrise and sunset.

export interface KaalWindow {
  start: Date;
  end: Date;
}

// Rahu Kaal segment index per weekday (Sun=0..Sat=6), 0-indexed from sunrise.
// Daytime is split into 8 equal parts; this picks which part is Rahu Kaal.
const RAHU_INDEX: Record<number, number> = {
  0: 7, // Sunday
  1: 1, // Monday
  2: 6, // Tuesday
  3: 4, // Wednesday
  4: 5, // Thursday
  5: 3, // Friday
  6: 2, // Saturday
};

export function rahuKaal(sunrise: Date, sunset: Date): KaalWindow {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const segment = dayMs / 8;
  const idx = RAHU_INDEX[sunrise.getDay()] ?? 0;
  return {
    start: new Date(sunrise.getTime() + segment * idx),
    end: new Date(sunrise.getTime() + segment * (idx + 1)),
  };
}

// Abhijit Muhurta: ~48 minutes centered at solar noon. Skipped on Wednesdays
// in some traditions; we still display it but flag it.
export function abhijitMuhurta(sunrise: Date, sunset: Date): KaalWindow & { skipped: boolean } {
  const noonMs = (sunrise.getTime() + sunset.getTime()) / 2;
  const dayMs = sunset.getTime() - sunrise.getTime();
  const half = dayMs / 30; // 1/15 of day length, halved
  return {
    start: new Date(noonMs - half),
    end: new Date(noonMs + half),
    skipped: sunrise.getDay() === 3,
  };
}
