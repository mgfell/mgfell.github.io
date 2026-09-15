import { COLORS } from './config';
import type { RGB } from './types';

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function colorAt(t: number, base: RGB): RGB {
  if (t <= 0) return base;

  if (t < 0.33) {
    const k = t / 0.33;
    return {
      r: Math.round(lerp(base.r, COLORS.soft.r, k)),
      g: Math.round(lerp(base.g, COLORS.soft.g, k)),
      b: Math.round(lerp(base.b, COLORS.soft.b, k)),
    };
  }

  if (t < 0.66) {
    const k = (t - 0.33) / 0.33;
    return {
      r: Math.round(lerp(COLORS.soft.r, COLORS.pink.r, k)),
      g: Math.round(lerp(COLORS.soft.g, COLORS.pink.g, k)),
      b: Math.round(lerp(COLORS.soft.b, COLORS.pink.b, k)),
    };
  }

  const k = (t - 0.66) / 0.34;
  return {
    r: Math.round(lerp(COLORS.pink.r, COLORS.hot.r, k)),
    g: Math.round(lerp(COLORS.pink.g, COLORS.hot.g, k)),
    b: Math.round(lerp(COLORS.pink.b, COLORS.hot.b, k)),
  };
}

export function mixColors(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}