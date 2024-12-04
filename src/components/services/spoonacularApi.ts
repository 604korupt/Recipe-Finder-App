// src/services/spoonacularApi.ts

import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  dairyFree: boolean;
}

export const spoonacularApi = {
  // search recipes by query
  searchRecipes: async (query: string, diets: string[] = [], intolerences: string[] = [], offset: number = 0) => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/complexSearch`,
      {
        params: {
          apiKey: API_KEY,
          query,
          addRecipeInformation: true,
          number: 99,
          diet: diets.join(','), 
          intolerances: intolerences.join(','),
          offset: offset
        }
      }
    );
    console.log("search response:", data);
    return data.results;
  },

  // get recipe by id
  getRecipeById: async (id: number) => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY
        }
      }
    );
    // just return the data, since there some things needed
    return data;
  },

  getRandomRecipe: async () => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/random`,
      {
        params: {
          apiKey: API_KEY,
          number: 1
        }
      }
    );
    return data.recipes[0];
  }
};
