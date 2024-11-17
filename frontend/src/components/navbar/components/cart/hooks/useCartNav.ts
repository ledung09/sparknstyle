import React from "react";
import { cartNavContext } from "../context/cart-nav";

export function useCartNav() {
  const contextValue = React.useContext(cartNavContext);
  if (!contextValue) {
    throw new Error("cartNavContext must be used within a ContextProvider");
  }
  return contextValue;
}
