import React, { useEffect, useState } from "react";
import { Button, Heading, Img } from "./..";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import Firebase auth

interface Recipe {
  _id: string;
  id: string;
  category: string;
  title: string;
  cookingTime: string;
  image: string;
}

interface Props {
    className?: string;
    titleText?: React.ReactNode;
    searchButtonText?: string;
}

export default function RecipeList({
    titleText = "All Recipes",
    searchButtonText = "Search",
    ...props
}: Props) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
    const [currentCount, setCurrentCount] = useState(8);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log('Current User:', user); // Log current user
            if (!user) {
                setRecipes([]); // Clear recipes if no user
                setLoading(false); // Set loading to false
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Throw error for non-2xx responses
                }
                const data = await response.json();
                console.log('Fetched Recipes:', data); // Log fetched recipes
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    useEffect(() => {
        setVisibleRecipes(recipes.slice(0, currentCount));
    }, [recipes, currentCount]);

    const handleLoadMore = () => {
        setCurrentCount(prev => prev + 8);
    };

    const handleDeleteRecipe = async (id: string) => {
        try {
            // before deleting, add a confirmation dialog
            if (!window.confirm('Are you sure you want to delete this recipe?')) return;

            const user = auth.currentUser;
            if (!user) throw new Error('User is not authenticated.');
            const response = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // remove the deleted recipe from the list
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div {...props} className={`${props.className} flex flex-col items-center gap-10 flex-1 container-xs`}>
            <div className="mx-2 flex items-center justify-between gap-5 self-stretch md:mx-0">
                <Heading size="headinglg" as="h1" className="text-[64px] font-bold text-gray-900 md:text-[48px]">
                    {titleText}
                </Heading>
            </div>

            {loading ? ( // Show loading state only while fetching
                <div>Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-3.5 self-stretch md:grid-cols-1">
                        {visibleRecipes.map((recipe, index) => (
                            <div key={recipe._id} className="flex flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                                <Img
                                    src={recipe.image || `images/img_image_rounded_${index}.png`}
                                    alt={`${recipe.title} Image`}
                                    className="h-[200px] rounded-[16px] object-cover"
                                />
                                <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                                    <div className="relative mt-[-2px] self-stretch">
                                        <div>
                                            <div className="flex flex-col items-center gap-1.5">
                                                <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                                    {recipe.title}
                                                </Heading>
                                                <Link to={`/saved-recipes/${recipe.id}`} 
                                                    className="font-poppins mt-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                                    style={{ color: 'white' }}
                                                >
                                                    View Recipe Details
                                                </Link>
                                                {/* Add button to delete recipe */}
                                                <Button
                                                    className="mt-2 !h-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    onClick={() => handleDeleteRecipe(recipe.id)}
                                                >
                                                    Delete Recipe
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {recipes.length > 8 && currentCount < recipes.length && (
                        <Button
                            shape="round"
                            className="!w-30 !h-12 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
