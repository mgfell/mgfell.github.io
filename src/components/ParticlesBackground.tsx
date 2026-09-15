import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs = canvas as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;

    // ---------- НАСТРОЙКИ ----------
    const CONFIG = {
      density: 0.00020,
      maxParticles: 480,
      minDist: 4,
      linkDist: 115,
      cursorRadius: 160,
      cursorForce: 0.9,
      clickRadius: 120,
      clickForce: 8,
      spring: 0.045,
      damping: 0.88,
      maxSpeed: 12,
      bottomBias: 2.2,
      parallaxStrength: 0.35,
      heartRadius: 180,
      heartAttractRadius: 480,
      heartAttractForce: 0.08,
      heartSize: 320,
      heartOffsetRight: 0.05,
      twinkleSpeed: 0.02,
    };

    const COLORS = {
      base:   { r: 190, g: 195, b: 205 },
      hot:    { r: 255, g: 42,  b: 61 },
      heart:  { r: 255, g: 80,  b: 95 },
    };

    // ---------- СОСТОЯНИЕ ----------
    let particles: {
      x: number; y: number;
      hx: number; hy: number;
      vx: number; vy: number;
      r: number;
      baseAlpha: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }[] = [];

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999, active: false };
    let clicks: { x: number; y: number }[] = [];
    let scrollY = 0;
    let time = 0;

    const heart = { baseX: 0, baseY: 0, x: 0, y: 0 };

    const heartEl = document.querySelector('.bg-heart');

    function updateHeartBase() {
      const size = CONFIG.heartSize;
      heart.baseX = width - width * CONFIG.heartOffsetRight - size / 2;
      heart.baseY = height / 2;
      heart.x = heart.baseX;
      heart.y = heart.baseY;
    }

    function syncHeartPos() {
      const offsetY = -scrollY * CONFIG.parallaxStrength;
      heart.x = heart.baseX;
      heart.y = heart.baseY + offsetY;

      if (heartEl) {
        const half = CONFIG.heartSize / 2;
        (heartEl as HTMLElement).style.transform =
          `translate(${heart.x - half}px, ${heart.y - half}px)`;
      }
    }

    function createParticles() {
      particles = [];
      const target = Math.min(
        CONFIG.maxParticles,
        Math.floor(width * height * CONFIG.density)
      );

      const hr2 = CONFIG.heartRadius * CONFIG.heartRadius;

      let attempts = 0;
      while (particles.length < target && attempts < target * 30) {
        attempts++;

        const x = Math.random() * width;
        const randY = Math.pow(Math.random(), 1 / CONFIG.bottomBias);
        const y = randY * height;

        const dxh = x - heart.x;
        const dyh = y - heart.y;
        if (dxh * dxh + dyh * dyh < hr2) continue;

        let ok = true;
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - x;
          const dy = particles[i].y - y;
          if (dx * dx + dy * dy < CONFIG.minDist * CONFIG.minDist) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;

        particles.push({
          x, y,
          hx: x, hy: y,
          vx: 0, vy: 0,
          r: 0.3 + Math.random() * 1.0,
          baseAlpha: 0.2 + Math.random() * 0.4,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.6 + Math.random() * 1.2,
        });
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      cvs.width = width * dpr;
      cvs.height = height * dpr;
      cvs.style.width = width + 'px';
      cvs.style.height = height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateHeartBase();
      syncHeartPos();
      createParticles();
    }

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
      syncHeartPos();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      mouse.active = true;
    };

    const onTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const tag = ((e.target as HTMLElement).tagName || '').toLowerCase();
      if (tag === 'a' || tag === 'button') return;
      clicks.push({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('click', onClick);

    function updateParticles() {
      time += 1;

      const cr = CONFIG.cursorRadius;
      const cr2 = cr * cr;
      const clickR = CONFIG.clickRadius;
      const clickR2 = clickR * clickR;
      const hr2 = CONFIG.heartRadius * CONFIG.heartRadius;
      const har2 = CONFIG.heartAttractRadius * CONFIG.heartAttractRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cr2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const force = (1 - d / cr) * CONFIG.cursorForce;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        for (let c = 0; c < clicks.length; c++) {
          const cl = clicks[c];
          const dx = p.x - cl.x;
          const dy = p.y - cl.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < clickR2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const strength = 1 - d / clickR;
            const force = strength * CONFIG.clickForce;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        const dxh = heart.x - p.x;
        const dyh = heart.y - p.y;
        const dh2 = dxh * dxh + dyh * dyh;
        if (dh2 < har2 && dh2 > hr2) {
          const dh = Math.sqrt(dh2);
          const strength =
            1 - (dh - CONFIG.heartRadius) /
                (CONFIG.heartAttractRadius - CONFIG.heartRadius);
          const force = strength * CONFIG.heartAttractForce;
          p.vx += (dxh / dh) * force;
          p.vy += (dyh / dh) * force;
        }

        p.vx += (p.hx - p.x) * CONFIG.spring;
        p.vy += (p.hy - p.y) * CONFIG.spring;
        p.vx *= CONFIG.damping;
        p.vy *= CONFIG.damping;

        const sp = Math.hypot(p.vx, p.vy);
        if (sp > CONFIG.maxSpeed) {
          p.vx = (p.vx / sp) * CONFIG.maxSpeed;
          p.vy = (p.vy / sp) * CONFIG.maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;
      }

      clicks = [];
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function drawParticles() {
      context.clearRect(0, 0, width, height);

      const cr = CONFIG.cursorRadius;
      const cr2 = cr * cr;
      const ld = CONFIG.linkDist;
      const ld2 = ld * ld;
      const har = CONFIG.heartAttractRadius;
      const har2 = har * har;
      const offsetY = -scrollY * CONFIG.parallaxStrength;

      // ЛИНИИ
      context.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const py = p.y + offsetY;
        if (py < -50 || py > height + 50) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const qy = q.y + offsetY;
          if (qy < -50 || qy > height + 50) continue;

          const dx = p.x - q.x;
          const dy = py - qy;
          const d2 = dx * dx + dy * dy;
          if (d2 > ld2) continue;

          const d = Math.sqrt(d2);
          let lineAlpha = (1 - d / ld) * 0.15;

          if (mouse.active) {
            const mdx = (p.x + q.x) / 2 - mouse.x;
            const mdy = (py + qy) / 2 - mouse.y;
            const md2 = mdx * mdx + mdy * mdy;
            if (md2 < cr2) {
              const md = Math.sqrt(md2);
              lineAlpha += (1 - md / cr) * 0.35;
            }
          }

          if (lineAlpha <= 0.01) continue;

          let r = 200, g = 205, b = 215;

          const cx = (p.x + q.x) / 2;
          const cy = (py + qy) / 2;
          const dhx = cx - heart.x;
          const dhy = cy - heart.y;
          const dh2 = dhx * dhx + dhy * dhy;
          if (dh2 < har2) {
            const tH = 1 - Math.sqrt(dh2) / har;
            r = Math.round(lerp(r, COLORS.heart.r, tH * 0.6));
            g = Math.round(lerp(g, COLORS.heart.g, tH * 0.6));
            b = Math.round(lerp(b, COLORS.heart.b, tH * 0.6));
          }

          if (mouse.active) {
            const mdx = cx - mouse.x;
            const mdy = cy - mouse.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < cr) {
              const t = 1 - md / cr;
              r = Math.round(lerp(r, COLORS.hot.r, t));
              g = Math.round(lerp(g, COLORS.hot.g, t));
              b = Math.round(lerp(b, COLORS.hot.b, t));
            }
          }

          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          context.beginPath();
          context.moveTo(p.x, py);
          context.lineTo(q.x, qy);
          context.stroke();
        }
      }

      // ТОЧКИ
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const py = p.y + offsetY;
        if (py < -20 || py > height + 20) continue;

        const twinkle =
          Math.sin(time * CONFIG.twinkleSpeed * p.twinkleSpeed + p.twinklePhase) * 0.5 + 0.5;
        const twinkleMul = 0.7 + twinkle * 0.6;

        let tMouse = 0;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cr2) tMouse = 1 - Math.sqrt(d2) / cr;
        }

        const dhx = p.x - heart.x;
        const dhy = py - heart.y;
        const dh2 = dhx * dhx + dhy * dhy;
        let tHeart = 0;
        if (dh2 < har2) {
          tHeart = 1 - Math.sqrt(dh2) / har;
          tHeart *= 0.55;
        }

        let r = Math.round(lerp(COLORS.base.r, COLORS.heart.r, tHeart));
        let g = Math.round(lerp(COLORS.base.g, COLORS.heart.g, tHeart));
        let b = Math.round(lerp(COLORS.base.b, COLORS.heart.b, tHeart));

        if (tMouse > 0) {
          r = Math.round(lerp(r, COLORS.hot.r, tMouse));
          g = Math.round(lerp(g, COLORS.hot.g, tMouse));
          b = Math.round(lerp(b, COLORS.hot.b, tMouse));
        }

        const alpha = Math.min(1, p.baseAlpha * twinkleMul + tMouse * 0.5 + tHeart * 0.2);
        const radius = p.r + tMouse * 0.8 + tHeart * 0.3;

        const glowStrength = Math.max(tMouse, tHeart * 0.5);
        if (glowStrength > 0.2) {
          const glowR = radius + 6 * glowStrength;
          const grd = context.createRadialGradient(p.x, py, 0, p.x, py, glowR);
          grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.35 * glowStrength})`);
          grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          context.fillStyle = grd;
          context.beginPath();
          context.arc(p.x, py, glowR, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.beginPath();
        context.arc(p.x, py, radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    let rafId = 0;
    function loop() {
      updateParticles();
      drawParticles();
      rafId = requestAnimationFrame(loop);
    }

    updateHeartBase();
    syncHeartPos();
    resize();
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none block"
        style={{ zIndex: -1 }}
    />
  );
}