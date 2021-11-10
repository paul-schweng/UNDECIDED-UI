import {GeoLocation} from "./location";

export interface Product {
  id: string,
  name: string,
  location?: GeoLocation,
  type: string,
  brand?: string
}
