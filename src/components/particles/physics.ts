import { CONFIG } from './config';
import type { Particle, Mouse, Click, Heart } from './types';

export function pickLayer(): number {
  const r = Math.random();
  if (r < 0.55) return 0;
  if (r < 0.85) return 1;
  return 2;
}

export function makeParticle(
  width: number,
  yMin: number,
  yMax: number,
  heart: Heart
): Particle | null {
  const x = Math.random() * width;
  const y = yMin + Math.random() * (yMax - yMin);

  const dxh = x - heart.x;
  const dyh = y - heart.y;
  if (dxh * dxh + dyh * dyh < CONFIG.heartRadius * CONFIG.heartRadius) {
    return null;
  }

  const layer = pickLayer();
  const r =
    layer === 0 ? 0.25 + Math.random() * 0.35 :
    layer === 1 ? 0.5 + Math.random() * 0.55 :
                  0.9 + Math.random() * 0.9;

  return {
    x, y,
    hx: x, hy: y,
    vx: 0, vy: 0,
    r,
    baseAlpha: 0.18 + Math.random() * 0.42,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.5 + Math.random() * 1.6,
    layer,
  };
}

export function createParticles(
  width: number,
  height: number,
  heart: Heart
): Particle[] {
  const particles: Particle[] = [];
  const docHeight = Math.max(height, document.documentElement.scrollHeight);

  const target = Math.min(
    CONFIG.maxParticles,
    Math.floor(width * docHeight * CONFIG.density)
  );

  let attempts = 0;
  while (particles.length < target && attempts < target * 30) {
    attempts++;
    const p = makeParticle(width, 0, docHeight, heart);
    if (!p) continue;

    let tooClose = false;
    for (let i = 0; i < particles.length; i++) {
      const dx = particles[i].x - p.x;
      const dy = particles[i].y - p.y;
      if (dx * dx + dy * dy < CONFIG.minDist * CONFIG.minDist) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    particles.push(p);
  }

  return particles;
}

export function updateParticles(
  particles: Particle[],
  mouse: Mouse,
  clicks: Click[],
  heart: Heart,
  width: number,
  height: number,
  scrollY: number
) {
  const cr = CONFIG.cursorRadius;
  const cr2 = cr * cr;
  const clickR = CONFIG.clickRadius;
  const clickR2 = clickR * clickR;
  const magnetR = CONFIG.magnetRadius;
  const magnetR2 = magnetR * magnetR;
  const har2 = CONFIG.heartAttractRadius * CONFIG.heartAttractRadius;
  const hr2 = CONFIG.heartRadius * CONFIG.heartRadius;

  const docHeight = Math.max(height, document.documentElement.scrollHeight);
  const mouseWorldY = mouse.active ? mouse.y + scrollY : -99999;
  const heartWorldY = heart.y + scrollY;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouseWorldY;
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
      const clWorldY = cl.y + scrollY;
      const dx = p.x - cl.x;
      const dy = p.y - clWorldY;
      const d2 = dx * dx + dy * dy;

      if (cl.life > CONFIG.magnetDuration * 0.5) {
        if (d2 < magnetR2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const force = (1 - d / magnetR) * CONFIG.magnetForce;
          p.vx -= (dx / d) * force;
          p.vy -= (dy / d) * force;
        }
      } else {
        if (d2 < clickR2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const strength = 1 - d / clickR;
          const force = strength * CONFIG.clickForce;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
      }
    }

    const dxh = heart.x - p.x;
    const dyh = heartWorldY - p.y;
    const dh2 = dxh * dxh + dyh * dyh;
    if (dh2 < har2 && dh2 > hr2) {
      const dh = Math.sqrt(dh2);
      const strength =
        1 - (dh - CONFIG.heartRadius) /
            (CONFIG.heartAttractRadius - CONFIG.heartRadius);
      const force = strength * 0.06;
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

    if (p.x < -50) p.x = width + 50;
    if (p.x > width + 50) p.x = -50;

    if (p.y < -50) p.y = docHeight + 50;
    if (p.y > docHeight + 50) p.y = -50;
  }

  for (let c = clicks.length - 1; c >= 0; c--) {
    clicks[c].life -= 1;
    if (clicks[c].life <= 0) clicks.splice(c, 1);
  }
}