import { API_URL } from "../constants";

async function getPost(postId) {
    try {
        const response = await fetch(API_URL + `/posts/${postId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export default getPost;