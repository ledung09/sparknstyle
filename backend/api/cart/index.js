import express from "express";
import { supabase } from "../../supabase/client.js";

export const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    const data = await req.body;
    const upsertData = {
      user_id: data.user_id,
      item_code: data.item_code,
      quantity: data.quantity,
      item_detail: data.item_detail,
    };

    await supabase.from("cart").upsert(upsertData).select();
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(201).send("Upsert cart item successfully!");
});

cartRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("cart")
      .select("item_code, quantity, item_detail")
      .eq("user_id", userId);

    const response = data.map((item) => {
      const classify = item.item_detail.classify;

      console.log("ITEM", item);

      return {
        id: item.item_code,
        image: item.item_detail.image,
        classify: Object.keys(classify).map((element) => classify[element]),
        name: item.item_detail.name,
        unit_price: item.item_detail.price,
        quantity: item.quantity,
        brand: item.item_detail.brand,
      };
    });

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

cartRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const productId = req.query["productId"];
  try {
    const { data } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId)
      .eq("item_code", productId);

    console.log(userId);
    console.log(productId);
    console.log(data);
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(200).send("Delete cart item successfully!");
});
