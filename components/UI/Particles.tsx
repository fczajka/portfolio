"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  BURST_SECONDS,
  DRIFTS,
  EFFECTS,
  FOCAL,
  INTRO_SECONDS,
  LINE_FRAGMENT,
  LINE_VERTEX,
  MAX_BURSTS,
  MAX_COUNT,
  MAX_LINES,
  MAX_LINKED,
  PARTICLE_FRAGMENT,
  PARTICLE_VERTEX,
  SHAPES,
  buildConnectionLines,
  buildParticleCloudData,
  clamp,
  computeRotationMatrix,
  createColorParser,
  easeOut,
  linkProgram,
  type ParticleBurst,
  type ParticleCloudState,
  type ParticleDrift,
  type ParticleHoverEffect,
  type ParticleSettings,
  type ParticleShape,
  type PointerState,
  type ScreenProjectionBuffers,
  type SimulationState,
  type ViewMetrics,
} from "./particlesWebGL";

export type { ParticleDrift, ParticleHoverEffect, ParticleShape };

export type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  shape?: ParticleShape;
  glow?: number;
  twinkle?: number;
  depthOfField?: number;
  connections?: boolean;
  connectionDistance?: number;
  hoverEffect?: ParticleHoverEffect;
  hoverRadius?: number;
  clickBurst?: boolean;
  drift?: ParticleDrift;
  driftSpeed?: number;
  variation?: number;
  intro?: boolean;
  opacity?: number;
  lightMode?: boolean;
  paused?: boolean;
  scrollParallax?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * WebGL2 instanced particle field adapted from React Bits with Tailwind-only
 * styling and optional depth-aware scroll parallax.
 */
