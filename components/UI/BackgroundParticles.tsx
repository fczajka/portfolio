"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import Particles from "./Particles";

const DARK_PARTICLE_COLORS = ["#f9f9f9", "#ffffff", "#ffffff"];
const LIGHT_PARTICLE_COLORS = ["#09090b", "#18181b", "#27272a"];

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function getResponsiveParticleCount(): number {
  if (typeof window === "undefined") return 440;
  if (window.innerWidth < 768) return 260;
  if (window.innerWidth < 1280) return 440;
  return 640;
}

/** Full-viewport ambient particle layer synced to theme, viewport budget, and page scroll depth. */
export default function BackgroundParticles() {
  const isClient = useIsClient();
  const { resolvedTheme } = useTheme();
  const [particleCount, setParticleCount] = useState<number>(
    getResponsiveParticleCount,
  );

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(getResponsiveParticleCount());
    };
    updateCount();
    window.addEventListener("resize", updateCount, { passive: true });
    return () => {
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  if (!isClient || !resolvedTheme) {
    return null;
  }

  const isLight = resolvedTheme === "light";

  return (
    <Particles
      particleColors={isLight ? LIGHT_PARTICLE_COLORS : DARK_PARTICLE_COLORS}
      particleCount={particleCount}
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
      pixelRatio={1.5}
      variation={9}
      clickBurst={false}
      lightMode={isLight}
      scrollParallax={0.5}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
