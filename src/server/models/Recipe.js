import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String,
    ingredients: [String],
    instructions: [String]
}, { timestamps: true });

export const Recipe = mongoose.model('Recipe', recipeSchema); 