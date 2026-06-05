import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mala } from "@/components/Mala";
import {
  Mic,
  MicOff,
  Play,
  Square,
  Plus,
  Minus,
  Check,
  Star,
  Trash2,
  ChevronLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AssistableButton } from "@/components/Assistable";
import {
  loadState,
  saveState,
  addSession,
  addMantra,
  toggleFavoriteMantra,
  removeMantra,
  todayISO,
  type Mantra,
  type MalaType,
} from "@/lib/storage";
import { createChantCounter, isVoiceSupported } from "@/lib/voice";
import {
  playBell,
  playBellThenSpeak,
  playTick,
  speak,
  speakReading,
  stopReading,
  isReadingAloud,
  vibrate,
} from "@/lib/audio";
import { useLang } from "@/lib/language-context";
import { useTalkingAssistantOptional } from "@/lib/talking-assistant-context";
import { BCP47, translate } from "@/lib/i18n";
import { getMantraDisplay } from "@/lib/mantra-display";
import {
  AARTIS,
  CHALISAS,
  getDevotionalById,
  getDevotionalLines,
  type DevotionalItem,
} from "@/lib/devotional-content";

function validateChantSearch(search: Record<string, unknown>) {
  return {
    mantra: typeof search.mantra === "string" ? search.mantra : undefined,
    devotional: typeof search.devotional === "string" ? search.devotional : undefined,
  };
}

export const Route = createFileRoute("/chant")({
  validateSearch: validateChantSearch,
  head: () => ({
    meta: [
      { title: "Chant — Divine Chant Companion" },
      {
        name: "description",
        content:
          "Interactive mantra chanting with mala counter, plus read-only Aartis and Chalisas.",
      },
    ],
  }),
  component: ChantPage,
});

type Phase = "setup" | "countdown" | "active" | "complete";

const TARGET_COUNTS = [11, 21, 51, 108, 1008] as const;
const MALA_IDS: MalaType[] = ["rudraksha", "tulsi", "crystal", "sandalwood"];

