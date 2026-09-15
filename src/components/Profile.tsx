interface ProfileProps {
  nick: string;
  tagline: string;
  avatarText: string;
  stats: {
    label: string;
    value: string;
    accent?: boolean;
  }[];
}

export default function Profile({ nick, tagline, avatarText, stats }: ProfileProps) {
  return (
    <section className="mb-20 animate-[fadeUp_0.9s_ease_both]">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 flex-1 min-w-0">
          <div className="
            relative shrink-0
            w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]
            rounded-full p-[3px]
            bg-gradient-to-br from-white/60 to-white/[0.08]
            shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_60px_rgba(255,42,61,0.10),0_0_120px_rgba(255,42,61,0.05)]
            transition-all duration-500
            hover:bg-gradient-to-br hover:from-[var(--accent)] hover:to-[var(--accent-deep)]
            hover:shadow-[0_0_0_1px_rgba(255,42,61,0.4),0_0_80px_rgba(255,42,61,0.5),0_0_160px_rgba(255,42,61,0.25)]
          ">
            <div className="
              w-full h-full rounded-full
              bg-[var(--bg-1)]
              flex items-center justify-center
              font-['JetBrains_Mono',monospace] font-bold
              text-4xl sm:text-5xl lg:text-7xl
              tracking-widest
              text-[var(--text-soft)]
              border border-white/5
              overflow-hidden
            ">
              {avatarText}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 sm:pt-8 lg:pt-12 flex-1 min-w-0">
            <h1 className="
              text-[2.8rem] sm:text-[3.5rem] lg:text-[5.5rem]
              font-bold tracking-[2px] sm:tracking-[3px] leading-[0.95]
              text-[var(--text)]
              [text-shadow:0_0_40px_rgba(255,42,61,0.12)]
              break-words
            ">
              {nick}
            </h1>
            <p className="text-[var(--muted)] text-xs sm:text-sm tracking-wide max-w-[420px]">
              {tagline}
            </p>
          </div>
        </div>

        <aside className="
          flex flex-row lg:flex-col
          gap-5 lg:gap-4
          flex-wrap
          px-5 py-5 lg:px-7 lg:py-6
          w-full lg:w-auto lg:min-w-[200px]
          lg:mt-12
          bg-[rgba(20,22,26,0.5)] backdrop-blur-[18px]
          border border-[rgba(255,42,61,0.12)]
          rounded-[18px]
          shadow-[0_10px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]
        ">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="
                font-['JetBrains_Mono',monospace] text-[0.6rem]
                tracking-[2px] uppercase text-[var(--muted)]
              ">
                {s.label}
              </span>
              <span className={`
                text-xs sm:text-sm tracking-wide
                ${s.accent
                  ? 'text-[var(--accent)] [text-shadow:0_0_12px_rgba(255,42,61,0.4)]'
                  : 'text-[var(--text-soft)]'}
              `}>
                {s.value}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}