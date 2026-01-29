"use client";

import { ScrollControls, useScroll, Float, Environment, ContactShadows, Text, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import SkyBackground from "./3d/SkyBackground";
import FloatIsland from "./3d/FloatIsland";
import Avatar from "./3d/Avatar";
import Cloud from "./3d/Cloud";
import Sparkles from "./3d/Sparkles";
import Overlay from "./Overlay";
import { CURVE_POINTS } from "./3d/MapPoints";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;

export default function Experience() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" blur={1} background={false} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

      {/* Post Processing for magical feel */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.6} />
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>

      <SkyBackground />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Pages: Intro, About, Work, Contact */}
      <ScrollControls pages={4} damping={0.25}>
        <Scene />
        <Overlay />
      </ScrollControls>
    </>
  );
}

function Scene() {
  const scroll = useScroll();
  const { camera, scene } = useThree();

  // Create the curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5);
  }, []);

  // Debug line points (optional, but we use them for placing objects)
  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const avatarRef = useRef<THREE.Group>(null);

  // Procedural clouds positions
  const clouds = useMemo(() => {
    return new Array(60).fill(0).map((_, i) => {
      const t = Math.random();
      const pos = curve.getPoint(t);
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 20 + 10,
        (Math.random() - 0.5) * 50
      );
      return {
        position: pos.add(offset),
        scale: 1 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.3
      }
    });
  }, [curve]);

  // Procedural Debris (Floating Rocks)
  const debris = useMemo(() => {
    return new Array(100).fill(0).map((_, i) => {
      const t = Math.random();
      const pos = curve.getPoint(t);
      // Scatter more widely
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      return {
        position: pos.add(offset),
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.2 + Math.random() * 0.5
      };
    });
  }, [curve]);

  // Procedural "Road" stones
  const roadStones = useMemo(() => {
    return linePoints.filter((_, i) => i % 10 === 0).map((point) => ({
      position: point,
      rotation: [Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2]
    }));
  }, [linePoints]);

  useFrame((_state, delta) => {
    // Current scroll offset (0 to 1)
    const t = scroll.offset;

    // Calculate position on curve
    // We add a small epsilon to lookAt calculation to handle end of curve
    const curPoint = curve.getPoint(t);
    const lookAtPoint = curve.getPoint(Math.min(t + 0.01, 1));

    // Move Avatar
    if (avatarRef.current) {
        avatarRef.current.position.copy(curPoint);
        avatarRef.current.lookAt(lookAtPoint);
    }

    // Move Camera
    // Camera floats behind and above the avatar
    // We can use the tangent to determine "behind"
    const tangent = curve.getTangent(t).normalize();
    // Offset vector: -tangent * distance + up * height
    // But we also want to smooth it.
    // For simplicity, let's place camera relative to avatar
    const cameraOffset = tangent.clone().multiplyScalar(-5).add(new THREE.Vector3(0, 2, 0));

    // Add some "sway" or side offset based on curve to make it dynamic?
    // Let's stick to standard follow for now.
    const targetCamPos = curPoint.clone().add(cameraOffset);

    // Smooth camera movement
    camera.position.lerp(targetCamPos, 0.1);
    camera.lookAt(curPoint.clone().add(new THREE.Vector3(0, 1, 0))); // Look slightly above avatar feet (at head)

  });

  return (
    <>
      <group ref={avatarRef}>
         <Avatar scale={1} animation={scroll.delta > 0.0001 ? "Walking" : "Idle"} />
         <pointLight position={[0, 2, 1]} intensity={2} distance={5} color="#fbbf24" />
      </group>

      {/* The Road */}
      {roadStones.map((stone, i) => (
        <group key={i} position={[stone.position.x, stone.position.y - 1.5, stone.position.z]}>
             <mesh rotation={[stone.rotation[0], stone.rotation[1], stone.rotation[2]] as any}>
                <boxGeometry args={[1.5, 0.2, 1.5]} />
                <meshStandardMaterial color="#64748b" roughness={0.8} />
             </mesh>
        </group>
      ))}

      {/* Floating Islands at Key Locations */}
      {/* Start */}
      <group position={curve.getPoint(0).toArray()}>
         <FloatIsland scale={0.8} position={[0, -2, 0]} />
         <Text position={[3, 2, 0]} fontSize={1} color="white" anchorX="center" anchorY="middle">
            Welcome
         </Text>
      </group>

      {/* About (approx 33%) */}
      <group position={curve.getPoint(0.31).toArray()}>
         <FloatIsland scale={0.8} position={[0, -2, 0]} color="#f0abfc" bottomColor="#a21caf">
            <Sparkles count={20} color="#f0abfc" />
         </FloatIsland>
         <Cloud position={[3, 4, -2]} />
      </group>

      {/* Work (approx 64%) */}
      <group position={curve.getPoint(0.64).toArray()}>
         <FloatIsland scale={0.8} position={[0, -2, 0]} color="#93c5fd" bottomColor="#1e40af" />
         <FloatingElement>
             <mesh position={[2, 2, 2]}>
                <dodecahedronGeometry args={[0.8]} />
                <meshStandardMaterial color="cyan" emissive="blue" emissiveIntensity={0.5} />
             </mesh>
         </FloatingElement>
      </group>

      {/* Contact (approx 98%) */}
      <group position={curve.getPoint(0.98).toArray()}>
         <FloatIsland scale={0.8} position={[0, -2, 0]} color="#86efac" bottomColor="#15803d" />
         <Sparkles count={50} scale={10} />
      </group>

      {/* Scattered Debris */}
      {debris.map((rock, i) => (
         <mesh key={i} position={rock.position} rotation={rock.rotation as any} scale={rock.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#64748b" roughness={0.6} />
         </mesh>
      ))}

      {/* Scattered Clouds & Decor */}
      {clouds.map((cloud, i) => (
         <Cloud key={i} position={cloud.position.toArray()} scale={cloud.scale} />
      ))}

    </>
  );
}

function FloatingElement({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }: any) {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      {children}
    </Float>
  );
}
