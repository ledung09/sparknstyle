import React from "react";
import ReviewItem from "./review-item";

export default function ReviewList() {
  return (
    <div className="flex flex-col gap-4">
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </div>
  );
}
