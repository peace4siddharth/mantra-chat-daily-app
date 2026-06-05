import type { ComponentProps, ReactNode } from "react";
import { useTalkingAssistantOptional } from "@/lib/talking-assistant-context";

type AssistableProps = {
  label: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
};

/** Wraps content to announce label on tap and hover/focus when Talking Assistant is on. */
export function Assistable({ label, children, className, as: Tag = "div" }: AssistableProps) {
  const assist = useTalkingAssistantOptional();

  return (
    <Tag
      className={className}
      onPointerEnter={() => assist?.announceAction(label, "focus")}
      onFocus={() => assist?.announceAction(label, "focus")}
      onClick={() => assist?.announceAction(label, "tap")}
    >
      {children}
    </Tag>
  );
}

type AssistableButtonProps = ComponentProps<"button"> & { assistLabel: string };

export function AssistableButton({ assistLabel, onClick, onFocus, onPointerEnter, ...props }: AssistableButtonProps) {
  const assist = useTalkingAssistantOptional();

  return (
    <button
      {...props}
      onPointerEnter={(e) => {
        assist?.announceAction(assistLabel, "focus");
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        assist?.announceAction(assistLabel, "focus");
        onFocus?.(e);
      }}
      onClick={(e) => {
        assist?.announceAction(assistLabel, "tap");
        onClick?.(e);
      }}
    />
  );
}

type AssistableLinkProps = ComponentProps<"a"> & { assistLabel: string };

export function AssistableLink({ assistLabel, onClick, onFocus, onPointerEnter, ...props }: AssistableLinkProps) {
  const assist = useTalkingAssistantOptional();

  return (
    <a
      {...props}
      onPointerEnter={(e) => {
        assist?.announceAction(assistLabel, "focus");
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        assist?.announceAction(assistLabel, "focus");
        onFocus?.(e);
      }}
      onClick={(e) => {
        assist?.announceAction(assistLabel, "tap");
        onClick?.(e);
      }}
    />
  );
}
