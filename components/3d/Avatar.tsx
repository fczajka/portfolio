"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

export default function Avatar(props: any) {
  const innerGroup = useRef<Group>(null);
  const headGroup = useRef<Group>(null);

  useFrame((state) => {
    // Idle Animation
    if (innerGroup.current) {
      innerGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    // Look at mouse
    if (headGroup.current) {
      const target = new Vector3(
        (state.mouse.x * 2), // Map mouse X to look range
        (state.mouse.y * 1) + 1.6, // Map mouse Y
        5
      );
      headGroup.current.lookAt(target);
    }
  });

  return (
    <group {...props}>
      <group ref={innerGroup}>
        {/* Head Group for rotation */}
        <group ref={headGroup} position={[0, 1.6, 0]}>
          <mesh>
             {/* Head Center Offset adjustment if needed, but box geometry is centered */}
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#ffccaa" roughness={0.5} />
          </mesh>

          {/* Eyes - child of Head */}
          <mesh position={[0.15, 0.1, 0.31]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[-0.15, 0.1, 0.31]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </group>

        {/* Body */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>

        {/* Arms */}
        <mesh position={[0.5, 1, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>
        <mesh position={[-0.5, 1, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
