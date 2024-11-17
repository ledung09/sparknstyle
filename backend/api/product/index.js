import express from "express";
import { mongodbProduct } from "../../mongodb/client.js";
import { supabase } from "../../supabase/client.js";

export const productRouter = express.Router();

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "Invalid product id!" });
  }

  try {
    const query = { _id: id };
    const result = await mongodbProduct.findOne(query);

    res.send(result);
  } catch (e) {
    res.status(400).send({
      message: JSON.stringify(e),
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "Invalid product id!" });
  }

  const body = req.body;

  try {
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        ...body,
      },
    };

    await mongodbProduct.updateOne(filter, updateDoc, { upsert: true });

    res.send("Upsert product detail successfully!");
  } catch (e) {
    res.status(400).send({
      message: JSON.stringify(e),
    });
  }
});

productRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    await mongodbProduct.insertOne(body);

    await supabase.from("item").upsert({ code: body._id }).select();

    res.send("Add product successfully!");
  } catch (e) {
    res.status(400).send({
      message: JSON.stringify(e),
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "Invalid product id!" });
  }
  try {
    await mongodbProduct.deleteOne({
      _id: id,
    });

    res.send("Add product successfully!");
  } catch (e) {
    res.status(400).send({
      message: JSON.stringify(e),
    });
  }
});
