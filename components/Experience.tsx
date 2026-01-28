"use client";

import { ScrollControls, Scroll, Text, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import SkyBackground from "./3d/SkyBackground";
import FloatIsland from "./3d/FloatIsland";
import Avatar from "./3d/Avatar";
import Cloud from "./3d/Cloud";
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
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <SkyBackground />

      <ScrollControls pages={4} damping={0.3}>
        {/* 3D Content Layer */}
        <Scroll>
          {/* SECTION 1: HERO (Page 0) */}
          <group position={[0, -1, 0]}>
            <FloatIsland scale={0.9 * scaleFactor}>
              <Avatar scale={0.8} position={[0, -0.2, 0]} />
            </FloatIsland>
            <Cloud position={isMobile ? [-1.5, 2, -5] : [-3, 2, -5]} scale={0.5 * scaleFactor} />
            <Cloud position={isMobile ? [1.5, 3, -4] : [3, 3, -4]} scale={0.5 * scaleFactor} />
            <Text
              position={[0, 3.5 * scaleFactor, -3]}
              fontSize={0.6 * scaleFactor}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >
              Full Stack Developer
            </Text>
          </group>

          {/* SECTION 2: ABOUT (Page 1) */}
          <group position={[0, -viewport.height - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#f0abfc" bottomColor="#a21caf">
              <FloatingElement>
                <mesh position={[-1.2 * scaleFactor, 1, 0.5]}>
                  <boxGeometry args={[0.7, 0.7, 0.7].map(s => s * scaleFactor) as [number, number, number]} />
                  <meshStandardMaterial color="#f97316" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={2} delay={0.2}>
                <mesh position={[1.2 * scaleFactor, 1.5, -0.5]}>
                  <sphereGeometry args={[0.4 * scaleFactor]} />
                  <meshStandardMaterial color="#ef4444" />
                </mesh>
              </FloatingElement>
              <FloatingElement speed={1.5} delay={0.4}>
                 <mesh position={[0, 2 * scaleFactor, 0]}>
                    <torusGeometry args={[0.3 * scaleFactor, 0.1 * scaleFactor, 16, 32]} />
                    <meshStandardMaterial color="#eab308" />
                 </mesh>
              </FloatingElement>
            </FloatIsland>
            <Text
              position={[0, 3 * scaleFactor, -3]}
              fontSize={0.6 * scaleFactor}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >
              Maker & Foodie
            </Text>
          </group>

          {/* SECTION 3: WORK (Page 2) */}
          <group position={[0, -viewport.height * 2 - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#93c5fd" bottomColor="#1e40af">
              {/* Abstract representation of projects */}
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
            </FloatIsland>
            <Text
              position={[0, 4 * scaleFactor, -3]}
              fontSize={0.6 * scaleFactor}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >
              Selected Works
            </Text>
          </group>

          {/* SECTION 4: CONTACT (Page 3) */}
          <group position={[0, -viewport.height * 3 - 1.5, 0]}>
            <FloatIsland scale={0.9 * scaleFactor} color="#86efac" bottomColor="#15803d">
              {/* Mailbox Pole */}
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2].map(s => s * scaleFactor) as [number, number, number]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              {/* Mailbox Box */}
              <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[0.6, 0.4, 0.8].map(s => s * scaleFactor) as [number, number, number]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
            </FloatIsland>
            <Cloud position={isMobile ? [1.5, 3, -3] : [2, 3, -3]} scale={0.6 * scaleFactor} />
            <Text
              position={[0, 3 * scaleFactor, -3]}
              fontSize={0.6 * scaleFactor}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >
              Get in Touch
            </Text>
          </group>
        </Scroll>

        {/* HTML Content Layer */}
        <Overlay />
      </ScrollControls>
    </>
  );
}
