"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import React from "react";

export default function Portfolio3D() {
  return (
    <div className="h-screen w-full">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 40 }}
        dpr={[1, 2]} // Handle high pixel density screens
      >
        <Experience />
      </Canvas>
    </div>
  );
}
