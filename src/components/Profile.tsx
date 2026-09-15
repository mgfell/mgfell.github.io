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
      <div className="flex items-start gap-10">

        <div className="
          relative shrink-0
          w-[250px] h-[250px]
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
            text-7xl tracking-widest
            text-[var(--text-soft)]
            border border-white/5
            overflow-hidden
          ">
            {avatarText}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-12 flex-1 min-w-0">
          <h1 className="
            text-[5.5rem] font-bold tracking-[3px] leading-[0.95]
            text-[var(--text)]
            [text-shadow:0_0_40px_rgba(255,42,61,0.12)]
          ">
            {nick}
          </h1>
          <p className="text-[var(--muted)] text-sm tracking-wide max-w-[420px]">
            {tagline}
          </p>
        </div>

        <aside className="
          flex flex-col gap-4
          px-7 py-6 min-w-[200px] mt-12
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
                text-sm tracking-wide
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