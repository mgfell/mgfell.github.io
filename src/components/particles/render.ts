import { CONFIG, COLORS, LINK_BASE_COLOR } from './config';
import { colorAt, mixColors } from './color';
import type { Particle, Mouse, Heart, RGB } from './types';

export function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  mouse: Mouse,
  heart: Heart,
  width: number,
  height: number,
  time: number,
  scrollY: number
) {
  const docHeight = Math.max(height, document.documentElement.scrollHeight);

  context.clearRect(0, 0, width, docHeight);

  const cr = CONFIG.cursorRadius;
  const cr2 = cr * cr;
  const ld = CONFIG.linkDist;
  const ld2 = ld * ld;
  const har = CONFIG.heartAttractRadius;
  const har2 = har * har;

  const mouseWorldY = mouse.active ? mouse.y + scrollY : -99999;
  const heartWorldY = heart.y + scrollY;

  context.lineWidth = 0.5;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > ld2) continue;

      const d = Math.sqrt(d2);
      let lineAlpha = (1 - d / ld) * 0.16;

      if (mouse.active) {
        const mdx = (p.x + q.x) / 2 - mouse.x;
        const mdy = (p.y + q.y) / 2 - mouseWorldY;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < cr2) {
          const md = Math.sqrt(md2);
          lineAlpha += (1 - md / cr) * 0.4;
        }
      }

      if (lineAlpha <= 0.01) continue;

      let col: RGB = { ...LINK_BASE_COLOR };

      const cx = (p.x + q.x) / 2;
      const cy = (p.y + q.y) / 2;
      const dhx = cx - heart.x;
      const dhy = cy - heartWorldY;
      const dh2 = dhx * dhx + dhy * dhy;
      if (dh2 < har2) {
        const tH = 1 - Math.sqrt(dh2) / har;
        col = mixColors(col, COLORS.heart, tH * 0.6);
      }

      if (mouse.active) {
        const mdx = cx - mouse.x;
        const mdy = cy - mouseWorldY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < cr) {
          const t = 1 - md / cr;
          col = colorAt(t, col);
        }
      }

      context.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${lineAlpha})`;
      context.beginPath();
      context.moveTo(p.x, p.y);
      context.lineTo(q.x, q.y);
      context.stroke();
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    const twinkle =
      Math.sin(time * CONFIG.twinkleSpeed * p.twinkleSpeed + p.twinklePhase) * 0.5 + 0.5;
    const twinkleMul = 0.6 + twinkle * 0.8;

    let tMouse = 0;
    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouseWorldY;
      const d2 = dx * dx + dy * dy;
      if (d2 < cr2) tMouse = 1 - Math.sqrt(d2) / cr;
    }

    const dhx = p.x - heart.x;
    const dhy = p.y - heartWorldY;
    const dh2 = dhx * dhx + dhy * dhy;
    let tHeart = 0;
    if (dh2 < har2) {
      tHeart = (1 - Math.sqrt(dh2) / har) * 0.5;
    }

    const baseCol: RGB = { ...COLORS.base };
    let col = colorAt(tMouse, baseCol);

    if (tHeart > 0) {
      col = mixColors(col, COLORS.heart, tHeart);
    }

    const pulse = tMouse > 0.3 ? 1 + Math.sin(time * 0.15 + i) * 0.15 : 1;
    const alpha = Math.min(
      1,
      p.baseAlpha * twinkleMul + tMouse * 0.5 + tHeart * 0.2
    );
    const radius = (p.r + tMouse * 0.9 + tHeart * 0.3) * pulse;

    const glowStrength = Math.max(tMouse, tHeart * 0.5);
    if (glowStrength > 0.15) {
      const glow1 = radius + 6 * glowStrength;
      const g1 = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow1);
      g1.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${0.4 * glowStrength})`);
      g1.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);
      context.fillStyle = g1;
      context.beginPath();
      context.arc(p.x, p.y, glow1, 0, Math.PI * 2);
      context.fill();

      const glow2 = radius + 14 * glowStrength;
      const g2 = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow2);
      g2.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${0.15 * glowStrength})`);
      g2.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);
      context.fillStyle = g2;
      context.beginPath();
      context.arc(p.x, p.y, glow2, 0, Math.PI * 2);
      context.fill();
    }

    context.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
    context.beginPath();
    context.arc(p.x, p.y, radius, 0, Math.PI * 2);
    context.fill();
  }
}