"use client";

import useRole from "@/app/hooks/useRole";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  const isSeller = useRole();
  const pathName = usePathname();
  console.log(pathName);

  return (
    <section
      className={cn(
        "overflow-y-auto",
        !isSeller ? "py-6 min-h-screen" : "pl-60 mx-4",
        pathName !== "/" &&
          !pathName.startsWith("/seller") &&
          !pathName.startsWith("/sign-in") &&
          !pathName.startsWith("/sign-up") &&
          "container max-w-screen-lg",
        (pathName.startsWith("/sign-in") || pathName.startsWith("/sign-up")) &&
          "bg-[#F0F4F9]"
      )}
    >
      {children}
    </section>
  );
}
