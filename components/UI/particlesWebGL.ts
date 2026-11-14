export type ParticleShape = "circle" | "square" | "ring" | "sparkle";
export type ParticleHoverEffect = "parallax" | "repel" | "attract";
export type ParticleDrift = "none" | "up" | "down" | "forward";

export const SHAPES: Record<ParticleShape, number> = {
  circle: 0,
  square: 1,
  ring: 2,
  sparkle: 3,
};

export const EFFECTS: Record<ParticleHoverEffect, number> = {
  parallax: 0,
  repel: 1,
  attract: 2,
};

export const DRIFTS: Record<ParticleDrift, number> = {
  none: 0,
  up: 1,
  down: 2,
  forward: 3,
};

export const MAX_COUNT = 20000;
export const MAX_LINKED = 900;
export const MAX_LINES = 9000;
export const MAX_BURSTS = 4;
export const DEPTH = 10;
export const FOCAL = 1 / Math.tan((7.5 * Math.PI) / 180);
export const NEAR = 0.1;
export const FAR = 100;
export const INTRO_SECONDS = 1.8;
export const BURST_SECONDS = 1.5;
export const BURST_SPEED = 520;
export const BURST_WIDTH = 46;

export const PARTICLE_VERTEX = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec3 aPosition;
layout(location = 2) in vec4 aRandom;
layout(location = 3) in vec3 aColor;
uniform mat3 uRotation;
uniform vec3 uOffset;
uniform float uSpread;
uniform float uTime;
uniform float uCamera;
uniform float uAspect;
uniform vec2 uView;
uniform float uRatio;
uniform float uSize;
uniform float uRandomness;
uniform float uBlur;
uniform float uFocus;
uniform float uGlow;
uniform float uTwinkle;
uniform int uShape;
uniform int uDrift;
uniform float uTravel;
uniform float uScroll;
uniform vec4 uPointer;
uniform int uEffect;
uniform float uStrength;
uniform vec4 uBursts[${MAX_BURSTS}];
uniform int uBurstCount;
uniform float uReveal;
out vec2 vLocal;
out float vRadius;
out float vBlur;
out float vAlpha;
out float vHalo;
out float vSeed;
out vec3 vColor;

vec3 bob(vec4 r, float t) {
  return vec3(
    sin(t * r.z + 6.28 * r.w) * mix(0.1, 1.5, r.x),
    sin(t * r.y + 6.28 * r.x) * mix(0.1, 1.5, r.w),
    sin(t * r.w + 6.28 * r.y) * mix(0.1, 1.5, r.z)
  );
}

