import {User} from "./user";
import {Rating} from "./rating";

export interface Comment {
  id: string,
  user: User,
  rating: Rating,
  content: string,
  timestamp: Date | string
}
