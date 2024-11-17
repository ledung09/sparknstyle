import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CartItemType } from "@/types/cart-item";
import { PriceFormatUtil } from "@/utils/format-price";
import Image from "next/image";

export default function PurchaseItemRowListRow({
  data,
}: {
  data: CartItemType;
}) {
  console.log(data);
  return (
    <TableRow>
      <TableCell className="text-left">
        <div className="flex gap-x-4">
          <Image
            priority
            className="w-20 h-20 rounded-lg object-cover border-2 p-0.5"
            src={data.image}
            width={0}
            height={0}
            alt={data.name}
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="">{data.name}</p>
            <p className="text-muted-foreground text-sm">
              {data.classify.join(" ,")}
            </p>
            <p className="">×{data.quantity}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {PriceFormatUtil.format(data.unit_price)}₫
      </TableCell>
    </TableRow>
  );
}
