import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const Timer = () => {
  const [time, setTime] = useState(getCurrentTime());

  // 毎秒現在時刻を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      position={[0, 0.75, 0]}
      fontSize={0.2}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {time}
    </Text>
  );
};
