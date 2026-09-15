export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="
      fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2
      px-4 sm:px-6 py-2 sm:py-3
      flex items-center gap-2
      text-[0.65rem] sm:text-xs tracking-wide
      text-[rgba(190,195,205,0.55)]
      font-['JetBrains_Mono',monospace]
      bg-[rgba(20,22,26,0.55)] backdrop-blur-[16px]
      border border-[rgba(255,42,61,0.12)]
      rounded-full
      shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      pointer-events-none
      z-10
      whitespace-nowrap
    ">
      <span>© {year} mgfell</span>
      <span className="opacity-60">·</span>
      <a
        href="mailto:hello@mgfell.dev"
        className="
          pointer-events-auto cursor-pointer
          transition-all duration-300
          hover:text-[var(--accent-light)]
          hover:[text-shadow:0_0_12px_rgba(255,42,61,0.6)]
        "
      >
        hello@mgfell.dev
      </a>
    </footer>
  );
}