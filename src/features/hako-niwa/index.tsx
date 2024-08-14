"use client";

import {
  CameraControls,
  Environment,
  Instances,
  Lightformer,
  MeshTransmissionMaterial,
  Sphere,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const spheres = [
  [1, "orange", 0.05, [-4, -1, -1]],
  [0.75, "hotpink", 0.1, [-4, 2, -2]],
  [1.25, "aquamarine", 0.2, [4, -3, 2]],
  [1.5, "lightblue", 0.3, [-4, -2, -3]],
  [2, "pink", 0.3, [-4, 2, -4]],
  [2, "skyblue", 0.3, [-4, 2, -4]],
  [1.5, "orange", 0.05, [-4, -1, -1]],
  [2, "hotpink", 0.1, [-4, 2, -2]],
  [1.5, "aquamarine", 0.2, [4, -3, 2]],
  [1.25, "lightblue", 0.3, [-4, -2, -3]],
  [1, "pink", 0.3, [-4, 2, -4]],
  [1, "skyblue", 0.3, [-4, 2, -4]],
];

export const HakoNiwa = () => {
  return (
    <Canvas>
      <ambientLight args={[0xff0000]} intensity={0.1} />
      <directionalLight position={[0, 1, 5]} intensity={0.5} />
      <CameraControls
        truckSpeed={0}
        dollySpeed={0}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      {/** Custom environment map */}
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>

      <RotatingCube />
      <mesh castShadow scale={[1, 1, 1]}>
        <Sphere scale={0.7} position={[2, 1, 0]} color="green" />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          transmissionSampler
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <Instances renderOrder={-1000}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial depthTest={false} />
        {spheres.map(([scale, color, speed, position], index) => (
          <Sphere
            key={index}
            scale={scale}
            color={color}
            speed={speed}
            position={position}
          />
        ))}
      </Instances>
    </Canvas>
  );
};

const RotatingCube = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime();
    // meshRef.current.rotation.y = clock.getElapsedTime();
    // meshRef.current.rotation.z = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
