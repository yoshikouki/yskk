"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import ThreeManager from "./three-manager";

export default function Canvaze({
  className,
  debug = false,
}: {
  debug?: boolean;
  className?: string;
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

  return <canvas ref={canvasRef} className={cn("h-full w-full", className)} />;
}
