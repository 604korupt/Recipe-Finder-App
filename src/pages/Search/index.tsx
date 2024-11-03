import { Helmet } from "react-helmet";
import { Button, Heading, Img } from "../../components";
import DairyFreeRecipeCard from "../../components/DiaryFreeRecipeCard";
import DietaryPreferences from "../../components/DietaryPreferences";
import RecipeFinderSection from "./RecipeFinderSection";
import React, { Suspense } from "react";

const searchResultsGrid = [
    {
        recipeImage: "images/img_image_rounded_200x288.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
    {
        recipeImage: "images/img_image_rounded_1.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
    {
        recipeImage: "images/img_image_rounded_2.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
    {
        recipeImage: "images/img_image_rounded_200x288.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
    {
        recipeImage: "images/img_image_rounded_1.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
    {
        recipeImage: "images/img_image_rounded_2.png",
        dietaryLabel: "Dairy Free",
        recipeTitle: "Fried Rice",
        cookingTime: "40 min",
    },
];

export default function SearchPage() {
    return (
        <>
            <Helmet>
                <title>Recipe Finder</title>
                <meta name="description" content="Find your favorite recipes" />
            </Helmet>
            <div className="w-full bg-white-a700">
                <div className="mb-9 flex flex-col items-center gap-[42px]">
                    {/* Recipe Finder Section */}
                    <RecipeFinderSection />
                    <div className="container-xs flex flex-col gap-[34px] md:px-5">
                        <div className="ml-3.5 mr-2 flex items-start justify-between gap-5 md:mx-0">
                            <Heading
                                size="headinglg"
                                as="h2"
                                className="mt-1 self-end text-[64px] font-bold text-gray-900 md:text-[48px]"
                            >
                                Search Recipes
                            </Heading>
                            <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank" rel="noopener noreferrer">
                                <Button
                                    shape="round"
                                    rightIcon={<Img src="images/img_arrowright.svg" alt="Arrow Right" className="h-[26px] w-[26px]" />}
                                    className="min-w-[124px] gap-3.5 rounded-[10px] pl-3 pr-[22px] sm:pr-5"
                                >
                                    Home
                                </Button>
                            </a>
                        </div>
                        <div className="flex items-start gap-9 md:flex-col">
                            <div className="w-[22%] self-center md:w-full">
                                <div className="bg-white-a700">
                                    <div className="flex rounded-md bg-white-a700 px-3.5 py-2">
                                        <Heading
                                            size="headings"
                                            as="h3"
                                            className="mt-2.5 font-poppins text-[22px] font-semibold text-gray-900"
                                        >
                                            Filters
                                        </Heading>
                                    </div>
                                    <div className="mb-[282px] mr-5 flex flex-col md:mr-0 md:flex-row sm:flex-col">
                                        <DietaryPreferences />
                                        <DietaryPreferences />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col items-start gap-[66px] md:self-stretch sm:gap-[33px]">
                                <div className="grid grid-cols-3 gap-3.5 self-stretch md:grid-cols-2 sm:grid-cols-1">
                                    <Suspense fallback={<div>Loading feed ...</div>}>
                                        {searchResultsGrid.map((d, index) => (
                                            <DairyFreeRecipeCard {...d} key={"productsGrid" + index} />
                                        ))}
                                    </Suspense>
                                </div>
                                <Button
                                    color="light_green_800"
                                    size="xs"
                                    shape="round"
                                    className="ml-[104px] min-w-[400px] rounded-[10px] px-[34px] md:ml-0 sm:px-5"
                                >
                                    Load More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
