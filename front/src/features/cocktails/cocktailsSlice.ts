import { Cocktail } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, fetchCocktails, fetchMyCocktails, fetchOneCocktail } from './cocktailsThunks';
import { RootState } from '../../app/store';

interface ICocktail {
  items: Cocktail[];
  cocktail: Cocktail | null;
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ICocktail = {
  items: [],
  cocktail: null,
  fetchLoading: false,
  createLoading: false,
}

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectOneCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailFetchLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCocktailCreateLoading = (state: RootState) => state.cocktails.createLoading;

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
      })

      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.items = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneCocktail.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktail}) => {
        state.cocktail = cocktail;
        state.fetchLoading = false;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchMyCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMyCocktails.fulfilled, (state, {payload: cocktail}) => {
        state.fetchLoading = false;
        state.items = cocktail;
      })
      .addCase(fetchMyCocktails.rejected, (state) => {
        state.fetchLoading = false;
      });
  }
})

export const createCocktailReducer = createCocktailSlice.reducer;