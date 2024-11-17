import React from "react";
import ProductBreadcrumb from "./components/breadcrumb";
import ProductImage from "./components/image";
import ProductDetail from "./components/detail/detail";
import { getProductDetail } from "../api/product-detail";

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const product = await getProductDetail(slug);

  return (
    <>
      <div className="space-y-10">
        <ProductBreadcrumb
          data={{
            name: product.name,
            brand: product.brand,
          }}
        />
        <div className="flex gap-x-14">
          <ProductImage
            data={{
              name: product.name,
              image: product.image,
            }}
          />
          <ProductDetail
            data={{
              slug,
              name: product.name,
              price: product.price,
              classify: product.classify,
              image: product.image,
              brand: product.brand,
            }}
          />
        </div>
      </div>
      <div className="mt-10 mb-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Description
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          {product.description}
        </p>
      </div>
    </>
  );
}
