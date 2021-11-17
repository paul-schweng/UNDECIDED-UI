export interface User {
  username: string,
  email?: string,
  name: string,
  birthdate?: Date,
  usertype: 'privat' | 'business',
  verified: boolean,
  description?: string,
  profileImage?: string | File,
  registerDate?: Date,
  isDarkTheme?: boolean,
  language?: string
}

