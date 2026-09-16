export default function About() {
  return (
    <section className="mb-24 animate-[fadeUp_0.9s_ease_both_0.15s]">
      <div className="
        max-w-[720px] mx-auto
        px-6 py-8 sm:px-10 sm:py-10
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.06]
        rounded-3xl
      ">
        <div className="
          font-['JetBrains_Mono',monospace] text-[0.7rem]
          tracking-[0.2em] uppercase text-[var(--muted)] mb-4
        ">
          // about
        </div>
        <p className="text-[var(--text-soft)] text-sm sm:text-base leading-[1.8]">
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