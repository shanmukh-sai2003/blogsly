import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="py-6 px-[10vw] flex justify-between mt-2 border-b-2">
            <h1 className="text-6xl font-bold"><Link to={`/`}>Blogsly</Link></h1>
            <ul className="flex gap-4 text-xl items-center">
                <li><Link to={`/login`}>login</Link></li>
                <li><Link to={`/logout`}>logout</Link></li>
                <li><Link to={`/admin`}>admin</Link></li>
            </ul>
        </header>
    );
}

export default Header;