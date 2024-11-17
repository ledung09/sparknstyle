import React from "react";
import BottomNavWrapper from "./components/bottom-nav/bottom-nav-wrapper";
import ProductList from "./components/product-list/item";
import { CartProvider } from "./context/cart";

export default function Page() {
  return (
    <CartProvider>
      <div>
        <div className="mb-4">
          <ProductList />
        </div>
        <BottomNavWrapper />
      </div>
    </CartProvider>
  );
}
