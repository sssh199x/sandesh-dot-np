import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  heading: string;
  label?: string;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  heading,
  label,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {label && (
        <span
          className="typ-label mb-4 block text-copper"
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
      <div className="mt-4 h-[2px] w-12 bg-copper" />
    </div>
  );
}
