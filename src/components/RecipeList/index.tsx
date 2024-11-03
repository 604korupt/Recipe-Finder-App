import React from "react";
import { Button, Heading, Img } from "./..";

interface Props {
    className?: string;
    titleText?: React.ReactNode;
    searchButtonText?: string;
    recipeCategoryOne?: React.ReactNode;
    recipeTitleOne?: React.ReactNode;
    recipeTimeOne?: React.ReactNode;
    recipeCategoryTwo?: React.ReactNode;
    recipeTitleTwo?: React.ReactNode;
    recipeTimeTwo?: React.ReactNode;
    recipeCategoryThree?: React.ReactNode;
    recipeTitleThree?: React.ReactNode;
    recipeTimeThree?: React.ReactNode;
    recipeCategoryFour?: React.ReactNode;
    recipeTitleFour?: React.ReactNode;
    recipeTimeFour?: React.ReactNode;
}

export default function RecipeList({
    titleText = "All Recipes",
    searchButtonText = "Search",
    recipeCategoryOne = "Dairy Free",
    recipeTitleOne = "Fried Rice",
    recipeTimeOne = "40 min",
    recipeCategoryTwo = "Dairy Free",
    recipeTitleTwo = "Fried Rice",
    recipeTimeTwo = "40 min",
    recipeCategoryThree = "Dairy Free",
    recipeTitleThree = "Fried Rice",
    recipeTimeThree = "40 min",
    recipeCategoryFour = "Dairy Free",
    recipeTitleFour = "Fried Rice",
    recipeTimeFour = "40 min",
    ...props
}: Props) {
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
            <div className="flex gap-3.5 self-stretch md:flex-col">
                <div className="flex w-full flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                    <Img
                        src="images/img_image_rounded.png"
                        alt="Recipe Image"
                        className="h-[200px] rounded-[16px] object-cover"
                    />
                    <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                        <Heading size="textxs" as="p" className="relative z-[1] text-[10px] font-medium text-gray-500">
                            {recipeCategoryOne}
                        </Heading>
                        <div className="relative mt-[-2px] self-stretch">
                            <div>
                                <div className="flex flex-col items-start gap-1.5">
                                    <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                        {recipeTitleOne}
                                    </Heading>
                                    <Heading as="h5" className="text-[20px] font-semibold text-deep_orange-700">
                                        {recipeTimeOne}
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                    <Img
                        src="images/img_image_rounded_200x288.png"
                        alt="Second Image"
                        className="h-[200px] rounded-[16px] object-cover"
                    />
                    <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                        <Heading size="textxs" as="p" className="relative z-[2] text-[10px] font-medium text-gray-500">
                            {recipeCategoryTwo}
                        </Heading>
                        <div className="relative mt-[-2px] self-stretch">
                            <div>
                                <div className="flex flex-col items-start gap-1.5">
                                    <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                        {recipeTitleTwo}
                                    </Heading>
                                    <Heading as="h5" className="text-[20px] font-semibold text-deep_orange-700">
                                        {recipeTimeTwo}
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                    <Img
                        src="images/img_image_rounded_1.png"
                        alt="Third Image"
                        className="h-[200px] rounded-[16px] object-cover"
                    />
                    <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                        <Heading size="textxs" as="p" className="relative z-[3] text-[10px] font-medium text-gray-500">
                            {recipeCategoryThree}
                        </Heading>
                        <div className="relative mt-[-2px] self-stretch">
                            <div>
                                <div className="flex flex-col items-start gap-1.5">
                                    <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                        {recipeTitleThree}
                                    </Heading>
                                    <Heading as="h5" className="text-[20px] font-semibold text-deep_orange-700">
                                        {recipeTimeThree}
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 rounded-[16px] bg-white-a700 p-2 shadow-xs">
                    <Img
                        src="images/img_image_rounded_2.png"
                        alt="Fourth Image"
                        className="h-[200px] rounded-[16px] object-cover"
                    />
                    <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start md:mx-0">
                        <Heading size="textxs" as="p" className="relative z-[4] text-[10px] font-medium text-gray-500">
                            {recipeCategoryFour}
                        </Heading>
                        <div className="relative mt-[-2px] self-stretch">
                            <div>
                                <div className="flex flex-col items-start gap-1.5">
                                    <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                        {recipeTitleFour}
                                    </Heading>
                                    <Heading as="h5" className="text-[20px] font-semibold text-deep_orange-700">
                                        {recipeTimeFour}
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
