"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import useRole from "@/app/hooks/useRole";

const buyerTab = [
  {
    value: "toprepare",
    label: "To Prepare",
  },
  {
    value: "toship",
    label: "To Ship",
  },
  {
    value: "toreceive",
    label: "To Receive",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const sellerTab = [
  {
    value: "toprepare",
    label: "To Prepare",
  },
  {
    value: "toship",
    label: "To Ship",
  },
];

export default function Tab() {
  const isSeller = useRole();

  const params = useParams();
  const slug = params["slug"];
  if (!slug) return null;

  let tab;
  if (!isSeller) tab = buyerTab;
  else tab = sellerTab;

  return (
    <Tabs defaultValue={slug as string}>
      <TabsList>
        {tab.map((item, index) => (
          <Link
            href={`${!isSeller ? "/purchase" : "/seller/orders"}/${item.value}`}
            key={index}
          >
            <TabsTrigger className={"min-w-32"} value={item.value}>
              {item.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
