"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { createParticleRenderer } from "@/components/UI/particlesRenderer";
import {
  BURST_SECONDS,
  INTRO_SECONDS,
  MAX_BURSTS,
  clamp,
  type ParticleBurst,
  type ParticleSettings,
  type PointerState,
  type SimulationState,
  type ViewMetrics,
} from "@/components/UI/particlesWebGL";

function stepSimulation(params: {
  dt: number;
  settings: ParticleSettings;
  state: SimulationState;
  pointer: PointerState;
  bursts: ParticleBurst[];
  scrollTarget: number;
  reduceMotion: boolean;
}) {
  const { dt, settings, state, pointer, bursts, scrollTarget, reduceMotion } =
    params;

  const motion = reduceMotion ? 0 : 1;
  const pace = dt * settings.speed * motion;
  state.clock += pace;
  if (settings.rotate) state.spin += pace * 0.6;
  state.travel +=
    dt * settings.driftSpeed * motion * (settings.drift === 3 ? 6 : 0.9);

  if (settings.scrollParallax > 0 && !reduceMotion) {
    const scrollFollow = 1 - Math.exp(-dt / 0.08);
    state.scrollY += (scrollTarget - state.scrollY) * scrollFollow;
  } else {
    state.scrollY = scrollTarget;
  }

  const engaged = settings.mouse && pointer.inside && !reduceMotion;
  const follow = 1 - Math.exp(-dt / 0.35);
  const parallax =
    engaged && settings.hoverEffect === 0 ? settings.hoverFactor : 0;
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

  if (!settings.intro || reduceMotion) {
    state.reveal = 1;
  } else if (state.reveal < 1) {
    state.reveal = Math.min(1, state.reveal + dt / INTRO_SECONDS);
  }
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Runs the WebGL2 particle simulation loop, observers, and pointer/scroll listeners. */
export function useParticlesWebGL(
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  settings: ParticleSettings,
): void {
  const settingsRef = useRef<ParticleSettings>(settings);
  const wakeRef = useRef<(() => void) | null>(null);

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

    const renderer = createParticleRenderer(gl);
    if (!renderer) return undefined;

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery?.matches ?? false;
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
      reveal: settingsRef.current.intro && !reduceMotion ? 0 : 1,
    };
    const bursts: ParticleBurst[] = [];

    let raf = 0;
    let last = 0;
    let visible = true;

    const renderScene = () => {
      renderer.render({
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        settings: settingsRef.current,
        state,
        view,
        pointer,
        bursts,
        reduceMotion,
      });
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const current = settingsRef.current;
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      if (current.paused) {
        state.reveal = 1;
        renderScene();
        last = 0;
        return;
      }

      stepSimulation({
        dt,
        settings: current,
        state,
        pointer,
        bursts,
        scrollTarget,
        reduceMotion,
      });

      renderScene();
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };

    const resize = () => {
      const current = settingsRef.current;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const ratio = Math.min(current.dpr || window.devicePixelRatio || 1, 2);
      view.width = width;
      view.height = height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      view.ratio = canvas.width / width;
      renderScene();
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
      const current = settingsRef.current;
      if (!current.mouse) return;
      locate(event);
      if (!current.paused) wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      const current = settingsRef.current;
      if (!current.clickBurst || current.paused || reduceMotion) return;
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
      const current = settingsRef.current;
      if (current.scrollParallax > 0 && !current.paused && !reduceMotion) {
        wake();
      }
    };

    const onVisibility = () => {
      last = 0;
      wake();
    };

    const onMotionChange = () => {
      reduceMotion = motionQuery?.matches ?? false;
      if (reduceMotion) {
        state.offsetX = 0;
        state.offsetY = 0;
        pointer.active = 0;
        bursts.length = 0;
        state.reveal = 1;
      }
      renderScene();
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
      const current = settingsRef.current;
      if (current.dpr !== lastDpr) {
        lastDpr = current.dpr;
        resize();
        return;
      }
      renderScene();
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
      renderer.dispose();
      if (!canvas.isConnected) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, [containerRef, canvasRef]);

  useIsomorphicLayoutEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });
}
