import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DairyFreeRecipeCardProps {
    id: number;
    title: string;
    image: string;
    isDarkMode: boolean;
}

const DairyFreeRecipeCard: React.FC<DairyFreeRecipeCardProps> = ({
    id,
    title,
    image,
    isDarkMode
}) => {
    const { t } = useTranslation();

    return (
        <div className={`flex flex-col items-center p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-white-a700'}`}>
            <img 
            src={image} 
            alt={title}
            className={`w-full h-48 object-cover rounded-lg ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}
            />
            <h3 className={`mt-2 text-lg font-semibold ${isDarkMode ? 'text-white-a700' : 'text-gray-900'}`}>{title}</h3>
            <Link to={`/details/${id}`} 
                className="font-poppins mt-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                style={{ color: 'white' }}
            >
                {t('details')}
            </Link>
        </div>
    );
};

export default DairyFreeRecipeCard;