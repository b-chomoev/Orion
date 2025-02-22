export interface Cocktail {
  _id: string;
  name: string;
  ingredients: string[];
  recipe: string;
  image: string | null;
  user: User;
  isPublished: boolean;
}

export interface CocktailMutation {
  name: string;
  ingredients: string;
  recipe: string;
  image: File | null;
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  avatar: File | null;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  avatar: string | null;
  role: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}