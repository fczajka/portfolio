"use client";

import { Sky, Cloud, Float } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

export default function SkyBackground() {

  // Generate random birds (V-shapes)
  const birds = useMemo(() => {
     return Array.from({ length: 10 }, (_, i) => ({
         position: [
            (Math.random() - 0.5) * 80,
            10 + Math.random() * 20,
            -40 - Math.random() * 20
         ] as [number, number, number],
         speed: 0.5 + Math.random() * 0.5,
     }));
  }, []);

  // Generate distant mountains
  const mountains = useMemo(() => {
      return Array.from({ length: 8 }, (_, i) => ({
          position: [
             (Math.random() - 0.5) * 120,
             -10,
             -60 - Math.random() * 40
          ] as [number, number, number],
          scale: [
              20 + Math.random() * 20,
              30 + Math.random() * 30,
              20 + Math.random() * 20
          ] as [number, number, number],
          color: i % 2 === 0 ? "#64748b" : "#94a3b8" // Slate colors
      }));
  }, []);

  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Distant Mountains */}
      {mountains.map((m, i) => (
         <mesh key={i} position={m.position} scale={m.scale}>
            <coneGeometry args={[1, 1, 4]} />
            <meshStandardMaterial color={m.color} flatShading fog={true} />
         </mesh>
      ))}

      {/* Distant clouds for depth */}
      <Cloud opacity={0.4} scale={[3, 3, 3]} position={[0, 20, -80]} speed={0.1} />
      <Cloud opacity={0.4} scale={[2, 2, 2]} position={[40, 10, -70]} speed={0.15} />
      <Cloud opacity={0.4} scale={[2, 2, 2]} position={[-40, 15, -70]} speed={0.15} />

      {/* Birds */}
      {birds.map((bird, i) => (
         <Float key={i} speed={bird.speed} floatIntensity={2} rotationIntensity={0.5}>
            <group position={bird.position}>
                {/* Simple V-shape bird */}
                <mesh rotation={[0, 0, Math.PI / 4]} position={[-0.2, 0, 0]}>
                   <boxGeometry args={[0.4, 0.1, 0.1]} />
                   <meshBasicMaterial color="#333" />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]} position={[0.2, 0, 0]}>
                   <boxGeometry args={[0.4, 0.1, 0.1]} />
                   <meshBasicMaterial color="#333" />
                </mesh>
            </group>
         </Float>
      ))}

      {/* Fog for depth blending */}
      <fog attach="fog" args={["#87CEEB", 10, 90]} />
    </>
  );
}
