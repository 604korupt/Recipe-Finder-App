import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DairyFreeRecipeCardProps {
    id: number;
    title: string;
    image: string;
}

const DairyFreeRecipeCard: React.FC<DairyFreeRecipeCardProps> = ({
    id,
    title,
    image
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg">
            <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
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