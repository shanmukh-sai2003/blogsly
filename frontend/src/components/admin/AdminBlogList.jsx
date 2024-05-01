import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import AdminBlogCard from "./AdminBlogCard";
import useAuth from "../../utils/useAuth";
import ErrorMessage from "../ErrorMessage";
import deletePost from "../../utils/services/deletePost";

function AdminBlogList() {
    const [blogList, setBlogList] = useState();
    const { user } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPostDeleted, setIsPostDeleted] = useState(false);

    useEffect(() => {
        getAllBlogs()
    },[isPostDeleted, user]);

    async function getAllBlogs() {
        try {
            const response = await fetch(API_URL + `/posts/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            });
            const data = await response.json();
            console.log(data);
            if(data.success) {
                setBlogList(data.data);
                setErrorMessage("");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(blogId) {
        try {
            const data = await deletePost(blogId);
            if(!data?.success) {
                setError(data.message);
            } else {
                setIsPostDeleted(!isPostDeleted);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if(!blogList) {
        return <div>Loading..</div>
    }

    return (
        <div className="flex flex-col items-center mt-8">
            {errorMessage.length !== 0 && <ErrorMessage message={errorMessage} />}
            {blogList.map(blog => {
                return <AdminBlogCard 
                    key={blog._id}
                    blogId={blog._id}
                    likes={blog.likes}
                    title={blog.title}
                    content={blog.content}
                    published={blog.published}
                    date={blog.date}
                    deletePost={handleDelete}
                />
            })}
        </div>
    );
}

export default AdminBlogList;