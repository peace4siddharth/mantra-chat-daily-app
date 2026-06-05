import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getDailyGuide } from "@/lib/daily-guide";
import { upcomingFestivals, festivalOnDate } from "@/lib/hindu-calendar";
import { loadState, computeStreak, todayISO } from "@/lib/storage";
import { rahuKaal, abhijitMuhurta } from "@/lib/panchang";
import { LANGUAGES, localeForLang, type LangCode } from "@/lib/i18n";
import { useLang } from "@/lib/language-context";
import { useTalkingAssistantOptional } from "@/lib/talking-assistant-context";
import {
  Flame, Sparkles, ArrowRight, Calendar as CalendarIcon,
  Sunrise, Sunset, MapPin, Sun, ShieldAlert, Languages,
} from "lucide-react";

type SunTimesState =
  | { status: "loading" }
  | { status: "ready"; sunriseDate: Date; sunsetDate: Date; place: string }
  | { status: "unsupported" | "denied" };

const HYDRATION_SAFE_DATE = new Date("2026-05-30T12:00:00");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Divine Chant Companion" },
      { name: "description", content: "Today's deity, mantra, recommended chant count, Shubh & Rahu Kaal timings for your daily sadhana." },
      { property: "og:title", content: "Today — Divine Chant Companion" },
      { property: "og:description", content: "Today's deity, mantra, recommended chant count, Shubh & Rahu Kaal timings for your daily sadhana." },
    ],
  }),
  component: Today,
});

