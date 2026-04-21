"use client";

import { useState, useSyncExternalStore } from "react";
import { isSoundAvailable, isSoundEnabled, initSound, toggleSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

function subscribe() { return () => {}; }
function getSoundAvailable() { return isSoundAvailable(); }
function getSoundEnabled() { return isSoundEnabled(); }
function getServerFalse() { return false; }

export function SoundToggle({ isDark }: { isDark: boolean }) {
  const available = useSyncExternalStore(subscribe, getSoundAvailable, getServerFalse);
  const initialEnabled = useSyncExternalStore(subscribe, getSoundEnabled, getServerFalse);
  const [enabled, setEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Sync initial state once on client
  if (available && !initialized) {
    setEnabled(initialEnabled);
    initSound();
    setInitialized(true);
  }

  if (!available) return null;

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
