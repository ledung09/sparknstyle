import { ORDER_STATUS } from "@/constant/order";
import { CartItemType } from "./cart-item";

export interface OrderType {
  code: string;
  total_price: number;
  status: ORDER_STATUS;
  shipping_date: null | string;
  shipping_estimate_date: null | string;
  ordered_item: CartItemType[];
}
