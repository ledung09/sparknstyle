import React from "react";
import DetailActionBtns from "./action-button";
import { Star } from "lucide-react";
import ItemCount from "@/components/custom/item-count";
import { Separator } from "@/components/ui/separator";
import ProductDetailOption from "./option/option";
import { ProductProvider } from "@/app/product/context/product";
import { PriceFormatUtil } from "@/utils/format-price";

export default async function ProductDetail({
  data,
}: {
  data: {
    slug: string;
    name: string;
    price: number;
    classify: { [key: string]: string[] };
    image: string;
    brand: string;
  };
}) {
  const { name, price, classify } = data;
  return (
    <ProductProvider>
      <div className="flex-1 flex flex-col gap-y-2.5">
        <h1 className="text-2xl font-semibold leading-9">{name}</h1>
        <span className="text-4xl font-semibold tracking-wide my-1">
          {PriceFormatUtil.format(price)}₫
        </span>
        <ProductDetailOption data={{ classify }} />
        <Separator className="my-2.5" />
        <div className="flex items-center gap-8">
          <p className="min-w-28">Quantity</p>
          <ItemCount />
        </div>
        <DetailActionBtns
          data={{
            slug: data.slug,
            name: data.name,
            price: data.price,
            image: data.image,
            brand: data.brand,
          }}
        />
      </div>
    </ProductProvider>
  );
}
