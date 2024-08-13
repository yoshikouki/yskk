"use client";

import Canvaze from "@/features/canvaze";
import { Cube } from "@/features/canvaze/objects/cube";

export const RotatingCube = () => {
  return (
    <Canvaze>
      <Cube
        geometry={{ width: 2, height: 1, depth: 1 }}
        material={{ color: 0x00ffff }}
        animate={(cube) => {
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
        }}
      />
    </Canvaze>
  );
};
