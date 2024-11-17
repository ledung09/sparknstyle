"use client";

import useRole from "@/app/hooks/useRole";
import { Heart } from "lucide-react";
import React from "react";

export default function BottomNav() {
  if (useRole()) return null;
  return (
    <nav className="border-t">
      <div className="container h-24 flex items-center justify-center">
        <p className="leading-loose text-muted-foreground flex items-center gap-1">
          <span>
            © 2024 Spark & Style. Built by{" "}
            <a
              href="https://www.linkedin.com/in/dungdinhle/"
              className="font-medium hover:underline underline-offset-4"
            >
              ledung09
            </a>{" "}
            and teamates with
          </span>{" "}
          <Heart size={16} fill="red" color="black" className="mt-0.5" />
        </p>
      </div>
    </nav>
  );
}
