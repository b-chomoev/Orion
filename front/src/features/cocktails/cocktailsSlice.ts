import { Cocktail } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail } from './cocktailsThunks';

interface ICocktail {
  items: Cocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ICocktail = {
  items: [],
  fetchLoading: false,
  createLoading: false,
}

export const createCocktailSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.createLoading = false;
      });
  }
})

export const createCocktailReducer = createCocktailSlice.reducer;