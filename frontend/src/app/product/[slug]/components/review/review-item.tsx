import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ReviewItem() {
  return (
    <div className="first:border-t-0 border-t first:pt-0 pt-4 flex gap-4">
      <Avatar className="border">
        <AvatarImage asChild src="/next.svg">
          <Image src="/next.svg" alt="logo" width={40} height={40} />
        </AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium">Shadcn</p>
        <p className="text-muted-foreground text-xs mt-0.5">
          20/10/2024 - 20:21
        </p>
        <p className="mt-2.5">I love this thing!</p>
      </div>
    </div>
  );
}
