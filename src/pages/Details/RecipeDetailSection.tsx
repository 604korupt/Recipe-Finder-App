import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { spoonacularApi } from "../../components/services/spoonacularApi";
import { Img, Heading } from "../../components";

export default function RecipeDetailSection() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                const recipeData = await spoonacularApi.getRecipeById(Number(id));
                setRecipe(recipeData);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleSaveRecipe = async () => {
        try {
            setIsSaving(true);

            if (!recipe) throw new Error('Recipe data is not available.');

            const ingredients = recipe.extendedIngredients.map((ingredient: any) => ingredient.original);
            const instructions = recipe.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [];
            
            const payload = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                ingredients: ingredients,
                instructions: instructions,
            };

            // if the recipe is already saved, there should be no duplicates
            const recipeExists = await fetch(`http://localhost:5000/api/recipes/${recipe.id}`, {
                credentials: 'include'
            });

            if (recipeExists.ok) {
                alert('Recipe already saved!');
                return;
            }

            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
        <>
            <div className="mb-1 flex flex-col items-center">
                <div className="container-xs flex flex-col items-left gap-12 md:px-5">
                    <div className="flex items-center justify-between gap-5 self-stretch px-2">
                        <Heading size="headinglg" as="h2" className="text-[64px] font-bold text-gray-900 md:text-[48px]">
                            Recipe Detail
                        </Heading>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleSaveRecipe}
                                disabled={isSaving}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isSaving ? 'Saving...' : 'Save Recipe'}
                            </button>
                        </div>
                    </div>
                    {recipe ? (
                        <div>
                            <h2 className="text-xl font-semibold">{recipe.title}</h2>
                            <br />         
                            <div className="flex">
                                {recipe.image && <Img src={recipe.image} alt={recipe.title} className="rounded-lg mb-4" />}
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">Ingredients:</h3>
                                    <ul className="list-disc pl-5">
                                        {recipe.extendedIngredients.map((ingredient: any) => (
                                            <li key={ingredient.id}>{ingredient.original}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">Instructions:</h3>
                            <ul className="list-decimal pl-5">
                                {recipe.analyzedInstructions[0].steps.map((step: any) => (
                                    <li key={step.number}>{step.step}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center">Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}