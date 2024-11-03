import { Img, Button, Heading } from "../../components";
import React from "react";

export default function RecipeDetailSection() {
    return (
        <>
            <div className="mb-1 flex flex-col items-center">
                {/* recipe detail section */}
                <div className="container-xs flex flex-col items-end gap-12 md:px-5">
                    <div className="flex items-center justify-between gap-5 self-stretch px-2">
                        <Heading size="headinglg" as="h2" className="text-[64px] font-bold text-gray-900 md:text-[48px]">
                            Recipe Detail
                        </Heading>
                        <Button
                            shape="round"
                            rightIcon={<Img src="images/img_arrowright.svg" alt="Arrow Right" className="h-[26px] w-[26px]" />}
                            className="min-w-[124px] gap-3.5 rounded-[10px] pl-3 pr-[22px] sm:pr-5"
                        >
                            Home
                        </Button>
                    </div>
                    <Img
                        src="images/img_image_rounded_2.png"
                        alt="Rounded Image"
                        className="mr-2 h-[432px] w-[50%] rounded-[16px] object-contain md:mr-0"
                    />
                </div>
            </div>
        </>
    );
}