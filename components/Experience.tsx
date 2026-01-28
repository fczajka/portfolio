"use client";

import { ScrollControls, Scroll, Text, Float, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import SkyBackground from "./3d/SkyBackground";
import FloatIsland from "./3d/FloatIsland";
import Avatar from "./3d/Avatar";
import Cloud from "./3d/Cloud";
import Sparkles from "./3d/Sparkles";
import Overlay from "./Overlay";
import React from "react";

function FloatingElement({
  children,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
}: any) {
  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      {children}
    </Float>
  );
}

export default function Experience() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scaleFactor = isMobile ? 0.7 : 1;

  return (
    <>
      {/* Lighting & Environment */}
      <ambientLight intensity={1} />
      <Environment preset="sunset" blur={1} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

      {/* Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>

      <SkyBackground />

      {/* Pages: Intro, About, Work, Contact */}
      <ScrollControls pages={4} damping={0.25}>

        {/* 3D Content Layer */}
        <Scroll>
          {/* SECTION 1: HERO (Page 0) */}
          <group position={[0, -1, 0]}>
            <FloatIsland scale={0.9 * scaleFactor}>
               {/* Avatar tracks mouse now */}
              <Avatar scale={0.8} position={[0, -0.2, 0]} />
              <Sparkles count={30} scale={3} color="#ffffff" />
            </FloatIsland>
            <Cloud position={isMobile ? [-1.5, 2, -5] : [-3, 2, -5]} scale={0.5 * scaleFactor} />
            <Cloud position={isMobile ? [1.5, 3, -4] : [3, 3, -4]} scale={0.5 * scaleFactor} />

            <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </group>

          {/* SECTION 2: ABOUT (Page 1) */}
          <group position={[0, -viewport.height - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#f0abfc" bottomColor="#a21caf">
              <FloatingElement>
                <mesh position={[-1.2 * scaleFactor, 1, 0.5]}>
                  <boxGeometry args={[0.7, 0.7, 0.7].map(s => s * scaleFactor) as [number, number, number]} />
                  <MeshDistortMaterial color="#f97316" speed={2} distort={0.2} />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={2} delay={0.2}>
                <mesh position={[1.2 * scaleFactor, 1.5, -0.5]}>
                  <sphereGeometry args={[0.4 * scaleFactor]} />
                  <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.5} />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.5} delay={0.4}>
                 <mesh position={[0, 2 * scaleFactor, 0]}>
                    <torusGeometry args={[0.3 * scaleFactor, 0.1 * scaleFactor, 16, 32]} />
                    <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={2} toneMapped={false} />
                 </mesh>
              </FloatingElement>
              <Sparkles count={20} scale={4} color="#f0abfc" />
            </FloatIsland>
            <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </group>

          {/* SECTION 3: WORK (Page 2) */}
          <group position={[0, -viewport.height * 2 - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#93c5fd" bottomColor="#1e40af">
              <FloatingElement>
                <mesh position={[-1.2 * scaleFactor, 1.5, 0.5]}>
                  <boxGeometry args={[1, 0.7, 0.1].map(s => s * scaleFactor) as [number, number, number]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.5} delay={1}>
                <mesh position={[1.2 * scaleFactor, 1.2, 0.5]}>
                  <boxGeometry args={[1, 0.7, 0.1].map(s => s * scaleFactor) as [number, number, number]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.2} delay={0.5}>
                <mesh position={[0, 2 * scaleFactor, -0.5]}>
                  <boxGeometry args={[1.5, 1, 0.1].map(s => s * scaleFactor) as [number, number, number]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <Sparkles count={20} scale={4} color="#93c5fd" />
            </FloatIsland>
            <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </group>

          {/* SECTION 4: CONTACT (Page 3) */}
          <group position={[0, -viewport.height * 3 - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#86efac" bottomColor="#15803d">
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2].map(s => s * scaleFactor) as [number, number, number]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[0.6, 0.4, 0.8].map(s => s * scaleFactor) as [number, number, number]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
              <Sparkles count={30} scale={3} color="#86efac" />
            </FloatIsland>
            <Cloud position={isMobile ? [1.5, 3, -3] : [2, 3, -3]} scale={0.6 * scaleFactor} />
            <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </group>
        </Scroll>

        {/* HTML Content Layer */}
        <Overlay />
      </ScrollControls>
    </>
  );
}

// Need to import this separately as it was missing in the file
import { MeshDistortMaterial } from "@react-three/drei";
