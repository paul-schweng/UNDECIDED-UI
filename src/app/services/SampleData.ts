import {User} from "../models/user";
import {Product} from "../models/product";
import {Rating} from "../models/rating";
import {GeoLocation} from "../models/location";
import {clone} from "./clone";


export const SampleUser: User = {
  id: '41341',
  birthdate: new Date(),
  email: "",
  isDarkTheme: false,
  language: "de",
  name: "Theophilus Junior Bestelmeyer",
  description:
`Hier genieße ich das beste Essen, was mir diese App bietet, denn solch Meisterwerk einer App können noch nicht einmal die Ingenieure bei Google übertreffen!

Liebe Grüße,
Euer Theophilius <3`,
  profileImage: "https://picsum.photos/200/200?random=1",
  registerDate: new Date(),
  username: "best.username.4ever",
  usertype: "privat",
  verified: false,
  followerNum: 69,
  followingNum: 420,
  ratingsNum: 42,
  bannerImage: 0,
  modelType: "user",
  loadImage() {
  }
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
  id: "2",
  product: SampleProduct,
  stars: 3.5,
  labelList: [],
  voteNum: 0,
  description: 'test description',
  images: [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`), //TODO: remove this
  friends: new Array(5).fill(clone(SampleUser)),
  modelType: "rating"
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

export const EmptyUser: User = {
  bannerImage: 0,
  birthdate: undefined,
  description: "",
  email: "",
  followerNum: 0,
  followingNum: 0,
  id: "",
  isDarkTheme: false,
  language: "",
  name: "",
  password: "",
  profileImage: undefined,
  ratingsNum: 0,
  registerDate: new Date(),
  rememberMe: false,
  username: "",
  usertype: 'privat',
  verified: false,
  loadImage() {
  }

}

export const DeletedUser: User = {
  bannerImage: 0,
  birthdate: undefined,
  description: "",
  email: "",
  followerNum: 0,
  followingNum: 0,
  id: "",
  isDarkTheme: false,
  language: "",
  name: "Deleted",
  password: "",
  profileImage: undefined,
  ratingsNum: 0,
  registerDate: new Date(),
  rememberMe: false,
  username: "Deleted",
  usertype: 'privat',
  verified: false,
  loadImage() {
  }

}