void main() {
  vec3 pos = aPosition * uSpread;
  pos.z *= ${DEPTH.toFixed(1)};
  vec3 wobble = bob(aRandom, uTime);
  vec3 world = uRotation * pos + uOffset + wobble;
  float edge = 1.0;
  if (uDrift == 1 || uDrift == 2) {
    float span = uSpread * 2.0 + 3.0;
    float k = mod(aRandom.w * span + uOffset.y + uScroll + wobble.y + (uDrift == 1 ? uTravel : -uTravel), span);
    world.y = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.12, k) * smoothstep(0.0, span * 0.12, span - k);
  } else if (uDrift == 3) {
    float span = uSpread * ${DEPTH.toFixed(1)} * 2.0 + 3.0;
    float k = mod(aRandom.y * span + uOffset.z + wobble.z + uTravel, span);
    world.z = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.1, k);
    if (uScroll != 0.0) {
      float spanY = uSpread * 2.0 + 3.0;
      float ky = mod(world.y + spanY * 0.5 + uScroll, spanY);
      world.y = ky - spanY * 0.5;
      edge *= smoothstep(0.0, spanY * 0.12, ky) * smoothstep(0.0, spanY * 0.12, spanY - ky);
    }
  } else if (uScroll != 0.0) {
    float span = uSpread * 2.0 + 3.0;
    float k = mod(world.y + span * 0.5 + uScroll, span);
    world.y = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.12, k) * smoothstep(0.0, span * 0.12, span - k);
  }
  vec3 view = world - vec3(0.0, 0.0, uCamera);
  float dist = length(view);
  float ahead = -view.z;
  if (ahead < ${NEAR.toFixed(2)} || ahead > ${FAR.toFixed(1)}) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  edge *= smoothstep(1.0, 4.0, ahead);
  vec2 ndc = vec2(view.x * ${FOCAL.toFixed(
    6,
  )} / uAspect, view.y * ${FOCAL.toFixed(6)}) / ahead;
  vec2 screen = (ndc * 0.5 + 0.5) * uView;

  vec2 shift = vec2(0.0);
  float flash = 0.0;
  if (uEffect != 0 && uPointer.z > 0.001) {
    vec2 delta = screen - uPointer.xy;
    float reach = length(delta);
    float falloff = exp(-dot(delta, delta) / (uPointer.w * uPointer.w));
    vec2 away = reach > 0.001 ? delta / reach : vec2(0.0);
    shift += (uEffect == 1 ? away * uPointer.w * 0.5 : -delta * 0.6) * falloff * uStrength * uPointer.z;
  }
  for (int i = 0; i < ${MAX_BURSTS}; i++) {
    if (i >= uBurstCount) break;
    vec4 burst = uBursts[i];
    vec2 delta = screen - burst.xy;
    float reach = length(delta);
    float wave = exp(-pow((reach - burst.z * ${BURST_SPEED.toFixed(
      1,
    )}) / ${BURST_WIDTH.toFixed(1)}, 2.0));
    vec2 away = reach > 0.001 ? delta / reach : vec2(0.0);
    float fade = (1.0 - burst.z) * (1.0 - burst.z) * burst.w;
    shift += away * wave * fade * 56.0 * smoothstep(0.0, 30.0, reach);
    flash += wave * fade;
  }
  screen += shift;

  float diameter = (uRandomness <= 0.0 ? uSize : uSize * (1.0 + uRandomness * (aRandom.x - 0.5)) / dist) * (1.0 + min(flash, 1.0) * 0.6);
  float device = diameter * uRatio;
  float radius = max(diameter, 1.0 / uRatio) * 0.5;
  float coverage = min(1.0, device * device);
  float blur = uBlur * max(uFocus - dist, 0.0) / max(dist, 1.0);
  float halo = uGlow > 0.0 ? radius * 2.5 + 2.0 : 0.0;
  float extent = radius * (uShape == 3 ? 1.6 : 1.0) + blur + halo + 1.5;

  float twinkle = 1.0 - uTwinkle * 0.6 * (0.5 + 0.5 * sin(uTime * (6.0 + aRandom.y * 14.0) + aRandom.w * 40.0));
  float far = 1.0 - smoothstep(${(FAR * 0.9).toFixed(1)}, ${FAR.toFixed(
    1,
  )}, ahead);
  float focus = radius / (radius + blur);
  float reveal = clamp(uReveal * 1.6 - aRandom.z * 0.6, 0.0, 1.0);

  vLocal = aCorner * extent;
  vRadius = radius;
  vBlur = blur;
  vHalo = halo;
  vSeed = aRandom.y;
  vAlpha = min(1.0, coverage * twinkle * (1.0 + flash * 1.4)) * far * edge * max(focus, 0.35) * reveal * reveal;
  vColor = aColor;
  gl_Position = vec4((screen + aCorner * extent) / uView * 2.0 - 1.0, 0.0, 1.0);
}`;

export const PARTICLE_FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform int uShape;
uniform float uGlow;
uniform float uRatio;
uniform float uTime;
uniform float uSoft;
uniform float uShimmer;
uniform float uOpacity;
in vec2 vLocal;
in float vRadius;
in float vBlur;
in float vAlpha;
in float vHalo;
in float vSeed;
in vec3 vColor;
out vec4 outColor;

float ray(vec2 q, float aa) {
  float width = 0.14 * max(0.0, 1.0 - q.x);
  return (1.0 - smoothstep(width - aa, width + aa, q.y)) * step(q.x, 1.0);
}

void main() {
  float soft = vBlur + 0.7 / uRatio + vRadius * uSoft;
  float d = length(vLocal);
  float shape;
  if (uShape == 1) {
    float box = max(abs(vLocal.x), abs(vLocal.y));
    shape = 1.0 - smoothstep(vRadius * 0.86 - soft, vRadius * 0.86 + soft, box);
  } else if (uShape == 2) {
    float edge = max(vRadius * 0.22, 0.6 / uRatio);
    shape = 1.0 - smoothstep(edge - soft, edge + soft, abs(d - vRadius * 0.8));
  } else if (uShape == 3) {
    float reach = vRadius * 1.6;
    vec2 q = abs(vLocal) / max(reach, 0.0001);
    float aa = soft / max(reach, 0.0001);
    shape = max(max(ray(q, aa), ray(q.yx, aa)), 1.0 - smoothstep(vRadius * 0.32 - soft, vRadius * 0.32 + soft, d));
  } else {
    shape = 1.0 - smoothstep(vRadius - soft, vRadius + soft, d);
  }
  float halo = vHalo > 0.0 ? exp(-d / (vHalo * 0.35)) * uGlow * 0.4 : 0.0;
  float alpha = clamp(shape + halo * (1.0 - shape), 0.0, 1.0) * vAlpha * uOpacity * (1.0 - uSoft);
  if (alpha < 0.002) discard;
  vec2 uv = vLocal / max(vRadius * 2.0, 0.0001) + 0.5;
  vec3 color = clamp(vColor + uShimmer * 0.2 * sin(uv.yxx + uTime + vSeed * 6.28), 0.0, 1.0);
  outColor = vec4(color * alpha, alpha);
}`;

