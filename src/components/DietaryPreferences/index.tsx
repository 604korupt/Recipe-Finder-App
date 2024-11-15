import { Text, CheckBox, Heading } from "./..";
import React from "react";

interface Props {
    className?: string;
    dietText?: React.ReactNode;
    seeMoreLink?: React.ReactNode;
    onDietsChange?: (diets: string[]) => void;
}

export default function DietaryPreferences({ dietText = "Diet", seeMoreLink = "See more", onDietsChange, ...props }: Props) {
    const [showMore, setShowMore] = React.useState(false);
    const [selectedDiets, setSelectedDiets] = React.useState<string[]>([]);

    const handleDietChange = (diet: string, checked: boolean) => {
        const newDiets = checked 
            ? [...selectedDiets, diet]
            : selectedDiets.filter(d => d !== diet);
        setSelectedDiets(newDiets);
        onDietsChange?.(newDiets);
    };

    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-center px-3 py-3.5 bg-white-a700 flex-1 rounded-md`}
        >
            <div className="flex flex-col items-start gap-5 self-stretch">
                <Heading size="textmd" as="p" className="font-poppins text-[16px] font-medium text-gray-900">
                    {dietText}
                </Heading>
                <div className="flex flex-col items-start gap-5 self-stretch">
                    <CheckBox
                        name="Gluten Free Option"
                        label="Gluten Free"
                        id="GlutenFreeOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('gluten free', checked)}
                    />
                    <CheckBox
                        name="Ketogenic Option"
                        label="Ketogenic"
                        id="KetogenicOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('ketogenic', checked)}
                    />
                    <CheckBox
                        name="Vegetarian Option"
                        label="Vegetarian"
                        id="VegetarianOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('vegetarian', checked)}
                    />
                    <CheckBox
                        name="Vegan Option"
                        label="Vegan"
                        id="VeganOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('vegan', checked)}
                    />
                    <CheckBox
                        name="Paleo Option"
                        label="Paleo"
                        id="PaleoOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('paleo', checked)}
                    />
                    {showMore && (
                        <>
                            <CheckBox
                                name="LowFODMAP Option"
                                label="Low FODMAP"
                                id="LowFODMAPOption"
                                className="gap-3 text-[14px] text-blue_gray-800"
                                onChange={(checked) => handleDietChange('fodmap-friendly', checked)}
                            />
                            <CheckBox
                                name="Whole30 Option"
                                label="Whole30"
                                id="Whole30Option"
                                className="gap-3 text-[14px] text-blue_gray-800"
                                onChange={(checked) => handleDietChange('whole30', checked)}
                            />
                        </>
                    )}
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowMore(!showMore);
                    }}>
                        <Text as="p" className="text-[12px] font-normal text-light_green-800">
                            {showMore ? "See less" : seeMoreLink}
                        </Text>
                    </a>
                </div>
            </div>
        </div>
    );
}
