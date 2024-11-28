import { useRoutes } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Home1 from "./pages/Home1";
import Search from "./pages/Search";
import Details from "./pages/Details";
import SavedDetails from "./pages/SavedDetails";
import Random from "./pages/Random";

const ProjectRoutes = () => {
    let element = useRoutes ( [
        { path: "*", element: <NotFound /> },
        { path: "/", element: <Home1 /> },
        { path: "search", element: <Search />},
        { path: "details/:id", element: <Details /> },
        { path: "saved-recipes/:id", element: <SavedDetails /> },
        { path: "random", element: <Random /> }
    ]);

    return element;
};

export default ProjectRoutes;