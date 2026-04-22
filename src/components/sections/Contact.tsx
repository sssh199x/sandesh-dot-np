"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { sendContactEmail } from "@/app/actions/contact";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setErrorMsg(result.message);
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ghost figure parallax — stronger drift for visible effect
  const ghostY = useTransform(scrollYProgress, [0, 1], [120, -80]);
  // Fade in as section enters, stay visible through middle
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 0.32, 0.32, 0.1]);

  return (
    <SectionWrapper ref={sectionRef} id="contact" background="#1A1714" className="pb-40 sm:pb-48">
      {/* Ghost figure — atmospheric background with parallax (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <motion.div
          className="absolute -right-[5%] bottom-0 h-[85%] w-auto will-change-transform"
          style={{ y: ghostY, opacity: ghostOpacity }}
        >
          <Image
            src="/images/me/me-full.webp"
            alt=""
            width={748}
            height={821}
            unoptimized
            className="h-full w-auto max-w-none object-contain object-bottom"
            style={{
              maskImage: "linear-gradient(to left, black 20%, transparent 60%), linear-gradient(to top, transparent 5%, black 25%)",
              WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 60%), linear-gradient(to top, transparent 5%, black 25%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>
      </div>

      <div className="relative max-w-[640px]">
        {/* Heading */}
        <FadeUp>
          <span className="typ-label mb-6 block text-copper">Say Hello</span>
        </FadeUp>

        <TextReveal
          as="h2"
          className="typ-display text-cream mb-6"
          splitType="words"
          stagger={0.06}
          delay={0.2}
          scrollTriggered
        >
          Got an idea? Let&apos;s talk.
        </TextReveal>

        <FadeUp delay={0.4}>
          <p className="typ-body-lg mb-12 max-w-[480px] text-cream/50">
            Whether it&apos;s a full-stack build, a consulting gig, or just a conversation about tech &mdash; I&apos;m always up for it.
          </p>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.5}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                label="Name"
                value={formData.name}
                onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                placeholder="Your name"
                required
              />
              <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                placeholder="you@example.com"
                required
              />
            </div>
            <InputField
              label="Message"
              value={formData.message}
              onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
              placeholder="Tell me about your project..."
              multiline
              required
            />

            <div className="mt-2">
              <Button
                type="submit"
                variant="solid"
                className={status === "sending" ? "opacity-70 pointer-events-none" : ""}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Sent!"
                    : (
                      <>
                        <Send className="size-3.5" />
                        Send Message
                      </>
                    )}
              </Button>
            </div>

            <div aria-live="polite" aria-atomic="true">
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 font-[family-name:var(--font-mono)] text-sm text-sage"
                >
                  Thanks! I&apos;ll be in touch soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 font-[family-name:var(--font-mono)] text-sm text-red-400"
                >
                  {errorMsg}
                </motion.p>
              )}
            </div>
          </form>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const shared =
    "w-full rounded-md border border-cream/[0.08] bg-cream/[0.03] px-4 py-3.5 font-[family-name:var(--font-body)] text-base text-cream placeholder:text-cream/25 outline-none transition-all duration-200 focus:border-copper/50 focus:bg-cream/[0.05] focus-visible:ring-2 focus-visible:ring-copper sm:py-3 sm:text-sm";

  return (
    <label className="block">
      <span className="mb-2 block font-[family-name:var(--font-mono)] text-xs tracking-wider text-cream/50 uppercase">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={shared}
        />
      )}
    </label>
  );
}
