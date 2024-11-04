// src/services/spoonacularApi.ts

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
  searchRecipes: async (query: string) => {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true`
    );
    return response.json();
  },

  getRecipeById: async (id: number) => {
    const response = await fetch(
      `${BASE_URL}/recipes/informationBulk?apiKey=${API_KEY}&ids=${id}`
    );
    return response.json();
  },

  getRandomRecipes: async () => {
    const response = await fetch(
      `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=8`
    );
    return response.json();
  }
};
