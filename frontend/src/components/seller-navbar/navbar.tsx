"use client";

import useRole from "@/app/hooks/useRole";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
  ChartArea,
  LayoutDashboard,
  Megaphone,
  Package,
  ShoppingCart,
} from "lucide-react";
import { SellerNavbarData } from "./navbar-data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SellerNavbarWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  if (!useRole()) return null;

  return (
    <section className="w-60 bg-white border-r fixed top-0 h-screen">
      <div className="flex justify-start">
        <a
          className="font-bold text-2xl tracking-tight ml-4 mt-[18px]"
          href="/"
        >
          <Image
            alt="Spark&Style logo"
            src={"/web-logo.png"}
            height={0}
            width={0}
            className="w-[140px]"
            priority
          />
        </a>
      </div>
      <div className="flex flex-col gap-1 mt-7 px-1.5 w-full">
        {SellerNavbarData.map((item) => {
          return (
            <Link key={item.id} href={item.href}>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="justify-start w-full"
              >
                <item.icon size={15} className="mr-1" />{" "}
                <p className="mb-[1px]">{item.label}</p>
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
