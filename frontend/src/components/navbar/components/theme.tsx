"use client";

import { Button } from "@/components/ui/button";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeBtn() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="w-10 h-10 p-0 m-auto"
      variant={"ghost"}
      onClick={() => {
        const curTheme = theme === "dark" ? "light" : "dark";
        setTheme(curTheme);
      }}
    >
      <Sun
        size={20}
        className="dark:hidden flex"
      />
      <MoonStar
        size={19.5}
        className="dark:flex hidden"
      />
    </Button>
  );
}