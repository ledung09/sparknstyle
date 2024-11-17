"use client";

import { useProduct } from "@/app/product/hooks/useProduct";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function ProductDetailOptionRow({
  data,
}: {
  data: {
    key: string;
    value: string[];
  };
}) {
  const { key, value } = data;
  const { setClassify } = useProduct();
  const [select, setSelect] = useState<boolean[]>(
    Array(value.length).fill(false)
  );

  useEffect(() => {
    setClassify((prev) => {
      const cpy = { ...prev };
      cpy[key] = value.filter((_, index) => select[index]);
      return cpy;
    });
  }, [select]);

  return (
    <div className="flex items-center gap-8">
      <p className="min-w-28">{key}</p>
      <div className="flex items-start gap-3">
        {value.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "text-sm py-2 px-3 hover:border-primary hover:bg-primary/10 cursor-pointer",
              select[index] && "border-primary bg-primary/10"
            )}
            onClick={() =>
              setSelect((prev) => {
                let cpy = [...prev];
                if (cpy.filter((item) => item).length >= 1 && !select[index]) {
                  cpy = Array(value.length).fill(false);
                }
                cpy[index] = !cpy[index];
                return cpy;
              })
            }
          >
            {item}
          </Card>
        ))}
      </div>
    </div>
  );
}
