"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PeekAvatar({ introComplete }: { introComplete: boolean }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const visibleRef = useRef(false);

  // Keep ref in sync to avoid closure stale reads
  useEffect(() => { visibleRef.current = visible; }, [visible]);

  // Show/hide timer logic
  useEffect(() => {
    if (!introComplete) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Only update state if currently visible (avoid unnecessary re-renders)
      if (visibleRef.current) setVisible(false);
      timerRef.current = setTimeout(() => {
        if (window.scrollY < 200) setVisible(true);
      }, 4000);
    };

    // Debounced scroll handler — fires at most once per 200ms
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        startTimer();
      }, 200);
    };

    startTimer();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [introComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 18,
              mass: 0.8,
            },
          }}
          exit={{
            y: 120,
            opacity: 0,
            transition: { duration: 0.25, ease: [0.25, 0, 0.5, 0] },
          }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 0, 120, 120, 0],
            }}
            transition={{
              duration: 6,
              times: [0, 0.47, 0.53, 0.87, 1],
              repeat: Infinity,
              ease: ["linear", "easeIn", "linear", "easeOut"],
              delay: 2.0,
            }}
            className="relative"
          >
            <Image
              src="/images/me/peek-avatar.svg"
              alt=""
              width={160}
              height={73}
              className="object-contain object-bottom drop-shadow-[0_-4px_12px_rgba(26,23,20,0.12)]"
              aria-hidden="true"
            />

            {/* Eye sparkle glints */}
            <svg
              viewBox="0 240 1536 700"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              {/* Left eye glint */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.8, 1] }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <motion.g
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                  transition={{ delay: 1.5, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M610,840 L616,852 L610,864 L604,852 Z" fill="white" opacity="0.9" />
                  <path d="M610,852 L622,846 L610,852 L598,846 Z" fill="white" opacity="0.7" />
                </motion.g>
              </motion.g>

              {/* Right eye glint */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.8, 1] }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              >
                <motion.g
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                  transition={{ delay: 2.0, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M940,807 L946,819 L940,831 L934,819 Z" fill="white" opacity="0.9" />
                  <path d="M940,819 L952,813 L940,819 L928,813 Z" fill="white" opacity="0.7" />
                </motion.g>
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
