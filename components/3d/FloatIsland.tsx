"use client";

import React, { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { MeshDistortMaterial, Instance, Instances } from "@react-three/drei";
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

  // Generate random grass tufts
  const grassData = useMemo(() => {
     return Array.from({ length: 30 }, () => ({
        position: [
           (Math.random() - 0.5) * 4,
           0.5,
           (Math.random() - 0.5) * 4
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.5,
        rotation: [0, Math.random() * Math.PI, 0] as [number, number, number]
     }));
  }, []);

  // Generate random rocks
  const rocksData = useMemo(() => {
      return Array.from({ length: 5 }, () => ({
         position: [
            (Math.random() - 0.5) * 3.5,
            0.6,
            (Math.random() - 0.5) * 3.5
         ] as [number, number, number],
         scale: 0.2 + Math.random() * 0.3,
      }));
  }, []);

  return (
    <group {...props}>
      {/* Main Island Top */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.5, 2.5, 1, 6]} />
        <MeshDistortMaterial
          color={color}
          speed={0.2}
          distort={0.1}
          radius={1}
          roughness={0.8}
        />
      </mesh>

      {/* Island Bottom (Dirt) */}
      <mesh position={[0, -1, 0]} rotation={[0, 0, 0]} receiveShadow>
         {/* Distorted sphere/cone hybrid for bottom */}
        <coneGeometry args={[2.3, 2, 6]} />
        <meshStandardMaterial color={bottomColor} flatShading roughness={1} />
      </mesh>

      {/* Procedural Grass (Instances) */}
      <Instances range={30}>
          <coneGeometry args={[0.05, 0.4, 4]} />
          <meshStandardMaterial color={new THREE.Color(color).offsetHSL(0, 0.1, -0.1)} />
          {grassData.map((data, i) => (
             <Instance key={i} position={data.position} scale={data.scale} rotation={data.rotation} />
          ))}
      </Instances>

      {/* Procedural Rocks */}
      {rocksData.map((data, i) => (
         <mesh key={i} position={data.position} scale={data.scale} castShadow receiveShadow>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#888" flatShading />
         </mesh>
      ))}

      {/* Content Area */}
      <group position={[0, 0.6, 0]}>
        {children}
      </group>
    </group>
  );
}
