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
        "typ-tag inline-block rounded-pill px-3 py-1",
        variant === "dark"
          ? "bg-ghost text-copper"
          : "border border-copper/20 bg-copper/[0.06] text-copper-dark",
        className
      )}
    >
      {children}
    </span>
  );
}
