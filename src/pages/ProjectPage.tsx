import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import NotFound from './NotFound';
import ParticlesBackground from '../components/ParticlesBackground';
import Heart from '../components/Heart';
import ScrollProgress from '../components/ScrollProgress';

const STATUS_LABELS: Record<string, string> = {
  'released': 'Released',
  'future': 'Future',
  'in-development': 'In Development',
  'soon': 'Soon',
};

const STATUS_STYLES: Record<string, string> = {
  'released': `
    text-emerald-300 border-emerald-400/40 bg-emerald-400/10
    shadow-[0_0_16px_rgba(52,211,153,0.25)]
  `,
  'future': `
    text-yellow-300 border-yellow-400/40 bg-yellow-400/10
    shadow-[0_0_16px_rgba(250,204,21,0.25)]
  `,
  'in-development': `
    text-[var(--accent-light)] border-[var(--accent)]/50 bg-[var(--accent)]/10
    shadow-[0_0_16px_rgba(255,42,61,0.35)]
  `,
  'soon': `
    text-purple-300 border-purple-400/40 bg-purple-400/10
    shadow-[0_0_16px_rgba(168,85,247,0.3)]
  `,
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <NotFound />;

  return (
    <>
      <ScrollProgress />
      <ParticlesBackground />
      <Heart />

      <main className="w-full px-5 sm:px-10 lg:px-12 py-16 sm:py-20 lg:pl-16 max-w-[900px]">
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            text-[var(--muted)] text-sm
            font-['JetBrains_Mono',monospace] tracking-wide
            mb-8
            transition-colors duration-300
            hover:text-[var(--accent-light)]
          "
        >
          ← back
        </Link>

        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <h1 className="
            text-[3rem] sm:text-[4.5rem] font-bold tracking-[2px] leading-[1]
            text-[var(--text)]
            [text-shadow:0_0_40px_rgba(255,42,61,0.15)]
          ">
            {project.name}
          </h1>

          <span className={`
            px-3 py-1.5
            text-[0.65rem] font-semibold
            tracking-[1.5px] uppercase
            border rounded-full
            font-['JetBrains_Mono',monospace]
            ${STATUS_STYLES[project.status]}
          `}>
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <p className="text-[var(--muted)] text-base mb-2">
          {project.short}
        </p>

        {project.year && (
          <div className="
            text-[var(--muted)] text-xs
            font-['JetBrains_Mono',monospace] tracking-[2px]
            mb-10
          ">
            // {project.year}
          </div>
        )}

        <div className="
          p-6 sm:p-8 rounded-[20px]
          bg-[rgba(20,22,26,0.45)] backdrop-blur-[18px]
          border border-[rgba(255,42,61,0.10)]
          shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]
          mb-10
        ">
          <div className="
            font-['JetBrains_Mono',monospace] text-[0.72rem]
            tracking-[3px] uppercase text-[var(--accent)] mb-4
          ">
            // about this project
          </div>
          <p className="text-[var(--text-soft)] text-base leading-[1.8] whitespace-pre-line">
            {project.description.trim()}
          </p>
        </div>

        {project.stack && project.stack.length > 0 && (
          <div className="mb-10">
            <div className="
              font-['JetBrains_Mono',monospace] text-[0.72rem]
              tracking-[3px] uppercase text-[var(--accent)] mb-4
            ">
              // stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1.5 rounded-full
                    bg-[rgba(20,22,26,0.6)]
                    border border-[rgba(255,42,61,0.2)]
                    text-[var(--text-soft)] text-xs
                    font-['JetBrains_Mono',monospace]
                    tracking-wide
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-10">
            <div className="
              font-['JetBrains_Mono',monospace] text-[0.72rem]
              tracking-[3px] uppercase text-[var(--accent)] mb-4
            ">
              // screenshots
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  className="
                    w-full rounded-[14px]
                    border border-[rgba(255,255,255,0.08)]
                    shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                  "
                />
              ))}
            </div>
          </div>
        )}

        {project.links && (
          <div>
            <div className="
              font-['JetBrains_Mono',monospace] text-[0.72rem]
              tracking-[3px] uppercase text-[var(--accent)] mb-4
            ">
              // links
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5 py-2.5 rounded-[10px]
                    bg-[rgba(255,42,61,0.12)]
                    border border-[rgba(255,42,61,0.4)]
                    text-[var(--accent-light)] text-sm font-medium
                    font-['JetBrains_Mono',monospace] tracking-wide
                    transition-all duration-300
                    hover:bg-[rgba(255,42,61,0.2)]
                    hover:shadow-[0_0_24px_rgba(255,42,61,0.4)]
                  "
                >
                  → GitHub
                </a>
              )}
              {project.links.author && (
                <a
                  href={project.links.author}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5 py-2.5 rounded-[10px]
                    bg-[rgba(20,22,26,0.6)]
                    border border-[rgba(255,255,255,0.1)]
                    text-[var(--text-soft)] text-sm font-medium
                    font-['JetBrains_Mono',monospace] tracking-wide
                    transition-all duration-300
                    hover:border-[rgba(255,42,61,0.4)]
                    hover:text-[var(--accent-light)]
                  "
                >
                  → Author
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5 py-2.5 rounded-[10px]
                    bg-[rgba(20,22,26,0.6)]
                    border border-[rgba(255,255,255,0.1)]
                    text-[var(--text-soft)] text-sm font-medium
                    font-['JetBrains_Mono',monospace] tracking-wide
                    transition-all duration-300
                    hover:border-[rgba(255,42,61,0.4)]
                    hover:text-[var(--accent-light)]
                  "
                >
                  → Live
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5 py-2.5 rounded-[10px]
                    bg-[rgba(20,22,26,0.6)]
                    border border-[rgba(255,255,255,0.1)]
                    text-[var(--text-soft)] text-sm font-medium
                    font-['JetBrains_Mono',monospace] tracking-wide
                    transition-all duration-300
                    hover:border-[rgba(255,42,61,0.4)]
                    hover:text-[var(--accent-light)]
                  "
                >
                  → Docs
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}