"use client";

import { Timer } from "@/features/hako-niwa/timer";
import {
  Bounds,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export const HakoNiwa = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 75 }}
      gl={{ antialias: true }}
      shadows
    >
      <Bounds fit clip observe margin={1}>
        <RoundedBox
          args={[1, 1, 1]}
          position={[0, 0.6, 0]}
          castShadow
          receiveShadow
        >
          <MeshTransmissionMaterial transmissionSampler />
        </RoundedBox>
        <Timer position={[0, 0.4, 0]} scale={[0.3, 0.3, 0.3]} />
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshToonMaterial side={THREE.DoubleSide} color="#ddd" />
        </mesh>
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
