import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogFullPage() {
    const {blogId} = useParams();
    const [blog, setBlog] = useState();

    useEffect(() => {
        fetchBlog();
    }, []);

    async function fetchBlog() {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${blogId}`);
            const data = await response.json();
            console.log(data);
            setBlog(data.post);        
        } catch (error) {
            console.log(error);
        }
    }

    if(blog === undefined) {
        return <div>loading...</div>
    }

    return (
        <div>
        {blogId}
        </div>
    );
}

export default BlogFullPage;