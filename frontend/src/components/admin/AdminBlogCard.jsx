import { DateTime } from "luxon";
import { FaHeart } from "react-icons/fa";

function AdminBlogCard(props) {
    const {blogid, likes, title, content, date, published} = props;

    return (
        <div className="w-[80vw] my-4 border py-6  px-8 rounded-md shadow-md">
            <h3 className="font-bold text-3xl text-center mb-2">{title}</h3>
            <p>{content.slice(0, 500)}....</p>
            <div className="flex justify-between">
                <div>
                    <p><FaHeart className="w-5 h-5 text-pink-500 inline m-2"/> {likes}</p>
                    <p>{DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_FULL)}</p>
                </div>
                <div>
                    <button className="border rounded-lg shadow-sm p-4 text-xl">{ published ? "unpublish" : "publish" }</button>
                </div>
            </div>            
        </div>
    );
}

export default AdminBlogCard;