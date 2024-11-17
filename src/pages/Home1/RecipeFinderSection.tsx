import { Heading } from "../../components";
import { Link } from "react-router-dom";

const RecipeFinderSection: React.FC = () => {
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
                            <span>Recipe&nbsp;</span>
                            <span className="font-medium">finder</span>
                        </Heading>

                        <div className="flex gap-4">
                            <Link 
                                to="/"
                                className="font-poppins px-4 py-2 bg-white rounded-md hover:bg-gray-100 text-gray-900_01"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/search"
                                className="font-poppins px-4 py-2 bg-white rounded-md hover:bg-gray-100 text-gray-900_01"
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[120px]"></div>
        </>
    );
};

export default RecipeFinderSection;
