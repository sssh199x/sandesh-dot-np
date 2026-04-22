"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-dusk-contact px-6 text-center">
      <span className="font-mono text-xs tracking-widest text-copper uppercase mb-6">
        Something went wrong
      </span>
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        Oops.
      </h1>
      <p className="mt-4 max-w-md font-body text-base text-cream/50 leading-relaxed">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <a
          href="/"
          className="rounded-pill bg-copper-btn px-7 py-3 font-mono text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-copper-dark"
        >
          Back to Home
        </a>
        <button
          onClick={reset}
          className="rounded-pill border border-cream/15 px-7 py-3 font-mono text-sm font-medium tracking-wide text-cream/60 transition-colors duration-200 hover:border-cream/30 hover:text-cream cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
