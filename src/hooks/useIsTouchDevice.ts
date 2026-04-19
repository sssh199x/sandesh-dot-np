import { useSyncExternalStore } from "react";

/** SSR-safe: returns `false` on server, real value on client (no hydration mismatch). */
function subscribe() { return () => {}; }
function getSnapshot() { return window.matchMedia("(pointer: coarse)").matches; }
function getServerSnapshot() { return false; }

export function useIsTouchDevice() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
