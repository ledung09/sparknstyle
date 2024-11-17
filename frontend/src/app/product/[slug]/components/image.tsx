import { RainbowButton } from "@/components/ui/rainbow-button";
import { Glasses, SquareDashedMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductImage({
  data,
}: {
  data: {
    name: string;
    image: string;
  };
}) {
  return (
    <div className="">
      <div className="border-2 rounded-2xl p-4 h-fit relative group">
        <Image
          priority
          className="w-[300px] h-[300px] object-cover group-hover:blur-sm"
          src={data.image}
          alt={data.name}
          width={0}
          height={0}
        />
        <Link
          href={`https://sparknstyle-ai.vercel.app/?image=${encodeURIComponent(
            data.image
          )}`}
          target="_blank"
        >
          <RainbowButton className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0">
            <Glasses className="mr-2" />
            Try it on
          </RainbowButton>
        </Link>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <SquareDashedMousePointer size={16} className="text-muted-foreground mt-[1.5px]" />
        <p className="text-sm text-muted-foreground">
          Hover over image for a virtual try-on
        </p>
      </div>
    </div>
  );
}
