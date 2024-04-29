import Header from "./Header";
import MainPage from "./MainPage";
import BlogFullPage from "./BlogFullPage";
import {Outlet, Route, Routes, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Login from "./admin/Login";

function App() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:"",
                element: <MainPage />
            },
            {
                path: "blog/:blogId",
                element: <BlogFullPage />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    }
]);

export default router;