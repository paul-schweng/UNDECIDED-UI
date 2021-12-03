import {Label} from "./label";

export interface Product {
  id?: string,
  name: string,
  types?: string[],
  labelList?: Label[],
  labels?: number[],
  brand?: string,
  avgStars?: number
}

