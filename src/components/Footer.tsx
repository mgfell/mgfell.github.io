export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="
      fixed bottom-4 left-1/2 -translate-x-1/2
      px-5 py-2.5
      flex items-center gap-2
      text-[0.7rem] tracking-wide
      text-[var(--muted)]
      font-['JetBrains_Mono',monospace]
      bg-[rgba(14,16,20,0.7)] backdrop-blur-xl
      border border-white/[0.06]
      rounded-full
      pointer-events-none
      z-10
      whitespace-nowrap
    ">
      <span>© {year} mgfell</span>
      <span className="opacity-40">·</span>
      <a
        href="mailto:hello@mgfell.dev"
        className="
          pointer-events-auto cursor-pointer
          transition-colors duration-300
          hover:text-white
        "
      >
        hello@mgfell.dev
      </a>
    </footer>
  );
}