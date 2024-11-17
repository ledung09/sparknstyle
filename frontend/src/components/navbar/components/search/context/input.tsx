"use client";

import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useDebounce } from "use-debounce";

export const searchInputContext = React.createContext<{
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  focusInput: boolean;
  setFocusInput: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: string[];
} | null>(null);

export function SearchInputProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchInput, setSearchInput] = React.useState("");
  const [value] = useDebounce(searchInput, 200);
  const [focusInput, setFocusInput] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<string[]>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["search", value],
    queryFn: () => {
      if (!value) return [];
      return fetch(
        `${process.env.NEXT_PUBLIC_API_HOST_NAME}/search/autocomplete/${value}`
      ).then((res) => res.json());
    },
  });

  React.useEffect(() => {
    setSearchResult(data ? (data as string[]) : []);
  }, [data]);

  return (
    <searchInputContext.Provider
      value={{
        searchInput,
        setSearchInput,
        focusInput,
        setFocusInput,
        searchResult,
      }}
    >
      {children}
    </searchInputContext.Provider>
  );
}
