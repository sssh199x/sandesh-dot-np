import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  heading: string;
  label?: string;
  dark?: boolean;
  accent?: boolean;
  className?: string;
}

export function SectionHeading({
  heading,
  label,
  dark = false,
  accent = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {label && (
        <span
          className={cn("typ-label mb-4 block", dark ? "text-copper-light" : "text-copper-dark")}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "typ-h1",
          dark ? "text-cream" : "text-charcoal"
        )}
      >
        {heading}
      </h2>
      {accent && <div className={cn("mt-4 h-[2px] w-12", dark ? "bg-copper" : "bg-copper-dark")} />}
    </div>
  );
}
