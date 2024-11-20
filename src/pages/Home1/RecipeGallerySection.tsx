import { Button } from "../../components";
import RecipeList from "../../components/RecipeList";

export default function RecipeGallerySection() {
    return (
        <> {
            <div className="mb-1 flex flex-col items-center">
                <div className="container-xs flex flex-col items-center gap-[68px] md:px-5 sm:gap-[34px]">
                    <div className="flex flex-col gap-8 self-stretch">
                        <RecipeList />
                    </div>
                    <Button
                        color="light_green_800"
                        size="xs"
                        shape="round"
                        className="min-w-[400px] rounded-[10px] px-[34px] sm:px-5"
                    >
                        Load More
                    </Button>
                </div>
            </div>
}
        </>
    );
}
