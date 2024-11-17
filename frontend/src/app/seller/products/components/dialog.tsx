import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchItemTypeFull } from "@/types/search-item";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import { GLASS_BRAND } from "@/constant/brand";
import { supabase } from "@/storage/supabase";
import Image from "next/image";

export default function ProductDialog({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: SearchItemTypeFull;
}) {
  const [formData, setFormData] = React.useState({
    name: data?.name ?? "",
    price: data?.price ?? "",
    description: data?.description ?? "",
    brand: data?.brand ?? "",
    image: data?.image ?? "",
  });
  const [loading, setLoading] = useState(false);

  const updateFormdata = (e: any, value?: string) => {
    setFormData((prev) => {
      const cpy = { ...prev };
      // @ts-ignore
      cpy[value ? "brand" : e.target.id] = value ? value : e.target.value;
      return cpy;
    });
  };

  const productRef = React.useRef<string | null>(null);

  useEffect(() => {
    productRef.current = uuidv4();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>{!data ? "Add Product" : "Product detail"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-10">
            {data?._id && (
              <div className="flex items-center">
                <Label htmlFor="id" className="min-w-14">
                  Id
                </Label>
                <Input
                  className="focus-visible:ring-offset-0 h-8 w-52"
                  type="text"
                  id="id"
                  placeholder="product name"
                  value={data._id}
                  disabled
                />
              </div>
            )}
            <div className="flex items-center">
              <Label htmlFor="name" className="min-w-14">
                Name
              </Label>
              <Input
                className="focus-visible:ring-offset-0 h-8 w-52"
                type="text"
                id="name"
                placeholder="product name"
                value={formData.name}
                onChange={(e) => {
                  updateFormdata(e);
                }}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex items-center">
              <Label htmlFor="price" className="min-w-14">
                Price
              </Label>
              <Input
                className="focus-visible:ring-offset-0 h-8 w-52"
                type="number"
                id="price"
                placeholder="product price"
                value={formData.price}
                onChange={(e) => {
                  updateFormdata(e);
                }}
              />
            </div>
            <div className="flex items-center">
              <Label htmlFor="brand" className="min-w-14">
                Brand
              </Label>

              <Select
                defaultValue={data?.brand}
                onValueChange={(value) => {
                  updateFormdata(undefined, value);
                }}
              >
                <SelectTrigger
                  id="brand"
                  className="h-8 focus:ring-offset-0 min-w-52"
                >
                  <SelectValue placeholder="brand" />
                </SelectTrigger>
                <SelectContent>
                  {GLASS_BRAND.map((item) => {
                    return (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description" className="mt-1">
              Description
            </Label>
            <Textarea
              className="focus-visible:ring-offset-0 min-h-24"
              id="description"
              placeholder="Type your message here."
              value={formData.description}
              onChange={(e) => {
                updateFormdata(e);
              }}
            />
          </div>
          <div className="flex justify-between gap-4 items-start">
            <div className="flex items-center">
              <Label htmlFor="image" className="min-w-14">
                Image
              </Label>
              <Input
                className="focus-visible:ring-offset-0 w-52 h-9"
                accept="image/*"
                type="file"
                id="image"
                placeholder="product image"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    // Use URL.createObjectURL to create a temporary URL for the image
                    setFormData((prev) => {
                      const cpy = { ...prev };
                      // @ts-ignore
                      cpy["image"] = file;
                      return cpy;
                    });
                  }
                }}
              />
            </div>
            {formData.image && (
              <Image
                priority={true}
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                width={0}
                height={0}
                className="w-24 h-24 object-cover border rounded-md p-1"
                alt={formData.name}
              />
            )}
          </div>
        </div>
        <Button
          disabled={loading}
          className="mt-2"
          size={"sm"}
          onClick={async () => {
            const randomId = productRef.current;

            setLoading(true);

            const { data: bucketData, error } = await supabase.storage
              .from("product_image")
              .upload(`/${data ? data._id : randomId}`, formData.image, {
                contentType: "image/*",
                upsert: true,
              });

            const { data: urlData } = await supabase.storage
              .from("product_image")
              .getPublicUrl(`/${data ? data._id : randomId}`);

            if (data)
              axios
                .put(
                  `${process.env.NEXT_PUBLIC_API_HOST_NAME}/product/${data?._id}`,
                  {
                    ...formData,
                    price: Number(formData.price),
                    image: urlData.publicUrl,
                  }
                )
                .then((response) => {})
                .catch((error) => {
                  console.error("Error:", error);
                });
            else
              axios
                .post(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/product`, {
                  ...formData,
                  price: Number(formData.price),
                  _id: randomId,
                  image: urlData.publicUrl,
                })
                .then((response) => {})
                .catch((error) => {
                  console.error("Error:", error);
                });

            window.history.go(0);
          }}
        >
          {loading && <Loader2 className="animate-spin" />}
          {!data ? "Add product" : "Save changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
