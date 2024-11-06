// src/services/spoonacularApi.ts

import axios from 'axios';

const API_KEY = '43a00d1f1dc54aa59aa3f4cfaf04f9fd';
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
  searchRecipes: async (query: string) => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/complexSearch`,
      {
        params: {
          apiKey: API_KEY,
          query,
          addRecipeInformation: true
        }
      }
    );
    console.log("search response:", data);
    return data.results;
  },

  // get recipe by id
  getRecipeById: async (id: number) => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/informationBulk`,
      {
        params: {
          apiKey: API_KEY,
          ids: id
        }
      }
    );
    return data;
  },

  // TODO: may not need this, but will keep it for now
  getRandomRecipes: async () => {
    const { data } = await axios.get(
      `${BASE_URL}/recipes/random`,
      {
        params: {
          apiKey: API_KEY,
          number: 8
        }
      }
    );
    return data;
  }
};
