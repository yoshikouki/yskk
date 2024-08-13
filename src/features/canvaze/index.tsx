"use client";

import { useRef } from "react";

import ThreeManager from "./three-manager";

export default function Canvaze({
  debug = false,
}: {
  debug?: boolean;
}) {
  const threeManagerRef = useRef<ThreeManager>(null);

  const canvasRef = (canvas: HTMLCanvasElement) => {
    if (!threeManagerRef.current) {
      threeManagerRef.current = new ThreeManager(canvas);
    }
    const threeManager = threeManagerRef.current;
    threeManager.setup();

    if (debug) threeManager.debug();

    window.addEventListener("resize", threeManager.resize);
    return () => {
      window.removeEventListener("resize", threeManager.resize);
      threeManager.dispose();
      threeManagerRef.current = null;
    };
  };

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
