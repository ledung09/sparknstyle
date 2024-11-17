import React from "react";
import ProductDetailOptionRow from "./option-row";
import { cn } from "@/lib/utils";

export default async function ProductDetailOption({
  data,
}: {
  data: {
    classify: { [key: string]: string[] };
  };
}) {
  const { classify } = data;
  if (!Object.keys(classify).length) return;
  return (
    <div className={cn("flex flex-col gap-4 mt-4")}>
      {Object.keys(classify).map((item, index) => {
        return (
          <ProductDetailOptionRow
            key={index}
            data={{
              key: item,
              value: classify[item],
            }}
          />
        );
      })}
    </div>
  );
}
