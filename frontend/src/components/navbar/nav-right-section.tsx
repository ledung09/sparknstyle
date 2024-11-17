"use client";

import React from "react";
import ThemeBtn from "./components/theme";
import SearchDialog from "./components/search/search";
import AuthBtn from "./components/auth-btn/auth";
import CartBtn from "./components/cart/cart";
import { SearchInputProvider } from "./components/search/context/input";
import useRole from "@/app/hooks/useRole";
import { cn } from "@/lib/utils";

export default function NavRightSection() {
  const isSeller = useRole();

  return (
    <div className="w-full flex items-center justify-end">
      <SearchInputProvider>
        <SearchDialog />
      </SearchInputProvider>
      <div className={cn("flex items-center gap-2.5", !isSeller ? "ml-10" : "ml-4")}>
        <div className="flex items-center gap-0">
          <CartBtn />
        </div>
        <AuthBtn />
      </div>
    </div>
  );
}