export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ["#ffffff"],
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio,
  shape = "circle",
  glow = 0.5,
  twinkle = 0.3,
  depthOfField = 0,
  connections = false,
  connectionDistance = 110,
  hoverEffect = "parallax",
  hoverRadius = 140,
  clickBurst = true,
  drift = "none",
  driftSpeed = 1,
  variation = 0,
  intro = true,
  opacity = 1,
  lightMode = false,
  paused = false,
  scrollParallax = 0,
  className = "",
  style,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const palette = (
    Array.isArray(particleColors) ? particleColors : [particleColors]
  )
    .filter(Boolean)
    .map(String);

  const settings: ParticleSettings = {
    count: clamp(Math.round(particleCount), 1, MAX_COUNT),
    spread: Math.max(0.1, particleSpread),
    speed,
    colors: palette.length ? palette : ["#ffffff"],
    mouse: moveParticlesOnHover,
    hoverFactor: Math.max(0, particleHoverFactor),
    soft: alphaParticles,
    size: Math.max(0, particleBaseSize),
    randomness: Math.max(0, sizeRandomness),
    camera: Math.max(1, cameraDistance),
    rotate: !disableRotation,
    dpr: pixelRatio,
    shape: SHAPES[shape] ?? 0,
    glow: Math.max(0, glow),
    twinkle: clamp(twinkle, 0, 1),
    depthOfField: Math.max(0, depthOfField),
    connections,
    connectionDistance: Math.max(10, connectionDistance),
    hoverEffect: EFFECTS[hoverEffect] ?? 0,
    hoverRadius: Math.max(20, hoverRadius),
    clickBurst,
    drift: DRIFTS[drift] ?? 0,
    driftSpeed,
    variation: Math.max(0, Math.round(variation)),
    intro,
    opacity: clamp(opacity, 0, 1),
    lightMode,
    paused,
    scrollParallax: Math.max(0, scrollParallax),
  };

  const settingsRef = useRef<ParticleSettings>(settings);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!container || !canvas || !gl) return undefined;

    const dots = linkProgram(gl, PARTICLE_VERTEX, PARTICLE_FRAGMENT);
    const lines = linkProgram(gl, LINE_VERTEX, LINE_FRAGMENT);
    if (!dots || !lines) {
      if (dots) gl.deleteProgram(dots.program);
      if (lines) gl.deleteProgram(lines.program);
      return undefined;
    }

    const corners = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionBuffer = gl.createBuffer();
    const randomBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const dotVao = gl.createVertexArray();
    gl.bindVertexArray(dotVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const attachInstancedAttribute = (
      buffer: WebGLBuffer | null,
      location: number,
      width: number,
    ) => {
      if (!buffer) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, width, gl.FLOAT, false, 0, 0);
      gl.vertexAttribDivisor(location, 1);
    };
    attachInstancedAttribute(positionBuffer, 1, 3);
    attachInstancedAttribute(randomBuffer, 2, 4);
    attachInstancedAttribute(colorBuffer, 3, 3);

    const lineBuffer = gl.createBuffer();
    const lineData = new Float32Array(MAX_LINES * 8);
    const lineVao = gl.createVertexArray();
    gl.bindVertexArray(lineVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, lineData.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16);
    gl.vertexAttribDivisor(2, 1);
    gl.bindVertexArray(null);

    const parseColor = createColorParser();
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reduce = motionQuery?.matches ?? false;

    const view: ViewMetrics = { width: 1, height: 1, ratio: 1 };
    const pointer: PointerState = {
      x: 0,
      y: 0,
      sx: 0,
      sy: 0,
      nx: 0,
      ny: 0,
      inside: false,
      active: 0,
    };
    let scrollTarget = window.scrollY;
    const state: SimulationState = {
      clock: 0,
      spin: 0,
      travel: 0,
      offsetX: 0,
      offsetY: 0,
      scrollY: scrollTarget,
      reveal: settingsRef.current.intro && !reduce ? 0 : 1,
    };
    const bursts: ParticleBurst[] = [];
    const packedBursts = new Float32Array(MAX_BURSTS * 4);
    const cloud: ParticleCloudState = {
      key: "",
      count: 0,
      positions: new Float32Array(0),
      randoms: new Float32Array(0),
      colors: new Float32Array(0),
    };
    const screen: ScreenProjectionBuffers = {
      x: new Float32Array(0),
      y: new Float32Array(0),
      ahead: new Float32Array(0),
      alpha: new Float32Array(0),
    };

    let raf = 0;
    let last = 0;
    let visible = true;

    const rebuild = (s: ParticleSettings) => {
      const key = `${s.count}|${s.variation}|${s.colors.join(",")}|${
        s.lightMode ? 1 : 0
      }`;
      if (key === cloud.key) return;
      cloud.key = key;
      const { positions, randoms, tints } = buildParticleCloudData(
        s,
        parseColor,
      );
      cloud.count = s.count;
      cloud.positions = positions;
      cloud.randoms = randoms;
      cloud.colors = tints;
      const linked = Math.min(s.count, MAX_LINKED);
      screen.x = new Float32Array(linked);
      screen.y = new Float32Array(linked);
      screen.ahead = new Float32Array(linked);
      screen.alpha = new Float32Array(linked);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, tints, gl.STATIC_DRAW);
    };

    const offsetOf = (): [number, number, number] => [
      state.offsetX,
      state.offsetY,
      -(1 - easeOut(state.reveal)) * 70,
    ];

    const scrollOffsetOf = (s: ParticleSettings): number => {
      if (reduce || s.scrollParallax <= 0) return 0;
      return (
        (state.scrollY / Math.max(view.height, 1)) *
        ((s.camera / FOCAL) * 2) *
        s.scrollParallax
      );
    };

    const render = () => {
      const s = settingsRef.current;
      rebuild(s);
      const matrix = computeRotationMatrix(s, state.clock, state.spin);
      const offset = offsetOf();
      const [ox, oy, oz] = offset;
      const scrollOffset = scrollOffsetOf(s);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      if (s.connections) {
        const lineCount = buildConnectionLines({
          settings: s,
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
        });
        if (lineCount) {
          gl.useProgram(lines.program);
          gl.bindVertexArray(lineVao);
          gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
          gl.bufferSubData(
            gl.ARRAY_BUFFER,
            0,
            lineData.subarray(0, lineCount * 8),
          );
          gl.uniform2f(lines.uniforms.uView, view.width, view.height);
          gl.uniform1f(lines.uniforms.uRatio, view.ratio);
          gl.uniform1f(lines.uniforms.uWidth, 1);
          gl.uniform1f(lines.uniforms.uOpacity, s.opacity);
          gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, lineCount);
        }
      }

      const u = dots.uniforms;
      let burstCount = 0;
      for (let i = bursts.length - 1; i >= 0 && burstCount < MAX_BURSTS; i--) {
        packedBursts.set(
          [bursts[i].x, bursts[i].y, bursts[i].age / BURST_SECONDS, 1],
          burstCount * 4,
        );
        burstCount++;
      }

      gl.useProgram(dots.program);
      gl.bindVertexArray(dotVao);
      gl.uniformMatrix3fv(u.uRotation, false, matrix);
      gl.uniform3f(u.uOffset, ox, oy, oz);
      gl.uniform1f(u.uSpread, s.spread);
      gl.uniform1f(u.uTime, state.clock);
      gl.uniform1f(u.uCamera, s.camera);
      gl.uniform1f(u.uAspect, view.width / view.height);
      gl.uniform2f(u.uView, view.width, view.height);
      gl.uniform1f(u.uRatio, view.ratio);
      gl.uniform1f(u.uSize, s.size);
      gl.uniform1f(u.uRandomness, s.randomness);
      gl.uniform1f(u.uBlur, s.depthOfField * 14);
      gl.uniform1f(u.uFocus, s.camera + 14);
      gl.uniform1f(u.uGlow, s.lightMode ? s.glow * 0.3 : s.glow);
      gl.uniform1f(u.uTwinkle, s.twinkle);
      gl.uniform1i(u.uShape, s.shape);
      gl.uniform1i(u.uDrift, s.drift);
      gl.uniform1f(u.uTravel, state.travel);
      gl.uniform1f(u.uScroll, scrollOffset);
      gl.uniform4f(
        u.uPointer,
        pointer.sx,
        pointer.sy,
        pointer.active,
        s.hoverRadius,
      );
      gl.uniform1i(u.uEffect, s.hoverEffect);
      gl.uniform1f(u.uStrength, s.hoverFactor);
      gl.uniform4fv(u.uBursts, packedBursts);
      gl.uniform1i(u.uBurstCount, burstCount);
      gl.uniform1f(u.uReveal, state.reveal);
      gl.uniform1f(u.uSoft, s.soft ? 0.2 : 0);
      gl.uniform1f(u.uShimmer, s.lightMode ? 0 : 1);
      gl.uniform1f(u.uOpacity, s.opacity);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, cloud.count);
      gl.bindVertexArray(null);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const s = settingsRef.current;
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      if (s.paused) {
        state.reveal = 1;
        render();
        last = 0;
        return;
      }

      const motion = reduce ? 0 : 1;
      const pace = dt * s.speed * motion;
      state.clock += pace;
      if (s.rotate) state.spin += pace * 0.6;
      state.travel += dt * s.driftSpeed * motion * (s.drift === 3 ? 6 : 0.9);

      if (s.scrollParallax > 0 && !reduce) {
        const scrollFollow = 1 - Math.exp(-dt / 0.08);
        state.scrollY += (scrollTarget - state.scrollY) * scrollFollow;
      } else {
        state.scrollY = scrollTarget;
      }

      const engaged = s.mouse && pointer.inside && !reduce;
      const follow = 1 - Math.exp(-dt / 0.35);
      const parallax = engaged && s.hoverEffect === 0 ? s.hoverFactor : 0;
      state.offsetX += (-pointer.nx * parallax - state.offsetX) * follow;
      state.offsetY += (-pointer.ny * parallax - state.offsetY) * follow;
      pointer.sx += (pointer.x - pointer.sx) * (1 - Math.exp(-dt / 0.06));
      pointer.sy += (pointer.y - pointer.sy) * (1 - Math.exp(-dt / 0.06));
      pointer.active +=
        ((engaged ? 1 : 0) - pointer.active) * (1 - Math.exp(-dt / 0.2));

      for (let i = bursts.length - 1; i >= 0; i--) {
        bursts[i].age += dt;
        if (bursts[i].age >= BURST_SECONDS) bursts.splice(i, 1);
      }

      if (!s.intro || reduce) state.reveal = 1;
      else if (state.reveal < 1) {
        state.reveal = Math.min(1, state.reveal + dt / INTRO_SECONDS);
      }

      render();
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };

    const resize = () => {
      const s = settingsRef.current;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const ratio = Math.min(s.dpr || window.devicePixelRatio || 1, 2);
      view.width = width;
      view.height = height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      view.ratio = canvas.width / width;
      render();
      wake();
    };

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const wasInside = pointer.inside;
      pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = rect.height - y;
      pointer.nx = (x / Math.max(1, rect.width)) * 2 - 1;
      pointer.ny = -((y / Math.max(1, rect.height)) * 2 - 1);
      if (pointer.inside && !wasInside) {
        pointer.sx = pointer.x;
        pointer.sy = pointer.y;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const s = settingsRef.current;
      if (!s.mouse) return;
      locate(event);
      if (!s.paused) wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      const s = settingsRef.current;
      if (!s.clickBurst || s.paused || reduce) return;
      locate(event);
      if (!pointer.inside) return;
      bursts.push({ x: pointer.x, y: pointer.y, age: 0 });
      if (bursts.length > MAX_BURSTS) bursts.shift();
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointer.inside = false;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    const onScroll = () => {
      scrollTarget = window.scrollY;
      const s = settingsRef.current;
      if (s.scrollParallax > 0 && !s.paused && !reduce) {
        wake();
      }
    };

    const onVisibility = () => {
      last = 0;
      wake();
    };

    const onMotionChange = () => {
      reduce = motionQuery?.matches ?? false;
      if (reduce) {
        state.offsetX = 0;
        state.offsetY = 0;
        pointer.active = 0;
        bursts.length = 0;
        state.reveal = 1;
      }
      render();
      wake();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(container);

    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            if (visible) {
              last = 0;
              wake();
            }
          })
        : null;
    intersection?.observe(container);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery?.addEventListener?.("change", onMotionChange);
    resize();

    let lastDpr = settingsRef.current.dpr;
    wakeRef.current = () => {
      const s = settingsRef.current;
      if (s.dpr !== lastDpr) {
        lastDpr = s.dpr;
        resize();
        return;
      }
      if (!raf) render();
      wake();
    };

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver?.disconnect();
      intersection?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery?.removeEventListener?.("change", onMotionChange);
      gl.deleteProgram(dots.program);
      gl.deleteProgram(lines.program);
      [corners, positionBuffer, randomBuffer, colorBuffer, lineBuffer].forEach(
        (buffer) => {
          if (buffer) gl.deleteBuffer(buffer);
        },
      );
      if (dotVao) gl.deleteVertexArray(dotVao);
      if (lineVao) gl.deleteVertexArray(lineVao);
      if (!canvas.isConnected) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  const hasPosition = /\b(static|fixed|absolute|relative|sticky)\b/.test(
    className,
  );
  const containerClassName = [
    hasPosition ? "" : "relative",
    "w-full h-full overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClassName} style={style}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
