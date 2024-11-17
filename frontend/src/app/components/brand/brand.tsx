"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const data = [
  {
    id: 1,
    src: "/ray-ban.png",
    url: "Ray-ban",
  },
  {
    id: 2,
    src: "/oakley.png",
    url: "Oakley",
  },
  {
    id: 3,
    src: "/gucci.jpg",
    url: "Gucci",
  },
  {
    id: 4,
    src: "/prada.png",
    url: "Prada",
  },
];

export default function HomeBrand() {
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="mt-6 flex justify-around">
      {data.map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger>
              <Image
                priority
                src={item.src}
                width={0}
                height={0}
                alt="Ray-ban logo"
                className="h-12 w-[86px] cursor-pointer"
                onClick={() => navigate(`/search?query=&brand=${item.url}`)}
              />
            </TooltipTrigger>
            <TooltipContent align="end" side="bottom" sideOffset={20}>
              <p>{item.url}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
