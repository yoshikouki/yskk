"use client";

import { useEffect } from "react";
import * as THREE from "three";

import { useThreeManager } from "..";

export const Cube = () => {
  const threeManager = useThreeManager();

  useEffect(() => {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    threeManager?.addObject({
      object: cube,
      animate: () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      },
    });
  }, [threeManager]);

  return null;
};
