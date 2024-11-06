import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Add this temporary test data
const testRecipes = [
  {
    _id: "1",
    category: "Main Course",
    title: "Test Recipe",
    cookingTime: "30 mins",
    image: "https://via.placeholder.com/200"
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Temporarily return test data to verify frontend rendering
    return res.status(200).json(testRecipes);

    /* Comment out the MongoDB logic for now
    if (!uri) {
        return res.status(500).json({ error: 'MongoDB URI is not defined' });
    }

    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        const recipes = await db.collection('recipes').find({}).toArray();
        await client.close();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Unable to fetch recipes' });
    }
    */
} 