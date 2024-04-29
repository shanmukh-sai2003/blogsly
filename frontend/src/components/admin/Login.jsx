import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import useAuth from "../../utils/useAuth";

function Login() {
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [uname, pwd]);

    function onInputChange(e, setState) {
        setState(e.target.value);
    }

    async function handleLoginForm(e) {
        e.preventDefault();
        const body = {
            username: uname,
            password: pwd
        };
        try {
            const response = await fetch(API_URL + `/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if(!data.success) {
                setError(data.message);
            } else {
                const username = data.username;
                const name = data.name;
                const userId = data.userId;
                const accessToken = data.accessToken;
                setUser({ username, userId, name, accessToken });
                setUname("");
                setPwd("");
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center mt-8">
            { error.length !== 0 && <ErrorMessage message={error} />}
            <form onSubmit={handleLoginForm} className="border flex flex-col p-8 rounded-lg shadow-md w-[40vw]">
                <h2 className="text-2xl font-bold text-center my-2">Login</h2>
                <label className="text-xl">username:</label>
                <input 
                    type="text" 
                    id="uname" 
                    name="username" 
                    required 
                    value={uname} 
                    placeholder="Enter username" 
                    onChange={(e) => {onInputChange(e, setUname)}}
                    className="p-3 my-3 text-xl rounded-sm border"
                />
                <label className="text-xl">password</label>
                <input 
                    type="password" 
                    id="pwd" 
                    name="password" 
                    required value={pwd} 
                    placeholder="Enter password" 
                    onChange={(e) => {onInputChange(e, setPwd)}} 
                    className="p-3 my-3 text-xl rounded-sm border"
                />
                <button type="submit" className="w-fit text-xl p-4 border rounded-lg shadow-lg">Login</button>
            </form>
        </div>
    );
}

export default Login;