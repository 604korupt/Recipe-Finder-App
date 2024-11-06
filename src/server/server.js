import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as recipesRouter } from './routes/recipes.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
}));
app.use(express.json());

// MongoDB connection
await mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api/recipes', recipesRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 