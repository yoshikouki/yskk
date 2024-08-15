import { Center, Float, Text3D } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const Timer = ({
  position = [0, 1.5, 0],
  scale = [1, 1, 1],
}: {
  position?: [number, number, number];
  scale?: [number, number, number];
}) => {
  const [time, setTime] = useState(getCurrentTime());

  // 毎秒現在時刻を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center scale={scale} position={position} disableY>
      <Float
        speed={0.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[0.5, 0.5]}
      >
        <Text3D
          font="/fonts/Inter_Regular.json"
          height={0.2}
          lineHeight={0.6}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.05}
          curveSegments={12}
        >
          {time}
          <meshStandardMaterial
            color={new THREE.Color(0xffffff)}
            emissive={new THREE.Color(0x888888)}
            emissiveIntensity={0.5}
            metalness={0.1}
            roughness={0.2}
          />
        </Text3D>
      </Float>
    </Center>
  );
};
