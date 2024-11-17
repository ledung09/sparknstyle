import { TableCell, TableRow } from "@/components/ui/table";
import { CartItemType } from "@/types/cart-item";
import { PriceFormatUtil } from "@/utils/format-price";
import React from "react";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";

export default function CartCheckoutTableRow({ data }: { data: CartItemType }) {
  const { itemQuan } = useCart();

  return (
    <TableRow>
      <TableCell className="text-left">
        <div className="flex gap-x-4">
          <Image
            priority
            className="w-12 h-12 rounded-lg border object-cover p-0.5"
            src={data.image}
            alt={data.name}
            width={0}
            height={0}
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm">{data.name}</p>
            <p className="text-muted-foreground text-xs">
              {data.classify.join(", ")}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {PriceFormatUtil.format(data.unit_price)}₫
      </TableCell>
      <TableCell className="text-right">{itemQuan[data.id]}</TableCell>
      <TableCell className="text-right">
        {PriceFormatUtil.format(data.unit_price * itemQuan[data.id])}₫
      </TableCell>
    </TableRow>
  );
}
