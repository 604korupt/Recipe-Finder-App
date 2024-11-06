import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String
}, { timestamps: true });

export const Recipe = mongoose.model('Recipe', recipeSchema); 