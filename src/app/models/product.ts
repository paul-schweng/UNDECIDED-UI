import {GeoLocation} from "./location";

export interface Product {
  id: string,
  name: string,
  location?: GeoLocation,
  type: string[],
  labels: Label[]
  brand?: string
}

export interface Label {
  en: string,
  de: string,
  icon: string
}
