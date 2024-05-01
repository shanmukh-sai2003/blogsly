import Header from "./Header";
import MainPage from "./MainPage";
import BlogFullPage from "./BlogFullPage";
import {Outlet, createBrowserRouter} from "react-router-dom";
import Login from "./admin/Login";
import AdminMainPage from "./admin/AdminMainPage";
import UserProvider from "../context/userProvider";
import RouterProtector from "./RouteProtector";
import CreatePostPage from "./admin/CreatePostPage";
import EditPostPage from "./admin/EditPostPage";

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
        element: <UserProvider><App /></UserProvider>,
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
                path: "admin/",
                element: <RouterProtector />,
                children: [
                    {
                        path: "",
                        element: <AdminMainPage />
                    },
                    {
                        path: "create",
                        element: <CreatePostPage />
                    },
                    {
                        path: "blog/:blogId/edit",
                        element: <EditPostPage />
                    }
                ]
            }
        ]
    }
]);

export default router;