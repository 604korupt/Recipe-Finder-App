import React from "react";

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
        </div>
    );
};

export default DairyFreeRecipeCard;