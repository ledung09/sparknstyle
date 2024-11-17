"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

export default function DisplaySearch() {
  const params = useSearchParams();

  const query = params.get("query");

  if (!query) return null;

  return (
    <>
      <div className="flex justify-between items-center gap-10">
        <div className="flex items-center gap-2.5">
          <p>
            Search result for{" "}
            <span className="font-medium">
              {'"'}
              {query}
              {'"'}
            </span>
          </p>
        </div>
        <div className="flex gap-2.5 items-center">
          <p className="text-nowrap">Sort by</p>
          <Select>
            <SelectTrigger className="h-[34px] w-[180px] focus:ring-offset-0 select-none">
              <SelectValue placeholder="Order result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low-to-high">
                Price low to high
              </SelectItem>
              <SelectItem value="price-high-to-low">
                Price high to low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}
