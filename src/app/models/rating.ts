import {User} from "./user";
import {Product} from "./product";
import {Vote} from "./vote";

export interface Rating {
  id: string,
  user?: User,
  stars: number,
  description?: string,
  timestamp?: Date,
  image?: string | File,
  product: Product,
  votes?: number | Vote[],
  friends?: User[]
}
