"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
import CartCheckout from "../checkout/checkout";
import { Label } from "@/components/ui/label";
import { useCart } from "../../hooks/useCart";
import { PriceFormatUtil } from "@/utils/format-price";
import { SHIPPING_METHOD } from "@/constant/payment";

export default function BottomNav() {
  const { item, itemQuan, itemChecked, setItemChecked } = useCart();
  const [checked, setChecked] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  let sum = 0;

  item.forEach((row) => {
    if (itemChecked[row.id]) {
      sum += row.unit_price * itemQuan[row.id];
    }
  });

  useEffect(() => {
    let count = 0;
    Object.values(itemChecked).forEach((item) => {
      if (item) count++;
    });
    setCheckCount(count);
    const checkedLen = Object.values(itemChecked).length;
    setChecked(checkedLen > 0 ? count === checkedLen : checked);
  }, [itemChecked]);

  return (
    <div className="flex h-full items-center bg-white dark:bg-[#060609]">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="payment-checkbox"
          checked={checked}
          onClick={() => {
            setChecked(!checked);
            setItemChecked((item) => {
              const cpy = { ...item };
              console.log(cpy);
              Object.keys(cpy).forEach((item) => {
                cpy[item] = !checked;
              });
              return cpy;
            });
          }}
        />
        <Label htmlFor="payment-checkbox" className="cursor-pointer">
          Select All ({item.length})
        </Label>
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <p className="flex items-center gap-1 mt-[1px]">
          Total payment:
          <span className="mb-0.5 text-[22px] font-bold">
            {PriceFormatUtil.format(sum)}₫
          </span>
        </p>
        <CartCheckout sum={sum} disabledBtn={checkCount === 0} />
      </div>
    </div>
  );
}
