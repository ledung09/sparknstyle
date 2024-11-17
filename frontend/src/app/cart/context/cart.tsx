"use client";

import { useCartNav } from "@/components/navbar/components/cart/hooks/useCartNav";
import { CartItemType } from "@/types/cart-item";
import { Common_Object } from "@/types/common/object";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";

export const cartContext = React.createContext<{
  item: CartItemType[];
  setItem: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  itemChecked: Common_Object<boolean>;
  setItemChecked: React.Dispatch<React.SetStateAction<Common_Object<boolean>>>;
  itemQuan: Common_Object<number>;
  setItemQuan: React.Dispatch<React.SetStateAction<Common_Object<number>>>;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const userId = user?.id;

  const cartInit: CartItemType[] = [];

  const [item, setItem] = React.useState(cartInit);

  const [itemChecked, setItemChecked] = React.useState<Common_Object<boolean>>(
    {}
  );

  const [itemQuan, setItemQuan] = React.useState<Common_Object<number>>({});

  React.useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/cart/${userId}`)
        .then((response) => {
          const itemList: CartItemType[] = response.data;
          setItem(itemList);

          console.log("LIST", itemList);

          const cartItemChecked: Common_Object<boolean> = {};
          const cartItemCQuantity: Common_Object<number> = {};
          itemList.forEach((item) => {
            cartItemChecked[item.id] = false;
            cartItemCQuantity[item.id] = item.quantity;
          });

          setItemChecked(cartItemChecked);
          setItemQuan(cartItemCQuantity);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [userId]);

  return (
    <cartContext.Provider
      value={{
        item,
        setItem,
        itemChecked,
        setItemChecked,
        itemQuan,
        setItemQuan,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
