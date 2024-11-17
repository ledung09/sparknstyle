"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductListRow from "./item-row";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../hooks/useCart";

export default function ProductList() {
  const { item, setItemChecked } = useCart();

  const param = useSearchParams();
  const selection = param.get("selection");

  useEffect(() => {
    if (selection) {
      setItemChecked((prev) => {
        if (prev[selection] === undefined) return prev;
        const cpy = { ...prev };
        cpy[selection] = true;
        return cpy;
      });
    }
  }, [item]);


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]"></TableHead>
          <TableHead className="text-left">Product</TableHead>
          <TableHead className="text-center w-[160px]">Unit Price</TableHead>
          <TableHead className="text-center w-[200px]">Quantity</TableHead>
          <TableHead className="text-center w-[160px]">Total Price</TableHead>
          <TableHead className="text-center w-[50px]">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {item.map((row) => {
          return <ProductListRow key={row.id} data={row} />;
        })}
      </TableBody>
    </Table>
  );
}
