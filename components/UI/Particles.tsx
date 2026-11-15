"use client";

import { useRef } from "react";
import { useParticlesWebGL } from "@/hooks/useParticlesWebGL";
import {
  buildParticlesContainerClassName,
  normalizeParticleSettings,
  type ParticlesProps,
} from "./particlesSettings";
import type {
  ParticleDrift,
  ParticleHoverEffect,
  ParticleShape,
} from "./particlesWebGL";

export type {
  ParticleDrift,
  ParticleHoverEffect,
  ParticleShape,
  ParticlesProps,
};

/**
 * WebGL2 instanced particle field adapted from React Bits with Tailwind-only
 * styling and optional depth-aware scroll parallax.
 */
export default function Particles(props: ParticlesProps) {
  const { className = "", style } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settings = normalizeParticleSettings(props);

  useParticlesWebGL(containerRef, canvasRef, settings);

  return (
    <div
      ref={containerRef}
      className={buildParticlesContainerClassName(className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
