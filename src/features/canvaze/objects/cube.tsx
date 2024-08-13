"use client";

import { useEffect } from "react";
import * as THREE from "three";

import { useThreeManager } from "..";

export const Cube = ({
  position = {
    x: 0,
    y: 0,
    z: 0,
  },
  geometry = {
    width: 1,
    height: 1,
    depth: 1,
  },
  material = {
    color: 0x00ff00,
  },
  animate,
}: {
  position?: {
    x: number;
    y: number;
    z: number;
  };
  geometry?: {
    width: number;
    height: number;
    depth: number;
  };
  material?: {
    color: number;
  };
  animate?: (cube: THREE.Mesh) => void;
}) => {
  const threeManager = useThreeManager();

  useEffect(() => {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(geometry.width, geometry.height, geometry.depth),
      new THREE.MeshBasicMaterial({ color: material.color }),
    );
    cube.position.set(position.x, position.y, position.z);
    threeManager?.addObject({
      object: cube,
      animate: () => animate?.(cube),
    });
  }, [threeManager, position, geometry, material, animate]);

  return null;
};
