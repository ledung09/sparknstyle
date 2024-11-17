"use client";

import { useProduct } from "@/app/product/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { CreditCard, Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { it } from "node:test";
import React, { useState } from "react";

export default function DetailActionBtns({
  data,
}: {
  data: {
    slug: string;
    name: string;
    price: number;
    image: string;
    brand: string;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { slug, name, price, image, brand } = data;
  const { disabled, classify, quantity } = useProduct();

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const redirectSignIn = () => {
    router.push("/sign-in");
  };

  const addToCart = (load: boolean) => {
    setLoading(load);

    const classified: { [key: string]: string } = {};

    Object.keys(classify).map((item) => {
      if (classify[item]) classified[item] = classify[item][0];
    });

    const item = {
      name,
      price,
      id: slug,
      classify: classified,
      quantity,
      image,
      brand,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/cart`, {
        user_id: user!.id,
        item_code: slug,
        quantity: quantity,
        item_detail: item,
      })
      .then((response) => {
        setLoading(false);
        if (load) {
          toast({
            title: "Item is added to cart",
            description: "Click on me to navigate to cart! ➡️",
            duration: 2000,
            onClick: () => {
              router.push("/cart");
            },
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex items-center gap-4 mt-3">
      <Button
        disabled={disabled}
        onClick={() => {
          if (!isSignedIn) redirectSignIn();
          addToCart(false);
          router.push(`/cart?selection=${data.slug}`);
        }}
      >
        <CreditCard className="mt-[1px]" />
        Buy now
      </Button>
      <Button
        variant={"outline"}
        disabled={disabled}
        onClick={async () => {
          if (!isSignedIn) redirectSignIn();
          addToCart(true);
        }}
      >
        {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
        Add to Cart
      </Button>
    </div>
  );
}
