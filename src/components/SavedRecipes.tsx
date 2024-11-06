import React, { useEffect, useState } from 'react';

interface Recipe {
    _id: string;
    id: number;
    title: string;
    image: string;
}

const SavedRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recipes', {
                    credentials: 'include'
                });
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recipes.map((recipe) => (
                <div key={recipe._id} className="flex flex-col items-center p-4 border rounded-lg">
                    <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="mt-2 text-lg font-semibold">{recipe.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default SavedRecipes; 