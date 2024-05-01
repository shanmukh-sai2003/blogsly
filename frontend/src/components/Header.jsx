import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";
import logoutUser from "../utils/services/logoutUser";

function Header() {
    const { user, setUser } = useAuth();

    return (
        <header className="py-6 px-[10vw] flex justify-between mt-2 border-b-2">
            <h1 className="text-6xl font-bold"><Link to={`/`}>Blogsly</Link></h1>
            <ul className="flex gap-4 text-xl items-center">
                { !user?.accessToken && <li><Link to={`/login`}>login</Link></li> }
                { user?.accessToken && <li onClick={() => logoutUser(setUser)} className="cursor-pointer">logout</li> }
                { user?.accessToken && <li><Link to={`/admin`}>admin</Link></li> }
            </ul>
        </header>
    );
}

export default Header;