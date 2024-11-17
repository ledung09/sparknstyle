"use client";

import React from "react";
import ProductSearchCard from "./product-search-card";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchItemType } from "@/types/search-item";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ProductList() {
  const params = useSearchParams();
  const query = params.toString();

  const { isPending, error, data } = useQuery({
    queryKey: ["query", query],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST_NAME}/search/atlassearch?${query}`
      ).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="flex justify-center mt-6">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );

  if (error) return null;

  return (
    <>
      {!Array.isArray(data) || data.length === 0 ? (
        <div className="w-full flex justify-center">
          <Image
            src={"/not-found.jpg"}
            alt="No product found"
            width={0}
            height={0}
            className="w-40 h-40 "
            priority
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
          {(data as SearchItemType[])
            .sort((a, b) => a.price - b.price)
            .map((item, index) => (
              <ProductSearchCard key={item._id} data={item} />
            ))}
        </div>
      )}
    </>
  );
}
