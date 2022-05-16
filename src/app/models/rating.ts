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
  timestamp?: Date | string,
  images?: any[],
  product: Product,
  votes?: Vote[],
  voteNum?: number,
  friends?: User[],
  types?: string[],
  location?: GeoLocation,
  labels?: number[],
  labelList?: Label[],
  comments?: Comment[],
  commentNum?: number,
  imageNum?: number,
  isLiked?: boolean,
  modelType?: 'rating'
}

export interface RatingList{
  ratings?: Rating[],
  filter?: string
}


