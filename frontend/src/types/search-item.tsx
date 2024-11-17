import { Common_Object } from "./common/object";

export interface SearchItemType {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

export interface SearchItemTypeFull {
  _id: string;
  name: string;
  price: number;
  brand: string;
  classify: Common_Object<string[]>;
  description: string;
  image: string;
}
