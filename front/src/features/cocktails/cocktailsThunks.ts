import { Cocktail, CocktailMutation } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
  "cocktails/createCocktail",
  async (cocktailMutation) => {
    const formData = new FormData();

    const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/cocktails", formData);
  },
);

export const fetchCocktails = createAsyncThunk<Cocktail[], void>(
  "cocktails/fetchCocktails",
  async () => {
    const response = await axiosApi<Cocktail[]>("/cocktails");
    return response.data || [];
  },
);

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
  "cocktails/fetchOneCocktail",
  async (id) => {
    const response = await axiosApi<Cocktail>(`/cocktails/${id}`);
    return response.data;
  }
);

export const fetchMyCocktails = createAsyncThunk<Cocktail[], void>(
  "cocktails/fetchMyCocktails",
  async () => {
    const response = await axiosApi<Cocktail[]>("/cocktails/my");
    return response.data || [];
  }
);