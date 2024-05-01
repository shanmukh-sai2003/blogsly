import { useEffect, useState } from "react";
import TextEditor from "../TextEditor";
import ErrorMessage from "../ErrorMessage";
import useAuth from '../../utils/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../../utils/constants";
import getPost from "../../utils/services/getPost";

function EditPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publish, setPublish] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();
    const { blogId } = useParams();
    console.log(blogId);

    useEffect(() => {
        setErrorMessage("");
    }, [title, content]);

    useEffect(() => {
        getBlogData(blogId);
    }, []);

    async function getBlogData(blogId) {
        try {
            const data = await getPost(blogId);
            console.log(data, "heelos");
            if(!data.success) {
                setErrorMessage(data.message);
            } else {
                setTitle(data.post.title);
                setContent(data.post.content);
                setErrorMessage("");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            title: title,
            content: content,
            publish: publish,
        };
        console.log(body);
        try {
            const response = await fetch(API_URL + `/posts/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if(!data.success) {
                setErrorMessage(data?.message || data?.error);
            } else {
                setErrorMessage("");
                setTitle("");
                setContent("");
                setPublish(false);
                navigate(`/blog/${blogId}`);
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    }

    return (
        <main className="m-4 p-4 flex flex-col items-center">  
            <h3 className="text-3xl font-bold my-2">Edit a post</h3>
            { errorMessage.length !== 0 && <ErrorMessage message={errorMessage} /> }
            <form onSubmit={handleSubmit} className="flex flex-col text-xl">
                <label htmlFor="title" className="text-2xl">Title:</label>
                <input 
                    className="my-2 p-3 border rounded-sm"
                    type="text" 
                    id="title" 
                    placeholder="Enter title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content" className="text-2xl">Content:</label>
                <TextEditor placeholder="Share your content" setTheContent={setContent} content={content} />

                <label htmlFor="thumbnail">thumbnail:</label>
                <input type="file" id="thumbnail" />

                <button onClick={() => setPublish(false)} type="submit" className="px-4 py-2 my-2 border rounded-lg shadow-md w-fit">save</button>
                <button onClick={() => setPublish(true)} type="submit" className="px-4 py-2 my-2 border rounded-lg shadow-md w-fit">save & publish</button>
            </form>
        </main>
    );
}

export default EditPostPage;