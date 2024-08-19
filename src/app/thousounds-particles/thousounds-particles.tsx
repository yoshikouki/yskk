"use client";

import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

import { Bounds, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 1000;

const Particles = () => {
  const radius = 2;

  // This reference gives us direct access to our points
  const points = useRef<RapierRigidBody[]>(null);

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;
    if (!points.current?.material) return;

    points.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

export const ThousandsParticles = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 75 }}
      gl={{ antialias: true }}
      shadows
    >
      <Perf position="bottom-left" />

      <Bounds fit clip observe margin={1}>
        <Particles />
      </Bounds>

      <ambientLight intensity={0.1} />
      <spotLight
        castShadow
        color="white"
        intensity={10}
        position={[-1, 3, 1]}
        angle={Math.PI / 4}
        penumbra={0.5}
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0001}
      />
      <spotLight
        castShadow
        color="white"
        intensity={10}
        position={[1, 3, 1]}
        angle={Math.PI / 4}
        penumbra={0.5}
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0001}
      />
      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        minDistance={2}
        maxDistance={2}
        enablePan={false}
        zoomSpeed={0.3}
      />
    </Canvas>
  );
};
