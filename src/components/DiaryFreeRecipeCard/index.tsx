import React, { useState } from "react";

interface DairyFreeRecipeCardProps {
    id: number;
    title: string;
    image: string;
}

const DairyFreeRecipeCard: React.FC<DairyFreeRecipeCardProps> = ({
    id,
    title,
    image
}) => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveRecipe = async () => {
        try {
            setIsSaving(true);
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, title, image }),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Recipe saved successfully!');
            } else {
                throw new Error(data.error || 'Failed to save recipe');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert(error instanceof Error ? error.message : 'Failed to save recipe');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 border rounded-lg">
            <img 
                src={image} 
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
            <button
                onClick={handleSaveRecipe}
                disabled={isSaving}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {isSaving ? 'Saving...' : 'Save Recipe'}
            </button>
        </div>
    );
};

export default DairyFreeRecipeCard;