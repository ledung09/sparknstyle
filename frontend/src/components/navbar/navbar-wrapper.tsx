"use client";
import { usePathname } from "next/navigation";
import React from "react";
import MainNav from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
    return null;

  return <MainNav />;
}
