"use client";

import { Bounds, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const HakoNiwa = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 75 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.01} />
      <hemisphereLight intensity={0.125} color="#8040df" groundColor="red" />
      <spotLight
        castShadow
        color="white"
        intensity={20}
        position={[-1, 3, 1]}
        angle={64}
        penumbra={1}
        shadow-mapSize={[128, 128]}
        shadow-bias={0.00005}
      />

      <Bounds fit clip observe margin={1}>
        {children}
      </Bounds>

      <OrbitControls
        makeDefault
        // 視点の回転範囲
        // 視点の上下の回転範囲
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        // ズーム
        // enableZoom={true}
        minZoom={1}
        maxZoom={2}
        enablePan={true}
        zoomSpeed={0.3}
      />
      <Environment preset="night" />
    </Canvas>
  );
};
