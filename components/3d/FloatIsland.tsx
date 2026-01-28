"use client";

import React from "react";
import { GroupProps } from "@react-three/fiber";

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
  return (
    <group {...props}>
      {/* Grass Top */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[5, 4.5, 1, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>

      {/* Dirt Bottom */}
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[4.5, 3, 8]} />
        <meshStandardMaterial color={bottomColor} flatShading />
      </mesh>

      {/* Content Area */}
      <group position={[0, 1.1, 0]}>
        {children}
      </group>
    </group>
  );
}
