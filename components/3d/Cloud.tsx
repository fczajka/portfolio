"use client";

import React from "react";
import { GroupProps } from "@react-three/fiber";

export default function Cloud({
  opacity = 0.8,
  color = "#ffffff",
  ...props
}: GroupProps & { opacity?: number; color?: string }) {
  return (
    <group {...props}>
      <mesh position={[-0.8, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.5, 0.5]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