export const LINE_VERTEX = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec4 aEnds;
layout(location = 2) in vec4 aTint;
uniform vec2 uView;
uniform float uRatio;
uniform float uWidth;
out float vAcross;
out float vHalf;
out vec4 vTint;

void main() {
  vec2 a = aEnds.xy;
  vec2 b = aEnds.zw;
  vec2 along = b - a;
  float span = max(length(along), 0.0001);
  vec2 normal = vec2(-along.y, along.x) / span;
  float reach = uWidth * 0.5 + 1.0 / uRatio;
  vec2 point = mix(a, b, aCorner.x * 0.5 + 0.5) + normal * aCorner.y * reach;
  vAcross = aCorner.y * reach;
  vHalf = uWidth * 0.5;
  vTint = aTint;
  gl_Position = vec4(point / uView * 2.0 - 1.0, 0.0, 1.0);
}`;

export const LINE_FRAGMENT = `#version 300 es
precision highp float;
uniform float uRatio;
uniform float uOpacity;
in float vAcross;
in float vHalf;
in vec4 vTint;
out vec4 outColor;

void main() {
  float edge = 0.6 / uRatio;
  float cover = 1.0 - smoothstep(vHalf - edge, vHalf + edge, abs(vAcross));
  float alpha = cover * vTint.a * uOpacity;
  outColor = vec4(vTint.rgb * alpha, alpha);
}`;

export type ParticleSettings = {
  count: number;
  spread: number;
  speed: number;
  colors: string[];
  mouse: boolean;
  hoverFactor: number;
  soft: boolean;
  size: number;
  randomness: number;
  camera: number;
  rotate: boolean;
  dpr?: number;
  shape: number;
  glow: number;
  twinkle: number;
  depthOfField: number;
  connections: boolean;
  connectionDistance: number;
  hoverEffect: number;
  hoverRadius: number;
  clickBurst: boolean;
  drift: number;
  driftSpeed: number;
  variation: number;
  intro: boolean;
  opacity: number;
  lightMode: boolean;
  paused: boolean;
  scrollParallax: number;
};

export type LinkedProgram = {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
};

export type ParticleBurst = {
  x: number;
  y: number;
  age: number;
};

export type ParticleCloudState = {
  key: string;
  count: number;
  positions: Float32Array;
  randoms: Float32Array;
  colors: Float32Array;
};

export type ScreenProjectionBuffers = {
  x: Float32Array;
  y: Float32Array;
  ahead: Float32Array;
  alpha: Float32Array;
};

export type ViewMetrics = {
  width: number;
  height: number;
  ratio: number;
};

export type PointerState = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  nx: number;
  ny: number;
  inside: boolean;
  active: number;
};

export type SimulationState = {
  clock: number;
  spin: number;
  travel: number;
  offsetX: number;
  offsetY: number;
  scrollY: number;
  reveal: number;
};

type RgbTuple = [number, number, number];

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const easeOut = (t: number): number =>
  1 - Math.pow(1 - clamp(t, 0, 1), 3);

export const wrap = (value: number, span: number): number =>
  ((value % span) + span) % span;

const seeded = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

export const linkProgram = (
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): LinkedProgram | null => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = Number(gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS));
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) {
      uniforms[info.name.replace("[0]", "")] = gl.getUniformLocation(
        program,
        info.name,
      );
    }
  }
  return { program, uniforms };
};

const toInkColor = (rgb: RgbTuple): RgbTuple => {
  const linear: RgbTuple = [
    Math.pow(rgb[0], 2.2),
    Math.pow(rgb[1], 2.2),
    Math.pow(rgb[2], 2.2),
  ];
  const tone = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  const depth = Math.min(1, 0.06 / Math.max(tone, 0.0001));
  return [
    Math.pow(linear[0] * depth, 1 / 2.2),
    Math.pow(linear[1] * depth, 1 / 2.2),
    Math.pow(linear[2] * depth, 1 / 2.2),
  ];
};

export const createColorParser = (): ((value: string) => RgbTuple) => {
  const probe = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true });
  const cache = new Map<string, RgbTuple>();

  return (value: string): RgbTuple => {
    const cached = cache.get(value);
    if (cached) return cached;
    let rgb: RgbTuple = [1, 1, 1];
    if (probe) {
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = "#ffffff";
      probe.fillStyle = value;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      rgb = [r / 255, g / 255, b / 255];
    }
    cache.set(value, rgb);
    return rgb;
  };
};

export const buildParticleCloudData = (
  settings: ParticleSettings,
  parseColor: (value: string) => RgbTuple,
): {
  positions: Float32Array;
  randoms: Float32Array;
  tints: Float32Array;
} => {
  const next = seeded(settings.variation * 7919 + 1);
  const total = settings.count;
  const positions = new Float32Array(total * 3);
  const randoms = new Float32Array(total * 4);
  const tints = new Float32Array(total * 3);
  const swatches = settings.colors.map((value) =>
    settings.lightMode ? toInkColor(parseColor(value)) : parseColor(value),
  );

  for (let i = 0; i < total; i++) {
    let x: number;
    let y: number;
    let z: number;
    let len: number;
    do {
      x = next() * 2 - 1;
      y = next() * 2 - 1;
      z = next() * 2 - 1;
      len = x * x + y * y + z * z;
    } while (len > 1 || len === 0);
    const r = Math.cbrt(next());
    positions.set([x * r, y * r, z * r], i * 3);
    randoms.set([next(), next(), next(), next()], i * 4);
    tints.set(swatches[Math.floor(next() * swatches.length)], i * 3);
  }

  return { positions, randoms, tints };
};

export const computeRotationMatrix = (
  settings: ParticleSettings,
  clock: number,
  spin: number,
): number[] => {
  const elapsed = clock * 1000;
  const x = settings.rotate ? Math.sin(elapsed * 0.0002) * 0.1 : 0;
  const y = settings.rotate ? Math.cos(elapsed * 0.0005) * 0.15 : 0;
  const z = settings.rotate ? spin : 0;
  const [sx, cx, sy, cy, sz, cz] = [
    Math.sin(x),
    Math.cos(x),
    Math.sin(y),
    Math.cos(y),
    Math.sin(z),
    Math.cos(z),
  ];
  return [
    cy * cz + sy * sx * sz,
    cx * sz,
    -sy * cz + cy * sx * sz,
    -cy * sz + sy * sx * cz,
    cx * cz,
    sy * sz + cy * sx * cz,
    sy * cx,
    -sx,
    cy * cx,
  ];
};

const smoothEdge = (value: number, band: number): number => {
  const t = clamp(value / band, 0, 1);
  return t * t * (3 - 2 * t);
};

export const buildConnectionLines = (params: {
  settings: ParticleSettings;
  matrix: number[];
  offset: [number, number, number];
  scrollOffset: number;
  cloud: ParticleCloudState;
  screen: ScreenProjectionBuffers;
  view: ViewMetrics;
  pointer: PointerState;
  state: SimulationState;
  bursts: ParticleBurst[];
  lineData: Float32Array;
}): number => {
  const {
    settings,
    matrix,
    offset,
    scrollOffset,
    cloud,
    screen,
    view,
    pointer,
    state,
    bursts,
    lineData,
  } = params;

  const total = Math.min(cloud.count, MAX_LINKED);
  const [ox, oy, oz] = offset;
  const aspect = view.width / view.height;
  const time = state.clock;
  const radius = settings.hoverRadius;
  const active = settings.hoverEffect !== 0 ? pointer.active : 0;
  const spanY = settings.spread * 2 + 3;
  const spanZ = settings.spread * DEPTH * 2 + 3;

  for (let i = 0; i < total; i++) {
    const px = cloud.positions[i * 3] * settings.spread;
    const py = cloud.positions[i * 3 + 1] * settings.spread;
    const pz = cloud.positions[i * 3 + 2] * settings.spread * DEPTH;
    const r0 = cloud.randoms[i * 4];
    const r1 = cloud.randoms[i * 4 + 1];
    const r2 = cloud.randoms[i * 4 + 2];
    const r3 = cloud.randoms[i * 4 + 3];
    const bobX = Math.sin(time * r2 + 6.28 * r3) * (0.1 + 1.4 * r0);
    const bobY = Math.sin(time * r1 + 6.28 * r0) * (0.1 + 1.4 * r3);
    const bobZ = Math.sin(time * r3 + 6.28 * r1) * (0.1 + 1.4 * r2);
    const wx = matrix[0] * px + matrix[3] * py + matrix[6] * pz + ox + bobX;
    let wy = matrix[1] * px + matrix[4] * py + matrix[7] * pz + oy + bobY;
    let wz = matrix[2] * px + matrix[5] * py + matrix[8] * pz + oz + bobZ;
    let edge = 1;

    if (settings.drift === 1 || settings.drift === 2) {
      const k = wrap(
        r3 * spanY +
          oy +
          scrollOffset +
          bobY +
          (settings.drift === 1 ? state.travel : -state.travel),
        spanY,
      );
      wy = k - spanY / 2;
      edge = smoothEdge(k, spanY * 0.12) * smoothEdge(spanY - k, spanY * 0.12);
    } else if (settings.drift === 3) {
      const k = wrap(r1 * spanZ + oz + bobZ + state.travel, spanZ);
      wz = k - spanZ / 2;
      edge = smoothEdge(k, spanZ * 0.1);
      if (scrollOffset !== 0) {
        const ky = wrap(wy + spanY / 2 + scrollOffset, spanY);
        wy = ky - spanY / 2;
        edge *=
          smoothEdge(ky, spanY * 0.12) * smoothEdge(spanY - ky, spanY * 0.12);
      }
    } else if (scrollOffset !== 0) {
      const ky = wrap(wy + spanY / 2 + scrollOffset, spanY);
      wy = ky - spanY / 2;
      edge =
        smoothEdge(ky, spanY * 0.12) * smoothEdge(spanY - ky, spanY * 0.12);
    }

    const ahead = settings.camera - wz;
    if (ahead < NEAR || ahead > FAR) {
      screen.alpha[i] = 0;
      continue;
    }

    edge *= smoothEdge(ahead - 1, 3);
    let sx =
      ((wx * FOCAL) / aspect / ahead) * 0.5 * view.width + view.width / 2;
    let sy = ((wy * FOCAL) / ahead) * 0.5 * view.height + view.height / 2;
    let dx = 0;
    let dy = 0;

    if (active > 0.001) {
      const ex = sx - pointer.sx;
      const ey = sy - pointer.sy;
      const reach = Math.hypot(ex, ey);
      const falloff =
        Math.exp(-(ex * ex + ey * ey) / (radius * radius)) *
        settings.hoverFactor *
        active;
      if (settings.hoverEffect === 1 && reach > 0.001) {
        dx += (ex / reach) * radius * 0.5 * falloff;
        dy += (ey / reach) * radius * 0.5 * falloff;
      } else if (settings.hoverEffect === 2) {
        dx -= ex * 0.6 * falloff;
        dy -= ey * 0.6 * falloff;
      }
    }

    for (const burst of bursts) {
      const progress = burst.age / BURST_SECONDS;
      const ex = sx - burst.x;
      const ey = sy - burst.y;
      const reach = Math.hypot(ex, ey);
      if (reach < 0.001) continue;
      const wave = Math.exp(
        -Math.pow((reach - progress * BURST_SPEED) / BURST_WIDTH, 2),
      );
      const ramp = smoothEdge(reach, 30);
      const push = wave * (1 - progress) * (1 - progress) * 56 * ramp;
      dx += (ex / reach) * push;
      dy += (ey / reach) * push;
    }

    sx += dx;
    sy += dy;
    const far = smoothEdge(FAR - ahead, FAR - FAR * 0.9);
    const reveal = clamp(state.reveal * 1.6 - r2 * 0.6, 0, 1);
    screen.x[i] = sx;
    screen.y[i] = sy;
    screen.ahead[i] = ahead;
    screen.alpha[i] = far * edge * reveal * reveal;
  }

  const reach = settings.connectionDistance;
  const columns = Math.max(1, Math.ceil(view.width / reach) + 2);
  const buckets = new Map<number, number[]>();
  for (let i = 0; i < total; i++) {
    if (screen.alpha[i] < 0.02) continue;
    const key =
      (Math.floor(screen.y[i] / reach) + 1) * columns +
      Math.floor(screen.x[i] / reach) +
      1;
    const bucket = buckets.get(key);
    if (bucket) bucket.push(i);
    else buckets.set(key, [i]);
  }

  let lineCount = 0;
  const limit = reach * reach;
  for (const [key, members] of buckets) {
    for (const dir of [0, 1, columns - 1, columns, columns + 1]) {
      const others = dir === 0 ? members : buckets.get(key + dir);
      if (!others) continue;
      for (let a = 0; a < members.length; a++) {
        const i = members[a];
        for (let b = dir === 0 ? a + 1 : 0; b < others.length; b++) {
          const j = others[b];
          const dx = screen.x[i] - screen.x[j];
          const dy = screen.y[i] - screen.y[j];
          const gap = dx * dx + dy * dy;
          if (gap > limit) continue;
          const layer = clamp(
            1 - Math.abs(screen.ahead[i] - screen.ahead[j]) / 18,
            0,
            1,
          );
          if (layer <= 0) continue;
          if (lineCount >= MAX_LINES) return lineCount;
          const fade = 1 - Math.sqrt(gap) / reach;
          const base = lineCount * 8;
          lineData[base] = screen.x[i];
          lineData[base + 1] = screen.y[i];
          lineData[base + 2] = screen.x[j];
          lineData[base + 3] = screen.y[j];
          lineData[base + 4] = (cloud.colors[i * 3] + cloud.colors[j * 3]) / 2;
          lineData[base + 5] =
            (cloud.colors[i * 3 + 1] + cloud.colors[j * 3 + 1]) / 2;
          lineData[base + 6] =
            (cloud.colors[i * 3 + 2] + cloud.colors[j * 3 + 2]) / 2;
          lineData[base + 7] =
            fade *
            fade *
            layer *
            0.7 *
            Math.min(screen.alpha[i], screen.alpha[j]);
          lineCount++;
        }
      }
    }
  }

  return lineCount;
};
