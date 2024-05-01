import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function BlogCard(props) {
    const {blogId, title, content, date} = props;
    return (
        <div className="p-2 text-center border ml-4 shadow-md w-[25vw] mb-4 rounded-lg">
            <h3 className="text-2xl font-bold">{title}</h3>
            <div dangerouslySetInnerHTML={{__html: content.slice(0, 200)}}></div>
            <p>{DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_FULL)}</p>
            <button className="p-4 mt-4 rounded-lg border shadow-sm"><Link to={`/blog/${blogId}`}>continue reading</Link></button>
        </div>
    );
}

export default BlogCard;