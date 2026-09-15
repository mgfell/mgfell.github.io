export default function About() {
  return (
    <section className="mb-24 animate-[fadeUp_0.9s_ease_both_0.15s]">
      <div className="
        max-w-[820px] px-10 py-8
        bg-[rgba(20,22,26,0.45)] backdrop-blur-[18px]
        border border-[rgba(255,42,61,0.10)]
        rounded-[20px]
        shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]
      ">
        <div className="
          font-['JetBrains_Mono',monospace] text-[0.72rem]
          tracking-[3px] uppercase text-[var(--accent)] mb-2
        ">
          // 01 — about
        </div>
        <p className="text-[var(--text-soft)] text-base leading-[1.8]">
          Hey, I'm mgfell. I build things on the internet — clean, fast, and a bit futuristic.
          I care about details, good design, and code that just works.
          Right now I'm focused on my own projects and learning something new every day.
          <br /><br />
          <em className="text-[var(--muted)] italic">— placeholder text, edit me later —</em>
        </p>
      </div>
    </section>
  );
}