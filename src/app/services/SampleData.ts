import {User} from "../models/user";
import {Product} from "../models/product";
import {Rating} from "../models/rating";


export const SampleUser: User = {
  birthdate: new Date(),
  email: "",
  isDarkTheme: false,
  language: "de",
  name: "Theophilus Junior Bestelmeyer",
  profileImage: "",
  registerDate: new Date(),
  username: "",
  usertype: "privat",
  verified: false
}

export const SampleProduct: Product = {
  id: "", name: "SampleProduct", type: ["Drink"], brand: "Coco Cola"
}

export const SampleRating: Rating = {
  id: "",
  product: SampleProduct,
  stars: 3.5,
  labelList: [],
  votes: 0,
  description: 'test description',
  images: [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`) //TODO: remove this
};

