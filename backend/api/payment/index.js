import express from "express";
import axios from "axios";
import CryptoJS from "crypto-js";
import { v1 as uuid } from "uuid";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const paymentRouter = express.Router();

paymentRouter.post("/", async (req, res) => {
  const body = req.body;

  const config = {
    appid: process.env.APP_ID,
    key1: process.env.KEY1,
    key2: process.env.KEY2,
    endpoint: process.env.ENDPOINT,
  };

  const embeddata = {
    merchantinfo: "embeddata123",
    redirecturl: `${process.env.APP_HOST_NAME}/purchase/toprepare?orderId=${body.orderId}`,
  };

  const items = [];

  const order = {
    appid: config.appid,
    apptransid: `${moment().format("YYMMDD")}_${uuid()}`,
    appuser: "demo",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: body.amount,
    description: body.description,
    bankcode: "",
  };

  const data =
    config.appid +
    "|" +
    order.apptransid +
    "|" +
    order.appuser +
    "|" +
    order.amount +
    "|" +
    order.apptime +
    "|" +
    order.embeddata +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });

    res.send(response.data);
  } catch (error) {
    throw Error("Error:", error);
  }
});

paymentRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID: ${userId}`);
});
