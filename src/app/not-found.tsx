export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-dusk-contact px-6 text-center">
      <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-copper uppercase mb-6">
        404 — Page Not Found
      </span>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        Nothing here.
      </h1>
      <p className="mt-4 max-w-md font-[family-name:var(--font-body)] text-base text-cream/50 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 rounded-pill bg-copper-btn px-7 py-3 font-[family-name:var(--font-mono)] text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-copper-dark"
      >
        Back to Home
      </a>
    </div>
  );
}
