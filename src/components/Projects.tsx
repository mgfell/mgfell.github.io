interface Project {
  name: string;
  description: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mb-24 animate-[fadeUp_0.9s_ease_both_0.2s]">
      <div className="
        font-['JetBrains_Mono',monospace] text-[0.72rem]
        tracking-[3px] uppercase text-[var(--accent)] mb-2
      ">
        // 02 — projects
      </div>
      <h2 className="text-3xl font-semibold tracking-wide mb-6 text-[var(--text)]">
        My Projects
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {projects.map((p, i) => (
          <article
            key={i}
            className="
              p-7 rounded-[14px]
              bg-[rgba(20,22,26,0.4)] backdrop-blur-[16px]
              border border-[rgba(255,42,61,0.08)]
              shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[rgba(30,34,40,0.55)]
              hover:border-[rgba(255,42,61,0.5)]
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(255,42,61,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]
            "
          >
            <h3 className="text-lg font-semibold mb-2 tracking-wide text-[var(--text)]">
              {p.name}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-[1.6] mb-4">
              {p.description}
            </p>
            <a
              href={p.link}
              className="
                inline-flex items-center gap-1.5
                text-[var(--text-soft)] text-sm font-medium
                tracking-wide
                transition-all duration-300
                hover:text-[var(--accent-light)]
                hover:gap-3
                hover:[text-shadow:0_0_10px_rgba(255,42,61,0.5)]
                after:content-['→'] after:transition-transform
                hover:after:translate-x-1
              "
            >
              Documentation
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}