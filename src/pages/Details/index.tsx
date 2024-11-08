import { Helmet } from "react-helmet";
import { Heading } from "../../components";
import RecipeDetailSection from "./RecipeDetailSection";

export default function DetailsPage() {
    return (
        <>
            <Helmet>
                <title>Recipe Details</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col gap-10 bg-white-a700">
                <div className="flex justify-center bg-light_green-a700 py-[26px] sm:py-5">
                    <div className="container-xs mt-2 flex px-3.5 md:px-5">
                        <Heading
                            size="headingmd"
                            as="h1"
                            className="font-urbanist text-[40px] font-bold tracking-[1.00px] text-gray-900_01 md:text-[38px] sm:text-[36px]"
                        >
                            <span>Recipe&nbsp;</span>
                            <span className="font-medium">finder</span>
                        </Heading>
                    </div>
                </div>

                {/* recipe detail section */}
                <RecipeDetailSection />
            </div>
        </>
    );
}
