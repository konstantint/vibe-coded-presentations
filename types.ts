export enum VisualMode {
  GRID = 'GRID',
  CHAOS = 'CHAOS',
  FLOW = 'FLOW',
  NETWORK = 'NETWORK',
  CONVERGENCE = 'CONVERGENCE',
  EXPLOSION = 'EXPLOSION'
}

export interface Beat {
  id: number;
  title: string;
  subtitle?: string;
  body?: string;
  visualMode: VisualMode;
  codeSnippet?: string;
  highlightColor: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  alpha: number;
}