import { useState } from "react";
import { redirect } from "react-router-dom";

function CommentForm(props) {
    const {postId, addComment} = props;
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            username: username,
            message: message,
        };
        console.log(body);
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if(result.success) {
                addComment(true);
                setMessage("");
                setUsername("");
            }
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="w-[50vw] text-left m-4">
            <h4 className="text-2xl font-semibold">Add Comment</h4>
            <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <label for="uname" className="mt-4">Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    placeholder="Enter username" 
                    required 
                    name="username" 
                    id="uname"
                    className="p-2 rounded-sm border"
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <label for="message" className="mt-4">Comment:</label>
                <input 
                    type="text" 
                    value={message} 
                    placeholder="Enter comment" 
                    required 
                    name="message" 
                    id="message"
                    className="p-2 rounded-sm border"
                    onChange={(e) => {setMessage(e.target.value)}}
                />
                <button type="submit" className="mt-4 border rounded-lg w-fit p-4 shadow-md">add comment</button>
            </form>
        </div>
    );
}

export default CommentForm;