function Today() {
  const { lang, setLang, t } = useLang();
  const assist = useTalkingAssistantOptional();
  const [now, setNow] = useState<Date | null>(null);
  const displayDate = now ?? HYDRATION_SAFE_DATE;
  const guide = getDailyGuide(displayDate);
  const todayFest = now ? festivalOnDate(toDateKey(now)) : undefined;
  const upcoming = now ? upcomingFestivals(3) : [];
  const [sunTimes, setSunTimes] = useState<SunTimesState>({ status: "loading" });

  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [todayChants, setTodayChants] = useState(0);

  useEffect(() => {
    setNow(new Date());

    function refresh() {
      const s = loadState();
      setStreak(computeStreak(s.sessions));
      setTodayChants(
        s.sessions.filter((x) => x.date === todayISO()).reduce((a, b) => a + b.count, 0),
      );
    }
    refresh();
    window.addEventListener("divine-chant:update", refresh);
    return () => window.removeEventListener("divine-chant:update", refresh);
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setSunTimes({ status: "unsupported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const times = calculateSunTimes(new Date(), coords.latitude, coords.longitude);
        setSunTimes({
          status: "ready",
          sunriseDate: times.sunrise,
          sunsetDate: times.sunset,
          place: `${coords.latitude.toFixed(2)}°, ${coords.longitude.toFixed(2)}°`,
        });
      },
      () => setSunTimes({ status: "denied" }),
      { enableHighAccuracy: false, maximumAge: 60 * 60 * 1000, timeout: 10000 },
    );
  }, []);

  const kaal = useMemo(() => {
    if (sunTimes.status !== "ready") return null;
    return {
      rahu: rahuKaal(sunTimes.sunriseDate, sunTimes.sunsetDate),
      abhijit: abhijitMuhurta(sunTimes.sunriseDate, sunTimes.sunsetDate),
    };
  }, [sunTimes]);

  const dateStr = displayDate.toLocaleDateString(localeForLang(lang), {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col gap-6 px-5">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {dateStr}
          </p>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {t("todays_divine_guide")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguagePicker lang={lang} onChange={setLang} />
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
            <Flame className="h-4 w-4" /> {streak.current}
          </div>
        </div>
      </header>

      {todayFest && (
        <div className="rounded-2xl bg-gold p-4 text-maroon shadow-divine">
          <p className="text-xs uppercase tracking-widest opacity-80">
            {t("festival_today")}
          </p>
          <p className="font-display text-2xl font-semibold">{todayFest.name}</p>
          {todayFest.deity && (
            <p className="text-sm opacity-90">{t("deity")}: {todayFest.deity}</p>
          )}
        </div>
      )}

      {/* Deity of the day */}
      <section className="overflow-hidden rounded-3xl bg-sunrise p-6 text-maroon shadow-divine">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              {t("todays_focus")}
            </p>
            <h2 className="mt-1 font-display text-4xl font-semibold">
              {guide.deity}
            </h2>
            <p className="mt-1 text-sm opacity-80">{guide.focus}</p>
          </div>
          <div className="text-5xl animate-om-pulse">{guide.emoji}</div>
        </div>

        <Link
          to="/chant"
          search={{ mantra: guide.mantra }}
          onPointerEnter={() => assist?.announceAction(t("recommended_mantra"), "focus")}
          onFocus={() => assist?.announceAction(t("recommended_mantra"), "focus")}
          onClick={() => assist?.announceAction(t("begin_chant"), "tap")}
          className="mt-6 block rounded-2xl bg-cream/80 p-4 backdrop-blur transition active:scale-[0.98]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            {t("recommended_mantra")}
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-foreground">
            {guide.mantra}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("count")} · <b className="text-foreground">{guide.suggestedCount}</b></span>
            <span>{t("best")} · <b className="text-foreground">{guide.bestTime}</b></span>
          </div>
        </Link>

        <Link
          to="/chant"
          search={{ mantra: guide.mantra }}
          onPointerEnter={() => assist?.announceAction(t("begin_chant"), "focus")}
          onFocus={() => assist?.announceAction(t("begin_chant"), "focus")}
          onClick={() => assist?.announceAction(t("begin_chant"), "tap")}
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-maroon px-4 py-3.5 text-base font-semibold text-cream shadow-lg transition active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          {t("begin_chant")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Today snapshot */}
      <section className="grid grid-cols-3 gap-3">
        <Stat label={t("today")} value={todayChants} suffix={t("chants")} />
        <Stat label={t("streak")} value={streak.current} suffix={t("days")} highlight />
        <Stat label={t("longest")} value={streak.longest} suffix={t("days")} />
      </section>

      <section className="rounded-3xl border border-border bg-card p-4 shadow-divine">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("local_sun_times")}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {sunTimes.status === "ready" ? sunTimes.place : t("use_current_location")}
            </p>
          </div>
        </div>

        {sunTimes.status === "ready" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <SunTime icon={<Sunrise className="h-5 w-5" />} label={t("sunrise")} value={formatTime(sunTimes.sunriseDate)} />
              <SunTime icon={<Sunset className="h-5 w-5" />} label={t("sunset")} value={formatTime(sunTimes.sunsetDate)} />
            </div>

            {kaal && (
              <div className="mt-3 grid gap-3">
                <KaalCard
                  tone="good"
                  icon={<Sun className="h-5 w-5" />}
                  title={t("auspicious")}
                  subtitle={t("abhijit")}
                  range={`${formatTime(kaal.abhijit.start)} – ${formatTime(kaal.abhijit.end)}`}
                  hint={kaal.abhijit.skipped ? t("wednesday_skipped") : t("good_for_actions")}
                />
                <KaalCard
                  tone="bad"
                  icon={<ShieldAlert className="h-5 w-5" />}
                  title={t("inauspicious")}
                  subtitle={t("rahu_kaal")}
                  range={`${formatTime(kaal.rahu.start)} – ${formatTime(kaal.rahu.end)}`}
                  hint={t("avoid_starting")}
                />
              </div>
            )}
          </>
        ) : (
          <p className="rounded-2xl bg-secondary p-3 text-sm text-muted-foreground">
            {sunTimes.status === "loading" ? t("allow_location") : t("location_denied")}
          </p>
        )}
      </section>

      {/* Upcoming */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("upcoming")}
          </h3>
          <Link to="/calendar" className="flex items-center gap-1 text-xs font-semibold text-primary">
            {t("view_all")} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <ul className="space-y-2">
          {upcoming.map((f) => (
            <li key={f.date + f.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-accent/30 text-accent-foreground">
                <CalendarIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-semibold text-foreground">{f.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(f.date).toLocaleDateString(localeForLang(lang), {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {f.deity ? ` · ${f.deity}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function LanguagePicker({ lang, onChange }: { lang: LangCode; onChange: (c: LangCode) => void }) {
  return (
    <label className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
      <Languages className="h-3.5 w-3.5 text-primary" />
      <select
        aria-label="Language"
        value={lang}
        onChange={(e) => onChange(e.target.value as LangCode)}
        className="bg-transparent pr-1 text-xs font-semibold outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label} ({l.english})
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ label, value, suffix, highlight }: { label: string; value: number; suffix: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3 text-center ${highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{suffix}</p>
    </div>
  );
}

function SunTime({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <div className="flex items-center gap-2 text-primary">{icon}</div>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function KaalCard({
  tone, icon, title, subtitle, range, hint,
}: {
  tone: "good" | "bad";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  range: string;
  hint: string;
}) {
  const styles =
    tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
      : "border-rose-500/30 bg-rose-500/10 text-rose-900 dark:text-rose-200";
  return (
    <div className={`rounded-2xl border p-3 ${styles}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/40">
            {icon}
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">{title}</p>
            <p className="font-display text-base font-semibold leading-tight">{subtitle}</p>
          </div>
        </div>
        <p className="font-display text-base font-semibold tabular-nums">{range}</p>
      </div>
      <p className="mt-2 text-xs opacity-80">{hint}</p>
    </div>
  );
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function calculateSunTimes(date: Date, latitude: number, longitude: number) {
  const zenith = 90.833;
  return {
    sunrise: calculateSunEvent(date, latitude, longitude, zenith, true),
    sunset: calculateSunEvent(date, latitude, longitude, zenith, false),
  };
}

function calculateSunEvent(date: Date, latitude: number, longitude: number, zenith: number, isSunrise: boolean): Date {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000,
  );
  const longitudeHour = longitude / 15;
  const approxTime = dayOfYear + ((isSunrise ? 6 : 18) - longitudeHour) / 24;
  const meanAnomaly = 0.9856 * approxTime - 3.289;
  let trueLongitude =
    meanAnomaly + 1.916 * Math.sin(toRadians(meanAnomaly)) + 0.02 * Math.sin(toRadians(2 * meanAnomaly)) + 282.634;
  trueLongitude = normalizeDegrees(trueLongitude);

  let rightAscension = toDegrees(Math.atan(0.91764 * Math.tan(toRadians(trueLongitude))));
  rightAscension = normalizeDegrees(rightAscension);
  rightAscension += Math.floor(trueLongitude / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;

  const sinDeclination = 0.39782 * Math.sin(toRadians(trueLongitude));
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const cosHour =
    (Math.cos(toRadians(zenith)) - sinDeclination * Math.sin(toRadians(latitude))) /
    (cosDeclination * Math.cos(toRadians(latitude)));
  const boundedCosHour = Math.min(1, Math.max(-1, cosHour));
  const hourAngle = (isSunrise ? 360 - toDegrees(Math.acos(boundedCosHour)) : toDegrees(Math.acos(boundedCosHour))) / 15;
  const localMeanTime = hourAngle + rightAscension - 0.06571 * approxTime - 6.622;
  const universalTime = normalizeHours(localMeanTime - longitudeHour);

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0) + universalTime * 60 * 60 * 1000);
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function normalizeDegrees(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

function normalizeHours(hours: number): number {
  return ((hours % 24) + 24) % 24;
}
