import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String
}, { timestamps: true });

// add fields for ingredients and instructions
recipeSchema.add({
    ingredients: [String],
    instructions: [String]
});

export const Recipe = mongoose.model('Recipe', recipeSchema); 