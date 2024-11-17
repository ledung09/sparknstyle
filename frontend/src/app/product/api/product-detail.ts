export async function getProductDetail(id: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST_NAME}/product/${id}`,
    {
      cache: "no-store",
    }
  );
  const product = await data.json();
  return product;
}
