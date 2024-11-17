"use client";

import * as React from "react";

export const cartNavContext = React.createContext<{
  cartNavCount: number;
  setCartNavCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function CartNavProvider({ children }: { children: React.ReactNode }) {
  const [cartNavCount, setCartNavCount] = React.useState(0);

  return (
    <cartNavContext.Provider value={{ cartNavCount, setCartNavCount }}>
      {children}
    </cartNavContext.Provider>
  );
}
