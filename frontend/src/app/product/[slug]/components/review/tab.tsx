"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "./review-list";
import { TAB } from "@/constant/review-tab";

export default function ProductReview() {
  const [tab, setTab] = useState<string>(TAB.STAR5);
  return (
    <>
      <Tabs
        defaultValue={TAB.STAR5}
        className="mt-6"
        onValueChange={(value) => {
          setTab(value);
        }}
        value={tab}
      >
        <TabsList>
          <TabsTrigger className="min-w-28" value={TAB.STAR5}>
            5 Stars
          </TabsTrigger>
          <TabsTrigger className="min-w-28" value={TAB.STAR4}>
            4 Stars
          </TabsTrigger>
          <TabsTrigger className="min-w-28" value={TAB.STAR3}>
            3 Stars
          </TabsTrigger>
          <TabsTrigger className="min-w-28" value={TAB.STAR2}>
            2 Stars
          </TabsTrigger>
          <TabsTrigger className="min-w-28" value={TAB.STAR1}>
            1 Star
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-6">
        <ReviewList />
      </div>
    </>
  );
}
