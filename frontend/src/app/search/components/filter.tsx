"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { Fragment, useState } from "react";
import FilterRow from "./filter-row";
import { GLASS_BRAND } from "@/constant/brand";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("query");

  const [range, setRange] = useState<string[]>(["", ""]);
  const [brand, setBrand] = useState<boolean[]>(Array(5).fill(false));

  const onRangeChange = (e: any, index: number) => {
    setRange((prev) => {
      const cpy = [...prev];
      cpy[index] = e.target.value;
      return cpy;
    });
  };

  return (
    <Card className="p-4 pt-1.5">
      <Accordion type="multiple" defaultValue={["brands", "pricing"]}>
        <AccordionItem value="brands">
          <AccordionTrigger className="py-3">Brands</AccordionTrigger>
          <AccordionContent className="space-y-3 mt-1">
            {GLASS_BRAND.map((item, index) => {
              return (
                <FilterRow
                  key={index}
                  text={item}
                  index={index}
                  state={brand}
                  setState={setBrand}
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <AccordionTrigger className="py-3">Pricing</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 items-center">
              {["Min", "Max"].map((item, index) => {
                return (
                  <Fragment key={item}>
                    <Input
                      placeholder={`₫ ${item}`}
                      className="m-1 max-w-[88px] focus-visible:ring-offset-0 h-8"
                      type="number"
                      value={range[index]}
                      onChange={(e) => onRangeChange(e, index)}
                    />
                    {index === 0 && <p className="font-bold text-lg">-</p>}
                  </Fragment>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className="w-full mt-4"
        size={"sm"}
        onClick={() => {
          let additionalQuery = "";
          brand.forEach((item, index) => {
            if (item) additionalQuery += `&brand=${GLASS_BRAND[index]}`;
          });
          if (range[0]) additionalQuery += `&min=${range[0]}`;
          if (range[1]) additionalQuery += `&max=${range[1]}`;
          router.push(`/search?query=${query}${additionalQuery}`);
        }}
      >
        Apply filter
      </Button>
    </Card>
  );
}
