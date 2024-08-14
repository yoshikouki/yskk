"use client";

import { HakoNiwa } from "@/features/hako-niwa";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

import { Timer } from "../../features/hako-niwa/timer";

const noise2D = createNoise2D();

const GroundFloor = ({
  width,
  depth,
  height,
  thickness,
  resolution,
}: {
  width: number;
  depth: number;
  height: number;
  thickness: number;
  resolution: number;
}) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    for (let z = 0; z <= resolution; z++) {
      for (let x = 0; x <= resolution; x++) {
        const u = x / resolution;
        const v = z / resolution;
        const xPos = u * width - width / 2;
        const zPos = v * depth - depth / 2;

        // Top surface with noise
        const noiseValue = noise2D(u * 5, v * 5) * 0.5 + 0.5;
        const yPos = noiseValue * height + thickness;
        vertices.push(xPos, yPos, zPos);

        // Bottom surface (flat)
        vertices.push(xPos, 0, zPos);

        // Generate indices
        if (x < resolution && z < resolution) {
          const topLeft = 2 * (z * (resolution + 1) + x);
          const topRight = topLeft + 2;
          const bottomLeft = topLeft + 2 * (resolution + 1);
          const bottomRight = bottomLeft + 2;

          // Top face
          indices.push(topLeft, topRight, bottomLeft);
          indices.push(bottomLeft, topRight, bottomRight);

          // Bottom face
          indices.push(topLeft + 1, bottomLeft + 1, topRight + 1);
          indices.push(topRight + 1, bottomLeft + 1, bottomRight + 1);

          // Side faces
          if (x === 0) {
            indices.push(topLeft, bottomLeft, topLeft + 1);
            indices.push(topLeft + 1, bottomLeft, bottomLeft + 1);
          }
          if (x === resolution - 1) {
            indices.push(topRight, topRight + 1, bottomRight);
            indices.push(topRight + 1, bottomRight + 1, bottomRight);
          }
          if (z === 0) {
            indices.push(topLeft, topLeft + 1, topRight);
            indices.push(topLeft + 1, topRight + 1, topRight);
          }
          if (z === resolution - 1) {
            indices.push(bottomLeft, bottomRight, bottomLeft + 1);
            indices.push(bottomLeft + 1, bottomRight, bottomRight + 1);
          }
        }
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, [width, depth, height, thickness, resolution]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#8B4513"
        side={THREE.DoubleSide}
        wireframe={false}
      />
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
      <GroundFloor
        width={8}
        depth={8}
        height={0.2}
        thickness={0.3}
        resolution={50}
      />
      <Timer />
      <PineTree position={[-2, 0.3, -2]} />
      <PineTree position={[2, 0.3, 2]} />
      <PineTree position={[-1.5, 0.3, 1.5]} />
      <Snowfall />
    </HakoNiwa>
  );
};
