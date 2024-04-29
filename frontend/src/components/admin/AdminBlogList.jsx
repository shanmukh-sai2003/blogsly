import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import AdminBlogCard from "./AdminBlogCard";

function AdminBlogList() {
    const [blogList, setBlogList] = useState();

    useEffect(() => {
        getAllBlogs()
    },[]);

    async function getAllBlogs() {
        try {
            const response = await fetch(API_URL + `/posts`);
            const data = await response.json();
            console.log(data);
            if(data.success) {
                setBlogList(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(!blogList) {
        return <div>Loading..</div>
    }
    return (
        <div className="flex flex-col items-center mt-8">
            {blogList.map(blog => {
                return <AdminBlogCard 
                    key={blog._id}
                    blogId={blog._id}
                    likes={blog.likes}
                    title={blog.title}
                    content={blog.content}
                    published={blog.published}
                    date={blog.date}
                />
            })}
        </div>
    );
}

export default AdminBlogList;