import type { CSSProperties } from "react";
import {
  DRIFTS,
  EFFECTS,
  MAX_COUNT,
  SHAPES,
  clamp,
  type ParticleDrift,
  type ParticleHoverEffect,
  type ParticleSettings,
  type ParticleShape,
} from "./particlesWebGL";

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

/** Normalizes raw Particles component props into clamped WebGL simulation settings. */
export function normalizeParticleSettings(
  props: ParticlesProps,
): ParticleSettings {
  const {
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
  } = props;

  const palette = (
    Array.isArray(particleColors) ? particleColors : [particleColors]
  )
    .filter(Boolean)
    .map(String);

  return {
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
}

/** Builds the wrapper class string, avoiding duplicate position utilities when supplied. */
export function buildParticlesContainerClassName(className: string): string {
  const hasPosition = /\b(static|fixed|absolute|relative|sticky)\b/.test(
    className,
  );
  return [
    hasPosition ? "" : "relative",
    "w-full h-full overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
