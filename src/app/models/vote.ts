import {User} from "./user";
import {Rating} from "./rating";

export interface Vote {
  user: User,
  rating: Rating,
  timestamp: Date | string
}
