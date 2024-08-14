"use client";

import { HakoNiwa } from "@/features/hako-niwa";
import {} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Timer } from "../../features/hako-niwa/timer";

const SnowGround = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
      <boxGeometry args={[8, 8, 1]} />
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

const Snowfall = () => {
  const snowflakes = useRef<THREE.Points>(null);
  const particlesCount = 1000;

  useEffect(() => {
    if (snowflakes.current) {
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = Math.random() * 5;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }
      snowflakes.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
    }
  }, []);

  useFrame(() => {
    if (snowflakes.current?.geometry.attributes.position) {
      const positions = snowflakes.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.01;
        if (positions[i] < -0.5) {
          positions[i] = 5;
        }
      }
      snowflakes.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={snowflakes}>
      <bufferGeometry />
      <pointsMaterial size={0.02} color="#ffffff" />
    </points>
  );
};

export const SnowGarden = () => {
  return (
    <HakoNiwa>
      <SnowGround />
      <Timer />
      <PineTree position={[-2, 0, -2]} />
      <PineTree position={[2, 0, 2]} />
      <PineTree position={[-1.5, 0, 1.5]} />
      <Snowflake position={[1, 2, -1]} />
      <Snowflake position={[-1, 1.5, 1]} />
      <Snowflake position={[0.5, 1.8, 0.5]} />
      <Snowfall />
    </HakoNiwa>
  );
};
