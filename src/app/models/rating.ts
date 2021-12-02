import {User} from "./user";
import {Product} from "./product";
import {Vote} from "./vote";
import {GeoLocation} from "./location";
import {Comment} from "./comment";
import {Label} from "./label";

export interface Rating {
  id: string,
  user?: User,
  stars: number,
  description?: string,
  timestamp?: Date,
  images?: any[],
  product: Product,
  votes?: number | Vote[],
  friends?: User[],
  types?: string[],
  location?: GeoLocation,
  labels?: number[],
  labelList?: Label[],
  comments?: number | Comment[]
}

export interface RatingList{
  ratings?: Rating[],
  filter?: string
}


