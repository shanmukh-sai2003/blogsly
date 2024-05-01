import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";

function Header() {
    const { user } = useAuth();

    return (
        <header className="py-6 px-[10vw] flex justify-between mt-2 border-b-2">
            <h1 className="text-6xl font-bold"><Link to={`/`}>Blogsly</Link></h1>
            <ul className="flex gap-4 text-xl items-center">
                { !user?.accessToken && <li><Link to={`/login`}>login</Link></li> }
                { user?.accessToken && <li><Link to={`/logout`}>logout</Link></li> }
                { user?.accessToken && <li><Link to={`/admin`}>admin</Link></li> }
            </ul>
        </header>
    );
}

export default Header;