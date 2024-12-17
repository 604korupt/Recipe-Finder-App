import { Helmet } from "react-helmet";
import RecipeFinderSection from "./RecipeFinderSection";
import RecipeDetailSection from "./RecipeDetailSection";
import { useState } from "react";


export default function SavedDetailsPage() {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode.toString());
            return newMode;
        });
    };

    return (
        <>
            <Helmet>
                <title>Recipe Details</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className={`flex w-full flex-col gap-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white-a700'}`}>
                {/* recipe finder section */}
                <RecipeFinderSection isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                {/* recipe detail section */}
                <RecipeDetailSection isDarkMode={isDarkMode} />
            </div>
        </>
    );
}
