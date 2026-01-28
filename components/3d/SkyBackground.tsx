"use client";

import { Sky, Stars, Cloud } from "@react-three/drei";
import React from "react";

export default function SkyBackground() {
  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      {/* Distant clouds for depth */}
      <Cloud opacity={0.5} scale={[1, 1, 1]} position={[0, 10, -50]} speed={0.2} />
      <Cloud opacity={0.5} scale={[1, 1, 1]} position={[20, 0, -50]} speed={0.2} />
      <Cloud opacity={0.5} scale={[1, 1, 1]} position={[-20, 5, -50]} speed={0.2} />
    </>
  );
}
