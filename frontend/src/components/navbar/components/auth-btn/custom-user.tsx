"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomShipPage from "./custom-ship";

export const CustomUserBtn = () => {
  const router = useRouter();
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8",
      userButtonPopoverCard: "rounded-md",
      userButtonPopoverActionButton: "py-3.5",
    },
  };
  return (
    <UserButton appearance={userButtonAppearance}>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Purchase Order"
          labelIcon={<ShoppingBag size={15} />}
          onClick={() => {
            router.push("/purchase/toprepare");
          }}
        />
      </UserButton.MenuItems>
      <UserButton.UserProfilePage
        label="Ship Detail"
        url="custom"
        labelIcon={<Truck size={16} className="mt-[1px] ml-[1px]" />}
      >
        <CustomShipPage />
      </UserButton.UserProfilePage>
    </UserButton>
  );
};
