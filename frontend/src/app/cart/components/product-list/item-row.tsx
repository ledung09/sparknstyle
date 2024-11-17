"use client";

import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartItemType } from "@/types/cart-item";
import { useCart } from "../../hooks/useCart";
import { PriceFormatUtil } from "@/utils/format-price";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useDebounce } from "use-debounce";
import Image from "next/image";

export default function ProductListRow({ data }: { data: CartItemType }) {
  const { user } = useUser();
  const userId = user?.id;

  const { setItem, itemChecked, setItemChecked, setItemQuan } = useCart();

  const [amount, setAmount] = useState(data.quantity);

  const [value] = useDebounce(amount, 200);
  console.log(value);

  const minusAmount = () => setAmount(amount <= 1 ? 1 : amount - 1);
  const plusAmount = () => setAmount(amount + 1);

  const handleChange = (e: any) => {
    const inputValue: string = e.target.value;
    const lastChar = inputValue[inputValue.length - 1];
    if (lastChar >= "0" && lastChar <= "9") {
      setAmount(Number(inputValue) <= 1 ? 1 : Number(inputValue));
    } else setAmount(amount);
  };

  useEffect(() => {
    setItemQuan((prev) => {
      const cpy = { ...prev };
      cpy[data.id] = amount;
      return cpy;
    });
  }, [amount]);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/cart`, {
        user_id: userId,
        item_code: data.id,
        quantity: value,
        item_detail: undefined,
      })
      .then((response) => {
        console.log("Deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting the resource:", error);
      });
  }, [value]);

  return (
    <TableRow className="">
      <TableCell className="w-[50px]">
        <Checkbox
          checked={itemChecked[data.id]}
          onClick={() =>
            setItemChecked((prev) => {
              const cpy = { ...prev };
              cpy[data.id] = !cpy[data.id];
              return cpy;
            })
          }
        />
      </TableCell>
      <TableCell className="text-left">
        <div className="flex gap-x-4">
          <Image
            priority
            className="w-16 h-16 rounded-lg object-cover border-2 p-0.5"
            src={data.image}
            alt={data.name}
            width={0}
            height={0}
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-ellipsis">{data.name}</p>
            <p className="text-muted-foreground text-sm">
              {data.classify.join(", ")}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {PriceFormatUtil.format(data.unit_price)}₫
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center">
          <Button
            disabled={amount <= 1}
            variant={"outline"}
            className="h-8 w-8 flex items-center justify-center p-0 rounded-r-none"
            onClick={minusAmount}
          >
            <Minus className="h-3.5 w-3.5 mt-0.5" strokeWidth={2.5} />
          </Button>

          <Input
            step="1"
            value={amount}
            onChange={handleChange}
            className="text-center h-8 w-14 z-10 rounded-none border-l-0 border-r-0"
          />
          <Button
            variant={"outline"}
            className="h-8 w-8 flex items-center justify-center p-0 rounded-l-none"
            onClick={plusAmount}
          >
            <Plus className="h-3.5 w-3.5 mt-0.5" strokeWidth={2.5} />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {PriceFormatUtil.format(data.unit_price * amount)}₫
      </TableCell>
      <TableCell className="">
        <Button
          className="w-8 h-8 p-0 flex items-center justify-center m-auto"
          variant={"destructive"}
          onClick={() => {
            setItem((prev) => {
              const cpy = [...prev];
              return cpy.filter((item) => item.id !== data.id);
            });
            setItemChecked((prev) => {
              const cpy = { ...prev };
              delete cpy[data.id];
              return cpy;
            });
            setItemQuan((prev) => {
              const cpy = { ...prev };
              delete cpy[data.id];
              return cpy;
            });
            axios
              .delete(
                `${process.env.NEXT_PUBLIC_API_HOST_NAME}/cart/${userId}?productId=${data.id}`
              )
              .then((response) => {
                console.log("Deleted successfully:", response.data);
              })
              .catch((error) => {
                console.error("Error deleting the resource:", error);
              });
          }}
        >
          <Trash size={16} strokeWidth={2.5} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
