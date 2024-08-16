"use client";
import {
  Bounds,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import * as THREE from "three";

export const PhysicsParticles = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 75 }}
      gl={{ antialias: true }}
      shadows
    >
      <Bounds fit clip observe margin={1}>
        <Suspense>
          <Physics
            gravity={[0, -1, 0]}
            // interpolation={false}
            colliders="hull"
            // debug
          >
            <RigidBody>
              <RoundedBox args={[1, 1, 1]} castShadow receiveShadow>
                <MeshTransmissionMaterial transmissionSampler />
              </RoundedBox>
            </RigidBody>
            {Array.from({ length: 100 }).map((_, index) => (
              <RigidBody
                key={index}
                position={[Math.random() * 2 - 1, 2, Math.random() * 2 - 1]}
              >
                <mesh>
                  <sphereGeometry args={[0.05]} />
                  <meshToonMaterial
                    color={`hsl(${Math.random() * 360}, 100%, 50%)`}
                  />
                </mesh>
              </RigidBody>
            ))}
            <CuboidCollider args={[2, 0.1, 2]} position={[0, -1, 0]}>
              <meshToonMaterial side={THREE.DoubleSide} color="#ddd" />
            </CuboidCollider>
          </Physics>
        </Suspense>
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
