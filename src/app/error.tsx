"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-dusk-contact px-6 text-center">
      <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-copper uppercase mb-6">
        Something went wrong
      </span>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        Oops.
      </h1>
      <p className="mt-4 max-w-md font-[family-name:var(--font-body)] text-base text-cream/50 leading-relaxed">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-pill bg-copper-btn px-7 py-3 font-[family-name:var(--font-mono)] text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-copper-dark cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
