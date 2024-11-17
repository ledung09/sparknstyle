"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import SearchResultItem from "./search-result-item";
import { useSearchInput } from "../hooks/useSearchInput";
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

export default function SearchResult() {
  const isSeller = useRole();
  const { focusInput, searchInput, searchResult } = useSearchInput();

  if (!focusInput || !searchInput) return <CommandList />;
  return (
    <CommandList className="w-fit">
      {/* <CommandEmpty>No results found.</CommandEmpty> */}
      {/* <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator /> */}
      <CommandGroup
        className={cn(
          "absolute mx-1 z-50 rounded-lg border bg-card text-card-foreground shadow",
          !isSeller ? "w-[calc(100%-42px-8px)] mt-1" : "w-[calc(100%-34px-8px)] mt-0.5"
        )}
      >
        {searchResult.length === 0 && (
          <p className="text-muted-foreground text-center my-1.5">
            No search result!
          </p>
        )}
        {searchResult.length > 0 && (
          <SearchResultItem value={searchInput} className="hidden" />
        )}
        {searchResult.map((item) => {
          return <SearchResultItem value={item} key={item} />;
        })}
      </CommandGroup>
    </CommandList>
  );
}
