"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

export default function Avatar(props: any) {
  const innerGroup = useRef<Group>(null);
  const headGroup = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);

  useFrame((state) => {
    // Idle Animation: Float up/down
    if (innerGroup.current) {
      innerGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }

    // Look at mouse (clamped)
    if (headGroup.current) {
      const targetX = (state.mouse.x * 1);
      const targetY = (state.mouse.y * 0.5) + 1.6;
      const currentRotationY = headGroup.current.rotation.y;
      const currentRotationX = headGroup.current.rotation.x;

      // Smooth interpolation for head
      headGroup.current.rotation.y = THREE.MathUtils.lerp(currentRotationY, targetX, 0.1);
      headGroup.current.rotation.x = THREE.MathUtils.lerp(currentRotationX, -state.mouse.y * 0.5, 0.1);
    }

    // Arm Sway
    if (leftArm.current && rightArm.current) {
        leftArm.current.rotation.z = -0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        rightArm.current.rotation.z = 0.5 - Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group {...props}>
      <group ref={innerGroup}>
        {/* Head Group */}
        <group ref={headGroup} position={[0, 1.45, 0]}>
          {/* Head Shape */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.55, 0.5]} />
            <meshStandardMaterial color="#ffccaa" />
          </mesh>

          {/* Hair / Cap */}
          <mesh position={[0, 0.3, 0]} castShadow>
             <boxGeometry args={[0.55, 0.15, 0.55]} />
             <meshStandardMaterial color="#333" />
          </mesh>

          {/* Eyes */}
          <mesh position={[0.12, 0.05, 0.26]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[-0.12, 0.05, 0.26]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial color="black" />
          </mesh>

          {/* Smile */}
          <mesh position={[0, -0.1, 0.26]} rotation={[0,0,Math.PI]}>
             <torusGeometry args={[0.08, 0.02, 16, 16, Math.PI]} />
             <meshBasicMaterial color="black" />
          </mesh>
        </group>

        {/* Body */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.9, 32]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Laptop/Logo on Shirt */}
        <mesh position={[0, 0.9, 0.16]}>
           <planeGeometry args={[0.2, 0.2]} />
           <meshBasicMaterial color="white" />
        </mesh>

        {/* Arms */}
        <group ref={leftArm} position={[0.35, 1.1, 0]}>
             <mesh position={[0, -0.3, 0]} castShadow>
                <boxGeometry args={[0.15, 0.6, 0.15]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.65, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshStandardMaterial color="#ffccaa" />
            </mesh>
        </group>

        <group ref={rightArm} position={[-0.35, 1.1, 0]}>
             <mesh position={[0, -0.3, 0]} castShadow>
                <boxGeometry args={[0.15, 0.6, 0.15]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
             {/* Hand */}
            <mesh position={[0, -0.65, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshStandardMaterial color="#ffccaa" />
            </mesh>
        </group>

      </group>
    </group>
  );
}

import * as THREE from "three";
