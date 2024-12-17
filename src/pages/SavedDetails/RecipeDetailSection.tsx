import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Img, Heading } from "../../components";
import { auth } from "../../firebaseConfig";
import { useTranslation } from "react-i18next";

interface RecipeDetailSectionProps {
    isDarkMode: boolean;
}

export default function RecipeDetailSection({ isDarkMode }: RecipeDetailSectionProps) {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchRecipe = async () => {
            const user = auth.currentUser;
            if (!user) {
                return;
            }

            if (id) {
                const recipeData = await fetch(`http://localhost:5000/api/users/${user.uid}/recipes/${id}`);
                const data = await recipeData.json();
                setRecipe(data);
            }
        };
        fetchRecipe();
    }, [id, isAuthenticated]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="mb-1 flex flex-col items-center">
                <div className="container-xs flex flex-col items-left gap-12 md:px-5">
                    <div className="flex items-center justify-between gap-5 self-stretch px-2">
                        {isAuthenticated && (
                        <Heading size="headinglg" as="h2" className={`text-[64px] font-bold ${isDarkMode ? 'text-white-a700' : 'text-gray-900'} md:text-[48px]`}>
                                {t('recipeDetail')}
                            </Heading>
                        )}
                    </div>
                    {loading ? (
                        <div className={`text-center ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{t('loading')}</div>
                    ) : isAuthenticated ? (
                        recipe ? (
                            <div>
                                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{recipe.title}</h2>
                                <br />
                                <div className="flex">
                                    {recipe.image && <Img src={recipe.image} alt={recipe.title} className={`rounded-lg mb-4 ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`} />}
                                    <div className={`ml-4 ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>
                                        <h3 className="text-lg font-semibold">{t('ingredients')}</h3>
                                        <ul className="list-disc pl-5">
                                            {recipe.ingredients.map((ingredient: any, index: any) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{t('instructions')}:</h3>
                                <ul className={`list-decimal pl-5 ${isDarkMode ? 'text-white-a700' : 'text-gray-900'} mb-5`}>
                                    {recipe.instructions.map((instruction: any, index: any) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className={`text-center ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{t('loading')}</div>
                        )
                    ) : (
                        <div className="text-center">{t('viewRecipeLogin')}</div>
                    )}
                </div>
            </div>
        </div>
    );
}