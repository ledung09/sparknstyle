"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductDialog from "./components/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, PackagePlus, Pen, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchItemTypeFull } from "@/types/search-item";
import { PriceFormatUtil } from "@/utils/format-price";
import TrashDialog from "./components/trash-dialog";
import Image from "next/image";

export default function Page() {
  const params = useSearchParams();
  const query = params.toString();

  const { isPending, error, data } = useQuery({
    queryKey: ["query", query],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST_NAME}/search/atlassearch?${
          query ? query : "query="
        }`
      ).then((res) => res.json()),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isPending)
    return (
      <div className="flex justify-center mt-6 min-h-screen">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );

  if (error) return null;

  console.log(data);

  return (
    <>
      <div className="flex justify-en mt-1 mb-4">
        <ProductDialog>
          <Button className="" size={"sm"}>
            <PackagePlus size={16} /> Add Product
          </Button>
        </ProductDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as SearchItemTypeFull[]).map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell>
                  <Image
                    priority
                    src={item.image}
                    alt={item.name}
                    width={0}
                    height={0}
                    className="w-12 h-12 rounded object-cover p-0.5 border"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{PriceFormatUtil.format(item.price)}₫</TableCell>
                <TableCell className="font-medium">{item.brand}</TableCell>
                <TableCell className="truncate max-w-60">
                  {item.description}
                </TableCell>
                <TableCell className="flex justify-end gap-1.5">
                  <ProductDialog data={item}>
                    <Button size={"icon"} className="h-8 w-8 ml-2.5">
                      <Pen size={16} strokeWidth={2.5} />
                    </Button>
                  </ProductDialog>
                  <TrashDialog id={item._id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
