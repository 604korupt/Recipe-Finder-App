import { Heading, Img } from "..";
import React from "react";

interface Props {
    className?: string;
    recipeImage?: string;
    dietaryLabel?: React.ReactNode;
    recipeTitle?: React.ReactNode;
    cookingTime?: React.ReactNode;
}

export default function DairyFreeRecipeCard({
    recipeImage = "images/img_image_rounded_200x288.png",
    dietaryLabel = "Dairy Free",
    recipeTitle = "Fried Rice",
    cookingTime = "40 min",
    ...props
}: Props) {
    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-center w-full gap-2 p-2 bg-white-a700 shadow-xs rounded-[16px]`}
        >
            <Img
                src={recipeImage}
                alt="Image Dairy Free"
                className="h-[200px] w-full rounded-[16px] object-cover"
            />
            <div className="mb-4 ml-3 mr-2.5 flex flex-col items-start self-stretch">
                <Heading
                    size="textxs"
                    as="p"
                    className="relative z-[1] text-[10px] font-medium text-gray-500"
                >
                    {dietaryLabel}
                </Heading>
                <div className="relative mt-[-2px] self-stretch">
                    <div>
                        <div className="flex flex-col items-start gap-1.5">
                            <Heading as="h5" className="text-[20px] font-bold text-gray-900">
                                {recipeTitle}
                            </Heading>
                            <Heading
                                as="h5"
                                className="text-[20px] font-semibold text-deep_orange-700"
                            >
                                {cookingTime}
                            </Heading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}