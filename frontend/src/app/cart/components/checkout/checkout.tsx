"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CartCheckoutTable from "./checkout-table";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import CartCheckoutOption from "./checkout-option";
import {
  PAYMENT_METHOD,
  SHIPPING_METHOD,
  SHIPPING_PRICE,
} from "@/constant/payment";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { PriceFormatUtil } from "@/utils/format-price";
import CheckoutShip from "./checkout-ship";
import { useCart } from "../../hooks/useCart";
import { CartItemType } from "@/types/cart-item";
import { useUser } from "@clerk/nextjs";
import { ORDER_STATUS } from "@/constant/order";
import { v4 as uuidv4 } from "uuid";

export default function CartCheckout({
  sum,
  disabledBtn,
}: {
  sum: number;
  disabledBtn: boolean;
}) {
  const router = useRouter();
  const { user } = useUser();

  const { item, itemChecked, itemQuan } = useCart();

  const [loading, setLoading] = React.useState(false);
  const [payment, setPayment] = React.useState(PAYMENT_METHOD.ZP);
  const [shipping, setShipping] = React.useState(SHIPPING_METHOD.EXPRESS);
  const [open, setOpen] = useState(false);

  const routerPush = (url: string) => {
    router.push(url);
  };

  const userId = user?.id;

  const finalItem: CartItemType[] = [];

  item.forEach((row) => {
    if (itemChecked[row.id]) {
      const cpy = { ...row };
      cpy["quantity"] = itemQuan[row.id];
      finalItem.push(cpy);
    }
  });
  console.log(finalItem);

  const totalOrderSum = sum + SHIPPING_PRICE[shipping];

  const addOrder = (status: ORDER_STATUS, body: any, callback: () => void) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/order`, {
        ...body,
        status,
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const orderIdRef = React.useRef<string | null>(null);

  useEffect(() => {
    orderIdRef.current = uuidv4();
  }, []);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          disabled={disabledBtn}
          onClick={() => setOpen(true)}
        >
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Review your items and ensure all details are correct before placing
            your order.
          </DialogDescription>
        </DialogHeader>
        <CartCheckoutTable />

        <div className="space-y-3">
          <Label>Payment</Label>
          <CartCheckoutOption payment={payment} setPayment={setPayment} />
        </div>

        <CheckoutShip shipping={shipping} setShipping={setShipping} />
        <Separator />
        <div className="ml-auto flex items-center space-x-6">
          <p className="flex items-center gap-1 mt-[1px]">
            Total payment:
            <span className="mb-0.5 text-[22px] font-bold">
              {PriceFormatUtil.format(totalOrderSum)}₫
            </span>
          </p>

          <Button
            disabled={loading}
            variant={"default"}
            onClick={async () => {
              const orderId = orderIdRef.current;

              setLoading(true);
              if (payment === PAYMENT_METHOD.ZP) {
                axios
                  .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/payment`, {
                    amount: sum + SHIPPING_PRICE[shipping],
                    description: `Payment for order ${orderId}`,
                    orderId,
                  })
                  .then((response) => {
                    console.log(response.data);

                    // Handle the response
                    setLoading(false);
                    setOpen(false);

                    window.open(
                      response.data.orderurl,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  })
                  .catch((error) => {
                    // Handle the error
                    console.error("Error:", error);
                  });
              }
              addOrder(
                payment === PAYMENT_METHOD.ZP
                  ? ORDER_STATUS.PENDING
                  : ORDER_STATUS.PREPARE,
                {
                  code: orderId,
                  user_id: userId,
                  total_price: totalOrderSum,
                  ordered_item: finalItem,
                },
                () => {
                  if (payment === PAYMENT_METHOD.COD)
                    routerPush("/purchase/toprepare");
                }
              );
              return;
            }}
          >
            {loading && (
              <LoaderCircle
                size={16}
                className="mt-[1px] animate-spin"
                strokeWidth={2.5}
              />
            )}
            Place order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
