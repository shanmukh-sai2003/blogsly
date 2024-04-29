import { DateTime } from "luxon";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminBlogCard(props) {
    const {blogId, likes, title, content, date, published} = props;

    return (
        <div className="w-[80vw] my-4 border py-6  px-8 rounded-md shadow-md">
            <h3 className="font-bold text-3xl text-center mb-2">{title}</h3>
            <p>{content.slice(0, 500)}....</p>
            <div className="flex justify-between my-3">
                <div>
                    <p><FaHeart className="w-6 h-6 text-pink-500 inline m-2"/> {likes}</p>
                    <p>{DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_FULL)}</p>
                </div>
                <div className="flex gap-2">
                    <Link to={`/blog/${blogId}`}><button className="border rounded-lg shadow-sm p-4 text-xl bg-blue-400">continue reading</button></Link>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-yellow-400">{ published ? "unpublish" : "publish" }</button>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-green-400">edit</button>
                    <button className="border rounded-lg shadow-sm p-4 text-xl bg-red-400">delete</button>
                </div>
            </div>            
        </div>
    );
}

export default AdminBlogCard;