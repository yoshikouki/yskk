"use client";
import {
  Bounds,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  CuboidCollider,
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
  Physics,
  type RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 1000;

const ThousandsParticles = () => {
  const points = useRef<RapierRigidBody[]>(null);

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < COUNT; i++) {
      instances.push({
        key: `instance_${Math.random()}`,
        position: [Math.random() - 1, Math.random() * 4, Math.random() - 1],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  return (
    <InstancedRigidBodies ref={points} instances={instances} colliders="ball">
      <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT}>
        <sphereGeometry args={[0.01, 48, 48]} />
        <meshToonMaterial color="#5786F5" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

export const PhysicsParticles = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 75 }}
      gl={{ antialias: true }}
      shadows
    >
      <Perf position="bottom-left" />

      <Bounds fit clip observe margin={1}>
        <Suspense fallback={<>Building Physic World...</>}>
          <Physics
            gravity={[0, -1, 0]}
            // interpolation={false}
            colliders="hull"
            // debug
          >
            <RigidBody>
              <RoundedBox
                args={[1, 1, 1]}
                position={[0, 0.6, 0]}
                castShadow
                receiveShadow
              >
                <MeshTransmissionMaterial transmissionSampler />
              </RoundedBox>
            </RigidBody>
            <ThousandsParticles />

            <CuboidCollider args={[5, 0.1, 5]} position={[0, -1, 0]}>
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
