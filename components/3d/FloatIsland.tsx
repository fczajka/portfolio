"use client";

import React, { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { MeshDistortMaterial, Instance, Instances, Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatIslandProps extends GroupProps {
  color?: string;
  bottomColor?: string;
}

export default function FloatIsland({
  children,
  color = "#6ecf5b",
  bottomColor = "#8b5a2b",
  ...props
}: FloatIslandProps) {

  // Increase island size (radius ~5)
  const radius = 5;

  // Generate random grass tufts (more of them)
  const grassData = useMemo(() => {
     return Array.from({ length: 60 }, () => {
        // Random position within circle
        const r = Math.sqrt(Math.random()) * (radius - 0.5);
        const theta = Math.random() * 2 * Math.PI;
        return {
            position: [
                r * Math.cos(theta),
                0.5,
                r * Math.sin(theta)
            ] as [number, number, number],
            scale: 0.5 + Math.random() * 0.5,
            rotation: [0, Math.random() * Math.PI, 0] as [number, number, number]
        };
     });
  }, []);

  // Generate random rocks
  const rocksData = useMemo(() => {
      return Array.from({ length: 12 }, () => {
         const r = Math.sqrt(Math.random()) * (radius - 1);
         const theta = Math.random() * 2 * Math.PI;
         return {
            position: [
               r * Math.cos(theta),
               0.6,
               r * Math.sin(theta)
            ] as [number, number, number],
            scale: 0.3 + Math.random() * 0.4,
         };
      });
  }, []);

  // Surrounding floating rocks
  const floatersData = useMemo(() => {
      return Array.from({ length: 5 }, (_, i) => ({
          position: [
             Math.cos(i * 1.5) * (radius + 2),
             Math.random() * 2 - 1,
             Math.sin(i * 1.5) * (radius + 2)
          ] as [number, number, number],
          scale: 0.4 + Math.random() * 0.5,
      }));
  }, []);

  return (
    <group {...props}>
      {/* Main Island Top */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[radius, radius, 1, 8]} />
        <MeshDistortMaterial
          color={color}
          speed={0.2}
          distort={0.12}
          radius={1}
          roughness={0.8}
        />
      </mesh>

      {/* Island Bottom (Dirt) */}
      <mesh position={[0, -1.5, 0]} rotation={[0, 0, 0]} receiveShadow>
         {/* Deeper cone for bigger island */}
        <coneGeometry args={[radius * 0.9, 4, 8]} />
        <meshStandardMaterial color={bottomColor} flatShading roughness={1} />
      </mesh>

      {/* Procedural Grass (Instances) */}
      <Instances range={60}>
          <coneGeometry args={[0.08, 0.6, 4]} />
          <meshStandardMaterial color={new THREE.Color(color).offsetHSL(0, 0.1, -0.1)} />
          {grassData.map((data, i) => (
             <Instance key={i} position={data.position} scale={data.scale} rotation={data.rotation} />
          ))}
      </Instances>

      {/* Procedural Rocks on Island */}
      {rocksData.map((data, i) => (
         <mesh key={i} position={data.position} scale={data.scale} castShadow receiveShadow>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color="#888" flatShading />
         </mesh>
      ))}

      {/* Floating Rocks Around */}
      {floatersData.map((data, i) => (
         <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
             <mesh position={data.position} scale={data.scale}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={bottomColor} flatShading />
             </mesh>
         </Float>
      ))}

      {/* Content Area */}
      <group position={[0, 0.6, 0]}>
        {children}
      </group>
    </group>
  );
}
