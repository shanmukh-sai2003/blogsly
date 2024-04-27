import { Link } from "react-router-dom";

function BlogCard(props) {
    const {blogId, title, content, date} = props;
    return (
        <div className="p-2 text-center border ml-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p>{content.slice(0, 200)}...</p>
            <p>{date}</p>
            <Link to={`/blog/${blogId}`} className="p-4 border rounded-lg mt-4">continue reading</Link>
        </div>
    );
}

export default BlogCard;