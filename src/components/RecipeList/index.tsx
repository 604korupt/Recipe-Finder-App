import React, { useEffect, useState } from "react";
import { Button, Heading, Img } from "./..";

interface Recipe {
  _id: string;
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

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log('Fetching recipes...');
                const response = await fetch('http://localhost:5000/api/recipes');
                console.log('Response status:', response.status);
                const data = await response.json();
                console.log('Fetched recipes:', data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        setVisibleRecipes(recipes.slice(0, currentCount));
    }, [recipes, currentCount]);

    const handleLoadMore = () => {
        setCurrentCount(prev => prev + 8);
    };

    return (
        <div {...props} className={`${props.className} flex flex-col items-center gap-10 flex-1 container-xs`}>
            <div className="mx-2 flex items-center justify-between gap-5 self-stretch md:mx-0">
                <Heading size="headinglg" as="h1" className="text-[64px] font-bold text-gray-900 md:text-[48px]">
                    {titleText}
                </Heading>
                <Button
                    shape="round"
                    rightIcon={<Img src="images/img_arrowright.svg" alt="Arrow Right" className="h-[26px] w-[26px]" />}
                    className="min-w-[124px] gap-3.5 rounded-[10px] px-3"
                >
                    {searchButtonText}
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-3.5 self-stretch md:grid-cols-1">
                {visibleRecipes.map((recipe, index) => (
                    <div key={recipe._id} className="flex flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                        <Img
                            src={recipe.image || `images/img_image_rounded_${index}.png`}
                            alt={`${recipe.title} Image`}
                            className="h-[200px] rounded-[16px] object-cover"
                        />
                        <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                            <Heading size="textxs" as="p" className="relative z-[1] text-[10px] font-medium text-gray-500">
                                {recipe.category}
                            </Heading>
                            <div className="relative mt-[-2px] self-stretch">
                                <div>
                                    <div className="flex flex-col items-start gap-1.5">
                                        <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                            {recipe.title}
                                        </Heading>
                                        <Heading as="h5" className="text-[20px] font-semibold text-deep_orange-700">
                                            {recipe.cookingTime}
                                        </Heading>
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
                    className="min-w-[124px] gap-3.5 rounded-[10px] px-3 mt-5 bg-light_green-a700 text-white hover:bg-light_green-a700"
                    onClick={handleLoadMore}
                >
                    Load More
                </Button>
            )}
        </div>
    );
}
