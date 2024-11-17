import React from "react";
import { cartContext } from "../context/cart";

export function useCart() {
  const contextValue = React.useContext(cartContext);
  if (!contextValue) {
    throw new Error("cardContext must be used within a ContextProvider");
  }
  return contextValue;
}
