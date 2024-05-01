import AdminBlogList from "./AdminBlogList";
import { Link } from "react-router-dom";


function AdminMainPage() {
    return (
        <main>
            <div className="mt-6 mx-[10vw]">
                <button className="p-4 rounded-md bg-blue-400"><Link to={`/admin/create`}>Create new post + </Link></button>
            </div>
            <AdminBlogList />
        </main>
    );
}

export default AdminMainPage;