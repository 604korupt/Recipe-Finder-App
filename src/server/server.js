import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recipesRouter from './routes/recipes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
}));
app.use(express.json());

dotenv.config({ path: './.env.local' });

const URI = process.env.VITE_MONGO_URI;

// MongoDB connection
await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api/recipes', recipesRouter);
app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 