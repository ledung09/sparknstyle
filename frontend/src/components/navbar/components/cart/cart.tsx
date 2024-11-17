"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";
import useRole from "@/app/hooks/useRole";

export default function CartBtn() {
  if (useRole()) return null;

  return (
    <Link href={"/cart"}>
      <Button className="w-10 h-10 p-0 m-auto" variant={"ghost"}>
        <ShoppingCart size={20} strokeWidth={2.3} />
      </Button>
    </Link>
  );
}
