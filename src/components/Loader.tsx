import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return sessionStorage.getItem('mgfell_visited') ? 80 : 0;
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('mgfell_visited', '1');

    let current = progress;
    const interval = setInterval(() => {
      const step = current < 60 ? 4 : current < 85 ? 2 : 0.8;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 400);
      }
    }, 40);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[200]
        flex items-center justify-center flex-col gap-6
        bg-[var(--bg-0)]
        transition-opacity duration-700
        ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="
        font-['JetBrains_Mono',monospace] font-bold
        text-4xl tracking-[6px]
        text-[var(--text)]
        [text-shadow:0_0_30px_rgba(255,42,61,0.4)]
      ">
        mgfell
      </div>

      <div className="
        relative w-[220px] h-[2px]
        bg-white/5 overflow-hidden rounded-full
      ">
        <div
          className="
            absolute top-0 left-0 h-full
            bg-gradient-to-r from-[var(--accent-deep)] via-[var(--accent)] to-[var(--accent-light)]
            shadow-[0_0_12px_rgba(255,42,61,0.8)]
            transition-[width] duration-75 ease-out
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="
        font-['JetBrains_Mono',monospace]
        text-[0.7rem] tracking-[3px]
        text-[var(--muted)]
      ">
        {Math.round(progress)}%
      </div>
    </div>
  );
}