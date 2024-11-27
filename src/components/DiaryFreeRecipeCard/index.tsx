import React from "react";
import { Link } from "react-router-dom";

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
    return (
        <div className="flex flex-col items-center p-4 border rounded-lg">
            <img 
                src={image} 
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
            <Link to={`/details/${id}`} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Details
            </Link>
        </div>
    );
};

export default DairyFreeRecipeCard;