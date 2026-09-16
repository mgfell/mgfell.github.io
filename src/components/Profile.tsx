interface ProfileProps {
  nick: string;
  tagline: string;
  stats: {
    label: string;
    value: string;
    accent?: boolean;
  }[];
}

export default function Profile({ nick, tagline, stats }: ProfileProps) {
  return (
    <section className="mb-24 animate-[fadeUp_0.9s_ease_both]">
      <div className="flex flex-col items-center text-center gap-6">

        <div className="
          relative
          w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]
          rounded-full p-[2px]
          bg-gradient-to-br from-white/20 to-white/[0.02]
          transition-all duration-500
          hover:from-white hover:to-white/40
          hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]
        ">
          <div className="
            w-full h-full rounded-full
            bg-[var(--bg-1)]
            flex items-center justify-center
            font-['Inter',sans-serif] font-extrabold
            text-[3rem] sm:text-[3.5rem]
            leading-none
            text-[var(--text-soft)]
            border border-white/5
            overflow-hidden
            select-none
          ">
            M
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 max-w-[640px] px-4">
          <h1 className="
            text-[3rem] sm:text-[4rem] lg:text-[5rem]
            font-bold tracking-[-0.03em] leading-[1]
            text-[var(--text)]
          ">
            {nick}
          </h1>

          <p className="text-[var(--muted)] text-sm sm:text-base tracking-wide max-w-[480px] leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="
          inline-flex items-center gap-2
          px-3.5 py-1.5
          rounded-full
          bg-white/[0.03]
          border border-white/10
          text-[0.7rem] tracking-[0.15em] uppercase
          font-['JetBrains_Mono',monospace]
          text-[var(--text-soft)]
        ">
          <span className="
            w-1.5 h-1.5 rounded-full
            bg-emerald-400
            shadow-[0_0_8px_rgba(52,211,153,0.8)]
          " />
          open to collab
        </div>

        <div className="
          flex flex-wrap items-center justify-center
          gap-2 sm:gap-3
          mt-4
        ">
          {stats.map((s, i) => (
            <div
              key={i}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-white/[0.02]
                border border-white/[0.06]
                backdrop-blur-sm
              "
            >
              <span className="
                font-['JetBrains_Mono',monospace] text-[0.6rem]
                tracking-[0.15em] uppercase text-[var(--muted)]
              ">
                {s.label}
              </span>
              <span className={`
                text-xs sm:text-sm tracking-wide
                ${s.accent
                  ? 'text-white [text-shadow:0_0_12px_rgba(255,255,255,0.4)]'
                  : 'text-[var(--text-soft)]'}
              `}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}