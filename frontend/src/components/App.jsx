import Header from "./Header";
import MainPage from "./MainPage";
import BlogFullPage from "./BlogFullPage";
import {Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

function App() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={ <App /> }>
            <Route path="" element={ <MainPage />} />
            <Route path="blog/:blogId" element={ <BlogFullPage />} />
        </Route>
    )
);

export default router;