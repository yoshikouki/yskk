"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="animate-fade-in"
    >
      <SunIcon
        size={24}
        className={cn({
          hidden: resolvedTheme !== "dark",
        })}
      />
      <MoonIcon
        size={24}
        className={cn({
          hidden: resolvedTheme === "dark",
        })}
      />
    </Button>
  );
}
