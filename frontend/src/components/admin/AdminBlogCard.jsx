import { DateTime } from "luxon";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { publish, unpublish } from "../../utils/services/publishPost";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

function AdminBlogCard(props) {
    const {blogId, likes, title, content, date, published, deletePost} = props;
    const [isPublished, setIsPublished] = useState(published);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handlePublish() {
        if(isPublished) {
            const data = await unpublish(blogId);
            if(!data.success) {
                setError(data.message);
            } else {
                setIsPublished(!isPublished);
            }
        } else {
            const data = await publish(blogId);
            if(!data.success) {
                setError(data.message);
            } else {
                setIsPublished(!isPublished);
            }
        }
    }

    return (
        <div className="w-[80vw] my-4 border py-6  px-8 rounded-md shadow-md">
            {error.length !== 0 && <ErrorMessage message={error}/>}
            <h3 className="font-bold text-3xl text-center mb-2">{title}</h3>
            <p>{content.slice(0, 500)}....</p>
            <div className="flex justify-between my-3">
                <div>
                    <p><FaHeart className="w-6 h-6 text-pink-500 inline m-2"/> {likes}</p>
                    <p>{DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_FULL)}</p>
                </div>
                <div className="flex gap-2">
                    <Link to={`/blog/${blogId}`}><button className="border rounded-lg shadow-sm p-4 text-xl bg-blue-400">continue reading</button></Link>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-yellow-400" onClick={handlePublish}>{ isPublished ? "unpublish" : "publish" }</button>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-green-400">edit</button>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-red-400" onClick={ () => { deletePost(blogId) }}>delete</button>
                </div>
            </div>            
        </div>
    );
}

export default AdminBlogCard;