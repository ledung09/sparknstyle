import { Card } from "@/components/ui/card";
import { PriceFormatUtil } from "@/utils/format-price";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Loader2, Repeat, ShoppingCart, Users } from "lucide-react";
import React from "react";

export default function StatsCard() {
  const { isPending, error, data } = useQuery({
    queryKey: ["statCard"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/stats/card`).then((res) =>
        res.json()
      ),
  });

  if (isPending)
    return (
      <div className="flex justify-center mt-6 min-h-screen">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );

  console.log(data);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="flex justify-between p-6 shadow">
        <div className="flex flex-col">
          <p className="tracking-tight text-sm font-medium">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">
            {PriceFormatUtil.format(data.totalRevenue)}₫
          </p>
        </div>
        <DollarSign size={16} className="mt-0.5 text-muted-foreground" />
      </Card>
      <Card className="flex justify-between p-6 shadow">
        <div className="flex flex-col">
          <p className="tracking-tight text-sm font-medium">Total Orders</p>
          <p className="text-2xl font-bold mt-1">
            {data.totalOrders} order{data.totalOrders > 1 && "s"}
          </p>
        </div>
        <ShoppingCart size={16} className="mt-0.5 text-muted-foreground" />
      </Card>
      <Card className="flex justify-between p-6 shadow">
        <div className="flex flex-col">
          <p className="tracking-tight text-sm font-medium">Current Users</p>
          <p className="text-2xl font-bold mt-1">
            {data.userCount} user{data.userCount > 1 && "s"}
          </p>
        </div>
        <Users size={16} className="mt-0.5 text-muted-foreground" />
      </Card>
      <Card className="flex justify-between p-6 shadow">
        <div className="flex flex-col">
          <p className="tracking-tight text-sm font-medium">Repeat Users</p>
          <p className="text-2xl font-bold mt-1">
            {data.repeatedUser} user{data.repeatedUser > 1 && "s"}
          </p>
        </div>
        <Repeat size={16} className="mt-0.5 text-muted-foreground" />
      </Card>
    </div>
  );
}
