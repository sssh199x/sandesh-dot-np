"use client";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  filename = "developer.ts",
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "animate-bob rounded-lg overflow-hidden",
        "bg-[#2C2826] border border-white/[0.06]",
        "shadow-[0_8px_40px_rgba(26,23,20,0.25)]",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FFBD2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="typ-tag text-slate ml-2">{filename}</span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className="font-[family-name:var(--font-mono)] text-[0.8125rem] leading-relaxed text-cream/80">
          {code}
        </code>
      </pre>
    </div>
  );
}
