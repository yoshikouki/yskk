"use client";

import { Bounds, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const HakoNiwa = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 75 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
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
