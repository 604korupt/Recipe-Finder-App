import React, { useEffect, useState } from "react";
import { Button, Heading, Img } from "./..";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import Firebase auth
import { useTranslation } from 'react-i18next'; // Add this import

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

interface RecipeListProps {
    isDarkMode: boolean;
}

export default function RecipeList({
    isDarkMode,
    searchButtonText = "Search",
    ...props
}: RecipeListProps & Props) {
    const { t } = useTranslation(); // Initialize translation
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
    const [currentCount, setCurrentCount] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state
    const [deletingRecipeId, setDeletingRecipeId] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    // update the recipes displayed when the currentCount changes
    useEffect(() => {
        setVisibleRecipes(recipes.slice(currentCount, currentCount + 4));
    }, [recipes, currentCount]);

    // when clicking on previous page, set count to max of 0 and prevcount
    const handlePreviousPage = () => {
        setCurrentCount((prevCount) => Math.max(0, prevCount - 4));
    };

    // when clicking on next page, set count to min of len recipes and prevcount
    const handleNextPage = () => {
        setCurrentCount((prevCount) => Math.min(recipes.length, prevCount + 4));
    };

    const handleDeleteRecipe = async () => {
        if (!deletingRecipeId) return;
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User is not authenticated.');
            const response = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes/${deletingRecipeId}`,
                {
                method: 'DELETE',
                credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // remove the deleted recipe from the list
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== deletingRecipeId));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        } finally {
            setDeletingRecipeId(null); // Reset deleting state
            setShowConfirmation(false); // Hide confirmation dialog
        }
    };

    // Show confirmation dialog for a specific recipe
    const confirmDelete = (id: string) => {
        setDeletingRecipeId(id);
        setShowConfirmation(true);
    };

    // Cancel the deletion
    const cancelDelete = () => {
        setShowConfirmation(false);
        setDeletingRecipeId(null);
    };

    return (
        <div {...props} className={`${props.className} flex flex-col items-center gap-10 flex-1 container-xs`}>
            <div className="mx-2 flex items-center justify-between gap-5 self-stretch md:mx-0">
                <Heading size="headinglg" as="h1" className={`text-[64px] font-bold text-gray-900 md:text-[48px] ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>
                    {t('allRecipes')}
                </Heading>
            </div>

            {loading ? ( // Show loading state only while fetching
                <div className={`${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{t('loading')}</div>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-3.5 self-stretch md:grid-cols-1">
                        {visibleRecipes.map((recipe, index) => (
                            <div key={recipe._id} className={`flex flex-col gap-2 rounded-[16px] ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-2 shadow-xs border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                <Img
                                    src={recipe.image || `images/img_image_rounded_${index}.png`}
                                    alt={`${recipe.title} Image`}
                                    className={`h-[200px] rounded-[16px] object-cover ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}
                                />
                                <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                                    <div className="relative mt-[-2px] self-stretch">
                                        <div>
                                            <div className="flex flex-col items-center gap-1.5">
                                                <Heading as="h5" className={`text-[20px] font-bold ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>
                                                    {recipe.title}
                                                </Heading>
                                                {showConfirmation && deletingRecipeId === recipe.id ? (
                                                    <div></div> // Empty div to maintain layout
                                                ) : (<Link to={`/saved-recipes/${recipe.id}`}
                                                    className="font-poppins mt-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                                    style={{ color: 'white' }}
                                                >
                                                    {t('viewRecipe')}
                                                </Link>)}
                                                {showConfirmation && deletingRecipeId === recipe.id ? (
                                                    <div className="text-[17px] font-bold mt-2 text-center">
                                                        <p>{t('deleteConfirm')}</p>
                                                        <div className="flex gap-2 mt-2 justify-center">
                                                        <Button
                                                            className="!h-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                            onClick={handleDeleteRecipe}
                                                        >
                                                            {t('yesDelete')}
                                                        </Button>
                                                        <Button
                                                            className="!h-10 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                            onClick={cancelDelete}
                                                        >
                                                            {t('cancel')}
                                                        </Button>
                                                        </div>
                                                    </div>
                                                    ) : (
                                                    // Otherwise, show the regular Delete button
                                                    <Button
                                                        className="mt-2 !h-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                        onClick={() => confirmDelete(recipe.id)}
                                                    >
                                                        {t('delete')}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {recipes.length > 4 && currentCount < recipes.length && (
                        <div className="flex justify-between mt-4">
                            <Button
                                shape="round"
                                className="!w-30 !h-12 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg mr-4"
                                onClick={handlePreviousPage}
                                disabled={currentCount === 0}
                                style={{ backgroundColor: currentCount === 0 ? '#d1d3d8' : '' }}
                            >
                                {t('previous')}
                            </Button>
                            <Button
                                shape="round"
                                className="!w-30 !h-12 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg ml-4"
                                onClick={handleNextPage}
                                disabled={currentCount + 4 >= recipes.length}
                                style={{ backgroundColor: currentCount + 4 >= recipes.length ? '#d1d3d8' : '' }}
                            >
                                {t('next')}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
