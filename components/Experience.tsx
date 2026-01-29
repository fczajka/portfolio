"use client";

import { ScrollControls, Scroll, Text, Float, Environment, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
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
  // Reduce scaleFactor slightly as islands are bigger now
  const scaleFactor = isMobile ? 0.6 : 0.8;

  return (
    <>
      {/* Lighting & Environment */}
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" blur={1} background={false} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

      {/* Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.5} radius={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>

      <SkyBackground />

      {/* Pages: Intro, About, Work, Contact */}
      <ScrollControls pages={4} damping={0.25}>

        {/* 3D Content Layer */}
        <Scroll>
          {/* SECTION 1: HERO (Page 0) */}
          <group position={[0, -2, 0]}> {/* Lowered slightly to center bigger island */}
            <FloatIsland scale={scaleFactor}>
               {/* Avatar tracks mouse now */}
              <Avatar scale={1.2} position={[0, -0.2, 0]} /> {/* Bigger avatar */}
              <Sparkles count={50} scale={6} color="#ffffff" />
            </FloatIsland>
            <Cloud position={isMobile ? [-2.5, 3, -5] : [-5, 3, -5]} scale={0.8 * scaleFactor} />
            <Cloud position={isMobile ? [2.5, 4, -4] : [5, 4, -4]} scale={0.8 * scaleFactor} />

            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={3} far={10} />
          </group>

          {/* SECTION 2: ABOUT (Page 1) */}
          <group position={[0, -viewport.height - 2, 0]}>
            <FloatIsland scale={scaleFactor} color="#f0abfc" bottomColor="#a21caf">
              <FloatingElement>
                <mesh position={[-1.5, 1, 0.5]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <MeshDistortMaterial color="#f97316" speed={2} distort={0.2} />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={2} delay={0.2}>
                <mesh position={[1.5, 1.5, -0.5]}>
                  <sphereGeometry args={[0.6]} />
                  <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.5} />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.5} delay={0.4}>
                 <mesh position={[0, 2.5, 0]}>
                    <torusGeometry args={[0.5, 0.2, 16, 32]} />
                    <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={2} toneMapped={false} />
                 </mesh>
              </FloatingElement>
              <Sparkles count={40} scale={6} color="#f0abfc" />
            </FloatIsland>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={3} far={10} />
          </group>

          {/* SECTION 3: WORK (Page 2) */}
          <group position={[0, -viewport.height * 2 - 2, 0]}>
            <FloatIsland scale={scaleFactor} color="#93c5fd" bottomColor="#1e40af">
              <FloatingElement>
                <mesh position={[-1.5, 1.5, 0.5]}>
                  <boxGeometry args={[1.2, 0.8, 0.2]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.5} delay={1}>
                <mesh position={[1.5, 1.2, 0.5]}>
                  <boxGeometry args={[1.2, 0.8, 0.2]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.2} delay={0.5}>
                <mesh position={[0, 2.5, -0.5]}>
                  <boxGeometry args={[2, 1.2, 0.2]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </FloatingElement>
              <Sparkles count={40} scale={6} color="#93c5fd" />
            </FloatIsland>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={3} far={10} />
          </group>

          {/* SECTION 4: CONTACT (Page 3) */}
          <group position={[0, -viewport.height * 3 - 2, 0]}>
            <FloatIsland scale={scaleFactor} color="#86efac" bottomColor="#15803d">
              <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 2]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              <mesh position={[0, 2.2, 0]}>
                <boxGeometry args={[1, 0.6, 1.2]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
              <Sparkles count={50} scale={6} color="#86efac" />
            </FloatIsland>
            <Cloud position={isMobile ? [2, 3, -3] : [4, 4, -3]} scale={0.8 * scaleFactor} />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={3} far={10} />
          </group>
        </Scroll>

        {/* HTML Content Layer */}
        <Overlay />
      </ScrollControls>
    </>
  );
}
