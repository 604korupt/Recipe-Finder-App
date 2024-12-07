import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Img, Heading } from "../../components";
import { auth } from "../../firebaseConfig";

export default function RecipeDetailSection() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                const user = auth.currentUser;
                if (!user) throw new Error('User is not authenticated.');
                
                const recipeData = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes/${id}`);
                const data = await recipeData.json();
                setRecipe(data);
            }
        };
        fetchRecipe();
    }, [id]);

    return (
        <>
            <div className="mb-1 flex flex-col items-center">
                <div className="container-xs flex flex-col items-left gap-12 md:px-5">
                    <div className="flex items-center justify-between gap-5 self-stretch px-2">
                        <Heading size="headinglg" as="h2" className="text-[64px] font-bold text-gray-900 md:text-[48px]">
                            Recipe Detail
                        </Heading>
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
                                        {recipe.ingredients.map((ingredient: any, index: any) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">Instructions:</h3>
                            <ul className="list-decimal pl-5">
                                {recipe.instructions.map((instruction: any, index: any) => (
                                    <li key={index}>{instruction}</li>
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