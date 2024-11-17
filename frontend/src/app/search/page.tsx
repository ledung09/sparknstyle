import React from "react";
import Filter from "./components/filter";
import DisplaySearch from "./components/display";
import ProductList from "./components/product/product-list";

export default function Page() {
  return (
    <div className="flex gap-12">
      <div className="w-64">
        <Filter />
      </div>
      <div className="flex-1">
        <DisplaySearch />
        <ProductList />
      </div>
    </div>
  );
}
