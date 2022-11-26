import { ICategoryResponse } from "../category/category.interface";

export interface IGoodsRequest {
  category:ICategoryResponse;
  name: string;
  path: string;
  ingredients:string;
  weight: number;
  price: number;
  imagePath: string;
  count:number
}

export interface IGoodsResponse extends IGoodsRequest {
  id: number;
}
