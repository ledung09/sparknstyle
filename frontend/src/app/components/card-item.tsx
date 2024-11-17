import { Card } from "@/components/ui/card";
import React from "react";

export default function CardItem({
  data,
}: {
  data: {
    id: number;
    title: string;
    description: string;
  };
}) {
  return (
    <Card className="flex-1 bg-white px-4 py-6 space-y-1 backdrop-blur-[3px]">
      <p className="text-6xl font-medium blur-[0.5px]">{data.id}</p>
      <div className="h-1.5"></div>
      <p className="font-medium">{data.title}</p>
      <p className="text-muted-foreground text-sm">{data.description}</p>
    </Card>
  );
}
