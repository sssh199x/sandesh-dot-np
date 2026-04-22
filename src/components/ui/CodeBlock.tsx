"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  filename?: string;
  className?: string;
}

/* Simple token-based syntax highlighting for TypeScript */
function highlightTS(code: string) {
  const keywords = /\b(const|let|var|export|default|import|from|type|interface|function|return|true|false|new)\b/g;
  const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  const comments = /(\/\/.*$)/gm;
  const properties = /(\w+)(?=\s*:)/g;
  const brackets = /([{}[\]()])/g;

  // Tokenize with position tracking to avoid overlapping highlights
  const tokens: { start: number; end: number; type: string }[] = [];

  let match: RegExpExecArray | null;

  // Order matters — strings first (highest priority), then comments, keywords, properties
  while ((match = strings.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: "string" });
  }
  while ((match = comments.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: "comment" });
  }
  while ((match = keywords.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: "keyword" });
  }
  while ((match = properties.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: "property" });
  }
  while ((match = brackets.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: "bracket" });
  }

  // Sort by position, filter overlaps (earlier tokens win)
  tokens.sort((a, b) => a.start - b.start);
  const resolved: typeof tokens = [];
  let cursor = 0;
  for (const t of tokens) {
    if (t.start >= cursor) {
      resolved.push(t);
      cursor = t.end;
    }
  }

  // Build JSX spans
  const parts: React.ReactNode[] = [];
  let pos = 0;
  const colorMap: Record<string, string> = {
    keyword: "text-[#D4944D]",      // copper-light — warm
    string: "text-[#A8C282]",       // sage-light — natural green
    comment: "text-[#6B6560]",      // slate — muted
    property: "text-[#E8C99B]",     // warm cream-gold
    bracket: "text-[#9B8B7D]",      // warm grey
  };

  resolved.forEach((t, i) => {
    if (t.start > pos) {
      parts.push(<span key={`t-${pos}`}>{code.slice(pos, t.start)}</span>);
    }
    parts.push(
      <span key={`h-${i}`} className={colorMap[t.type]}>
        {code.slice(t.start, t.end)}
      </span>
    );
    pos = t.end;
  });
  if (pos < code.length) {
    parts.push(<span key={`t-${pos}`}>{code.slice(pos)}</span>);
  }

  return parts;
}

export function CodeBlock({
  code,
  filename = "developer.ts",
  className,
}: CodeBlockProps) {
  const highlighted = useMemo(() => highlightTS(code), [code]);

  return (
    <div
      className={cn(
        "animate-bob rounded-lg overflow-hidden",
        "bg-dusk-projects border border-white/[0.06]",
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
        <span className="typ-tag text-cream/50 ml-2">{filename}</span>
      </div>
      <pre className="p-4 sm:p-5 overflow-hidden">
        <code className="font-mono text-[0.75rem] sm:text-[0.8125rem] leading-relaxed text-cream/70">
          {highlighted}
        </code>
      </pre>
    </div>
  );
}
