import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import Heart from '../components/Heart';

export default function NotFound() {
  return (
    <>
      <ParticlesBackground />
      <Heart />

      <div className="
        relative min-h-screen w-full
        flex flex-col items-center justify-center
        px-6
      ">
        <div className="
          font-['JetBrains_Mono',monospace] font-bold
          text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none
          text-[var(--accent)]
          [text-shadow:0_0_60px_rgba(255,42,61,0.6),0_0_120px_rgba(255,42,61,0.3)]
          select-none
        ">
          404
        </div>

        <div className="
          font-['JetBrains_Mono',monospace]
          text-[0.72rem] tracking-[4px] uppercase
          text-[var(--muted)]
          mt-4 mb-8
        ">
          // page not found
        </div>

        <p className="
          text-[var(--text-soft)] text-base
          max-w-[420px] text-center leading-relaxed
          mb-10
        ">
          Looks like you've wandered off the map. The page you're looking for doesn't exist — or maybe it never did.
        </p>

        <Link
          to="/"
          className="
            px-6 py-3 rounded-full
            bg-[rgba(20,22,26,0.6)] backdrop-blur-[16px]
            border border-[rgba(255,42,61,0.3)]
            text-[var(--text)] text-sm tracking-wide
            font-['JetBrains_Mono',monospace] uppercase
            transition-all duration-300
            hover:border-[var(--accent)]
            hover:text-[var(--accent-light)]
            hover:shadow-[0_0_30px_rgba(255,42,61,0.4)]
            hover:-translate-y-0.5
          "
        >
          ← Back home
        </Link>
      </div>
    </>
  );
}