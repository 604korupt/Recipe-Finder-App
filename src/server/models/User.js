import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseUserId: {
        type: String,
        required: true,
        unique: true
    },
    recipes: [
        {
            id: Number,
            title: String,
            image: String,
            ingredients: [String],
            instructions: [String]
        }
    ]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema); 