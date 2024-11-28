import RecipeList from "../../components/RecipeList";

export default function RecipeGallerySection() {
    return (
        <> {
            <div className="mb-1 flex flex-col items-center">
                <div className="container-xs flex flex-col items-center gap-[68px] md:px-5 sm:gap-[34px]">
                    <div className="flex flex-col gap-8 self-stretch">
                        <RecipeList />
                    </div>
                </div>
            </div>
}
        </>
    );
}
