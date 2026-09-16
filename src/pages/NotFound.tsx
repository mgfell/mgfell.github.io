import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';

export default function NotFound() {
  return (
    <>
      <ParticlesBackground />

      <div className="
        relative min-h-screen w-full
        flex flex-col items-center justify-center
        px-6
      ">
        <div className="
          font-['JetBrains_Mono',monospace] font-bold
          text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none
          text-white
          [text-shadow:0_0_60px_rgba(255,255,255,0.3),0_0_120px_rgba(255,255,255,0.1)]
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
            bg-white/[0.03] backdrop-blur-xl
            border border-white/[0.1]
            text-[var(--text)] text-sm tracking-wide
            font-['JetBrains_Mono',monospace] uppercase
            transition-all duration-300
            hover:border-white/30
            hover:bg-white/[0.06]
            hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
            hover:-translate-y-0.5
          "
        >
          ← Back home
        </Link>
      </div>
    </>
  );
}