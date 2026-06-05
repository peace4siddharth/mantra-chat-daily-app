import { Switch } from "@/components/ui/switch";
import { useLang } from "@/lib/language-context";
import { useTalkingAssistant } from "@/lib/talking-assistant-context";

export function TalkingAssistantBar() {
  const { t } = useLang();
  const { enabled, setEnabled } = useTalkingAssistant();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur supports-[backdrop-filter]:bg-card/85 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <label
          htmlFor="talking-assistant"
          className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground"
        >
          <span aria-hidden>🔈</span>
          {t("talking_assistant")}
        </label>
        <Switch
          id="talking-assistant"
          checked={enabled}
          onCheckedChange={setEnabled}
          aria-label={t("talking_assistant")}
        />
      </div>
    </div>
  );
}
