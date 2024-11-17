"use client";

import { useRouter } from "next/navigation";
import { useSearchInput } from "../hooks/useSearchInput";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useRole from "@/app/hooks/useRole";

export default function SearchResultItem({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const isSeller = useRole();
  const { setSearchInput, setFocusInput } = useSearchInput();
  const router = useRouter();
  return (
    <CommandItem
      onSelect={(value) => {
        setSearchInput(value);
        setFocusInput(false);
        router.push(
          !isSeller
            ? `/search?query=${value}`
            : `/seller/products?query=${value}`
        );
      }}
      className={cn("cursor-pointer hover:bg-accent", className)}
    >
      {value}
    </CommandItem>
  );
}
