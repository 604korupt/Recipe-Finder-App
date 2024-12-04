import { Helmet } from "react-helmet";
import { Button, Heading } from "../../components";
import DairyFreeRecipeCard from "../../components/DiaryFreeRecipeCard";
import DietaryPreferences from "../../components/DietaryPreferences";
import RecipeFinderSection from "./RecipeFinderSection";
import React, { useState, useEffect } from "react";
import { spoonacularApi } from "../../components/services/spoonacularApi";
import { useSearchParams } from 'react-router-dom';
import Allergies from "../../components/Allergies";

interface Recipe {
    id: number;
    title: string;
    image: string;
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(0);
    const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    
    useEffect(() => {
        // when going to this page, scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); // empty dependency array is used to run only once

    useEffect(() => {
        // Only perform search if there's a query
        const query = searchParams.get('q');
        if (query) {
            performSearch(query);
        }
    }, [searchParams]);

    useEffect(() => {
        if (searchTerm) {
            performSearch(searchTerm);
        }
    }, [selectedDiets]);

    useEffect(() => {
        if (searchTerm) {
            performSearch(searchTerm);
        }
    }, [selectedAllergies]);

    const performSearch = async (query: string) => {
        try {
            const results = await spoonacularApi.searchRecipes(query, selectedDiets, selectedAllergies);
            console.log("api response:", results);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await spoonacularApi.searchRecipes(searchTerm);
            console.log("api response:", response);
            // Ensure we're getting an array of results
            const results = Array.isArray(response) ? response : [];
            console.log('Search Results:', results); // Debug log
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
            setSearchResults([]); // Reset to empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    const handlePreviousPage = () => {
        setDisplayCount(prev => Math.max(0, prev - 6));
    }

    const handleNextPage = () => {
        setDisplayCount(prev => Math.min(searchResults.length, prev + 6));
    }

    return (
        <>
            <Helmet>
                <title>Search Recipe</title>
                <meta name="description" content="Find your favorite recipes" />
            </Helmet>
            <div className="w-full bg-white-a700">
                <div className="mb-9 flex flex-col items-center gap-[42px]">
                    {/* Recipe Finder Section */}
                    <RecipeFinderSection />
                    <div className="container-xs flex flex-col gap-[34px] md:px-5">
                        <div className="ml-3.5 mr-2 flex items-center justify-between gap-5 md:mx-0">
                            <div className="flex items-center gap-5 flex-1">
                                <Heading
                                    size="headinglg"
                                    as="h2"
                                    className="text-[64px] font-bold text-gray-900 md:text-[48px]"
                                >
                                    Search Recipes
                                </Heading>
                                <form onSubmit={handleSearch} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                        placeholder="Search recipes..."
                                    />
                                    <Button
                                        type="submit"
                                        className="!w-24 !h-10 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg"
                                    >
                                        Search
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Filters and Search Results */}
                        <div className="flex items-start gap-9 md:flex-col">
                            <div className="w-[22%] md:w-full">
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
                                    <div className="mr-5 flex flex-col md:mr-0 md:flex-row sm:flex-col">
                                        {/* Dietary Preferences */}
                                        <DietaryPreferences 
                                            onDietsChange={(diets) => {
                                                setSelectedDiets(diets);
                                            }} 
                                        />
                                        {/* Allergies */}
                                        <Allergies
                                            onAllergiesChange={(allergies) => {
                                                setSelectedAllergies(allergies);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col items-start gap-[66px] md:ml-0 md:self-stretch sm:gap-[33px]">
                                <div className="grid grid-cols-3 gap-3.5 self-stretch md:grid-cols-2 sm:grid-cols-1">
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        searchResults.length > 0 ? (
                                            searchResults.slice(displayCount, displayCount + 6).map((recipe) => (
                                                <DairyFreeRecipeCard
                                                    key={recipe.id}
                                                    id={recipe.id}
                                                    title={recipe.title}
                                                    image={recipe.image}
                                                />
                                            ))
                                        ) : (
                                            <div>No recipes found</div>
                                        )
                                    )}
                                </div>
                                {searchResults.length > 6 && displayCount < searchResults.length && (
                                    <div className="flex justify-center w-full mt-4 mb-4 gap-4">
                                        <Button
                                            shape="round"
                                            className="!w-30 !h-12 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg"
                                            onClick={handlePreviousPage}
                                            disabled={displayCount === 0}
                                        >
                                            Previous Page
                                        </Button>
                                        <Button
                                            shape="round"
                                            className="!w-30 !h-12 !px-4 !py-2 bg-light_green-a700 text-white hover:bg-light_green-a700 rounded-lg"
                                            onClick={handleNextPage}
                                            disabled={displayCount + 6 >= searchResults.length}
                                        >
                                            Next Page
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
