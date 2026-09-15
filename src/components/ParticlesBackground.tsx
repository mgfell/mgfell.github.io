import { useRef } from 'react';
import { useParticles } from './particles/useParticles';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ready = useParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className={`
        absolute top-0 left-0 w-full pointer-events-none block
        transition-opacity duration-1000
        ${ready ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ zIndex: -1 }}
    />
  );
}