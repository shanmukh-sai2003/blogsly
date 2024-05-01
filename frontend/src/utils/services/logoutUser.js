import { useNavigate } from "react-router-dom";


function logoutUser(setUser) {
    localStorage.removeItem('USER');
    setUser({});
}

export default logoutUser;