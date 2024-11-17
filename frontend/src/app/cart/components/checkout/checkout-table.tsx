import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartCheckoutTableRow from "./checkout-table-row";
import { useCart } from "../../hooks/useCart";

export default function CartCheckoutTable() {
  const { item, itemChecked } = useCart();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-right w-[140px]">Unit Price</TableHead>
          <TableHead className="text-right w-[100px]">Quantity</TableHead>
          <TableHead className="text-right w-[140px]">Item Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {item.map((row) => {
          if (!itemChecked[row.id]) return null;
          return <CartCheckoutTableRow key={row.id} data={row} />;
        })}
      </TableBody>
    </Table>
  );
}
