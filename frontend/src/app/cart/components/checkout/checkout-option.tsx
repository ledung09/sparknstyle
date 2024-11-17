import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PAYMENT_METHOD } from "@/constant/payment";
import Image from "next/image";
import { HandCoins } from "lucide-react";

export default function CartCheckoutOption({
  payment,
  setPayment,
}: {
  payment: PAYMENT_METHOD;
  setPayment: React.Dispatch<React.SetStateAction<PAYMENT_METHOD>>;
}) {
  return (
    <RadioGroup
      defaultValue={PAYMENT_METHOD.ZP}
      className="space-y-1"
      value={payment}
      onValueChange={(value) => setPayment(value as PAYMENT_METHOD)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={PAYMENT_METHOD.ZP} id={PAYMENT_METHOD.ZP} />
        <Label htmlFor={PAYMENT_METHOD.ZP} className="flex items-center gap-3">
          Zalopay Wallet
          <Image
            priority
            src={"/zalopay.png"}
            alt="Zalopay Logo"
            width={0}
            height={0}
            className="w-8 h-8 mt-[1px]"
          />
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value={PAYMENT_METHOD.COD} id={PAYMENT_METHOD.COD} />
        <Label htmlFor={PAYMENT_METHOD.COD} className="flex items-center gap-3">
          Cash on Delivery
          <HandCoins size={16} className="mt-[1px]" />
        </Label>
      </div>
    </RadioGroup>
  );
}
