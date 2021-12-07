import {User} from "../models/user";
import {Product} from "../models/product";
import {Rating} from "../models/rating";
import {GeoLocation} from "../models/location";
import {clone} from "./clone";


export const SampleUser: User = {
  birthdate: new Date(),
  email: "",
  isDarkTheme: false,
  language: "de",
  name: "Theophilus Junior Bestelmeyer",
  profileImage: "https://picsum.photos/200/200?random=1",
  registerDate: new Date(),
  username: "best.username.4ever",
  usertype: "privat",
  verified: false,
  followerNum: 69,
  followingNum: 420,
  ratingsNum: 42,
}

export const SampleProduct: Product = {
  id: "",
  name: "SampleProduct",
  types: ["Drink"],
  brand: "Coco Cola",
  labels: [1,69,3],
  avgStars: 5
}

export const SampleRating: Rating = {
  id: "",
  product: SampleProduct,
  stars: 3.5,
  labelList: [],
  voteNum: 0,
  description: 'test description',
  images: [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`), //TODO: remove this
  friends: new Array(5).fill(clone(SampleUser))
};

export const EmptyProduct: Product = {
  brand: "",
  id: "",
  labels: [],
  name: "",
  types: []
}

export const EmptyLocation: GeoLocation = {
  name: ""
}

export const EmptyRating: Rating = {
  description: "",
  friends: [],
  id: "",
  images: [],
  labelList: [],
  location: EmptyLocation,
  product: EmptyProduct,
  stars: 0,
  types: [],
}

