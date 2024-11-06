import { Helmet } from "react-helmet";
import RecipeFinderSection from "./RecipeFinderSection";
import RecipeGallerySection from "./RecipeGallerySection";

export default function Home1Page() {
    return (
        <>
            <Helmet>
                <title>Recipe Home Page</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col gap-10 bg-white-a700">
                {/* recipe finder section */}
                <RecipeFinderSection />

                {/* recipe gallery section */}
                <RecipeGallerySection />
            </div>
        </>
    );
}