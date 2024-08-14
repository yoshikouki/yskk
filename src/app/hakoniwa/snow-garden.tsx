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

const Snowfall = () => {
  const snowflakes = useRef<THREE.Points>(null);
  const particlesCount = 1000;
  const fallSpeeds = useRef<Float32Array>(new Float32Array(particlesCount));

  useEffect(() => {
    if (snowflakes.current) {
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const positionIndex = i * 3;
        positions[positionIndex] = (Math.random() - 0.5) * 8; // x
        positions[positionIndex + 1] = Math.random() * 5; // y
        positions[positionIndex + 2] = (Math.random() - 0.5) * 8; // z
        fallSpeeds.current[i] = 0.001 + Math.random() * 0.01;
      }
      snowflakes.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
    }
  }, []);

  useFrame(() => {
    if (snowflakes.current?.geometry.attributes.position) {
      const positions = snowflakes.current.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const positionIndex = i * 3;
        positions[positionIndex + 1] -= fallSpeeds.current[i];

        if (positions[positionIndex + 1] < 0) {
          positions[positionIndex] = (Math.random() - 0.5) * 8; // x
          positions[positionIndex + 1] = 5 + Math.random() * 2; // y
          positions[positionIndex + 2] = (Math.random() - 0.5) * 8; // z
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
      <PineTree position={[-2, 0.3, -2]} />
      <PineTree position={[2, 0.3, 2]} />
      <PineTree position={[-1.5, 0.3, 1.5]} />
      <Snowfall />
    </HakoNiwa>
  );
};
