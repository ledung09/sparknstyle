import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SHIPPING_DAY,
  SHIPPING_METHOD,
  SHIPPING_PRICE,
} from "@/constant/payment";
import { cn } from "@/lib/utils";
import React from "react";

export default function CheckoutShip({
  shipping,
  setShipping,
}: {
  shipping: SHIPPING_METHOD;
  setShipping: React.Dispatch<React.SetStateAction<SHIPPING_METHOD>>;
}) {
  return (
    <div className="space-y-3 mt-1">
      <Label>Delivery</Label>
      <div className="">
        <RadioGroup
          defaultValue={SHIPPING_METHOD.EXPRESS}
          value={shipping}
          onValueChange={(value) => setShipping(value as SHIPPING_METHOD)}
        >
          {[SHIPPING_METHOD.EXPRESS, SHIPPING_METHOD.STANDARD].map((item) => (
            <Card className={cn("px-4 py-2 flex gap-3.5 cursor-pointer", shipping === item && "border-primary bg-primary/5")} key={item} onClick={() => {
              setShipping(item)
            }}>
              <RadioGroupItem value={item} className="mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  <span className="font-bold">{item.toUpperCase()}</span> shipping
                </p>
                <p className="text-xs text-muted-foreground">
                  Guaranteed to get in {SHIPPING_DAY[item]} days.
                </p>
              </div>
              <p className="font-semibold ml-auto">{SHIPPING_PRICE[item]}₫</p>
            </Card>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
