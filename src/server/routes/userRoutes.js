import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users'});
    }
});

// Add a recipe to a user
router.post('/:firebaseUserId/recipes', async (req, res) => {
    const { firebaseUserId } = req.params;
    const { id, title, image, ingredients, instructions } = req.body;
    
    try {
        const user = await User.findOneAndUpdate(
            { firebaseUserId },
            { $push: { recipes: { id, title, image, ingredients, instructions } } },
            { new: true, upsert: true } // Create user if not exists
        );
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error adding recipe to user' });
    }
});

// Get all recipes for a user
router.get('/:firebaseUserId/recipes', async (req, res) => {
    const { firebaseUserId } = req.params;

    try {
        const user = await User.findOne({ firebaseUserId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user recipes' });
    }
});

// Get a specific recipe for a user
router.get('/:firebaseUserId/recipes/:recipeId', async (req, res) => {
    const { firebaseUserId, recipeId } = req.params;

    try {
        const user = await User.findOne({ firebaseUserId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const recipe = user.recipes.id(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({error: 'Error fetching user recipes' });
    }
});

export default router; 