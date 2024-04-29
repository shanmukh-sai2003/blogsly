import Header from "./Header";
import MainPage from "./MainPage";
import BlogFullPage from "./BlogFullPage";
import {Outlet, Route, Routes, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Login from "./admin/Login";
import AdminMainPage from "./admin/AdminMainPage";

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
            },
            {
                path: "admin",
                element: <AdminMainPage />
            }
        ]
    }
]);

export default router;