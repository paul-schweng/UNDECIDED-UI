import {Rating} from "./rating";
import {User} from "./user";

export type SearchResults = Partial<Rating & User>[];
