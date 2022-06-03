export class User {
  id?: string;
  username?: string;
  email?: string;
  name?: string;
  birthdate?: Date | string;
  usertype?: 'privat' | 'business';
  verified?: boolean;
  description?: string;
  profileImage?: any;
  registerDate?: Date | string;
  isDarkTheme?: boolean;
  language?: string;
  password?: string;
  rememberMe?: boolean;
  followerNum?: number;
  followingNum?: number;
  ratingsNum?: number;
  bannerImage?: number;
  isFunnyCursor?: boolean;
  modelType?: 'user';

  public loadImage() {
    if (this.id != ""){
      this.profileImage = `/api/img/user/${this.id}`;
    }
  }

}

