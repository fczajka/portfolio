"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function Sparkles({ count = 50, scale = 5, color = "white" }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<Array<{ speed: number; factor: number; position: THREE.Vector3 }>>([]);
  const dummy = new THREE.Object3D();

  // Initialize particles
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        speed: 0.1 + Math.random(),
        factor: 0.2 + Math.random(),
        position: new THREE.Vector3(
          (Math.random() - 0.5) * scale,
          (Math.random() - 0.5) * scale,
          (Math.random() - 0.5) * scale
        ),
      });
    }
  }

  useFrame((state) => {
    if (!mesh.current) return;
    particles.current.forEach((particle, i) => {
      const t = state.clock.getElapsedTime();
      // Oscillate Y position
      const yOffset = Math.sin(t * particle.speed + particle.factor) * 0.2;

      dummy.position.copy(particle.position);
      dummy.position.y += yOffset;
      dummy.scale.setScalar(Math.max(0.2, Math.sin(t * particle.speed) + 0.5)); // Pulsate size
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </instancedMesh>
  );
}
