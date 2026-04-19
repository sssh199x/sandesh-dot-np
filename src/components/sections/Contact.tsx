"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
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

  return (
    <SectionWrapper id="contact" background="#1A1714">
      <div className="mx-auto max-w-[680px] text-center">
        {/* Heading */}
        <FadeUp>
          <span className="typ-label mb-6 block text-copper">Get in Touch</span>
        </FadeUp>

        <TextReveal
          as="h2"
          className="typ-display text-cream mb-6"
          splitType="words"
          stagger={0.06}
          delay={0.2}
          scrollTriggered
        >
          Let&apos;s Build Together
        </TextReveal>

        <FadeUp delay={0.4}>
          <p className="typ-body-lg mx-auto mb-12 max-w-[480px] text-cream/50">
            Have a project in mind or just want to chat? Drop me a message and
            I&apos;ll get back to you.
          </p>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.5}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
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

            <div className="mt-2 flex items-center justify-center gap-4">
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
                  className="mt-2 text-center font-[family-name:var(--font-mono)] text-sm text-sage"
                >
                  Thanks! I&apos;ll be in touch soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-center font-[family-name:var(--font-mono)] text-sm text-red-400"
                >
                  {errorMsg}
                </motion.p>
              )}
            </div>
          </form>
        </FadeUp>

        {/* Social links */}
        <FadeUp delay={0.6}>
          <div className="mt-14 flex items-center justify-center gap-5">
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="group flex size-11 items-center justify-center rounded-full border border-cream/[0.08] text-cream/50 transition-all duration-200 hover:border-copper/40 hover:text-copper hover:bg-copper/[0.06] focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px] transition-transform duration-200 group-hover:scale-110"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
            </a>
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="group flex size-11 items-center justify-center rounded-full border border-cream/[0.08] text-cream/50 transition-all duration-200 hover:border-copper/40 hover:text-copper hover:bg-copper/[0.06] focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none"
            >
              <svg viewBox="0 0 448 512" fill="currentColor" className="size-[18px] transition-transform duration-200 group-hover:scale-110"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.28 61.9 111.28 142.3V448z"/></svg>
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="group flex size-11 items-center justify-center rounded-full border border-cream/[0.08] text-cream/50 transition-all duration-200 hover:border-copper/40 hover:text-copper hover:bg-copper/[0.06] focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none"
            >
              <Mail className="size-[18px] transition-transform duration-200 group-hover:scale-110" />
            </a>
          </div>
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