function ChantPage() {
  const search = useSearch({ from: "/chant" });
  const { lang, t } = useLang();
  const assist = useTalkingAssistantOptional();
  const bcp = BCP47[lang];
  
  const [readingAloud, setReadingAloud] = useState(false);
  const [state, setState] = useState(() => loadState());
  const [readingItem, setReadingItem] = useState<DevotionalItem | null>(() => {
    if (typeof search.devotional === "string") {
      return getDevotionalById(search.devotional) ?? null;
    }
    return null;
  });
  const [selected, setSelected] = useState<Mantra>(() => {
    const s = loadState();
    const fromHome =
      typeof search.mantra === "string"
        ? s.mantras.find((m) => m.name.toLowerCase() === search.mantra?.toLowerCase())
        : undefined;
    return fromHome ?? s.mantras[0];
  });
  const [target, setTarget] = useState(108);
  const [phase, setPhase] = useState<Phase>("setup");
  const [countdown, setCountdown] = useState(5);
  const [count, setCount] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDeity, setNewDeity] = useState("");
  const startedAt = useRef<number>(0);
  const counterRef = useRef<ReturnType<typeof createChantCounter> | null>(null);
  const voiceAvail = useRef(false);

  const selectedDisplay = getMantraDisplay(selected, lang);
  const sessionLabel = selectedDisplay.name;

  useEffect(() => {
    voiceAvail.current = isVoiceSupported();
    const refresh = () => setState(loadState());
    window.addEventListener("divine-chant:update", refresh);
    return () => window.removeEventListener("divine-chant:update", refresh);
  }, []);

  useEffect(() => {
    if (typeof search.devotional !== "string") return;
    const item = getDevotionalById(search.devotional);
    if (item) setReadingItem(item);
  }, [search.devotional]);

  useEffect(() => {
    if (typeof search.mantra !== "string") return;
    const match = state.mantras.find(
      (m) => m.name.toLowerCase() === search.mantra?.toLowerCase(),
    );
    if (match) setSelected(match);
  }, [search.mantra, state.mantras]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) {
      beginListening();
      return;
    }
    playTick();
    const timer = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, phase]);

  useEffect(() => () => counterRef.current?.stop(), []);

  // Cleanup reading on dismount or switch
  useEffect(() => {
    stopReading();
    setReadingAloud(false);
  }, [readingItem]);

  function startSession() {
    setCount(0);
    setTranscript("");
    setError(null);
    setCountdown(5);
    setPhase("countdown");
  }

  function beginListening() {
    startedAt.current = Date.now();
    setPhase("active");
    speak(translate(lang, "spoken_begin"), { lang: bcp });
    if (!voiceOn || !voiceAvail.current) {
      if (!voiceAvail.current) {
        setError(translate(lang, "voice_unavailable"));
      }
      return;
    }
    const keywords = extractKeywords(sessionLabel);
    counterRef.current = createChantCounter({
      keywords,
      onCount: (delta) => {
        setCount((c) => handleIncrement(c, delta));
      },
      onTranscript: (line, isFinal) => {
        if (isFinal) setTranscript(line);
      },
      onError: (msg) => setError(msg),
    });
    counterRef.current.start();
  }

  function handleIncrement(current: number, delta: number): number {
    const next = current + delta;
    if (state.vibrateEvery108 && Math.floor(next / 108) > Math.floor(current / 108)) {
      vibrate([60, 40, 60]);
    }
    if (next >= target && current < target) {
      onComplete(next);
    }
    return next;
  }

  function onComplete(finalCount: number) {
    counterRef.current?.stop();
    vibrate([200, 100, 200, 100, 400]);
    setPhase("complete");
    playBellThenSpeak(
      translate(lang, "spoken_complete", { name: sessionLabel, count: finalCount }),
      { lang: bcp },
    );
    const dur = Math.round((Date.now() - startedAt.current) / 1000);
    addSession({
      id: crypto.randomUUID(),
      date: todayISO(),
      mantraId: selected.id,
      mantraName: sessionLabel,
      count: finalCount,
      target,
      completed: true,
      durationSec: dur,
    });
  }

  function stopSession() {
    counterRef.current?.stop();
    if (count > 0) {
      const dur = Math.round((Date.now() - startedAt.current) / 1000);
      addSession({
        id: crypto.randomUUID(),
        date: todayISO(),
        mantraId: selected.id,
        mantraName: sessionLabel,
        count,
        target,
        completed: count >= target,
        durationSec: dur,
      });
    }
    setPhase("setup");
    setCount(0);
  }

  function manualInc() {
    setCount((c) => handleIncrement(c, 1));
    playBell();
    vibrate(20);
  }

  function manualDec() {
    setCount((c) => Math.max(0, c - 1));
  }

  function selectMala(m: MalaType) {
    const next = { ...state, malaType: m };
    setState(next);
    saveState(next);
  }

  function malaLabel(id: MalaType): string {
    return t(`mala_${id}` as Parameters<typeof t>[0]);
  }

  // —— Read-only devotional lyrics with Temple Bell AND Voice Assistant ———————————————————————
  if (readingItem) {
    const lines = getDevotionalLines(readingItem, lang);
    const title = t(readingItem.titleKey as Parameters<typeof t>[0]);

    function toggleListen() {
      if (readingAloud || isReadingAloud()) {
        stopReading();
        setReadingAloud(false);
        assist?.announceKey("assist_stop_reading");
        return;
      }
      assist?.announceKey("assist_listen_reading");
      setReadingAloud(true);
      speakReading(lines, { lang: bcp });
      const checkEnd = window.setInterval(() => {
        if (!isReadingAloud()) {
          setReadingAloud(false);
          window.clearInterval(checkEnd);
        }
      }, 500);
    }

    return (
      <main className="flex flex-col gap-5 px-5 pb-8">
        <header>
          <AssistableButton
            type="button"
            assistLabel={t("back_to_list")}
            onClick={() => setReadingItem(null)}
            className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back_to_list")}
          </AssistableButton>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("devotional_readings_title")}
          </p>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-semibold">{title}</h1>
              <p className="text-xs text-muted-foreground">
                {t(readingItem.subtitleKey as Parameters<typeof t>[0])}
              </p>
            </div>
          </div>
        </header>

        {/* Action Buttons: Temple Bell & Voice Assistant Reader */}
        <div className="flex justify-center gap-4">
          <AssistableButton
            type="button"
            assistLabel="Ring Temple Bell"
            onClick={() => {
              playBell();
              vibrate([50, 100, 50]);
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold/10 border border-gold/30 px-4 py-3 text-sm font-semibold text-gold shadow-sm transition active:scale-95 active:bg-gold/20"
          >
            <span className="text-xl">🔔</span>
            Bell
          </AssistableButton>

          <AssistableButton
            type="button"
            assistLabel={readingAloud ? t("assist_stop_reading") : t("assist_listen_reading")}
            onClick={toggleListen}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition active:scale-95 ${
              readingAloud
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border-border"
            }`}
          >
            {readingAloud ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            {readingAloud ? t("stop") || "Stop Voice" : t("listen") || "Read Aloud"}
          </AssistableButton>
        </div>

        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <ol className="space-y-3 text-sm leading-relaxed">
            {lines.map((line, i) => (
              <li key={i} className="font-display text-foreground">
                <span className="mr-2 text-[10px] text-muted-foreground">
                  {t("verse")} {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
        </article>
      </main>
    );
  }

  // —— Active chanting session ———————————————————————————————————————————————
  if (phase !== "setup") {
    return (
      <main className="flex flex-col gap-6 px-5 pt-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("chanting_session")}
          </p>
          <h1 className="font-display text-3xl font-semibold">{sessionLabel}</h1>
        </header>
        {phase === "countdown" && (
          <div className="flex flex-1 flex-col items-center justify-center py-20">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              {t("begin_in")}
            </p>
            <div
              className="mt-4 flex h-44 w-44 items-center justify-center rounded-full bg-sunrise font-display text-8xl font-semibold text-maroon shadow-divine animate-bead-pop"
              key={countdown}
            >
              {countdown || "ॐ"}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t("center_yourself")}</p>
          </div>
        )}
        {(phase === "active" || phase === "complete") && (
          <>
            <div className="flex justify-center">
              <Mala count={count} malaType={state.malaType} size={300} />
            </div>
            <div className="text-center">
              <p className="font-display text-lg">
                <span className="text-foreground">{count}</span>
                <span className="text-muted-foreground"> / {target}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {Math.max(0, target - count)} {t("remaining")}
              </p>
            </div>
            {phase === "active" && (
              <>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVoiceOn((v) => !v)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      voiceOn
                        ? "bg-primary text-primary-foreground animate-listen"
                        : "bg-secondary text-muted-foreground"
                    }`}
                    aria-label={voiceOn ? t("voice_off_action") : t("voice_on")}
                  >
                    {voiceOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </button>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {voiceOn ? t("listening") : t("voice_off")}
                    </p>
                    <p className="truncate text-xs italic text-muted-foreground">
                      {transcript || t("begin_chanting_aloud")}
                    </p>
                  </div>
                </div>
                {error && (
                  <p className="rounded-xl bg-destructive/10 px-3 py-2 text-center text-xs text-destructive">
                    {error}
                  </p>
                )}
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={manualDec}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                    aria-label={t("decrease")}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={manualInc}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-maroon shadow-divine active:scale-95"
                    aria-label={t("increase")}
                  >
                    <Plus className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={stopSession}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                    aria-label={t("stop")}
                  >
                    <Square className="h-5 w-5 fill-current" />
                  </button>
                </div>
              </>
            )}
            {phase === "complete" && (
              <div className="space-y-3 text-center">
                <div className="rounded-3xl bg-gold p-6 text-maroon shadow-divine">
                  <p className="text-5xl">🪔</p>
                  <p className="mt-2 font-display text-2xl font-semibold">
                    {t("sadhana_complete")}
                  </p>
                  <p className="text-sm opacity-80">
                    {count} {t("chants_offered_to")} {selectedDisplay.deity}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPhase("setup");
                    setCount(0);
                  }}
                  className="w-full rounded-2xl bg-maroon py-4 font-semibold text-cream"
                >
                  {t("done")}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    );
  }

  // —— Setup: interactive mantras on top, devotional readings below ————————————
  const sortedMantras = [...state.mantras].sort(
    (a, b) => Number(!!b.favorite) - Number(!!a.favorite),
  );

  return (
      <main className="flex flex-col gap-6 px-5 pb-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("chanting_session")}
        </p>
        <h1 className="font-display text-3xl font-semibold">{t("prepare_your_chant")}</h1>
      </header>

      {/* Original interactive chanting block */}
      <section>
        <div className="flex items-center justify-between">
          <Label>{t("mantra")}</Label>
          <AssistableButton
            type="button"
            assistLabel={showAdd ? t("cancel") : t("add_chant")}
            onClick={() => setShowAdd((v) => !v)}
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            {showAdd ? t("cancel") : t("add_chant")}
          </AssistableButton>
        </div>
        {showAdd && (
          <div className="mt-2 space-y-2 rounded-2xl border border-border bg-card p-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t("chant_text_placeholder")}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              value={newDeity}
              onChange={(e) => setNewDeity(e.target.value)}
              placeholder={t("deity_optional")}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                if (!newName.trim()) return;
                const m = addMantra({ name: newName, deity: newDeity });
                setNewName("");
                setNewDeity("");
                setShowAdd(false);
                setSelected(m);
              }}
              className="w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground"
            >
              {t("save_chant")}
            </button>
          </div>
        )}
        <div className="mt-2 space-y-2">
          {sortedMantras.map((m) => (
            <MantraRow
              key={m.id}
              m={m}
              lang={lang}
              selected={selected}
              onSelect={() => {
                setSelected(m);
                setTarget(m.target ?? 108);
              }}
              onDelete={() => {
                if (selected.id === m.id) {
                  const next = state.mantras.find((x) => x.id !== m.id);
                  if (next) setSelected(next);
                }
                removeMantra(m.id);
              }}
              t={t}
              assist={assist}
            />
          ))}
        </div>
      </section>

      <section>
        <Label>{t("target_count")}</Label>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {TARGET_COUNTS.map((n) => (
            <AssistableButton
              key={n}
              type="button"
              assistLabel={`${t("target_count")} ${n}`}
              onClick={() => setTarget(n)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                target === n
                  ? "bg-primary text-primary-foreground shadow-divine"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {n}
            </AssistableButton>
          ))}
        </div>
      </section>

      <section>
        <Label>{t("mala")}</Label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {MALA_IDS.map((m) => (
            <AssistableButton
              key={m}
              type="button"
              assistLabel={`${t("mala")} ${malaLabel(m)}`}
              onClick={() => selectMala(m)}
              className={`rounded-xl py-2.5 text-xs font-semibold transition ${
                state.malaType === m
                  ? "bg-accent text-accent-foreground ring-2 ring-primary"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {malaLabel(m)}
            </AssistableButton>
          ))}
        </div>
      </section>

      <AssistableButton
        type="button"
        assistLabel={t("start_chanting")}
        onClick={startSession}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-maroon py-4 text-base font-semibold text-cream shadow-divine transition active:scale-[0.98]"
      >
        <Play className="h-5 w-5 fill-current" />
        {t("start_chanting")}
      </AssistableButton>

      <div className="border-t border-border pt-6" role="separator" />

      {/* Read-only devotional readings */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("devotional_readings_title")}
        </h2>

        <div>
          <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
            {t("section_major_aartis")}
          </h3>
          <ul className="space-y-1">
            {AARTIS.map((item) => (
              <ReadingLink
                key={item.id}
                item={item}
                onOpen={() => setReadingItem(item)}
                t={t}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
            {t("section_chalisas")}
          </h3>
          <ul className="space-y-1">
            {CHALISAS.map((item) => (
              <ReadingLink
                key={item.id}
                item={item}
                onOpen={() => setReadingItem(item)}
                t={t}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function ReadingLink({
  item,
  onOpen,
  t,
}: {
  item: DevotionalItem;
  onOpen: () => void;
  t: ReturnType<typeof useLang>["t"];
}) {
  const label = t(item.titleKey as Parameters<typeof t>[0]);
  return (
    <li>
      <AssistableButton
        type="button"
        assistLabel={label}
        onClick={onOpen}
        className="w-full rounded-lg px-2 py-1.5 text-left text-sm text-primary underline-offset-2 transition hover:bg-secondary/60 hover:underline"
      >
        {label}
      </AssistableButton>
    </li>
  );
}

function MantraRow({
  m,
  lang,
  selected,
  onSelect,
  onDelete,
  t,
  assist,
}: {
  m: Mantra;
  lang: Parameters<typeof getMantraDisplay>[1];
  selected: Mantra;
  onSelect: () => void;
  onDelete: () => void;
  t: ReturnType<typeof useLang>["t"];
  assist: ReturnType<typeof useTalkingAssistantOptional>;
}) {
  const display = getMantraDisplay(m, lang);
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-2xl border p-3 text-left transition ${
        selected.id === m.id
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border bg-card"
      }`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavoriteMantra(m.id);
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-secondary"
        aria-label={m.favorite ? t("unfavorite") : t("favorite")}
      >
        <Star
          className={`h-5 w-5 ${m.favorite ? "fill-gold text-gold" : "text-muted-foreground"}`}
        />
      </button>
      <button
        type="button"
        onPointerEnter={() => assist?.announceAction(display.name, "focus")}
        onFocus={() => assist?.announceAction(display.name, "focus")}
        onClick={() => {
          assist?.announceKey("assist_mantra_selected", { name: display.name });
          onSelect();
        }}
        className="min-w-0 flex-1 text-left"
      >
        <p className="font-display text-base font-semibold leading-snug">{display.name}</p>
        <p className="text-xs text-muted-foreground">{display.deity}</p>
      </button>
      {selected.id === m.id && <Check className="h-5 w-5 shrink-0 text-primary" />}
      {m.custom && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive"
          aria-label={t("delete_chant")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

function extractKeywords(name: string): string[] {
  const stop = new Set(["om", "shri", "shree", "jai", "namaha", "namah", "the", "and"]);
  const distinctive = name
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stop.has(w));
  return Array.from(new Set(["om", ...distinctive]));
}