"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import * as THREE from "three";

export default function Avatar({ animation = "Idle", ...props }: any) {
  const innerGroup = useRef<Group>(null);
  const headGroup = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftLeg = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Look at mouse (clamped) - Always active
    if (headGroup.current) {
      const targetX = (state.mouse.x * 1);
      // const targetY = (state.mouse.y * 0.5) + 1.6;
      const currentRotationY = headGroup.current.rotation.y;
      const currentRotationX = headGroup.current.rotation.x;

      headGroup.current.rotation.y = THREE.MathUtils.lerp(currentRotationY, targetX, 0.1);
      headGroup.current.rotation.x = THREE.MathUtils.lerp(currentRotationX, -state.mouse.y * 0.5, 0.1);
    }

    if (animation === "Walking") {
        const speed = 10;
        // Legs
        if(leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * speed) * 0.5;
        if(rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * speed + Math.PI) * 0.5;

        // Arms (Opposite to legs)
        if(leftArm.current) {
            leftArm.current.rotation.x = Math.sin(t * speed + Math.PI) * 0.5;
            leftArm.current.rotation.z = -0.1; // Tuck in slightly
        }
        if(rightArm.current) {
            rightArm.current.rotation.x = Math.sin(t * speed) * 0.5;
            rightArm.current.rotation.z = 0.1;
        }

        // Bobbing
        if (innerGroup.current) {
            innerGroup.current.position.y = Math.sin(t * speed * 2) * 0.05;
        }

    } else {
        // Idle Animation
        if (innerGroup.current) {
          innerGroup.current.position.y = Math.sin(t * 2) * 0.05;
        }

        // Arm Sway
        if (leftArm.current && rightArm.current) {
            leftArm.current.rotation.z = -0.5 + Math.sin(t * 3) * 0.1;
            rightArm.current.rotation.z = 0.5 - Math.sin(t * 3) * 0.1;
            // Reset walking rotation
            leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1);
            rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1);
        }

        // Reset Legs
        if(leftLeg.current) leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
        if(rightLeg.current) rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <group {...props}>
      <group ref={innerGroup}>
        {/* Head Group */}
        <group ref={headGroup} position={[0, 1.45, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.55, 0.5]} />
            <meshStandardMaterial color="#ffccaa" />
          </mesh>
          <mesh position={[0, 0.3, 0]} castShadow>
             <boxGeometry args={[0.55, 0.15, 0.55]} />
             <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0.12, 0.05, 0.26]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[-0.12, 0.05, 0.26]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial color="black" />
          </mesh>
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

        {/* Logo */}
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
            <mesh position={[0, -0.65, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshStandardMaterial color="#ffccaa" />
            </mesh>
        </group>

        {/* Legs - New addition */}
        <group ref={leftLeg} position={[0.15, 0.3, 0]}>
            <mesh position={[0, -0.3, 0]} castShadow>
                <boxGeometry args={[0.15, 0.6, 0.15]} />
                <meshStandardMaterial color="#1e3a8a" /> {/* Darker blue pants */}
            </mesh>
        </group>

        <group ref={rightLeg} position={[-0.15, 0.3, 0]}>
             <mesh position={[0, -0.3, 0]} castShadow>
                <boxGeometry args={[0.15, 0.6, 0.15]} />
                <meshStandardMaterial color="#1e3a8a" />
            </mesh>
        </group>

      </group>
    </group>
  );
}
