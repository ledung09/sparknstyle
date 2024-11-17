import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Tab from "./components/tab";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tab />
      {children}
    </>
  );
}
