export interface UserFields {
    email: string;
    displayName: string;
    avatar: string | null;
    password: string;
    role: string;
    token: string;
}

export interface NewCocktail {
    name: string;
    ingredients: string[];
    recipe: string;
    image: string | null;
    isPublished?: boolean;
}