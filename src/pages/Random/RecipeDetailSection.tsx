import { useEffect, useState } from "react";
import { spoonacularApi } from "../../components/services/spoonacularApi";
import { Img, Heading } from "../../components";
import { auth } from "../../firebaseConfig"; // Import Firebase auth

export default function RecipeDetailSection() {
    const [recipe, setRecipe] = useState<any>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await spoonacularApi.getRandomRecipe();
            setRecipe(recipeData);
        };
        fetchRecipe();
    }, []);

    const handleSaveRecipe = async () => {
        try {
            setIsSaving(true);
            setMessage(null);

            if (!recipe) throw new Error('Recipe data is not available.');

            const ingredients = recipe.extendedIngredients.map((ingredient: any) => ingredient.original);
            const instructions = recipe.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [];
            
            const user = auth.currentUser; // Get the current user from Firebase
            if (!user) throw new Error('User is not authenticated.');
            // if the user is using email/password, and their email is not verified, don't allow saving
            if (user.providerData.some((userInfo) => userInfo.providerId === 'password') && !user.emailVerified) {
                setMessage('Please verify your email before saving recipes.');
                return;
            }

            const payload = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                ingredients: ingredients,
                instructions: instructions,
            };
            
            // if the recipe already exists in the user's recipes, don't save it again
            const userRecipesResponse = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes`, {
                method: 'GET',
                credentials: 'include'
            });
            const userRecipes = await userRecipesResponse.json();
            if (userRecipes.some((userRecipe: any) => userRecipe.id === recipe.id)) {
                setMessage('Recipe already saved!');
                return;
            }

            // Post the recipe to the user's recipes endpoint
            const response = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Recipe saved successfully!');
            } else {
                throw new Error(data.error || 'Failed to save recipe');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            setMessage(error instanceof Error ? error.message : 'Failed to save recipe');
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
                        {message && (
                        <div className={`mt-4 text-center ${message.startsWith('Recipe saved') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </div>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleSaveRecipe}
                                disabled={isSaving}
                                className="font-poppins px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                                style={{ color: 'white' }}
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