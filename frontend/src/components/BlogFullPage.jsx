import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import LikeForm from "./LikeFom";
import {DateTime} from 'luxon';

function BlogFullPage() {
    const {blogId} = useParams();
    const [newComment, setNewComment] = useState(false);
    const [blog, setBlog] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchBlog();
    }, [newComment]);

    async function fetchBlog() {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${blogId}`);
            const data = await response.json();
            console.log(data);
            setBlog(data.post);  
            const responseComment = await fetch(`http://localhost:3000/api/posts/${blogId}/comments`);
            const dataComment = await responseComment.json();
            console.log(dataComment);  
            setComments(dataComment.data);    
        } catch (error) {
            console.log(error);
        }
    }

    if(blog === undefined) {
        return <div>loading...</div>
    }

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <div className="w-[50vw]">
                <h1 className="text-4xl font-bold">{blog.title}</h1>
                <div className="flex m-4 justify-between  mt-10 text-gray-500">
                    <p>{blog.user.name}</p>
                    <p>{DateTime.fromJSDate(new Date(blog.date)).toLocaleString(DateTime.DATE_FULL)}</p>
                </div>
            </div>
            <div className="text-justify m-4 w-[50vw]" dangerouslySetInnerHTML={{__html: blog.content}}></div>
            <LikeForm 
                postId={blogId}
                likes={blog.likes}
            />
            <CommentForm 
                postId={blogId}
                addComment={setNewComment}
            />
            <div className="flex flex-col items-center">
                <h4 className="text-3xl font-semibold">Comments</h4>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment._id}
                            username={comment.username}
                            message={comment.message}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BlogFullPage;