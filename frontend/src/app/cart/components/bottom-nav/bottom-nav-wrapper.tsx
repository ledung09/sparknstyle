"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import BottomNav from "./bottom-nav";

export default function BottomNavWrapper() {
  const myElementRef = useRef<HTMLDivElement | null>(null);

  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    const currentElement = myElementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "h-[72px] border left-0 right-0 container max-w-screen-lg z-20",
          !isInView ? "fixed bottom-0 shadow-lg" : "absolute"
        )}
      >
        <BottomNav />
      </div>
      <div
        ref={myElementRef}
        className="h-[72px] left-0 right-0 container max-w-screen-lg"
      />
    </>
  );
}
