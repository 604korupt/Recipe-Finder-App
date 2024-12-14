import { Heading } from "../../components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const RecipeFinderSection: React.FC = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 w-full bg-light_green-a700 z-50">
                <div className="flex justify-center py-[26px] sm:py-5">
                    <div className="container-xs mt-2 flex flex-row items-center justify-between px-3.5 md:px-5">
                        <Heading
                            size="headingmd"
                            as="h1"
                            className="font-urbanist text-[40px] font-bold tracking-[1.00px] text-gray-900_01 md:text-[38px] sm:text-[36px]"
                        >
                            <Link
                                to="/"
                            >
                                <span>Recipe&nbsp;</span>
                                <span className="font-medium">finder</span>
                            </Link>
                        </Heading>

                        <div className="flex gap-4">
                            <Link 
                                to="/search"
                                className="font-poppins px-4 py-2 bg-white rounded-md hover:bg-gray-300 text-gray-900_01"
                            >
                                <img
                                    src="/images/img_magnifying_glass.svg"
                                    alt="search"
                                    className="w-5 h-5"
                                />
                            </Link>
                            <Link 
                                to="/random"
                                className="font-poppins px-4 py-2 bg-white rounded-md hover:bg-gray-300"
                                style={{ color: "#f4f4f4" }}
                            >
                                {t('randomRecipe')}
                            </Link>
                            <Link
                                to="/login"
                                className="font-poppins px-4 py-2 bg-white rounded-md hover:bg-gray-300 text-gray-900_01"
                            >
                                <img 
                                    src="/images/img_user.svg"
                                    alt="login"
                                    className="w-5 h-5"
                                />
                            </Link>
                            <select 
                                onChange={(e) => {
                                    changeLanguage(e.target.value);
                                }} 
                                value={i18n.language}
                                className="font-poppins px-4 py-2 bg-gray-200 rounded-md w-32"
                            >
                                <option value="en">English</option>
                                <option value="zh-TW">繁體中文</option>
                                <option value="zh-CN">简体中文</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[120px]"></div>
        </>
    );
};

export default RecipeFinderSection;