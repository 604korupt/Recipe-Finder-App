import { Helmet } from "react-helmet";
import RecipeFinderSection from "./RecipeFinderSection";

export default function DetailsPage() {
    return (
        <>
            <Helmet>
                <title>Recipe Details</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col gap-10 bg-white-a700">
                {/* recipe finder section */}
                <RecipeFinderSection />

                
            </div>
        </>
    );
}
