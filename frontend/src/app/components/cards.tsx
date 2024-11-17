import { Card } from "@/components/ui/card";
import React from "react";
import CardItem from "./card-item";

const cardData = [
  {
    id: 1,
    title: "Add to cart",
    description:
      "Easily add items to your cart for a smooth and hassle-free shopping experience.",
  },
  {
    id: 2,
    title: "Place orders",
    description:
      "Place orders conveniently, with multiple payment options to choose from.",
  },
  {
    id: 3,
    title: "Make payment",
    description:
      "Our gateway integrates with Zalopay for various payments and supports COD.",
  },
];

export default function SimplicityCard() {
  return (
    <div className="bg-primary">
      <div className="container max-w-screen-lg py-12">
        <p className="text-3xl font-medium mb-8 text-white">
          Shopping with simplicity!
        </p>
        <div className="flex gap-10">
          {cardData.map((item) => (
            <CardItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
