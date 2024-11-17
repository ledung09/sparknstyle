"use client";

import React, { useEffect, useState } from "react";
import PurchaseItemRow from "../components/purchase-item-row";
import { ORDER_STATUS, statusParamMapper } from "@/constant/order";
import { useUser } from "@clerk/nextjs";
import { OrderType } from "@/types/order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { user } = useUser();
  const { slug } = params;

  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderStatus = searchParams.get("status");

  const [data, setData] = useState<OrderType[]>([]); // State to store the fetched data
  const [isPending, setIsPending] = useState(true); // State to track loading status

  let status = statusParamMapper(slug);

  useEffect(() => {
    if (orderId && orderStatus === "1") {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/order`, {
          code: orderId,
          status: ORDER_STATUS.PREPARE,
        })
        .then(() => {
          router.push(`/purchase/toprepare`);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  }, [orderStatus, orderId]);

  useEffect(() => {
    if (user?.id && status)
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_HOST_NAME}/order/${user?.id}?status=${status}`
        )
        .then((response) => {
          setData(response.data);
          setIsPending(false);
        })
        .catch((err) => {
          throw err;
        });
  }, [user, status]);

  if (isPending)
    return (
      <div className="flex justify-center mt-6">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );

  return data && data.length === 0 ? (
    <div className="w-full flex flex-col items-center mt-6">
      <Image
        src={"/no-order.png"}
        alt="No order found"
        width={0}
        height={0}
        className="w-36 h-28 "
        priority
      />
      <p className="mt-2">No order found ❌ </p>
    </div>
  ) : (
    <div className="mt-4 flex flex-col gap-4">
      {(data as OrderType[]).map((item) => {
        return <PurchaseItemRow key={item.code} data={item} status={status} />;
      })}
    </div>
  );
}
