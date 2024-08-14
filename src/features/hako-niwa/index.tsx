"use client";

import { Bounds, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

const SnowGround = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
};

const PineTree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color="#2d5d2a" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
    </group>
  );
};

const Snowflake = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
};

const IceCrystal = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#a5f3fc" transparent opacity={0.7} />
    </mesh>
  );
};

export const HakoNiwa = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Bounds fit clip observe margin={1}>
        <SnowGround />
        <IceCrystal />
        <PineTree position={[-2, 0, -2]} />
        <PineTree position={[2, 0, 2]} />
        <PineTree position={[-1.5, 0, 1.5]} />
        <Snowflake position={[1, 2, -1]} />
        <Snowflake position={[-1, 1.5, 1]} />
        <Snowflake position={[0.5, 1.8, 0.5]} />
      </Bounds>
      <OrbitControls
        makeDefault
        // 視点の回転範囲
        // 視点の上下の回転範囲
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        // ズーム
        enableZoom={true}
        minZoom={1}
        maxZoom={2}
        enablePan={true}
        zoomSpeed={0.3}
      />
      <Environment preset="night" />
    </Canvas>
  );
};
