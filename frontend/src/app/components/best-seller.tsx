"use client";

import React from "react";
import ProductSearchCard from "../search/components/product/product-search-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function BestSeller() {
  const { isPending, error, data } = useQuery({
    queryKey: ["statChart"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/stats/product`).then(
        (res) => res.json()
      ),
  });

  if (isPending) return <div className="h-12"></div>;

  return (
    <div className="mt-[68px] mb-12">
      <p className="text-lg mb-1 text-center">Best seller</p>
      <p className="text-3xl font-medium mb-8 text-center">Crave by buyers</p>
      <div className="grid grid-cols-4 gap-8">
        {data.mostBuy.map((item: any) => (
          <ProductSearchCard
            key={item.id}
            data={{
              name: item.name,
              price: item.unit_price,
              _id: item.id,
              image: item.image,
              brand: item.brand,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href={"/search?query="}>
          <RainbowButton className="mb-2">
            <div className="flex gap-2 items-center">
              <span className="ml-1">Purchase now</span>
              <ArrowRight className="mt-0.5" fontSize={3} />
            </div>
          </RainbowButton>
        </Link>
      </div>
    </div>
  );
}
