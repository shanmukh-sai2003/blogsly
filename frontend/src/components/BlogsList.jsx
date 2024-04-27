import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

function BlogsList() {
    const [blogsList, setBlogsList] = useState();
    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        try {
            const blogsPromise = await fetch('http://localhost:3000/api/posts');
            const blogs = await blogsPromise.json();
            console.log(blogs);
            setBlogsList(blogs.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    if(blogsList === undefined) {
        return <div className="text-2xl font-bold">loading.....</div>
    }

    return (
        <div className="ml-8 mt-4 mr-8 flex">
            {blogsList.map(blog => {
                return (
                    <BlogCard 
                        key = {blog._id}
                        blogId = {blog._id}
                        title = {blog.title}
                        content = {blog.content}
                        date = {blog.date}
                    />
                )
            })}
        </div>
    );
}

export default BlogsList;