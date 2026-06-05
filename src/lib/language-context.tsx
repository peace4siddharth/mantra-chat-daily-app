import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getLang,
  setLang as persistLang,
  translate,
  type LangCode,
} from "@/lib/i18n";

type TranslateKey = Parameters<typeof translate>[1];

interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: TranslateKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => getLang());

  useEffect(() => {
    const sync = () => setLangState(getLang());
    window.addEventListener("divine-chant:lang", sync);
    return () => window.removeEventListener("divine-chant:lang", sync);
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    persistLang(code);
  }, []);

  const t = useCallback(
    (key: TranslateKey, params?: Record<string, string | number>) =>
      translate(lang, key, params),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within LanguageProvider");
  }
  return ctx;
}
