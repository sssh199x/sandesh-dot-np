"use client";

import { useState, useEffect } from "react";
import { isSoundAvailable, isSoundEnabled, initSound, toggleSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

export function SoundToggle({ isDark }: { isDark: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide toggle on touch devices and reduced motion — no hover = no concept
    if (!isSoundAvailable()) {
      setVisible(false);
      return;
    }
    setEnabled(isSoundEnabled());
    initSound(); // pre-create Howl if sound was enabled in a previous session
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      className={cn(
        "flex size-8 items-center justify-center gap-[2px] rounded-sm cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none",
        "transition-opacity duration-200",
      )}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "block w-[2px] rounded-[1px] transition-colors duration-200",
            enabled
              ? isDark ? "bg-cream/80" : "bg-copper"
              : isDark ? "bg-cream/30" : "bg-copper/40",
            enabled && "animate-sound-bar",
          )}
          style={{
            height: enabled ? "12px" : [5, 8, 6][i] + "px",
            animationDelay: enabled ? `${i * 150}ms` : undefined,
          }}
        />
      ))}
    </button>
  );
}
