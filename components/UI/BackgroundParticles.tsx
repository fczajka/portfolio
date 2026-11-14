"use client";

import { useTheme } from "next-themes";
import Particles from "./Particles";

const DARK_PARTICLE_COLORS = ["#f9f9f9", "#ffffff", "#ffffff"];
const LIGHT_PARTICLE_COLORS = ["#09090b", "#18181b", "#27272a"];

/** Full-viewport ambient particle layer synced to theme and page scroll depth. */
export default function BackgroundParticles() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <Particles
      particleColors={isLight ? LIGHT_PARTICLE_COLORS : DARK_PARTICLE_COLORS}
      particleCount={640}
      particleSpread={12}
      speed={0.1}
      particleBaseSize={isLight ? 95 : 55}
      glow={isLight ? 0.35 : 0.2}
      twinkle={isLight ? 0.55 : 1}
      moveParticlesOnHover={false}
      hoverEffect="parallax"
      sizeRandomness={0.55}
      particleHoverFactor={0}
      drift="down"
      driftSpeed={0.2}
      alphaParticles={!isLight}
      disableRotation
      cameraDistance={30}
      variation={9}
      clickBurst={false}
      lightMode={isLight}
      scrollParallax={0.5}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
