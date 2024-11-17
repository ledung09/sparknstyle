import express from "express";
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { hasPermission } from "../middleware/auth.js";
import { paymentRouter } from "./payment/index.js";
import { webhookUserRouter } from "./webhook/user.js";
import { webhookAuthorizer } from "../utils/webhook-authorizer.js";
import { productRouter } from "./product/index.js";
import { searchRouter } from "./search/index.js";
import { cartRouter } from "./cart/index.js";
import { orderRouter } from "./order/index.js";
import { statRouter } from "./stats/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello from Spark & Style!"));

app.use("/search", searchRouter);

app.use("/product", productRouter);

app.use("/payment", paymentRouter);

app.use("/cart", cartRouter);

app.use("/order", orderRouter);

app.use("/stats", statRouter);

// webhook
app.use("/webhook/user", webhookAuthorizer, webhookUserRouter);

app.get(
  "/protected-endpoint",
  ClerkExpressWithAuth(),
  hasPermission,
  (req, res) => {
    res.json(req.auth);
  }
);

app.listen(8000, () => console.log("Server ready on port 8000."));
