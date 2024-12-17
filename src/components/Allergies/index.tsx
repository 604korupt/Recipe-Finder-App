import { Text, CheckBox, Heading } from "./.."; // Ensure CheckBox is imported
import React from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface Props {
    className?: string;
    allergiesText?: React.ReactNode;
    seeMoreLink?: React.ReactNode;
    onAllergiesChange?: (allergies: string[]) => void;
    isDarkMode: boolean;
}

export default function Allergies({ onAllergiesChange, isDarkMode, ...props }: Props) {
    const { t } = useTranslation(); // Initialize translation
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
        <div
            {...props}
            className={`${props.className} flex flex-col items-center px-3 py-3.5 ${isDarkMode ? 'bg-gray-900' : 'bg-white-a700'} flex-1`}
        >
            <div className="flex flex-col items-start gap-5 self-stretch">
                <Heading size="textmd" as="p" className={`font-poppins text-[16px] font-medium ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>
                    {t('allergies')}
                </Heading>
                <div className="flex flex-col items-start gap-5 self-stretch">
                    <CheckBox
                        name="Dairy Option"
                        label={t('dairy')}
                        id="DairyOption"
                        className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                        onChange={(checked) => handleAllergyChange('dairy', checked)}
                    />
                    <CheckBox
                        name="Egg Option"
                        label={t('egg')}
                        id="EggOption"
                        className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                        onChange={(checked) => handleAllergyChange('egg', checked)}
                    />
                    <CheckBox
                        name="Gluten Option"
                        label={t('gluten')}
                        id="GlutenOption"
                        className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                        onChange={(checked) => handleAllergyChange('gluten', checked)}
                    />
                    <CheckBox
                        name="Grain Option"
                        label={t('grain')}
                        id="GrainOption"
                        className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                        onChange={(checked) => handleAllergyChange('grain', checked)}
                    />
                    <CheckBox
                        name="Peanut Option"
                        label={t('peanut')}
                        id="PeanutOption"
                        className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                        onChange={(checked) => handleAllergyChange('peanut', checked)}
                    />

                    {showMore && (
                        <>  
                            <CheckBox
                                name="Seafood Option"
                                label={t('seafood')}
                                id="SeafoodOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('seafood', checked)}
                            />
                            <CheckBox
                                name="Sesame Option"
                                label={t('sesame')}
                                id="SesameOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('sesame', checked)}
                            />
                            <CheckBox
                                name="Shellfish Option"
                                label={t('shellfish')}
                                id="ShellfishOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('shellfish', checked)}
                            />
                            <CheckBox
                                name="Soy Option"
                                label={t('soy')}
                                id="SoyOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('soy', checked)}
                            />
                            <CheckBox
                                name="Sulfite Option"
                                label={t('sulfite')}
                                id="SulfiteOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('sulfite', checked)}
                            />
                            <CheckBox
                                name="Tree Nut Option"
                                label={t('treeNut')}
                                id="TreeNutOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('tree nut', checked)}
                            />
                            <CheckBox
                                name="Wheat Option"
                                label={t('wheat')}
                                id="WheatOption"
                                className={`gap-3 text-[14px] ${isDarkMode ? 'text-white-a700' : 'text-blue_gray-800'}`}
                                onChange={(checked) => handleAllergyChange('wheat', checked)}
                            />
                        </>
                    )}
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowMore(!showMore);
                    }}>
                        <Text as="p" className="text-[12px] font-normal text-light_green-800">
                            {showMore ? t('seeLess') : t('seeMore')}
                        </Text>
                    </a>
                </div>
            </div>
        </div>
    );
}
