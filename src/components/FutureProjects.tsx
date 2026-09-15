import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

type ProjectStatus = 'future' | 'in-development' | 'soon' | 'released';

interface FutureProject {
  slug: string;
  name: string;
  short: string;
  status: ProjectStatus;
}

interface FutureProjectsProps {
  projects: FutureProject[];
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  'released': 'Released',
  'future': 'Future',
  'in-development': 'In Development',
  'soon': 'Soon',
};

const STATUS_STYLES: Record<ProjectStatus, string> = {
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

export default function FutureProjects({ projects }: FutureProjectsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.future-card'));
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.3,
    });

    const listeners: Array<{ el: HTMLElement; type: string; fn: EventListener }> = [];

    const addListener = (el: HTMLElement, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      listeners.push({ el, type, fn });
    };

    const resetAll = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
        });

        const glow = card.querySelector<HTMLElement>('.future-glow');
        if (glow) gsap.to(glow, { opacity: 0, scale: 1, duration: 0.4 });
      });
    };

    const activate = (activeIndex: number) => {
      cards.forEach((card, i) => {
        if (i === activeIndex) {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power3.out',
          });

          const glow = card.querySelector<HTMLElement>('.future-glow');
          if (glow) gsap.to(glow, { opacity: 1, scale: 1.15, duration: 0.5 });
        } else {
          const distance = Math.abs(i - activeIndex);
          const direction = i < activeIndex ? -1 : 1;

          gsap.to(card, {
            scale: 0.93 - distance * 0.01,
            x: direction * (12 + distance * 6),
            y: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 0.5 - distance * 0.08,
            filter: 'blur(1.5px)',
            duration: 0.5,
            ease: 'power3.out',
          });

          const glow = card.querySelector<HTMLElement>('.future-glow');
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
        }
      });
    };

    cards.forEach((card, i) => {
      const shine = card.querySelector<HTMLElement>('.future-shine');

      const onEnter = () => activate(i);
      addListener(card, 'mouseenter', onEnter);

      const onMove = (e: Event) => {
        const ev = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) * 6;

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });

        if (shine) {
          gsap.to(shine, {
            background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 60%)`,
            duration: 0.3,
          });
        }
      };
      addListener(card, 'mousemove', onMove);
    });

    const onGridLeave = () => resetAll();
    addListener(grid, 'mouseleave', onGridLeave);

    return () => {
      listeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
    };
  }, [projects]);

  return (
    <section className="mb-24">
      <div className="
        font-['JetBrains_Mono',monospace] text-[0.72rem]
        tracking-[3px] uppercase text-[var(--accent)] mb-2
      ">
        // 03 — future
      </div>

      <div className="flex items-baseline gap-4 mb-6 flex-wrap">
        <h2 className="text-3xl font-semibold tracking-wide text-[var(--text)]">
          Future Projects
        </h2>
        <span className="
          text-xs italic text-[var(--muted)]
          font-['JetBrains_Mono',monospace] tracking-wide
        ">
          // future doesn't mean it will happen
        </span>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5"
        style={{ perspective: '1200px' }}
      >
        {projects.map((p) => (
          <Link
            to={`/project/${p.slug}`}
            key={p.slug}
            className="
              future-card
              relative p-6 sm:p-7 pt-12 rounded-[14px]
              bg-[rgba(20,22,26,0.35)] backdrop-blur-[16px]
              border border-dashed border-[rgba(255,255,255,0.10)]
              overflow-hidden
              will-change-transform
              cursor-pointer
              isolate
              block
            "
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="future-shine absolute inset-0 pointer-events-none" />
            <div className="
              future-glow absolute inset-0 rounded-[14px] pointer-events-none opacity-0
              shadow-[0_0_40px_rgba(255,255,255,0.15),0_0_80px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]
              border border-[rgba(255,255,255,0.25)]
            " />

            <span className={`
              absolute top-4 right-4 z-10
              px-2.5 py-1
              text-[0.6rem] font-semibold
              tracking-[1.5px] uppercase
              border rounded-full
              font-['JetBrains_Mono',monospace]
              ${STATUS_STYLES[p.status]}
            `}>
              {STATUS_LABELS[p.status]}
            </span>

            <h3 className="relative z-10 text-lg font-semibold mb-2 tracking-wide text-[var(--text)]">
              {p.name}
            </h3>
            <p className="relative z-10 text-[var(--muted)] text-sm leading-[1.6]">
              {p.short}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}