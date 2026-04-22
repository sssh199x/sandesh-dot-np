import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export function Tag({ children, variant = "dark", className }: TagProps) {
  return (
    <span
      className={cn(
        "typ-tag inline-flex items-center gap-1.5 transition-colors duration-200",
        variant === "dark"
          ? "text-cream/55 hover:text-copper-light"
          : "text-copper-dark/80 hover:text-copper-dark",
        className
      )}
    >
      {children}
    </span>
  );
}
