export enum PAYMENT_METHOD {
  COD = "cod",
  ZP = "zp",
}

export enum SHIPPING_METHOD {
  EXPRESS = "express",
  STANDARD = "standard",
}

export const SHIPPING_PRICE = {
  [SHIPPING_METHOD.EXPRESS]: 40000,
  [SHIPPING_METHOD.STANDARD]: 20000,
};

export const SHIPPING_DAY = {
  [SHIPPING_METHOD.EXPRESS]: 2,
  [SHIPPING_METHOD.STANDARD]: 5,
};
