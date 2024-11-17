"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useProduct } from "@/app/product/hooks/useProduct";

export default function ItemCount({ className }: { className?: string }) {
  const { disabled, setQuantity } = useProduct();
  const [amount, setAmount] = useState(1);

  const setAmountHelper = (quan: number) => {
    setAmount(quan);
    setQuantity(quan);
  };

  const minusAmount = () => setAmountHelper(amount <= 1 ? 1 : amount - 1);
  const plusAmount = () => setAmountHelper(amount + 1);

  const handleChange = (e: any) => {
    const inputValue: string = e.target.value;
    const lastChar = inputValue[inputValue.length - 1];
    if (lastChar >= "0" && lastChar <= "9") {
      setAmountHelper(Number(inputValue) <= 1 ? 1 : Number(inputValue));
      return;
    }
    setAmountHelper(amount);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        disabled={amount <= 1 || disabled}
        variant={"outline"}
        className="h-8 w-8 flex items-center justify-center p-0 rounded-r-none"
        onClick={minusAmount}
      >
        <Minus className="h-3.5 w-3.5 mt-0.5" strokeWidth={2.5} />
      </Button>

      <Input
        disabled={disabled}
        step="1"
        value={amount}
        onChange={handleChange}
        className="text-center h-8 w-14 z-10 rounded-none border-l-0 border-r-0"
      />
      <Button
        disabled={disabled}
        variant={"outline"}
        className="h-8 w-8 flex items-center justify-center p-0 rounded-l-none"
        onClick={plusAmount}
      >
        <Plus className="h-3.5 w-3.5 mt-0.5" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
