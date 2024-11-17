import { searchInputContext } from "./../context/input";
import React from "react";

export function useSearchInput() {
  const contextValue = React.useContext(searchInputContext);
  if (!contextValue) {
    throw new Error("searchInputContext must be used within a ContextProvider");
  }
  return contextValue;
}
