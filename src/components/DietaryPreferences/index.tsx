import { Text, CheckBox, Heading } from "./..";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    className?: string;
    dietText?: React.ReactNode;
    seeMoreLink?: React.ReactNode;
    onDietsChange?: (diets: string[]) => void;
}

export default function DietaryPreferences({ onDietsChange, ...props }: Props) {
    const [showMore, setShowMore] = React.useState(false);
    const [selectedDiets, setSelectedDiets] = React.useState<string[]>([]);
    const { t } = useTranslation();

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
                    {t('diet')}
                </Heading>
                <div className="flex flex-col items-start gap-5 self-stretch">
                    <CheckBox
                        name="Gluten Free Option"
                        label={t("gf")}
                        id="GlutenFreeOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('gluten free', checked)}
                    />
                    <CheckBox
                        name="Ketogenic Option"
                        label={t("ketogenic")}
                        id="KetogenicOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('ketogenic', checked)}
                    />
                    <CheckBox
                        name="Vegetarian Option"
                        label={t("vegetarian")}
                        id="VegetarianOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('vegetarian', checked)}
                    />
                    <CheckBox
                        name="Vegan Option"
                        label={t("vegan")}
                        id="VeganOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('vegan', checked)}
                    />
                    <CheckBox
                        name="Paleo Option"
                        label={t("paelo")}
                        id="PaleoOption"
                        className="gap-3 text-[14px] text-blue_gray-800"
                        onChange={(checked) => handleDietChange('paleo', checked)}
                    />
                    {showMore && (
                        <>
                            <CheckBox
                                name="LowFODMAP Option"
                                label={t("lowFodmap")}
                                id="LowFODMAPOption"
                                className="gap-3 text-[14px] text-blue_gray-800"
                                onChange={(checked) => handleDietChange('fodmap-friendly', checked)}
                            />
                            <CheckBox
                                name="Whole30 Option"
                                label={t("whole30")}
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
                            {showMore ? t("seeLess") : t("seeMore")}
                        </Text>
                    </a>
                </div>
            </div>
        </div>
    );
}
