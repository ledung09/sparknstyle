"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSearchInput } from "./hooks/useSearchInput";
import { CommandInput } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useRole from "@/app/hooks/useRole";

export default function SearchInput({ enter }: { enter: boolean }) {
  const router = useRouter();
  const isSeller = useRole();
  const { searchInput, setSearchInput, setFocusInput, focusInput } =
    useSearchInput();

  const submitSearchBtn = (event: any) => {
    event.preventDefault();
    if (!searchInput) return;
    setFocusInput(false);
    router.push(
      !isSeller
        ? `/search?query=${searchInput}`
        : `/seller/products?query=${searchInput}`
    );
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!focusInput) handleBlur();
  }, [focusInput]);

  return (
    <form className={cn("relative", !isSeller ? "w-full" : "")}>
      <CommandInput
        ref={inputRef}
        className={cn(
          "m-1 outline-0 ring-primary focus-visible:ring-2 transition-all px-3 border border-input relative justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal",
          !isSeller ? "w-full h-10 pr-14" : "w-60 h-8 pr-[44px]"
        )}
        placeholder={!isSeller ? "Search in Spark & Style" : "Search Products"}
        value={searchInput}
        onValueChange={(e) => setSearchInput(e)}
        onFocus={() => {
          setFocusInput(true);
        }}
        onBlur={() => {
          if (enter) return;
          setFocusInput(false);
        }}
      />

      <Button
        type="submit"
        onClick={submitSearchBtn}
        size={"sm"}
        className={cn(
          "absolute right-0 top-0 rounded-l-none m-1",
          !isSeller ? "h-10" : "h-8 px-2"
        )}
      >
        <Search size={!isSeller ? 18 : 12} strokeWidth={2.5} />
      </Button>
    </form>
  );
}
