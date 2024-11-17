"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

export default function NewNextImage({ ...props }: ImageProps) {
  const { src, alt, className, onLoad, ...remainProps } = props;

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("transition-opacity opacity-0 duration-500", className)}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
      }}
      {...remainProps}
    />
  );
}
