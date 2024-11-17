import express from "express";
import { mongodbProduct } from "../../mongodb/client.js";
import { GLASS_BRAND } from "../../constant/brand.js";

export const searchRouter = express.Router();

searchRouter.get("/autocomplete/:query", async (req, res) => {
  const query = req.params.query;
  if (query === undefined) {
    res.status(400).send({ message: "Invalid query search" });
  }

  try {
    const agg = [
      {
        $search: {
          index: "autoCompleteProducts",
          autocomplete: {
            query: query,
            path: "name",
            tokenOrder: "sequential",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      { $limit: 5 },
      { $project: { _id: 0, name: 1 } },
    ];
    const result = await mongodbProduct.aggregate(agg);
    const response = [];
    await result.forEach((doc) => {
      response.push(doc.name);
    });
    res.send(response);
  } catch (e) {
    throw e;
  }
});

searchRouter.get("/atlassearch", async (req, res) => {
  const { query, brand, min, max } = req.query;

  if (query === undefined) {
    res.status(400).send({ message: "Invalid query search" });
  }

  try {
    let agg = [
      {
        $search: {
          index: "searchProducts",
          text: {
            query: query,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
      {
        $match: {
          price: {
            $gte: parseInt(min ?? 0),
            $lte: parseInt(max ?? Number.MAX_SAFE_INTEGER),
          },
          brand: {
            $in: brand
              ? typeof brand === "string"
                ? [brand]
                : brand
              : GLASS_BRAND,
          },
        },
      },
      {
        $addFields: {
          score: { $meta: "searchScore" },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ];

    if (query === "") agg.shift();

    // await mongodbProduct.updateMany(
    //   {},
    //   {
    //     $set: {
    //       classify: {
    //         "Frame Material": ["Wood", "Plastic", "Metal", "Mixed"],
    //         Size: ["Small", "Medium", "Large"],
    //       },
    //     },
    //   } // Replace 'newField' and 'defaultValue' with your desired field and value
    // );

    const result = await mongodbProduct.aggregate(agg);
    const response = [];
    await result.forEach((doc) => {
      response.push(doc);
    });

    res.send(response);
  } catch (e) {
    throw e;
  }
});
