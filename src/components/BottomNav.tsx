import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CircleDot, Calendar, Flame } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { useTalkingAssistantOptional } from "@/lib/talking-assistant-context";

const TABS = [
  { to: "/", key: "today", assistKey: "assist_nav_today", icon: Home },
  { to: "/chant", key: "chant", assistKey: "assist_nav_chant", icon: CircleDot },
  { to: "/calendar", key: "calendar", assistKey: "assist_nav_calendar", icon: Calendar },
  { to: "/progress", key: "streak", assistKey: "assist_nav_streak", icon: Flame },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  
  // Safely access useLang to prevent Vite import crashes if the file was partially written
  const langContext = typeof useLang === 'function' ? useLang() : { t: (k: string) => k, lang: 'en' };
  const t = langContext.t;
  
  // Safely access the assistant hook
  const assist = typeof useTalkingAssistantOptional === 'function' ? useTalkingAssistantOptional() : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {TABS.map(({ to, key, assistKey, icon: Icon }) => {
          const active = pathname === to;
          const label = t(assistKey as any);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                onPointerEnter={() => assist?.announceAction(label, "focus")}
                onFocus={() => assist?.announceAction(label, "focus")}
                onClick={() => assist?.announceAction(label, "tap")}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    active ? "bg-primary/15 scale-110" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                {t(key as any)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}