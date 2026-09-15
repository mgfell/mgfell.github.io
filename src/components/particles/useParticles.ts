import { useEffect, useRef, useState } from 'react';
import { CONFIG } from './config';
import { createParticles, updateParticles } from './physics';
import { drawParticles } from './render';
import type { Particle, Mouse, Click, Heart } from './types';

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [ready, setReady] = useState(false);

  const stateRef = useRef({
    particles: [] as Particle[],
    mouse: { x: -9999, y: -9999, active: false } as Mouse,
    clicks: [] as Click[],
    time: 0,
    width: 0,
    height: 0,
    docHeight: 0,
    scrollY: 0,
    heart: { x: 0, y: 0, size: CONFIG.heartSize } as Heart,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs = canvas as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;
    const S = stateRef.current;

    const heartEl = document.querySelector('.bg-heart');

    function updateHeartBase() {
      S.heart.x = S.width - S.width * CONFIG.heartOffsetRight - CONFIG.heartSize / 2;
      S.heart.y = S.height / 2;
    }

    function syncHeartDom() {
      if (!heartEl) return;
      const half = CONFIG.heartSize / 2;
      (heartEl as HTMLElement).style.transform =
        `translate(${S.heart.x - half}px, ${S.heart.y - half}px)`;
    }

    function resize() {
      S.width = window.innerWidth;
      S.height = window.innerHeight;
      S.scrollY = window.scrollY || window.pageYOffset || 0;
      S.docHeight = Math.max(S.height, document.documentElement.scrollHeight);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      cvs.width = S.width * dpr;
      cvs.height = S.docHeight * dpr;
      cvs.style.width = S.width + 'px';
      cvs.style.height = S.docHeight + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateHeartBase();
      syncHeartDom();
      S.particles = createParticles(S.width, S.height, S.heart);
    }

    const onScroll = () => {
      S.scrollY = window.scrollY || window.pageYOffset || 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      S.mouse.x = e.clientX;
      S.mouse.y = e.clientY;
      S.mouse.active = true;
    };

    const onMouseLeave = () => {
      S.mouse.active = false;
      S.mouse.x = -9999;
      S.mouse.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      S.mouse.x = t.clientX;
      S.mouse.y = t.clientY;
      S.mouse.active = true;
    };

    const onTouchEnd = () => {
      S.mouse.active = false;
      S.mouse.x = -9999;
      S.mouse.y = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const tag = ((e.target as HTMLElement).tagName || '').toLowerCase();
      if (tag === 'a' || tag === 'button') return;
      S.clicks.push({
        x: e.clientX,
        y: e.clientY,
        life: CONFIG.magnetDuration,
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('click', onClick);

    let rafId = 0;
    function loop() {
      S.time += 1;

      updateParticles(
        S.particles,
        S.mouse,
        S.clicks,
        S.heart,
        S.width,
        S.height,
        S.scrollY
      );

      drawParticles(
        context,
        S.particles,
        S.mouse,
        S.heart,
        S.width,
        S.height,
        S.time,
        S.scrollY
      );

      rafId = requestAnimationFrame(loop);
    }

    updateHeartBase();
    syncHeartDom();
    resize();
    loop();

    const checkResize = setInterval(() => {
      const newDoc = Math.max(S.height, document.documentElement.scrollHeight);
      if (newDoc !== S.docHeight) {
        resize();
      }
    }, 500);

    requestAnimationFrame(() => {
      setTimeout(() => setReady(true), 100);
    });

    return () => {
      clearInterval(checkResize);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('click', onClick);
    };
  }, [canvasRef]);

  return ready;
}