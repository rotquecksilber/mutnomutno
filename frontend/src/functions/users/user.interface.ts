export interface CreateUser{
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface AccessToken{
  access_token: string;
}

export interface SigninUser {
  username: string;
  password: string;
}
