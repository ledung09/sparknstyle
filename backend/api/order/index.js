import express from "express";
import { supabase } from "../../supabase/client.js";

export const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    const data = await req.body;
    await supabase.from("shopping_order").upsert(data).select();
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(201).send("Upsert shopping item successfully!");
});

orderRouter.get("/", async (req, res) => {
  const { status } = req.query;

  try {
    const { data, error } = await supabase
      .from("shopping_order")
      .select()
      .eq("status", status);

    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

orderRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const { status } = req.query;

  try {
    const { data, error } = await supabase
      .from("shopping_order")
      .select(
        "code, total_price, status, shipping_date, shipping_estimate_date, ordered_item"
      )
      .eq("user_id", userId)
      .eq("status", status)
      .order("created_time", { ascending: false });

    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
});
