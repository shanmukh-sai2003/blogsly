import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="p-6 pl-8">
            <h1 className="text-6xl font-bold"><Link to={`/`}>Blogsly</Link></h1>
        </header>
    );
}

export default Header;