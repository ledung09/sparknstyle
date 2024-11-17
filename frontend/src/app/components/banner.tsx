import React from "react";

export default function HomeBanner() {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <img
          src="https://cf.shopee.vn/file/sg-11134258-7repr-m295kommswccf4_xhdpi"
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="w-1/3 flex flex-col gap-4">
        <div className="">
          <img
            src="https://cf.shopee.vn/file/sg-11134258-7repr-m295kommswccf4_xhdpi"
            alt=""
            className="w-full rounded"
          />
        </div>
        <div className="">
          <img
            src="https://cf.shopee.vn/file/sg-11134258-7repr-m295kommswccf4_xhdpi"
            alt=""
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
}
