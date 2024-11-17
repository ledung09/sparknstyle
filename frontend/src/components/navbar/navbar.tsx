"use client";

import React from "react";
import NavRightSection from "./nav-right-section";
import Image from "next/image";
import useRole from "@/app/hooks/useRole";
import { cn } from "@/lib/utils";

export default function MainNav() {
  const isSeller = useRole();

  return (
    <header className="w-full">
      <div
        className={cn(
          "flex items-center",
          !isSeller
            ? "container max-w-screen-lg h-[72px]"
            : "pl-64 pr-6 h-[56px] border-b mb-4"
        )}
      >
        <nav className="flex items-center gap-4 text-sm lg:gap-6 select-none w-full">
          {!isSeller && (
            <div className="min-w-[220px] flex items-center">
              <a
                className="font-bold text-2xl mr-1.5 mb-[1px] tracking-tight"
                href="/"
              >
                <Image
                  alt="Spark&Style logo"
                  src={"/web-logo.png"}
                  height={0}
                  width={0}
                  className="w-48"
                  priority
                />
              </a>
            </div>
          )}
          <NavRightSection />
        </nav>
      </div>
    </header>
  );
}
