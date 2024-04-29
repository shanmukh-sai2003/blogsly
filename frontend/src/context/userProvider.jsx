import { useEffect, useState } from "react";
import UserContext from "./userContext";

function UserProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        const userData = localStorage.getItem('USER');
        setUser(JSON.parse(userData));
    }, []);

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;