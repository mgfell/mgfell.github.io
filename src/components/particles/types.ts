export type Particle = {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  layer: number;
};

export type Click = {
  x: number;
  y: number;
  life: number;
};

export type Mouse = {
  x: number;
  y: number;
  active: boolean;
};

export type Heart = {
  x: number;
  y: number;
  size: number;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};