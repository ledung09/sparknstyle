import React from "react";
import { PriceFormatUtil } from "@/utils/format-price";
import Image from "next/image";

export default function TopProductSection({
  data,
}: {
  data: {
    id: string;
    name: string;
    unit_price: number;
    image: string;
    brand: string;
  }[];
}) {
  return (
    <div className="space-y-4">
      {data.map((item) => {
        return (
          <div className="flex gap-8 items-center" key={item.id}>
            <div className="flex gap-3 items-center">
              <Image
                className="w-12 h-12 rounded-md object-cover p-0.5 border"
                src={item.image}
                alt={item.name}
                width={0}
                height={0}
                priority
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
              </div>
            </div>
            <p className="ml-auto font-medium">
              {PriceFormatUtil.format(item.unit_price)}₫
            </p>
          </div>
        );
      })}
    </div>
  );
}
