"use client";

import React, { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

export default function Cloud({
  opacity = 0.8,
  color = "#ffffff",
  ...props
}: GroupProps & { opacity?: number; color?: string }) {

  // Create randomized spheres for a fluffier cloud
  const spheres = useMemo(() => {
     return Array.from({ length: 6 }, (_, i) => ({
        position: [
           (Math.random() - 0.5) * 1.5,
           (Math.random() - 0.5) * 0.5,
           (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.6,
     }));
  }, []);

  return (
    <group {...props}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
           <sphereGeometry args={[1, 16, 16]} />
           <meshStandardMaterial
              color={color}
              transparent
              opacity={opacity}
              roughness={0.9}
              depthWrite={false}
           />
        </mesh>
      ))}
    </group>
  );
}
