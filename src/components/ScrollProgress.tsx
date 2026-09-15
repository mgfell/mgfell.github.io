import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(percent);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
      <div
        className="
          h-full
          bg-gradient-to-r from-[var(--accent-deep)] via-[var(--accent)] to-[var(--accent-light)]
          shadow-[0_0_12px_rgba(255,42,61,0.7),0_0_24px_rgba(255,42,61,0.4)]
          transition-[width] duration-75 ease-out
        "
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}