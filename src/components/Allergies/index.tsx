import { CheckBox, Heading } from "./.."; // Ensure CheckBox is imported
import React from "react";

interface Props {
    onAllergiesChange?: (allergies: string[]) => void;
}

export default function Allergies({ onAllergiesChange }: Props) {
    const [selectedAllergies, setSelectedAllergies] = React.useState<string[]>([]);
    const [showMore, setShowMore] = React.useState(false);

    const handleAllergyChange = (allergy: string, checked: boolean) => {
        const newAllergies = checked 
            ? [...selectedAllergies, allergy]
            : selectedAllergies.filter(a => a !== allergy);
        setSelectedAllergies(newAllergies);
        onAllergiesChange?.(newAllergies);
    };

    return (
        <div className="flex flex-col items-start gap-5">
            <Heading size="headings" as="h3" className="font-poppins text-[22px] font-semibold text-gray-900">
                Allergies
            </Heading>
            <CheckBox
                name="Dairy Option"
                label="Dairy"
                id="DairyOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('dairy', checked)}
            />
            <CheckBox
                name="Egg Option"
                label="Egg"
                id="EggOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('egg', checked)}
            />
            <CheckBox
                name="Gluten Option"
                label="Gluten"
                id="GlutenOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('gluten', checked)}
            />
            <CheckBox
                name="Grain Option"
                label="Grain"
                id="GrainOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('grain', checked)}
            />
            <CheckBox
                name="Peanut Option"
                label="Peanut"
                id="PeanutOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('peanut', checked)}
            />
            <CheckBox
                name="Seafood Option"
                label="Seafood"
                id="SeafoodOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('seafood', checked)}
            />
            <CheckBox
                name="Sesame Option"
                label="Sesame"
                id="SesameOption"
                className="gap-3 text-[14px] text-blue_gray-800"
                onChange={(checked) => handleAllergyChange('sesame', checked)}
            />
            {showMore && (
                <>
                    <CheckBox
                        name="Shellfish Option"
                        label="Shellfish"
                        id="ShellfishOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleAllergyChange('shellfish', checked)}
                    />
                    <CheckBox
                        name="Soy Option"
                        label="Soy"
                        id="SoyOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleAllergyChange('soy', checked)}
                    />
                    <CheckBox
                        name="Sulfite Option"
                        label="Sulfite"
                        id="SulfiteOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleAllergyChange('sulfite', checked)}
                    />
                    <CheckBox
                        name="Tree Nut Option"
                        label="Tree Nut"
                        id="TreeNutOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleAllergyChange('tree nut', checked)}
                    />
                    <CheckBox
                        name="Wheat Option"
                        label="Wheat"
                        id="WheatOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleAllergyChange('wheat', checked)}
                    />
                </>
            )}
            <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowMore(!showMore);
            }}>
                <span className="text-light_green-800 cursor-pointer">
                    {showMore ? "Show less" : "Show more"}
                </span>
            </a>
        </div>
    );
}
