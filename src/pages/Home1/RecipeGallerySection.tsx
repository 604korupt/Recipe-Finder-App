import RecipeList from "../../components/RecipeList";
import {useEffect} from "react";

interface RecipeGallerySectionProps {
    isDarkMode: boolean;
}

export default function RecipeGallerySection({ isDarkMode }: RecipeGallerySectionProps) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <> {
            <div className={`flex flex-col items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} h-screen w-full overflow-hidden`}>
                <div className="container-xs flex flex-col items-center gap-[68px] md:px-5 sm:gap-[34px]">
                    <div className="flex flex-col gap-8 self-stretch">
                        <RecipeList isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
}
        </>
    );
}
