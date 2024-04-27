import { useState } from "react";
import {CiHeart} from 'react-icons/ci';
import {FaHeart} from 'react-icons/fa';

function LikeForm(props) {
    const {postId, likes} = props;
    const [likedPost, setLikedPost] = useState(false);
    async function handleLike() {
        if(!likedPost) {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
        } else {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/removeLike`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
        }
        setLikedPost(!likedPost);
    }

    return (
        <>
            <button onClick={handleLike} className="text-xl mr-[47vw]">
                {likedPost ? <FaHeart className="w-10 h-10 text-pink-500 inline m-2"/> : <CiHeart className="w-10 h-10 text-pink-500 inline m-2"/>}
                {likedPost ? likes + 1 : likes}
            </button>
        </>
    );
}

export default LikeForm;