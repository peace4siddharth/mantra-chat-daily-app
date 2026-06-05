import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Trophy, Sparkles, TrendingUp } from "lucide-react";
import { loadState, computeStreak, todayISO, type AppState } from "@/lib/storage";
import { useLang } from "@/lib/language-context";
import { localeForLang } from "@/lib/i18n";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Streaks & Achievements — Divine Chant Companion" },
      { name: "description", content: "Your chanting streak, total chants, prayer hours and devotional milestones." },
      { property: "og:title", content: "Streaks & Achievements" },
      { property: "og:description", content: "Your chanting streak, total chants, and devotional milestones." },
    ],
  }),
  component: ProgressPage,
});

interface Achievement {
  id: string;
  labelKey: Parameters<ReturnType<typeof useLang>["t"]>[0];
  descKey: Parameters<ReturnType<typeof useLang>["t"]>[0];
  emoji: string;
  check: (s: AppState, streak: { current: number; longest: number }) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-108",
    labelKey: "achievement_first_108",
    descKey: "achievement_first_108_desc",
    emoji: "🪷",
    check: (s) => s.sessions.some((x) => x.count >= 108),
  },
  {
    id: "1000",
    labelKey: "achievement_1000",
    descKey: "achievement_1000_desc",
    emoji: "🔔",
    check: (s) => s.totalChants >= 1000,
  },
  {
    id: "10k",
    labelKey: "achievement_10k",
    descKey: "achievement_10k_desc",
    emoji: "🪔",
    check: (s) => s.totalChants >= 10_000,
  },
  {
    id: "100k",
    labelKey: "achievement_100k",
    descKey: "achievement_100k_desc",
    emoji: "🕉️",
    check: (s) => s.totalChants >= 100_000,
  },
  {
    id: "7-day",
    labelKey: "achievement_7_day",
    descKey: "achievement_7_day_desc",
    emoji: "🌅",
    check: (_s, st) => st.longest >= 7,
  },
  {
    id: "30-day",
    labelKey: "achievement_30_day",
    descKey: "achievement_30_day_desc",
    emoji: "🌺",
    check: (_s, st) => st.longest >= 30,
  },
  {
    id: "100-day",
    labelKey: "achievement_100_day",
    descKey: "achievement_100_day_desc",
    emoji: "🏵️",
    check: (_s, st) => st.longest >= 100,
  },
];

function ProgressPage() {
  const { lang, t } = useLang();
  const locale = localeForLang(lang);
  const [state, setState] = useState<AppState>(() => loadState());
  useEffect(() => {
    const r = () => setState(loadState());
    window.addEventListener("divine-chant:update", r);
    return () => window.removeEventListener("divine-chant:update", r);
  }, []);

  const streak = computeStreak(state.sessions);
  const totalSessions = state.sessions.length;
  const totalMinutes = Math.round(state.sessions.reduce((a, b) => a + b.durationSec, 0) / 60);
  const today = state.sessions.filter((s) => s.date === todayISO());
  const todayCount = today.reduce((a, b) => a + b.count, 0);

  // Mantra leaderboard
  const byMantra = new Map<string, number>();
  for (const s of state.sessions) byMantra.set(s.mantraName, (byMantra.get(s.mantraName) ?? 0) + s.count);
  const topMantras = Array.from(byMantra.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // 7-day heatmap
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().slice(0, 10);
    const total = state.sessions.filter((s) => s.date === iso).reduce((a, b) => a + b.count, 0);
    return {
      iso,
      total,
      label: d.toLocaleDateString(locale, { weekday: "short" }).slice(0, 2),
    };
  });
  const maxDay = Math.max(1, ...last7.map((d) => d.total));

  return (
    <main className="flex flex-col gap-6 px-5 pt-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("sadhana_journey")}
        </p>
        <h1 className="font-display text-3xl font-semibold">{t("your_practice")}</h1>
      </header>

      {/* Streak hero */}
      <section className="rounded-3xl bg-sunrise p-6 text-maroon shadow-divine">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/70">
            <Flame className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-display text-5xl font-semibold tabular-nums">
              {streak.current}
            </p>
            <p className="text-sm opacity-80">{t("day_streak")}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <Pill label={t("longest")} value={`${streak.longest}d`} />
          <Pill label={t("today")} value={String(todayCount)} />
          <Pill label={t("total")} value={fmt(state.totalChants)} />
        </div>
      </section>

      {/* 7-day */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("last_7_days")}
        </h2>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-end justify-between gap-2" style={{ height: 100 }}>
            {last7.map((d) => {
              const h = (d.total / maxDay) * 80 + (d.total > 0 ? 10 : 4);
              return (
                <div key={d.iso} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-md ${d.total > 0 ? "bg-primary" : "bg-secondary"}`}
                    style={{ height: h }}
                  />
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 gap-3">
        <StatCard icon={<Sparkles className="h-4 w-4" />} label={t("sessions")} value={String(totalSessions)} />
        <StatCard icon={<TrendingUp className="h-4 w-4" />} label={t("prayer_minutes")} value={String(totalMinutes)} />
      </section>

      {/* Top mantras */}
      {topMantras.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("most_chanted")}
          </h2>
          <ul className="space-y-2">
            {topMantras.map(([name, total], i) => (
              <li key={name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-maroon">
                  {i + 1}
                </span>
                <p className="flex-1 truncate font-semibold">{name}</p>
                <span className="font-display text-lg font-semibold tabular-nums">{fmt(total)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Trophy className="h-4 w-4" /> {t("achievements")}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = a.check(state, streak);
            return (
              <div
                key={a.id}
                className={`rounded-2xl border p-4 text-center transition ${
                  unlocked
                    ? "border-primary/40 bg-gold text-maroon shadow-divine"
                    : "border-border bg-card opacity-60 grayscale"
                }`}
              >
                <div className="text-3xl">{a.emoji}</div>
                <p className="mt-1 font-display text-sm font-semibold">{t(a.labelKey)}</p>
                <p className="text-[10px] text-muted-foreground">{t(a.descKey)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {state.sessions.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          {t("start_journey_hint")}
        </p>
      )}
    </main>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/70 px-2 py-1.5 backdrop-blur">
      <p className="text-[10px] uppercase tracking-widest opacity-70">{label}</p>
      <p className="font-display text-base font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span></div>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function fmt(n: number): string {
  if (n >= 100_000) return `${(n / 100_000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
