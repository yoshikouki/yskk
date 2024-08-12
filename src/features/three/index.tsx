"use client";

import { useRef } from "react";

import ThreeManager from "./three-manager";

export default function ThreeScene() {
  const threeManagerRef = useRef<ThreeManager>(null);

  const canvasRef = (canvas: HTMLCanvasElement) => {
    if (!threeManagerRef.current) {
      threeManagerRef.current = new ThreeManager(canvas);
    }
    const threeManager = threeManagerRef.current;
    threeManager.setup();
    threeManager.debug();
    window.addEventListener("resize", threeManager.resize);
    return () => {
      window.removeEventListener("resize", threeManager.resize);
    };
  };

  return <canvas ref={canvasRef} className="h-full w-screen" />;
}
