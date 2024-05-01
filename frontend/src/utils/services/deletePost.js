import { API_URL } from "../constants";


// const auth = JSON.parse(localStorage.getItem('USER'));
const deletePost = async (blogId, auth) => {
    try {
        const response = await fetch(API_URL + `/posts/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.accessToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export default deletePost;