import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { festivalsForMonth, FESTIVALS_2026 } from "@/lib/hindu-calendar";
import { useLang } from "@/lib/language-context";
import { localeForLang } from "@/lib/i18n";
import type { Festival } from "@/lib/hindu-calendar";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Hindu Calendar — Divine Chant Companion" },
      { name: "description", content: "Festivals, Ekadashi, Pradosham, Purnima, Amavasya and auspicious days on a beautiful Panchang calendar." },
      { property: "og:title", content: "Hindu Calendar — Divine Chant Companion" },
      { property: "og:description", content: "Festivals, Ekadashi, Pradosham, Purnima, Amavasya and auspicious days." },
    ],
  }),
  component: CalendarPage,
});

const KIND_COLOR: Record<Festival["kind"], string> = {
  festival: "bg-primary text-primary-foreground",
  ekadashi: "bg-accent text-accent-foreground",
  pradosham: "bg-maroon text-cream",
  purnima: "bg-gold text-maroon",
  amavasya: "bg-foreground text-background",
  fasting: "bg-secondary text-secondary-foreground",
};

function kindLabel(kind: Festival["kind"], t: ReturnType<typeof useLang>["t"]): string {
  const map: Record<Festival["kind"], Parameters<typeof t>[0]> = {
    festival: "kind_festival",
    ekadashi: "kind_ekadashi",
    pradosham: "kind_pradosham",
    purnima: "kind_purnima",
    amavasya: "kind_amavasya",
    fasting: "kind_fasting",
  };
  return t(map[kind]);
}

function CalendarPage() {
  const { lang, t } = useLang();
  const locale = localeForLang(lang);
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const events = useMemo(
    () => festivalsForMonth(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );
  const eventsByDay = useMemo(() => {
    const map = new Map<number, Festival[]>();
    for (const f of events) {
      const d = parseInt(f.date.slice(8, 10), 10);
      const arr = map.get(d) ?? [];
      arr.push(f);
      map.set(d, arr);
    }
    return map;
  }, [events]);

  const firstWeekday = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function shift(d: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + d, 1));
  }

  const isToday = (day: number) =>
    today.getFullYear() === cursor.getFullYear() &&
    today.getMonth() === cursor.getMonth() &&
    today.getDate() === day;

  // Show all events in selected month, plus a few upcoming ones from the global list
  const upcomingInYear = FESTIVALS_2026.filter(
    (f) => f.kind === "festival" && new Date(f.date) >= today,
  ).slice(0, 6);

  return (
    <main className="flex flex-col gap-6 px-5 pt-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("panchang")}
        </p>
        <h1 className="font-display text-3xl font-semibold">{t("hindu_calendar")}</h1>
      </header>

      <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <button onClick={() => shift(-1)} className="rounded-full p-2 hover:bg-secondary" aria-label={t("prev_month")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="font-display text-xl font-semibold">
            {cursor.toLocaleDateString(locale, { month: "long", year: "numeric" })}
          </h2>
          <button onClick={() => shift(1)} className="rounded-full p-2 hover:bg-secondary" aria-label={t("next_month")}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="py-1">
              {t(`weekday_short_${i}` as Parameters<typeof t>[0])}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={i} className="aspect-square" />;
            const dayEvents = eventsByDay.get(day) ?? [];
            const isFestival = dayEvents.some((e) => e.kind === "festival");
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg p-1 text-xs ${
                  isToday(day)
                    ? "bg-primary text-primary-foreground font-semibold"
                    : isFestival
                      ? "bg-accent/30"
                      : "bg-background"
                }`}
              >
                <div className="flex h-full flex-col">
                  <span className={isToday(day) ? "" : "text-foreground"}>{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-0.5">
                      {dayEvents.slice(0, 3).map((e, j) => (
                        <span
                          key={j}
                          className={`block h-1 w-1 rounded-full ${
                            e.kind === "festival" ? "bg-primary" :
                            e.kind === "ekadashi" ? "bg-accent" :
                            e.kind === "purnima" ? "bg-gold" :
                            e.kind === "amavasya" ? "bg-foreground" : "bg-maroon"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {events.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("this_month")}
          </h3>
          <ul className="space-y-2">
            {events.map((f) => (
              <li key={f.date + f.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-secondary">
                  <span className="text-[10px] uppercase text-muted-foreground">
                    {new Date(f.date).toLocaleDateString(locale, { month: "short" })}
                  </span>
                  <span className="font-display text-xl font-semibold leading-none">
                    {parseInt(f.date.slice(8, 10), 10)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold">{f.name}</p>
                  {f.note && <p className="truncate text-xs text-muted-foreground">{f.note}</p>}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${KIND_COLOR[f.kind]}`}>
                  {kindLabel(f.kind, t)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("upcoming_festivals")}
        </h3>
        <ul className="space-y-2">
          {upcomingInYear.map((f) => (
            <li key={f.date + f.name} className="rounded-2xl bg-sunrise p-4 text-maroon">
              <p className="text-xs uppercase tracking-widest opacity-70">
                {new Date(f.date).toLocaleDateString(locale, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-display text-xl font-semibold">{f.name}</p>
              {f.deity && (
                <p className="text-sm opacity-80">
                  {t("deity")}: {f.deity}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
