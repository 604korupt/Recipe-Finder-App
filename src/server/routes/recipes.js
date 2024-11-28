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

// Get a recipe by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findOne({ id: id });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe' });
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