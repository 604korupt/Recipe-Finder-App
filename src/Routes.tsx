import { useRoutes } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Home1 from "./pages/Home1";
import Search from "./pages/Search";
import Details from "./pages/Details";

const ProjectRoutes = () => {
    let element = useRoutes ( [
        { path: "*", element: <NotFound /> },
        { path: "/", element: <Home1 /> },
        { path: "search", element: <Search />},
        { path: "details", element: <Details /> },
    ]);

    return element;
};

export default ProjectRoutes;