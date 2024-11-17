import express from "express";
import { supabase } from "../../supabase/client.js";
import { GLASS_BRAND } from "../../constant/brand.js";

export const statRouter = express.Router();

statRouter.get("/card", async (req, res) => {
  try {
    const [cartData, repeatedData, userData] = await Promise.all([
      supabase.from("shopping_order_view").select(),
      supabase.from("shopping_order_repeated_view").select(),
      supabase.from("user").select(),
    ]);

    const cartDataResult = cartData.data;
    const repeatedDataResult = repeatedData.data;
    const userDataResult = userData.data;

    res.status(200).send({
      totalRevenue: cartDataResult[0].revenue,
      totalOrders: cartDataResult[0].count,
      repeatedUser: repeatedDataResult[0].numberofgroups,
      userCount: userDataResult.length,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});

statRouter.get("/product", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("shopping_order")
      .select()
      .neq("status", "PENDING")
      .neq("status", "PREPARE");

    const idList = {};
    const productData = {};

    data.forEach((order) => {
      order.ordered_item.forEach((item) => {
        if (idList[item.id] === undefined) idList[item.id] = 1;
        else idList[item.id] = idList[item.id] + 1;

        if (productData[item.id] === undefined)
          productData[item.id] = {
            id: item.id,
            name: item.name,
            unit_price: item.unit_price,
            image: item.image,
            brand: item.brand,
          };
      });
    });

    const result = Object.keys(idList)
      .sort((a, b) => idList[a] - idList[b])
      .map((item) => productData[item])
      .slice(0, 4);

    const brand = Object.fromEntries(GLASS_BRAND.map((brand) => [brand, 0]));

    Object.keys(idList).forEach((id) => {
      brand[productData[id].brand] += idList[id];
    });

    const pieData = GLASS_BRAND.map((item) => ({
      name: item,
      value: brand[item],
    }));

    res.status(200).send({
      pie: pieData,
      mostBuy: result,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});
