import express from 'express';
import { Recipe } from '../models/Recipe.js';

export const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Save a recipe
router.post('/', async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Error saving recipe' });
    }
}); 