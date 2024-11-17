import Tab from "@/app/purchase/components/tab";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tab />
      {children}
    </>
  );
}
