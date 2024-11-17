import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FilterRow({
  text,
  index,
  state,
  setState,
}: {
  index: number;
  text: string;
  state: boolean[];
  setState: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={text.replace(" ", "")}
        checked={state[index]}
        onClick={() => {
          setState((prev) => {
            const cpy = [...prev];
            cpy[index] = !cpy[index];
            return cpy;
          });
        }}
      />
      <Label htmlFor={text.replace(" ", "")} className="font-normal">
        {text}
      </Label>
    </div>
  );
}
