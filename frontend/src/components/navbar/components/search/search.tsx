"use client";

import React, { useState } from "react";
import SearchInput from "./search-button";
import SearchResult from "./search-result/search-result";
import { useSearchInput } from "./hooks/useSearchInput";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import useRole from "@/app/hooks/useRole";
import { cn } from "@/lib/utils";

export default function SearchDialog() {
  const isSeller = useRole();
  const [enter, setEnter] = useState(false);
  return (
    <div
      className={cn("relative", !isSeller ? "w-full" : "w-fit")}
      onMouseEnter={() => {
        setEnter(true);
      }}
      onMouseLeave={() => {
        setEnter(false);
      }}
    >
      <Command shouldFilter={false} disablePointerSelection={true}>
        <SearchInput enter={enter} />
        <SearchResult />
      </Command>
    </div>
  );
}
