import React from "react";
import { productContext } from "../context/product";

export function useProduct() {
  const contextValue = React.useContext(productContext);
  if (!contextValue) {
    throw new Error("Productontext must be used within a ContextProvider");
  }
  return contextValue;
}
