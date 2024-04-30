import { API_URL } from '../constants';
import useAuth from '../useAuth';

const auth = JSON.parse(localStorage.getItem('USER'));

export const publish = async (postId) => {
    try {
        const response = await fetch(API_URL + `/posts/${postId}/publish`, {
            method: 'POST', 
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

export const unpublish = async (postId) => {
    try {
        const response = await fetch(API_URL + `/posts/${postId}/unpublish`, {
            method: 'POST', 
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
