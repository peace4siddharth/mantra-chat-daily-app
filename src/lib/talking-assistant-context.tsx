import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { speak, stopReading } from "@/lib/audio";
import { BCP47, translate, type LangCode } from "@/lib/i18n";
import { useLang } from "@/lib/language-context";

const STORAGE_KEY = "divine-chant:talking-assistant";

type TranslateKey = Parameters<typeof translate>[1];

interface TalkingAssistantContextValue {
  enabled: boolean;
  setEnabled: (on: boolean) => void;
  /** Speak plain text in the active app language. */
  announce: (text: string) => void;
  /** Speak a translated UI key. */
  announceKey: (key: TranslateKey, params?: Record<string, string | number>) => void;
  /** Announce tap/focus on a control. */
  announceAction: (label: string, action?: "tap" | "focus") => void;
  bcpLang: string;
}

const TalkingAssistantContext = createContext<TalkingAssistantContextValue | null>(null);

export function TalkingAssistantProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [enabled, setEnabledState] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const langRef = useRef(lang);
  langRef.current = lang;

  const setEnabled = useCallback((on: boolean) => {
    setEnabledState(on);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
    }
    if (!on) stopReading();
    if (on) {
      const bcp = BCP47[langRef.current];
      speak(translate(langRef.current, "assist_enabled"), { lang: bcp });
    }
  }, []);

  const announce = useCallback(
    (text: string) => {
      if (!enabled || !text.trim()) return;
      speak(text, { lang: BCP47[langRef.current] });
    },
    [enabled],
  );

  const announceKey = useCallback(
    (key: TranslateKey, params?: Record<string, string | number>) => {
      if (!enabled) return;
      announce(translate(langRef.current, key, params));
    },
    [enabled, announce],
  );

  const announceAction = useCallback(
    (label: string, action: "tap" | "focus" = "tap") => {
      if (!enabled) return;
      const key = action === "tap" ? "assist_tapped" : "assist_focused";
      announceKey(key, { label });
    },
    [enabled, announceKey],
  );

  const value = useMemo(
    () => ({
      enabled,
      setEnabled,
      announce,
      announceKey,
      announceAction,
      bcpLang: BCP47[lang],
    }),
    [enabled, setEnabled, announce, announceKey, announceAction, lang],
  );

  return (
    <TalkingAssistantContext.Provider value={value}>{children}</TalkingAssistantContext.Provider>
  );
}

export function useTalkingAssistant(): TalkingAssistantContextValue {
  const ctx = useContext(TalkingAssistantContext);
  if (!ctx) {
    throw new Error("useTalkingAssistant must be used within TalkingAssistantProvider");
  }
  return ctx;
}

/** Optional hook — safe when provider missing (returns no-ops). */
export function useTalkingAssistantOptional() {
  return useContext(TalkingAssistantContext);
}
