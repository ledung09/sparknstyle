"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Router, Star, Tag } from "lucide-react";
import { SearchItemType } from "@/types/search-item";
import { PriceFormatUtil } from "@/utils/format-price";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductSearchCard({ data }: { data: SearchItemType }) {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/product/${data._id}`);
      }}
      className="rounded cursor-pointer hover:ring-offset-2 hover:ring-2 ring-primary  hover:-translate-y-[1px] shadow transition-all"
    >
      <div className="p-1">
        <Image
          className="w-full rounded-t object-cover aspect-square"
          src={data.image}
          alt={data.name}
          width={0}
          height={0}
          priority
        />
      </div>
      <div className="py-2 px-3 flex flex-col gap-0.5">
        <div className="mb-1">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Tag size={14} />
            {data.brand}
          </p>
        </div>
        <p className="leading-6 line-clamp-2">{data.name}</p>
        <p className="font-semibold text-lg">
          {PriceFormatUtil.format(data.price)}₫
        </p>
      </div>
    </Card>
  );
}
