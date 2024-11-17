import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { OrderType } from "@/types/order";
import { PriceFormatUtil } from "@/utils/format-price";
import { Table, TableBody } from "@/components/ui/table";
import PurchaseItemRowListRow from "./purchase-item-row-list-row";
import { ORDER_STATUS } from "@/constant/order";
import useRole from "@/app/hooks/useRole";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Truck } from "lucide-react";
import { DEFAULT_LOCATION } from "@/constant/location";

function getRandomFutureDate() {
  const currentDate = new Date();
  const daysToAdd = Math.random() < 0.5 ? 3 : 4;
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + daysToAdd);

  return futureDate;
}

export default function PurchaseItemRow({
  data,
  status,
  setData,
}: {
  data: OrderType;
  status: string;
  setData?: React.Dispatch<React.SetStateAction<OrderType[]>>;
}) {
  const isSeller = useRole();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Card className="shadow">
      <CardContent className="mt-4">
        {!!isSeller && (
          <p className="text-xs text-muted-foreground mb-4 flex items-center">
            <Truck size={15} className="mr-2" />
            <span className="mt-[1px]">
              <span className="font-semibold">Ship to: </span>
              <span>{DEFAULT_LOCATION}</span>
            </span>
          </p>
        )}

        <Table>
          <TableBody>
            {data.ordered_item.map((item) => {
              return <PurchaseItemRowListRow data={item} key={item.id} />;
            })}
          </TableBody>
        </Table>
        <Separator className="mb-4" />
        <div className="flex gap-4 justify-between items-center">
          {!isSeller ? (
            <p className="mt-[1px] text-sm text-muted-foreground">
              {status === ORDER_STATUS.PREPARE &&
                "Order is being prepared for shipping"}
              {status === ORDER_STATUS.SHIP && (
                <span>
                  Order is estimated to ship by
                  <span className="font-medium">
                    {" "}
                    {new Date(data.shipping_date as string).toDateString()}
                  </span>
                </span>
              )}
              {status === ORDER_STATUS.RECEIVE && (
                <span>
                  Order is delivered on
                  <span className="font-medium">
                    {" "}
                    {new Date(
                      data.shipping_estimate_date as string
                    ).toDateString()}
                  </span>
                </span>
              )}
              {status === ORDER_STATUS.COMPLETED &&
                "Thank you for shopping with us ❤️"}
            </p>
          ) : (
            status === ORDER_STATUS.PREPARE && (
              <div className="flex items-center gap-2">
                <Button
                  disabled={loading}
                  size={"sm"}
                  onClick={() => {
                    setLoading(true);
                    axios
                      .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/order`, {
                        code: data.code,
                        status: ORDER_STATUS.SHIP,
                        shipping_date: new Date(),
                        shipping_estimate_date: getRandomFutureDate(),
                      })
                      .then(() => {
                        setData!((prev) => {
                          const cpy = [...prev];
                          return cpy.filter((item) => item.code !== data.code);
                        });
                      })
                      .catch((error) => {
                        console.error(error);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                >
                  {loading && <Loader2 className="animate-spin" />}
                  Ready to ship
                </Button>
              </div>
            )
          )}

          <p className="flex items-center gap-1 mt-[1px] ml-auto">
            Order Total:
            <span className="mb-0.5 text-[22px] font-bold">
              {PriceFormatUtil.format(data.total_price)}₫
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
