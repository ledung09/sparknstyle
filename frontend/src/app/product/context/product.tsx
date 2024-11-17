"use client";

import * as React from "react";

export const productContext = React.createContext<{
  classify: { [key: string]: string[] | null };
  setClassify: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] | null }>
  >;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
} | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = React.useState(1);
  const [classify, setClassify] = React.useState<{
    [key: string]: string[] | null;
  }>({});

  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setDisabled(
      Object.keys(classify).length > 0
        ? Object.keys(classify).filter((item) => classify[item]?.length === 0)
            .length > 0
        : false
    );
  }, [classify]);

  return (
    <productContext.Provider
      value={{ quantity, setQuantity, classify, setClassify, disabled }}
    >
      {children}
    </productContext.Provider>
  );
}
