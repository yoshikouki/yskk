"use client";

import { createContext, useContext, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import ThreeManager from "./three-manager";

const ThreeManagerContext = createContext<ThreeManager | null>(null);

export const useThreeManager = () => useContext(ThreeManagerContext);

export default function Canvaze({
  children,
  className,
  debug = false,
}: {
  children: React.ReactNode;
  debug?: boolean;
  className?: string;
}) {
  const threeManagerRef = useRef<ThreeManager>(null);
  const [isMounted, setIsMounted] = useState(false);

  const canvasRef = (canvas: HTMLCanvasElement) => {
    if (!threeManagerRef.current) {
      threeManagerRef.current = new ThreeManager(canvas);
    }
    const threeManager = threeManagerRef.current;
    threeManager.setup();

    if (debug) threeManager.debug();

    window.addEventListener("resize", threeManager.resize);
    setIsMounted(true);
    return () => {
      window.removeEventListener("resize", threeManager.resize);
      threeManager.dispose();
      threeManagerRef.current = null;
    };
  };

  return (
    <ThreeManagerContext value={threeManagerRef.current}>
      <canvas ref={canvasRef} className={cn("h-full w-full", className)}>
        {isMounted && children}
      </canvas>
    </ThreeManagerContext>
  );
}
