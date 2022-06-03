import {Subscriber} from "./Subscriber";
import {User} from "../../models/user";
import {AuthenticationService} from "./userService";

class ProfileComponent extends Subscriber<User>{

  update() {
    console.log('updated profile');
  }

  constructor(publisher: AuthenticationService) {
    super(publisher);
  }

}

