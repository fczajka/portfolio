"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export default function Avatar(props: any) {
  const innerGroup = useRef<Group>(null);

  useFrame((state) => {
    if (innerGroup.current) {
      innerGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group {...props}>
      <group ref={innerGroup}>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#ffccaa" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.15, 1.7, 0.31]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.15, 1.7, 0.31]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Arms */}
        <mesh position={[0.5, 1, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[-0.5, 1, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  );
}
