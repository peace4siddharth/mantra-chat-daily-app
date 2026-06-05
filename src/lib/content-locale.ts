import type { LangCode } from "@/lib/i18n";

/** Script bucket for written mantra / devotional text (not UI labels). */
export type ContentLocale =
  | "en"
  | "hi"
  | "bn"
  | "ta"
  | "te"
  | "mr"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "ur";

const LANG_TO_CONTENT: Record<LangCode, ContentLocale> = {
  en: "en",
  hi: "hi",
  sa: "hi",
  bn: "bn",
  as: "bn",
  brx: "hi",
  doi: "hi",
  gu: "gu",
  kn: "kn",
  ks: "ur",
  kok: "hi",
  mai: "hi",
  ml: "ml",
  mni: "hi",
  mr: "mr",
  ne: "hi",
  or: "or",
  pa: "pa",
  sat: "hi",
  sd: "ur",
  ta: "ta",
  te: "te",
  ur: "ur",
};

export function contentLocaleFor(lang: LangCode): ContentLocale {
  return LANG_TO_CONTENT[lang] ?? "en";
}

export function usesDevanagariScript(lang: LangCode): boolean {
  return contentLocaleFor(lang) === "hi";
}
