"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export const HakoNiwa = () => {
  return (
    <Canvas>
      <ambientLight args={[0xff0000]} intensity={0.1} />
      <directionalLight position={[0, 1, 5]} intensity={0.5} />

      <RotatingCube />
    </Canvas>
  );
};

const RotatingCube = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime();
    meshRef.current.rotation.y = clock.getElapsedTime();
    meshRef.current.rotation.z = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
